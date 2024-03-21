import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Homepage";
import LoginPage from "../pages/Loginpage";
import RegisterPage from "../pages/Registerpage";

const Routing = () => {
  return (
    <>
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/go" element={<HomePage/>} />
          </Routes>
        </BrowserRouter>
      
    </>
  );
};

export default Routing;
