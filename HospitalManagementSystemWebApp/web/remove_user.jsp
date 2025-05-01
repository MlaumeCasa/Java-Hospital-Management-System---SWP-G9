<%-- 
    Document   : remove_user
    Created on : 01 May 2025, 12:21:19 PM
    Author     : Tk
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Remove User Page</title>
    </head>
    <body>
        <h1>Remove User</h1>
        <p>
            Please enter the following details to delete user:
        </p>

        <form action="DeleteUserServlet.do" method="get">
            <table>
                <tr>
                    <td>Enter User ID</td>
                    <td><input type="text" name="userid" id="userid"></td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onclick="window.location.href='remove_user.jsp';">REST FORM</button>
                    </td>
                    <td>
                        <input type="submit" value="DELETE USER">
                        <button type="button" onclick="window.location.href='admin_home.jsp';">CANCEL</button>
                    </td>
                </tr>
            </table>
        </form>
    </body>
</html>
