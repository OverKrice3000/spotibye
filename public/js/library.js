import {update_access_token} from "./auth/auth.js";
import {add_albums_on_front_page} from "./album/album_funcs.js";
import {get_saved_albums} from "./album/album_api.js";
import {album_component_main_information_builder, album_component_remove_button_builder} from "./album/album_component_builders.js";


/**
 * This function loads library page
 */
async function load_library(){
    await update_access_token()
    let my_json = await get_saved_albums(0, 20)
    let preprocessed_albums = my_json.items.map((val) => val.album)
    add_albums_on_front_page(preprocessed_albums,
        [
            album_component_main_information_builder,
            album_component_remove_button_builder
        ])
}

load_library()
