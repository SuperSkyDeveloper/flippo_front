import React, { Component, Fragment } from "react";
import Moment from "react-moment";

export default class AdvertInformation extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    const { advert } = this.props;

    return (
      <Fragment>
        <ul className="list-group">
          <li className="list-group-item active">Main</li>
          <li className="list-group-item">
            Price: ${this.numberWithSpaces(advert.price)}
          </li>

            {advert.sqrMeter ? (
                       <li className="list-group-item">
                         Price per m<sup>2</sup>: ~
                         ${Math.round(advert.price / advert.sqrMeter)}
                       </li>
                                  ) : (
              ""
            )}
          {advert.monthlyContibution ? (
            <li className="list-group-item">
              Monthly Payments: ${advert.monthlyContibution}
            </li>
          ) : (
            ""
          )}

          <li className="list-group-item">
            Advertisement published: <Moment fromNow>{advert.createdAt}</Moment>
          </li>
          <li className="list-group-item">Status: {advert.advertStatus}</li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">Real Estate Layout</li>
            <li className="list-group-item">
              Sq Feet: {advert.sqrMeter}
            </li>
          <li className="list-group-item">
            Bedrooms: {advert.nrOfRooms}
          </li>
          <li className="list-group-item">
            Bathrooms: {advert.nrOfBathrooms}
          </li>
        </ul>

        <ul className="list-group mt-3">
          {advert.heating ? (
            <li className="list-group-item">Heating: {advert.heating}</li>
          ) : (
            ""
          )}
          {advert.warmWater ? (
            <li className="list-group-item">Warm Water: {advert.warmWater}</li>
          ) : (
            ""
          )}
        </ul>
        {advert.storage || advert.parking ? (
          <ul className="list-group mt-3">
            <li className="list-group-item active">Dates</li>
            {advert.storage ? (
              <li className="list-group-item">Move-in/Closing: {advert.storage}</li>
            ) : (
              ""
            )}
          </ul>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
