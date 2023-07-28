// App.js
import useCustomHooks from "./Hooks/CustomHooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNewForm from "./Components/CreateNewForm";
import DisplayAllResults from "./Components/DisplayAllResults";
import NavBar from "./Components/NavBar";
import LoadingPage from "./Components/LoadingPage";
import { db } from "./FireBase/FireBase";
import { doc, collection, onSnapshot, addDoc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

export default function App() {
  const { albums, setAlbums, loading, setLoading, helper, setHelper } = useCustomHooks();

  const notify = (message) => {
    toast.success(message, {
      theme: "dark"
    });
  };

  const addNewAlbum = async (album) => {
    setLoading(true);
    if (!album.name || album.name.length > 12) {
      return;
    }
    try {
      await addDoc(collection(db, "landingPage"), album);
      notify(`New Album named "${album.name}" is added`);
    } catch (error) {
      console.error("Error adding new album: ", error);
      notify("Error adding new album");
    }
    setLoading(false);
  };

  const openAlbum = async (id, name) => {
    setLoading(true);
    const unsub2 = onSnapshot(collection(db, "landingPage", id, "imageCollection"), (snapShot) => {
      const updatedAlbums = snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setAlbums(updatedAlbums);
    });
    notify(`Album named "${name}" is opened`);
    console.log({ unsub2, id, name });
    setHelper({ unsub2, id, name });
    setLoading(false);
  };

  const homeBtnHandler = async () => {
    setLoading(true);
    helper.unsub2();
    setHelper("");
    try {
      const querySnapshot = await getDocs(collection(db, "landingPage"));
      const homePage = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setAlbums(homePage);
      notify(`You are in Home Page`);
    } catch (error) {
      console.error("Error fetching albums: ", error);
      notify("Error fetching albums");
    }
    setLoading(false);
  };

  const addImageToAlbum = async (image) => {
    setLoading(true);
    if (!image.url) {
      setLoading(false);
      return;
    }
    try {
      await addDoc(collection(db, "landingPage", helper.id, "imageCollection"), image);
      notify(`New Image named "${image.name}" is added to ${helper.name}`);
    } catch (error) {
      console.error("Error adding new image: ", error);
      notify("Error adding new image");
    }
    setLoading(false);
  };

  const startEditing = async (imageId) => {
    try {
      const image = await getDoc(doc(db, "landingPage", helper.id, "imageCollection", imageId));
      notify(`Now, Start editing image named "${image.data().name}"`);
      setHelper({ ...helper, image: { ...image.data(), id: image.id } });
    } catch (error) {
      console.error("Error fetching image for editing: ", error);
      notify("Error fetching image for editing");
    }
  };

  const updateImage = async (updatedImage) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "landingPage", helper.id, "imageCollection", updatedImage.id), { name: updatedImage.name, url: updatedImage.url });
      const { id, unsub2, name } = helper;
      notify(`Image updated successfully`);
      setHelper({ id, unsub2, name });
    } catch (error) {
      console.error("Error updating image: ", error);
      notify("Error updating image");
    }
    setLoading(false);
  };

  const deleteImage = async (imageId) => {
    setLoading(true);
    try {
      const { id, unsub2, name } = helper;
      setHelper({ id, unsub2, name });
      await deleteDoc(doc(db, "landingPage", helper.id, "imageCollection", imageId));
      notify(`Image Deleted Successfully`);
    } catch (error) {
      console.error("Error deleting image: ", error);
      notify("Error deleting image");
    }
    setLoading(false);
  };

  const deleteAlbum = async (albumId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "landingPage", albumId));
      notify(`Album deleted successfully`);
    } catch (error) {
      console.error("Error deleting album: ", error);
      notify("Error deleting album");
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar
        helper={helper}
        homeBtnHandler={homeBtnHandler}
      />
      {loading ? <LoadingPage />
        : <>
          <CreateNewForm
            addNewAlbum={addNewAlbum}
            addImageToAlbum={addImageToAlbum}
            helper={helper}
            updateImage={updateImage}
          />
          <DisplayAllResults
            albums={albums}
            openAlbum={openAlbum}
            addImageToAlbum={addImageToAlbum}
            helper={helper}
            deleteImage={deleteImage}
            startEditing={startEditing}
            deleteAlbum={deleteAlbum}
          />
        </>}
      <ToastContainer autoClose={10000} />
    </>
  );
}
