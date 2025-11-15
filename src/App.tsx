import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme";
import { AppProvider } from "./context/AppContext";
import WidgetsContainer from "./components/WidgetsContainer";

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App" style={{ padding: 20 }}>
          <WidgetsContainer />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
