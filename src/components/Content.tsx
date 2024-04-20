import React, {useMemo} from 'react';
import AlbumBlock from "./AlbumBlock";
import {albumButtonType, AlbumType} from "../scripts/Types";

/**
 * Maximum number of album components in a row
 * @type {number}
 */
const albums_in_body = 4

function Content(props: {albums: AlbumType[], albumButtonType: albumButtonType }) {
    const myAlbumBlocks = useMemo(() => {
        let albumBlocks = []
        for (let i = 0; i < Math.ceil(props.albums.length / 4); i++) {
            albumBlocks.push(
                <AlbumBlock
                    key={`block${i}`}
                    albumButtonType={props.albumButtonType}
                    albums={props.albums.slice(i * albums_in_body, (i + 1) * albums_in_body)}/>
            );
        }
        return albumBlocks
    }, [props]);


    return (
        <main className="main">
            <div className="music-header">
                <div className="music-info">
                    <a href="#" className="link music-info__title">New releases</a>
                    <p className="music-info__description">Find something new for yourself</p>
                </div>
                <a className="music-header__see-all-link link" href="#">SEE ALL</a>
            </div>
            {
                myAlbumBlocks
            }
        </main>
    );
}

export default Content;
