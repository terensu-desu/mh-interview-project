import React, { Component } from "react";
import { connect } from "react-redux";
//import classnames from "classnames";
import { openModal, searchChange } from "../modules/profiles";
import Icon from "./icon";
import LogoFull from "../assets/icons/logo-full.png";
import LogoSmall from "../assets/icons/logo-small.png";
import AddIcon from "../assets/icons/add-icon.png";
import Button from "./UI/button";

class Nav extends Component {
  handleAddProfileClick = () => {
    this.props.onAddProfileClick("addProfile");
  };
  handleSearch = event => {
    const query = event.target.value;
    this.props.onSearchChange(query);
  };
  handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  render() {
    const viewSize = window.innerWidth;
    console.log(viewSize);
    let addProfileButtonText = "";
    let logoType = LogoSmall;
    if (viewSize >= 768) {
      addProfileButtonText = "Add New Profile";
      logoType = LogoFull;
    }
    return (
      <div className="nav-bar">
        <a
          href="#!"
          title="Scroll top"
          className="nav-bar__logo nav-bar__element"
          onClick={this.handleScrollToTop}
        >
          <img src={logoType} alt="Brand logo" />
        </a>

        <div className="nav-bar__element">
          <div className="nav-bar__search-container textbox-with-icon-container">
            <Icon iconName="search-icon" />
            <input
              type="text"
              placeholder="search"
              className="nav-bar__search textbox"
              onChange={this.handleSearch}
            />
            <Button
              btnType="button_btn-add"
              clicked={this.handleAddProfileClick}
              name="addProfile"
            >
              <img
                src={AddIcon}
                alt="Add Profile"
                className="button_icon-add"
              />
              {addProfileButtonText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddProfileClick: modalType => dispatch(openModal(modalType)),
  onSearchChange: query => dispatch(searchChange(query))
});

export default connect(null, mapDispatchToProps)(Nav);
