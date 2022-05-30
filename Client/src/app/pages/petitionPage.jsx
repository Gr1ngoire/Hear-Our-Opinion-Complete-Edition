import React, { useEffect } from "react";
import { randomBootstrapColor } from "../utils/utils";
import { useParams, useNavigate } from "react-router-dom";
import { usePetitions } from "../hooks/usePetitions";
import { useAuth0 } from "@auth0/auth0-react";

const PetitionPage = () => {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { petitionId } = useParams();
    const {
        petitionById,
        getPetitionById,
        isLoading,
        deletePetition,
        updatePetition
    } = usePetitions();

    useEffect(() => {
        getPetitionById(petitionId);
    }, [petitionId]);

    const handlePetitionDeletion = (event) => {
        event.preventDefault();
        deletePetition(petitionById.petitionId);
        navigate("/petition", { state: {}, replace: true });
    };

    const handleSigning = () => {
        const payload = {
            ...petitionById,
            voicesDone: petitionById.voicesDone + 1,
            signers: [...petitionById.signers, user.nickname]
        };
        return payload;
    };

    const handleUnsigning = () => {
        const payload = {
            ...petitionById,
            voicesDone: petitionById.voicesDone - 1,
            signers: [
                ...petitionById.signers.slice(
                    0,
                    petitionById.signers.indexOf(user.nickname)
                ),
                ...petitionById.signers.slice(
                    petitionById.signers.indexOf(user.nickname) + 1
                )
            ]
        };
        return payload;
    };

    const handlePetitionSigningOrUnsigning = (event) => {
        event.preventDefault();
        // console.log(petitionById);
        const payload = petitionById.signers.includes(user.nickname)
            ? handleUnsigning(event)
            : handleSigning(event);
        // console.log(payload);
        updatePetition(payload);
        navigate(`/petition/${payload.petitionId}`, {
            state: {},
            replace: true
        });
    };

    return petitionById && !isLoading ? (
        <div className="d-flex justify-content-center w-100 mt-5">
            <div
                className="d-flex w-75 rounded p-3 mt-5"
                style={{ backgroundColor: "#feb236", color: "#2E1255" }}
            >
                <div className="shadow-lg d-flex flex-column justify-content-center rounded w-100">
                    <div className="d-flex flex-column">
                        <div
                            className="shadow d-flex justify-content-center m-1"
                            style={{ backgroundColor: "#E69B16" }}
                        >
                            <h2>{petitionById.title}</h2>
                        </div>
                        <div className="d-flex justify-content-between m-3">
                            <div className="d-flex flex-column justify-content-center bg-dark text-light rounded p-2">
                                <h3 className="text-center">
                                    Author: {petitionById.creatorId}
                                </h3>
                                <h3 className="text-center">
                                    Puplishing date: {petitionById.publishDate}
                                </h3>
                            </div>

                            {petitionById.creatorId === user.nickname ? (
                                <button
                                    className="d-flex align-items-center btn btn-danger p-4"
                                    onClick={handlePetitionDeletion}
                                >
                                    <i className="bi bi-trash">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                            />
                                        </svg>
                                    </i>
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-column m-1">
                        <p
                            className="text-center p-5"
                            style={{ fontSize: "1.5rem" }}
                        >
                            {petitionById.content}
                        </p>
                    </div>
                    <h3 className="text-center">Signers</h3>
                    <div className="shadow-lg d-flex bg-light p-3 m-4 rounded">
                        {petitionById.signers
                            ? petitionById.signers.map((signer) => {
                                  const badgeColor = randomBootstrapColor();
                                  return (
                                      <span
                                          key={Math.random()}
                                          style={{ fontSize: "1.25rem" }}
                                          className={`shadow m-2 text-${
                                              badgeColor === "info" ||
                                              badgeColor === "warning"
                                                  ? "dark"
                                                  : "light"
                                          } badge bg-${badgeColor}`}
                                      >
                                          {signer}
                                      </span>
                                  );
                              })
                            : "Loading.............."}
                    </div>
                    <div className="d-flex justify-content-end m-2 p-1">
                        {petitionById.creatorId !== user.nickname ? (
                            <div
                                className={`w-25 btn btn-${
                                    petitionById.signers.includes(user.nickname)
                                        ? "danger"
                                        : "success"
                                }`}
                                onClick={handlePetitionSigningOrUnsigning}
                            >
                                {petitionById.signers.includes(user.nickname)
                                    ? "Unsign"
                                    : "Sign"}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        "Loading....."
    );
};

export default PetitionPage;
