





// importing theme functions
import { GetActiveTheme, SetThemeIcon, ToggleTheme } from "./js/theme.js"; export { GetActiveTheme, SetThemeIcon, ToggleTheme };

// importing the basic classes
import { Overlay as Overlay } from "./js/Overlay.js"; export { Overlay };
import { Box as Box } from "./js/Box.js"; export { Box };

// looping through the box classes
// this special approach aims to a easier usage, as the term "new" must not be used (e.g. "ddui.MessageBox" instead of "new ddui.MessageBox")
import { MessageBox as MessageBoxClass } from "./js/MessageBox.js";
export async function MessageBox(content, type, buttons, allow_exit) { return new MessageBoxClass(content, type, buttons, allow_exit) };
import { Popup as PopupClass } from "./js/Popup.js";
export async function Popup(items, align_mode, anchor_node, type) { return new PopupClass(items, align_mode, anchor_node, type) };
import { Dialogue as DialogueClass } from "./js/Dialogue.js";
export async function Dialogue(title_text, title_icon, html, html_ref, css, css_ref, values, put_focus_on_element_with_id, buttons, allow_exit) { return new DialogueClass(title_text, title_icon, html, html_ref, css, css_ref, values, put_focus_on_element_with_id, buttons, allow_exit) };
import { LoadingBox as LoadingBoxClass } from "./js/LoadingBox.js";
export async function LoadingBox(info_text) { return new LoadingBoxClass(info_text) };
import { Toaster as ToasterClass } from "./js/Toaster.js";
export async function Toaster(text) { return new ToasterClass(text) };

// looping through the typical object-classes
import { Tile as Tile, Tiles as Tiles } from "./js/Tiles.js"; export { Tile, Tiles };
import { List as List } from "./js/List.js"; export { List };

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






async function InitDdui() {

    if ( IsDduiCssActive() != true ) {

        // It can be, that the app already imports the ddui css
        // (as recommended for a native behaviour like immediate responsive theme appliance).
        // In that case, fetch the ddui style sheet.
        const ddui_style_sheet = GetDduiStyleSheet();
        
        // Instance the ddui style sheet (maybe additional if already imported)
        const style_ref = document.createElement("link");
        style_ref.id = "ddui_css";
        style_ref.title = "ddui_css";
        style_ref.setAttribute("rel", "stylesheet");
        style_ref.setAttribute("href", "css/ddui.css");
        document.head.appendChild(style_ref);

        // If the ddui styles are already applied by an import rule in the app's css
        // the import rule shall be deleted to not have redundant style rules.
        if ( ddui_style_sheet ) {
            DeleteDduiCssImportRule(ddui_style_sheet);
        }

        // Check the applied ddui theme (light, dark, system) with a delay of 2s
        // because if the loading of the newly created style link right above takes a little time
        setTimeout(() => {
            const theme = getComputedStyle(document.body).getPropertyValue('--ddui_theme');
            sessionStorage.setItem("ddui_theme", theme);
        }, 2000);

    }

    // If there is a node with the id "ddui_theme_icon", it's innerText will be set to the icon depending on the active theme
    SetThemeIcon();

}






// ###########################
// ### ----- SHARED ------ ###

export function DisplayError(errormessage) {
    MessageBox(errormessage.replace(/(?:\r\n|\r|\n)/g, '<br>'), "error");
}






export function Log(message, source, level = "INF") {
    if ( level === "ERR" ) {
        console.error(`${source} reports the following error:\n${message}`);
    } else {
        console.log(`log message from ${source} (level "${level}"):\n${message}`);
    }
}






