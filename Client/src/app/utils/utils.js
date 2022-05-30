function percentsFrom(use, from) {
    return Math.floor((use / from) * 100);
}

function randomBootstrapColor() {
    const colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

export { percentsFrom, randomBootstrapColor };
