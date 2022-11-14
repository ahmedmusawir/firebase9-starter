import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import PaginatedIndex from "../../components/PaginatedIndex";

export default function PaginationPage() {
  return (
    <Page wide={false} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1 className="text-nihad-color">Firebase 9 Pagination</h1>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <PaginatedIndex />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}
