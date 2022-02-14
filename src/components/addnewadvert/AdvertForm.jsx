import React, { Component, Fragment } from "react";

export default class AdvertForm extends Component {
  render() {
    return (
      <Fragment>
        <form onSubmit={this.props.submitNewAdvert}>
          <div className="row pl-3">
          </div>
          {!this.props.formValues.isForRent && !this.props.formValues.isForSale ? (
            <div className="row pl-3 mb-3">
              <small className="text-danger">Please, Select is it For Sale or For Rent</small>
            </div>
          ) : (
            ""
          )}
          <div className="row mb-3 mt-3">
            <label htmlFor="price" className="col-12 col-md-6">
              Price ($) <span className="text-danger">*</span>
              <input
                type="number"
                name="price"
                className="form-control"
                min="1"
                step="1"
                value={this.props.formValues.price}
                onChange={this.props.handleChange}
                required
              />
              
            </label>
            <label htmlFor="postcode" className="col-12 col-md-6">
              City<span className="text-danger">*</span>
              <input
                type="text"
                name="city"
                className="form-control"
                value={this.props.formValues.city}
                onChange={this.props.handleChange}
                placeholder="Toronto"
                required
              />
            </label>
          </div>
          <div className="row mb-3">
            <label htmlFor="postcode" className="col-12 col-md-8">
              Street Address <span className="text-danger">*</span>
              <input
                type="text"
                name="address"
                className="form-control"
                value={this.props.formValues.address}
                onChange={this.props.handleChange}
                placeholder="7 Lundy Lane"
                required
              />
            </label>
            <label htmlFor="postcode" className="col-12 col-md-4">
              Postal Code <span className="text-danger">*</span>
              <input
                type="text"
                name="postcode"
                className="form-control"
                value={this.props.formValues.postcode}
                onChange={this.props.handleChange}
                placeholder=""
                required
              />
            </label>
          </div>
          <div className="row mb-3">
            <label htmlFor="sqrMeter" className="col-6 col-md-3">
              Sq Feet
              <input
                type="number"
                className="form-control"
                name="sqrMeter"
                step="1"
                value={this.props.formValues.sqrMeter}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="numberOfRooms" className="col-6 col-md-3">
              Bedrooms <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="nrOfRooms"
                min="1"
                step="1"
                value={this.props.formValues.nrOfRooms}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="numberOfBathrooms" className="col-6 col-md-3">
              Bathrooms <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="nrOfBathrooms"
                min="1"
                step="1"
                value={this.props.formValues.nrOfBathrooms}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="row mb-3">
          </div>
          <div className="row mt-3">
            <label htmlFor="closingDate" className="col-12 col-md-6">
              Closing Date
              <input
                type="date"
                className="form-control"
                name="closingDate"
                value={this.props.formValues.closingDate}
                onChange={this.props.handleChange}
              />
            </label>

            <label htmlFor="parkings" className="col-12 col-md-6">
              Parking Spots
              <input
                type="text"
                className="form-control"
                name="parking"
                value={this.props.formValues.parking}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="col-12">
            <div className="row mt-3">
              <label htmlFor="description">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="7"
                name="description"
                value={this.props.formValues.description}
                onChange={this.props.handleChange}
                placeholder="Description"
                required
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <input className="btn btn-success" type="submit" value="Add New" />
          </div>
        </form>
      </Fragment>
    );
  }
}
