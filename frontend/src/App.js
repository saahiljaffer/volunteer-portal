import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Events } from "./pages/Events";
import { Home } from "./pages/Home";
import NavBar from "./pages/NavBar";
import UserContext from "./contexts/UserContext";
import { withRouter, Redirect } from "react-router-dom";
import firebase from "firebase";

function ProtectedRoute({ redirectTo, path, component }) {
  const { user, changeUser } = useContext(UserContext);
  if (!firebase.auth().currentUser) {
    return <Redirect to={redirectTo}></Redirect>;
  } else {
    return <Route exact path={path} component={component}></Route>;
  }
}

function App({ history }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/products/`);
      const body = await result.json();
      setProducts(body.products);
    };
    fetchData();
  }, []);

  const [user, changeUser] = useState(
    JSON.stringify({ name: "saahil", initialized: false })
  );

  return (
    <Router>
      <UserContext.Provider value={{ user, changeUser }}>
        <div className="App">
          <NavBar products={products} />
          <Switch>
            <ProtectedRoute
              path="/"
              redirectTo="/login"
              component={() => <Events />}
              exact
            />
            <ProtectedRoute
              path="/profile"
              redirectTo="/login"
              component={() => <Profile />}
            />
            <Route path="/signup" component={() => <SignUp />} />
            <Route path="/login" component={() => <Login />} />
            {/* <Route component={NotFoundPage} /> */}
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
