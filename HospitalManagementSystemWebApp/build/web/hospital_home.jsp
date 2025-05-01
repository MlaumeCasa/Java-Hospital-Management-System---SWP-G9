<%-- 
    Document   : hospital_home
    Created on : 30 Apr 2025, 7:16:29 PM
    Author     : Tk
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Hospital Home Page</title>
    </head>
    <body>
        <h1>Hospital Home</h1>
        <%
            if (request.getSession().isNew()) {
                    request.getSession(true);
                } 
        %>
        <p>
            Welcome to the SWP-G9 Hospital.
        </p>

        <p>
            Please Click <a href="hospital_login.jsp">here</a> to login.
        </p>
        <p>
            Please Click <a href="hospital_signup.jsp">here</a> to create accout.
        </p>

    </body>
</html>
