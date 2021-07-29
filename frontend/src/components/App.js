import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Nav from "./common/Nav";
import routelist from "../router";

function App() {
  return (
    <div>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Router>
          {/* <Nav /> */}
          <Switch>
            {routelist.map(({ path, Component }, i) => (
              <Route key={i} exact path={path} render={() => <Component />} />
            ))}
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
