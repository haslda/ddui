





// global catch
window.onerror = (msg, url, line, column, error) => {
    // console.error(error);
    window.alert(`An unhandled error occured. Sorry.\n` +
        `You can try to completely reload the page by pressing Ctrl+F5.\n` +
        `\n` +
        `Details:\n` +
        `${msg}\n` +
        `=> at ${url} (line no ${line}, column no ${column})`);
}

// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






async function Main() {

    const startup_spinner = document.getElementById("app_init_loading_gif");
    startup_spinner.remove();
    document.getElementById("app_main").style.display = null;

    const header_button_theme = document.getElementById("header_button_theme");
    header_button_theme.addEventListener("click", event => OpenHeaderMenuTheme(event));

    const header_button_menu = document.getElementById("header_button_menu");
    header_button_menu.addEventListener("click", event => OpenHeaderMenuMore(event));

    window.ShowDialogue = ShowDialogue;

    new ddui.Tiles("tiles_ddui_dialogues", [
        {
            label: "Message Box",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
            },
            onClick: () => ShowDialogue("MessageBox")
        },
        {
            label: "Toaster",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5M9 13.5V19L12.2488 15.7229" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Toaster")
        },
        {
            label: "Popup",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7L17 7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17L13 17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Popup")
        },
        {
            label: "Dialogue",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M13 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round"></path><path d="M22 17.2798C22 17.8812 21.7625 18.4588 21.3383 18.8861C20.3619 19.8701 19.415 20.8961 18.4021 21.8443C18.17 22.0585 17.8017 22.0507 17.5795 21.8268L14.6615 18.8861C13.7795 17.9972 13.7795 16.5623 14.6615 15.6734C15.5522 14.7758 17.0032 14.7758 17.8938 15.6734L17.9999 15.7803L18.1059 15.6734C18.533 15.2429 19.1146 15 19.7221 15C20.3297 15 20.9113 15.2428 21.3383 15.6734C21.7625 16.1007 22 16.6784 22 17.2798Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 7L22 7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5.01L5.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 5.01L8.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5.01L11.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Dialogue")
        },
        {
            label: "Loading Box",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("LoadingBox")
        }
    ]);

    new ddui.Tiles("tiles_ddui_controls", [
        {
            label: "List",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M3 12H7.5H12H16.5H21M3 12V16.5M3 12V7.5M21 12V16.5M21 12V7.5M3 16.5V20.4C3 20.7314 3.26863 21 3.6 21H7.5H12H16.5H20.4C20.7314 21 21 20.7314 21 20.4V16.5M3 16.5H7.5H12H16.5H21M21 7.5V3.6C21 3.26863 20.7314 3 20.4 3H16.5H12H7.5H3.6C3.26863 3 3 3.26863 3 3.6V7.5M21 7.5H16.5H12H7.5H3" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>`
            },
            onClick: () => ShowDialogue("List")
        },
        {
            label: "Tiles",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>`
            },
            onClick: () => ShowDialogue("Tiles")
        }
    ]);

    new ddui.Tiles("tiles_ddui_misc", [
        {
            label: "Buttons",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6.75 12H16.75M16.75 12L14 14.75M16.75 12L14 9.25" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>`
            },
            onClick: () => ShowDialogue("Buttons")
        },
        {
            label: "Themes",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Themes")
        },
        {
            label: "Icons",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Icons")
        },
        {
            label: "Colors",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M20.5096 9.54C20.4243 9.77932 20.2918 9.99909 20.12 10.1863C19.9483 10.3735 19.7407 10.5244 19.5096 10.63C18.2796 11.1806 17.2346 12.0745 16.5002 13.2045C15.7659 14.3345 15.3733 15.6524 15.3696 17C15.3711 17.4701 15.418 17.9389 15.5096 18.4C15.5707 18.6818 15.5747 18.973 15.5215 19.2564C15.4682 19.5397 15.3588 19.8096 15.1996 20.05C15.0649 20.2604 14.8877 20.4403 14.6793 20.5781C14.4709 20.7158 14.2359 20.8085 13.9896 20.85C13.4554 20.9504 12.9131 21.0006 12.3696 21C11.1638 21.0006 9.97011 20.7588 8.85952 20.2891C7.74893 19.8194 6.74405 19.1314 5.90455 18.2657C5.06506 17.4001 4.40807 16.3747 3.97261 15.2502C3.53714 14.1257 3.33208 12.9252 3.36959 11.72C3.4472 9.47279 4.3586 7.33495 5.92622 5.72296C7.49385 4.11097 9.60542 3.14028 11.8496 3H12.3596C14.0353 3.00042 15.6777 3.46869 17.1017 4.35207C18.5257 5.23544 19.6748 6.49885 20.4196 8C20.6488 8.47498 20.6812 9.02129 20.5096 9.52V9.54Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M8 16.01L8.01 15.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 12.01L6.01 11.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 8.01L8.01 7.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6.01L12.01 5.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 8.01L16.01 7.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Colors")
        },
        {
            label: "Tooltip",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M4 8.00001L4.01 8.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4.00001L4.01 4.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 4.00001L8.01 4.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 4.00001L12.01 4.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 4.00001L16.01 4.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4.00001L20.01 4.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 8.00001L20.01 8.01112" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 12V20H20V12H4Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ShowDialogue("Tooltip")
        },
        {
            label: "More useful features",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><g clip-path="url(#clip0_3057_14628)"><path d="M9.95242 9.62272L11.5109 6.31816C11.711 5.89395 12.289 5.89395 12.4891 6.31816L14.0476 9.62272L17.5329 10.1559C17.9801 10.2243 18.1583 10.7996 17.8346 11.1296L15.313 13.7001L15.9081 17.3314C15.9845 17.7978 15.5168 18.1534 15.1167 17.9331L12 16.2177L8.88328 17.9331C8.48316 18.1534 8.01545 17.7978 8.09187 17.3314L8.68695 13.7001L6.16545 11.1296C5.8417 10.7996 6.01993 10.2243 6.46711 10.1559L9.95242 9.62272Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_3057_14628"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>`
            },
            onClick: () => ShowDialogue("more_useful_features")
        },
        {
            label: "Welcome!",
            image: {
                type: "html",
                data: `<svg width="32px" stroke-width="1.5" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round"></path><path d="M16 8.77975C16 9.38118 15.7625 9.95883 15.3383 10.3861C14.3619 11.3701 13.415 12.3961 12.4021 13.3443C12.17 13.5585 11.8017 13.5507 11.5795 13.3268L8.6615 10.3861C7.7795 9.49725 7.7795 8.06225 8.6615 7.17339C9.55218 6.27579 11.0032 6.27579 11.8938 7.17339L11.9999 7.28027L12.1059 7.17345C12.533 6.74286 13.1146 6.5 13.7221 6.5C14.3297 6.5 14.9113 6.74284 15.3383 7.17339C15.7625 7.60073 16 8.17835 16 8.77975Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linejoin="round"></path><path d="M6 17L20 17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21L20 21" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            },
            onClick: () => ddui.ShowWelcomeDialogue()
        }
    ]);

}






async function OpenHeaderMenuTheme(event) {

    ddui.Popup(
        [
            {
                type: "button",
                label: "Light mode",
                icon: "light_mode",
                onClick: () => { ddui.ToggleTheme("light", "ddui_theme_icon") }
            },
            {
                type: "button",
                label: "Dark mode",
                icon: "dark_mode",
                onClick: () => { ddui.ToggleTheme("dark", "ddui_theme_icon") }
            },
            {
                type: "button",
                label: "System default",
                icon: "devices",
                onClick: () => { ddui.ToggleTheme("system", "ddui_theme_icon") }
            }
        ],
        "positioned",
        event.currentTarget
    );

}






async function OpenHeaderMenuMore(event) {

    ddui.Popup(
        [
            {
                type: "button",
                label: "About",
                icon: "info",
                onClick: () => {
                    ddui.MessageBox(
                        `<h1>d.ui</h1>` +
                        `a simple, lightweight and beautiful ui framework<br>` +
                        `<br>` +
                        `<span>© <a href="https://david.haslwanter.cc/" target="_blank" rel="noreferrer noopener">David Haslwanter</a>, 2024</span>`,
                        "info"
                        )
                    }
            }
        ],
        "positioned",
        event.currentTarget
    );

}






function code_snippet(code) {
    return `<h1 style="margin-top: 0;">Code snippet</h1>` +
        `<div class="codebox codebox_high code">${code}</div>`
}

function code(style, text, parse = false) {

    if ( style === "ddui" ) {
        return `<span class="code_${style}">ddui</span>`
    } else {
        if ( parse ) {
            text = text.replace(/</g, "&lt");
            text = text.replace(/>/g, "&gt");
        }
        return `<span class="code_${style}">${text}</span>`
    }

}

function codeX(text) {

    // Das Steuerzeichen lautet: °X
    // Statt "X" wird der jeweilige Buchstabe verwendet.
    // Beispiel: `codeX(°Fawait new Promise(°Vres°F => setTimeout(°Vres°F, °N1000°F)); °I// delay)`

    // D ddui (green)
    // F function (white)
    // P programming reserved word (turquoise)
    // V variable (blue)
    // S string (pink)
    // N number (red)
    // B boolean (red)
    // O object (yellow)
    // I inferior (gray)

    // declaring variables for the while loop
    let start_index;
    let end_index;
    let html_snippet;

    // urlencode the characters "<" and ">"
    while ( text.search("°>") != -1 ) {

        // find the start and end position of the fist html snippet in the text
        start_index = text.search("°>");
        end_index = text.search("°<");

        // fetch the html_snippet
        html_snippet = text.slice(start_index + 2, end_index);

        // encode the html_snippet
        html_snippet = html_snippet.replace(/</g, "&lt");
        html_snippet = html_snippet.replace(/>/g, "&gt");

        // assemble the "text before", the encoded "html snippet" and the "text after" together
        text = text.slice(0, start_index) +
            html_snippet +
            text.slice(end_index + 2);

    }

    let text_part;
    let resume_index;

    while ( text.search("°L") != -1 ) {
        start_index = text.search("°L");
        text_part = text.slice(start_index + 2);
        
        resume_index = -1;
        for ( let char of text_part ) {
            resume_index += 1;
            if ( encodeURI(char) != "%20" && encodeURI(char) != "%0A" ) {
                break;
            }
        }

        text = text.slice(0, start_index) + decodeURI("%0A") +
            text_part.slice(resume_index);

    }

    // replacing all formatting literals with the formatting html
    text = text.replace(/°D/g, `</span><span class="code_ddui">`);
    text = text.replace(/°F/g, `</span><span class="code_func">`);
    text = text.replace(/°P/g, `</span><span class="code_prog">`);
    text = text.replace(/°V/g, `</span><span class="code_var">`);
    text = text.replace(/°S/g, `</span><span class="code_string">`);
    text = text.replace(/°N/g, `</span><span class="code_number">`);
    text = text.replace(/°B/g, `</span><span class="code_bool">`);
    text = text.replace(/°O/g, `</span><span class="code_object">`);
    text = text.replace(/°I/g, `</span><span class="code_inferior">`);

    // remove the </span> at the beginning and add it at the end
    text = text.slice(7) + `</span>`;

    return text;

}






// is_required    can be "Y" (yes), "N" (no) or "A" (alternatively required)
function arg(is_required = "N", add_paragraph = false, arg_name = "unkknow arg name", arg_datatype = "var", description = "(no description)") {

    let required_tag = "";
    if ( is_required ) {
        if ( is_required === "Y" ) { required_tag = `<span class="arg_required" ddui_tooltip="required">*</span>` }
        else if ( is_required === "A" ) { required_tag = `<span class="arg_required_alternatively" ddui_tooltip="alternatively required">**</span>` }
    }

    return `<div style="white-space: pre;"><span class="code arg_name">${arg_name}</span>${required_tag}</div>` +
        `<div class="arg_description"><span class="arg_datatype">[${arg_datatype}]</span>${description}</div>` +
        `${ (add_paragraph) ? `<div style="height: 10px;"></div><div></div>` : "" }`

}






