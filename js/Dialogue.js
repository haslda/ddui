





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Dialogue{
 
    constructor(
        title_text,   // String; text in header (dialogue title)
        title_icon,   // String; name of material icon in header (dialogue title)
        html,         // String: dialogue content html (alternative to html_ref)
        html_ref,     // String; relative url to dialogue content html (alternative to html)
        css,          // String: dialogue custom css (alternative to css_ref)
        css_ref,      // String; relative url to dialogue custom css (alternative to css)
        values,       // List; same es definded for "Box.Fill()""
        put_focus_on_element_with_id,   // String; id of element that shall be focused
        buttons,      // List; same es definded for "Box.Fill()""
        allow_exit    // Boolean; same es definded for "Box.constructor()""
    ) {

        // ====================
        // Validate call parameters and set defaults

        if ( html == null && html_ref == null ) { ddui.Log( "Missing argument 'html' or 'html_ref' when constructing a Dialogue.", __file__, "ERR" )}
        else {
            if ( html ) {} // if "html" is given, it will be used (and html_ref not)
            else { if ( html_ref.slice(0,1) != "/" ) { html_ref = "/" + html_ref } } // if html_ref comes without a "/" at the beginning, it shall be added
        }
        if ( css ) {} else {
            if ( css_ref ) {
                if ( css_ref.slice(0,1) != "/" ) { css_ref = "/" + css_ref }; // if css_ref comes without a "/" at the beginning, it shall be added
            }
        }
        if ( buttons == null ) { buttons = [{ label: "OK" }] }; // If no buttons are given => default: OK button only
        if ( allow_exit == null ) { allow_exit = true } // If not defined, the messageBox shall be exitable

        this.id = "ddui_Dialogue_" + ddui.GenerateUuid();

        // ====================
        // Create a modal box
        this.Box = new ddui.Box({ allow_exit: allow_exit });
        this.Fill( title_text, title_icon, html, html_ref, css, css_ref, values, buttons, put_focus_on_element_with_id );

    }






    async Fill( title_text, title_icon, html, html_ref, css, css_ref, values, buttons, put_focus_on_element_with_id ) {

        // ====================
        // Build the dialogue content html

        // if a html is given, it is used as content for the dialogue (and html_ref is ignored)
        if ( html ) {

        // if no html is given, html_ref is used
        } else {
        
            // if it's already cached, use it ...
            html = sessionStorage.getItem("ddui_dialogue_" + html_ref);
            if ( ! html ) {

                // ... otherwise fetch it from it's origin
                const res = await fetch( sessionStorage.getItem("client_base_url") + html_ref );
                html = await res.text();

                // save the fetched html in the cache
                sessionStorage.setItem("ddui_dialogue_" + html_ref, html);
            }
        }

        // wrap html with the dialoge box div
        html = `<div class="ddui_Dialogue_content">` + html + `</div>`;

        // ====================
        // Insert dialogue style

        // if a css is given, it is used as style for the dialogue (and css_ref is ignored)
        if ( css ) {

        // if no css is given but css_ref, css_ref is used
        } else if ( css_ref ) {

            css = sessionStorage.getItem("ddui_dialogue_" + css_ref);
            if ( ! css ) {
                const res = await fetch( sessionStorage.getItem("client_base_url") + css_ref );
                css = await res.text();
                sessionStorage.setItem("ddui_dialogue_" + css_ref, css);
            }
        }

        if ( css ) {
            const styles = document.createElement("style");
            styles.id = this.id + "_style";
            styles.innerHTML = css;
            document.head.appendChild(styles);
        }

        // ====================
        // Fill the box with the dialogue content and unset the size
        this.Box.Fill({
            title_text: title_text,
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
        this.Box.Discard();
        try {
            // discard custom dialogue css
            document.getElementById(this.id + "_style").remove();
        } catch {}
    }

}