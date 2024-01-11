





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Dialogue{
 
    constructor(
        title_text,   // String; text in header (dialogue title)
        title_icon,   // String; name of material icon in header (dialogue title)
        html_ref,     // String; relative url to dialogue content html
        css_ref,      // String; relative url to dialogue custom css
        values,       // List; same es definded for "Box.Fill()""
        put_focus_on_element_with_id,   // String; id of element that shall be focused
        buttons,      // List; same es definded for "Box.Fill()""
        allow_exit    // Boolean; same es definded for "Box.constructor()""
    ) {

        // ====================
        // Validate call parameters and set defaults
        if ( html_ref == null ) { ddui.Log( "Missing argument 'html_ref' when constructing a Dialogue.", __file__, "ERR" )}
        else { if ( html_ref.slice(0,1) != "/" ) { html_ref = "/" + html_ref } } // if html_ref comes without a "/" at the beginning, it shall be added
        if ( css_ref.slice(0,1) != "/" ) { css_ref = "/" + css_ref }; // if css_ref comes without a "/" at the beginning, it shall be added
        if ( buttons == null ) { buttons = [{ label: "OK" }] }; // If no buttons are given => default: OK button only
        if ( allow_exit == null ) { allow_exit = true } // If not defined, the messageBox shall be exitable

        this.id = "ddui_Dialogue_" + ddui.GenerateUuid();

        // ====================
        // Create a modal box
        this.Box = new ddui.Box({ allow_exit: allow_exit, CallbackOnDiscard: this.Discard.bind(this) });
        this.Fill( title_text, title_icon, html_ref, css_ref, values, buttons, put_focus_on_element_with_id );

    }






    async Fill( title_text, title_icon, html_ref, css_ref, values, buttons, put_focus_on_element_with_id ) {

        // ====================
        // Build the dialogue content html
        let dialogue_html = sessionStorage.getItem("ddui_dialogue_" + html_ref);
        if ( ! dialogue_html ) {
            const res = await fetch( sessionStorage.getItem("client_base_url") + html_ref );
            dialogue_html = await res.text();
            sessionStorage.setItem("ddui_dialogue_" + html_ref, dialogue_html);
        }
        const html = `<div class="ddui_dialogue_box">` + dialogue_html + `</div>`;

        // ====================
        // Insert dialogue style
        let dialogue_css = sessionStorage.getItem("ddui_dialogue_" + css_ref);
        if ( ! dialogue_css ) {
            const css = await fetch( sessionStorage.getItem("client_base_url") + css_ref );
            dialogue_css = await css.text();
            sessionStorage.setItem("ddui_dialogue_" + css_ref, dialogue_css);
        }
        const styles = document.createElement("style");
        styles.id = this.id + "_style";
        styles.innerHTML = dialogue_css;
        document.head.appendChild(styles);

        // ====================
        // Fill the box with the dialogue content and unset the size
        this.Box.Fill({
            title: title_text,
            title_icon: title_icon,
            content: html,
            values: values,
            buttons: buttons,
            put_focus_on_element_with_id: put_focus_on_element_with_id,
            build_buttonbar: true,
            smooth_resize: true
        });   

    }






    Discard() {
        // discard custom dialogue css
        document.getElementById(this.id + "_style").remove();
    }

}