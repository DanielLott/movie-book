$(document).ready(function() {
  console.log("js loading")
    // Getting references to our form and input
    var signUpForm = $(".signup");
    
    // When the signup button is clicked, we validate the user name and password are not blank
    signUpForm.on("submit", function(event) {
      var User_NameInput = $("#User-input").val().trim();
      var passwordInput = $("#password-input").val().trim();
      console.log("signup form submit");
      event.preventDefault();
      var userData = {
        User_Name: User_NameInput,
        password: passwordInput
      };
  
      if (!userData.User_Name || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.User_Name, userData.password);
      // User_NameInput.val("");
      // passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(User_Name, password) {
      console.log("signup function running");
      $.post("/api/signup", {
        User_Name: User_Name,
        password: password
      }).then(function(data) {
         window.location.replace(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  