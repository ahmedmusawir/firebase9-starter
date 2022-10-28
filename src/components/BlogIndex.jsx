import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { ListGroup, Spinner } from "react-bootstrap";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useRealtimeData } from "../hooks/useRealtimeData";

function BlogIndex() {
  const { docs: posts, isPending } = useRealtimeData("posts");

  const deletePost = async (id) => {
    const ref = doc(db, "posts", id);
    await deleteDoc(ref);
  };

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
                  onClick={() => deletePost(post.id)}
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
