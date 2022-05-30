import React from "react";
import { percentsFrom } from "../../utils/utils";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PetitionCard = ({ id, title, voicesDone, voicesRequired }) => {
    return (
        <div
            className="card mt-3"
            style={{
                backgroundColor: "#2E1255",
                color: "#feb236",
                borderColor: "white",
                boxShadow: "0px 0px 15px rgba(255,255,255)"
            }}
        >
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="d-flex justify-content-around align-items-center">
                    <div className="d-flex justify-content-around align-items-center w-100">
                        <h5>{voicesDone}</h5>
                        <div className="progress w-75">
                            <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{
                                    width: `${percentsFrom(
                                        voicesDone,
                                        voicesRequired
                                    )}%`
                                }}
                            ></div>
                        </div>
                        <h5>{voicesRequired}</h5>
                    </div>
                    <Link to={"/petition/" + id}>
                        <div
                            className="btn"
                            style={{
                                backgroundColor: "#feb236",
                                color: "#2E1255",
                                fontSize: "1.25rem"
                            }}
                        >
                            Petition Description
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PetitionCard;
PetitionCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    voicesDone: PropTypes.number,
    voicesRequired: PropTypes.number
};
