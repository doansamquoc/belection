import { ThemeProvider } from "./components/ThemeProvider";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
