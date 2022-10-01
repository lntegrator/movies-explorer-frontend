import React from "react";
import ProfileForm from "../ProfileForm/ProfileForm";
import './Profile.css';

function Profile({ onSignOut, onSubmit }){
    return(
        <section className="profile">
            <ProfileForm
                onSignOut={onSignOut}
                onSubmit={onSubmit}
            />
        </section>
    )
}

export default Profile;