import React from "react";
import Page from "../../components/layouts/Page";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Content from "../../components/layouts/Content";
import { useParams } from "react-router-dom";
import SinglePost from "../../components/SinglePost";

function SinglePostPage() {
  const { id } = useParams();

  return (
    <>
      <Page wide={false} pageTitle="Movie Form">
        <Row className="justify-content-center">
          <Col sm={12}>
            <Content width="w-100" cssClassNames="bg-light">
              <h3 className="text-nihad-color">
                <i className="bi bi-sticky"></i> Single Post
              </h3>
            </Content>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={12}>
            <Content width="w-100" cssClassNames="bg-light">
              <SinglePost id={id} />
            </Content>
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
    </>
  );
}

export default SinglePostPage;