function GetDialogueCss_Default() {
    return `
    .specs_dialogue {
        max-width: 1000px;
    }
    .codebox {
        border: 1px solid var(--ddui_line_soft);
        border-radius: 3px;
        background-color: var(--ddui_shady_themed);
        padding: 10px;
        margin-bottom: 15px;
        white-space: pre;
        max-height: 30vh;
        overflow-y: auto;
    }
    .codebox_high {
        max-height: 60vh;
    }    
    .code {
        font-family: Courier New;
        font-weight: 700;
    }
    .code_ddui {
        color: var(--ddui_green_text);
    }
    .code_func {
        color: var(--ddui_page_text);
    }
    .code_prog {
        color: var(--ddui_turquoise_text);
    }    
    .code_var {
        color: var(--ddui_blue_text);
    }
    .code_string {
        color: var(--ddui_pink_text);
    }
    .code_number {
        color: var(--ddui_purple_text);
    }
    .code_bool {
        color: var(--ddui_red_text);
    }
    .code_object {
        color: var(--ddui_yellow_text);
    }
    .code_inferior {
        color: var(--ddui_gray_text);
    }
    .args_subheader {
        
    }
    .args_grid {
        display: grid;
        grid-template-columns: min-content auto;
        row-gap: 5px;
        column-gap: 20px;
    }
    .arg_name {
        color: var(--ddui_page_text_emphasized);
    }
    .arg_required {
        color: var(--ddui_red_text);
        font-weight: 700;
    }
    .arg_required_alternatively {
        color: var(--ddui_green_text);
        font-weight: 700;
    }
    .arg_datatype {
        color: var(--ddui_pink_text);
        font-weight: 500;
        padding-right: 5px;
    }
    `
}






function GetDialogueHtml_MessageBox() {

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>The message box is self explaining.</p>` +
        `<h1>Code example</h1>` +
            `<div class="codebox code">` +
            `${codeX(`°Dddui°F.MessageBox(°S"Hello World!"°F);`)}` +
            `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
            `${codeX(`°Dddui°F.MessageBox(°Vcontent°F, °Vtype°F, °Vbuttons°F, °Vallow_exit°F);`)}` +
            `</div>` +
        `<div class="args_grid">` +
            `${arg("Y", true,  "content",    "String",  `Message box content as text or html string`)}` +
            `${arg("N", true,  "type",       "String",  `Can be "" or null (default; simple message box)<br>The values "error", "warning", "info" and "success" show a special designed message box.`)}` +
            `${arg("N", true,  "buttons",    "List",    `See the <a onclick="ShowDialogue('Buttons')" ddui_tooltip="open specs">buttons specs</a> for details`)}` +
            `${arg("N", false, "allow_exit", "Boolean", `Default ist true, which means, the message box can be discarded (e.g. via pressing escape).`)}` +
        `</div>` +
        `<h1>Demo</h1>` +
        `<p>By default, message boxes can be discarded by clicking outside the message box or by pressing escape. But if "allow_exit" is set to "false", no exit is allowed.</p>` +
        `<br><div id="Dialogue_MessageBox_Demo_Tiles_1" style="min-height: 90px;"></div><br>` +
        `<p>Message boxes can be of a specific type with a dedecated look.</p>` +
        `<br><div id="Dialogue_MessageBox_Demo_Tiles_2" style="min-height: 90px;"></div><br>` +
            `<p>Per default there is just an "OK" button for closing the message box, but you can define buttons as you wish and let them do what you want. You can also define, if a button shall (additional to calling your function) close the message box as well (default) or not. Finally the buttons can be of the default style, or the style "inferio" or "red".</p>` +
        `<br><div id="Dialogue_MessageBox_Demo_Tiles_3" style="min-height: 90px;"></div><br>` +
    `</div>`

}






