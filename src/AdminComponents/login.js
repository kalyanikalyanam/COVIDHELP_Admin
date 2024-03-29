import React, { useState } from "react";
import axios from "axios";
import { Link, Route, useParams, Redirect, useHistory } from "react-router-dom";

function AdminLogin() {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = User;

  const handleChange = (email) => (event) => {
    setUser({ ...User, [email]: event.target.value });
  };

  console.log(email, password);

  const Lo = () => {
    axios
      .post("https://api.covidfrontline.net/admin/adminlogin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);

        sessionStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data.user.status);
        if (res.data.user.status === true) {
          history.push("/admindashboard");
        } else {
          alert("Admin User is Suspended");
        }
      });

    // setUser({
    //   isLoggedin : true,
    //   googleID : response.googleId,
    //   name : response.profileObj.name,
    //   email : response.profileObj.email,
    //   accesstoken : response.accessToken,
    //   picture : response.profileObj.imageUrl,
    //   didredirect : true
    // })
  };

  return (
    <div>
      <div className="h-100 w-100 bg-color">
        <div className="login-box">
          <div className="login-logo">
            <span>
              <strong style={{ fontSize: "20px" }}>COVID HELP - ADMIN</strong>
            </span>
            {/* <img src="assets/img/logo/deepthoughtlogo.svg" /> */}
          </div>
          <form className="form-contact contact_form">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    onChange={handleChange("email")}
                    value={email}
                    name="email"
                    type="text"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = 'Username'"
                    placeholder="Username*"
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    name="password"
                    onfocus="this.placeholder = ''"
                    onblur="this.placeholder = '******'"
                    placeholder="******"
                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-3 mb-0">
              <div className="w-100 btn  boxed-btn" onClick={Lo()}>
                Login
              </div>
              <p>
                If you want to login as Super Admin?{" "}
                <Link to="/superadminlogin">Super Admin Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
