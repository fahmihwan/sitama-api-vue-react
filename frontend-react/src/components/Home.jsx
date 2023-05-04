import React, { useEffect, useState } from "react";
import { AuthenticatedLayouts } from "./../layouts/AuthenticatedLayouts";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    let token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/list-crud", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("apakah anda yakin ingin menghapus?")) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/list-crud/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response);
                fetchData();
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <AuthenticatedLayouts>
            <div className="w-full">
                <Link className="btn btn-primary mb-2" to="/home/create">
                    Add
                </Link>

                <div className="overflow-x-auto w-full">
                    <table className="table w-full ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th />
                                <th>title</th>
                                <th>attachment</th>
                                <th>description</th>
                                <th>department</th>
                                <th>assign</th>
                                <th>cc</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((d, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{d.title}</td>
                                    <td>
                                        {/* <img src={`http://127.0.0.1:8000/api/${d.attachment}`} alt="" /> */}
                                        <img src={`http://127.0.0.1:8000/storage/${d.attachment}`} alt="" />
                                    </td>
                                    <td>
                                        <div className="overflow-hidden text-ellipsis w-[200px]">
                                            <div dangerouslySetInnerHTML={{ __html: d.description }} />
                                        </div>
                                    </td>
                                    <td>{d.department}</td>
                                    <td>{d.assign}</td>
                                    <td>{d.cc}</td>
                                    <td>
                                        <Link to={`/home/edit/${d.id}`} className="btn btn-warning mr-2">
                                            Edit
                                        </Link>
                                        <button className="btn btn-error" onClick={() => handleDelete(d.id)}>
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayouts>
    );
};

export default Home;
