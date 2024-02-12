





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class Box {

    // args:
    // - modal               
    // - overlay_style       
    // - align_mode          
    //                       
    // - anchor_node         
    // - allow_exit          
    // - CallbackOnDiscard
    constructor({
        modal = true,             // Boolean; if true, the box is modal (background is inaccessable)
        overlay_style,            // String; "shiny" (default), "shady" or "invisible"
        style = null,
        align_mode = "centered",  // String; possible values are "centered" and "positioned"
                                  // if "positioned", then the position is defined relative to an anchore node
        anchor_node = null,       // DOM-Element; anchor for positioning the box (only for align_mode "positioned")
        loading_text = "",        // String; optional text do be displayed as long is box is not beeing filled
        allow_exit = true,        // Boolean; if true, the box can be closed without any further action (also via "Esc" key)
        CallbackOnDiscard         // Callback-Function to be called when the box gets discarded ("ondestroy")
    }) {

        this.id = "ddui_Box_" + ddui.GenerateUuid();
        this.modal = modal;
        this.allow_exit = allow_exit;
        this.CallbackOnDiscard = CallbackOnDiscard;
        this.LoadingBox_info_text_id = "ddui_LoadingBox_info_text_" + ddui.GenerateUuid();

        // ====================
        // Construct the box
        this.node = document.createElement("div");
        this.node.id = this.id;
        this.node.setAttribute("name", "ddui_Box");
        this.node.classList.add("ddui_Box");
        if ( style ) { this.node.style = style }

        // ====================
        // Fill the box with the inital content (spinner and loading text)
        let initial_content = `<div class="ddui_LoadingBox_content">` + 
            ddui.GetSpinner("var(--ddui_primary)", 128, "12px") +
            `<div id="${this.LoadingBox_info_text_id}"`;
        if ( ! (loading_text == null) && loading_text != "" ) {
            initial_content += `class="ddui_LoadingBox_info_text">${loading_text}`;
        } else {
            initial_content += ">";
        }
        initial_content += `</div></div>`;
        this.node.innerHTML = initial_content;

        // ====================
        // create the box in the dom
        if ( this.modal ) {
            this.overlay = new ddui.Overlay(overlay_style);
            this.overlay.node.prepend(this.node);
        } else {
            this.node.style.zIndex = ddui.GetHighestZIndex();
            document.body.prepend(this.node);
        }
        
        // ====================
        // set (and maintain) the box position
        // (for modal AND centered, instead of "via code" a simpler way via css is applied)
        if ( align_mode == "centered" && this.modal ) { this.overlay.node.classList.add("ddui_centered") }
        else { SetBoxPosition({ box_id: this.id, align_mode: align_mode, anchor_node: anchor_node }) }

        // ====================
        // Close box when overlay is clicked but not if box is clicked.
        // ( therefor I have used the mousedown and mouseup events, because otherwise
        //   we have this behaviour: mousdown inside box and mouseup outside box closes the modal box )
        if ( this.modal && this.allow_exit ) {

            this.overlay.node.addEventListener("mousedown", () => {
                this.overlay.node.setAttribute("mouseDowned", "true");
            });
            this.overlay.node.addEventListener("mouseup", () => {
                if ( this.overlay.node.getAttribute("mouseDowned") === "true" ) { this.Discard(); };
            });

            this.node.addEventListener("mousedown", event => {
                event.stopPropagation();
            })
            this.node.addEventListener("mouseup", () => {
                this.overlay.node.setAttribute("mouseDowned", "false");
            })

        }

        // ====================
        // Register modal box to the modal box manager
        if ( this.modal ) {

            // if it's the first and only modal box ...
            if ( window.ModalBoxes == null || window.ModalBoxes.length <= 0 ) {

                // ... the subscribers list for all present modal boxes gets initiated, ...
                window.ModalBoxes = [];

                // ... the keydown handling for all present modal boxes is brougth to life ...
                window.addEventListener("keydown", HandleKeyDownForModalBoxes);

            }
            
            // add the box to the subscribers list for all present modal boxes
            window.ModalBoxes.push(this);

        }

    }






    Discard() {

        // stop maintaining box position
        try {
            window.removeEventListener("resize", window.BoxPositionKeepers[this.id], false);
            window.removeEventListener("scroll", window.BoxPositionKeepers[this.id], false);
            delete window.BoxPositionKeepers[this.id];
        } catch {}

        // Deregister box from the modal box manager
        if ( this.modal ) {

            // iterate throu all living modal boxes (from the youngest backwards) ...
            let index = window.ModalBoxes.length;
            for ( let box of window.ModalBoxes.slice().reverse() ) {

                index -= 1;
                // ... and if the chosen you is found ...
                if ( this == box ) {

                    // ... remove it from the modal boxes list ...
                    window.ModalBoxes.splice( index, 1 );

                    // ... and if there is no other living modal box left, then ...
                    if ( window.ModalBoxes.length <= 0 ) {

                        //  ... kill the Handler ...
                        window.removeEventListener("keydown", HandleKeyDownForModalBoxes);

                    }
                    break;

                }

            }
        }

        
        if ( this.CallbackOnDiscard && typeof this.CallbackOnDiscard === "function" ) {
            this.CallbackOnDiscard();
        }

        // modal boxes are removed indirectly by removing the containing overlay
        if ( this.modal ) { this.overlay.Discard(); }
        // unmodal boxes are removed directly
        else { this.node.remove(); }

    }






    async Fill({
        title_text,        // String; text in header (dialogue title)
        title_icon,        // String; name of material icon in header (dialogue title)
        title_text_color,        // custom text color for header
        title_background_color,  // custom background color for header
        content,           // html of the box content (excl. header and button bar)
        values,
        buttons,
        put_focus_on_element_with_id,   // String; id of element that shall be focused
        build_buttonbar = true,   // add buttons as a button bar on the bottom of the box
        container_style,          // custom style for container (wrapping content and buttonbar)
        smooth_resize = false     // smooth resize let's the box visually grow to it's needed size (not working for well in every context)
    }) {

        // ====================
        // Validate args and set defaults
        if ( title_text_color == null ) { title_text_color = "var(--ddui_page_text_emphasized)"; } // default
        if ( buttons == null ) { buttons = [{ label: "OK", closeOnClick: true },] } // default (OK-Button)
        if ( buttons.length <= 0 ) { build_buttonbar = false } // if there's no button, no buttonbar is needed
        if ( container_style == null ) { container_style = "padding: 12px;" } // default
        
        // ====================
        // build the header with icon, text and custom backround color
        let header = "";
        if ( title_text || title_icon ) {
            header = `<div class="ddui_Box_header" style="color: ${title_text_color};${ (title_background_color) ? ` background-color: ${title_background_color};` : "" }">` +
                         `${ (title_icon) ? `<span class="material-icons ddui_Box_header_icon" style="margin-top: 3px;">${title_icon}</span>` : "" }` +
                         `${ (title_text) ? `<span class="ddui_Box_header_text">${title_text}</span>` : "" }` +
                      `</div>`;
        }

        // ====================
        // build the buttonbar
        let buttonbar = "";
        if ( build_buttonbar ) {
            let button_id;
            buttonbar += `<div class="ddui_buttonbar">`
            let button_class;
            for ( let button of buttons ) {
                // button
                if ( button["id"] ) {} else {
                    button_id = "ddui_button_" + ddui.GenerateUuid();
                    button["id"] = button_id;                
                }
                if ( build_buttonbar ) {
                    button_class = `ddui_button${ ( button["style"] ) ? " ddui_button_" + button["style"] : "" }`;
                    if ( button.default === true ) { button_class += " ddui_button_default"; }
                    buttonbar += `<div id="${button_id}" class="${button_class}" name="ddui_button" tabindex="0"><div class="ddui_button_label">${button["label"]}</div></div>`;
                }
            }
            buttonbar += `</div>`;
        }

        // ====================
        // assemble header, content and buttonbar together
        const box_content = `<div id="${this.id + "_inner"}" class="ddui_Box_inner">` +
                                `${header}` +
                                `<div class="ddui_Box_container"${ (container_style) ? `style="${container_style}"` : "" }>` +
                                    content +
                                    buttonbar +
                                `</div>` +
                            `</div>`;

        // ====================
        // Fill the box with the content

        function InsertValues(values) {
            // Insert values to the box controls
            let node;
            if ( ( values != null ) && ( values.length > 0 ) ) {
                for ( let value of values ) {
                    node = document.getElementById(value["node_id"]);
                    node.value = value["value"];
                }
            }            
        }

        if ( smooth_resize ) {

            // Measure box size with the old content
            const box_width_before = this.node.getBoundingClientRect().width;
            const box_height_before = this.node.getBoundingClientRect().height;

            // Set transition effect for smooth resize
            this.node.style.transition = "width 0.2s, height 0.2s";

            // Set box size to initial size
            this.node.style.width = String(box_width_before) + "px";
            this.node.style.height = String(box_height_before) + "px";

            // Clear box content
            this.node.innerHTML = "";

            // Create a phantom box (in the background), filled with the new content
            const phantom_box = document.createElement("div");
            phantom_box.classList.add("ddui_box");
            phantom_box.innerHTML = box_content;
            phantom_box.style.position = "fixed";
            phantom_box.style.zIndex = -1;
            document.body.append(phantom_box);

            // Measure phantom box size with the new content
            const box_width_after = phantom_box.getBoundingClientRect().width;
            const box_height_after = phantom_box.getBoundingClientRect().height;

            // Discard phantom box
            phantom_box.remove();

            // Set box size to new size (like measured from the phantom box)
            this.node.style.width = String(box_width_after) + "px";
            this.node.style.height = String(box_height_after) + "px";

            // Wait for the resize transition effect
            await new Promise(res => setTimeout(res, 200));

            this.node.innerHTML = box_content;
            this.node.style.width = null;
            this.node.style.height = null;
            InsertValues(values);

            // Place a white box above the content for a blend effect
            const blend_box = document.createElement("div");
            blend_box.style.position = "fixed";
            blend_box.style.width = String(box_width_after) + "px";
            blend_box.style.height = String(box_height_after) + "px";
            blend_box.style.backgroundColor = "var(--ddui_page_background)";
            blend_box.style.transition = "background-color 0.1s";
            const blend_box_id = "ddui_blend_box_" + ddui.GenerateUuid();
            blend_box.id = blend_box_id;
            this.node.prepend(blend_box);

            // Little waiting cause otherwise it would be to fast and the blend wouldn't work
            await ddui.WaitForDom(blend_box_id, "does_exist");

            // Do the blending (by changing the color to completly transparent)
            blend_box.style.backgroundColor = null;

            // Wait for the blend effect
            await new Promise(res => setTimeout(res, 100));

            // Discard the blend box
            blend_box.remove();            

        } else {
            this.node.innerHTML = box_content;
            InsertValues(values);
        }

        // set focus
        if ( put_focus_on_element_with_id ) {
            const focused_element = document.getElementById(put_focus_on_element_with_id);
            focused_element.focus();
            focused_element.select();
        } else {
            ddui.ResetFocus();
        }

        // Trigger the window resize event, as this calls the handler for maintaining the box position
        window.dispatchEvent(new Event('resize'));

        // ====================
        // Add event listeners to buttons
        if ( buttons.length >= 1 ) {

            for ( let button of buttons ) {

                // the default button gets saved as a box property (so that it can be executed with the enter key)
                if ( button.default === true ) {
                    this.default_button = document.getElementById(button.id);
                }

                // set default value for closeOnClick => true
                if ( button.closeOnClick != false ) { button.closeOnClick = true }

                // if the button shall have a click action ...
                if ( button.onClick || button.closeOnClick ) {

                    const button_click_handler = async event => {

                        event.stopPropagation();
                        
                        if ( button.onClick ) {

                            async function DoClickAction(box) {

                                box.Lock();

                                const button_content_before = button.node.innerHTML;
                                const button_width_before = button.node.style.width;
                                const button_height_before = button.node.style.height;
    
                                const button_width = button.node.getBoundingClientRect().width;
                                const button_height = button.node.getBoundingClientRect().height;
                                button.node.style.width = String(button_width) + "px";
                                button.node.style.height = String(button_height) + "px";
                                button.node.innerHTML = ddui.GetSpinner("white", Math.min(button_width, button_height), 5);
    
                                // actual function
                                await button.onClick();
    
                                button.node.style.width = button_width_before;
                                button.node.style.height = button_height_before;
                                button.node.innerHTML = button_content_before;
    
                                box.Unlock();

                            }

                            // if "await_action", the box gets discarded AFTER the action has passed, not before
                            if ( button.await_action ) {
                                await DoClickAction(this);
                            } else {
                                DoClickAction(this);
                            }

                        }

                        if ( button.closeOnClick ) { this.Discard(); }

                    }
                    
                    // ... add the desired event listener to it
                    button.node = document.getElementById(button.id);
                    button.node.addEventListener("click", event => { button_click_handler(event); });
                    // also on Enter when focused
                    button.node.addEventListener("keydown", event => {
                        if ( event.key === "Enter" ) {
                            button_click_handler(event);
                            ddui.ResetFocus();
                        }
                    })
                }
            }

        }

    }

    Lock() {
        // Locking is done by putting an overlay over the inner of the box
        this.lock_overlay = new ddui.Overlay("shiny_themed", this.id + "_inner");
    }

    Unlock() {
        try {
            // If the box is locked (if there is a locking overlay over the inner of the box), unlock id by discarding the locking overlay
            this.lock_overlay.Discard();
            this.lock_overlay = null;
        } catch {}
    }

    UpdateLoadingBoxInfoText(info_text) {
        try {
            const info_text_node = document.getElementById(this.LoadingBox_info_text_id);
            if ( ! (info_text == null) && info_text != "" ) {
                info_text_node.innerHTML = info_text;
                info_text_node.classList.add("ddui_LoadingBox_info_text");
            } else {
                info_text_node.innerHTML = "";
                info_text_node.classList.remove("ddui_LoadingBox_info_text");
            }
        } catch (err) {
            ddui.Log("Updating LoadingBox info text failed. Details: " + String(typeof(err)) + " --- " + err, __file__, "ERR");
        }
    }






}






