import React, { useEffect, useState } from "react";
import { AuthenticatedLayouts } from "../layouts/AuthenticatedLayouts";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Edit = () => {
    let token = localStorage.getItem("token");
    const [id, setId] = useState(useParams().id);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [department, setDepartment] = useState("");
    const [assign, setAssign] = useState("");
    const [cc, setCc] = useState("");

    const [previewImg, setPreviewImg] = useState("");

    // option
    const [optAsssign, setOptAssign] = useState([]);
    const [optCc, setOptCc] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/list-crud/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setTitle(res.data.data.title);
                setDescription(res.data.data.description);
                setDepartment(res.data.data.department);
                setAssign(res.data.data.assign);
                setCc(res.data.data.cc);
                setFile(res.data.data.attachment);
                setPreviewImg("http://127.0.0.1:8000/storage/" + res.data.data.attachment);

                if (res.data.data.department == "Information Technology") {
                    setOptAssign(["Rudi", "Joko", "Irwan"]);
                }
                if (res.data.data.department == "Sales marketing") {
                    setOptAssign(["Lusi", "Komar", "Ambar"]);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        let filter = optAsssign.filter((d) => d !== assign);
        if (department == "Information Technology") {
            setOptAssign(["Rudi", "Joko", "Irwan"]);
        }
        if (department == "Sales marketing") {
            setOptAssign(["Lusi", "Komar", "Ambar"]);
        }
        setOptCc(filter);
    }, [department, assign]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let formData = {
        //     id: id,
        //     title: title,
        //     description: description,
        //     department: department,
        //     assign: assign,
        //     cc: cc,
        // };

        const formData = new FormData();
        formData.append("title", title);
        formData.append("attachment", file);
        formData.append("description", description);
        formData.append("department", department);
        formData.append("assign", assign);
        formData.append("cc", cc);

        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/list-crud`, formData, {
                headers: {
                    // "Content-type": "application/json",
                    "Content-type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            await console.log(response);
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthenticatedLayouts>
            <div className="container">
                <Link className="btn btn-primary mb-5" to="/home">
                    back
                </Link>
                <div className="overflow-x-auto">
                    <div className="w-full md:flex">
                        <div className="w-full md:w-1/2  card bg-gray-900 p-5">
                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="w-full flex">
                                    <div className="w-1/2 p-5">
                                        <div className="form-control w-full max-w-xs mb-5">
                                            <label className="label">
                                                <span className="label-text">title</span>
                                            </label>
                                            <input
                                                onChange={(e) => setTitle(e.target.value)}
                                                value={title}
                                                type="text"
                                                placeholder="title"
                                                className="input input-bordered w-full max-w-xs"
                                            />
                                        </div>
                                        <div className="form-control w-full max-w-xs mb-5">
                                            <label className="label">
                                                <span className="label-text">image / file</span>
                                            </label>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    setFile(e.target.files[0]);
                                                    setPreviewImg(URL.createObjectURL(e.target.files[0]));
                                                }}
                                                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                            />
                                        </div>
                                        <div className="form-control w-full max-w-xs mb-5">
                                            <label className="label">
                                                <span className="label-text">description</span>
                                            </label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={description}
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.
                                                    // console.log("Editor is ready to use!", editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setDescription(data);
                                                }}
                                                onBlur={(event, editor) => {}}
                                                onFocus={(event, editor) => {}}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/2 p-5">
                                        <div className="form-control w-full max-w-xs mb-5">
                                            <label className="label">
                                                <span className="label-text">department</span>
                                            </label>
                                            <select
                                                onChange={(e) => setDepartment(e.target.value)}
                                                placeholder="department"
                                                value={department}
                                                className="select select-bordered"
                                            >
                                                {["Information Technology", "Sales marketing"]?.map(
                                                    (d, i) => (
                                                        <option value={d} key={i}>
                                                            {d}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div className="form-control w-full max-w-xs mb-5">
                                            <label className="label">
                                                <span className="label-text">assign</span>
                                            </label>
                                            <select
                                                onChange={(e) => setAssign(e.target.value)}
                                                className="select select-bordered"
                                                value={assign}
                                            >
                                                {optAsssign?.map((d, i) => (
                                                    <option value={d} key={i}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-control w-full max-w-xs mb-5">
                                            <label className="label">
                                                <span className="label-text">cc</span>
                                            </label>
                                            <select
                                                onChange={(e) => setCc(e.target.value)}
                                                value={cc}
                                                className="select select-bordered"
                                            >
                                                {optCc?.map((d, i) => (
                                                    <option value={d} key={i}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary">Update</button>
                            </form>
                        </div>
                        <div className="w-full md:w-1/2 ">
                            <div className="ml-10">
                                <img src={previewImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayouts>
    );
};

export default Edit;
