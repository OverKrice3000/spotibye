/**
 * This file contains builder functions for html album component.
 * These functions take album DOM element and album information as arguments
 * and would apply certain changes to the DOM element
 * These functions build new album components, which will then be added to the page
 */

import {save_album_to_library, remove_album_from_library} from "./album_api.js";
import {create_album_desc_string} from "./album_funcs.js";

/**
 * A builder, which adds main information about album to the component.
 * That information includes album cover, name and list of artists
 * @param music_set album DOM element
 * @param album album information
 */
export function album_component_main_information_builder(music_set, album){
    let music_set_image = document.createElement("img")
    music_set_image.setAttribute("src", `${album.images[0].url}`)
    music_set_image.setAttribute("alt", "Album cover")
    music_set_image.classList.add("music-set__image")

    let music_set_name = document.createElement("h2")
    music_set_name.classList.add("music-set__name")
    music_set_name.textContent = `${album.name}`

    let music_set_desc = document.createElement("p")
    music_set_desc.classList.add("music-set__description")
    music_set_desc.textContent = create_album_desc_string(album)

    music_set.append(music_set_image)
    music_set.append(music_set_name)
    music_set.append(music_set_desc)
}

/**
 * A builder, which adds a button, that saves an album in user's library
 * @param music_set album DOM element
 * @param album album information
 */
export function album_component_save_button_builder(music_set, album){
    let music_set_btn = document.createElement("button")
    music_set_btn.classList.add("music-set__button")
    music_set_btn.textContent = "Save album"
    if(album.saved_in_user_library){
        music_set_btn.disabled = true
        music_set_btn.textContent = "Saved to your library"
    }
    else {
        music_set_btn.addEventListener("click", () => {
            save_album_to_library(album.id)
            music_set_btn.disabled = true
            music_set_btn.textContent = "Saved to your library"
        })
    }
    music_set.append(music_set_btn)
}

/**
 * A builder, which adds a button, that removes an album from user's library
 * @param music_set album DOM element
 * @param album album information
 */
export function album_component_remove_button_builder(music_set, album){
    let music_set_btn = document.createElement("button")
    music_set_btn.classList.add("music-set__button")
    music_set_btn.textContent = "Remove album"
    music_set_btn.addEventListener("click", () => {
        remove_album_from_library(album.id)
        music_set_btn.disabled = true
        music_set_btn.textContent = "Removed"
    })
    music_set.append(music_set_btn)
}
