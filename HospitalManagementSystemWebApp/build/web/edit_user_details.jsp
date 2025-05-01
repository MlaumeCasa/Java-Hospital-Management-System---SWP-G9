<%-- 
    Document   : edit_user_details
    Created on : 30 Apr 2025, 10:30:43 PM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Edit User Details Page</title>
    </head>
    <body>
        <h1>Edit User Details</h1>
        <%
            LoginUser loginUser = (LoginUser) request.getAttribute("loginUser");
            Boolean isFromList = (Boolean) request.getSession().getAttribute("isFromList");
        %>
        <h3>
            Please Edit the Information and Submit:
        </h3>
        
        <form action="EditUserDetailsServlet.do" method="post">
            <table>
                <tr>
                    <td>ID Number: </td>
                    <td><input type="text" name="idnum" id="idnum" 
                               value="<%= loginUser.getIdnum() %>"></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="name" id="name"
                               value="<%= loginUser.getName() %>"></td>
                </tr>
                <tr>
                    <td>Surname</td>
                    <td><input type="text" name="surname" id="surname"
                                value="<%= loginUser.getSurname() %>"></td>
                </tr>

                <td>Gender:</td>
                    <td>
                        <select name="gender" id="gender">
                            <option value="<%= loginUser.getGender() %>"><%= loginUser.getGender() %></option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>User Type: </td>
                    <td>
                        <select name="user" id="user">
                            <option value="<%= loginUser.getUser() %>"><%= loginUser.getUser() %></option>
                            <option value="Admin">Admin</option>
                            <option value="Patient">Patient</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Emergency Responder">Emergency Responder</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Account Password: </td>
                    <td><input type="password" name="password" id="password" value="<%= loginUser.getPassword() %>"></td>
                </tr>

                <tr>
                    <td>
                        <input type="submit" value="EDIT USER">
                        <button type="button" onclick="window.location.href='GetUserListServlet.do?';">CANCEL</button>
                    </td>
                </tr>

            </table>
        </form>

    </body>
</html>
