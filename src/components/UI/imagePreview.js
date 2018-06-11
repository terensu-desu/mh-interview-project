import React from "react";
import BlankIcon from "../../assets/icons/blank-icon.png";

const imagePreview = props => (
  <div className="modalWrapper_profile-image">
    <img
      id="profileImagePreview"
      src={props.profileImagePreview}
      alt="User Profile Pic"
      onError={() => {
        document.getElementById("profileImagePreview").src = BlankIcon;
      }}
    />
  </div>
);

export default imagePreview;
