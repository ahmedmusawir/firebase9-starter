import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import FormikControl from "./formik/FormikControl";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { PostsContext } from "../contexts/PostsContext";

function PostForm() {
  const { state, dispatch } = useContext(PostsContext);
  const navigate = useNavigate();
  const url = "https://jsonplaceholder.typicode.com/posts";

  const postData = async (post) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
    const json = await res.json();
  };

  //   FORMIK INFO
  const initialValues = {
    userId: 1,
    id: uuid(),
    title: "",
    body: "",
  };
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({ values: initialValues });

    const singlePost = {
      userId: 1,
      ...values,
    };
    postData(singlePost);
    dispatch({ type: "ADD_POST", payload: singlePost });
    navigate("/");
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is Required!"),
    body: Yup.string().required("Content is Required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="p-3 bg-light formik-comp">
          {/* BOOK TITLE */}
          <div className="mb-2">
            <FormikControl
              control="input"
              type="text"
              name="title"
              label="Post Title"
              placeholder="Title of the Post"
              className={
                formik.touched.title && formik.errors.title
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
          </div>

          {/* TEXT AREA */}
          <div className="mb-3">
            <FormikControl
              control="textarea"
              name="body"
              label="Post Content"
              placeholder="Content"
              rows={4}
              className={
                formik.touched.body && formik.errors.body
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
          </div>
          <hr className="bg-primary" />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button className="btn btn-warning ml-1" type="reset">
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}

PostForm.propTypes = {};

export default PostForm;
