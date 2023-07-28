import { useEffect, useState } from "react";
import { db } from "../FireBase/FireBase.jsx";
import { collection, onSnapshot } from "firebase/firestore";

export default function useCustomHooks() {

    const [albums, setAlbums] = useState([]);//~ result that you will see {albums list/images list}
    const [loading, setLoading] = useState(false);
    const [helper, setHelper] = useState("");

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(db, "landingPage"), (snapShot) => {
            const updatedAlbums = snapShot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            setAlbums(updatedAlbums)
        })
        setLoading(false);
    }, [])

    return { albums, setAlbums, loading, setLoading, helper, setHelper };
}