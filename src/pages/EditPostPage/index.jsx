import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import EditForm from "../../components/EditForm";

function EditPostPage() {
  const { id } = useParams();
  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>Edit Post</h1>
            <h4>Post ID: {id}</h4>
            <EditForm />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default EditPostPage;
