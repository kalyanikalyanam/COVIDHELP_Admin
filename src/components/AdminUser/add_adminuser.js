import axios from "axios";
import React from "react";
import Sidebar from "../../components/sidebar";
import SimpleReactValidator from "simple-react-validator";
class AddAdminUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      city: "",
      country: "",
      data: Date.now(),
      mobile_message: "",
      validError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCityName = this.setCityName.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }
  componentDidMount() {
    axios
      .get(`https://api.covidfrontline.net/country/allcountry`)
      .then((res) => {
        const Countries = res.data;
        console.log(Countries);
        this.setState({ Countries, loading: true });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.validator.allValid()) {
      const menu = {
        name: this.state.name,
        email: this.state.email,
        city: this.state.city,
        country: this.state.country,
        password: this.state.password,
        date: Date.now(),
      };
      console.log(menu);
      axios
        .post(`https://api.covidfrontline.net/admin/adminusers`, menu)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });

      this.props.history.push("/adminuser");
      // window.location.reload();
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  setCityName(e) {
    console.log(e.target.value);
    this.setState({
      country: e.target.value,
    });

    let selectedCountryName = e.target.value;
    axios
      .get(
        `https://api.covidfrontline.net/city/cityvalues/${selectedCountryName}`
      )
      .then((res) => {
        const cities = res.data;
        console.log(cities);
        this.setState({ cities });
      });
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">Admin User - Add New</div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                <form
                  className="form-contact contact_form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row m-0">
                    <div className="col-lg-12 p-0"></div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Name</label>
                        <input
                          className="form-control col-lg-10"
                          name="name"
                          onChange={this.handleChange}
                          value={this.state.name}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "Name",
                          this.state.name,
                          "required|whitespace|min:1|max:20"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Email</label>
                        <input
                          className="form-control col-lg-10"
                          name="email"
                          onChange={this.handleChange}
                          value={this.state.email}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "Email",
                          this.state.email,
                          "required|email"
                        )}
                      </div>
                    </div>
                    {/* <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> City</label>
                        <input
                          className="form-control col-lg-10"
                          name="city"
                          onChange={this.handleChange}
                          value={this.state.city}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "city",
                          this.state.city,
                          "required"
                        )}
                        {this.state.mobile_message}
                      </div>
                    </div> */}
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0 ">
                        <label className="col-lg-2 p-0">Country Name</label>

                        <select
                          className="form-control col-lg-10"
                          name="country"
                          value={this.state.country}
                          onChange={this.setCityName}
                        >
                          <option>Select Country</option>
                          {this.state.Countries &&
                            this.state.Countries.map((data, index) => {
                              return (
                                <option value={data.country} key={index}>
                                  {data.country}
                                </option>
                              );
                            })}
                        </select>

                        {this.validator.message(
                          "Country Name",
                          this.state.country,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">City Name</label>

                        <select
                          className="form-control col-lg-10"
                          name="city"
                          value={this.state.city}
                          onChange={this.onChange}
                        >
                          <option>Select City</option>
                          {this.state.cities &&
                            this.state.cities.map((data, index) => {
                              return (
                                <option value={data.city} key={index}>
                                  {data.city}
                                </option>
                              );
                            })}
                        </select>

                        {this.validator.message(
                          "City Name",
                          this.state.city,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0"> Password</label>
                        <input
                          className="form-control col-lg-10"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder="Alt Text"
                        />
                        {this.validator.message(
                          "Password",
                          this.state.password,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field  row m-0">
                        <label className="col-lg-2 p-0" />
                        <div className="col-lg-6 p-0">
                          <button
                            className="button button-contactForm boxed-btn"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAdminUser;
