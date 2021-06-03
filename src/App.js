// import logo from './logo.svg';
// import './App.css';
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Router/RenderRoutes";
import useCustomTheme from "./useCustomTheme";
import "./App.css";
import { StateHideHeaderProvider } from "./hideHeaderStore";

const useStyles = makeStyles((theme) => ({
  body: {
    position: "relative",
    overflowY: "auto",
    paddingTop: theme.spacing(1),
    flexGrow: "1",
  },
}));

function App() {
  const classes = useStyles();
  const [local, theme] = useCustomTheme();

  return (
    <ThemeProvider theme={theme}>
      <StateHideHeaderProvider>
        <div className="App" dir={local}>
          <Router basename={process.env.PUBLIC_URL}>
            <NavBar />
            <div className={classes.body}>
              <Routes />
            </div>
          </Router>
        </div>
      </StateHideHeaderProvider>
    </ThemeProvider>
  );
}

export default App;
