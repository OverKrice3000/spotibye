import React, {useState} from 'react';
import {remove_album_from_library, save_album_to_library} from "../scripts/album/album_api";

function RemoveAlbumButton(props: {id: string, removed: boolean}){
    let [removed, setRemoved] = useState(props.removed)
    return (
        <button disabled={removed} className={"music-set__button"} onClick={(e) => {
            remove_album_from_library(props.id)
            setRemoved(true)
        }}>{removed ? "Removed from your library" : "Remove Album"}</button>
    )
}

export default RemoveAlbumButton
