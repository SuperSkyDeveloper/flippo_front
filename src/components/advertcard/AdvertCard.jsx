import React, { Component } from "react";
import { Link } from "react-router-dom";
import bed from "../../assets/images/vector.png"
import bath from "../../assets/images/bath3.png"
import wall from "../../assets/images/wall.png"
import heart from "../../assets/images/heart.png"
export default class AdvertCard extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { advert , isEdit } = this.props;
    console.log(this.props,"<--thisssss")
    const advertImage =
      advert.image ||
      "https://res.cloudinary.com/dpjzmbojz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1597782723/No_image_3x4.svg_dqj5vw.png";

    return (
      <div className="col-12 col-md-6 col-lg-4 mt-3">
        <div className="card h-100">
          
          <img
            className="card-img-top"
            style={{ maxHeight: "30vh", objectFit: "cover" }}
            src={advertImage}
            alt={`${advert.isForRent ? "For rent:" : "For Sale:"} ${
              advert.address
            }, ${advert.city}, ${advert.postcode}`}
          />
          <a style={{position:'absolute',left:'85%',top:'2%'}}>
          <img style={{height:'30px',width:'30px'}} onClick={()=>{console.log("anything")}} src={heart}/>
          </a>
          <div className="card-body d-flex flex-column">
          <h5 className="card-text">
              ${this.numberWithSpaces(advert.price)}
              </h5> 
              <div style={{display:'flex',justifyContent:"space-evenly",right:'11%',position:'relative',top:'5%'}}>
                <div style={{display:'flex'}}>
                <img style={{height:20,width:20}} src={bed}/>
                <p style={{marginLeft:'10px'}}>{advert?.nrOfBathrooms}</p>
                </div>
                <div style={{display:'flex'}}>
                <img style={{height:20,width:20}} src={bath}/>
                <p style={{marginLeft:'10px'}}>{advert?.nrOfBathrooms}</p>
                </div>
                <div style={{display:'flex'}}>
                <img style={{height:20,width:20}} src={bath}/>
                <p style={{marginLeft:'10px'}}>{advert?.sqrMeter} sqft</p>
                </div>
              </div>
            <p className="card-text" style={{color:'#646464',fontSize:'16px'}}>
              {advert.address}, {advert.city}
            </p>
            <div style={{ borderTop: "1px solid #C4C4C4 ", marginLeft: 20, marginRight: 20 }}>
              <div style={{display:'flex',marginTop:'5%',fontSize:'14px'}}>
                <p style={{right:20,position:'relative'}}>Closing Date {advert?.closingDate}</p>

                <div style={{display:'flex',marginLeft:'30px'}}>
                  <img style={{height:'20px',width:'20px',marginRight:'5px'}} src={wall}/>
                  <p>TRIDEL</p>
                </div>
              </div>
            </div>
           {!isEdit && <Link to={`/x-for-sale/${advert.id}`} className="btn btn-info">
              READ MORE
            </Link>}
            {isEdit && <Link to={`/edit/x-for-sale/${advert.id}`} className="btn btn-info">
              READ MORE
            </Link>}
          </div>
        </div>
      </div>
    );
  }
}