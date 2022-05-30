import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validate from "../../utils/validators/validatorChooser";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        name: validate("name", signUpData.name),
        email: validate("email", signUpData.email),
        password: validate("password", signUpData.password),
        privacyPolicy: validate("privacyPolicy", "")
    });

    const handleChange = (event) => {
        setErrors((prevState) => {
            return {
                ...prevState,
                [event.target.name]: validate(
                    event.target.name,
                    event.target.name === "privacyPolicy"
                        ? event.target.checked
                        : event.target.value
                )
            };
        });
        setSignUpData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    };

    const handleSignUpAction = (event) => {
        event.preventDefault();
        if (
            errors.name.length === 0 &&
            errors.email.length === 0 &&
            errors.password.length === 0
        ) {
            // Create task here
            console.log("Signing up..............");
            console.log("Final data", signUpData);
            navigate("/", { state: {}, replace: true });
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center mt-4"
            style={{ height: "85vh", fontSize: "1.15rem" }}
        >
            <div
                className="rounded mt-5"
                style={{ backgroundColor: "#feb236", color: "#2E1255" }}
            >
                <form className="d-flex flex-column justify-content-around m-3">
                    <div className="form-group m-4 mt-3">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.name}
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group m-4">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.email}
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group m-4">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.password}
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-check m-4">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.privacyPolicy}
                        </label>
                        <div>
                            <input
                                type="checkbox"
                                name="privacyPolicy"
                                className="form-check-input"
                                style={{ backgroundColor: "#2E1255" }}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">
                                I accept <a href="/">privacy policy</a>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`btn m-4 ${
                            errors.name.length === 0 &&
                            errors.email.length === 0 &&
                            errors.password.length === 0 &&
                            errors.privacyPolicy.length === 0
                                ? ""
                                : "disabled"
                        }`}
                        style={{
                            backgroundColor: "#2E1255",
                            color: "#feb236"
                        }}
                        onClick={handleSignUpAction}
                    >
                        Sign Up
                    </button>
                    <h4 className="text-center">
                        Do you already have an account?{" "}
                        <Link to="/signIn">Sign In</Link>
                    </h4>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
