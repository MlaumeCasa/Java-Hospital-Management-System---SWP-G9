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
public class EditUserServlet extends HttpServlet {

    @EJB
    LoginUserFacadeLocal lufl;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userid = req.getParameter("userid");
        Boolean isFromList = (Boolean) req.getSession().getAttribute("isFromList");
        
        List<LoginUser> users = lufl.findAll();
        LoginUser loginUser = new LoginUser();
        loginUser.setUserid(userid);
        
        for (LoginUser user : users) {
            if (user.getUserid().equals(userid)) {
                loginUser = user;
            }
        }
        
        req.setAttribute("loginUser", loginUser);
        req.getSession().setAttribute("isFromList", isFromList);
        
        RequestDispatcher rd = req.getRequestDispatcher("edit_user_details.jsp");
        rd.forward(req, resp);
        
    }
    
    
    
}
