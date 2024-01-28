





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






async function FindTooltipElement(x,y){

    // Fetch all the elements from the mouse position
    const elements = await ddui.GetAllElememtsFromPoint(x, y);
    const topmost_element = elements[0];

    let tooltip_element;
    let tooltip_text;

    // from the topmost element downwards go through all the elements
    for ( let element of elements ) {

        // read the elements tooltip text (if there is one)
        tooltip_text = element.getAttribute("ddui_tooltip");

        // if the element has a tooltip ...
        if ( tooltip_text ) {

            // ... and if:
            // a) the element (with the tooltip text) is the topmost element
            // OR
            // b) the element (with the tooltip text) contains the topmost element
            // ...
            if ( element === topmost_element || element.contains(topmost_element) ) {

                // ... we have a winner (the tooltip element which's tooltip text shall be shown)
                tooltip_element = element;
                break;

            } else {

                // ... but if we have found an element with a tooltip text somewhere behind the recent ui
                // (e.g.) behind a dialogue, no tooltip shall be shown
                // (this is the case, when the found tooltip element ist not topmost AND not a parent of the topmost element)
                return

            }

        }

    }

    // return the anchor node and the tooltip text
    if ( tooltip_text ) {
        return { anchor_node: tooltip_element, text: tooltip_text };
    }

}






function InitTooltipManager(){

    // set the active_tooltip to nothing
    window.active_tooltip = null;

    // the mouse tracker watches, if there are elements with ddui tooltip at the mouse position
    // if there are, the tooltip for the topmost of them will be shown
    window.addEventListener("mouseover", async event => {

        function KillTooltip() {

            // ... kill the active tooltip (if one exists)
            if ( window.active_tooltip ) {
                if ( window.active_tooltip.Tooltip ) {
                    window.active_tooltip.Tooltip.Discard();
                }
            }
            
            // ... clear the referencing variable "window.active_tooltip"
            window.active_tooltip = null;

        }

        // check if there is an element with tooltip at the mouse position
        const tooltip = await FindTooltipElement(event.clientX, event.clientY)

        // if yes, ...
        if ( tooltip ) {

            // ... if the tooltip element hasn't changed, don't do anything ...

            // ... but if the tooltip element has changed ...
            if ( ( !( window.active_tooltip ) ) ||
                 ( !( tooltip.anchor_node == window.active_tooltip.anchor_node ) )
            ) {

                // ... kill the active tooltip (if one exists)
                KillTooltip();

                // ... save the found tooltip at the mouse position to the referencing variable "window.active_tooltip"
                window.active_tooltip = tooltip;
                window.active_tooltip.Tooltip = new Tooltip(window.active_tooltip.anchor_node, window.active_tooltip.text);

            }
        
        // if not, ...
        } else {
            KillTooltip();
        }

    });

}






export class Tooltip{

    constructor(anchor_node, text) {

        this.is_launched = false;
        this.still_there = true;
        this.anchor_node = anchor_node;
        this.text = text;

        this.countdown = new Promise(res => setTimeout(() => {
            if (this.still_there) { res(true) }
            else { res(false) }
        }, 300));

        this.Launch();

    }

    async Launch() {

        if ( await this.countdown ) {

            if ( ! this.is_launched ) {
    
                this.Box = new ddui.Box({
                    modal: false,
                    style: `background-color: var(--ddui_page_text);` +
                        `box-shadow: var(--ddui_boxShadow_very_small); ` +
                        `border: 1px solid var(--ddui_line); ` +
                        `opacity: 0.9; ` +
                        `color: var(--ddui_page_background_hover); `,
                    align_mode: "positioned",
                    anchor_node: this.anchor_node
                });
        
                this.Box.Fill({
                    container_style: `padding: 5px 8px 5px 8px;`,
                    content: this.text,
                    buttons: [],
                    build_buttonbar: false
                });
    
                this.is_launched = true;
    
            }

        };

    }

    Discard() {
        this.still_there = false;
        if ( this.Box ) {
            this.Box.Discard();
        }
    }

}






// start the tooltip manager automatically (to make tooltips appear)
InitTooltipManager();