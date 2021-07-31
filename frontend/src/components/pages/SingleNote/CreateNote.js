import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../common/MainScreen";
import Loading from "../../common/Loading";
import ErrorMessage from "../../common/ErrorMessage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";
import "./SingleNote.css";
import axios from "axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:3030/api/notes/create`,
        { title, content, category },
        config
      );
      setLoading(false);
      history.push("/mynotes");
    } catch (error) {
      setError(error.response.message);
      setLoading(false);
    }
    console.log(title);
  };

  return (
    <>
      <MainScreen title="Create a Note">
        <Card>
          <Card.Header>Create a new Note</Card.Header>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  value={title}
                  placeholder="Enter the title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="content" className="mt-3">
                <Form.Label>Content</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              </Form.Group>
              {content && (
                <Card className="mt-3">
                  <Card.Header>Note Preview</Card.Header>
                  <Card.Body>{parse(content)}</Card.Body>
                </Card>
              )}
              <Form.Group controlId="content" className="mt-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="content"
                  value={category}
                  placeholder="Enter the Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <Button type="submit" variant="primary" className="mt-3">
                Create Note
              </Button>
              <Button
                className="mx-2 mt-3"
                onClick={resetHandler}
                variant="danger"
              >
                Reset Feilds
              </Button>
            </Form>
          </Card.Body>

          <Card.Footer className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  );
}

export default CreateNote;
