import React, { useContext } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { PostsContext } from "../contexts/PostsContext";
import { db } from "../firebase/config";

function BlogIndex() {
  const { state, dispatch } = useContext(PostsContext);
  const url = `https://jsonplaceholder.typicode.com/posts/`;

  const deletePost = async (id) => {
    await fetch(`${url}${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "REMOVE_POST", payload: id });
  };

  return (
    <ListGroup variant="flush">
      {state.isPending && (
        <Spinner className="mx-auto" animation="border" variant="success" />
      )}
      {state.posts &&
        state.posts.map((post) => (
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
