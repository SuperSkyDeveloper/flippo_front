import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import AddNewAdvert from "./PostListing";

class ListNow extends Component {
    componentDidUpdate() {
        if (this.props.user) {
            if (this.props.user.justRegistered) {
                this.props.logMeOut();
            }
        }
    }

    render() {
        if (!this.props.user) {
            return (

                <div className="row mt-3 text-center">
                    <div className="col-12">
                        <h4>You must be signed in to post!</h4>
                    </div>
                    <div className="col-12">
                        <Link className="btn btn-outline-success" to="/login">
                            Login
                        </Link>
                        <Link className="btn btn-outline-info ml-1" to="/register">
                            Sign Up
                        </Link>
                    </div>
                </div>
            );
        } else {
            return <div className="container">
            <div className="row mt-3">
                <div className="col-12 col-sm-12 col-md-12 col-xl-12">

                    <AddNewAdvert/>
                </div>
            </div>
            </div>
        }
    }
}


function mapStateToProps(state) {
    if (state.userReducer) {
        return {
            user: state.userReducer.user
        };
    }
}

export default connect(mapStateToProps)(ListNow);