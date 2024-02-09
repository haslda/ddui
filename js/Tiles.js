





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






// Scheme for the tiles arg:
// [
//     {
//         label: "Click me",
//         image: {
//             type: "html",
//             data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
//             size: null    // this is only needed for the type "material_icon"
//         },
//         onClick: () => MyFunc(),
//         corner_button: {
//             image: {
//                 type: "html",
//                 data: `<svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="var(--ddui_page_text)"><path d="M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z" fill="var(--ddui_page_text)" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="var(--ddui_page_text)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
//             },
//             onClick: () => MyFunc2()
//         }
//     }
//     ...
// ]
//
export class Tiles {

    constructor(
        container_id,
        tiles,
        tile_width,
        tile_height,
        tile_padding,
        tiles_align,
        tiles_gap
    ) {

        if ( tiles_align == null ) { tiles_align = "left" }
        if ( tiles_gap == null ) { tiles_gap = "20px" }
        
        this.id = "ddui_Tiles_" + ddui.GenerateUuid();
        this.container_id = container_id;

        // create Tiles in dom
        const tiles_container = document.getElementById(container_id);
        tiles_container.innerHTML = `<div id="${this.id}"></div>`

        // fetch Tiles node object
        this.node = document.getElementById(this.id);
        this.node.classList.add("ddui_Tiles");

        // define the gap between the tiles
        this.node.style.justifyContent = tiles_align;
        this.node.style.gap = tiles_gap;

        // insert all tiles
        let new_tile;
        this.tiles = [];
        for ( let tile of tiles ) {
            new_tile = new Tile(
                null,
                tile.label,
                tile.image,
                tile.onClick,
                tile.corner_button,                
                tile_width,
                tile_height,
                tile_padding,
                tile.tooltip);
            this.tiles.push(new_tile);
            this.node.append(new_tile.node);
        }

    }

}






export class Tile {

    constructor(
        container_id,
        label,
        image,        
        onClick,
        corner_button,
        width = "100px",
        height = "120px",
        padding = "10px",
        tooltip
    ) {

        if ( width == null ) { width = "100px" }
        if ( height == null ) { height = "120px" }
        if ( padding == null ) { padding = "10px" }
        
        this.id = "ddui_Tile_" + ddui.GenerateUuid();

        if ( label ) { this.label = label }

        if ( container_id ) {
            // create Tile in dom
            const tile_container = document.getElementById(container_id);
            tile_container.innerHTML = `<div id="${this.id}"></div>`
            this.node = document.getElementById(this.id);
        } else {
            this.node = document.createElement("div");
            this.node.id = this.id;
        }
        
        this.node.classList.add("ddui_Tile");
        this.node.setAttribute("tabindex", "0");
        this.node.style.width = width;
        this.node.style.height = height;
        this.node.style.padding = padding;

        let image_html;
        
        if ( image ) {

            image_html = `<div class="ddui_Tile_image">`;

            switch (image.type) {

                // material icon
                case "material_icon":
                    image_html += `<span class="material-icons"${ (image.size) ? `style="font-size: ${image.size}"` : "" }>${image.data}</span>`;
                    break;

                // html (e.g. an img or svg element)
                default:
                    image_html += image.data;

            }

            image_html += `</div>`;

        } else {
            image_html = "";
        }

        let label_html = "";

        if ( label ) {

            label_html = `<div id="${this.id + "_label"}" class="ddui_Tile_label">${label}</div>`;

            // if there are a label AND an image given, there shall be a little space in between them
            if ( image ) {
                image_html += `<div style="height: 10px;"></div>`;
            }
        }

        const tile_content = image_html + label_html;

        this.node.innerHTML = tile_content;

        if ( tooltip ) {
            this.node.setAttribute("ddui_tooltip", tooltip);
        } else if ( label ) {
            this.AddExceedingLabelTooltip(label);
        }

        if ( onClick ) {
            this.node.addEventListener("click", event => {
                event.stopPropagation();
                onClick(event);
                ddui.ResetFocus();
            });
            this.node.addEventListener("keydown", event => {
                if ( event.key === "Enter" ) {
                    event.stopPropagation();
                    onClick(event);
                }
            });

        }

        if ( corner_button ) {

            this.corner_button_node = document.createElement("div");
            this.corner_button_node.id = this.id + "_corner_button";
            this.corner_button_node.classList.add("ddui_Tile_corner_button");
            this.corner_button_node.style.width = ( corner_button.width ) ? corner_button.width : "32px";
            this.corner_button_node.style.height = ( corner_button.height ) ? corner_button.height : "32px";
            this.corner_button_node.style.padding = ( corner_button.padding ) ? corner_button.padding : "4px";
            this.corner_button_node.style.display = "none";
            this.corner_button_node.innerHTML = corner_button.image.data;
            this.corner_button_node.addEventListener("click", event => {
                corner_button.onClick();
                event.stopPropagation();
            });
            this.node.append(this.corner_button_node);

            this.node.addEventListener("mouseenter", this.HoverOff.bind(this));
            this.node.addEventListener("mouseleave", this.HoverOn.bind(this));

            if ( corner_button.tooltip ) {
                // ddui.Tooltip(this.corner_button_node, corner_button.tooltip);
                this.corner_button_node.setAttribute("ddui_tooltip", corner_button.tooltip);
            }

        }

    }

    async AddExceedingLabelTooltip(label) {
        await ddui.WaitForDom(this.id + "_label");
        const label_container = document.getElementById(this.id + "_label");
        const text_width = await ddui.MeasureTextWidth(label, label_container);
        const label_container_width = label_container.getBoundingClientRect().width; 
        if ( text_width > label_container_width ) {
            // ddui.Tooltip(this.node, label);
            this.node.setAttribute("ddui_tooltip", label);
        }
    }

    HoverOn() {
        this.corner_button_node.style.display = "none";
    }

    HoverOff() {
        this.corner_button_node.style.display = null;
    }

}