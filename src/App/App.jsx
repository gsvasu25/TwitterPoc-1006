import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "../_components";
import { LoginPage } from "../LoginPage";
import { Posts } from "../Posts";
import { NotFoundPage } from "../ErrorPages/NotFoundPage";
class App extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div>
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Posts} />
                <Route path="/login" component={LoginPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export { App };
