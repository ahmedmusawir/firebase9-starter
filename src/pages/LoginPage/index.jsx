import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Page from "../../components/layouts/Page";
import Content from "../../components/layouts/Content";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../components/formik/FormikControl";
import * as Yup from "yup";

function LoginPage() {
  const navigate = useNavigate();

  //   FORMIK INFO
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({ values: initialValues });

    navigate("/");
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is Required!"),
    password: Yup.string().required("Password is Required!"),
  });
  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={8}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1 className="text-center mt-4">Login</h1>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <Form className="p-3 bg-light formik-comp">
                  {/* LOGIN ID OR EMAIL */}
                  <div className="mb-2">
                    <FormikControl
                      control="input"
                      type="email"
                      name="email"
                      label="User Email"
                      placeholder="Email"
                      className={
                        formik.touched.email && formik.errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>

                  {/* PASSWORD INPUT */}
                  <div className="mb-3">
                    <FormikControl
                      control="input"
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                  </div>
                  <hr className="bg-primary" />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                  <button className="btn btn-warning ms-2" type="reset">
                    Reset
                  </button>
                </Form>
              )}
            </Formik>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default LoginPage;
