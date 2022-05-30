import React from "react";
import PetitionCard from "../singleComponents/petitionCard";
import PropTypes from "prop-types";

const PetitionList = ({ petitions }) => {
    return (
        <div
            className="d-flex justify-content-center align-items-center mt-3 w-100"
            style={{ width: "100vw" }}
        >
            <div className="d-flex flex-column w-75">
                {petitions.map((petition) => (
                    <PetitionCard
                        key={Math.random()}
                        id={petition.petitionId}
                        title={petition.title}
                        voicesDone={petition.voicesDone}
                        voicesRequired={petition.voicesRequired}
                    />
                ))}
            </div>
        </div>
    );
};

export default PetitionList;
PetitionList.propTypes = {
    petitions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
