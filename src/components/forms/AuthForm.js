import React from "react";
import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
  profileUpdate,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {profileUpdate && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Username</label>
          </small>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      )}

      {profileUpdate && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">About</label>
          </small>
          <input
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      )}
      {page !== "login" && (
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Your name</label>
          </small>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
      )}

      <div className="form-group p-2">
        <small>
          <label className="text-muted">Email address</label>
        </small>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="form-control"
          placeholder="Enter name"
          disabled={profileUpdate}
        />
      </div>

      <div className="form-group p-2">
        <small>
          <label className="text-muted">Password</label>
        </small>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="form-control"
          placeholder="Enter name"
        />
      </div>

      {page !== "login" && (
        <>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">Pick a question</label>
            </small>
            <select className="form-control">
              <option>What is your favourite color?</option>
              <option>What is your best friend's name?</option>
              <option>What city you were born?</option>
            </select>

            <small className="form-text text-muted">
              You can use this to reset your password if forgotten.
            </small>
          </div>

          <div className="form-group p-2">
            <input
              onChange={(e) => setSecret(e.target.value)}
              value={secret}
              type="text"
              className="form-control"
              placeholder="Write your answer here"
            />
          </div>
        </>
      )}

      <div className="form-group p-2">
        <button
          disabled={
            profileUpdate
              ? loading
              : page === "login"
              ? !email || !password || loading
              : !name || !email || !secret || !password || loading
          }
          className="btn btn-info col-12"
        >
          {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
