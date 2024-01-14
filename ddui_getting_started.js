





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
import * as ddui from "./ddui.js";

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

    new ddui.Tiles("tiles_ddui_dialogues", [
        {
            label: "Msg Box",
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
            }
        },
        {
            label: "Popup",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 7L17 7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12L17 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17L13 17" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            }
        },
        {
            label: "Dialogue",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M13 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H20C21.1046 3 22 3.89543 22 5V13" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round"></path><path d="M22 17.2798C22 17.8812 21.7625 18.4588 21.3383 18.8861C20.3619 19.8701 19.415 20.8961 18.4021 21.8443C18.17 22.0585 17.8017 22.0507 17.5795 21.8268L14.6615 18.8861C13.7795 17.9972 13.7795 16.5623 14.6615 15.6734C15.5522 14.7758 17.0032 14.7758 17.8938 15.6734L17.9999 15.7803L18.1059 15.6734C18.533 15.2429 19.1146 15 19.7221 15C20.3297 15 20.9113 15.2428 21.3383 15.6734C21.7625 16.1007 22 16.6784 22 17.2798Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linejoin="round"></path><path d="M2 7L22 7" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 5.01L5.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 5.01L8.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 5.01L11.01 4.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            }
        }
    ]);

    new ddui.Tiles("tiles_ddui_controls", [
        {
            label: "List",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M3 12H7.5H12H16.5H21M3 12V16.5M3 12V7.5M21 12V16.5M21 12V7.5M3 16.5V20.4C3 20.7314 3.26863 21 3.6 21H7.5H12H16.5H20.4C20.7314 21 21 20.7314 21 20.4V16.5M3 16.5H7.5H12H16.5H21M21 7.5V3.6C21 3.26863 20.7314 3 20.4 3H16.5H12H7.5H3.6C3.26863 3 3 3.26863 3 3.6V7.5M21 7.5H16.5H12H7.5H3" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>`
            }
        },
        {
            label: "Tiles",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>`
            }
        }
    ]);

    new ddui.Tiles("tiles_ddui_misc", [
        {
            label: "Buttons",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M6.75 12H16.75M16.75 12L14 14.75M16.75 12L14 9.25" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 15V9C2 6.79086 3.79086 5 6 5H18C20.2091 5 22 6.79086 22 9V15C22 17.2091 20.2091 19 18 19H6C3.79086 19 2 17.2091 2 15Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path></svg>`
            }
        },
        {
            label: "Theme",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 12L23 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2V1" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 23V22" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 20L19 19" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 4L19 5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 20L5 19" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 4L5 5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12L2 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            }
        },
        {
            label: "Icons",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16L10 13L21 18" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            }
        },
        {
            label: "Colors",
            image: {
                type: "html",
                data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M20.5096 9.54C20.4243 9.77932 20.2918 9.99909 20.12 10.1863C19.9483 10.3735 19.7407 10.5244 19.5096 10.63C18.2796 11.1806 17.2346 12.0745 16.5002 13.2045C15.7659 14.3345 15.3733 15.6524 15.3696 17C15.3711 17.4701 15.418 17.9389 15.5096 18.4C15.5707 18.6818 15.5747 18.973 15.5215 19.2564C15.4682 19.5397 15.3588 19.8096 15.1996 20.05C15.0649 20.2604 14.8877 20.4403 14.6793 20.5781C14.4709 20.7158 14.2359 20.8085 13.9896 20.85C13.4554 20.9504 12.9131 21.0006 12.3696 21C11.1638 21.0006 9.97011 20.7588 8.85952 20.2891C7.74893 19.8194 6.74405 19.1314 5.90455 18.2657C5.06506 17.4001 4.40807 16.3747 3.97261 15.2502C3.53714 14.1257 3.33208 12.9252 3.36959 11.72C3.4472 9.47279 4.3586 7.33495 5.92622 5.72296C7.49385 4.11097 9.60542 3.14028 11.8496 3H12.3596C14.0353 3.00042 15.6777 3.46869 17.1017 4.35207C18.5257 5.23544 19.6748 6.49885 20.4196 8C20.6488 8.47498 20.6812 9.02129 20.5096 9.52V9.54Z" stroke="var(--ddui_page_text)" stroke-width="1.5"></path><path d="M8 16.01L8.01 15.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 12.01L6.01 11.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 8.01L8.01 7.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6.01L12.01 5.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 8.01L16.01 7.99889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
            }
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

    function TestMessageBoxesClick() {
        ddui.MessageBox(
            "Warning! This is serious! You are about to choose between two possible actions. Each will have no real effect but at least it will do something. Give it a shot! You can do it!",
            "bare",
            [
                {
                    label: "Close",
                    style: "inferior"
                },
                {
                    label: "Text only",
                    onClick: () => { ddui.MessageBox("This is a message box with just some text. Have fun reading it!") },
                    closeOnClick: false
                },
                {
                    label: "Info",
                    onClick: () => { ddui.MessageBox("This is a message box with info design.", "info") },
                    closeOnClick: false
                },
                {
                    label: "Warning",
                    onClick: () => { ddui.MessageBox("This is a message box with warning design.", "warning") },
                    closeOnClick: false
                },
                {
                    label: "Error",
                    onClick: () => { ddui.MessageBox("This is a message box with error design.", "error") },
                    closeOnClick: false,
                    style: "red"
                },
                {
                    label: "Success",
                    onClick: () => { ddui.MessageBox("This is a message box with success design.", "success") },
                    closeOnClick: false
                },
                {
                    label: "No Exit",
                    onClick: () => { ddui.MessageBox("This is a message box that doesn't allow an exit.", null, null, false) },
                    closeOnClick: false
                }
            ]
        );
    }






    function TestToasterClick() {
        ddui.Toaster("Hey there!");
    }






    ddui.Popup(
        [
            {
                type: "button",
                label: "Test message boxes",
                icon: "sports_score",
                onClick: () => { TestMessageBoxesClick() }
            },
            {
                type: "button",
                label: "Test toaster",
                icon: "thumb_up",
                onClick: () => { TestToasterClick() }
            },  
            {
                type: "line"
            },
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






async function ShowDialogue(which) {

    const image_size = "36px";
    const image_color = "var(--ddui_page_text)";

    let title;
    let html;
    let css;

    switch (which) {

        case "MessageBox":
            
            title = "Message boxes";

            html = `<div style="max-width: 800px;">
            <h2>Example</h2>
            <p class="code">
                <span class="code ddui">ddui</span>.MessageBox(<span class="code code_arg">"Hello world!"</span>);
            </p>
            <h2>Concept</h2>
            <p class="code">
                <span class="code ddui">ddui</span>.MessageBox(<span class="code code_arg">content</span>, <span class="code code_arg">type</span>, <span class="code code_arg">buttons</span>, <span class="code code_arg">allow_exit</span>);
            </p>
            <h2>Demo</h2>
            <p>By default, message boxes can be discarded by clicking outside the message box or by pressing escape. But if "allow_exit" is set to "false", no exit is allowed.</p>
            <div id="Dialogue_MessageBox_Demo_Tiles_1"></div>
            <p>Message boxes can be of a specific type with a dedecated look.</p>
            <div id="Dialogue_MessageBox_Demo_Tiles_2"></div>
                <p>Per default there is just an "OK" button for closing the message box, but you can define buttons as you wish and let them do what you want. You can also define, if a button shall (additional to calling your function) close the message box as well (default) or not. Finally the buttons can be of the default style, or the style "inferio" or "red".</p>
            <div id="Dialogue_MessageBox_Demo_Tiles_3"></div>
            </div>`;

            css = `
            .ddui {
                color: var(--ddui_green_text);
            }
            .code {
                font-family: Courier New;
                font-weight: 700;
            }
            .code_arg {
                color: var(--ddui_yellow_text);
            }
            `;

            ddui.Dialogue("Message boxes", null, html, null, css);
            
            await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_1", "does_exist");

            new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_1", [
                {
                    label: "Simple",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("You can leave me easily, by clicking outside or by pressing escape.")
                },
                {
                    label: "No exit",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M13 2.04938C12.6711 2.01672 12.3375 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6625 21.9833 11.3289 21.9506 11" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1211 7.36398L19.2424 5.24266M19.2424 5.24266L21.3637 3.12134M19.2424 5.24266L17.1211 3.12134M19.2424 5.24266L21.3637 7.36398" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("If I had no closing button, you wouldn't be able to leave me. Try clicking outside and pressing escape.", null, [{ label: "Close", closeOnClick: true }], false)
                }
            ], "100px", "90px");

            await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_2", "does_exist");

            new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_2", [
                {
                    label: "Error",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9.5 14.5L11.9926 12M14.5 9.5L11.9926 12M11.9926 12L9.5 9.5M11.9926 12L14.5 14.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("Oops! A really bad error has occured!", "error")
                },
                {
                    label: "Warning",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 8L12 12" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16.01L12.01 15.9989" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("Watch out! Monsters roaming!", "warning")
                },
                {
                    label: "Info",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M12 11.5V16.5" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("Be informed that you've just been informed.", "info")
                },
                {
                    label: "Success",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M8 12L11 15L16 10" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("Now that went really well, didn't it?", "success")
                }
            ], "100px", "90px");

            await ddui.WaitForDom("Dialogue_MessageBox_Demo_Tiles_3", "does_exist");

            new ddui.Tiles("Dialogue_MessageBox_Demo_Tiles_3", [
                {
                    label: "Buttons",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M9 12H12M15 12H12M12 12V9M12 12V15" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("See my beautiful buttons!", null, [{ label: "Say Hi!", onClick: () => ddui.Toaster("Hi!"), closeOnClick: false }, { label: "Close" }])
                },
                {
                    label: "Styles",
                    image: {
                        type: "html",
                        data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2"></path><path d="M16 5H8C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
                    },
                    onClick: () => ddui.MessageBox("See my beautiful buttons!", null, [{ label: "Cancel", style: "inferior" }, { label: "Say Hi!", onClick: () => ddui.Toaster("Hi!"), closeOnClick: false }, { label: "Delete all", style: "red", onClick: () => ddui.Toaster("All data is gone!"), closeOnClick: false }])
                }
            ], "100px", "90px");

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