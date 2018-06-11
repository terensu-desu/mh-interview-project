import React, { Component } from "react";
import Button from "./button";
import LocationIcon from "../../assets/icons/location-icon.png";
import facebook from "../../assets/icons/facebook-icon.png";
import twitter from "../../assets/icons/twitter-icon.png";
import instagram from "../../assets/icons/instagram-icon.png";
import linkedin from "../../assets/icons/linedin-icon.png";
import google from "../../assets/icons/google-icon.png";

class Card extends Component {
  render() {
    let socialProfiles = null;
    if (this.props.user.socialProfiles) {
      socialProfiles = this.props.user.socialProfiles.map(site => {
        let image;
        if (site === "facebook") {
          image = facebook;
        } else if (site === "twitter") {
          image = twitter;
        } else if (site === "instagram") {
          image = instagram;
        } else if (site === "linkedin") {
          image = linkedin;
        } else if (site === "google") {
          image = google;
        }
        return (
          <span key={site}>
            <img src={image} alt="Social Profile" />
          </span>
        );
      });
    }
    return (
      <div className="cardWrapper_card">
        <div className="cardWrapper_card-image">
          <img src={this.props.user.picUrl} alt="User Profile Pic" />
        </div>
        <div className="cardWrapper_card-info">
          <p className="cardWrapper_card-name">{this.props.user.name}</p>
          <p className="cardWrapper_card-occupation">
            {this.props.user.occupation}
          </p>
          <p className="cardWrapper_card-location">
            <img
              className="cardWrapper_card-location-icon"
              src={LocationIcon}
              alt="Location Icon"
            />
            {this.props.user.city}, {this.props.user.state}
          </p>
          <div className="cardWrapper_card-icons">{socialProfiles}</div>
          <p className="cardWrapper_card-bio">{this.props.user.bio}</p>
          <div className="cardWrapper_card-buttons">
            <Button btnType="button_btn-filled">View Details</Button>
            <Button btnType="button_btn-clear" clicked={this.props.editProfile}>
              Edit
            </Button>
            <Button
              btnType="button_btn-danger"
              clicked={this.props.deleteProfile}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
