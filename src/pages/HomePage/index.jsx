import React from "react";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import { Link } from "react-router-dom";
import BlogIndex from "../../components/BlogIndex";

function HomePage() {
  return (
    <Page wide={true} pageTitle="React Fetch">
      <Row className="">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light clearfix">
            <h3 className="text-bibo-color">Firebase 9 Starter</h3>
            <h5>
              Project Name: Firebase 9 Start | DB Name: .... | Collections: ....
            </h5>
            <Link to="/add-post" className="btn btn-info float-right">
              <i class="bi bi-palette2 pe-2"></i>Add New Post
            </Link>
          </Content>
        </Col>
      </Row>
      <Row className="">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light clearfix">
            <BlogIndex />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default HomePage;
