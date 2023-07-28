// DisplayAllResults.jsx
import React from 'react';
import css from "../CSS/DisplayAllResults.module.css";
import ImageComponent from "./ImageComponent";

export default function DisplayAllAlbums(props) {
    const { helper, albums, openAlbum, addImageToAlbum, startEditing, deleteImage, deleteAlbum } = props;

    return (
        <div className={css.container}>
            {albums.map((album) => {
                return (
                <ImageComponent
                    key={album.id}
                    helper={helper}
                    album={album}
                    openAlbum={openAlbum}
                    addImageToAlbum={addImageToAlbum}
                    startEditing={startEditing}
                    deleteImage={deleteImage}
                    deleteAlbum={deleteAlbum}
                />
                );
            })}
        </div>
    );
}