function SetBoxPosition({ box_id, align_mode, anchor_node }) {

    // if a anchor_node is given, change the default align_mode to "positioned"
    if ( ( ! anchor_node == undefined && align_mode == null ) ) { align_mode = "positioned" };

    // define BoxPositionKeepers as a list (to support position keeping for multiple boxes)
    if ( window.BoxPositionKeepers == undefined ) { window.BoxPositionKeepers = [] };

    // save position keeper for the given box
    window.BoxPositionKeepers[box_id] = MaintainBoxPosition.bind(null, { box_id: box_id, align_mode: align_mode, anchor_node: anchor_node });

    // execute position keeper once (to set the initial position)
    window.BoxPositionKeepers[box_id]();

    // bind the position keeper to the window resize event
    window.addEventListener('resize', window.BoxPositionKeepers[box_id], false);
    window.addEventListener('scroll', window.BoxPositionKeepers[box_id], false);

}






function MaintainBoxPosition({ box_id, align_mode, anchor_node }) {

    const box = document.getElementById(box_id);

    // rules for positioning the box:
    // ''''''''''''''''''''''''''''''
    //
    // over the anchor node
    //   aligned left at left border
    //   aligned right at right border 
    //   aligned center of the window
    //
    // under the anchor node
    //   aligned left at left border
    //   aligned right at right border 
    //   aligned center of the window
    //
    // right of the anchor node
    //   starting from the window bottom upwards
    //   (but never top < 0)
    //
    // left of the anchor node
    //   starting from the window bottom upwards
    //   (but never top < 0)
    //
    // position of last resort: center of window and from the bottom upwards (but never top < 0)

    // measure the size of the box
    const box_width = box.getBoundingClientRect().width;
    const box_height = box.getBoundingClientRect().height;

    // get the visible page dimensions
    const client_width = document.documentElement.clientWidth;
    const client_height = document.documentElement.clientHeight;

    if ( align_mode == "positioned" ) {

        // measure the position and size of the anchor node
        const anchor_node_rect = anchor_node.getBoundingClientRect();

        // setting vertical align if the box fits over or under the anchor node
        let box_fits_over_or_under_the_anchor_node = false;
        if ( box_height <= ( client_height - anchor_node_rect.bottom ) ) {

            // box fits under the anchor node
            box.style.top = String(anchor_node_rect.bottom) + "px";
            box.style.bottom = null;
            box_fits_over_or_under_the_anchor_node = true;

        } else if ( box_height <= anchor_node_rect.top ) {

            // box fits over the anchor node
            box.style.top = String(anchor_node_rect.top - box_height) + "px";
            box.style.bottom = null;
            box_fits_over_or_under_the_anchor_node = true;
        }

        // setting horizontal align if the box fits over or under the anchor node
        if ( box_fits_over_or_under_the_anchor_node ) {
            // aligned left with left border of the anchor node
            if ( box_width <= ( client_width - anchor_node_rect.left ) ) {
                box.style.left = String(anchor_node_rect.left) + "px";
                box.style.right = null;
            // aligned right with right border of the anchor node
            } else if ( box_width <= anchor_node_rect.right ) {
                box.style.right = String(client_width - anchor_node_rect.right) + "px";
                box.style.left = null;
            // alignment of last resort: center of window
            } else {
                box.style.left = String( Math.floor( ( client_width - box_width ) / 2 ) ) + "px";
                box.style.right = null;
            }
        } else {

            // setting position if the box DOES NOT FIT over or under the anchor node

            // setting horizontal align if the box fits right of the anchor node
            if ( box_width <= ( client_width - anchor_node_rect.right ) ) {
                box.style.left = String( anchor_node_rect.right ) + "px";
                box.style.right = null;
            // setting horizontal align if the box fits left of the anchor node
            } else if ( box_width <= ( anchor_node_rect.left ) ) {
                box.style.left = String( anchor_node_rect.left - box_width ) + "px";
                box.style.right = null;
            // setting horizontal align if the box DOES NOT FIT left or right of the anchor node
            } else {
                box.style.left = String( Math.floor( ( client_width - box_width ) / 2 ) ) + "px";
                box.style.right = null;
            }

            // setting vertical align if the box DOES NOT FIT over or under the anchor node

            // set vertical align to "from bottom up" (if the box height fits inside the page height)
            if (box_height <= client_height ) {
                box.style.bottom = "0px";
                box.style.top = null;
            // set vertical align to top = 0px (if the box height DOES NOT FIT inside the page height)
            } else {
                box.style.top = "0px";
                box.style.bottom = null;
            }

        }
    } else if ( align_mode == "centered" ) {

        box.style.left = String(Math.floor( ( client_width - box_width ) / 2 )) + "px";
        box.style.top = String(Math.floor( ( client_height - box_height ) / 2 )) + "px";

    } else if ( align_mode == "centered_top" ) {

        box.style.left = String(Math.floor( ( client_width - box_width ) / 2 )) + "px";
        box.style.top = String(15) + "px";

    } else if ( align_mode == "centered_bottom" ) {

        box.style.left = String(Math.floor( ( client_width - box_width ) / 2 )) + "px";
        box.style.bottom = "15px";

    }

}






