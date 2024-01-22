





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
        this.scroll_blocker_id = ddui.RegisterToScrollBlocker();

        // Insert overlay
        document.body.prepend(this.node);

    }

    Discard() {
        // stop blocking page scrolling
        ddui.DeregisterFromScrollBlocker(this.scroll_blocker_id);
        // remove overlay from dom
        this.node.remove();
    }

}