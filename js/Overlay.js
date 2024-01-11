





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Overlay {

    constructor(style, allow_exit = true) {
        
        this.id = "ddui_Overlay_" + ddui.GenerateUuid();
        this.allow_exit = allow_exit;

        // style can be "shiny", "shady" (default) or "invisible"
        this.style = ( style == null ) ? "shady" : style;

        document.body.style.maxHeight = "100%";

        // Creating & defining overlay div
        this.node = document.createElement("div");
        this.node.id = this.id;
        this.node.setAttribute("name", "ddui_Overlay");
        this.node.classList.add("ddui_Overlay");
        this.node.style.top = window.scrollY + "px";

        // Set background color of overlay, according to the style param
        if ( this.style === "shady" ) { this.node.style.backgroundColor = "var(--ddui_background_shady)" }
        else if ( this.style === "invisible" ) { this.node.style.backgroundColor = null }
        else { this.node.style.backgroundColor = "var(--ddui_background_shiny)" }

        // put overlay on top of everything else
        this.node.style.zIndex = ddui.GetHighestZIndex();

        // block page scrolling
        RegisterToScrollBlocker(this.id);

        // Insert overlay
        document.body.prepend(this.node);

    }

    Discard() {
        // stop blocking page scrolling
        DeregisterFromScrollBlocker(this.id);
        // remove overlay from dom
        this.node.remove();
    }

}





// How the ScrollBlocker works:
// - When an overlay is instanciated, it registers to the scroll blocker
// - the scroll blocker is a list of all subscribers
// - with adding the first subscriber to the list, page scrolling gets disabled
// - with removing the last subscriber from the list, page scrolling get enabled again

function RegisterToScrollBlocker(overlay_id) {
    if ( !window.ScrollBlocker || window.ScrollBlocker.length <= 0 ) {
        window.ScrollBlocker = [];
        const x = window.scrollX;
        const y = window.scrollX;
        window.onscroll = () => window.scrollTo(x, y);
    }
    window.ScrollBlocker.push(overlay_id);
}

function DeregisterFromScrollBlocker(overlay_id) {
    const index = window.ScrollBlocker.indexOf(overlay_id);
    window.ScrollBlocker.splice(index, 1);
    if ( window.ScrollBlocker.length <= 0 ) {
        window.onscroll = null
    }
}