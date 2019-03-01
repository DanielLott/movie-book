$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("form.login");
    var User_NameInput = $("input#User-input");
    var passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        User_Name: User_NameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.User_Name || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.User_Name, userData.password);
      UserNameInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(User_Name, password) {
      $.post("/api/login", {
        UserName: User_Name,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    }
  
  });
  