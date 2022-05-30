export const contentValidator = (content) => {
    if (content.trim().length === 0) {
        return "Content can not be empty";
    }
    return "";
};
