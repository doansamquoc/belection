import { ThemeProvider } from "./components/ThemeProvider";
import TitleManager from "./components/TitleManager";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <TitleManager>
        <AppRouter />
      </TitleManager>
    </ThemeProvider>
  );
}

export default App;
