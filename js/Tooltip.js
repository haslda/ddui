





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

    // the "mouse tracker" (as handler to the window mouseover event) watches, if there are elements with tooltip at the mouse position
    // if there are, the tooltip for the topmost of them will be shown
    window.addEventListener("mouseover", async event => {

        function KillTooltip() {

            // kill the active tooltip (if one exists) ...
            if ( window.active_tooltip ) {
                if ( window.active_tooltip.Tooltip ) { window.active_tooltip.Tooltip.Discard(); }
            }
            
            // ... and also clear the referencing variable "window.active_tooltip"
            window.active_tooltip = null;

        }

        // 1) check if there is an element with tooltip at the mouse position and fetch the tooltip
        const tooltip = await FindTooltipElement(event.clientX, event.clientY)

        // 2a) if an element with tooltip was found ...
        if ( tooltip ) {

            // ... and if the tooltip is new to the mouse tracker
            // (which would meant that there was no or another tooltip right before the new one) ...
            if ( ( !( window.active_tooltip ) ) ||
                 ( !( tooltip.anchor_node == window.active_tooltip.anchor_node ) )
            ) {

                // ... kill the active tooltip (if one exists), ...
                KillTooltip();

                // ... create the new tooltip and save it to the referencing variable "window.active_tooltip"
                window.active_tooltip = tooltip;
                window.active_tooltip.Tooltip = new Tooltip(window.active_tooltip.anchor_node, window.active_tooltip.text);

            }
        
        // 2b) if no element with tooltip was found ...
        } else {
            // ... kill the active tooltip (if one exists).
            KillTooltip();
        }

    });

}






export class Tooltip{

    // by constructing, the tooltip is not created in the dom
    // this happens only if the countdown passes without the mouse leaving the tooltip's anchor_node
    constructor(anchor_node, text) {

        this.is_launched = false;
        this.still_there = true;
        this.anchor_node = anchor_node;
        this.text = text;

        // this countdown has the job to delay the popping up of the tooltip
        this.countdown = new Promise(res => setTimeout(() => {
            if (this.still_there) { res(true) }
            else { res(false) }
        }, 300));

        this.Launch();

    }

    async Launch() {

        // the launch is the creating of the tooltip in the dom
        // but it will only happen, if the countdown passes without the mouse leaving the tooltip's anchor_node
        if ( await this.countdown ) {

            // this check takes care, that a tooltip cannot get created in the dom more often than once
            if ( ! this.is_launched ) {
    
                // create the tooltip box in the dom (with a custom box style for tooltips)
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
        
                // fill the tooltip box in the dom (with the tooltip text)
                this.Box.Fill({
                    container_style: `padding: 5px 8px 5px 8px;`,
                    content: this.text,
                    buttons: [],
                    build_buttonbar: false
                });
    
                // mark the tooltip as "lauched"
                this.is_launched = true;
    
            }

        };

    }

    // discard the tooltip box (and implicitly the tooltip from the dom)
    Discard() {

        // discard the countdown
        // (this needs to be done, as soon as the mouse leaves the tooltip's anchor node,
        // because otherwise the countdown would pass and the tooltip would be created in the dom,
        // although meanwhile the mouse has moved away from the tooltip's anchor node)
        this.still_there = false;

        // if the tooltip has never been created in the dom, nothing has to be done
        if ( this.Box ) {
            // but otherwise: kill it
            this.Box.Discard();
        }
    }

}






// start the tooltip manager automatically (to make tooltips appear)
InitTooltipManager();