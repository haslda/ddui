





// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );
const ddui_root_absolute = import.meta.url.slice(0, -1 * __file__.length);
export const ddui_root = ddui_root_absolute.split(window.location.host)[1];






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
export function LoadingBox(info_text, duration_in_ms) { return new LoadingBoxClass(info_text, duration_in_ms) };
import { Toaster as ToasterClass } from "./js/Toaster.js";
export async function Toaster(text) { return new ToasterClass(text) };
import { Tooltip as TooltipClass } from "./js/Tooltip.js";
export async function Tooltip(anchor_node, tooltip_text) { return new TooltipClass(anchor_node, tooltip_text) };

// looping through the typical object-classes
import { Tile as Tile, Tiles as Tiles } from "./js/Tiles.js"; export { Tile, Tiles };
import { List as List } from "./js/List.js"; export { List };






async function InitDdui() {

    // Check if ddui css is already directly refereced in the dom (via link element with rel="stylesheet") ...
    let is_ddui_css_referenced_in_dom = false;
    for ( let link_element of document.head.getElementsByTagName("link") ) {
        if ( link_element.getAttribute("href").slice(-12) === "css/ddui.css" ) {
            is_ddui_css_referenced_in_dom = true;
        }
    }

    // ... if not, put it there
    if ( ! is_ddui_css_referenced_in_dom ) {

        // Instance the ddui style sheet (maybe additional if already imported)
        const style_ref = document.createElement("link");
        style_ref.id = "ddui_css";
        style_ref.title = "ddui_css";
        style_ref.setAttribute("rel", "stylesheet");
        style_ref.setAttribute("href", ddui_root + "css/ddui.css");
        document.head.appendChild(style_ref);        
        
    }

    // If the ddui style sheet is already applied by one or more import rules in the app's css
    // these import rules shall be deleted to not have redundant style rules.
    try {
        DeleteAllDduiCssImportRules();
    } catch (err) {
        Log("Deleting ddui css import rules failed.\n" + err.stack, __file__, "ERR")
    }

    // Check which ddui theme is active (light, dark or system)
    // (it can take some milliseconds until the css variable "--ddui_theme" is available)
    let theme = null;
    do {
        theme = getComputedStyle(document.body).getPropertyValue('--ddui_theme');
        await new Promise(res => setTimeout(res, 10));
    } while ( theme == null )
    sessionStorage.setItem("ddui_theme", theme);

    // If there is a node with the id "ddui_theme_icon", it's innerText will be set to the icon depending on the active theme
    SetThemeIcon();

    // window.addEventListener("keydown", HandleKeyDownForTabControl);

    // Wait for 1s (to let the page load) and then show the ddui welcome message (if not yet deactivated)
    await new Promise(res => setTimeout(res, 1000));
    if ( !document.querySelector("meta[name='ddui']") ) {
        ShowWelcomeDialogue();
    }

}






//
export function ShowWelcomeDialogue() {

    const target_url = import.meta.url.slice(0,-7) + "wiki/ddui_wiki.html";

    const html = `
        <div style="max-width: 500px; display: flex; flex-direction: column;">
            <h1 style="margin-top: 10px; white-space: nowrap; width: min-content; align-self: center; rotate: -2deg; margin-bottom: 20px;">
                Welcome to <span style="color: var(--ddui_green_text); text">d.ui</span><span style="color: var(--ddui_blue_text)"></span> !
            </h1>
            <p>Check out the <a href="${target_url}" target="_blank">d.ui wiki</a> to start using it right away.</p>
            <p>To stop this message from appearing, insert this meta tag to the head section of your html page:</p>
            <p style="
                border: 1px solid var(--ddui_line_soft);
                border-radius: 3px;
                background-color: var(--ddui_shady);
                padding: 10px;
                font-family: Courier New;
                color: var(--ddui_page_text_emphasized);
                font-weight: 700;">
                    &lt<span style="color: var(--ddui_pink_text)">meta</span>
                    <span style="color: var(--ddui_blue_text)">name</span>="<span style="color: var(--ddui_green_text)">ddui</span>"&gt
            </p>
        </div>
    `;

    Dialogue(null, null, html, null, null, null, null, null, [
        {
            label: "Close",
            style: "inferior"
        },
        {
            label: "d.ui wiki",
            onClick: () => { window.open( target_url, "_blank" ) }
        }
    ]);

}






