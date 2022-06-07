import React from 'react';
import AlbumBlock from "./AlbumBlock";
import {albumButtonType, AlbumType} from "../scripts/Types";

/**
 * Maximum number of album components in a row
 * @type {number}
 */
const albums_in_body = 4

function Content(props: {albums: AlbumType[], albumButtonType: albumButtonType }) {
    return (
        <main className="main">
            <div className="music-header">
                <div className="music-info">
                    <a href="index.html" className="link music-info__title">New releases</a>
                    <p className="music-info__description">Find something new for yourself</p>
                </div>
                <a className="music-header__see-all-link link" href="index.html">SEE ALL</a>
            </div>
            {
                Array(Math.ceil(props.albums.length / 4)).fill([])
                    .map((_, index) =>
                        <AlbumBlock
                            key={`block${index}`}
                            albumButtonType={props.albumButtonType}
                            albums={props.albums.slice(index * albums_in_body, (index + 1) * albums_in_body)}/>
                    )
            }
        </main>
    );
}

export default Content;
