import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdvert } from "../../actions/advert";
import AdvertForm from "./AdvertForm";

import "./addnew.css";

class AddNewAdvert extends Component {
  state = this.props.advert.defaultStates;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewAdvert = e => {
    e.preventDefault();
    if (!this.state.isForRent && !this.state.isForSale) {
      this.setState({
        error: "Please select is it For Sale or For Rent"
      });
      return;
    }
    this.props.createAdvert(this.state);
    this.setState(this.props.advert.defaultStates);
  };
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.advert.defaultStates);
  }

  forRentForSale = action => {
    if (action === "sale") {
      this.setState({
        ...this.state,
        isForSale: true,
        isForRent: false,
        error: ""
      });
    }
    if (action === "rent") {
      this.setState({
        ...this.state,
        isForSale: false,
        isForRent: true,
        error: ""
      });
    }
  };

  showAdvertForm = () => {
    this.setState({
      showAddForm: !this.state.showAddForm
    });
  };

  render() {
    return (
      <div className="card">
        <div className="">
          <h5 className="card-title greenUnderline m-3">Post New Assignment Listing</h5>
          {this.state.showAddForm ? (
            <div className="col-12 my-3">
              <button
                className="btn btn-sm btn-warning my-3"
                type="button"
                onClick={this.showAdvertForm}
              >
                Hide Advert Form
              </button>
              <hr className="hrSection" />
              {this.state.error ? (
                <div className="alert alert-danger my-3 mx-5" role="alert">
                  {this.state.error}
                </div>
              ) : (
                ""
              )}
              <AdvertForm
                submitNewAdvert={this.submitNewAdvert}
                handleChange={this.handleChange}
                formValues={this.state}
                forRentForSale={this.forRentForSale}
              />
            </div>
          ) : (
            <div className="col-6 my-3">
              <button
                className="btn btn-sm btn-info"
                type="button"
                onClick={this.showAdvertForm}
              >
                Add New Advert
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    advert: state.advertReducer,
  };
}

export default connect(mapStateToProps, { createAdvert })(AddNewAdvert);
