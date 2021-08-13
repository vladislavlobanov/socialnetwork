import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/api/users`);
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            let abort;
            (async () => {
                const { data } = await axios.get(
                    `/api/search-users/${searchTerm}`
                );
                if (!abort) {
                    setSearchData(data);
                }
            })();
            return () => {
                abort = true;
            };
        }
    }, [searchTerm]);

    return (
        <>
            <div className="findPeople">
                {!searchTerm && (
                    <>
                        <h1>Find people</h1>
                        <p>Check out who just joined!</p>
                        {users.map((users) => (
                            <div
                                key={users.id}
                                className="findPeople organizeNamePhoto"
                            >
                                <img
                                    src={users.img_url || "/user.svg"}
                                    alt={users.first + " " + users.last}
                                />

                                <Link to={`/user/${users.id}`}>
                                    {users.first} {users.last}
                                </Link>
                            </div>
                        ))}
                    </>
                )}

                <h1>Are you looking for someone in particular?</h1>
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter name"
                ></input>

                {searchTerm && (
                    <>
                        {searchTerm && searchData.length > 0 ? (
                            <>
                                {searchData.map((searchData) => (
                                    <div
                                        key={searchData.id}
                                        className="findPeople organizeNamePhoto"
                                    >
                                        <img
                                            src={
                                                searchData.img_url ||
                                                "/user.svg"
                                            }
                                            alt={
                                                searchData.first +
                                                " " +
                                                searchData.last
                                            }
                                            onError={(e) => {
                                                e.target.src = "/user.svg";
                                            }}
                                        />
                                        <Link to={`/user/${searchData.id}`}>
                                            {searchData.first} {searchData.last}
                                        </Link>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div>Nothing has been found</div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
