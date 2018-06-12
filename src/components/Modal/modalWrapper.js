import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../modules/profiles";

import Aux from "../../hoc/aux";
import Backdrop from "./backdrop";
import AddProfileModal from "./addProfileModal";
import EditProfileModal from "./editProfileModal";
import DeleteProfileModal from "./deleteProfileModal";

class ModalWrapper extends Component {
  render() {
    let modalContent = null;
    if (this.props.modalType === "addProfile") {
      modalContent = <AddProfileModal />;
    } else if (this.props.modalType === "editProfile") {
      modalContent = <EditProfileModal user={this.props.targetUser} />;
    } else if (this.props.modalType === "deleteProfile") {
      modalContent = <DeleteProfileModal user={this.props.targetUser} />;
    }
    return (
      <Aux>
        <Backdrop
          show={this.props.isModalOpen}
          clicked={this.props.onModalClose}
        />
        <div
          className="modalWrapper_modal"
          style={{
            transform: this.props.isModalOpen
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.isModalOpen ? "1" : "0"
          }}
        >
          {modalContent}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  isModalOpen: state.profiles.isModalOpen,
  modalType: state.profiles.modalType,
  targetUser: state.profiles.targetUser
});

const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
