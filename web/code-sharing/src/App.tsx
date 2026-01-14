import { BrowserRouter, Routes, Route } from "react-router";
import { Index } from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id?" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
