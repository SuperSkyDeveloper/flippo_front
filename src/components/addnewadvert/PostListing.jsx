import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdvert } from "../../actions/advert";
import AdvertForm from "./AdvertForm";
import { withRouter } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";

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
    if(nextProps?.advert?.lastAddedAdvert?.id && nextProps?.advert?.redirect){
      setTimeout(() => {
        this.props.history.push(`/edit/x-for-sale/${nextProps?.advert?.lastAddedAdvert?.id}`,{
            id : nextProps?.advert?.lastAddedAdvert?.id
        });
        this.setState({ isLoading : false })
      }, 3000);
    }
    else{
      this.setState({ isLoading : false })
    }
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
        {!this.state.isLoading && <div className="">
          <h5 className="card-title greenUnderline m-3">Post New Assignment Listing</h5>
            <div className="col-12 my-3">
              <AdvertForm
                submitNewAdvert={(e) => {this.submitNewAdvert(e); this.setState({ isLoading : true })}}
                handleChange={this.handleChange}
                formValues={this.state}
                forRentForSale={this.forRentForSale}
              />
            </div>
        </div>}
        {this.state.isLoading && <div className="w-100 min-vh-100 flex justify-content-center align-items-center">
          <BeatLoader color="#17a2b8" />
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    advert: state.advertReducer,
  };
}

export default withRouter(connect(mapStateToProps, { createAdvert })(AddNewAdvert));