export async function WaitForDom(element_id, wait_for_what) {

    switch (wait_for_what) {

        case "does_exist":

            // if it's already there, no waiting is needed ...
            if ( document.getElementById(element_id) ) { return true }

            // ... otherwise a promise is given, that it will be (soon).
            return new Promise(resolve => {  
                const observer = new MutationObserver(() => {
                    if ( document.getElementById(element_id) ) {
                        observer.disconnect();
                        resolve(true);
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
            });

        case "does_not_exist":            

            // if it's not there, no waiting is needed ...
            if ( !document.getElementById(element_id) ) { return true }

            // ... otherwise a promise is given, that it will not be (soon).
            return new Promise(resolve => {  
                const observer = new MutationObserver(() => {
                    if (!document.getElementById(element_id)) {
                        observer.disconnect();
                        resolve(true);
                    }
                });
                observer.observe(document.body, { subtree: true, childList: true });
            });        

    }

}






export function GetSpinner(color, size, padding) {
    
    // Validate color
    if ( color == null ) { color = "var(--ddui_primary)" };

    // Validate size
    if ( typeof(size) == "number" ) {
        size = String(size) + "px";
    } else {
        if ( size == null ) { size = "32px" }
    };

    // Validate padding
    if ( typeof(padding) == "number" ) {
        padding = String(padding) + "px";
    } else {
        if ( padding == null ) { padding = "0" }
    };

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; padding: ${padding}; background: none; display: block; shape-rendering: auto;" width="${size}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g>
      <path d="M50 8A42 42 0 1 0 92 50.00000000000001" fill="none" stroke="${color}" stroke-width="8"></path>
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.641025641025641s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </g>
    </svg>`
}






export function GenerateUuid() {
    let d = new Date().getTime(); //Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){ //Use timestamp until deleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}






export function GetHighestZIndex() {
    let z_index;
    const highest_z_index = sessionStorage.getItem("ddui_highest_z_index");
    ( highest_z_index == null ) ? z_index = 1000 : z_index = Number(highest_z_index) + 1;
    sessionStorage.setItem("ddui_highest_z_index", z_index);
    return z_index;
}






// ###########################
// ### ----- STYLING ----- ###

// Check if the ddui css is already active via html reference in the head of the html
function IsDduiCssActive() {

    const style_sheets = document.styleSheets;

    // itarate through all the style sheets of the page
    for ( let style_sheet of style_sheets ) {
        // for each style sheet: itarate through all the css rules
        for ( let css_rule of style_sheet.cssRules ) {
            // if the selector "#ddui_alive" is found, the ddui css is already active => return true
            if ( css_rule.selectorText === "#ddui_alive" ) {
                return true
            }
        }
    }

    // otherwise the ddui css is not active => return false
    return false

}






// This function digs through all the stylesheets and returns the ddui style sheet, if it is found
export function GetDduiStyleSheet() {

    // This function collects all the style rules within a style sheet and its descendants (recursive).
    // It returs a list of all the style rules including the corresponding styls sheet. Scheme:
    // [
    //     {
    //         style_sheet: <style_sheet>,
    //         css_rule: <css_rule>
    //     },
    //     ...
    // ]
    function GetAllStyleRulesFromStyleSheetRecursive(style_sheet) {

        let style_rules = [];
        let css_rule_type;

        for ( let css_rule of style_sheet.cssRules ) {

            css_rule_type = Object.prototype.toString.call(css_rule);

            if ( css_rule_type.includes("CSSImportRule") ) {
                style_rules = style_rules.concat(GetAllStyleRulesFromStyleSheetRecursive(css_rule.styleSheet));
            } else if ( css_rule_type.includes("CSSStyleRule") ) {
                style_rules.push( { style_sheet: style_sheet, css_rule: css_rule } );
            }

        }

        return style_rules;

    }
    
    const style_sheets = document.styleSheets;

    // Collect the style rules of all the documents style sheets
    let all_style_rules = [];
    for ( let style_sheet of style_sheets ) {
        all_style_rules = all_style_rules.concat(GetAllStyleRulesFromStyleSheetRecursive(style_sheet));    
    }

    // If found, return the ddui style sheet.
    for ( let style_rule of all_style_rules ) {
        if ( style_rule.css_rule.selectorText === "#ddui_alive" ) {
            return style_rule.style_sheet;
        }
    }

    // Return false if the ddui style sheet wasn't found.
    return false

}






// This function deletes the (first) ddui css import rule, if one exists
function DeleteDduiCssImportRule() {

    // This function collects all the import rules within a style sheet and its descendants (recursive).
    // It returs a list of all the import rules including the corresponding style sheet. Scheme:
    // [
    //     {
    //         style_sheet: <style_sheet>,
    //         css_rule: <css_rule>
    //     },
    //     ...
    // ]
    function GetAllImportRulesFromStyleSheetRecursive(style_sheet) {

        let import_rules = [];
        let css_rule_type;

        for ( let css_rule of style_sheet.cssRules ) {

            css_rule_type = Object.prototype.toString.call(css_rule);

            if ( css_rule_type.includes("CSSImportRule") ) {
                import_rules.push( { style_sheet: style_sheet, css_rule: css_rule } );
                import_rules = import_rules.concat(GetAllImportRulesFromStyleSheetRecursive(css_rule.styleSheet));
            }

        }

        return import_rules;

    }

    // This function delivers the stylesheet that contains the ddui css import rule
    function GetStyleSheetWithDduiCssImportRule() {

        const style_sheets = document.styleSheets;

        // Collect the import rules all the document's style sheets
        let all_import_rules = [];
        for ( let style_sheet of style_sheets ) {
            all_import_rules = all_import_rules.concat(GetAllImportRulesFromStyleSheetRecursive(style_sheet));    
        }

        // If found, return the ddui style sheet.
        for ( let import_rule of all_import_rules ) {
            if ( import_rule.css_rule.cssText === `@import url(\"ddui/ddui.css\");` ) {
                return import_rule.style_sheet;
            }
        }

        // Return false if the ddui style sheet wasn't found.
        return false

    }

    // Fetch the style sheet with the ddui css import rule
    const importing_style_sheet = GetStyleSheetWithDduiCssImportRule();

    if ( importing_style_sheet ) {
        // Delete the ddui css import rule
        let index = -1;
        for ( let css_rule of importing_style_sheet.cssRules ) {
            index += 1;
            if ( css_rule.cssText === `@import url(\"ddui/ddui.css\");` ) {
                importing_style_sheet.deleteRule(index);
                return true;
            }
        }        
    }

    return false;

}






InitDdui();