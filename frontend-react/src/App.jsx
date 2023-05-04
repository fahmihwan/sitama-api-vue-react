import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/create" element={<Create />} />
                <Route path="/home/edit/:id" element={<Edit />} />
            </Routes>
        </>
    );
}

export default App;
