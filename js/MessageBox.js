





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class MessageBox{

    // args:
    // - content      String; Text oder html-String
    // - type         String; "bare" (default; simple message box), "info", "warning", "error", "success"
    // - buttons      List; same es definded for "Box.Fill()""
    // - allow_exit   Boolean; same es definded for "Box.constructor()""
    constructor(content, type, buttons, allow_exit) {

        // ====================
        // Validate call parameters and set defaults
        if ( content == null ) { ddui.Log( "Missing argument 'content' when constructing a MessageBox.", __file__, "ERR" )};
        if ( type == null ) { type = "bare" }; // Setting default for type: "bare"
        if ( buttons == null ) { buttons = [{ label: "OK" }] }; // If no buttons are given => default: OK button only
        if ( allow_exit == null ) { allow_exit = true } // If not defined, the messageBox shall be exitable

        this.id = "ddui_MessageBox_" + ddui.GenerateUuid();

        // ====================
        // Create a modal box
        this.Box = new ddui.Box({ allow_exit: allow_exit });

        // ====================
        // define a box header if param "type"
        let title_icon;
        let title_text;
        let title_text_color;
        let title_background_color;
        if ( type != "bare" ) {
            switch ( type ) {
                case "info":
                    title_icon = "info";
                    title_text = "Information";
                    title_text_color = "var(--ddui_button_text)";
                    title_background_color = "#0000cc";
                    break;
                case "warning":
                    title_icon = "warning";
                    title_text = "Warning";
                    title_text_color = "var(--ddui_button_text)";
                    title_background_color = "#cc7a00";
                    break;
                case "error":
                    title_icon = "error";
                    title_text = "Error";
                    title_text_color = "var(--ddui_button_text)";
                    title_background_color = "var(--ddui_red_surface)";
                    break;
                case "success":
                    title_icon = "done";        
                    title_text_color = "var(--ddui_button_text)";
                    title_background_color = "#00802b";
                    break;
            }
        }

        // ====================
        // fill the box with the message box content
        this.Box.Fill({
            title: title_text,
            title_icon: title_icon,
            title_text_color: title_text_color,
            title_background_color: title_background_color,
            content: `<div class="ddui_MessageBox_content">${content}</div>`,
            buttons: buttons,
            build_buttonbar: true,
            container_style: "min-width: 250px; max-width: 500px;"
        });

    }

}