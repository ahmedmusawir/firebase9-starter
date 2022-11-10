import React from "react";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import { Link } from "react-router-dom";
import QueryIndex from "../../components/QueryIndex";
import { useTheme } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function QueryPage() {
  const { mode } = useTheme();
  const { user } = useAuthContext();

  return (
    <Page wide={false} pageTitle="React FB9">
      <Row className="">
        <Col sm={12}>
          <Content
            width="w-100"
            cssClassNames={
              mode === "dark"
                ? `bg-dark text-light clearfix ps-5 pt-4`
                : `bg-light clearfix ps-5 pt-5`
            }
          >
            <h3 className="text-bibo-color">
              <i className="bi bi-fire"></i> Firebase 9 Queries
            </h3>
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
            <QueryIndex />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}
