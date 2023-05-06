import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticatedLayouts = ({ children }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        let token = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/logout",
                {},
                {
                    headers: {
                        // "Content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">CRUD REACT</div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            <li>
                                {/* <a>logout</a> */}
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <div className="p-5 ">{children}</div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay" />
                <ul className="menu p-4 w-80 bg-base-100">
                    {/* Sidebar content here */}
                    <li>
                        {/* <a>logout</a> */}
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
