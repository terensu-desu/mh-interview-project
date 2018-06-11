import React, { Component } from "react";
import { connect } from "react-redux";

import { editProfile, closeModal } from "../../modules/profiles";
import checkValidity from "../../modules/formValidation";
import handleUpperCase from "../../modules/handleUpperCase";
import stateOptions from "../../modules/stateOptions";

import Aux from "../../hoc/aux";
import Button from "../UI/button";
import Input from "../UI/input";
import Textarea from "../UI/textarea";
import Select from "../UI/select";
import ImagePreview from "../UI/imagePreview";

import facebookIcon from "../../assets/icons/facebook-icon.png";
import twitterIcon from "../../assets/icons/twitter-icon.png";
import instagramIcon from "../../assets/icons/instagram-icon.png";
import linkedinIcon from "../../assets/icons/linedin-icon.png";
import googleIcon from "../../assets/icons/google-icon.png";
import facebookIconOff from "../../assets/icons/facebook-icon-off.png";
import twitterIconOff from "../../assets/icons/twitter-icon-off.png";
import instagramIconOff from "../../assets/icons/instagram-icon-off.png";
import linkedinIconOff from "../../assets/icons/linedin-icon-off.png";
import googleIconOff from "../../assets/icons/google-icon-off.png";
import CloseModalIcon from "../../assets/icons/close-icon-modal.png";

class EditProfileModal extends Component {
  state = {
    formData: {
      picUrl: {},
      name: {},
      occupation: {},
      city: {},
      state: {},
      bio: {},
      socialProfiles: []
    },
    formValidity: true,
    ready: false,
    previousName: "",
    error: "Field is required"
  };
  componentDidMount() {
    if (!this.state.ready) {
      this.setState({
        formData: {
          picUrl: {
            value: this.props.user.picUrl,
            validation: {
              required: true
            },
            touched: false,
            valid: true
          },
          name: {
            value: this.props.user.name,
            error: "First and last names are required.",
            validation: {
              required: true,
              fullName: true
            },
            touched: false,
            valid: true
          },
          occupation: {
            value: this.props.user.occupation,
            validation: {
              required: true
            },
            touched: false,
            valid: true
          },
          city: {
            value: this.props.user.city,
            validation: {
              required: true
            },
            touched: false,
            valid: true
          },
          state: {
            value: this.props.user.state,
            validation: {
              required: true,
              state: true
            },
            error: "Please choose a state.",
            touched: false,
            valid: true
          },
          bio: {
            value: this.props.user.bio,
            validation: {
              required: true,
              minLength: 20,
              maxLength: 500
            },
            touched: false,
            error: "Bio must be between 20 and 500 characters.",
            valid: true
          },
          socialProfiles: [
            {
              name: "facebook",
              status: this.props.user.socialProfiles.includes("facebook")
            },
            {
              name: "twitter",
              status: this.props.user.socialProfiles.includes("twitter")
            },
            {
              name: "instagram",
              status: this.props.user.socialProfiles.includes("instagram")
            },
            {
              name: "linkedin",
              status: this.props.user.socialProfiles.includes("linkedin")
            },
            {
              name: "google",
              status: this.props.user.socialProfiles.includes("google")
            }
          ]
        },
        formValidity: true,
        ready: true,
        previousName: this.props.user.name
      });
    }
  }

