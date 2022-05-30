import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const DropdownHeaderMenu = () => {
    const { user, logout } = useAuth0();

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle"
                style={{
                    backgroundColor: "#feb236",
                    color: "#2E1255"
                }}
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={toggleMenu}
            >
                {user.nickname}
            </button>
            <div
                className={`p-2 dropdown-menu ${isOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
                style={{
                    right: "0",
                    backgroundColor: "#2E1255",
                    color: "#feb236"
                }}
            >
                <Link className="text-center" to="/profile">
                    <button
                        className="dropdown-item btn mb-2"
                        style={{
                            backgroundColor: "#feb236",
                            color: "#2E1255"
                        }}
                    >
                        Profile
                    </button>
                </Link>

                <div className="text-center">
                    <button
                        className="btn dropdown-item"
                        style={{
                            backgroundColor: "#feb236",
                            color: "#2E1255"
                        }}
                        onClick={logout}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DropdownHeaderMenu;
