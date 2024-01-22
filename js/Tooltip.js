





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Tooltip{

    constructor(anchor_node, tooltip_text) {

        // Add event listner to the anchor node (for showing the tooltip when entering the anchor node) ...
        anchor_node.addEventListener("mouseenter", () => {

            this.Box = new ddui.Box({
                modal: false,
                align_mode: "positioned",
                anchor_node: anchor_node
            });
    
            this.Box.Fill({
                content: tooltip_text,
                buttons: [],
                build_buttonbar: false
            });

            // ... and also add the event listner for discarding the tooltip when leaving the anchor node
            anchor_node.addEventListener("mouseleave", () => {
                this.Discard();
            } );

        })        

    }

    Discard() {
        this.Box.Discard();
    }

}