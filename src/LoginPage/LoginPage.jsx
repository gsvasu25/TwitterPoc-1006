import React from "react";
import { userService } from "../_services";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, returnUrl } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }
    if (!this.validForm()) return;
    this.setState({ loading: true });
    userService.login(username, password).then(
      (user) => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" },
        };
        this.props.history.push(from);
      },
      (error) => this.setState({ error, loading: false })
    );
  }
  validPassword() {
    let password = this.state.password;
    var regex = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    if (!password) return "Password is required";
    if (password && password.length < 8)
      return "Password length min 8 characters";
    console.log(regex.test(password));
    console.log(password);
    if (!regex.test(password))
      return "Password should contain at least one small letter, at least one capital letter, at least one number";
  }
  validErrorPassword() {
    let password = this.state.password;
    var regex = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    if (!password) return " has-error";
    if (password && password.length < 8) return " has-error";
    if (!regex.test(password)) return " has-error";
    return "";
  }
  validForm() {
    let { username, password } = this.state;
    var regex = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    if (!password || !username) return false;
    if (password && password.length < 8) return false;
    if (!regex.test(password)) return false;
    if (username && username.length < 5) return false;
    return true;
  }
  render() {
    const { username, password, submitted, loading, error } = this.state;

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" +
              (submitted && !username ? " has-error" : "") +
              (username && username.length < 5 ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
            {submitted && username && username.length < 5 && (
              <div className="help-block">
                Username should be min 5 characters
              </div>
            )}
          </div>
          <div
            className={"form-group" + (submitted && this.validErrorPassword())}
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted && (
              <div className="help-block">{this.validPassword()}</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary" disabled={loading}>
              Login
            </button>
            {loading && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </div>
          {error && <div className={"alert alert-danger"}>{error}</div>}
        </form>
      </div>
    );
  }
}

export { LoginPage };
