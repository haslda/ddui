





// local modules
import * as ddui from "../ddui.js";

// initializing constants
const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class LoadingBox {

    constructor(info_text, duration_in_ms) {

        // ====================
        // Create a modal box
        this.Box = new ddui.Box({
            loading_text: info_text,
            allow_exit: false
        });

        // if a duration is given, the loading box shall discard itself after the given amount of ms
        if (duration_in_ms) {
            if ( !isNaN(duration_in_ms) ) {
                this.Discard(duration_in_ms);
            }
        }

    }

    UpdateInfoText(info_text) {
        this.Box.UpdateLoadingBoxInfoText(info_text);
    }

    async Discard(delay_in_ms) {
        if (delay_in_ms) {
            await new Promise(res => setTimeout(res, delay_in_ms));
        }
        this.Box.Discard();
    }

}