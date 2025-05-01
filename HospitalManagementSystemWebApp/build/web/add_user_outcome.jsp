<%-- 
    Document   : add_user_outcome
    Created on : 30 Apr 2025, 8:35:57 PM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Add User Outcome Page</title>
    </head>
    <body>
        <h1>Add User Outcome</h1>

        <%
            LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
        %>

        <p>
            <%= loginUser.getSurname() %> <%= loginUser.getName() %> has successfully be added. <br>
            <b>Please Note The Following:</b>
        </p>
        <table>
            <tr>
                <td>User Type:</td>
                <td><%= loginUser.getUser() %></td>
            </tr>

            <tr>
                <td>User ID: </td>
                <td><%= loginUser.getUserid() %></td>
            </tr>
        </table>

        <p>
            Click <a href="index.html">here to go back to the main page.</a>
        </p>
        <p>
            Click <a href="add_user.jsp">here to add another user.</a>
        </p>
        <p>
            Click <a href="admin_home.jsp">here to go back to the admin home page.</a>
        </p>
    </body>
</html>
