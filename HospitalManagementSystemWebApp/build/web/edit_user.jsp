<%-- 
    Document   : edit_user
    Created on : 30 Apr 2025, 10:20:13 PM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Edit User Page</title>
    </head>
    <body>
        <h1>Edit User</h1>
        <p>
            Please provide the following information for the user to edit:
        </p>

        <%
            Boolean isFromList = (Boolean) request.getSession().getAttribute("isFromList");
            
            LoginUser loginUser = (LoginUser) request.getAttribute("loginUser");
        %>

        <form action="EditUserServlet.do" method="get">
            <table>
                <tr>
                    <td>Enter User ID: </td>
                    <%
                        if (!isFromList) {
                    %>
                    <td><input type="text" name="userid" id="userid"></td>
                        <%
                        } else {
                            if (loginUser != null) {
                        %>
                    <td><%= loginUser.getUserid()%></td>
                    <%
                    } else {
                    %>
                    <td>User not found</td>
                    <%
                            }
                        }
                    %>
                </tr>
                <tr>
                    <td>
                        <button type="button" onclick="window.location.href='edit_user.jsp';">REST FORM</button>
                    </td>
                    <td>
                        <input type="submit" value="EDIT USER">
                        <button type="button" onclick="window.location.href='admin_home.jsp';">CANCEL</button>
                    </td>
                </tr>
            </table>
        </form>
    </body>
</html>
