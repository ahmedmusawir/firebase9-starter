import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ListGroup, Spinner } from "react-bootstrap";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

// COLLECTION REF
let ref = collection(db, "posts");

export default function PaginatedIndex() {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);

  const getData = () => {
    setIsPending(true);
    // QUERIES
    // const q = query(ref, orderBy("createdAt", "desc"));
    const q = query(ref, orderBy("createdAt", "desc"), limit(3));

    const unsub = onSnapshot(q, (snapshot) => {
      try {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setPosts(results);
        // setPosts((posts) => [...posts, ...results]);
        // console.log("Results:", results);
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        // console.log("Last Doc", snapshot.docs.length);
        setLastDoc(lastDoc);
      } catch (error) {
        console.log("useQuery Get Data Error", error.message);
        setError(error.message);
      }

      setIsPending(false);
    });
    return unsub;
  };

  useEffect(() => {
    const unsub = getData();
    return () => unsub();
  }, []);

  const fetchMore = () => {
    console.log("LoadMore clicked");
    // QUERIES
    const q = query(
      ref,
      orderBy("createdAt", "desc"),
      limit(3),
      startAfter(lastDoc)
    );
    onSnapshot(q, (snapshot) => {
      try {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        // console.log("Last Doc", snapshot.docs.length);
        setLastDoc(lastDoc);
        setPosts((posts) => [...posts, ...results]);
      } catch (error) {
        console.log("useQuery Get Data Error", error.message);
        setError(error.message);
      }

      setIsPending(false);
    });
  };

  return (
    <>
      <ListGroup variant="flush">
        {posts &&
          posts.map((post) => (
            <React.Fragment key={post.id}>
              <Row className="mb-2">
                <Col sm={12}>
                  <ListGroup.Item className="d-flex justify-content-around">
                    <span className="badge rounded-pill bg-dark p-3">
                      {post.title}
                    </span>
                    <span className="badge rounded-pill bg-success p-3">
                      {post.createdAt.seconds}
                    </span>
                  </ListGroup.Item>
                </Col>
              </Row>
            </React.Fragment>
          ))}
      </ListGroup>
      <div className="d-flex justify-content-center">
        <button onClick={fetchMore} className="btn btn-nihad-color">
          Load More
        </button>
      </div>
    </>
  );
}
