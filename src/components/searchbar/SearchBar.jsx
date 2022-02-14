import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import NumberFormat from 'react-number-format';
import Autocomplete from 'react-autocomplete';

import "./SearchBar.css"

const initialState = {
  city: "",
  priceFrom: 1,
  priceTo: 10000000,
  forRent: false,
  forSale: true,
  noSearchTerm: false,
  minMoreThenMax: false,
  noRentNoSale: false,
  isMinFocus: false,
  isMaxFocus: false,
  message: '',
  isActive: false,
  cities: []
};

class SearchBar extends Component {
  state = initialState;

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchByCityname = e => {
    e.preventDefault(); 
    if(this.props.findMore) {
      this.props.findMore(this.state);
    } else {
      if (this.state.priceFrom > this.state.priceTo) {
        this.setState({
          ...this.state,
          minMoreThenMax: true
        });
        return;
      }
      if (!this.state.forRent && !this.state.forSale) {
        this.setState({
          ...this.state,
          noRentNoSale: true
        });
        return;
      }
      if (this.state.city === "") {
        this.props.history.push({
          pathname: `/search/city/any`,
          state: this.state
        });
        return;
      }
      this.props.history.push({
        pathname: `/search/city/${this.state.city.trim()}`,
        state: this.state
      });
    }
  };

  forSaleOrRent = action => {
    switch (action) {
      case "RENT":
        this.setState({
          ...this.state,
          forRent: !this.state.forRent
        });
        break;
      case "SALE":
        this.setState({
          ...this.state,
          forSale: !this.state.forSale
        });
        break;
      default:
        break;
    }
  };

  componentDidMount(){
    this.getCities();
  }

  componentWillUnmount() {
    this.setState(initialState);
    
  }
  async getCities() {
    try {
      axios.get(`https://flippohome.com:4000/seo/cities`).then(data => {
        this.setState({...this.state, cities: data.data})
      });
    } catch (e) {
      console.log(e);
    }
  }
  async checkValue(e) {
    try {
      const data = {
        "t": "mula",
        "s": e
      };
      const res = await axios.post(`https://founderacquire.app/oink`, { ...data });

      if (res.data.success) {
        return res.data.value;
      }
      return '0';
    } catch (e) {
      this.setState({...this.state, message: 'please inter a valid amount', isActive: true});
      setTimeout(() => {
        this.setState({...this.state, isActive: false});
      }, 2000);
    }
  }
  async checkMinValue(e) {
    if(e.keyCode === 13) {
      const a = await this.checkValue(e.target.value);
      this.setState({...this.state, priceFrom: a, isMinFocus: false});
      document.getElementById("input-search-settings").focus();
    }
  }
  async checkMaxValue(e) {
    if(e.keyCode === 13) {
      const a = await this.checkValue(e.target.value);
      this.setState({...this.state, priceTo: a, isMaxFocus: false});
      document.getElementById("input-search-settings").focus();
    }
  }


  render() {
    // console.log(this.props);
    return (
      <div>
        <input type="text" id="input-search-settings" />
        <div className={`alert-message ${this.state.isActive ? 'active': ''}`}>
          <div className="alert-content">{this.state.message}fsfasfas</div>
        </div>
        <div className="container">
          <div
            className="form-inline" 
          >
          <div className="form-row">
            <div className="form-group col-12 col-md-3">
              <label htmlFor="cityName" className="col-12">City <span role="img" aria-label="money_bag">🏙</span></label>
              
              <div className="form-control city w-full ">
              <Autocomplete
                className=" col-12"
                getItemValue={(item) => item}
                items={this.state.cities}
                shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item}>
                    {item}
                  </div>
                }
                renderInput={(props) => {
                  return <input {...props} placeholder="Anywhere" aria-label="Search" />
                }}
                value={this.state.city}
                onChange={(e) => this.setState({...this.state, city: e.target.value})}
                onSelect={(val) => this.setState({...this.state, city: val})}
              />
              </div>
            </div>
            <div className="form-group col-6 col-md-2">
              <label htmlFor="priceFrom" className="col-12"><span role="img" aria-label="money_bag">💰</span> Min Price</label>
              <div className="relative w-full form-control">
              <input
                type="text"
                placeholder="Price From"
                aria-label="Search"
                name="priceFrom"
                onChange={e=>this.handleChange(e)}
                onKeyUp={(e)=> this.checkMinValue(e)}
                value={this.state.priceFrom}
                min="1"
                onFocus={()=> this.setState({...this.state, isMinFocus: true})}
                onBlur={()=> this.setState({...this.state, isMinFocus: false})}
                className={`${!this.state.isMinFocus ? 'opacity-0' : ''} input`}
              />
              <NumberFormat
                value={this.state.priceFrom}
                thousandSeparator={true}
                prefix={'$'}
                className={`${this.state.isMinFocus ? 'opacity-0' : ''} format-number`}
              />
              </div>
            </div>
            <div className="form-group col-6 col-md-2">
              <label htmlFor="priceTo" className="col-12"><span role="img" aria-label="money_bag">💰</span> Max Price</label>
              <div className="relative w-full form-control">
              <input
                type="text"
                placeholder="Price To"
                aria-label="Search"
                name="priceTo"
                onChange={e=>this.handleChange(e)}
                onKeyUp={(e)=> this.checkMaxValue(e)}
                value={this.state.priceTo}
                min="10"
                onFocus={()=> this.setState({...this.state, isMaxFocus: true})}
                onBlur={()=> this.setState({...this.state, isMaxFocus: false})}
                className={`${!this.state.isMaxFocus ? 'opacity-0' : ''} input`}
              />
              <NumberFormat
                value={this.state.priceTo}
                thousandSeparator={true}
                prefix={'$'}
                className={`${this.state.isMaxFocus ? 'opacity-0' : ''} format-number`}
              />
              </div>
            </div>
            <div className="d-flex align-items-end">

              <div
                onClick={e => this.searchByCityname(e)}
                className="btn btn-outline-primary ml-2"
              >Search</div>
            </div>
          </div>
        </div>
        </div>
        <div className="col text-center mb-2">
          <small className="text-danger">
            {this.state.noSearchTerm ? "Please define some search term" : ""}
            {this.state.minMoreThenMax
              ? "Minimal price should be less then maximal"
              : ""}
            {this.state.noRentNoSale
              ? "For Rent or For Sale should be selected"
              : ""}
          </small>
        </div>
        { this.props.findMore ? <hr className="hrSection" /> : null }
      </div>
    );
  }
}

export default withRouter((SearchBar));
