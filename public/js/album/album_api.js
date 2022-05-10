/**
 * This file contains functions, that query external spotify api and return Promise
 */

import * as auth from "../auth/auth.js";

/**
 * This function queries new releases
 * @param offset an offset, from which albums will be queried
 * @param limit maximum amount of albums, which will be received in response
 * @returns {Promise<any>} a promise with list of new releases
 */
export async function get_new_releases(offset, limit){
    return fetch("https://api.spotify.com/v1/browse/new-releases", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth.access_token}`,
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
}

/**
 * This function saves an album in user's library
 * @param id id of album, which is to be saved
 * @returns {Promise<Response>} A promise, which contains result of the query
 */
export async function save_album_to_library(id){
    return fetch("https://api.spotify.com/v1/me/albums", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${auth.access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids : [
                id
            ]
        })
    })
}

/**
 * This function removes album from user's library
 * @param id id of album,  which is to be removed
 * @returns {Promise<Response>} A promise, which contains result of the query
 */
export async function remove_album_from_library(id){
    return fetch("https://api.spotify.com/v1/me/albums", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${auth.access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids : [
                id
            ]
        })
    })
}

/**
 * This function queries albums, which are saved in user's library
 * @param offset an offset, from which albums will be queried
 * @param limit maximum amount of albums, which will be received in response
 * @returns {Promise<any>} a promise with list of saved albums
 */
export async function get_saved_albums(offset, limit){
    return fetch("https://api.spotify.com/v1/me/albums", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth.access_token}`,
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
}

/**
 * This function tells whether albums are saved in user's library or not
 * @param albums A list of albums, for which a query will be made
 * @returns {Promise<any>} A promise with list of boolean values for each album queried
 */
export async function are_albums_saved(albums){
    let url = "https://api.spotify.com/v1/me/albums/contains?ids="
    for(let i = 0; i < albums.length; i++){
        url += albums[i].id
        if(i !== albums.length - 1)
            url += ","
    }
    return fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth.access_token}`,
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
}
