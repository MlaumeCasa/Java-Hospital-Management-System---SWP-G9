<%-- 
    Document   : get_user_list_outcome
    Created on : 01 May 2025, 10:03:55 AM
    Author     : Tk
--%>

<%@page import="za.ac.tut.entites.LoginUser"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Get User List Outcome Page</title>
    </head>
    <body>
        <h1>Get User List Outcome</h1>
        <%
            List<LoginUser> users = (List<LoginUser>) request.getSession().getAttribute("users");
            Boolean isFromList = (Boolean) request.getSession().getAttribute("isFromList");
            request.getSession().setAttribute("isFromList", isFromList);
        %>
        
        <p>
            Here is a tabled summary of all the users: 
        </p>

        <table cellpadding="5" >
            <tr>
                <th>USER ID</th>
                <th>USER</th>
                <th>ID NUMBER</th>
                <th>SURNAME</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>Actions</th>
            </tr>
            
        <% 
            for (LoginUser user : users) {      
        %>

            <tr>
                <td><%= user.getUserid() %></td>
                <td><%= user.getUser() %></td>
                <td><%= user.getIdnum() %></td>
                <td><%= user.getSurname() %></td>
                <td><%= user.getName() %></td>
                <td><%= user.getGender() %></td>
                <td>
                    <form action="EditUserServlet.do" method="get" style="display:inline;">
                        <input type="hidden" name="userid" value="<%= user.getUserid() %>">
                        <input type="submit" value="EDIT">
                    </form>
                        <form action="DeleteUserServlet.do" method="get" style="display:inline;">
                        <input type="hidden" name="userid" value="<%= user.getUserid() %>">
                        <input type="submit" value="DELETE">
                    </form>
                    <form action="DetailedReportServlet.do" method="get" style="display:inline;">
                        <input type="hidden" name="userid" value="<%= user.getUserid() %>">
                        <input type="submit" value="GET DETAILED REPORT">
                    </form>
                </td>
            </tr>
            
        <%
            }
        %>
        </table>
        
    </body>
</html>
