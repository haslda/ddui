





// ddui
import * as ddui from "../ddui.js";
// initializing constants
export const __file__ = import.meta.url.slice( import.meta.url.lastIndexOf("/") + 1 );






export class List {

    constructor(container_id) {
        
        this.id = "ddui_List_" + ddui.GenerateUuid();
        this.container_id = container_id;
        this.item_ids = [];
        this.length = 0;

        // create list in dom
        const list_container = document.getElementById(container_id);
        list_container.innerHTML = `<div id="${this.id}"></div>`

        this.node = document.getElementById(this.id);
        this.node.classList.add("ddui_List");

    }

    ShowLoadingSpinner() {
        const spinner = document.createElement("div");
        spinner.innerHTML = ddui.GetSpinner("var(--ddui_primary)");
        spinner.id = `${this.id}_spinner`;
        this.node.prepend(spinner);
    }

    DiscardLoadingSpinner() {
        try { document.getElementById(`${this.id}_spinner`).remove(); }
        catch (err) { console.error(err); }
    }

    AppendItem(item_node) {

        // Add container for item_node (this is the actual item)
        const item = document.createElement("div");
        item.id = "ddui_listitem_" + ddui.GenerateUuid();
        this.node.appendChild(item);
        this.item_ids.push(item.id);

        // Increase list length by 1
        this.length += 1;

        async function AppendWithAnimation(list_node) {

            item.style.height = "0px";
            item.style.transition = "height 0.5s";

            // Measure the width of the list
            const list_width = list_node.getBoundingClientRect().width;
            
            // Create a phantom item (in the background)
            const phantom_item = document.createElement("div");
            phantom_item.style.position = "absolute";
            phantom_item.style.zIndex = -1;
            phantom_item.style.width = list_width;
            const phantom_id = "ddui_phantom_" + ddui.GenerateUuid(); 
            phantom_item.id = phantom_id;
            phantom_item.append(item_node);
            document.body.append(phantom_item);
            await ddui.WaitForDom(phantom_id, "does_exist");

            // Measure phantom item height
            const item_height = phantom_item.getBoundingClientRect().height;

            // Discard phantom box
            phantom_item.remove();
            await ddui.WaitForDom(phantom_id, "does_not_exist");

            // Set item height to new size (like measured from the phantom item)
            item.style.height = String(item_height) + "px";

            // Wait for the resize transition effect
            await new Promise(res => setTimeout(res, 500));

            // Unset the item height
            item.style.height = null;

            item.append(item_node);
        }

        AppendWithAnimation(this.node);

        return item.id;
    }

    async DeleteItem(item_id) {

        try {

            // check if item_id is a number (index of a list item)
            if ( Number.isInteger(item_id) ) {
                
                // check if item_id is out of range
                if ( ( item_id < 0 ) || ( item_id > (this.length - 1) ) ) {
                    throw new Error(`The index "${item_id}" is out of range (0 - ${this.length - 1}).`);

                // if not, fetch the item node id
                } else {
                    item_id = this.item_ids[item_id];
                }

            // if the item_id is not an index, check if it is a valid node id of a list item
            } else if ( ! this.item_ids.includes(item_id) ) {
                throw new Error(`The item_id "${item_id}" is neither an index nor a valid node id of a list item.`);
            }
            
            // fetch the item node
            const item_node = document.getElementById(item_id);

            if ( ! (item_node) ) {
                throw new Error(`A list item with the id "${item_node}" does not exist.\n` +
                    `Please use the node id or the item index (both are possible identifiers).`);
            } else {

                // remove the item's id from the list of item ids
                this.item_ids.splice(this.item_ids.indexOf(item_id), 1);
                this.length -= 1;

                // code block for the visual effect
                const item_node_height = item_node.getBoundingClientRect().height;
                item_node.style.minHeight = 0;
                item_node.style.height = String(item_node_height) + "px";
                item_node.innerHTML = "";
                item_node.style.backgroundColor = "var(--ddui_red_surface)";
                item_node.style.transition = "height 0.5s";
                await new Promise(resolve => setTimeout(resolve, 10));
                item_node.style.height = 0;
                await new Promise(resolve => setTimeout(resolve, 500));
    
                // remove the list item from the dom
                item_node.remove();
                
            }            

        } catch (err) {
            ddui.DisplayError(`Deletion of list item failed.\n${err.message}`);
        }

    }

}