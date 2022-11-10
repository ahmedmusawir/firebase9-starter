import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ListGroup, Spinner } from "react-bootstrap";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRealtimeData } from "../hooks/useRealtimeData";

export default function QueryIndex() {
  const { docs: books } = useRealtimeData("books");

  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  let selectedAuthor = "";

  const getData = (selectedAuthor) => {
    // COLLECTION REF
    let ref = collection(db, "books");
    // QUERIES
    let q;
    if (!selectedAuthor) {
      q = query(ref, where("author", "!=", selectedAuthor));
    } else {
      q = query(ref, where("author", "==", selectedAuthor));
    }

    setIsPending(true);

    const unsub = onSnapshot(q, (snapshot) => {
      try {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setPosts(results);
      } catch (error) {
        console.log("useQuery Get Data Error", error.message);
        setError(error.message);
      }

      setIsPending(false);
    });
    return unsub;
  };

  useEffect(() => {
    const unsub = getData(selectedAuthor);
    return () => unsub();
  }, []);

  const handleSelect = (e) => {
    console.log("Selected Author:", e.target.value);
    getData(e.target.value);
  };
  return (
    <ListGroup variant="flush">
      <Row className="mb-2">
        <Col sm={12}>
          <ListGroup.Item className="d-flex justify-content-around">
            <select
              className="form-control"
              name="author"
              onChange={handleSelect}
            >
              {books &&
                books.map((post, indx) => (
                  <option key={indx} value={post.author}>
                    {post.author}
                  </option>
                ))}
            </select>
          </ListGroup.Item>
        </Col>
      </Row>

      {posts &&
        posts.map((post) => (
          <React.Fragment key={post.id}>
            <Row className="mb-2">
              <Col sm={12}>
                <ListGroup.Item className="d-flex justify-content-around">
                  <span className="mt-2">{post.title}</span>
                  <span className="badge rounded-pill bg-dark p-3">
                    {post.author}
                  </span>
                  <span className="badge rounded-pill bg-success p-3">
                    {post.price}
                  </span>
                </ListGroup.Item>
              </Col>
            </Row>
          </React.Fragment>
        ))}
    </ListGroup>
  );
}
