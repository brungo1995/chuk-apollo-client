import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from "./Views/home/home";
import { MainProvider } from "./context_providers/main_context"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/categories/dev/random" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}


function ContextProvider() {

  return (
    <MainProvider>
      <App />
    </MainProvider>
  )
}

export default ContextProvider;