async function LoadDialogueControls_MessageBox(code_icon) {



    // ====================
    // "Simple" and "No exit"

    // Wait for the container for the 1st tiles element ...
    await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_1", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_1", [
        {
            label: "Simple",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("You can leave me easily, by clicking outside or by pressing escape."),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${codeX(`°Dddui°F.MessageBox(°S"You can leave me easily, by clicking outside or by pressing escape."°F);`)}`
                )),
                tooltip: "Show code"
            }
        },
        {
            label: "No exit",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M13 2.04938C12.6711 2.01672 12.3375 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6625 21.9833 11.3289 21.9506 11" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1211 7.36398L19.2424 5.24266M19.2424 5.24266L21.3637 3.12134M19.2424 5.24266L17.1211 3.12134M19.2424 5.24266L21.3637 7.36398" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("If I had no closing button, you wouldn't be able to leave me. Try clicking outside or hitting escape.", null, [{ label: "Close", closeOnClick: true }], false),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                        `${code("string",  `    "If I had no closing button, you wouldn't be able to leave me. Try clicking outside or hitting escape."`)},<br>` +
                        `${code("var",     `    null`)},<br>` +
                        `${code("object",  `    [ { label: ${code("string", `"Close"`)}, closeOnClick: ${code("bool", `true`)} } ]`)},<br>` +
                        `${code("bool", `    false`)}<br>` +
                        `);`)),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");
    


    // ====================
    // Message box types (error, warning, info, success)

    // Wait for the container for the 2nd tiles element ...
    await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_2", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_2", [
        {
            label: "Error",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9.5 14.5L11.9926 12M14.5 9.5L11.9926 12M11.9926 12L9.5 9.5M11.9926 12L14.5 14.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("Oops! A really bad error has occured!", "error"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Oops! A really bad error has occured!"`)},<br>` +
                    `${code("string", `    "error"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Warning",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 8L12 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16.01L12.01 15.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("Watch out! Monsters roaming!", "warning"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Watch out! Monsters roaming!"`)},<br>` +
                    `${code("string", `    "warning"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Info",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 11.5V16.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("Be informed that you've just been informed.", "info"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Be informed that you've just been informed."`)},<br>` +
                    `${code("string", `    "info"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Success",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M8 12L11 15L16 10" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("You made it!", "success"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "You made it!"`)},<br>` +
                    `${code("string", `    "success"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");



    // ====================
    // More (buttons and styles)

    // Wait for the container for the 3rd tiles element ...
    await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_3", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_3", [
        {
            label: "Buttons",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9 12H12M15 12H12M12 12V9M12 12V15" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                "See my beautiful buttons!",
                null,
                [
                    {
                        label: "Say Hi!",
                        onClick: () => ddui.Toaster("Hi!"),
                        closeOnClick: false
                    },
                    {
                        label: "Close"
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string",  `    "See my beautiful buttons!"`)},<br>` +
                    `${code("var",     `    null`)},<br>` +
                    `${code("object",  `    [`)}<br>` +
                    `${code("object",  `        {`)}<br>` +
                    `${code("object",  `            label: ${code("string", `"Say Hi!"`)},`)}<br>` +
                    `${code("object",  `            onClick: ${code("func", `() => ddui.Toaster(${code("string", `"Hi!"`)})`)},`)}<br>` +
                    `${code("object",  `            closeOnClick: ${code("bool", `false`)}`)}<br>` +
                    `${code("object",  `        },`)}<br>` +
                    `${code("object",  `        {`)}<br>` +
                    `${code("object",  `            label: ${code("string", `"Close"`)}`)}<br>` +
                    `${code("object",  `        }`)}<br>` +
                    `${code("object",  `    ]`)}<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Styles",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2"></path><path d="M16 5H8C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                "See my beautiful buttons!",
                null,
                [
                    {
                        label: "Cancel",
                        style: "inferior"
                    },
                    {
                        label: "Say hi!",
                        onClick: () => ddui.Toaster("Hi!"),
                        closeOnClick: false
                    },
                    {
                        label: "Delete all",
                        style: "red",
                        onClick: () => ddui.Toaster("All data is gone!"),
                        closeOnClick: false
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string",  `    "See my beautiful buttons!"`)},<br>` +
                    `${code("var",     `    null`)},<br>` +
                    `${code("object",  `    [<br>` +
                                       `        {<br>` +
                                       `            label: ${code("string",  `"Cancel"`)},<br>` +
                                       `            style: ${code("string",  `"inferior"`)}<br>` +
                                       `        },<br>` +
                                       `        {<br>` +
                                       `            label: ${code("string",  `"Say hi!"`)},<br>` +
                                       `            onClick: ${code("func",  `() => ddui.Toaster(${code("string",  `"Hi!"`)})`)},<br>` +
                                       `            closeOnClick: ${code("bool",  `false`)}<br>` +
                                       `        },<br>` +
                                       `        {<br>` +
                                       `            label: ${code("string",  `"Delete all"`)},<br>` +
                                       `            style: ${code("string",  `"red"`)},<br>` +
                                       `            onClick: ${code("func",  `() => ddui.Toaster(${code("string",  `"All data is gone!"`)})`)},<br>` +
                                       `            closeOnClick: ${code("bool",  `false`)}<br>` +
                                       `        }<br>` +                   
                                       `    ]<br>`)}` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "No button",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M7 4H4V7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 11V13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 4H13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 20H13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 11V13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 4H20V7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 20H4V17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 20H20V17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                'Where are all my buttons?<br>And how can you exit now?<br><span>Little hint: <span style="font-weight: bold;">ESCAPE!!!</span></span>',
                null,
                []
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string",  `    'Where are all my buttons?<br>And how can you exit now?<br><span>Little hint: <span style="font-weight: bold;">ESCAPE!!!</span></span>'`, true)},<br>` +
                    `${code("var",     `    null`)},<br>` +
                    `${code("object",  `    []`)}<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_Toaster() {

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>With the toaster an information (e.g. a success feedback) can be shown.</p>` +
        `<h1>Code example</h1>` +
            `<div class="codebox code">` +
                `${code("ddui")}.Toaster(<span class="code code_arg">${code("string", `"Hello World!"`)}</span>);` +
            `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
                `${code("ddui")}.Toaster(${code("var", `text`)});` +
            `</div>` +
    `<div class="args_grid">` +
        `${arg("Y",false, "text", "String", "Message text")}` +
    `</div>` +
        `<h1>Demo</h1>` +
        `<div id="Dialogue_Toaster_Demo_Tiles" style="min-height: 90px;"></div><br>` +
    `</div>`

}






async function LoadDialogueControls_Toaster(code_icon) {

    // Wait for the container for the tiles element ...
    await ddui.WaitForDom("Dialogue_Toaster_Demo_Tiles", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_Toaster_Demo_Tiles", [
        {
            label: "Short",
            image: { type: "html", data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M22 12H14M14 12L17.5 8.5M14 12L17.5 15.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 12H10M10 12L6.5 8.5M10 12L6.5 15.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 21L10 3" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 21L14 3" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.Toaster("Hi there!"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(`°Dddui°F.Toaster(°S"Hi there!"°F);`)
                    )),
                tooltip: "Show code"
            }
        },
        {
            label: "Long",
            image: { type: "html", data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M10 12H2M2 12L5.5 8.5M2 12L5.5 15.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 12H22M22 12L18.5 8.5M22 12L18.5 15.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 21L10 3" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 21L14 3" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.Toaster("The very complex action has been fulfilled successfully. Thanks for your incredible patience!"),
            corner_button: {
                image: { type: "html", data: code_icon },
                // onClick: () => ddui.Dialogue(null, null, code_snippet(
                //     `${code("ddui")}.Toaster(` +
                //     `${code("string", `"The very complex action has been fulfilled successfully. Thanks for your incredible patience!"`)}` +
                //     `);`)),
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(`°Dddui°F.Toaster(°S"The very complex action has been fulfilled successfully. Thanks for your incredible patience!"°F);`)
                    )),                    
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_Popup() {

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>A popup menu can be called, when a user shall be able to execute actions, without the need to place action buttons on your page.</p>` +
        `<h1>Code example</h1>` +
            `<div class="codebox code">` +

                `${code("inferior", `const my_button = document.getElementById("my_button");`)}<br>` +
                `${code("inferior", `my_button.addEventListener( "click", event =>`)}<br>` +
                `<br>` +
                `    ${code("ddui")}.Popup(<br>` +
                `${code("object",   `        [<br>` +
                                    `            {<br>` +
                                    `                type: ${code("string", `"button"`)},<br>` +
                                    `                label: ${code("string", `"Begin a new day"`)},<br>` +
                                    `                icon: ${code("string", `"light_mode"`)},<br>` +
                                    `                onClick: () => ddui.Toaster(${code("string", `"Good Morning!"`)})<br>` +
                                    `            },<br>` +
                                    `            {<br>` +
                                    `                type: ${code("string", `"button"`)},<br>` +
                                    `                label: ${code("string", `"End current day"`)},<br>` +
                                    `                icon: ${code("string", `"dark_mode"`)},<br>` +
                                    `                onClick: () => ddui.Toaster(${code("string", `"Good night, sleep well!"`)})<br>` +
                                    `            }<br>` +
                                    `        ]`)},<br>` +
                `${code("string",   `        "positioned"`)},<br>` +
                `${code("var",      `        event`)}.${code("var", "currentTarget")}<br>` +
                                    `    )<br>` +
                `<br>` +                                        
                `${code("inferior", `);`)}` +
           
            `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
                `${code("ddui")}.Popup(${code("var", `items`)}, ${code("var", `align_mode`)}, ${code("var", `anchord_node`)}, ${code("var", `type`)});` +
            `</div>` +
    `<div class="args_grid">
        ${arg( "Y", true,  "items",       "List",     "Popup menu items with the following properties per icon:")}
        ${arg( "Y", false, "  type",      "String",   `Can be "Button" (default) or "Line" (horizontal line)`)}
        ${arg( "Y", false, "  label",     "String",   `Text of menu item`)}
        ${arg( "N", false, "  icon",      "String",   `Name of material icon`)}
        ${arg( "N", false, "  onClick",   "Function", `Function to be called on click`)}
        ${arg( "N", true,  "  style",     "String",   `Can be null (default) or "red" (e.g. for a deleting action)`)}
        ${arg( "N", true,  "align_mode",  "String",   `Can be "centered" (default), "positioned" (recommended), "centered_top" or "centered_bottom"`)}
        ${arg( "N", true,  "anchor_node", "String",   `For the align_mode "positioned" an anchor_node, from which the popup menu shall raise, is required`)}
        ${arg( "N", true,  "type",        "String",   `Can only be "list_with_icons" (default)`)}
    </div>                
        <h1>Demo</h1>
        <div id="Dialogue_Popup_Demo_Tiles_1" style="min-height: 90px;"></div><br>
    </div>`

}






async function LoadDialogueControls_Popup(code_icon) {

    // Wait for the container for the 1st tiles element ...
    await ddui.WaitForDom("Dialogue_Popup_Demo_Tiles_1", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_Popup_Demo_Tiles_1", [
        {
            label: "Simple",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7L17 7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17L13 17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: event => ddui.Popup(
                [
                    {
                        type: "button",
                        label: "Begin a new day",
                        icon: "light_mode",
                        onClick: () => ddui.Toaster("Good Morning!")
                    },
                    {
                        type: "button",
                        label: "End current day",
                        icon: "dark_mode",
                        onClick: () => ddui.Toaster("Good night, sleep well!")
                    }
                ],
                "positioned",
                event.currentTarget
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("inferior", `const my_button = document.getElementById("my_button");`)}<br>` +
                    `${code("inferior", `my_button.addEventListener( "click", event =>`)}<br>` +
                    `<br>` +
                    `    ${code("ddui")}.Popup(<br>` +
                    `${code("object",   `        [<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"button"`)},<br>` +
                                        `                label: ${code("string", `"Begin a new day"`)},<br>` +
                                        `                icon: ${code("string", `"light_mode"`)},<br>` +
                                        `                onClick: () => ddui.Toaster(${code("string", `"Good Morning!"`)})<br>` +
                                        `            },<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"button"`)},<br>` +
                                        `                label: ${code("string", `"End current day"`)},<br>` +
                                        `                icon: ${code("string", `"dark_mode"`)},<br>` +
                                        `                onClick: () => ddui.Toaster(${code("string", `"Good night, sleep well!"`)})<br>` +
                                        `            }<br>` +
                                        `        ]`)},<br>` +
                    `${code("string",   `        "positioned"`)},<br>` +
                    `${code("var",      `        event`)}.${code("var", "currentTarget")}<br>` +
                                        `    )<br>` +
                    `<br>` +                                        
                    `${code("inferior", `);`)}`
                )),
            tooltip: "Show code"
            }
        },
        {
            label: "Lines",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9 12H12H15" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: event => ddui.Popup(
                [
                    {
                        type: "button",
                        label: "Begin a new day",
                        icon: "light_mode",
                        onClick: () => ddui.Toaster("Good Morning!")
                    },
                    {
                        type: "line"
                    },
                    {
                        type: "button",
                        label: "End current day",
                        icon: "dark_mode",
                        onClick: () => ddui.Toaster("Good night, sleep well!")
                    }
                ],
                "positioned",
                event.currentTarget
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("inferior", `const my_button = document.getElementById("my_button");`)}<br>` +
                    `${code("inferior", `my_button.addEventListener( "click", event =>`)}<br>` +
                    `<br>` +
                    `    ${code("ddui")}.Popup(<br>` +
                    `${code("object",   `        [<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"button"`)},<br>` +
                                        `                label: ${code("string", `"Begin a new day"`)},<br>` +
                                        `                icon: ${code("string", `"light_mode"`)},<br>` +
                                        `                onClick: () => ddui.Toaster(${code("string", `"Good Morning!"`)})<br>` +
                                        `            },<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"line"`)}<br>` +
                                        `            },<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"button"`)},<br>` +
                                        `                label: ${code("string", `"End current day"`)},<br>` +
                                        `                icon: ${code("string", `"dark_mode"`)},<br>` +
                                        `                onClick: () => ddui.Toaster(${code("string", `"Good night, sleep well!"`)})<br>` +
                                        `            }<br>` +
                                        `        ]`)},<br>` +
                    `${code("string",   `        "positioned"`)},<br>` +
                    `${code("var",      `        event`)}.${code("var", "currentTarget")}<br>` +
                                        `    )<br>` +
                    `<br>` +                                        
                    `${code("inferior", `);`)}`
                )),
            tooltip: "Show code"
            }
        },
        {
            label: "Style",
            image: { type: "html", data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>` },
            onClick: event => ddui.Popup(
                [
                    {
                        type: "button",
                        label: "Do something",
                        icon: "star",
                        onClick: () => ddui.Toaster("Done something!")
                    },
                    {
                        type: "button",
                        label: "Do something dangerous",
                        icon: "electric_bolt",
                        style: "red",
                        onClick: () => ddui.MessageBox("Wow you braveheart!", "error")
                    }
                ],
                "positioned",
                event.currentTarget
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("inferior", `const my_button = document.getElementById("my_button");`)}<br>` +
                    `${code("inferior", `my_button.addEventListener( "click", event =>`)}<br>` +
                    `<br>` +
                    `    ${code("ddui")}.Popup(<br>` +
                    `${code("object",   `        [<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"button"`)},<br>` +
                                        `                label: ${code("string", `"Do something"`)},<br>` +
                                        `                icon: ${code("string", `"star"`)},<br>` +
                                        `                onClick: () => ddui.Toaster(${code("string", `"Done something!"`)})<br>` +
                                        `            },<br>` +
                                        `            {<br>` +
                                        `                type: ${code("string", `"button"`)},<br>` +
                                        `                label: ${code("string", `"Do something dangerous"`)},<br>` +
                                        `                icon: ${code("string", `"electric_bolt"`)},<br>` +
                                        `                style: ${code("string", `"red"`)},<br>` +                                    
                                        `                onClick: () => ddui.MessageBox(${code("string", `"Wow you braveheart!"`)}, ${code("string", `"error"`)})<br>` +
                                        `            }<br>` +
                                        `        ]`)},<br>` +
                    `${code("string",   `        "positioned"`)},<br>` +
                    `${code("var",      `        event`)}.${code("var", "currentTarget")}<br>` +
                                        `    )<br>` +
                    `<br>` +                                        
                    `${code("inferior", `);`)}`
                )),
            tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_Dialogue() {

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>A dialogue is a modal box that can contain anything.</p>` +
        `<p>It can be given a html (or url to an html) and also a css (or url to it). The html can be filled with initial values.</p>`+
        `<p>Like message boxes it can have buttons.</p>` +
        `<h1>Code example</h1>` +
        `<div class="codebox code">` +
        `${codeX(`°Fconst °Vlogin_dialogue°F = °Dddui°F.Dialogue(°L
            °S    "Login"°F,°L
            °S    "key"°F,°L
            °S    °>\`<div class="login_dialogue_container">\`°<°F +°L
            °S        °>\`<div class="login_dialogue_label">Username</div>\`°<°F +°L
            °S            °>\`<div class="login_dialogue_input_container">\`°<°F +°L
            °S                °>\`<input class="login_dialogue_input" id="login_dialogue_input_username" type="text" placeholder="username">\`°<°F +°L
            °S            °>\`</div>\`°<°F +°L
            °S            °>\`<div class="login_dialogue_space"></div>\`°<°F +°L
            °S            °>\`<div class="login_dialogue_label">Password</div>\`°<°F +°L
            °S            °>\`<div class="login_dialogue_input_container">\`°<°F +°L
            °S            °>\`<input id="login_dialogue_password" class="login_dialogue_input" type="password">\`°<°F +°L
            °S        °>\`</div>\`°<°F +°L
            °S        °>\`<div id="login_dialogue_password_error"></div>\`°<°F +°L
            °S    °>\`</div>\`°<°F,°L
            °V    null°F,°L
            °S    \`.login_dialogue_container {\`°F +°L
            °S        \`display: flex;\`°F +°L
            °S        \`flex-direction: column;\`°F +°L
            °S        \`width: 350px;\`°F +°L
            °S        \`max-width: 100%;\`°F +°L
            °S    \`}\`°F +°L
            °S    \`.login_dialogue_space {\`°F +°L
            °S        \`height: 15px;\`°F +°L
            °S    \`}\`°F +°L
            °S    \`.login_dialogue_input_container {\`°F +°L
            °S        \`margin-top: 3px;\`°F +°L
            °S        \`width: 100%;\`°F +°L
            °S    \`}\`°F +°L
            °S    \`.login_dialogue_input {\`°F +°L
            °S        \`width: 100%;\`°F +°L
            °S    \`}\`°F +°L
            °S    \`#login_dialogue_password_error {\`°F +°L
            °S        \`color: var(--ddui_red_text);\`°F +°L
            °S    \`}\`°F,°L
            °V    null°F,°L
            °O    [°L
            °O        {°L
            °O            node_id: °S"login_dialogue_input_username"°O,°L
            °O            value: °S"my.mail@example.com"°L
            °O        }°L
            °O    ]°F,°L
            °S    "login_dialogue_input_username"°F,°L
            °O    [°L
            °O        {°L
            °O            label: °S"Cancel"°O,°L
            °O            style: °S"inferior"°L
            °O        },°L
            °O        {°L
            °O            label: °S"Login"°O,°L
            °O            default: °Btrue°O,°L
            °O            onClick: °Pasync°F () => {°L
            °F                °Pawait°F new Promise(°Vres°F => setTimeout(°Vres°F, °N1000°F)); °I// simulates login attempt (little delay)°L
            °F                °Pconst °Vpassword°F = document.getElementById(°S"login_dialogue_password"°F).value;°L
            °F                °Pif °F( °Vpassword°F != °S"ddui"°F) {°L
            °F                    const °Vpassword_error_node°F = document.getElementById(°S"login_dialogue_password_error"°F);°L
            °F                    °Vpassword_error_node°F.innerText = °S\`The password must be "ddui"\`°F;°L
            °F                } °Pelse°F {°L
            °F                    °Dddui°F.Toaster(°S"Successfully logged you in."°F);°L
            °F                    (°Pawait °Vlogin_dialogue°F).Discard();°L
            °F                }°L
            °F            },°L
            °O            closeOnClick: °Bfalse°L
            °O        }°L
            °O    ]°F,°L
            °B    false°L
            °F);`
        )}` +
    `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
                `${codeX(`°Dddui°F.Dialogue(°L
                    °V    title_text°F,°L
                    °V    title_icon°F,°L
                    °V    html°F,°L
                    °V    html_ref°F,°L
                    °V    css°F,°L
                    °V    css_ref°F,°L
                    °V    values°F,°L
                    °V    put_focus_on_element_with_id°F,°L
                    °V    buttons°F,°L
                    °V    allow_exit°L
                    °F);`
                )}` +
            `</div>` +
        `<div class="args_grid">` +
            `${arg("N", true,  "title_text",   "String",  `Text in header (dialogue title)`)}` +
            `${arg("N", true,  "title_icon",   "String",  `Name of material icon in header (dialogue title)`)}` +
            `${arg("A", true,  "html",         "String",  `Dialogue content html (alternative to html_ref)`)}` +
            `${arg("A", true,  "html_ref",     "String",  `Relative url to dialogue content html (alternative to html)`)}` +
            `${arg("N", true,  "css",          "String",  `Dialogue custom css (alternative to css_ref)`)}` +
            `${arg("N", true,  "css_ref",      "String",  `Relative url to dialogue custom css (alternative to css)`)}` +
            `${arg("N", true,  "values",       "List",    `Each list item contains the following elements:`)}` +
            `${arg("N", false, "  node_id",    "String",  `Id of the dom element that shall be initialized with a value`)}` +
            `${arg("N", true,  "  value",      "String",  `The value, that shall be filled in the element`)}` +
            `${arg("N", true,  "put_focus_on_element_with_id",      "String",   `Id of dom element that shall be focused`)}` +
            `${arg("N", true,  "buttons",      "List",    `See the <a onclick="ShowDialogue('Buttons')" ddui_tooltip="open specs">buttons specs</a> for details`)}` +
            `${arg("N", false, "allow_exit",   "Boolean", `Default is true, which means, the message box can be discarded (e.g. via pressing escape).`)}` +
        `</div>` +
        `<h1>Demo</h1>` +
        `<p>The basic dialogue is demonstrated in form of a login screen.</p>` +
        `<br><div id="Dialogue_Dialogue_Demo_Tiles_1" style="min-height: 90px;"></div><br>` +
    `</div>`

}






