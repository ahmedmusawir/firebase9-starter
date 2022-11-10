import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useRealtimeData = (collectionName) => {
  const [docs, setDocs] = useState(null);
  const [isPending, setIsPending] = useState(null);

  useEffect(() => {
    let ref = collection(db, collectionName);

    setIsPending(true);
    let unsub;

    try {
      unsub = onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setDocs(results);

        setIsPending(false);
      });
    } catch (error) {
      console.log("Data read error in useRealtimeData hook:", error.message);
    }

    return () => unsub();
  }, [collectionName]);

  return { docs, isPending };
};
