import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { RouterProvider } from 'react-router-dom';
import router from './services/routes';

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
       <Analytics />
       <SpeedInsights />
    </div>
  );
}

export default App;