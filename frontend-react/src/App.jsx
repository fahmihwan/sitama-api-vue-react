import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="w-full flex p-5">
                <Routes>
                    <Route path="/" element={<ShowProduct />} />
                    <Route path="add" element={<AddProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                </Routes>

                {/* <div className="w-1/2">
            <AddProduct />
        </div>
        <div className="w-1/2">
            <ShowProduct />
        </div> */}
            </div>
        </BrowserRouter>
    );
}

export default App;
