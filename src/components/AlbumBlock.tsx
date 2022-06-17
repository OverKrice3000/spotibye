import React from 'react';
import Album from "./Album";
import {albumButtonType, AlbumType} from "../scripts/Types";


function AlbumBlock(props: { albums: AlbumType[], albumButtonType: albumButtonType }) {
    return (
        <div className={"music-body"}>
            {
                props.albums.map((album: AlbumType, index: number) => <Album key={`album${index}`}
                                                                             albumButtonType={props.albumButtonType}
                                                                             album={props.albums[index]}/>)
            }
        </div>
    );
}

export default AlbumBlock;
