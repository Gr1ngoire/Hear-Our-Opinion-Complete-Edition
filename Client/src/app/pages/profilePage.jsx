import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
    const { user } = useAuth0();

    return user ? (
        <div className="d-flex justify-content-center mt-5">
            <div className="d-flex justify-content-around badge badge-info w-75">
                <div className="d-flex flex-column">
                    <h1 className="display-3">Email:</h1>
                    <h1 className="display-3">Name:</h1>
                </div>
                <div className="d-flex flex-column">
                    <h1 className="display-3">{user.email}</h1>
                    <h1 className="display-3">{user.nickname}</h1>
                </div>
            </div>
        </div>
    ) : (
        "Loading........."
    );
};

export default ProfilePage;
