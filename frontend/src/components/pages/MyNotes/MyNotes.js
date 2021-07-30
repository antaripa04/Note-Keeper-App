import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../common/MainScreen";
import Loading from "../../common/Loading";
import ErrorMessage from "../../common/ErrorMessage";
import ContextAwareToggle from "./ContextAwareToggle";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorDelete, setErrorDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const listNotes = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3030/api/notes`,
        config
      );
      setLoading(false);
      setNotes(data);

      localStorage.setItem("notes", JSON.stringify(data));
    } catch (error) {
      setError(error.response.message);
      setLoading(false);
    }
  };

  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      listNotes();
    }
  }, [userInfo]);

  return (
    <MainScreen title="Welcome back...">
      <Link to="/createNote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {console.log(notes)}

      {notes &&
        notes.map((note) => (
          <Accordion key={note._id} defaultActiveKey="1">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  // onClick={() => ModelShow(note)}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <ContextAwareToggle eventKey="0">
                    {note.title}
                  </ContextAwareToggle>
                </span>

                <div>
                  <Button href={`/note/${note._id}`} className="pb-0">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="mx-2 pb-0"
                    // onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};
export default MyNotes;
