import React, {useEffect, useState} from 'react';
import Aside from "./components/Aside";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import {are_albums_saved, get_new_releases} from "./scripts/album/album_api";
import {albumButtonType, AlbumType} from "./scripts/Types";


function App() {
    let [albums, setAlbums] = useState<AlbumType[]>([])
    let [albumButtonType, setAlbumButtonType] = useState<albumButtonType>("Save")
    useEffect(() => {
        get_new_releases(0, 20).then(
            (albums) => are_albums_saved(albums.albums.items)
                .then((albums_saved) => setAlbums(albums.albums.items.map((album: AlbumType, index: number) => Object.assign(album, {saved: albums_saved[index]}))))
        )
    }, [])
    return (
        <div className="app">
            <Header/>
            <Aside contentCallback={setAlbums} albumButtonTypeCallback={setAlbumButtonType}/>
            <Content albums={albums} albumButtonType={albumButtonType}/>
            <Footer/>
        </div>
    );
}

export default App;
