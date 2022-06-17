import React from 'react';
import {are_albums_saved, get_new_releases, get_saved_albums} from "../scripts/album/album_api";
import {albumButtonType, AlbumType} from "../scripts/Types";

function Aside(props : {
    contentCallback: (albums: AlbumType[]) => void,
    albumButtonTypeCallback: (type: albumButtonType) => void
}) {

    return (
        <aside className="aside">
            <div className="aside__fixed-block">
                <a href="#" title="Spotibye" className="logo link link_with-icon">
                    <img src="../icons/logo.png" width="25" height="25" alt="Logo"/>
                    <h1 className="logo__text">Spotibye</h1>
                </a>
                <div className="aside-nav">
                    <nav className="aside-nav__top-nav">
                        <a href="#" title="Home" className="aside-nav-link link link_with-icon" onClick={(e) => {
                            get_new_releases(0, 20).then(
                                (albums) => are_albums_saved(albums.albums.items)
                                    .then((albums_saved) => props.contentCallback(
                                        albums.albums.items.map((album: AlbumType, index: number) => Object.assign(album, {saved: albums_saved[index]}))
                                    ))
                                    .then(() => props.albumButtonTypeCallback("Save"))
                            )
                        }}>
                            <img src="../icons/home.png" width="20" height="20" alt="Home"/>
                            <h1 className="aside-nav-link__text">Home</h1>
                        </a>
                        <a href="#" title="Search" className="aside-nav-link link link_with-icon">
                            <img src="../icons/search.png" width="20" height="20" alt="Search"/>
                            <h1 className="aside-nav-link__text">Search</h1>
                        </a>
                        <a href="#" title="Your Library" className="aside-nav-link link link_with-icon" onClick={(e) => {
                            get_saved_albums(0, 20).then((albums) => props.contentCallback(albums.items.map((val: { album: AlbumType; }) => val.album)))
                                .then(() => props.albumButtonTypeCallback("Remove"))
                        }}>
                            <img src="icons/library.png" width="20" height="20" alt="Library"/>
                            <h1 className="aside-nav-link__text">Your Library</h1>
                        </a>
                    </nav>
                    <nav className="aside-nav__bottom-nav">
                        <a href="#" title="Create playlist" className="aside-nav-link link link_with-icon">
                            <img src="icons/create_playlist.png" width="20" height="20" alt="Create playlist"/>
                            <h1 className="aside-nav-link__text">Create playlist</h1>
                        </a>
                        <a href="#" title="Liked songs" className="aside-nav-link link link_with-icon">
                            <img src="icons/liked_songs.png" width="20" height="20" alt="Liked songs"/>
                            <h1 className="aside-nav-link__text">Liked songs</h1>
                        </a>
                    </nav>
                </div>
            </div>
        </aside>
    );
}

export default Aside;
