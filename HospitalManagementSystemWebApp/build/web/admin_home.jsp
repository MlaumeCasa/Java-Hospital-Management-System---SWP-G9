<%-- 
    Document   : admin_home
    Created on : 30 Apr 2025, 7:37:29 PM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Admin Home Page</title>
    </head>
    <body>
        <h1>Admin Home</h1>
        <!--
        <%
            Boolean isFromList = false;
            request.getSession().setAttribute("isFromList", isFromList);
            LoginUser loginUser = null;
            
            request.getSession().setAttribute("loginUser", loginUser);
        %>

        -->
        <p>
            Welcome  you have successfully logged in as an <b>Admin.</b> <br>
            choose one of the following options:
        </p>

        <ol>
            <li>Click here to <a href="add_user.jsp">Add New User.</a></li>
            <li>Click here to <a href="edit_user.jsp">Edit User Details.</a></li>
            <li>Click here to <a href="get_user_list.jsp">Get A List of All Users.</a></li>
            <li>Click here to <a href="remove_user.jsp">Remove User.</a></li>
        </ol>

        <p>
            Click <a href="index.html">here to go back to the main page.</a>
        </p>
        
    </body>
</html>
