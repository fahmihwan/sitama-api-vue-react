import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                username: username,
                password: password,
            });
            localStorage.setItem("token", response.data.access_token);
            navigate("/home");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="hero min-h-screen bg-base-200 ">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="card bg-gray-900 p-5 w-96">
                            <p className="text-5xl">Login React</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-control w-full max-w-xs mb-5">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setUsername(e?.target?.value)}
                                        name="username"
                                        value={username}
                                        placeholder="Username"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e?.target?.value)}
                                        placeholder="Password"
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </div>
                                <div className="p-5">
                                    <button type="submit" className="btn btn-primary mr-3">
                                        login
                                    </button>
                                    {/* <button className="btn btn-primary mr-3">register</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