// removes the focus from the active dom element
export async function ResetFocus() {

    let box;

    // if modal boxes are alive, the (quasi) focus shall be given to the box
    if ( (window.ModalBoxes) && ( window.ModalBoxes.length > 0 ) ) {
        box = window.ModalBoxes[window.ModalBoxes.length - 1].node;

    // otherwise it shall be given to the body
    } else {
        box = document.body;
    }

    // the actual magic: make focusable, set focus, make un-focusable again
    box.setAttribute("tabindex", "0");
    box.focus();
    box.removeAttribute("tabindex");

}






// Event handler for discarding boxes with the escape key
function HandleKeyDownForTabControl(event) {

    // if Escape is pressed ...
    if (event.key === 'Tab') {


        // // ... fetch the top most box (the box on top of all the others) ...
        // const top_most_box = window.EscapeHandlerBoxes[window.EscapeHandlerBoxes.length - 1];
        // // ... and discard it, if exiting is allowed.
        // if ( top_most_box.allow_exit ) { top_most_box.Discard(); }

    }
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






export async function GetAllElememtsFromPoint(x, y) {

    let elements = [];
    let element;
    let limiter = 0;

    // dig down throug all layers of the dom at the position "x, y" ...
    do {

        // ... fetch every element there ...
        element = document.elementFromPoint(x, y);
        // ... ignore the element on the next elementFromPoint check ...
        element.classList.add('ddui_pointer_events_none');
        // ... and remember it to clean up afterwards
        elements.push(element);

        // at page load this do loop sometimes runs into an infinite loop without a reason
        // this limiter cares for this not to happen
        limiter += 1;

    } while ( element.tagName !== 'HTML' && limiter <= 100 );

    // clean up all the elements that are ignored by the elementFromPoint check
    for ( let i  = 0; i < elements.length; i += 1 ) {
        elements[i].classList.remove('ddui_pointer_events_none');
    }

    // return the elements
    return elements;

}






export async function MeasureTextWidth(text, container) {

    // Create a phantom box (in the background), filled with the text
    // const phantom_box = document.createElement("div");
    // phantom_box.innerHTML = box_content;
    // phantom_box.style.position = "absolute";
    // phantom_box.style.zIndex = -1;
    // document.body.append(phantom_box);

    const inner = document.createElement("div");
    inner.style.position = "absolute";
    inner.style.zIndex = -1;
    inner.style.overflowX = "hidden";
    inner.style.whiteSpace = "nowrap";
    inner.innerText = text;    
    container.prepend(inner);
    const text_width = inner.getBoundingClientRect().width;
    inner.remove();
    return text_width;

}






export function RegisterToScrollBlocker() {

    // if it's the first and only subscriber ...
    if ( window.ScrollBlockerClients == null || window.ScrollBlockerClients.length <= 0 ) {

        // ... the subscribers list for the scroll blocker (ScrollBlockerClients) gets initiated, ...
        window.ScrollBlockerClients = [];

        // ... the scroll blocker is brougth to life ...
        window.ScrollBlocker = BlockScrolling.bind(null, window.scrollX, window.scrollY);
        window.addEventListener("scroll", window.ScrollBlocker);

    }

    const client_number = GenerateUuid();
    
    // add the subscriber to the subscribers list for the scroll blocker (ScrollBlockerClients)
    window.ScrollBlockerClients.push(client_number);

    return client_number;

}






export function DeregisterFromScrollBlocker(client_number) {

    // iterate through all scroll blocker clients (from the youngest backwards) ...
    let index = window.ScrollBlockerClients.length;
    for ( let client of window.ScrollBlockerClients.slice().reverse() ) {

        index -= 1;
        // ... and if the chosen one is found ...
        if ( client_number == client ) {

            // ... remove it from the ScrollBlockerClients ...
            window.ScrollBlockerClients.splice( index, 1 );

            // ... and if there is no other client left, then ...
            if ( window.ScrollBlockerClients.length <= 0 ) {

                //  ... and kill the Handler ...
                window.removeEventListener("scroll", window.ScrollBlocker);
                window.ScrollBlocker = null;                

            }
            break;

        }

    }    

}

function BlockScrolling(scrollX, scrollY) {
    window.scrollTo(scrollX, scrollY);
}






// ###########################
// ### ----- STYLING ----- ###

// Check if the ddui css is already active via html reference in the head of the html
async function IsDduiCssActive() {

    const style_sheets = document.styleSheets;

    // itarate through all the style sheets of the page
    for ( let style_sheet of style_sheets ) {
        // for each style sheet: itarate through all the css rules
        for ( let css_rule of style_sheet.cssRules ) {
            // if the selector "#ddui_alive" is found, the ddui css is already active => return true
            // console.log(css_rule.cssText);
            if ( ( css_rule.selectorText === "#ddui_alive" ) || ( css_rule.cssText === `@import url(".${ddui_root}css/ddui.css");` ) ) {
                return true
            }
        }
    }

    // otherwise the ddui css is not active => return false
    return false

}






// This function fetches the ddui style sheet and returns it
export function GetDduiStyleSheet() {

    for ( let ss of document.styleSheets ) {

        for ( let rule of ss.cssRules ) {

            if ( rule.selectorText === "#ddui_alive" ) {
                return ss;
            }

        }

    }

    return false;

}






// This function deletes all ddui css import rules
function DeleteAllDduiCssImportRules() {



    


    // Delivers a list of all style sheets (incl. imported style sheets; recursive)
    function GetAllStyleSheetsRecursive() {

        // This list will collect all style sheets recursively
        let all_style_sheets = [];






        // Evaluates, if a style sheet is already in the all_style_sheets list (by the href property) and returns true or false
        function IsStyleSheetAlreadyListed(href) {

            for ( let ss of all_style_sheets ) {
                if ( ss.href === href ) {
                    return true;
                }
            }

            return false;

        }






        function GetAllStyleSheetsRecursiveFromStyleSheet(style_sheet) {

            // if ( ! ( all_style_sheets ) ) { all_style_sheets = {} }

            let index = -1;
    
            // Iterate through all css rules of the style sheet ...
            for ( let css_rule of style_sheet.cssRules ) {
    
                index += 1;
    
                // ... if the css rule is an import rule ...
                if ( css_rule.cssText.slice(0,12) === `@import url(` ) {
    
                    // ... if the imported style sheet ist not yet in the all_style_sheets list ...
                    if ( ! ( IsStyleSheetAlreadyListed(css_rule.styleSheet.href) ) ) {

                        // ... add the imported style sheet to the all_style_sheets list ...
                        all_style_sheets.push(css_rule.styleSheet);

                        // ... and also go inside the imported style sheet and check if there are more (sub-imported) style sheets
                        GetAllStyleSheetsRecursiveFromStyleSheet(css_rule.styleSheet);

                    }
    
                }
    
            }

        }






        // Collect all style sheets in one super style sheet
        let super_style_sheet = {
            cssRules: [],
            href: "ddui_super_style_sheet"
        }
        for ( let style_sheet of document.styleSheets ) {
            super_style_sheet.cssRules.push({
                cssText: "@import url(...",
                href: style_sheet.href,
                styleSheet: style_sheet
            });
        }

        GetAllStyleSheetsRecursiveFromStyleSheet(super_style_sheet);

        return all_style_sheets;

    }





    // Fetch all style sheets (incl. imported style sheets recursively)
    const all_style_sheets = GetAllStyleSheetsRecursive();

    let rule;

    // Iterate through all style sheets
    for ( let ss of all_style_sheets ) {

        // For each style sheet: Iterate through all css rules in reverse
        for ( let i = ss.cssRules.length - 1; i >= 0; i -= 1 ) {

            rule = ss.cssRules[i];

            // If the rule is an import rule for the ddui.css ...
            if (( rule.cssText.slice(0,12) === `@import url(` ) && ( rule.cssText.slice(-15,) === `css/ddui.css\");` )) {

                // ... delete it
                ss.deleteRule(i);

            }

        }
    }

    return true;

}






InitDdui();