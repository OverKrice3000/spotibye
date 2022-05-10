import * as auth from "./auth/auth.js"
import * as album_funcs from "./album/album_funcs.js"
import * as album_api from "./album/album_api.js"
import * as album_component_builder from "./album/album_component_builders.js"

/**
 * This function loads library page
 */
async function load_library(){
    await auth.update_access_token()
    let my_json = await album_api.get_saved_albums(0, 20)
    album_funcs.add_albums_on_front_page(album_funcs.preprocess_saved_albums_received(my_json.items),
        [
            album_component_builder.album_component_main_information_builder,
            album_component_builder.album_component_remove_button_builder
        ])
}

load_library()
