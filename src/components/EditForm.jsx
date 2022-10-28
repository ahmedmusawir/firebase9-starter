import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import FormikControl from "./formik/FormikControl";
import * as Yup from "yup";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { PostsContext } from "../contexts/PostsContext";

function EditForm() {
  const { id } = useParams();
  const { state, dispatch } = useContext(PostsContext);
  // console.log("State from Context:", state);
  const navigate = useNavigate();
  const url = "https://jsonplaceholder.typicode.com/posts/" + id;

  console.log(url);

  const postData = async (post) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
    // const json = await res.json();
  };

  let singlePost;
  singlePost = _.find(state.posts, (post) => post.id.toString() === id);
  // singlePost = _.find(state.posts, (post) => post.id === Number(id)); // didn't work with uuid
  // console.log("State Posts", state.posts);
  // console.log("single Post", singlePost);

  //   FORMIK INFO
  const initialValues = {
    userId: singlePost.userId,
    id: singlePost.id,
    title: singlePost.title,
    body: singlePost.body,
  };
  const onSubmit = (values, { resetForm }) => {
    console.log("ON SUBMIT", values);
    resetForm({ values: initialValues });

    const editedSinglePost = {
      userId: 1,
      ...values,
    };
    console.log("EDITED SINGLE POST:", editedSinglePost);
    postData(editedSinglePost);
    dispatch({ type: "EDIT_POST", payload: editedSinglePost });
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

EditForm.propTypes = {};

export default EditForm;
