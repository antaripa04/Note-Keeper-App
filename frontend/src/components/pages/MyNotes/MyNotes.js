import MainScreen from "../../common/MainScreen";
import {Link} from "react-router-dom";
import {Button,Card,Badge} from "react-bootstrap";
const MyNotes=() => {
  return <MainScreen title='Welcome back...'>
  <Link to='createNote'>
  <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
          </Button>
          </Link>
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
                  </span>
                    <Button>Edit</Button>
                  <div>
                    <Button variant="danger"
                      className="mx-2"
                      //onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>

  <Card.Body>
                    <h4>
                    </h4>
                    <blockquote className="blockquote mb-0">
                    <Badge variant="success">
                        
                      </Badge>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                         
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
  </MainScreen>
   
};
export default MyNotes;
