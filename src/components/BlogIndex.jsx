import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useRealtimeData } from "../hooks/useRealtimeData";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useAuthContext } from "../hooks/useAuthContext";

function BlogIndex() {
  const { docs: posts, isPending } = useRealtimeData("posts");
  const { user } = useAuthContext();

  const handleClickDelete = async (id) => {
    const ref = doc(db, "posts", id);
    try {
      await deleteDoc(ref);
    } catch (error) {
      console.log("Data delete error in Blogindex:", error.message);
    }
  };

  const deletePost = (id) => {
    confirmAlert({
      title: "Please Confirm!",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleClickDelete(id),
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  return (
    <ListGroup variant="flush">
      {isPending && (
        <Spinner className="mx-auto" animation="border" variant="nimat-color" />
      )}
      {posts &&
        posts.map((post) => (
          <React.Fragment key={post.id}>
            {user && (
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
            )}
            {!user && (
              <Row className="mb-2">
                <Col sm={12}>
                  <Link to={`/post/${post.id}`}>
                    <ListGroup.Item action>{post.title}</ListGroup.Item>
                  </Link>
                </Col>
              </Row>
            )}
          </React.Fragment>
        ))}
    </ListGroup>
  );
}

export default BlogIndex;
