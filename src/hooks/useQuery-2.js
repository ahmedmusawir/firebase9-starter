import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useQuery = (collectionName, seletedAuthor) => {
  const [docs, setDocs] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // COLLECTION REF
    let ref = collection(db, collectionName);
    // QUERIES
    const q = query(ref, where("author", "!=", seletedAuthor));

    setIsPending(true);

    // const unsub = onSnapshot(ref, (snapshot) => {
    const unsub = onSnapshot(q, (snapshot) => {
      try {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setDocs(results);
      } catch (error) {
        console.log("useQuery Get Data Error", error.message);
        setError(error.message);
      }

      setIsPending(false);
    });

    return () => unsub();
  }, [collectionName]);

  return { docs, isPending, error };
};
