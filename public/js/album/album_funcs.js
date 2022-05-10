/**
 * This file contains utility function that work with albums and album DOM components
 */

/**
 * Maximum number of album components in a row
 * @type {number}
 */
const albums_in_body = 4

/**
 * This function adds multiple album component blocks to main block
 * @param albums a list of albums to be displayed
 * @param album_builder_list a list of builder functions, which build album DOM components
 */
export function add_albums_on_front_page(albums, album_builder_list){
    let main_elem = document.body.getElementsByClassName("main")[0]
    for(let i = 0; i < albums.length; i += albums_in_body){
        let music_body = construct_music_body(albums, i, album_builder_list)
        main_elem.append(music_body)
    }
}

/**
 * This function preprocesses information about albums saved in user's library
 * received from api.
 * Information about albums received from different api endpoints differs
 * and needs to be preprocessed to be used as a function argument
 * @param saved_albums information about albums saved in user's library
 * @returns {*[]} preprocessed list
 */
export function preprocess_saved_albums_received(saved_albums){
    let albums = []
    for(let i = 0; i < saved_albums.length; i++){
        albums[i] = saved_albums[i].album
    }
    return albums;
}

/**
 *
 * @param albums a list of albums to be displayed
 * @param offset an offset in albums list, from which albums in current block would start
 * @param album_builder_list a list of builder functions, which build album DOM components
 * @returns {HTMLDivElement} an album block DOM element
 */
function construct_music_body(albums, offset, album_builder_list){
    let music_body = document.createElement("div")
    music_body.classList.add("music-body")

    for(let i = 0; i < albums_in_body && offset + i < albums.length; i++){
        let music_set = construct_music_set(albums[offset + i], album_builder_list)
        music_body.append(music_set)
    }

    return music_body
}

/**
 * This function constructs album DOM component
 * @param album an album information
 * @param album_builder_list a list of builder functions, which build album DOM components
 * @returns {HTMLDivElement} an album DOM component
 */
function construct_music_set(album, album_builder_list){
    let music_set = document.createElement("div")
    music_set.classList.add("music-set")

    for(let builder of album_builder_list){
        builder(music_set, album)
    }

    return music_set
}

/**
 * This function builds album description string
 * @param album an album information, from which string is built
 * @returns {string} an album description string
 */
export function create_album_desc_string(album){
    let desc = ""
    for(let i = 0; i < album.artists.length; i++){
        desc += album.artists[i].name
        if(i !== album.artists.length - 1)
            desc += ", "
    }
    return desc
}