  // Toggles socialProfiles UI to be colored or grayed out
  handleIconClick = identifier => {
    const siteIndex = this.state.formData.socialProfiles
      .map(site => site.name)
      .indexOf(identifier);
    const updatedSocialProfiles = [...this.state.formData.socialProfiles];
    updatedSocialProfiles[siteIndex].status = !this.state.formData
      .socialProfiles[siteIndex].status;
    this.setState(prevState => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          socialProfiles: updatedSocialProfiles
        }
      };
    });
  };

  // Takes values, runs validation, updates touched state for errors
  // sets state and overall form validity
  handleChange = (event, identifier) => {
    const updatedFormData = { ...this.state.formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedFormData[identifier] = updatedFormElement;
    let formIsValid = true;
    for (let identifier in updatedFormData) {
      if (identifier === "socialProfiles") {
        formIsValid = true;
      } else {
        formIsValid = updatedFormData[identifier].valid && formIsValid;
      }
    }
    this.setState({
      formData: updatedFormData,
      formValidity: formIsValid
    });
  };

  // Prevents submit if form is invalid
  // Adjusts first letter of names, occupation, and city to uppercase
  handleOnSubmit = () => {
    if (!this.state.formValidity) {
      return false;
    }
    const names = this.state.formData.name.value.split(" ");
    const correctedNames = [
      handleUpperCase(names[0]),
      handleUpperCase(names[1])
    ].join(" ");
    const correctedOccupation = handleUpperCase(
      this.state.formData.occupation.value
    );
    const correctedCity = handleUpperCase(this.state.formData.city.value);
    const updatedSocialProfiles = [];
    for (let site of this.state.formData.socialProfiles) {
      if (site.status) {
        updatedSocialProfiles.push(site.name);
      }
    }
    console.log(updatedSocialProfiles);
    const userData = {
      picUrl: this.state.formData.picUrl.value,
      name: correctedNames,
      occupation: correctedOccupation,
      city: correctedCity,
      state: this.state.formData.state.value,
      bio: this.state.formData.bio.value,
      socialProfiles: updatedSocialProfiles
    };
    this.props.onEditProfile(userData, this.state.previousName);
    this.props.onCloseModal();
  };

  render() {
    let form = null;
    if (this.state.ready) {
      const socialProfilesIcons = this.state.formData.socialProfiles.map(
        site => {
          let image;
          if (site.name === "facebook") {
            if (site.status) {
              image = facebookIcon;
            } else {
              image = facebookIconOff;
            }
          } else if (site.name === "twitter") {
            if (site.status) {
              image = twitterIcon;
            } else {
              image = twitterIconOff;
            }
          } else if (site.name === "instagram") {
            if (site.status) {
              image = instagramIcon;
            } else {
              image = instagramIconOff;
            }
          } else if (site.name === "linkedin") {
            if (site.status) {
              image = linkedinIcon;
            } else {
              image = linkedinIconOff;
            }
          } else if (site.name === "google") {
            if (site.status) {
              image = googleIcon;
            } else {
              image = googleIconOff;
            }
          }
          return (
            <span key={site.name}>
              <img
                src={image}
                alt="Social Profile"
                onClick={() => this.handleIconClick(site.name)}
              />
            </span>
          );
        }
      );
      form = (
        <Aux>
          <ImagePreview
            profileImagePreview={this.state.formData.picUrl.value}
          />
          <div className="formWrapper_wrapper">
            <img
              className="formWrapper_closeModalIcon"
              src={CloseModalIcon}
              alt="close"
              onClick={this.props.onCloseModal}
            />
            <h2 className="formWrapper_formHeader">Edit Profile</h2>
            <Input
              value={this.state.formData.picUrl.value}
              valid={this.state.formData.picUrl.valid}
              touched={this.state.formData.picUrl.touched}
              error={this.state.error}
              name="picUrl"
              placeholder="Picture URL"
              onChange={event => this.handleChange(event, "picUrl")}
              classType="inputWrapper_inputField-picUrl"
            />
            <Input
              value={this.state.formData.name.value}
              valid={this.state.formData.name.valid}
              touched={this.state.formData.name.touched}
              error={this.state.formData.name.error}
              name="name"
              placeholder="Name"
              onChange={event => this.handleChange(event, "name")}
              classType=""
            />
            <Input
              value={this.state.formData.occupation.value}
              valid={this.state.formData.occupation.valid}
              touched={this.state.formData.occupation.touched}
              error={this.state.error}
              name="occupation"
              placeholder="Occupation"
              onChange={event => this.handleChange(event, "occupation")}
              classType=""
            />
            <Input
              value={this.state.formData.city.value}
              valid={this.state.formData.city.valid}
              touched={this.state.formData.city.touched}
              error={this.state.error}
              name="city"
              placeholder="City"
              onChange={event => this.handleChange(event, "city")}
              classType="inputWrapper_inputField-city"
            />
            <Select
              value={this.state.formData.state.value}
              valid={this.state.formData.state.valid}
              options={stateOptions}
              touched={this.state.formData.state.touched}
              error={this.state.formData.state.error}
              name="state"
              onChange={event => this.handleChange(event, "state")}
              classType="inputWrapper_inputField-state"
            />
            <Textarea
              value={this.state.formData.bio.value}
              valid={this.state.formData.bio.valid}
              touched={this.state.formData.bio.touched}
              error={this.state.formData.bio.error}
              name="bio"
              placeholder="A Short Bio"
              onChange={event => this.handleChange(event, "bio")}
              classType="inputWrapper_textareaField-bio"
            />
            <div className="formWrapper_profile-icons">
              <p>Social Profiles</p>
              {socialProfilesIcons}
            </div>
            <div className="formWrapper_formButtons">
              <Button
                btnType={
                  this.state.formValidity
                    ? "button_btn-filled"
                    : "button_btn-disabled"
                }
                clicked={this.handleOnSubmit}
              >
                Save
              </Button>
              <Button
                btnType="button_btn-clear"
                clicked={this.props.onCloseModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Aux>
      );
    }
    return <div>{form}</div>;
  }
}

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => dispatch(closeModal()),
  onEditProfile: (userData, previousName) =>
    dispatch(editProfile(userData, previousName))
});

export default connect(null, mapDispatchToProps)(EditProfileModal);
