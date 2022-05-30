import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validate from "../../utils/validators/validatorChooser";

const LoginForm = () => {
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: validate("email", signInData.email),
        password: validate("password", signInData.password)
    });

    const handleChange = (event) => {
        setErrors((prevState) => {
            return {
                ...prevState,
                [event.target.name]: validate(
                    event.target.name,
                    event.target.value
                )
            };
        });
        setSignInData((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    };

    const handleLogInAction = (event) => {
        event.preventDefault();
        if (errors.email.length === 0 && errors.password.length === 0) {
            // Create task here
            console.log("Logging in..............");
            console.log("Final data", signInData);
            navigate("/", { state: {}, replace: true });
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "85vh", fontSize: "1.15rem" }}
        >
            <div
                className="rounded"
                style={{ backgroundColor: "#feb236", color: "#2E1255" }}
            >
                <form className="d-flex flex-column justify-content-around m-5">
                    <div className="form-group m-4 mt-5">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.email}
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            aria-describedby="emailHelp"
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

                    <button
                        type="submit"
                        className={`btn m-4 ${
                            errors.email.length === 0 &&
                            errors.password.length === 0
                                ? ""
                                : "disabled"
                        }`}
                        style={{
                            backgroundColor: "#2E1255",
                            color: "#feb236"
                        }}
                        onClick={handleLogInAction}
                    >
                        Log in
                    </button>

                    <h4 className="text-center">
                        Do not have an account?{" "}
                        <Link to="/signUp">Sign Up</Link>
                    </h4>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
