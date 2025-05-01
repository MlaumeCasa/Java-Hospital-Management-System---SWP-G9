<%-- 
    Document   : remove_user_outcome
    Created on : 01 May 2025, 12:37:49 PM
    Author     : Tk
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Remove User Outcome Page</title>
    </head>
    <body>
        <h1>Remove User Outcome</h1>
        <%
            String userid = (String) request.getSession().getAttribute("userid");
            String surname = (String) request.getSession().getAttribute("surname");
            String name = (String) request.getSession().getAttribute("name");
            Boolean userExists = (Boolean) request.getSession().getAttribute("userExists");

            if (userExists) {
                
        %>

        <p>
            <%= surname %> <%= name %>, 
           User with User ID: <%= userid %> was <b>found and successfully</b> removed.
        </p>
        
        <%
            }else{
        %>
        <p>
            User with User ID: <%= userid %> was <b>not found</b> on the database.
        </p>
        <%
            }
        %>

        <p>
            Click <a href="index.html">here to go back to the main page.</a>
        </p>

        <p>
            Click <a href="admin_home.jsp">here to go back to the admin home page.</a>
        </p>
        
    </body>
</html>
