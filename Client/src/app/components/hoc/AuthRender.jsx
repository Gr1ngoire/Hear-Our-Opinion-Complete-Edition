import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthRender = ({ children }) => {
    const { isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        toast.warn("You need to log in to start working with petitions");
        return <Navigate to="/" replace />;
    }
    return children;
};

AuthRender.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthRender;
