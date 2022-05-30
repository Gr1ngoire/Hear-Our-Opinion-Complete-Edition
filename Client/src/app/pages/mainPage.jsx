import React from "react";
import PeopleAnimDiv from "../components/singleComponents/peopleAnimDiv";
import PersonAnimDiv from "../components/singleComponents/personAnimDiv";
import "../../css/main.css";

const circles = [];
for (let i = 0; i < 9; i++) {
    circles.push(
        <div
            className="d-flex justify-content-around align-items-center"
            id="outerCircleContainer"
            key={i}
        >
            <div className="align-self-senter" id="innerCircleContainer"></div>
        </div>
    );
}

const listenersSvgsPairDivs = [];
const pairsLimit = 3;
for (let i = 0; i < pairsLimit; i++) {
    const buffer = [];
    for (let j = 0; j < 2; j++) {
        buffer.push(
            <div
                className="bg-white rounded-circle outskirtsPeople"
                key={(i + 1) * j + "ki"}
            >
                <PeopleAnimDiv />
            </div>
        );
    }
    if (i === Math.floor(pairsLimit / 2)) {
        buffer.push(
            <div
                className="bg-white rounded-circle"
                key={i + "i"}
                id="centerPerson"
            >
                <PersonAnimDiv />
            </div>
        );
        const temp = buffer[Math.floor(buffer.length / 2)];
        buffer[Math.floor(buffer.length / 2)] = buffer[buffer.length - 1];
        buffer[buffer.length - 1] = temp;
    }
    listenersSvgsPairDivs.push(buffer);
}

const MainPage = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="d-flex flex-column justify-content-around w-100"
                style={{ zIndex: "1", height: "85vh" }}
            >
                {listenersSvgsPairDivs.map((pairdiv) => (
                    <div
                        className="d-flex align-items-center justify-content-around"
                        key={Math.random()}
                    >
                        {pairdiv.map((el) => el)}
                    </div>
                ))}
            </div>
            {circles}
        </div>
    );
};

export default MainPage;
