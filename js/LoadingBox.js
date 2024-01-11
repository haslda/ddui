





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class LoadingBox {

    constructor(info_text) {

        // ====================
        // Create a modal box
        this.Box = new ddui.Box({
            loading_text: info_text,
            allow_exit: false
        });

    }

    UpdateInfoText(info_text) {
        this.Box.UpdateLoadingBoxInfoText(info_text);
    }

    Discard() {
        this.Box.Discard();
    }

}