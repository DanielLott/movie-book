$(document).ready(function () {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var nameInput = $("input#name-input");
    var passwordInput = $("input#password-input");

    // When the form is submitted, we validate there's a name and password entered
    loginForm.on("submit", function (event) {
        event.preventDefault();
        var inputData = {
            name: nameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!inputData.name || !inputData.password) {
            return;
        }

        // If we have a name and password we run the loginFanatic function and clear the form
        loginFanatic(inputData.name, inputData.password);
        nameInput.val("");
        passwordInput.val("");
    });

    // loginFanatic does a post to our "api/login" route and if successful, redirects us the the home page
    function loginFanatic(inputName, inputPassword) {
        $.post("/api/login", {
            name: inputName,
            password: inputPassword
        }).then(function (data) {
            window.location.replace(data);
            // If there's an error, log the error
        }).catch(function (err) {
            console.log(err);
        });
    }

});