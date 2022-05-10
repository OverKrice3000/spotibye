
import * as auth from "./auth/auth.js"
import * as album_funcs from "./album/album_funcs.js"
import * as album_api from "./album/album_api.js"
import * as album_component_builder from "./album/album_component_builders.js";

/**
 * This function loads index page
 */
async function load_index(){
    await auth.update_access_token()
    let my_json = await album_api.get_new_releases(0, 20)
    let my_albums = my_json.albums.items
    let are_albums_saved = await album_api.are_albums_saved(my_albums)
    for(let i = 0; i < my_albums.length; i++){
        my_albums[i].saved_in_user_library = are_albums_saved[i]
    }
    album_funcs.add_albums_on_front_page(my_albums, [
        album_component_builder.album_component_main_information_builder,
        album_component_builder.album_component_save_button_builder
    ])
}

load_index()
