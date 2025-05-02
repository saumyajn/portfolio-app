import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import Layout from "./components/Layout";
import ThemeContextProvider from "./services/theme";


function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Layout/>
        <Analytics />
        <SpeedInsights />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
