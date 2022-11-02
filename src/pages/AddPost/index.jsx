import React from "react";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import PostForm from "../../components/PostForm";

function AddPostPage() {
  return (
    <Page wide={false} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h3 className="text-nihad-color">
              <i className="bi bi-file-earmark-plus"></i> Add Post
            </h3>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <PostForm />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default AddPostPage;
