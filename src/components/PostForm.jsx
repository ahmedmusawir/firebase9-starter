import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "./formik/FormikControl";
import * as Yup from "yup";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function PostForm() {
  const navigate = useNavigate();

  const postData = async (post) => {
    const ref = collection(db, "posts");

    try {
      await addDoc(ref, {
        title: post.title,
        body: post.body,
        createdAt: Timestamp.now(),
      });
      console.log("Data insert successful");
      return null;
    } catch (error) {
      console.log("Data insert error in PostForm:", error.message);
    }
  };

  //   FORMIK INFO
  const initialValues = {
    title: "",
    body: "",
  };
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({ values: initialValues });

    const singlePost = {
      ...values,
    };
    postData(singlePost);
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
          <button className="btn btn-warning ms-2" type="reset">
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default PostForm;
