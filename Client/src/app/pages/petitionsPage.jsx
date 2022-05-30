import React, { useEffect } from "react";
import PetitionList from "../components/composedComponents/petitionsList";
import { usePetitions } from "../hooks/usePetitions";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PetitionsPage = () => {
    const { petitions, getPetitions, setPetitions } = usePetitions([]);
    const { user } = useAuth0();

    useEffect(() => {
        getPetitions();
    }, []);

    const filterMyPetitions = () => {
        setPetitions((prevState) =>
            prevState.filter((petition) => petition.creatorId === user.nickname)
        );
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 mt-5">
            <div className="d-flex justify-content-between w-75">
                <div className="d-flex flex-column justify-content-center w-25">
                    <div
                        className="btn btn-outline-warning"
                        style={{ fontSize: "1.3rem" }}
                        onClick={() => {
                            setPetitions((prevState) => {
                                const temp = [...prevState];
                                temp.sort((a, b) => {
                                    if (a.title < b.title) {
                                        return -1;
                                    }
                                    if (a.title > b.title) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                return temp;
                            });
                        }}
                    >
                        Filter by alphabetic order
                    </div>
                    <div
                        className="btn btn-outline-warning"
                        style={{ fontSize: "1.3rem" }}
                        onClick={() => {
                            setPetitions((prevState) => {
                                const temp = [...prevState];
                                temp.sort(
                                    (a, b) =>
                                        b.voicesDone / b.voicesRequired -
                                        a.voicesDone / a.voicesRequired
                                );
                                return temp;
                            });
                        }}
                    >
                        Filter by reaching goal
                    </div>
                    <div
                        className="btn btn-outline-warning"
                        style={{ fontSize: "1.3rem" }}
                        onClick={filterMyPetitions}
                    >
                        Show my petitions
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to="/petition/create">
                        <div
                            className="btn btn-outline-warning"
                            style={{ fontSize: "1.3rem" }}
                        >
                            Create petition
                        </div>
                    </Link>
                </div>
            </div>
            <PetitionList petitions={!petitions ? [] : petitions} />
        </div>
    );
};

export default PetitionsPage;
