import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Content from "./layouts/Content";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "./formik/FormikControl";
import * as Yup from "yup";
import { db } from "../firebase/config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

function EditForm({ id }) {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [singlePost, setSinglePost] = useState(null);

  useEffect(() => {
    // CREATING DB REF W/ COLLECTION
    const ref = doc(db, "posts", id);

    setIsPending(true);

    let unsub;
    try {
      unsub = onSnapshot(ref, (doc) => {
        setSinglePost(doc.data());
        setIsPending(false); // has to be inside the function. otherwise spinner won't show up
      });
    } catch (error) {
      console.log("Getting SinglePost error from EditForm:", error.message);
    }

    return () => unsub();
  }, [id]);

  // INSERTING DATA INTO FIRESTORE DB
  const postData = async (editedPost) => {
    // CREATING DB REF W/ COLLECTION
    const ref = doc(db, "posts", id);
    // UPDATING DATA IN DB
    try {
      await updateDoc(ref, editedPost);
      console.log("Data Updated", editedPost);
    } catch (error) {
      console.log("Data update error in EditForm:", error.message);
    }
  };

  // FORMIK INFO
  let initialValues = "";
  // ADDING INITIAL VALUES WHEN THE singlePost IS AVAILABLE. MUST CHECK FOR AVAILABIITIES.
  if (singlePost) {
    initialValues = {
      title: singlePost.title,
      body: singlePost.body,
    };
  }

  // FORMIK SUBMIT WITH EDITED VALUES AND FORM RESET
  const onSubmit = (values, { resetForm }) => {
    // console.log("ON SUBMIT", values);
    resetForm({ values: initialValues });

    // ADDING EDITED VALUES ON SUBMIT
    const editedSinglePost = {
      ...values,
    };
    // console.log("EDITED SINGLE POST:", editedSinglePost);
    // POSTING DATA TO FIRESTORE 9
    postData(editedSinglePost);
    // REDIRECTING TO HOME PAGE UPON POSTING DATA
    navigate("/");
  };
  // FORM VALIDATION LOGIC W/ YUP
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is Required!"),
    body: Yup.string().required("Content is Required!"),
  });

  return (
    <>
      {isPending && (
        <Content width="w-100" cssClassNames="h-100 row align-items-center">
          <Spinner
            className="mx-auto"
            animation="border"
            variant="nimat-color"
          />
        </Content>
      )}
      {/* ALWAYS CHECK FOR singlePost AVAILABILITY OTHERWISE setSinglePost VALUE WILL BE NULL */}
      {singlePost && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="p-3 bg-light formik-comp">
              {/* POST TITLE */}
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

              {/* POST CONTENT */}
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
      )}
    </>
  );
}

export default EditForm;
