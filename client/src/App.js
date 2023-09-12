import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Account/Register";
import Login from "./Components/Account/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
