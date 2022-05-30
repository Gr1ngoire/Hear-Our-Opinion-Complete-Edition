import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";

const HeaderMenu = () => {
    const { user, loginWithRedirect, logout } = useAuth0();
    return (
        <nav
            className="d-flex justify-content-between navbar navbar-expand-sm p-2"
            style={{
                backgroundColor: "#2E1255",
                boxShadow: "1.5px 3px #888888",
                zIndex: "1"
            }}
        >
            <div className="d-flex" id="navbarSupportedContent">
                <Link
                    className="nav-link text-center"
                    style={{
                        color: "#feb236",
                        textShadow: "2px 2px 4px #000000"
                    }}
                    to="/"
                >
                    <h4>Main</h4>
                </Link>
                {user ? (
                    <Link
                        className="nav-link text-center"
                        style={{
                            color: "#feb236",
                            textShadow: "2px 2px 4px #000000"
                        }}
                        to="/petition"
                    >
                        <h4>Petitions</h4>
                    </Link>
                ) : (
                    ""
                )}
            </div>
            <div>
                <h1
                    className="display-5 text-center"
                    style={{ color: "#feb236" }}
                >
                    Your opinion will be heard!
                </h1>
            </div>
            {user ? (
                <div className="d-flex justify-content-around">
                    <Link
                        className="nav-link text-center"
                        style={{
                            color: "#feb236",
                            textShadow: "2px 2px 4px #000000"
                        }}
                        to="/profile"
                    >
                        <h4>{user.nickname}`s profile</h4>
                    </Link>
                    <button
                        className="nav-link text-center"
                        style={{
                            border: "none",
                            outline: "none",
                            backgroundColor: "#2E1255",
                            color: "#feb236",
                            textShadow: "2px 2px 4px #000000"
                        }}
                        onClick={logout}
                    >
                        <i className="bi bi-door-closed">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                fill="currentColor"
                                className="bi bi-door-closed"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                            </svg>
                        </i>
                    </button>
                </div>
            ) : (
                <button
                    className="nav-link text-center"
                    style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "#2E1255",
                        color: "#feb236",
                        textShadow: "2px 2px 4px #000000"
                    }}
                    onClick={loginWithRedirect}
                >
                    <h4>Sign In/Up</h4>
                </button>
            )}
        </nav>
    );
};

export default HeaderMenu;

// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
//   <title>Sign In with Auth0</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
// </head>
//   <style>
//     body, html {
//       height: 100%;
//       background-color: #2E1255;
//     }

//     .login-container {
//       position: relative;
//       height: 100%;
//     }

//     .login-box {
//       position: absolute;
//       top: 50%;
//       transform: translateY(-50%);
//       padding: 15px;
//       background-color: #feb236;
//       box-shadow: 0px 5px 5px #ccc;
//       border-radius: 5px;
//       border-top: 1px solid #e9e9e9;
//     }

//     .login-header {
//       text-align: center;
//       color: #2E1255;
//     }

//     .login-header img {
//       width: 75px;
//     }

//     #error-message {
//       display: none;
//       white-space: break-spaces;
//     }
//   </style>
// <body>
//   <div class="login-container">
//     <div class="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
//       <div class="login-header">
//         <img src="https://www.svgrepo.com/show/107144/voice-brand.svg"/>
//         <h3>Greetings!</h3>
//         <h5 id="actionText">PLEASE LOG IN</h5>
//       </div>
//       <div id="error-message" class="alert alert-danger"></div>
//       <form onsubmit="return false;" method="post">
//         <div class="form-group">
//          <label for="name" style="color: #2E1255">Email</label>
//           <input
//             type="email"
//             class="form-control"
//             id="email"
//             placeholder="Enter your email">
//         </div>
//         <div class="form-group">
//           <label for="name" style="color: #2E1255">Password</label>
//           <input
//             type="password"
//             class="form-control"
//             id="password"
//             placeholder="Enter your password">
//         </div>
//         <div class="captcha-container form-group"></div>
//         <button
//           style="background-color: #2E1255"
//           type="submit"
//           id="btn-login"
//           class="btn btn-primary btn-block">
//             Log In
//         </button>
//         <button
//           style="color #2E1255"
//           type="button"
//           id="btn-signup"
//           class="btn btn-default btn-block">
//             Sign Up
//         </button>
//       </form>
//     </div>
//   </div>

//   <!--[if IE 8]>
//   <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
//   <![endif]-->

//   <!--[if lte IE 9]>
//   <script src="https://cdn.auth0.com/js/polyfills/1.0/base64.min.js"></script>
//   <script src="https://cdn.auth0.com/js/polyfills/1.0/es5-shim.min.js"></script>
//   <![endif]-->

//   <script src="https://cdn.auth0.com/js/auth0/9.18/auth0.min.js"></script>
//   <script src="https://cdn.auth0.com/js/polyfills/1.0/object-assign.min.js"></script>
//   <script>
//     const actionText = document.querySelector('#actionText')
//     window.addEventListener('load', function() {

//       var config = JSON.parse(
//         decodeURIComponent(escape(window.atob('@@config@@')))
//       );

//       var leeway = config.internalOptions.leeway;
//       if (leeway) {
//         var convertedLeeway = parseInt(leeway);

//         if (!isNaN(convertedLeeway)) {
//           config.internalOptions.leeway = convertedLeeway;
//         }
//       }

//       var params = Object.assign({
//         overrides: {
//           __tenant: config.auth0Tenant,
//           __token_issuer: config.authorizationServer.issuer
//         },
//         domain: config.auth0Domain,
//         clientID: config.clientID,
//         redirectUri: config.callbackURL,
//         responseType: 'code'
//       }, config.internalOptions);

//       var webAuth = new auth0.WebAuth(params);
//       var databaseConnection = 'Username-Password-Authentication';
//       var captcha = webAuth.renderCaptcha(
//         document.querySelector('.captcha-container')
//       );

//       function login(e) {
//         e.preventDefault();
//         actionText.innerText = 'PLEASE LOG IN'
//         var button = this;
//         var username = document.getElementById('email').value;
//         var password = document.getElementById('password').value;
//         button.disabled = true;
//         webAuth.login({
//           realm: databaseConnection,
//           username: username,
//           password: password,
//           captcha: captcha.getValue()
//         }, function(err) {
//           if (err) displayError(err);
//           button.disabled = false;
//         });
//       }

//       function signup() {
//         actionText.innerText = 'PLEASE SIGN UP'
//         var button = this;
//         var email = document.getElementById('email').value;
//         var password = document.getElementById('password').value;

//         button.disabled = true;
//         webAuth.redirect.signupAndLogin({
//           connection: databaseConnection,
//           email: email,
//           password: password,
//           captcha: captcha.getValue()
//         }, function(err) {
//           if (err) displayError(err);
//           button.disabled = false;
//         });
//       }

//       function loginWithGoogle() {
//         webAuth.authorize({
//           connection: 'google-oauth2'
//         }, function(err) {
//           if (err) displayError(err);
//         });
//       }

//       function displayError(err) {
//         captcha.reload();
//         var errorMessage = document.getElementById('error-message');
//         errorMessage.innerHTML = err.policy || err.description;
//         errorMessage.style.display = 'block';
//       }

//       document.getElementById('btn-login').addEventListener('click', login);
//       document.getElementById('btn-google').addEventListener('click', loginWithGoogle);
//       document.getElementById('btn-signup').addEventListener('click', signup);
//     });
//   </script>
// </body>
// </html>
