// imageComponent.jsx
import React from 'react';
import css from "../CSS/DisplayAllResults.module.css";
import gallery from "../image/gallery.jpg";
import pen from "../image/pen.png";
import bin from "../image/bin.png";

export default function AlbumComponent(props) {
    const { album, helper, openAlbum, deleteImage, startEditing, deleteAlbum } = props;
    const { id, name, url } = album;

    const handlingClickEvent = () => {
        console.log(helper);
        if (helper) {
        return;
        }
        openAlbum(id, name);
    };

    const handleEditing = () => {
        startEditing(id);
    };

    const handleDelete = () => {
        deleteImage(id);
    };

    const handleDeleteAlbum = () => {
        deleteAlbum(id);
    };

    return (
        <div className={css.Container}>
        <div key={id} className={css.imageContainer}>
            <div className={css.inner} onClick={handlingClickEvent}>
            <img className={css.image} src={url || gallery} alt="" />
            <div className={css.imageName}>{name}</div>
            </div>
        </div>
        {helper ? (
            <div className={css.edit}>
            <img src={pen} onClick={handleEditing} alt="" />
            <img src={bin} onClick={handleDelete} alt="" />
            </div>
        ) : (
            <div className={css.edit}>
            <img src={bin} onClick={handleDeleteAlbum} alt="" />
            </div>
        )}
        </div>
    );
}