export const requiredVoicesValdator = (voicesRequired) => {
    if (voicesRequired.length === 0) {
        return "Required voices can not be empty";
    } else if (!voicesRequired.match(/[1-9]\d*/gi)) {
        return "Required voices must be a number";
    } else if (!Number.isInteger(Number(voicesRequired))) {
        return "Required voices must be an integer";
    } else if (
        Number(voicesRequired) < 100 ||
        Number(voicesRequired) > 1000000
    ) {
        return "Required voices must be between 100 and 1000000";
    }
    return "";
};
