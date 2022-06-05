/**
 * This file contains functions, that query external spotify api and return Promise
 */

import {access_token, update_access_token} from "../auth/auth.js";

/**
 * This function queries new releases
 * @param offset an offset, from which albums will be queried
 * @param limit maximum amount of albums, which will be received in response
 * @returns {Promise<Object>} a promise with list of new releases
 */
export async function get_new_releases(offset, limit){
    let new_releases_fetch_query = () => fetch("https://api.spotify.com/v1/browse/new-releases", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        }
    })
    return new_releases_fetch_query().then((response) => {
        if(response.status === 401){
            return update_access_token().then((result) => {
                return new_releases_fetch_query().then(response => response.json(), error => Promise.reject(error))
            }, error => Promise.reject(error))
        }
        else if(response.status === 200)
            return response.json();
        else
            return Promise.reject("failed to query api, unknown error")
    })
}


/**
 * This function saves an album in user's library
 * @param id id of album, which is to be saved
 * @returns {Promise<Response>} A promise, which contains result of the query
 */
export async function save_album_to_library(id){
    let save_albums_fetch_query = () => fetch("https://api.spotify.com/v1/me/albums", {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids : [
                id
            ]
        })
    })
    return save_albums_fetch_query().then((response) => {
        if(response.status === 401)
            return update_access_token().then(() => save_albums_fetch_query(), error => Promise.reject(error))
        else if(response.status === 200)
            return Promise.resolve()
        else
            return Promise.reject("failed to query api, unknown error")
    })
}

/**
 * This function removes album from user's library
 * @param id id of album,  which is to be removed
 * @returns {Promise<Response>} A promise, which contains result of the query
 */
export async function remove_album_from_library(id){
    let remove_album_fetch_query = () => fetch("https://api.spotify.com/v1/me/albums", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ids : [
                id
            ]
        })
    })
    return remove_album_fetch_query().then((response) => {
        if(response.status === 401)
            return update_access_token().then(() => remove_album_fetch_query(), error => Promise.reject(error))
        else if(response.status === 200)
            return Promise.resolve()
        else
            return Promise.reject("failed to query api, unknown error")
    })
}

/**
 * This function queries albums, which are saved in user's library
 * @param offset an offset, from which albums will be queried
 * @param limit maximum amount of albums, which will be received in response
 * @returns {Promise<Object>} a promise with list of saved albums
 */
export async function get_saved_albums(offset, limit){
    let get_saved_albums_fetch_query = () => fetch("https://api.spotify.com/v1/me/albums", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        }
    })
    return get_saved_albums_fetch_query().then((response) => {
        if(response.status === 401)
            return update_access_token().then(() => get_saved_albums_fetch_query().then(response => response.json(), error => Promise.reject(error)), error => Promise.reject(error))
        else if(response.status === 200)
            return response.json()
        else
            return Promise.reject("failed to query api, unknown error")
    })
}

/**
 * This function tells whether albums are saved in user's library or not
 * @param albums A list of albums, for which a query will be made
 * @returns {Promise<Object>} A promise with list of boolean values for each album queried
 */
export async function are_albums_saved(albums){
    let url = "https://api.spotify.com/v1/me/albums/contains?ids="
    for(let i = 0; i < albums.length; i++){
        url += albums[i].id
        if(i !== albums.length - 1)
            url += ","
    }
    let albums_saved_fetch_query = () => fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        }
    })
    return albums_saved_fetch_query().then((response) => {
        if(response.status === 401)
            return update_access_token().then(() => albums_saved_fetch_query().then(response => response.json(), error => Promise.reject(error)), error => Promise.reject(error))
        else if(response.status === 200)
            return response.json()
        else
            return Promise.reject("failed to query api, unknown error")
    })
}
