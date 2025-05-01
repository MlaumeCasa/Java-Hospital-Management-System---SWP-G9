/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.ac.tut.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
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
public class DeleteUserDetailsServlet extends HttpServlet {

    @EJB
    LoginUserFacadeLocal lufl;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userid = req.getParameter("userid");
        Boolean userExists = false;

        List<LoginUser> users = lufl.findAll();

        LoginUser loginUser = createUser(userid);

        for (LoginUser user : users) {
            if (user.getUserid().equals(userid)) {
                loginUser = lufl.find(user.getId());
                userExists = true;
                break;
            }
        }
        req.getSession().setAttribute("userid", userid);
        req.getSession().setAttribute("surname", loginUser.getSurname());
        req.getSession().setAttribute("name", loginUser.getName());
        req.getSession().setAttribute("userExists", userExists);
        lufl.remove(loginUser);

        RequestDispatcher rd = req.getRequestDispatcher("remove_user_outcome.jsp");
        rd.forward(req, resp);
    }

    private LoginUser createUser(String userid) {

        LoginUser loginUser = new LoginUser();
        loginUser.setSurname(" ");
        loginUser.setName(" ");

        loginUser.setUserid(userid);

        return loginUser;
    }

}
