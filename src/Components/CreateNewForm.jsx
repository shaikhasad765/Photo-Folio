// CreateNewForm.jsx
import React, { useEffect, useRef } from "react";
import css from "../CSS/CreateNewForm.module.css";

export default function CreateNewForm(props) {
    const { helper, addNewAlbum, addImageToAlbum, updateImage } = props;

    const albumNameRef = useRef();
    const albumTemplatesRef = useRef();

    useEffect(() => {
        albumNameRef.current.value = helper.image ? helper.image.name : "";
        albumTemplatesRef.current.value = helper.image ? helper.image.url : "";
    }, [helper]);

    function clearInputField() {
        albumNameRef.current.value = "";
        albumTemplatesRef.current.value = "";
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const name = albumNameRef.current.value;
        const url = albumTemplatesRef.current.value;

        helper.image
        ? updateImage({ name, url, id: helper.image.id })
        : !helper
        ? addNewAlbum({ name, url })
        : addImageToAlbum({ name, url });

        clearInputField();
    };

    return (
        <div className={css.newAlbumForm}>
        <form onSubmit={onSubmitHandler}>
            <input
                ref={albumNameRef}
                type="text"
                className={css.albumName}
                maxLength={12}
                placeholder={helper.image ? "New Image Name" : helper ? "Image Name" : "Album Name"}
                required
            />
            <input
                ref={albumTemplatesRef}
                type="url"
                className={css.albumUrl}
                placeholder={
                    helper.image ? "New Image URL" : helper ? "Image Url" : "Album Template URL"
                }
            />
            <button>{helper.image ? "Edit" : "Add"}</button>
        </form>
        </div>
    );
}
