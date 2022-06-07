import React from 'react';
import SaveAlbumButton from "./SaveAlbumButton";
import RemoveAlbumButton from "./RemoveAlbumButton";
import {albumButtonType, AlbumType} from "../scripts/Types";

/**
 * This function builds album description string
 * @param album an album information, from which string is built
 * @returns {string} an album description string
 */
function create_album_desc_string(album : AlbumType){
    let desc = ""
    for(let i = 0; i < album.artists.length; i++){
        desc += album.artists[i].name
        if(i !== album.artists.length - 1)
            desc += ", "
    }
    return desc
}

function Album(props: {album: AlbumType, albumButtonType: albumButtonType }) {
    return (
        <div className="music-set">
            <img src={props.album.images[0].url} alt={"Album cover"} className={"music-set__image"} />
            <h2 className={"music-set__name"} dangerouslySetInnerHTML={{__html: props.album.name}}/>
            <p className={"music-set__description"} dangerouslySetInnerHTML={{__html: create_album_desc_string(props.album)}}/>
            {
                (props.albumButtonType === "Save") ?
                <SaveAlbumButton id={props.album.id} saved={props.album.saved} /> :
                <RemoveAlbumButton id={props.album.id} removed={false} />
            }
        </div>
    );
}

export default Album;
