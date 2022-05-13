
import {update_access_token} from "./auth/auth.js";
import {add_albums_on_front_page} from "./album/album_funcs.js";
import {get_new_releases, are_albums_saved} from "./album/album_api.js";
import {album_component_main_information_builder, album_component_save_button_builder} from "./album/album_component_builders.js";

/**
 * This function loads index page
 */
async function load_index(){
    await update_access_token()
    let my_json = await get_new_releases(0, 20)
    let my_albums = my_json.albums.items
    let albums_saved_bool = await are_albums_saved(my_albums)
    for(let i = 0; i < my_albums.length; i++){
        my_albums[i].saved_in_user_library = albums_saved_bool[i]
    }
    add_albums_on_front_page(my_albums, [
        album_component_main_information_builder,
        album_component_save_button_builder
    ])
}

load_index()
