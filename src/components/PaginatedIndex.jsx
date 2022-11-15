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
  const [isEmpty, setIsEmpty] = useState(null);

  const updateState = (q) => {
    const unsub = onSnapshot(q, (snapshot) => {
      const isSnapshotEmpty = snapshot.size === 0;
      setIsEmpty(isSnapshotEmpty);
      // console.log("is Empty: ", isSnapshotEmpty);
      // console.log("Size: ", snapshot.size);
      try {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        console.log("Results", results);
        if (!posts) {
          setPosts(results);
        } else {
          setPosts((posts) => [...posts, ...results]);
        }

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setLastDoc(lastDoc);
        setIsPending(false);
      } catch (error) {
        console.log("useQuery Get Data Error", error.message);
        setError(error.message);
      }
    });
    return unsub;
  };

  useEffect(() => {
    setIsPending(true);

    const q = query(ref, orderBy("createdAt", "desc"), limit(3));
    const unsub = updateState(q);
    return () => unsub();
  }, []);

  const fetchMore = () => {
    // QUERIES
    const q = query(
      ref,
      orderBy("createdAt", "desc"),
      limit(3),
      startAfter(lastDoc)
    );
    updateState(q);
  };

  return (
    <>
      {isPending && (
        <div className="d-flex justify-content-center my-3">
          <Spinner
            className="mx-auto"
            animation="border"
            variant="nimat-color"
          />
        </div>
      )}
      <ListGroup variant="flush">
        {posts &&
          posts.map((post) => {
            const currentDate = new Date(Date.now() + post.createdAt.seconds);
            // const currentDayOfMonth = currentDate.getDate();
            // const currentMonth = currentDate.getMonth("M"); // Be careful! January is 0, not 1
            // const currentYear = currentDate.getFullYear();

            // const dateString =
            //   currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
            // // "27-11-2020"
            // console.log("Date", dateString);
            return (
              <React.Fragment key={post.id}>
                <Row className="mb-2">
                  <Col sm={12}>
                    <ListGroup.Item className="d-flex justify-content-around">
                      <span className="badge rounded-pill bg-dark p-3">
                        {post.title}
                      </span>
                      <span className="badge rounded-pill bg-success p-3">
                        {/* {createDate.toUTCString()} */}
                        {currentDate.toString()}
                        {/* {post.createdAt.seconds} */}
                      </span>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
      </ListGroup>
      {!isEmpty && (
        <div className="d-flex justify-content-center">
          <button onClick={fetchMore} className="btn btn-nihad-color">
            Load More
          </button>
        </div>
      )}
    </>
  );
}
