





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Popup{

    // args:
    // - items
    // - align_mode
    // - anchor_node
    // - type
    //
    // scheme for the "items" arg:
    // [
    //     {
    //         type: "button",              required
    //         label: "Testing button",     optional (but warmly recommended)
    //         icon: "sports_score",        optional
    //         onClick: () => MyFuncOne()   optional, event handler for button click (default is just closing the popup menu)
    //         style: "red"                 optional, possible values: null (default), "red"
    //         ...                          more properties can be looped through, e.g. a reference
    //     },
    //     {
    //         type: "line"
    //     },
    //     {
    //         type: "button",
    //         label: "Show / Hide API tester",
    //         icon: "menu_open"
    //         onClick: () => MyFuncTwo()
    //     }
    // ]
    //
    constructor(items, align_mode, anchor_node, type) {

        this.id = "ddui_Popup_" + ddui.GenerateUuid();

        // 1) Validate call parameters and set defaults
        if ( items == null ) { ddui.Log( "Missing argument 'items' when constructing a Popup.", __file__, "ERR" )};
        if ( type == null ) { type = "list_with_icons" } // default
        if ( anchor_node == null ) { align_mode = "centered" } // fallback (without anchor_node "positioned" wouldn't work)

        // 2) Create a modal box
        const box = new ddui.Box({ overlay_style: "invisible", align_mode: align_mode, anchor_node: anchor_node });

        let html;
        let buttons = [];

        if ( type == "list_with_icons" ) {
    
            // list
            html = `<div class="ddui_Popup_list">`;
            let button_id;

            for ( let item of items ) {
    
                switch ( item["type"] ) {
                   
                    // button
                    case "button":
    
                        button_id = "ddui_button_" + ddui.GenerateUuid();
                        item["id"] = button_id;
    
                        // button (icon + label)
                        html += `<div id="${button_id}" class="ddui_Popup_button${ ( item["style"] ) ? " ddui_Popup_button_" + item["style"] : "" }">
                            <div>
                                <span class="material-icons">${item["icon"]}</span>
                            </div>
                            <div class="ddui_Popup_label_box">
                                <span>${item["label"]}</span>
                            </div>
                        </div>`;

                        buttons.push(item);

                        break;
                    
                    // horizontal line
                    case "line":
    
                        html += `<hr class="ddui_Popup_line">`
                        break;
    
                }
    
            }
    
            html += "</div>"
        }

        box.Fill({
            content: html,
            buttons: buttons,
            build_buttonbar: false,
            container_style: "padding: 0;"
        });

    }

}