import React, { useState } from "react";
import validate from "../utils/validators/validatorChooser";
import { useNavigate } from "react-router-dom";
import { usePetitions } from "../hooks/usePetitions";
import { useAuth0 } from "@auth0/auth0-react";

const CreatePetitionPage = () => {
    const { user } = useAuth0();
    const { createPetition } = usePetitions();
    const navigate = useNavigate();
    const [newPetitionState, setNewPetitionState] = useState({
        publishDate: "",
        creatorId: user.nickname,
        title: "",
        content: "",
        voicesDone: "1",
        requiredVoices: "",
        signers: [user.nickname]
    });
    const [errors, setErrors] = useState({
        title: validate("title", newPetitionState.title),
        content: validate("content", newPetitionState.content),
        requiredVoices: validate(
            "requiredVoices",
            newPetitionState.requiredVoices
        )
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
        setNewPetitionState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    };

    const handleCreationAction = (event) => {
        event.preventDefault();
        if (
            errors.title.length === 0 &&
            errors.content.length === 0 &&
            errors.requiredVoices.length === 0
        ) {
            // Create task here
            console.log("Creating petition..............");
            const timeStamp = new Date();
            createPetition({
                ...newPetitionState,
                publishDate: `${timeStamp
                    .toString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ")}`
            });
            navigate("/petition", { state: {}, replace: true });
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center mt-5"
            style={{ height: "85vh" }}
        >
            <div
                className="w-50 rounded"
                style={{ backgroundColor: "#feb236", color: "#2E1255" }}
            >
                <form className="d-flex flex-column justify-content-around m-2">
                    <div className="form-group m-4 mt-5">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.title}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group m-4">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.content}
                        </label>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Content"
                            name="content"
                            onChange={handleChange}
                            style={{ height: "20vh" }}
                        />
                    </div>
                    <div className="form-group m-4">
                        <label className="w-50 bg-danger text-light text-center rounded">
                            {errors.requiredVoices}
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Required voices"
                            name="requiredVoices"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn m-4 ${
                            errors.title.length === 0 &&
                            errors.content.length === 0 &&
                            errors.requiredVoices.length === 0
                                ? ""
                                : "disabled"
                        }`}
                        onClick={handleCreationAction}
                        style={{
                            backgroundColor: "#2E1255",
                            color: "#feb236"
                        }}
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePetitionPage;
