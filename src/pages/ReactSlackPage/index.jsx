import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import axios from "axios";

function SamplePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendSlackMessage = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Message:", message);

    const url =
      "https://hooks.slack.com/services/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";
    // const data = { text: `Name: ${name}, Message: ${message}` };

    const data = {
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "MESSAGE FROM:",
            },
            {
              type: "mrkdwn",
              text: `${name}`,
            },
          ],
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "THE MESSAGE:",
            },
            {
              type: "mrkdwn",
              text: `${message}`,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Approve",
              },
              style: "primary",
              value: "click_me_123",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Deny",
              },
              style: "danger",
              value: "click_me_123",
            },
          ],
        },
      ],
    };

    axios.post(url, JSON.stringify(data), {
      withCredentials: false,
      transformRequest: [
        (data, headers) => {
          return data;
        },
      ],
    });
  };
  return (
    <Page wide={false} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h2 className="text-nihad-color">React To Slack</h2>
            <Form onSubmit={sendSlackMessage}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="secondary"
                size="lg"
                className="px-5"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default SamplePage;