async function LoadDialogueControls_Dialogue(code_icon) {



    // ====================
    // "Simple"

    // Wait for the container for the 1st tiles element ...
    await ddui.WaitForDom("Dialogue_Dialogue_Demo_Tiles_1", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_Dialogue_Demo_Tiles_1", [
        {
            label: "Simple",
            image: { type: "html", data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M2 7L22 7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5.01L5.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 5.01L8.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5.01L11.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => {
                const login_dialogue = ddui.Dialogue(
                    "Login",
                    "key",
                    `<div class="login_dialogue_container">` +
                        `<div class="login_dialogue_label">Username</div>` +
                            `<div class="login_dialogue_input_container">` +
                                `<input class="login_dialogue_input" id="login_dialogue_input_username" type="text" placeholder="username">` +
                            `</div>` +
                            `<div class="login_dialogue_space"></div>` +
                            `<div class="login_dialogue_label">Password</div>` +
                            `<div class="login_dialogue_input_container">` +
                            `<input id="login_dialogue_password" class="login_dialogue_input" type="password">` +
                        `</div>` +
                        `<div id="login_dialogue_password_error"></div>` +
                    `</div>`,
                    null,
                    `.login_dialogue_container {` +
                        `display: flex;` +
                        `flex-direction: column;` +
                        `width: 350px;` +
                        `max-width: 100%;` +
                    `}` +
                    `.login_dialogue_space {` +
                        `height: 15px;` +
                    `}` +
                    `.login_dialogue_input_container {` +
                        `margin-top: 3px;` +
                        `width: 100%;` +
                    `}` +
                    `.login_dialogue_input {` +
                        `width: 100%;` +
                    `}` +
                    `#login_dialogue_password_error {` +
                        `color: var(--ddui_red_text);` +
                    `}`,
                    null,
                    [
                        {
                            node_id: "login_dialogue_input_username",
                            value: "my.mail@example.com"
                        }
                    ],
                    "login_dialogue_input_username",
                    [
                        {
                            label: "Cancel",
                            style: "inferior"
                        },
                        {
                            label: "Login",
                            default: true,
                            onClick: async () => {
                                await new Promise(res => setTimeout(res, 1000)); // simulates login attempt (little delay)
                                const password = document.getElementById("login_dialogue_password").value;
                                if ( password != "ddui") {
                                    const password_error_node = document.getElementById("login_dialogue_password_error");
                                    password_error_node.innerText = `The password must be "ddui"`;
                                } else {
                                    ddui.Toaster("Successfully logged you in.");
                                    (await login_dialogue).Discard();
                                }
                            },
                            closeOnClick: false
                        }
                    ],
                    false
                )},
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(

                    codeX(`°Fconst °Vlogin_dialogue°F = °Dddui°F.Dialogue(°L
                        °S    "Login"°F,°L
                        °S    "key"°F,°L
                        °S    °>\`<div class="login_dialogue_container">\`°<°F +°L
                        °S        °>\`<div class="login_dialogue_label">Username</div>\`°<°F +°L
                        °S            °>\`<div class="login_dialogue_input_container">\`°<°F +°L
                        °S                °>\`<input class="login_dialogue_input" id="login_dialogue_input_username" type="text" placeholder="username">\`°<°F +°L
                        °S            °>\`</div>\`°<°F +°L
                        °S            °>\`<div class="login_dialogue_space"></div>\`°<°F +°L
                        °S            °>\`<div class="login_dialogue_label">Password</div>\`°<°F +°L
                        °S            °>\`<div class="login_dialogue_input_container">\`°<°F +°L
                        °S            °>\`<input id="login_dialogue_password" class="login_dialogue_input" type="password">\`°<°F +°L
                        °S        °>\`</div>\`°<°F +°L
                        °S        °>\`<div id="login_dialogue_password_error"></div>\`°<°F +°L
                        °S    °>\`</div>\`°<°F,°L
                        °V    null°F,°L
                        °S    \`.login_dialogue_container {\`°F +°L
                        °S        \`display: flex;\`°F +°L
                        °S        \`flex-direction: column;\`°F +°L
                        °S        \`width: 350px;\`°F +°L
                        °S        \`max-width: 100%;\`°F +°L
                        °S    \`}\`°F +°L
                        °S    \`.login_dialogue_space {\`°F +°L
                        °S        \`height: 15px;\`°F +°L
                        °S    \`}\`°F +°L
                        °S    \`.login_dialogue_input_container {\`°F +°L
                        °S        \`margin-top: 3px;\`°F +°L
                        °S        \`width: 100%;\`°F +°L
                        °S    \`}\`°F +°L
                        °S    \`.login_dialogue_input {\`°F +°L
                        °S        \`width: 100%;\`°F +°L
                        °S    \`}\`°F +°L
                        °S    \`#login_dialogue_password_error {\`°F +°L
                        °S        \`color: var(--ddui_red_text);\`°F +°L
                        °S    \`}\`°F,°L
                        °V    null°F,°L
                        °O    [°L
                        °O        {°L
                        °O            node_id: °S"login_dialogue_input_username"°O,°L
                        °O            value: °S"my.mail@example.com"°L
                        °O        }°L
                        °O    ]°F,°L
                        °S    "login_dialogue_input_username"°F,°L
                        °O    [°L
                        °O        {°L
                        °O            label: °S"Cancel"°O,°L
                        °O            style: °S"inferior"°L
                        °O        },°L
                        °O        {°L
                        °O            label: °S"Login"°O,°L
                        °O            default: °Btrue°O,°L
                        °O            onClick: °Pasync°F () => {°L
                        °F                °Pawait°F new Promise(°Vres°F => setTimeout(°Vres°F, °N1000°F)); °I// simulates login attempt (little delay)°L
                        °F                °Pconst °Vpassword°F = document.getElementById(°S"login_dialogue_password"°F).value;°L
                        °F                °Pif °F( °Vpassword°F != °S"ddui"°F) {°L
                        °F                    const °Vpassword_error_node°F = document.getElementById(°S"login_dialogue_password_error"°F);°L
                        °F                    °Vpassword_error_node°F.innerText = °S\`The password must be "ddui"\`°F;°L
                        °F                } °Pelse°F {°L
                        °F                    °Dddui°F.Toaster(°S"Successfully logged you in."°F);°L
                        °F                    (°Pawait °Vlogin_dialogue°F).Discard();°L
                        °F                }°L
                        °F            },°L
                        °O            closeOnClick: °Bfalse°L
                        °O        }°L
                        °O    ]°F,°L
                        °B    false°L
                        °F);`
                    )
                )),
                    tooltip: "Show code"
            }
        }
    ], "100px", "90px");
    


    // ====================
    // Message box types (error, warning, info, success)

    // Wait for the container for the 2nd tiles element ...
    await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_2", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_2", [
        {
            label: "Error",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9.5 14.5L11.9926 12M14.5 9.5L11.9926 12M11.9926 12L9.5 9.5M11.9926 12L14.5 14.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("Oops! A really bad error has occured!", "error"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Oops! A really bad error has occured!"`)},<br>` +
                    `${code("string", `    "error"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Warning",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 8L12 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16.01L12.01 15.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("Watch out! Monsters roaming!", "warning"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Watch out! Monsters roaming!"`)},<br>` +
                    `${code("string", `    "warning"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Info",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 11.5V16.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("Be informed that you've just been informed.", "info"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Be informed that you've just been informed."`)},<br>` +
                    `${code("string", `    "info"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Success",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M8 12L11 15L16 10" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox("You made it!", "success"),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "You made it!"`)},<br>` +
                    `${code("string", `    "success"`)},<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");



    // ====================
    // More (buttons and styles)

    // Wait for the container for the 3rd tiles element ...
    await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_3", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_3", [
        {
            label: "Buttons",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9 12H12M15 12H12M12 12V9M12 12V15" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                "See my beautiful buttons!",
                null,
                [
                    {
                        label: "Say Hi!",
                        onClick: () => ddui.Toaster("Hi!"),
                        closeOnClick: false
                    },
                    {
                        label: "Close"
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string",  `    "See my beautiful buttons!"`)},<br>` +
                    `${code("var",     `    null`)},<br>` +
                    `${code("object",  `    [`)}<br>` +
                    `${code("object",  `        {`)}<br>` +
                    `${code("object",  `            label: ${code("string", `"Say Hi!"`)},`)}<br>` +
                    `${code("object",  `            onClick: ${code("func", `() => ddui.Toaster(${code("string", `"Hi!"`)})`)},`)}<br>` +
                    `${code("object",  `            closeOnClick: ${code("bool", `false`)}`)}<br>` +
                    `${code("object",  `        },`)}<br>` +
                    `${code("object",  `        {`)}<br>` +
                    `${code("object",  `            label: ${code("string", `"Close"`)}`)}<br>` +
                    `${code("object",  `        }`)}<br>` +
                    `${code("object",  `    ]`)}<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Styles",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2"></path><path d="M16 5H8C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                "See my beautiful buttons!",
                null,
                [
                    {
                        label: "Cancel",
                        style: "inferior"
                    },
                    {
                        label: "Say hi!",
                        onClick: () => ddui.Toaster("Hi!"),
                        closeOnClick: false
                    },
                    {
                        label: "Delete all",
                        style: "red",
                        onClick: () => ddui.Toaster("All data is gone!"),
                        closeOnClick: false
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string",  `    "See my beautiful buttons!"`)},<br>` +
                    `${code("var",     `    null`)},<br>` +
                    `${code("object",  `    [<br>` +
                                       `        {<br>` +
                                       `            label: ${code("string",  `"Cancel"`)},<br>` +
                                       `            style: ${code("string",  `"inferior"`)}<br>` +
                                       `        },<br>` +
                                       `        {<br>` +
                                       `            label: ${code("string",  `"Say hi!"`)},<br>` +
                                       `            onClick: ${code("func",  `() => ddui.Toaster(${code("string",  `"Hi!"`)})`)},<br>` +
                                       `            closeOnClick: ${code("bool",  `false`)}<br>` +
                                       `        },<br>` +
                                       `        {<br>` +
                                       `            label: ${code("string",  `"Delete all"`)},<br>` +
                                       `            style: ${code("string",  `"red"`)},<br>` +
                                       `            onClick: ${code("func",  `() => ddui.Toaster(${code("string",  `"All data is gone!"`)})`)},<br>` +
                                       `            closeOnClick: ${code("bool",  `false`)}<br>` +
                                       `        }<br>` +                   
                                       `    ]<br>`)}` +
                    `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "No button",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M7 4H4V7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 11V13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 4H13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 20H13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 11V13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 4H20V7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 20H4V17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 20H20V17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                'Where are all my buttons?<br>And how can you exit now?<br><span>Little hint: <span style="font-weight: bold;">ESCAPE!!!</span></span>',
                null,
                []
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string",  `    'Where are all my buttons?<br>And how can you exit now?<br><span>Little hint: <span style="font-weight: bold;">ESCAPE!!!</span></span>'`, true)},<br>` +
                    `${code("var",     `    null`)},<br>` +
                    `${code("object",  `    []`)}<br>` +
                    `);`)),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_LoadingBox() {

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>The loading box locks the ui and shows a spinner to indicate that something is going on.</p>` +
        `<h1>Code example</h1>` +
            `<div class="codebox code">` +
                `${codeX(
                    `°Pconst °Vloading_box°F = °Dddui°F.LoadingBox();           °I// show loading box°L
                     °Iawait new Promise(res => setTimeout(res, 2000)); // some action°L
                     °Vloading_box°F.Discard();                           °I// discard loading box`
                 )}</span>` +
            `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
                `${codeX(
                    `°Vloading_box°F = °Dddui°F.LoadingBox(°Vinfo_text°F); °I// create and show loading box°L
                    °Vloading_box°F.UpdateInfoText(°Vinfo_text°F);    °I// update info text°L
                    °Vloading_box°F.Discard();                    °I// discard (close) loading box`
                )}` +
            `</div>` +
    `<div class="args_grid">` +
        `${arg("N", false, "info_text", "String", "Optional info text beneath the spinner")}` +
    `</div>` +
        `<h1>Demo</h1>` +
        `<p></p>` +
        `<br><div id="Dialogue_LoadingBox_Demo_Tiles" style="min-height: 90px;"></div><br>` +
    `</div>`

}






async function LoadDialogueControls_LoadingBox(code_icon) {

    // Wait for the container for the tiles element ...
    await ddui.WaitForDom("Dialogue_LoadingBox_Demo_Tiles", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_LoadingBox_Demo_Tiles", [
        {
            label: "Simple",
            image: { type: "html    ", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: async () => {
                const loading_box = ddui.LoadingBox();           // show loading box
                await new Promise(res => setTimeout(res, 2000)); // some action
                loading_box.Discard();                           // discard loading box
            },
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(
                       `°Pconst °Vloading_box°F = °Dddui°F.LoadingBox();           °I// show loading box°L
                        °Iawait new Promise(res => setTimeout(res, 2000)); // some action°L
                        °Vloading_box°F.Discard();                           °I// discard loading box`
                    )
                    )),
                tooltip: "Show code"
            }
        },
        {
            label: "Label",
            image: { type: "html    ", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M19 7V5L5 5V7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 5L12 19M12 19H10M12 19H14" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: async () => {
                const loading_box = ddui.LoadingBox("working really hard ..."); // show loading box
                await new Promise(res => setTimeout(res, 2000));                // some action
                loading_box.Discard();                                          // discard loading box
            },
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(
                       `°Pconst °Vloading_box°F = °Dddui°F.LoadingBox(°S"working really hard ..."°F); °I// show loading box°L
                        °Iawait new Promise(res => setTimeout(res, 2000));                // some action°L
                        °Vloading_box°F.Discard();                                          °I// discard loading box`
                    )
                    )),
                tooltip: "Show code"
            }
        },
        {
            label: "Changing label",
            image: { type: "html    ", data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M3 7L3 5L17 5V7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 5L10 19M10 19H12M10 19H8" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 14L13 12H21V14" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 12V19M17 19H15.5M17 19H18.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: async () => {
                const loading_box = ddui.LoadingBox("working really hard ..."); // show loading box with info text
                await new Promise(res => setTimeout(res, 1000));                // 1st action
                loading_box.UpdateInfoText("almost done ...");                  // update info text
                await new Promise(res => setTimeout(res, 1000));                // 2nd action
                loading_box.UpdateInfoText("final steps ...");                  // update info text
                await new Promise(res => setTimeout(res, 1000));                // 3rd action
                loading_box.Discard();                                          // discard loading box
            },
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(
                       `°Pconst °Vloading_box°F = °Dddui°F.LoadingBox(°S"working really hard ..."°F); °I// show loading box with info text°L
                        °Iawait new Promise(res => setTimeout(res, 1000));                // 1st action°L
                        °Vloading_box°F.UpdateInfoText(°S"almost done ..."°F);                  °I// update info text°L
                        °Iawait new Promise(res => setTimeout(res, 1000));                // 2nd action°L
                        °Vloading_box°F.UpdateInfoText(°S"final steps ..."°F);                  °I// update info text°L
                        °Iawait new Promise(res => setTimeout(res, 1000));                // 3rd action°L
                        °Vloading_box°F.Discard();                                          °I// discard loading box`
                    )
                    )),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_List() {    

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>The list is a very basic control. It does not define any size or layout for the items, so the items need to be defined by yourself.</p>` +
        `<h1>Code example</h1>` +
            `<div class="codebox code">` +
                `${codeX(
                   `°Pconst °Vlist°F = °Pnew °Dddui°F.List(°S"list_container"°F); °I// create list°L
                    °L
                    °Pconst °Vitem_1 °F= °Vdocument°F.createElement(°S"div"°F); °I// create 1st list item°L
                    °Vitem_1°F.innerText = °S"buy bread and milk"°F;°L
                    °L
                    °Pconst °Vitem_2 °F= °Vdocument°F.createElement(°S"div"°F); °I// create 2nd list item°L
                    °Vitem_2°F.innerText = °S"bring car to car shop"°F;°L
                    °L
                    °Vlist°F.AppendItem(°Vitem_1°F);                      °I// append item 1 to list°L
                    °Vlist°F.AppendItem(°Vitem_2°F);                      °I// append item 2 to list`
                )}` +
            `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
            `${codeX(
                `°Pconst °Vlist°F = °Pnew °Dddui°F.List(°Vcontainer_id°F);   °I// create list°L
                 °Vlist°F.ShowLoadingSpinner();                  °I// show loading indicator (spinner)°L
                 °Vlist°F.DiscardLoadingSpinner();               °I// hide loading indicator (spinner)°L
                 °Pconst °Vitem_id°F = °Vlist°F.AppendItem(°Vitem_node°F); °I// append an item to the list°L
                 °Vlist°F.DeleteItem(°Vitem_id°F);                   °I// delete an item from the list`
             )}` +
        `</div>` +
        `<h2 class="args_subheader">ddui.List(container_id)</h2>` +
        `<div class="args_grid">` +
            `${arg("Y",false, "container_id", "String", "Id of the dom element that shall contain the list")}` +
        `</div>` +
        `<h2 class="args_subheader">AppendItem(item_node)</h2>` +
        `<div class="args_grid">` +
            `${arg("Y",false, "item_node", "dom element", "List item as dom element; returns the item id")}` +
        `</div>` +
        `<h2 class="args_subheader">DeleteItem(item_id)</h2>` +
        `<div class="args_grid">` +
            `${arg("Y",false, "item_id", "String", "Id of the list item")}` +
        `</div>` +
            `<h1>Demo</h1>` +
            `<div id="Dialogue_List_Demo_Tiles" style="min-height: 90px;"></div><br>` +
    `</div>`

}






async function LoadDialogueControls_List(code_icon) {

    // Wait for the container for the tiles element ...
    await ddui.WaitForDom("Dialogue_List_Demo_Tiles", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_List_Demo_Tiles", [



        {
            label: "Simple",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M3 12H7.5H12H16.5H21M3 12V16.5M3 12V7.5M21 12V16.5M21 12V7.5M3 16.5V20.4C3 20.7314 3.26863 21 3.6 21H7.5H12H16.5H20.4C20.7314 21 21 20.7314 21 20.4V16.5M3 16.5H7.5H12H16.5H21M21 7.5V3.6C21 3.26863 20.7314 3 20.4 3H16.5H12H7.5H3.6C3.26863 3 3 3.26863 3 3.6V7.5M21 7.5H16.5H12H7.5H3" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>` },
            onClick: async () => {
                ddui.Dialogue(
                    null,
                    null,
                    `<div id="list_actions_Tiles_container"></div>` +
                    `<hr class="list_hr">` +
                    `<div id="list_container"></div>`,
                    null,
                    `.list_hr {
                        border-color: var(--ddui_line);
                        margin: 16px 0 14px 0;
                    }
                    #list_container {
                        width: 245px;
                    }
                    .list_item {
                        border: 1px solid var(--ddui_line);
                        padding: 5px 10px 5px 10px;
                        margin: 2px 0 2px 0;
                    }`
                );
                await ddui.WaitForDom("list_actions_Tiles_container", "does_exist");
                new ddui.Tiles("list_actions_Tiles_container", [
                    {
                        image: { type: "html", data: code_icon },
                        onClick: () => ddui.Dialogue(null, null, code_snippet(
                            codeX(
                               `°I// create a list and place it inside the°L
                                °I// container node with the id "list_container"°L
                                °Pconst °Vlist °F= °Pnew °Dddui°F.List(°S"list_container"°F);°L
                                °L
                                °I// create 1st list item°L
                                °Pconst °Vitem_1 °F= °Vdocument°F.createElement(°S"div"°F);°L
                                °Vitem_1°F.innerText °F= °S"buy bread and milk"°F;°L
                                °Vitem_1°F.classList.add(°S"list_item"°F);°L
                                °L
                                °I// create 2nd list item°L
                                °Pconst °Vitem_2 °F= °Vdocument°F.createElement(°S"div"°F);°L
                                °Vitem_2°F.innerText = °S"bring car to car shop"°F;°L
                                °Vitem_2.°FclassList.add(°S"list_item"°F);°L
                                °L
                                °I// create 3rd list item°L
                                °Pconst °Vitem_3 °F= °Vdocument°F.createElement(°S"div"°F);°L
                                °Vitem_3°F.innerText °F= °S"meet John for a coffee"°F;°L
                                °Vitem_3°F.classList.add(°S"list_item"°F);°L
                                °L
                                °I// append the created list items to the list°L
                                °Vlist°F.AppendItem(°Vitem_1°F);°L
                                °Vlist°F.AppendItem(°Vitem_2°F);°L
                                °Vlist°F.AppendItem(°Vitem_3°F);`
                            )
                        )),
                        tooltip: "Show code (create list)",
                        width: "45px",
                    },
                    {
                        image: { type: "html", data: `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
                        onClick: () => {

                            // create list item
                            const item = document.createElement("div");
                            item.innerText = "another list item";
                            item.classList.add("list_item");

                            // append created list item to list
                            list.AppendItem(item);

                        },
                        tooltip: "Add new item",
                        corner_button: {
                            image: { type: "html", data: code_icon },
                            onClick: () => ddui.Dialogue(null, null, code_snippet(
                                codeX(
                                   `°I// create list item°L
                                    °Pconst °Vitem °F= °Vdocument°F.createElement(°S"div"°F);°L
                                    °Vitem°F.innerText = °S"another list item"°F;°L
                                    °Vitem°F.classList.add(°S"list_item"°F);°L
                                    °L
                                    °I// append created list item to list°L
                                    °Vlist°F.AppendItem(°Vitem°F);`
                                )
                            )),
                            tooltip: "Show code"
                        }
                    },
                    {
                        image: { type: "html", data: `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6 12H18" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
                        onClick: () => {
                            const index = Math.round(Math.random() * (list.length - 1));
                            list.DeleteItem(index);
                        },
                        tooltip: "Delete random item",
                        corner_button: {
                            image: { type: "html", data: code_icon },
                            onClick: () => ddui.Dialogue(null, null, code_snippet(
                                codeX(
                                   `°I// calculate a random index ...°L
                                    °Pconst °Vindex °F= Math.round( Math.random() * ( °Vlist°F.length - °N1°F ) );°L
                                    °L
                                    °I// ... and delte the respective list item°L
                                    °Vlist°F.DeleteItem(°Vindex°F);`
                                )
                            )),
                            tooltip: "Show code"
                        }
                    }
                ], "90px", "45px", "5px", "left", "10px");

                await ddui.WaitForDom("list_container", "does_exist");

                // create a list and place it inside the
                // container node with the id "list_container"
                const list = new ddui.List("list_container");

                // create 1st list item
                const item_1 = document.createElement("div");
                item_1.innerText = "buy bread and milk";
                item_1.classList.add("list_item");

                // create 2nd list item
                const item_2 = document.createElement("div");
                item_2.innerText = "bring car to car shop";
                item_2.classList.add("list_item");

                // create 3rd list item
                const item_3 = document.createElement("div");
                item_3.innerText = "meet John for a coffee";
                item_3.classList.add("list_item");

                // append the created list items to the list
                list.AppendItem(item_1);
                list.AppendItem(item_2);
                list.AppendItem(item_3);
            }
        },



        {
            label: "Rich",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6 18.01L6.01 17.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6.01L6.01 5.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 9.4V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V9.4C22 9.73137 21.7314 10 21.4 10H2.6C2.26863 10 2 9.73137 2 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M2 21.4V14.6C2 14.2686 2.26863 14 2.6 14H21.4C21.7314 14 22 14.2686 22 14.6V21.4C22 21.7314 21.7314 22 21.4 22H2.6C2.26863 22 2 21.7314 2 21.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>` },
            onClick: async () => {
                ddui.Dialogue(
                    null,
                    null,
                    `<div id="list_actions_Tiles_container"></div>` +
                    `<hr class="list_hr">` +
                    `<div id="list_container"></div>`,
                    null,
                    `.list_hr {
                        border-color: var(--ddui_line);
                        margin: 16px 0 2px 0;
                    }

                    #list_container {
                        width: 501px;
                        max-width: 100%;
                    }

                    .list_item {
                        background-color: var(--ddui_page_background);
                        width: 100%;
                        border: solid 1px var(--ddui_line_soft);
                        margin: 3px 0 3px 0;
                        cursor: pointer;
                        min-height: 60px;
                    
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: stretch;
                    }

                    .list_item:hover {
                        background-color: var(--ddui_shady_themed);
                    }

                    .list_item_selected {
                        background-color: var(--ddui_primary_background_emphasized);
                        font-weight: 500;
                    }
                    
                    .list_item_selected:hover {
                        background-color: var(--ddui_primary_background_emphasized_hover);
                    }
                    
                    .list_item_area {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: stretch;
                    }
                    
                    .list_item_area_left {}
                    
                    .list_item_area_center {
                        flex-grow: 1;
                    }
                    
                    .list_item_area_right {}
                    
                    .list_item_checkbox {
                        padding: 0 15px 0 15px;
                    
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: center;
                    }
                    
                    .list_item_text {
                        padding: 0 15px 0 15px;
                    
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: center;
                    }
                    
                    .list_item_button {
                        padding: 0 15px 0 15px;
                    
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: center;
                    }
                    
                    .list_item_button:hover {
                        background-color: var(--ddui_shady_themed);
                    }
                    
                    .checkbox {
                        cursor: pointer;
                    }`
                );

                await ddui.WaitForDom("list_actions_Tiles_container", "does_exist");

                new ddui.Tiles("list_actions_Tiles_container", [
                    {
                        image: { type: "html", data: code_icon },
                        onClick: () => ddui.Dialogue(null, null, code_snippet(
                            codeX(
                               `°I// create a list and place it inside the container node with the id "list_container"°L
                                °Pconst °Vlist °F= new °Dddui°F.List(°S"list_container"°F);°L
                                °L
                                °I// create 3 list items with the custom (non ddui) function "CreateRichtItem"°L
                                °FCreateRichItem(°S"buy bread and milk"°F);°L
                                °FCreateRichItem(°S"bring car to car shop"°F);°L
                                °FCreateRichItem(°S"meet John for a coffee"°F);°L
                                °L
                                °I// custom (non ddui) function to create rich list items°L
                                °Pfunction °FCreateRichItem(°Vtitle°F) {°L
                                °L
                                °I    // build the list item (actually it's the list item content)°L
                                °P    const °Vnew_item °F= °Vdocument°F.createElement(°S"div"°F);°L
                                °V    new_item°F.classList.add(°S"list_item"°F);°L
                                °V    new_item°F.id = °S"list_item_" °F+ °Dddui°F.GenerateUuid();°L
                                °V    new_item°F.innerHTML = °L
                                °S        °>\`<div class="list_item_area list_item_area_left">°<°L
                                °S            °><div class="list_item_checkbox">°<°L
                                °S                °><input id="\${new_item.id}_checkbox" class="checkbox" type="checkbox"/>°<°L
                                °S           °></div>°<°L
                                °S        °></div>°<°L
                                °S        °><div class="list_item_area list_item_area_center">°<°L
                                °S            °><div class="list_item_text">°<°L
                                °S                °><div id="\${new_item.id}_title">\${title}</div>°<°L
                                °S            °></div>°<°L
                                °S        °></div>°<°L
                                °S        °><div class="list_item_area list_item_area_right">°<°L
                                °S            °><div class="list_item_button" id="\${new_item.id}_button">°<°L
                                °S                °><div style="padding-top:2px;"><span class="material-icons">more_horiz</span></div>°<°L
                                °S            °></div>°<°L
                                °S        °></div>\`;°<°L
                                °L
                                °I    // append the newly created list item (content) to the list°L
                                °V    list°F.AppendItem(°Vnew_item°F);°L
                                °L
                                °I    // add event handler for clicking list items (select / deselct)°L
                                °V    new_item°F.addEventListener(°S"click"°F, () => {°L
                                °P        const °Vcheckbox °F= °Vdocument°F.getElementById(°S\`°F\${°Vnew_item°F.id}°S_checkbox\`°F);°L
                                °P        const °Vbanner °F= °Vdocument°F.getElementById(°Vnew_item°F.id);°L
                                °P        if °F( °Vcheckbox°F.checked ) {°L
                                °V            checkbox°F.checked = °Bfalse°F;°L
                                °V            banner°F.classList.remove(°S"list_item_selected"°F);°L
                                °F        } °Pelse °F{°L
                                °V            checkbox°F.checked = °Btrue°F;°L
                                °V            banner°F.classList.add(°S"list_item_selected"°F);°L
                                °F        }°L
                                °F    });°L
                                °L
                                °I    // When the checkbox is clicked, it would get changed twice:°L
                                °I    //   1x due to default checkbox behaviour and 1x due to the actual handler (see above)°L
                                °I    // For that reason, the checkbox in this case shall be flipped once more.°L
                                °I    // So it's actually three flips in that case ;-)°L
                                °P    const °Vcheckbox °F= °Vdocument°F.getElementById(°S\`°F\${°Vnew_item°F.id}°S_checkbox\`°F);°L
                                °V    checkbox°F.addEventListener(°S"click"°F, () => °Vcheckbox°F.checked = !°Vcheckbox°F.checked);°L
                                °L
                                °I    // add event handler for clicking on a list item's menu action button (show popup menu)°L
                                °P    const °Vbutton_list_item_menu °F= °Vdocument°F.getElementById(°S\`°F\${°Vnew_item°F.id}°S_button\`°F);°L
                                °V    button_list_item_menu°F.addEventListener(°S"click"°F, °Vevent °F=> {°L
                                °L
                                °I        // prevent the (de)selecting of the list item°L
                                °V        °Vevent°F.stopPropagation();°L
                                °L
                                °I        // fetch the id of the current list item°L
                                °P        const °Vitem_id °F= °Vevent°F.currentTarget.parentElement.parentElement.parentElement.id;°L
                                °L
                                °I        // show popup menu for the current list item°L
                                °D        ddui°F.Popup(°L
                                °O            [{°L
                                °O                type: °S"button"°O,°L
                                °O                style: °S"red"°O,°L
                                °O                label: °S"Delete item"°O,°L
                                °O                icon: °S"delete"°O,°L
                                °O                onClick: °Pasync °F() => °Vlist°F.DeleteItem(°Vitem_id°F)°L
                                °O            }]°F,°L
                                °S            "positioned"°F,°L
                                °V            °Vevent°F.currentTarget°L
                                °F        );°L
                                °F    });°L
                                °L
                                °F}`
                            )
                        )),
                        tooltip: "Show code (create list)",
                        width: "45px",
                    },
                    {   // Add new item
                        image: { type: "html", data: `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
                        onClick: () => CreateRichItem("another list item"),
                        tooltip: "Add new item",
                        corner_button: {
                            image: { type: "html", data: code_icon },
                            onClick: () => ddui.Dialogue(null, null, code_snippet(
                                codeX(
                                   `°I// create a rich list item with the°L
                                    °I// custom function "CreateRichItem(°><title>°<)"°L
                                    °FCreateRichItem(°S"another list item"°F);°L
                                    °L
                                    °I// see the code for "CreateRichItem() in"°L
                                    °I// the code snippet for creating the list`
                                )
                            )),
                            tooltip: "Show code"
                        }
                    },
                    {
                        image: { type: "html", data: `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6 12H18" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
                        onClick: () => {
                            const index = Math.round(Math.random() * (list.length - 1));
                            list.DeleteItem(index);
                        },
                        tooltip: "Delete random item",
                        corner_button: {
                            image: { type: "html", data: code_icon },
                            onClick: () => ddui.Dialogue(null, null, code_snippet(
                                codeX(
                                   `°I// calculate a random index ...°L
                                    °Pconst °Vindex °F= Math.round( Math.random() * ( °Vlist°F.length - °N1°F ) );°L
                                    °L
                                    °I// ... and delte the respective list item°L
                                    °Vlist°F.DeleteItem(°Vindex°F);`
                                )
                            )),
                            tooltip: "Show code"
                        }
                    },
                    {
                        image: { type: "html", data: `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9 2L15 2" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 10L12 14" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
                        onClick: () => {
                            list.ShowLoadingSpinner();
                        },
                        tooltip: "Show spinner",
                        corner_button: {
                            image: { type: "html", data: code_icon },
                            onClick: () => ddui.Dialogue(null, null, code_snippet(
                                codeX(
                                   `°Vlist°F.ShowLoadingSpinner();`
                                )
                            )),
                            tooltip: "Show code"
                        }
                    },
                    {
                        image: { type: "html", data: `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9 2L15 2" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7L19 21.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 10L12 14" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.1905 8.5C4.83275 9.93366 4 11.8696 4 14C4 18.4183 7.58172 22 12 22C14.0049 22 15.8375 21.2625 17.2413 20.044M19.4185 17C19.7935 16.0736 20 15.0609 20 14C20 9.58172 16.4183 6 12 6C11.0187 6 10.0786 6.17669 9.20988 6.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
                        onClick: () => {
                            list.DiscardLoadingSpinner();
                        },
                        tooltip: "Discard spinner",
                        corner_button: {
                            image: { type: "html", data: code_icon },
                            onClick: () => ddui.Dialogue(null, null, code_snippet(
                                codeX(
                                   `°Vlist°F.DiscardLoadingSpinner();`
                                )
                            )),
                            tooltip: "Show code"
                        }
                    }
                ], "104px", "45px", "5px", "left", "10px");

                await ddui.WaitForDom("list_container", "does_exist");

                // create a list and place it inside the container node with the id "list_container"
                const list = new ddui.List("list_container");

                // create 3 list items with the custom (non ddui) function "CreateRichtItem"
                CreateRichItem("buy bread and milk");
                CreateRichItem("bring car to car shop");
                CreateRichItem("meet John for a coffee");

                // custom (non ddui) function to create rich list items
                function CreateRichItem(title) {

                    // build the list item (actually it's the list item content)
                    const new_item = document.createElement("div");
                    new_item.classList.add("list_item");
                    new_item.id = "list_item_" + ddui.GenerateUuid();
                    new_item.innerHTML = 
                        `<div class="list_item_area list_item_area_left">
                            <div class="list_item_checkbox">
                                <input id="${new_item.id}_checkbox" class="checkbox" type="checkbox"/>
                        </div>
                        </div>
                        <div class="list_item_area list_item_area_center">
                            <div class="list_item_text">
                                <div id="${new_item.id}_title">${title}</div>
                            </div>
                        </div>
                        <div class="list_item_area list_item_area_right">
                            <div class="list_item_button" id="${new_item.id}_button">
                                <div style="padding-top:2px;"><span class="material-icons">more_horiz</span></div>
                            </div>
                        </div>`;

                    // append the newly created list item (content) to the list
                    list.AppendItem(new_item);

                    // add event handler for clicking list items (select / deselct)
                    new_item.addEventListener("click", () => {
                        const checkbox = document.getElementById(`${new_item.id}_checkbox`);
                        const banner = document.getElementById(new_item.id);
                        if ( checkbox.checked ) {
                            checkbox.checked = false;
                            banner.classList.remove("list_item_selected");
                        } else {
                            checkbox.checked = true;
                            banner.classList.add("list_item_selected");
                        }
                    });

                    // When the checkbox is clicked, it would get changed twice:
                    //   1x due to default checkbox behaviour and 1x due to the actual handler (see above)
                    // For that reason, the checkbox in this case shall be flipped once more.
                    // So it's actually three flips in that case ;-)
                    const checkbox = document.getElementById(`${new_item.id}_checkbox`);
                    checkbox.addEventListener("click", () => checkbox.checked = !checkbox.checked);

                    // add event handler for clicking on a list item's menu action button (show popup menu)
                    const button_list_item_menu = document.getElementById(`${new_item.id}_button`);
                    button_list_item_menu.addEventListener("click", event => {

                        // prevent the (de)selecting of the list item
                        event.stopPropagation();

                        // fetch the id of the current list item
                        const item_id = event.currentTarget.parentElement.parentElement.parentElement.id;

                        // show popup menu for the current list item
                        ddui.Popup(
                            [{
                                type: "button",
                                style: "red",
                                label: "Delete item",
                                icon: "delete",
                                onClick: async () => list.DeleteItem(item_id)
                            }],
                            "positioned",
                            event.currentTarget
                        );
                    });

                }

            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_Tiles() {    

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>The tiles control is a nice control for simple but beautiful kind of buttons. Like a button bar but in a modern way.</p>` +
        `<h1>Code example</h1>` +
            `<div class="codebox code">` +
                `${codeX(
                    `°I// html for the tiles container°L
                     °F°><°Pdiv °Vid°F=°S"tiles_container"°F>°L
                     °F</°Pdiv°F>°<°L
                     °L
                     °I// css for the tiles container°L
                     °F#tiles_container {°L
                     °V    width°F: °S340px°F;°L
                     °V    max-width°F: °S100%°F;°L
                     °V    min-height°F: °S260px°F;°L
                     °F}°L
                     °L
                     °I// js for creating the tiles control inside the tiles container°L
                     °Pnew °Dddui°F.Tiles(°S"tiles_container"°F, [°L
                     °O    {°L
                     °O        label: °S"Clothes"°O,°L
                     °O        image: °S"checkroom"°O,°L
                     °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening clothes section ..."°F, °N1000°F) }°L
                     °O    },°L
                     °O    {°L
                     °O        label: °S"Electrics"°O,°L
                     °O        image: °S"tungsten"°O,°L
                     °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening electrics section ..."°F, °N1000°F) }°L
                     °O    },°L
                     °O    {°L
                     °O        label: °S"Living"°O,°L
                     °O        image: °S"chair"°O,°L
                     °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening living section ..."°F, °N1000°F) }°L
                     °O    },°L
                     °O    {°L
                     °O        label: °S"Food"°O,°L
                     °O        image: °S"lunch_dining"°O,°L
                     °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening food section ..."°F, °N1000°F) }°L
                     °O    },°L
                     °O    {°L
                     °O        label: °S"Drinks"°O,°L
                     °O        image: °S"liquor"°O,°L
                     °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening drinks section ..."°F, °N1000°F) }°L
                     °O    }°L
                     °F]);`
                 )}` +
            `</div>` +
        `<h1>Specification</h1>` +
            `<div class="codebox code">` +
            `${codeX(
                `°I// create tiles control°L
                 °Pnew °Dddui°F.Tiles(°L
                 °V    container_id°F,°L
                 °V    tiles°F,°L
                 °V    tile_width°F,°L
                 °V    tile_height°F,°L
                 °V    tile_padding°F,°L
                 °V    tiles_align°F,°L
                 °V    tiles_gap°F,°L
                 °F);`
             )}` +
        `</div>` +
        `<div class="args_grid">` +
            `${arg("Y", false, "container_id",    "String",        "Id of the dom element that shall contain the tiles control")}` +
            `${arg("Y", true,  "tiles",           "List",          "List of tile items")}` +
            `${arg("N", false, "  label",         "String",        "Text label to display on the tile")}` +
            `${arg("N", true,  "  image",         "String/Object", "Name of material icon (string) or an object with specific definitions")}` +
            `${arg("N", false, "    type",        "String",        `"material_icon" or "html" (default)`)}` +
            `${arg("N", false, "    data",        "String",        `Name of material icon (type "material_icon") or html snippet (type "html")`)}` +
            `${arg("N", true,  "    size",        "String",        `Size of material icon (type "material_icon"); not relevant for type "html"`)}` +
            `${arg("N", false, "  onClick",       "Function",      "Function to be called on clicking the tile")}` +
            `${arg("N", true,  "  corner_button", "Object",        "Optional button at the top right corner for a special action")}` +
            `${arg("N", false, "    image",       "String",        `Same as for tiles.image`)}` +
            `${arg("N", false, "    onClick",     "Function",      "Function to be called on clicking the corner button")}` +
            `${arg("N", false, "    width",       "String",        "Width of the corner button")}` +
            `${arg("N", false, "    height",      "String",        "Height of the corner button")}` +
            `${arg("N", false, "    padding",     "String",        "Padding for the corner button")}` +
            `${arg("N", true,  "    tooltip",     "String",        "Tooltip text for the corner button")}` +
            `${arg("N", false, "  width",         "String",        "Width of the tile (if it shall defer from the default width)")}` +
            `${arg("N", false, "  height",        "String",        "Height of the tile (if it shall defer from the default height)")}` +
            `${arg("N", true,  "  tooltip",       "String",        "Tooltip text for the tile")}` +
            `${arg("N", false, "tile_width",      "String",        `Width for each tile (default: "100px")`)}` +
            `${arg("N", false, "tile_height",     "String",        `Height for each tile (default: "120px")`)}` +
            `${arg("N", false, "tile_padding",    "String",        `Padding for each tile (inside the tile) (default: "10px")`)}` +
            `${arg("N", false, "tiles_align",     "String",        `Value for the justify-content property for the tiles flexbox (default: "left")`)}` +
            `${arg("N", false, "tiles_gap",       "String",        `Value for the gap property for the tiles flexbox (default: "20px")`)}` +
        `</div>` +
        `<h1>Demo</h1>` +
        `<div id="Dialogue_Tiles_Demo_Tiles" style="min-height: 90px;"></div><br>` +
    `</div>`

}






async function LoadDialogueControls_Tiles(code_icon) {

    // Wait for the container for the tiles element ...
    await ddui.WaitForDom("Dialogue_Tiles_Demo_Tiles", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_Tiles_Demo_Tiles", [



        {
            label: "Simple",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>` },
            onClick: async () => {
                ddui.Dialogue(
                    null,
                    null,
                    `<div id="tiles_container"></div>`,
                    null,
                    `#tiles_container {
                        width: 340px;
                        max-width: 100%;
                        min-height: 260px;
                    }`
                );

                await ddui.WaitForDom("tiles_container", "does_exist");

                // create a tiles control and place it inside the
                // container node with the id "tiles_container"
                new ddui.Tiles("tiles_container", [
                    {
                        label: "Clothes",
                        image: "checkroom",
                        onClick: () => { ddui.LoadingBox("opening clothes section ...", 1000) }
                    },
                    {
                        label: "Electrics",
                        image: "tungsten",
                        onClick: () => { ddui.LoadingBox("opening electrics section ...", 1000) }
                    },
                    {
                        label: "Living",
                        image: "chair",
                        onClick: () => { ddui.LoadingBox("opening living section ...", 1000) }
                    },
                    {
                        label: "Food",
                        image: "lunch_dining",
                        onClick: () => { ddui.LoadingBox("opening food section ...", 1000) }
                    },
                    {
                        label: "Drinks",
                        image: "liquor",
                        onClick: () => { ddui.LoadingBox("opening drinks section ...", 1000) }
                    }
                ]);

            },
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(
                       `°I// html for the tiles container°L
                        °F°><°Pdiv °Vid°F=°S"tiles_container"°F>°L
                        °F</°Pdiv°F>°<°L
                        °L
                        °I// css for the tiles container°L
                        °F#tiles_container {°L
                        °V    width°F: °S340px°F;°L
                        °V    max-width°F: °S100%°F;°L
                        °V    min-height°F: °S260px°F;°L
                        °F}°L
                        °L
                        °I// js for creating the tiles control inside the tiles container°L
                        °Pnew °Dddui°F.Tiles(°S"tiles_container"°F, [°L
                        °O    {°L
                        °O        label: °S"Clothes"°O,°L
                        °O        image: °S"checkroom"°O,°L
                        °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening clothes section ..."°F, °N1000°F) }°L
                        °O    },°L
                        °O    {°L
                        °O        label: °S"Electrics"°O,°L
                        °O        image: °S"tungsten"°O,°L
                        °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening electrics section ..."°F, °N1000°F) }°L
                        °O    },°L
                        °O    {°L
                        °O        label: °S"Living"°O,°L
                        °O        image: °S"chair"°O,°L
                        °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening living section ..."°F, °N1000°F) }°L
                        °O    },°L
                        °O    {°L
                        °O        label: °S"Food"°O,°L
                        °O        image: °S"lunch_dining"°O,°L
                        °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening food section ..."°F, °N1000°F) }°L
                        °O    },°L
                        °O    {°L
                        °O        label: °S"Drinks"°O,°L
                        °O        image: °S"liquor"°O,°L
                        °O        onClick: °F() => { °Dddui°F.LoadingBox(°S"opening drinks section ..."°F, °N1000°F) }°L
                        °O    }°L
                        °F]);`
                    )
                )),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function GetDialogueHtml_Buttons() {

    return `<div class="specs_dialogue">` +
        `<h1 style="margin-top: 25px;">About</h1>` +
        `<p>The "buttons" object is used for <a onclick="ShowDialogue('MessageBox')" ddui_tooltip="open specs">message boxes</a> and <a onclick="ShowDialogue('Dialogue')" ddui_tooltip="open specs">dialogues</a>.</p>` +
        `<h1>Code example</h1>` +
        `<div class="codebox code">` +
            codeX(
               `°O[°L
                °O    {°L
                °O        label: °S"Close"°O,°L
                °O        style: °S"inferior"°L
                °O    },°L
                °O    {°L
                °O        label: °S"Save"°O,°L
                °O        onClick: °Pasync °F() => °Pawait °FSaveChanges()°L
                °O    }°L
                °O]`
            ) +
        `</div>` +
        `<h1>Specification</h1>` +
        `<div class="codebox code">` +
            codeX(
               `°O[°L
                °O    {°L
                °O        label: °Vlabel°O,°L
                °O        default: °Vdefault°O,°L
                °O        style: °Vstyle°O,°L
                °O        onClick: °VonClick°O,°L
                °O        closeOnClick: °VcloseOnClick°O,°L
                °O        await_action: °Vawait_action°L
                °O    }°L
                °I    // ...°L
                °O]`
            ) +
        `</div>` +
        `<div class="args_grid">` + 
            `${arg("Y", true,  "label",        "String",   "Button text")}` +
            `${arg("N", true,  "default",      "Boolean",  "Default button (gets executed on Enter)")}` +
            `${arg("N", true,  "style",        "String",   `Empty or null for default (primary); alternatives: "inferior" and "red"`)}` +
            `${arg("N", true,  "onClick",      "Function", "Function to be executed on button click")}` +
            `${arg("N", true,  "closeOnClick", "Boolean",  "Shall the dialogue close after button click?")}` +
            `${arg("N", false, "await_action", "Boolean",  "Shall the dialogue close before or after the action has passed (default: false)?")}` +
        `</div>` +
            `<h1>Demo</h1>` +
            `<br><div id="Dialogue_Buttons_Demo_Tiles" style="min-height: 90px;"></div><br>` +
        `</div>`

}






async function LoadDialogueControls_Buttons(code_icon) {

    // Wait for the container for the tiles element ...
    await ddui.WaitForDom("Dialogue_Buttons_Demo_Tiles", "does_exist");
    // ... and then create the tiles element
    new ddui.Tiles("Dialogue_Buttons_Demo_Tiles", [
        {
            label: "Styles",
            image: { type: "html", data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M20 14C20 9.58172 12 2 12 2C12 2 4 9.58172 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>` },
            onClick: () => ddui.MessageBox(
                "Here you see the three possible styles for buttons:",
                null,
                [
                    {
                        label: "Default",
                    },
                    {
                        label: "Inferior style",
                        style: "inferior"
                    },
                    {
                        label: "Red style",
                        style: "red"
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "Here you see the three possible styles for buttons:"`)},<br>` +
                    `${code("var",    `    null`)},<br>` +
                    `${code("object", `    [<br>` +
                                      `        {<br>` +
                                      `            label: ${code("string", `"Default"`)},<br>` +
                                      `        },<br>` +
                                      `        {<br>` +
                                      `            label: ${code("string", `"Inferior style"`)},<br>` +
                                      `            style: ${code("string", `"inferior"`)}<br>` +
                                      `        },<br>` +
                                      `        {<br>` +
                                      `            label: ${code("string", `"Red style"`)},<br>` +
                                      `            style: ${code("string", `"red"`)}<br>` +
                                      `        }<br>` +
                                      `    ]`)}<br>` +
                                      `);`)),
                tooltip: "Show code"
            }
        },
        {
            label: "Actions",
            image: { type: "material_icon", data: "bolt", size: "32px" },
            onClick: () => ddui.MessageBox(
                "All buttons do a little action.<br>" +
                "One closes the dialogue right away.<br>" +
                "One closes the dialogue after the action has passed.<br>" +
                "One does not clos the dialogue at all (default behaviour).",
                null,
                [
                    {
                        label: "Action and close",
                        onClick: async () => {
                            ddui.Toaster("Dialogue closed and action started.");
                            await new Promise(res => setTimeout(res, 4000));
                            ddui.Toaster("Action finished.");
                        }
                    },
                    {
                        label: "Action, wait and close",
                        onClick: async () => {
                            ddui.Toaster("Action started.");
                            await new Promise(res => setTimeout(res, 3000));
                            ddui.Toaster("Action finished and dialogue closed.");
                        },
                        await_action: true
                    },
                    {
                        label: "Action and stay",
                        onClick: async () => {
                            ddui.Toaster("Action started.");
                            await new Promise(res => setTimeout(res, 3000));
                            ddui.Toaster("Action finished.");
                        },
                        closeOnClick: false
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    codeX(
                       `°Dddui°F.MessageBox(°L
                        °S    "All buttons do a little action.°><br>°<" °F+°L
                        °S    "One closes the dialogue right away.°><br>°<" °F+°L
                        °S    "One closes the dialogue after the action has passed.°><br>°<" °F+°L
                        °S    "One does not clos the dialogue at all (default behaviour)."°F,°L
                        °V    null°F,°L
                        °O    [°L
                        °O        {°L
                        °O            label: °S"Action and close"°O,°L
                        °O            onClick: °Pasync °F() => {°L
                        °D                ddui°F.Toaster(°S"Dialogue closed and action started."°F);°L
                        °P                await °Fnew Promise(°Vres °F=> setTimeout(°Vres°F, °N4000°F));°L
                        °D                ddui°F.Toaster(°S"Action finished."°F);°L
                        °F            }°L
                        °O        },°L
                        °O        {°L
                        °O            label: °S"Action, wait and close"°O,°L
                        °O            onClick: °Pasync °F() => {°L
                        °D                ddui°F.Toaster(°S"Action started."°F);°L
                        °P                await °Fnew Promise(°Vres °F=> setTimeout(°Vres°F, °N3000°F));°L
                        °D                ddui°F.Toaster(°S"Action finished and dialogue closed."°F);°L
                        °F            },°L
                        °O            await_action: °Btrue°L
                        °O        },°L
                        °O        {°L
                        °O            label: °S"Action and stay"°O,°L
                        °O            onClick: °Pasync °F() => {°L
                        °D                ddui°F.Toaster(°S"Action started."°F);°L
                        °P                await °Fnew Promise(°Vres °F=> setTimeout(°Vres°F, °N3000°F));°L
                        °D                ddui°F.Toaster(°S"Action finished."°F);°L
                        °F            },°L
                        °O            closeOnClick: °Bfalse°L
                        °O        }°L
                        °O    ]°L
                        °F);`))),
                tooltip: "Show code"
            }
        },
        {
            label: "Default button",
            image: { type: "html", data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M10.25 19.25L6.75 15.75L10.25 12.25" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.75 15.75H12.75C14.9591 15.75 16.75 13.9591 16.75 11.75V4.75" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
            onClick: () => ddui.MessageBox(
                "The button 'Say Hi' is the default button. Hit Enter to execute it.",
                null,
                [
                    {
                        label: "Cancel",
                        style: "inferior"
                    },
                    {
                        label: "Say Bye",
                        onClick: () => ddui.Toaster("Bye!"),
                        closeOnClick: false
                    },
                    {
                        label: "Say Hi",
                        default: true,
                        onClick: () => ddui.Toaster("Hi!"),
                        closeOnClick: false
                    }
                ]
            ),
            corner_button: {
                image: { type: "html", data: code_icon },
                onClick: () => ddui.Dialogue(null, null, code_snippet(
                    `${code("ddui")}.MessageBox(<br>` +
                    `${code("string", `    "The button 'Say Hi' is the default button. Hit Enter to execute it."`)},<br>` +
                    `${code("var",    `    null`)},<br>` +
                    `${code("object", `    [<br>` +
                                      `        {<br>` +
                                      `            label: ${code("string", `"Cancel"`)},<br>` +
                                      `            style: ${code("string", `"inferior"`)}<br>` +
                                      `        },<br>` +
                                      `        {<br>` +
                                      `            label: ${code("string", `"Say Bye"`)},<br>` +
                                      `            onClick: ${code("func", `() => ${code("ddui")}.Toaster(${code("string", `"Bye!"`)})`)},<br>` +
                                      `            closeOnClick: ${code("bool", `false`)}<br>` +
                                      `        },<br>` +
                                      `        {<br>` +
                                      `            label: ${code("string", `"Say Hi"`)},<br>` +
                                      `            default: ${code("bool", `true`)},<br>` +
                                      `            onClick: ${code("func", `() => ${code("ddui")}.Toaster(${code("string", `"Hi!"`)})`)},<br>` +
                                      `            closeOnClick: ${code("bool", `false`)}<br>` +
                                      `        }<br>` +
                                      `    ]`)}<br>` +
                                      `);`)),
                tooltip: "Show code"
            }
        }
    ], "100px", "90px");

}






