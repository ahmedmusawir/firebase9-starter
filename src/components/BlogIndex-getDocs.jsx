import React, { useState, useEffect } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function BlogIndex() {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(null);

  useEffect(() => {
    const ref = collection(db, "posts");

    setIsPending(true);
    getDocs(ref).then((snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPosts(results);
      setIsPending(false);
    });
  }, []);

  return (
    <ListGroup variant="flush">
      {isPending && (
        <Spinner className="mx-auto" animation="border" variant="nimat-color" />
      )}
      {posts &&
        posts.map((post) => (
          <React.Fragment key={post.id}>
            <Row className="mb-2">
              <Col sm={10}>
                <Link to={`/post/${post.id}`}>
                  <ListGroup.Item action>{post.title}</ListGroup.Item>
                </Link>
              </Col>
              <Col sm={2}>
                <button
                  className="btn btn-danger"
                  // onClick={() => deletePost(post.id)}
                >
                  <i className="bi bi-trash-fill pe-2"></i>
                  Delete
                </button>
              </Col>
            </Row>
          </React.Fragment>
        ))}
    </ListGroup>
  );
}

export default BlogIndex;
