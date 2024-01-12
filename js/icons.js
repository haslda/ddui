





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






function FetchIcon_iconoir(icon_name) {
    const icons = [

    { name: "app-window", html: `<svg width="~~size~~" height="~~size~~" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19Z" stroke="~~color~~" stroke-width="1.5"></path><path d="M2 7L22 7" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5.01L5.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 5.01L8.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5.01L11.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "app-window", html: `<svg width="~~size~~" height="~~size~~" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19Z" stroke="~~color~~" stroke-width="1.5"></path><path d="M2 7L22 7" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5.01L5.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 5.01L8.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5.01L11.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "chat-bubble", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="#000000" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="#000000" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="#000000" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "favourite-window", html: `<svg width="~~size~~" height="~~size~~" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M13 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V13" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round"></path><path d="M22 17.2798C22 17.8812 21.7625 18.4588 21.3383 18.8861C20.3619 19.8701 19.415 20.8961 18.4021 21.8443C18.17 22.0585 17.8017 22.0507 17.5795 21.8268L14.6615 18.8861C13.7795 17.9972 13.7795 16.5623 14.6615 15.6734C15.5522 14.7758 17.0032 14.7758 17.8938 15.6734L17.9999 15.7803L18.1059 15.6734C18.533 15.2429 19.1146 15 19.7221 15C20.3297 15 20.9113 15.2428 21.3383 15.6734C21.7625 16.1007 22 16.6784 22 17.2798Z" stroke="~~color~~" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 7L22 7" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5.01L5.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 5.01L8.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5.01L11.01 4.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "fill-color", html: `<svg width="~~size~~" height="~~size~~" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M2.63596 10.2927L9.70703 3.22168L18.1923 11.707L11.1212 18.778C10.3402 19.5591 9.07387 19.5591 8.29282 18.778L2.63596 13.1212C1.85492 12.3401 1.85492 11.0738 2.63596 10.2927Z" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.29297 1.80762L9.70718 3.22183" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9991 15C19.9991 15 22.9991 17.9934 22.9994 19.8865C22.9997 21.5422 21.6552 22.8865 19.9997 22.8865C18.3442 22.8865 17.012 21.5422 17 19.8865C17.0098 17.9924 19.9991 15 19.9991 15Z" stroke="~~color~~" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "google-docs", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7L17 7" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17L13 17" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "list", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M8 6L20 6" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 6.01L4.01 5.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 12.01L4.01 11.9989" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 18.01L4.01 17.9989" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 12L20 12" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 18L20 18" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "media-image", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "message", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M3 20.2895V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H7.96125C7.35368 17 6.77906 17.2762 6.39951 17.7506L4.06852 20.6643C3.71421 21.1072 3 20.8567 3 20.2895Z" stroke="~~color~~" stroke-width="1.5"></path></svg>` },
    { name: "palette", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M20.5096 9.54C20.4243 9.77932 20.2918 9.99909 20.12 10.1863C19.9483 10.3735 19.7407 10.5244 19.5096 10.63C18.2796 11.1806 17.2346 12.0745 16.5002 13.2045C15.7659 14.3345 15.3733 15.6524 15.3696 17C15.3711 17.4701 15.418 17.9389 15.5096 18.4C15.5707 18.6818 15.5747 18.973 15.5215 19.2564C15.4682 19.5397 15.3588 19.8096 15.1996 20.05C15.0649 20.2604 14.8877 20.4403 14.6793 20.5781C14.4709 20.7158 14.2359 20.8085 13.9896 20.85C13.4554 20.9504 12.9131 21.0006 12.3696 21C11.1638 21.0006 9.97011 20.7588 8.85952 20.2891C7.74893 19.8194 6.74405 19.1314 5.90455 18.2657C5.06506 17.4001 4.40807 16.3747 3.97261 15.2502C3.53714 14.1257 3.33208 12.9252 3.36959 11.72C3.4472 9.47279 4.3586 7.33495 5.92622 5.72296C7.49385 4.11097 9.60542 3.14028 11.8496 3H12.3596C14.0353 3.00042 15.6777 3.46869 17.1017 4.35207C18.5257 5.23544 19.6748 6.49885 20.4196 8C20.6488 8.47498 20.6812 9.02129 20.5096 9.52V9.54Z" stroke="~~color~~" stroke-width="1.5"></path><path d="M8 16.01L8.01 15.9989" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 12.01L6.01 11.9989" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 8.01L8.01 7.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6.01L12.01 5.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 8.01L16.01 7.99889" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "sun-light", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="~~color~~" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    { name: "table-rows", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M3 12H7.5H12H16.5H21M3 12V16.5M3 12V7.5M21 12V16.5M21 12V7.5M3 16.5V20.4C3 20.7314 3.26863 21 3.6 21H7.5H12H16.5H20.4C20.7314 21 21 20.7314 21 20.4V16.5M3 16.5H7.5H12H16.5H21M21 7.5V3.6C21 3.26863 20.7314 3 20.4 3H16.5H12H7.5H3.6C3.26863 3 3 3.26863 3 3.6V7.5M21 7.5H16.5H12H7.5H3" stroke="~~color~~" stroke-width="1.5"></path></svg>` },
    { name: "view-grid", html: `<svg width="~~size~~" height="~~size~~" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="~~color~~"><path d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="~~color~~" stroke-width="1.5"></path><path d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="~~color~~" stroke-width="1.5"></path><path d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z" stroke="~~color~~" stroke-width="1.5"></path><path d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z" stroke="~~color~~" stroke-width="1.5"></path></svg>` }

    ]

    // find the icon in the icons list and deliver the icon html (or else deliver null)
    for ( let icon of icons ) {
        if ( icon.name === icon_name ) { return icon.html }
    }

}

function FetchIcon_material(icon_name) {

    const icons = [

        { name: "dark_mode", html: `<span class="material-icons" style="color: ~~color~~; font-size: ~~size~~;">dark_mode</span>` }

    ]

    // find the icon in the icons list and deliver the icon html (or else deliver null)
    for ( let icon of icons ) {
        if ( icon.name === icon_name ) { return icon.html }
    }    

}






function FetchIcon(icon_name, icon_source, color, size) {

    let icon;

    // if the source ist "iconoir" or no source is given, search the icon in the iconoir lib ...
    if ( icon_source == null || icon_source === "iconoir" ) {
        icon = FetchIcon_iconoir(icon_name);
        // if found, deliver it, after setting the demanded color and size
        if ( icon ) { return SetIconColorAndSize(icon, color, size); }
    }

    // if the source ist "iconoir" or no source is given, search the icon in the material lib
    if ( icon_source == null || icon_source === "material" ) {
        icon = FetchIcon_material(icon_name);
        // if found, deliver it, after setting the demanded color and size
        if ( icon ) { return SetIconColorAndSize(icon, color, size); }
    }

    // if the icon wasn't found, deliver an error text instead
    return `icon "${ ( icon_source ) ? icon_source + "/" : "" }${icon_name}" not found`

}






// replace the placeholders for color and size with the demanded values
function SetIconColorAndSize(icon_html, color, size) {
    icon_html = icon_html.replace(/~~color~~/g, color);
    icon_html = icon_html.replace(/~~size~~/g, size);
    return icon_html
}






export function icon(icon_command, color, size) {

    // the icon_command can be:
    //   a) just an icon name (e.g. "app-window")
    //   b) or an icon name prefixed with the explicit icon source (e.g. "iconoir/app-window")
    // possible seperators: "/", "\", ":"
    // possible sources: "iconoir", "material"

    // dividing icon command into icon source and icon name
    let icon_source;
    let icon_name;
    icon_command = icon_command.replace("\\", "/");
    icon_command = icon_command.replace(":", "/");
    if ( icon_command.includes("/") ) {
        icon_source = icon_command.slice(0, icon_command.indexOf("/"));
        icon_name = icon_command.slice(icon_command.indexOf("/") + 1);
    } else { icon_name = icon_command }

    // set defaults
    if ( color == null ) { color = "var(--ddui_page_text)" }
    if ( size == null ) { size = "24px" }

    // fetch and deliver the desired icon
    return FetchIcon(icon_name, icon_source, color, size);

}