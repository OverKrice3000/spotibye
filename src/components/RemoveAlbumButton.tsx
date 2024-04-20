import React, {useState} from 'react';
import {remove_album_from_library, save_album_to_library} from "../scripts/album/album_api";

function RemoveAlbumButton(props: {id: string}){
    let [removed, setRemoved] = useState(false)
    return (
        <button disabled={removed} className={"music-set__button"} onClick={(e) => {
            remove_album_from_library(props.id).then(() => setRemoved(true))
        }}>{removed ? "Removed from your library" : "Remove Album"}</button>
    )
}

export default RemoveAlbumButton
