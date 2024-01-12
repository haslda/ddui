





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






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
                tile.onClick,
                tile.label,
                tile.image,
                tile_width,
                tile_height,
                tile_padding);
            this.tiles.push(new_tile);
            this.node.append(new_tile.node);
        }

    }

}






export class Tile {

    constructor(
        container_id,
        onClick,
        label,
        image,
        width = "100px",
        height = "120px",
        padding = "10px"
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
            this.node = document.createElement(this.id);
        }
        
        this.node.classList.add("ddui_Tile");
        this.node.style.width = width;
        this.node.style.height = height;
        this.node.style.padding = padding;

        let tile_content;
        if ( image ) {
            tile_content = `<div class="ddui_Tile_image">${image.data}</div>`;
        }
        tile_content += `<div class="ddui_Tile_label">${label}</div>`;

        this.node.innerHTML = tile_content;

        if ( onClick ) {
            this.node.addEventListener("click", onClick);
        }

    }

}