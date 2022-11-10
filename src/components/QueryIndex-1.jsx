import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ListGroup, Spinner } from "react-bootstrap";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useQuery } from "../hooks/useQuery";

export default function QueryIndex() {
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const { docs: posts, isPending } = useQuery("books", selectedAuthor);

  // console.log("Books data from QueryIndex:", docs);

  const handleSelect = (e) => {
    console.log("Selected Author:", e.target.value);
    setSelectedAuthor(e.target.value);
  };
  return (
    <ListGroup variant="flush">
      {isPending && (
        <Spinner className="mx-auto" animation="border" variant="nimat-color" />
      )}
      <Row className="mb-2">
        <Col sm={12}>
          <ListGroup.Item className="d-flex justify-content-around">
            <select
              className="form-control"
              name="author"
              onChange={handleSelect}
            >
              {posts &&
                posts.map((post, indx) => (
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
