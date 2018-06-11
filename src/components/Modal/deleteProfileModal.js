import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteProfile, closeModal } from "../../modules/profiles";
import Button from "../UI/button";
import CloseModalIcon from "../../assets/icons/close-icon-modal.png";

class DeleteProfileModal extends Component {
  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.targetUser);
    this.props.onCloseModal();
  };
  render() {
    return (
      <div className="formWrapper_wrapper-delete">
        <img
          className="formWrapper_closeModalIcon"
          src={CloseModalIcon}
          alt="close"
          onClick={this.props.onCloseModal}
        />
        <h2 className="formWrapper_formHeader">Delete Profile</h2>
        <p>
          Are you sure you want to delete{" "}
          <strong>{this.props.targetUser.name}</strong>?
        </p>
        <div className="formWrapper_formButtons">
          <Button btnType="button_btn-filled" clicked={this.handleDeleteClick}>
            Delete
          </Button>
          <Button btnType="button_btn-clear" clicked={this.props.onCloseModal}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  targetUser: state.profiles.targetUser
});

const mapDispatchToProps = dispatch => ({
  onDeleteClick: targetUser => dispatch(deleteProfile(targetUser)),
  onCloseModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfileModal);
