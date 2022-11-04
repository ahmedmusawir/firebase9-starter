import React from "react";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import { Link } from "react-router-dom";
import BlogIndex from "../../components/BlogIndex";
import { useTheme } from "../../hooks/useTheme";

function HomePage() {
  const { mode } = useTheme();
  return (
    <Page wide={false} pageTitle="React FB9">
      <Row className="">
        <Col sm={12}>
          <Content
            width="w-100"
            cssClassNames={
              mode === "dark"
                ? `bg-dark text-light clearfix ps-5 pt-5`
                : `bg-light clearfix ps-5 pt-5`
            }
          >
            <h3 className="text-bibo-color">
              <i className="bi bi-fire"></i> Firebase 9 Starter
            </h3>
            <h5>Project Name: Firebase 9 Start</h5>
            <li>DB Name: Firebase 9 Start</li>
            <li>Collection: posts</li>
            <div className="d-flex justify-content-end">
              <Link to="/add-post" className="btn btn-info mt-2">
                <i className="bi bi-palette2 pe-2"></i> Add New Post
              </Link>
            </div>
          </Content>
        </Col>
      </Row>
      <Row className="">
        <Col sm={12}>
          {/* <Content width="w-100" cssClassNames="bg-light clearfix"> */}
          <Content
            width="w-100"
            cssClassNames={
              mode === "dark"
                ? `bg-dark text-light clearfix`
                : `bg-light clearfix`
            }
          >
            <BlogIndex />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default HomePage;