function ShowDialogue(which) {

    // Icon for the tile corner button to show the code snippet of the demo example
    const code_icon = `<svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_pink_text)"><path d="M13.5 6L10 18.5" stroke="var(--ddui_pink_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.5 8.5L3 12L6.5 15.5" stroke="var(--ddui_pink_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5 8.5L21 12L17.5 15.5" stroke="var(--ddui_pink_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    switch (which) {

        case "MessageBox":
            ddui.Dialogue("Message boxes", null,
                GetDialogueHtml_MessageBox(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_MessageBox(code_icon);
            break;

        case "Toaster":
            ddui.Dialogue("Toaster messages", null,
                GetDialogueHtml_Toaster(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_Toaster(code_icon);
            break;

        case "Popup":
            ddui.Dialogue("Popup menus", null,
                GetDialogueHtml_Popup(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_Popup(code_icon);
            break;

        case "Dialogue":
            ddui.Dialogue("Dialogues", null,
                GetDialogueHtml_Dialogue(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_Dialogue(code_icon);
            break;

        case "LoadingBox":
            ddui.Dialogue("Loading box", null,
                GetDialogueHtml_LoadingBox(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_LoadingBox(code_icon);
            break;

        case "List":
            ddui.Dialogue("List", null,
                GetDialogueHtml_List(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_List(code_icon);
            break;

        case "Tiles":
            ddui.Dialogue("Tiles", null,
                GetDialogueHtml_Tiles(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_Tiles(code_icon);
            break;            

        case "Buttons":
            ddui.Dialogue("Buttons", null,
                GetDialogueHtml_Buttons(), null,
                GetDialogueCss_Default());
            LoadDialogueControls_Buttons(code_icon);
            break;  
            
        default:
            ddui.MessageBox(`A specification for "${which}" does not exist.`, "warning");

    }

}






// Global catch for unhandled errors
try {
    Main();
}
catch (err) {
    log.log(`An unhandled error occured: ${err.name} - ${err.message}`);
    console.error(err);
    ddui.DisplayError(`An unhandled error occured: ${err.name} - ${err.message}`);
}