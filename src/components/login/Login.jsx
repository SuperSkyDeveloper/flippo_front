import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const initialState = {
  email: "",
  password: ""
};

class LoginForm extends Component {
  state = initialState;

  login = e => {
    e.preventDefault();
    this.props.loginUser(this.state);
    this.setState(initialState);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    if (this.props.user) {
      // Where user goes after login
      this.props.history.push("/user");
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.history.push("/user");
    }
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex flex-row justify-content-center mt-5">
          <div className="col-12 col-md-8 col-lg-6 col-xl-3">
            <div className="card p-5">
              <div align="center"><h4><span role="img" aria-label="wave">👋</span> Hello</h4></div>

              <form onSubmit={this.login}>
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder=""
                    className="form-control"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder=""
                    className="form-control"
                    value={this.state.password}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="LOGIN"
                    className="btn btn-md btn-success"
                  />
                </div>
              </form>
              <p>Don't have an account?</p>
              <Link to="/register">Sign Up</Link>
            </div>
          </div>
          {/* <ToastContainer autoClose={4000} limit={0} /> */}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { loginUser })(LoginForm);
