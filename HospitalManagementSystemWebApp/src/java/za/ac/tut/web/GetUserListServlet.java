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
public class GetUserListServlet extends HttpServlet {

    @EJB
    LoginUserFacadeLocal lufl;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<LoginUser> users = lufl.findAll();
        Boolean isFromList = true;
        
        req.getSession().setAttribute("users", users);
        req.getSession().setAttribute("isFromList", isFromList);
        
        RequestDispatcher rd = req.getRequestDispatcher("get_user_list_outcome.jsp");
        rd.forward(req, resp);
        
    }
    
    
}
