import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Content from "./layouts/Content";
import { db } from "../firebase/config";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

function SinglePost({ id }) {
  const [singlePost, setSinglePost] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const ref = doc(db, "posts", id);
    // getDoc(ref).then((doc) => {
    //   setSinglePost(doc.data());
    //   console.log("Single Post", singlePost);
    // });

    setIsPending(true);

    const unsub = onSnapshot(ref, (doc) => {
      setSinglePost(doc.data());
      //   console.log("Single Post", singlePost);
      setIsPending(false); // has to be inside the function. otherwise spinner won't show up
    });

    return () => unsub();
  }, [id]);

  return (
    <>
      {isPending && (
        <Content width="w-100" cssClassNames="h-100 row align-items-center">
          <Spinner className="mx-auto" animation="border" variant="info" />
        </Content>
      )}

      {singlePost && (
        <>
          <h1>{singlePost.title}</h1>
          <h4>Post ID: {id}</h4>
          <p>{singlePost.body}</p>
        </>
      )}
    </>
  );
}

export default SinglePost;
