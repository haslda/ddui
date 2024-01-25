





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Tooltip{

    constructor(anchor_node, tooltip_text) {

        // Add event listner to the anchor node (for showing the tooltip when entering the anchor node) ...
        anchor_node.addEventListener("mouseenter", async () => {

            // (the tooltip shall not appear immediately on hover but after a little countdown)
            let countdown = new Promise(res => setTimeout(res, 300));

            // ... and also add the event listner for discarding the tooltip when leaving the anchor node
            anchor_node.addEventListener("mouseleave", () => {
                
                // (if the mouse leaves, the countdown gets discarded)
                countdown = null;
                
                // (the try is needed, if the mouse leaves before the Tooltip got created; otherwise the Discard() would throw an exception)
                try { this.Discard(); } catch {}

            } );            

            // wait for the countdown before creating the tooltip
            await countdown;

            // if the countdown finishes before the mouse leaves, the tooltip gets created
            if ( countdown ) {

                this.Box = new ddui.Box({
                    modal: false,
                    style: `background-color: var(--ddui_page_text);` +
                        `box-shadow: var(--ddui_boxShadow_very_small); ` +
                        `border: 1px solid var(--ddui_line); ` +
                        `opacity: 0.9; ` +
                        `color: var(--ddui_page_background_hover); `,
                    align_mode: "positioned",
                    anchor_node: anchor_node
                });
        
                this.Box.Fill({
                    container_style: `padding: 5px 8px 5px 8px;`,
                    content: tooltip_text,
                    buttons: [],
                    build_buttonbar: false
                });

            }

        })        

    }

    Discard() {
        this.Box.Discard();
    }

}