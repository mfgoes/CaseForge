document.getElementById("toggle-view-btn").addEventListener("click", function () {
    let icon = this.querySelector("i");
    if (icon.classList.contains("fa-toggle-on")) {
        icon.classList.replace("fa-toggle-on", "fa-toggle-off");
    } else {
        icon.classList.replace("fa-toggle-off", "fa-toggle-on");
    }
});