// Event handler for key down events in modal boxes (escape, tab, enter)
function HandleKeyDownForModalBoxes(event) {

    async function KeepFocusInsideBox(event) {

        // the element that is about to be left
        const left_element = event.currentTarget;

        // we here have a promise, that says that the focused element will be different from the left element
        const move_focus = new Promise(async resolve => {
            do { await new Promise(r => setTimeout(r, 1)); }
            while ( (( document.activeElement === left_element ) || ( document.activeElement.tagName === "BODY" )) )
            resolve(true);
        });

        // when the promise is settled, we know, if the focus really has changed
        const has_focus_shifted = await move_focus;

        // if so, ...
        if ( has_focus_shifted === true ) {

            // we check, if the newly focused element is inside the box
            const top_most_box = window.ModalBoxes[window.ModalBoxes.length - 1];
            if ( !top_most_box.node.contains(document.activeElement) ) {

                // if not, the tabbing starts again as if the box was newly opened
                ddui.ResetFocus();

            }
        }  
    }



    // if Escape is pressed ...
    if (event.key === 'Escape') {

        // ... fetch the top most box (the box on top of all the others) ...
        const top_most_box = window.ModalBoxes[window.ModalBoxes.length - 1];
        // ... and discard it, if exiting is allowed.
        if ( top_most_box.allow_exit ) { top_most_box.Discard(); }



    // This block takes care, that by pressing "Tab" the focus doesn't get outside of the box (behind the box)
    // if Tab is pressed ...
    } else if (event.key === 'Tab') {

        // ... and if the focused element is not the body (which - not understandably - seems to happen sometimes) ...
        if ( document.activeElement.tagName != "BODY" ) {
            // ... the focused element shall - as it is now beeing left - keep the focus inside the box (handler will kill itsself after first run)
            document.activeElement.addEventListener("focusout", event => KeepFocusInsideBox(event), {once: true});
        }



    } else if (event.key === 'Enter') {

        event.stopPropagation();

        // ... fetch the top most box (the box on top of all the others) ...
        const top_most_box = window.ModalBoxes[window.ModalBoxes.length - 1];
        // ... and dispatch the click event of the default button, if there is one
        if ( top_most_box.default_button ) { top_most_box.default_button.dispatchEvent(new Event("click")); }

    }

}