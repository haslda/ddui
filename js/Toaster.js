





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Toaster{

    constructor(text) {

        // ====================
        // Validate call parameters
        if ( text == null ) {
            text = "(empty)";
            ddui.Log( "Missing argument 'text' when constructing a Toaster.", __file__, "ERR" )
        };
        this.text = text;

        // ====================
        // Create a modal box
        this.Box = new ddui.Box({
            modal: false,
            align_mode: "centered_top"
        });

        // ====================
        // Build the content

        const button_id = "ddui_button_" + ddui.GenerateUuid();

        // Toaster
        let html = `<div class="ddui_Toaster_box">`;
    
        // countdown bar
        this.bar_id = "ddui_Toaster_bar_" + ddui.GenerateUuid();
        html += `<div id="${this.bar_id}" class="ddui_Toaster_countdown_bar"></div>`
    
        // content container
        html += `<div class="ddui_Toaster_content_container">`;
    
        // content (text + close icon)
        html += `<div class="ddui_Toaster_content">${this.text}</div>`;
        html += `<div id="${button_id}" class="ddui_Toaster_close_button">
                    <span class="material-icons">close</span>
                 </div>`;
    
        html += `</div></div>`;

        const buttons = [{
            id: button_id,
            onclick: () => { console.log("hey") },
            closeOnClick: true
        }];

        this.Box.Fill({
            content: html,
            buttons: buttons,
            build_buttonbar: false,
            container_style: "padding: 0;"
        });

        this.ComeWaitAndGo();
    
    }

    async ComeWaitAndGo() {

        // fly in effect
        this.Box.node.style.top = String(Number( this.Box.node.style.top.slice(0,-2) ) - 20) + "px";
        for ( let i=0; i<20; i++ ) {
            this.Box.node.style.top = String( Number( this.Box.node.style.top.slice(0,-2) ) + 1 ) + "px";
            this.Box.node.style.opacity = String(i / 20);
            await new Promise(resolve => setTimeout(resolve, 10));
        }
        this.Box.node.style.opacity = 1;

        // countdown until self destroy
        let counter = 100;
        const bar = document.getElementById(this.bar_id);
        const bar_width = bar.getBoundingClientRect().width;
        bar.style.width = String(bar_width) + "px";
        const interval = 10 + Math.floor(this.text.length / 2);
        while ( counter > 0 ) {
            counter -= 1;
            await new Promise(resolve => setTimeout(resolve, interval));
            bar.style.width = String(bar_width * counter / 100) + "px";
        }

        // fly out effect
        for ( let i=20; i>0; i-- ) {
            this.Box.node.style.top = String( Number( this.Box.node.style.top.slice(0,-2) ) - 1 ) + "px";
            this.Box.node.style.opacity = String(i / 20);
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        this.Box.Discard();

    }

}