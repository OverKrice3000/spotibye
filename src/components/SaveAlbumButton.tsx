import React, {useState} from 'react';
import {save_album_to_library} from "../scripts/album/album_api";

function SaveAlbumButton(props: { id: string, saved: boolean }) {
    let [saved, setSaved] = useState(props.saved)
    return (
        <button disabled={saved} className={"music-set__button"} onClick={(e) => {
            save_album_to_library(props.id).then(() => setSaved(true))
        }}>{saved ? "Saved to your library" : "Save Album"}</button>
    )
}

export default SaveAlbumButton
