import React, { useContext } from "react";
import Page from "../../components/layouts/Page";
import { Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Content from "../../components/layouts/Content";
import { useParams } from "react-router-dom";
import { PostsContext } from "../../contexts/PostsContext";
import _ from "lodash";

function SinglePostPage() {
  const { id } = useParams();
  console.log("Use Params ID: ", id);
  const { state } = useContext(PostsContext);

  let singlePost;
  singlePost = _.find(state.posts, (post) => post.id.toString() === id);
  // singlePost = _.find(state.posts, (post) => post.id === Number(id)); // didn't work with uuid

  return (
    <Page wide={true} pageTitle="Movie Form">
      {state.isPending && (
        <Content width="w-100" cssClassNames="h-100 row align-items-center">
          <Spinner className="mx-auto" animation="border" variant="info" />
        </Content>
      )}
      <Row className="justify-content-center">
        <Col sm={12}>
          {singlePost && (
            <Content width="w-100" cssClassNames="bg-light">
              <h1>{singlePost.title}</h1>
              <h4>Post ID: {id}</h4>
              <p>{singlePost.body}</p>
            </Content>
          )}
        </Col>
      </Row>
      <Row className="text-right">
        <Col sm={12}>
          <Link to={`/edit-post/${id}`} className="btn btn-info">
            Edit Post
          </Link>
        </Col>
      </Row>
    </Page>
  );
}

export default SinglePostPage;
