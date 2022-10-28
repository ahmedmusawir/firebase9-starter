import React from "react";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import PostForm from "../../components/PostForm";

function AddPostPage() {
  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>Add Post</h1>
            <PostForm />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default AddPostPage;
