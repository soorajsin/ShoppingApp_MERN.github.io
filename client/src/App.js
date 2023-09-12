import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Account/Register";
import Login from "./Components/Account/Login";
import Navbar from "./Components/Navbar.jsx/Navbar";
import Dashboad from "./Components/Dashboard/Dashboad";
import Cart from "./Components/Cart/Cart";
import Error from "./Components/Error/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dash" element={<Dashboad/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
