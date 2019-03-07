$(document).ready(function () {
    // This file just does a GET request to figure out which fanatic is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function (data) {
        $(".user-name").text(data.name);
    });
});
