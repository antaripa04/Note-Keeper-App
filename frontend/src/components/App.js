import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
// import Nav from "./common/Nav";
import routelist from "../router";

function App() {
  return (
    <div>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Router>
         <Header/>
          <Switch>
            {routelist.map(({ path, Component }, i) => (
              <Route key={i} exact path={path} render={() => <Component />} />
            ))}
          </Switch>
          <Footer/>
        </Router>
      </Suspense>
    </div>
  
  );
}

export default App;
