import React, { Component } from "react";
//import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { loadInitialProfiles, openModal } from "../../modules/profiles";
import Nav from "../../components/nav";
import Card from "../../components/UI/card";
import ModalWrapper from "../../components/Modal/modalWrapper";

class Home extends Component {
  componentDidMount() {
    this.props.loadInitialProfiles();
  }
  render() {
    const { profileItems } = this.props;
    let list = null;
    if (profileItems) {
      profileItems.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      // map to display all profile cards
      list = profileItems.map((item, index) => (
        <Card
          key={index}
          user={item}
          editProfile={() => this.props.openModal("editProfile", item)}
          deleteProfile={() => this.props.openModal("deleteProfile", item)}
        />
      ));
      // Handle search result display via search term in redux store
      if (this.props.searchTerm.length > 0) {
        // create an array of indexes that matched search term
        let searchResults = [];
        for (let item in profileItems) {
          if (
            profileItems[item].name
              .toLowerCase()
              .includes(this.props.searchTerm)
          ) {
            searchResults[item] = item;
          } else if (
            profileItems[item].bio.toLowerCase().includes(this.props.searchTerm)
          ) {
            searchResults[item] = item;
          }
        }
        // map the cards to display if the index matches an index in the array
        list = profileItems
          .map((item, index) => {
            if (searchResults[index]) {
              return (
                <Card
                  key={index}
                  user={item}
                  editProfile={() => this.props.openModal("editProfile", item)}
                  deleteProfile={() =>
                    this.props.openModal("deleteProfile", item)
                  }
                />
              );
            }
            return null;
          })
          .filter(item => item !== null);
      }
    }
    return (
      <div>
        <Nav />
        <div className="mainContent">
          <h1 className="mainContent_header">
            {!this.props.searchTerm ? "User Profiles " : "Search Results "}
            <span>
              ({!this.props.searchTerm ? profileItems.length : list.length})
            </span>
          </h1>
          <div className="cardWrapper_container">
            {list.length > 0 ? (
              list
            ) : (
              <h2 className="mainContent_noResults">
                Sorry, no results found for "<strong>
                  {this.props.searchTerm}
                </strong>."
              </h2>
            )}
          </div>
        </div>
        <ModalWrapper />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profileItems: state.profiles.items,
  searchTerm: state.profiles.searchTerm
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadInitialProfiles,
      openModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
