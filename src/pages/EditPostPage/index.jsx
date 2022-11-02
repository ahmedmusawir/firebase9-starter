import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import EditForm from "../../components/EditForm";

function EditPostPage() {
  const { id } = useParams();
  return (
    <Page wide={false} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h3 className="text-nihad-color">
              <i className="bi bi-pencil-square"></i> Edit Post
            </h3>
            <h5>Post ID: {id}</h5>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <EditForm id={id} />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default EditPostPage;
