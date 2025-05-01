<%-- 
    Document   : edit_user_outcome
    Created on : 30 Apr 2025, 10:50:53 PM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Edit User Outcome Page</title>
    </head>
    <body>
        <h1>Edit User Outcome</h1>
        <%
                LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
                Boolean isFromList = (Boolean) request.getSession().getAttribute("isFromList");
                String listOptions = "Click here to <a href=\"get_user_list_outcome.jsp\">here to go back to list of users.</a>";
        %>
        <p>
            <b><%= loginUser.getSurname() %> <%= loginUser.getName() %></b>'s details have been edit.
        </p>

        <p>
            Click <a href="index.html">here to go back to the main page.</a>
        </p>
        <p>
            Click <a href="edit_user.jsp">here to edit another user.</a>
        </p>
        <p>
            Click <a href="admin_home.jsp">here to go back to the admin home page.</a>
        </p>
        
        <%
            if (isFromList) {
        %>
        <p>
            <%= listOptions %>
        </p>
        
        <%
            }
        %>
        
    </body>
</html>
