<%-- 
    Document   : get_user_list
    Created on : 01 May 2025, 10:00:43 AM
    Author     : Tk
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Get User List Page</title>
    </head>
    <body>
        <h1>Get User List</h1>
        <form action="GetUserListServlet.do" method="get">
            <table>
                <tr>
                    <td>CLick here to get a list of all the users.</td>
                    <td><input type="submit" value="GET USER LIST"></td>
                </tr>                
            </table>
        </form>

        <p>
            Click <a href="index.html">here to go back to the main page.</a>
        </p>
        <p>
            Click <a href="admin_home.jsp">here to go back to the admin home page.</a>
        </p>
    </body>
</html>
