export const titleValidator = (title) => {
    if (title.trim().length === 0) {
        return "Title can not be empty";
    }
    return "";
};
