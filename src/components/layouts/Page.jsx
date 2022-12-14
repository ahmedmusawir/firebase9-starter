import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import "./Page.scss";

function Page({ wide, pageTitle, children }) {
  // Setting up mandatory Page Title in the browser
  useEffect(() => {
    document.title = `${pageTitle} | Demo`;
  }, [pageTitle]);

  // Checking for page width prop fluid to be true or false
  // fluid when true the layout will be full-width, when false
  // it is not full-width
  if (wide) {
    return (
      <div className="page">
        <Container fluid>{children}</Container>
      </div>
    );
  } else {
    return (
      <div className="page">
        <Container>{children}</Container>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  wide: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
};

export default Page;
