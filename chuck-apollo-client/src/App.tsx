import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { createMuiTheme, useMediaQuery, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from "./Views/home/home";
import JokeDetail from "./Views/joke_detail/joke_detail";
import { MainProvider } from "./context_providers/main_context"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        {/* <Route path="/categories/:id/random" component={JokeDetail} /> */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}



function ContextProvider() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light'
      }
    }),
    [prefersDarkMode]
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainProvider>
          <App />
        </MainProvider>
      </ThemeProvider>
    </>
  )
}

export default ContextProvider;
