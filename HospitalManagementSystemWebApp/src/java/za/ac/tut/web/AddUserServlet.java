/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.ac.tut.web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import za.ac.tut.business.LoginUserFacadeLocal;
import za.ac.tut.entites.LoginUser;

/**
 *
 * @author Tk
 */
public class AddUserServlet extends HttpServlet {

    @EJB
    LoginUserFacadeLocal lufl;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String idnum = req.getParameter("idnum");
        String name = req.getParameter("name");
        String surname = req.getParameter("surname");
        String gender = req.getParameter("gender");
        String user = req.getParameter("user");
        String password = req.getParameter("password");
        String userid = Character.toString(user.charAt(0)) + idnum;
        
        LoginUser loginUser = new LoginUser(userid, password, user, idnum, name, surname, gender);
        lufl.create(loginUser);
        
        req.getSession().setAttribute("loginUser", loginUser);
        
        RequestDispatcher rd = req.getRequestDispatcher("add_user_outcome.jsp");
        rd.forward(req, resp);
    }
    
    
    
}
