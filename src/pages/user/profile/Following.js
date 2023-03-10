import { useContext, useState, useEffect } from "react";
import { Avatar, List } from "antd";
import moment from "moment";

import { UserContext } from "../../../UserContext";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Following = () => {
  const [state, setState] = useContext(UserContext);
  // state
  const [people, setPeople] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.token) fetchFollowing();
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      //   console.log("following => ", data);
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZL5p16YV5QRk9p4t7VCNlp-PU2-5Yhv7wwg&usqp=CAU";
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      // update context
      setState({ ...state, user: data });
      // update people state
      let filtered = people.filter((p) => p._id !== user._id);
      setPeople(filtered);
      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row col-md-6 offset-md-3">
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Link
        className="d-flex justify-content-center pt-5"
        to={"/user/dashboard"}
      >
        <RollbackOutlined />
      </Link>
    </div>
  );
};

export default Following;
