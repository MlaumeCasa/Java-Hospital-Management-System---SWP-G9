<%-- 
    Document   : hospital_login
    Created on : 30 Apr 2025, 7:26:18 PM
    Author     : Tk
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="login-style.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script type="text/javascript" src="validate-login.js" defer></script>
</head>
<body>
    <div class="login-container">
        <div class="login-surface">
            <h1>Login</h1>
            <form id="sign-up_form" method="POST" action="LoginServlet"> 
                <div class="input-dialog">
                    <input type="text" id="username" name="userid" placeholder="UserID" required>
                    <i class="bx bx-user"></i>
                </div>
                <div class="input-dialog">
                    <input type="password" id="password" name="password" placeholder="Password" required>
                    <i class="bx bx-lock"></i>
                </div>
                <div class="remember-forgot">
                    <label>
                        <input type="checkbox" name="remember_me"> Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>
                <div class="signup-link">
                    Create New Account? <a href="Sign-Up.html">Sign Up</a>
                </div>
                <button type="submit" class="btn">LOGIN</button>
            </form>

            <div>
                <p id="validation-errors"></p>
            </div>
        </div>
    </div>
</body>
</html>