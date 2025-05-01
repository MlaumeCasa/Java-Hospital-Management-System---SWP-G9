<%-- 
    Document   : add_user
    Created on : 30 Apr 2025, 8:10:51 PM
    Author     : Tk
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Add User Page</title>
    </head>
    <body>
        <h1>Add User</h1>
        <p>
            Please enter the details below for the <b>New User.</b>
        </p>

        <form action="AddUserServlet.do" method="post">
            <table>
                <tr>
                    <td>ID Number: </td>
                    <td><input type="text" name="idnum" id="idnum"></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="name" id="name"></td>
                </tr>
                <tr>
                    <td>Surname</td>
                    <td><input type="text" name="surname" id="surname"></td>
                </tr>

                <tr>
                    <td>Gender:</td>
                    <td>
                        <select name="gender" id="gender">
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>User Type: </td>
                    <td>
                        <select name="user" id="user">
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
                    <td><input type="password" name="password" id="password"></td>
                </tr>

                <tr>
                    <td>
                        <button type="button" onclick="window.location.href='add_user.jsp';">REST FORM</button>
                    </td>
                    <td>
                        <input type="submit" value="ADD NEW USER">
                        <button type="button" onclick="window.location.href='admin_home.jsp';">CANCEL</button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        
                    </td>
                </tr>
            </table>
        </form>
    </body>
</html>
