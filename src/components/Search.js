import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";
import People from "./cards/People";

const Search = () => {
  const [state, setState] = useContext(UserContext);
  const [query, setQuery] = useState("");

  const [result, setResult] = useState([]);

  const searchUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(`/search-user/${query}`);

      setResult(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });

      //update local storage, update user, keep token

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      //update context
      setState({ ...state, user: data });
      //update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);

      toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnFollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = result.filter((p) => p._id !== user._id);
      setResult(filtered);
      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form className="form-inlin row" onSubmit={searchUser}>
        <div className="col-8">
          <input
            onChange={(e) => {
              setQuery(e.target.value);
              setResult([]);
            }}
            value={query}
            className="form-control"
            placeholder="Search"
            type="text"
          />
        </div>
        <div className="col-4">
          <button className="btn btn-outline-primary col-12" type="submit">
            Search
          </button>
        </div>
      </form>

      {result &&
        result.map((r) => (
          <People
            key={r._id}
            people={result}
            handleFollow={handleFollow}
            handleUnFollow={handleUnFollow}
          />
        ))}
    </>
  );
};

export default Search;
