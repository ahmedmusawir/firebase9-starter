import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useRealtimeData = (collectionName) => {
  const [docs, setDocs] = useState(null);
  const [isPending, setIsPending] = useState(null);

  useEffect(() => {
    let ref = collection(db, collectionName);

    setIsPending(true);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setDocs(results);

      setIsPending(false);
    });

    return () => unsub();
  }, [collectionName]);

  return { docs, isPending };
};
