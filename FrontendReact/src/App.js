import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import MergeEmployeeComponent from "./components/MergeEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListEmployeeComponent />} />
        <Route path="/employees" element={<ListEmployeeComponent />} />
        <Route path="/employees/new" element={<CreateEmployeeComponent />} />
        <Route
          path="/employees/:id/edit"
          element={<UpdateEmployeeComponent />}
        />
        <Route path="/employees/:id" element={<ViewEmployeeComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <Router />
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
