<%-- 
    Document   : remove_user_details
    Created on : 01 May 2025, 1:27:20 PM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Remove User Details Page</title>
    </head>
    <body>
        <h1>User To Be Removed Details</h1>
        <%
            LoginUser loginUser = (LoginUser) request.getAttribute("loginUser");
            Boolean isFromList = (Boolean) request.getSession().getAttribute("isFromList");
            request.getSession().setAttribute("loginUser", loginUser);   
        %>
        <h3>
            Please Review the Information and Confirm Deletion:
        </h3> 
        
        <form action="DeleteUserDetailsServlet.do" method="post">
            <table>
                <tr>
                    <td>User ID</td>
                    <td><%= loginUser.getUserid() %></td>
                    <td><input type="hidden" name="userid" value="<%= loginUser.getUserid() %>"></td>
                </tr>
                <tr>
                    <td>ID Number: </td>
                    <td><%= loginUser.getIdnum() %></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><%= loginUser.getName() %></td>
                </tr>
                <tr>
                    <td>Surname</td>
                    <td><%= loginUser.getSurname() %></td>
                </tr>

                <td>Gender:</td>
                    <td>
                        <%= loginUser.getGender() %>
                    </td>
                </tr>

                <tr>
                    <td>User Type: </td>
                    <td>
                        <%= loginUser.getUser() %>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td><input type="submit" value="DELETE USER"></td>
                </tr>

            </table>
        </form>

        <p>
        <form action="EditUserServlet.do" method="get">
            <table>
                <tr>
                    <td>
                        <input type="hidden" name="userid" value="<%= loginUser.getUserid() %>">
                        <button type="button" onclick="window.location.href='GetUserListServlet.do?';">CANCEL</button>
                    </td>
                    <td>
                        Or Click <b>button</b> to 
                        <input type="submit" value="EDIT USER"> details instead.
                    </td>
                </tr>
            </table>
        </form>
        </p>
    </body>
</html>
