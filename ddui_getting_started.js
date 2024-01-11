





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

    const image_size = "36px";
    new ddui.Tiles("tiles_ddui_dialogues", [
        {
            label: "Msg Box",
            image: {
                type: "svg",
                data: ddui.icon("app-window", "var(--ddui_page_text_emphasized)", image_size),
            }
        },
        {
            label: "Toaster",
            image: {
                type: "svg",
                data: ddui.icon("chat-bubble", "var(--ddui_page_text_emphasized)", image_size),
            }
        },
        {
            label: "Popup",
            image: {
                type: "svg",
                data: ddui.icon("google-docs", "var(--ddui_page_text_emphasized)", image_size),
            }
        },
        {
            label: "Dialogue",
            image: {
                type: "svg",
                data: ddui.icon("favourite-window", "var(--ddui_page_text_emphasized)", image_size),
            }
        }
    ]);

    new ddui.Tiles("tiles_ddui_controls", [
        {
            label: "List",
            image: {
                type: "svg",
                data: ddui.icon("table-rows", "var(--ddui_page_text_emphasized)", image_size),
            }
        },
        {
            label: "Tiles",
            image: {
                type: "svg",
                data: ddui.icon("view-grid", "var(--ddui_page_text_emphasized)", image_size),
            }
        }
    ]);

    new ddui.Tiles("tiles_ddui_misc", [
        {
            label: "Theme",
            image: {
                type: "svg",
                data: ddui.icon("sun-light", "var(--ddui_page_text_emphasized)", image_size),
            }
        },
        {
            label: "Icons",
            image: {
                type: "svg",
                data: ddui.icon("media-image", "var(--ddui_page_text_emphasized)", image_size),
            }
        },
        {
            label: "Colors",
            image: {
                type: "svg",
                data: ddui.icon("palette", "var(--ddui_page_text_emphasized)", image_size),
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
                    onClick: () => { new ddui.MessageBox("This is a message box with just some text. Have fun reading it!") },
                    closeOnClick: false
                },
                {
                    label: "Info",
                    onClick: () => { new ddui.MessageBox("This is a message box with info design.", "info") },
                    closeOnClick: false
                },
                {
                    label: "Warning",
                    onClick: () => { new ddui.MessageBox("This is a message box with warning design.", "warning") },
                    closeOnClick: false
                },
                {
                    label: "Error",
                    onClick: () => { new ddui.MessageBox("This is a message box with error design.", "error") },
                    closeOnClick: false,
                    style: "red"
                },
                {
                    label: "Success",
                    onClick: () => { new ddui.MessageBox("This is a message box with success design.", "success") },
                    closeOnClick: false
                },
                {
                    label: "No Exit",
                    onClick: () => { new ddui.MessageBox("This is a message box that doesn't allow an exit.", null, null, false) },
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
                    new ddui.MessageBox(
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






// Global catch for unhandled errors
try {
    Main();
}
catch (err) {
    log.log(`An unhandled error occured: ${err.name} - ${err.message}`);
    console.error(err);
    ddui.DisplayError(`An unhandled error occured: ${err.name} - ${err.message}`);
}