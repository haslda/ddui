





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export async function GetActiveTheme() {

    let active_theme;
    return await new Promise( async r => {

        // wait until ddui theme is set (maybe not set immediatly at page startup)
        while ( active_theme == null ) {
            await new Promise(res => setTimeout(res, 100));
            active_theme = getComputedStyle(document.body).getPropertyValue('--ddui_theme');
        }

        r(active_theme);

    } );

}






// If there is a node with the id "ddui_theme_icon", it's innerText will be set to the icon depending on the active theme
export async function SetThemeIcon(node_id_of_theme_icon = "ddui_theme_icon") {

    try {

        const active_theme = await GetActiveTheme();
        
        // set the theme icon according to the active theme
        const ddui_theme_icon = document.getElementById(node_id_of_theme_icon);
        switch ( active_theme ) {
            case "light":
                ddui_theme_icon.innerText = "light_mode";
                break;
            case "dark":
                ddui_theme_icon.innerText = "dark_mode";
                break;
        }

    }   

    catch (err) {
        ddui.Log("Theme icon could not be set. Details: " + err.name + ": " + err.message, __file__);
    }

}






export async function ToggleTheme(theme, node_id_of_theme_icon) {

    // define color for blend effect (depending on demanded theme)
    let blend_color;
    if ( theme === 'light' ) { blend_color = "#EEEEEE" }
    else { blend_color = "#222222" }

    // show blend effect (fade in)
    const blend_overlay = await ShowBlendOverlay(blend_color);

    // change theme
    ApplyThemeColors(theme);

    // set theme icon
    await SetThemeIcon(node_id_of_theme_icon);

    // close blend effect (fade out)
    HideBlendOverlay(blend_overlay);

}






// Theme can be "light", "dark", "system" or empty (empty for simple toggle)
async function ApplyThemeColors(theme = "") {

    const ddui_style_sheet = ddui.GetDduiStyleSheet();

    let index = -1;
    let ddui_theme_index = -1;

    // First, find the rule that applies the theme
    for ( let css_rule of ddui_style_sheet.cssRules ) {
        index += 1;
        if ( css_rule.cssText.slice(0,24) === `@import url(\"ddui_theme_` ) {
            ddui_theme_index = index;
            break;
        }
    }

    // Delete the rule that applies the current theme
    ddui_style_sheet.deleteRule(ddui_theme_index);

    // Apply the new theme rule:

    // light
    if ( theme === 'light') {
        ddui_style_sheet.insertRule(`@import url(\"ddui_theme_light.css\");`, ddui_theme_index);

    // dark
    } else if ( theme === 'dark') {
        ddui_style_sheet.insertRule(`@import url(\"ddui_theme_dark.css\");`, ddui_theme_index);

    // system
    } else if ( theme === 'system') {
        ddui_style_sheet.insertRule(`@import url(\"ddui_theme_system.css\");`, ddui_theme_index);
    
    // toggle (change from the current theme to the opposite theme)
    } else {

        const active_theme = await GetActiveTheme();

        if ( active_theme === "dark" ) {
            ddui_style_sheet.insertRule(`@import url(\"ddui_theme_light.css\");`, ddui_theme_index);

        } else {
            ddui_style_sheet.insertRule(`@import url(\"ddui_theme_dark.css\");`, ddui_theme_index);
        }

    }

}






async function ShowBlendOverlay(color, show_loading_box) {

    // set default: no loading box
    if ( ! show_loading_box ) { show_loading_box = false };

    // Defining body as parent node for the overlay div
    const parentNode = document.getElementsByTagName("body")[0];

    // fetch scroll position (for freezing it)
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Creating & defining overlay div
    const overlay = document.createElement("div");
    overlay.id = ddui.GenerateUuid();
    overlay.setAttribute("name", "ddui_overlay");
    overlay.style.position = "absolute";
    overlay.style.top = scrollY + "px";
    overlay.style.width = "0%";
    overlay.style.height = "100%";
    overlay.style.transform = "skewX(-12deg)";
    overlay.style.transition = "width 1s";
    overlay.style.left = "-" + String(Math.floor(document.documentElement.clientWidth / 2)) + "px";
    document.body.style.overflow = "hidden";
    if ( color != null ) { overlay.style.backgroundColor = color }
    else { overlay.style.backgroundColor = "var(--ddui_primary)" }

    let overlay_z_index;
    const overlays_highest_z_index = ddui.GetHighestZIndex();
    ( overlays_highest_z_index == null ) ? overlay_z_index = 1000 : overlay_z_index = Number(overlays_highest_z_index) + 1;
    overlay.style.zIndex = overlay_z_index;

    //parentNode.style.position = "relative"; // only needed if the overlay should not be global (whole web page)

    // Disable scrolling on web page (freeze scroll position)
    // window.onscroll = () => window.scroll(scrollX, scrollY);

    // Insert overlay
    parentNode.prepend(overlay);
    await ddui.WaitForDom(overlay.id, "does_exist");

    // i wasn't able to find an alternative solution to this little delay
    // without it, the blend effect doesn't work
    await new Promise(res => setTimeout(res, 10));

    overlay.style.width = "200%";

    // wait for the blend effect
    await new Promise(r => setTimeout(r, 800));

    return overlay;

}






async function HideBlendOverlay(overlay) {

    overlay.style.transition = "left 1s";
    overlay.style.left = document.documentElement.clientWidth + "px";

    await new Promise(r => setTimeout(r, 800));

    overlay.remove();
    document.body.style.overflow = null;

}