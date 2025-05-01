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
public class EditUserDetailsServlet extends HttpServlet {

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
        Boolean isFromList = (Boolean) req.getSession().getAttribute("isFromList");
        
        LoginUser loginUser = createUser(userid, password, user, idnum, name, surname, gender);
        lufl.edit(loginUser);
        
        req.getSession().setAttribute("loginUser", loginUser);
        req.setAttribute("isFromList", isFromList);
        
        RequestDispatcher rd = req.getRequestDispatcher("edit_user_outcome.jsp");
        rd.forward(req, resp);
        
        
    }

    private LoginUser createUser(String userid, String password, String user, String idnum, String name, String surname, String gender) {
        List<LoginUser> users = lufl.findAll();
        LoginUser logUser = new LoginUser();
        
        for (LoginUser user1 : users) {
            if (user1.getUserid().equals(userid)) {
                logUser = user1;
            }
        }
        
        logUser = lufl.find(logUser.getId());
        
        logUser.setIdnum(idnum);
        logUser.setName(name);
        logUser.setSurname(surname);
        logUser.setGender(gender);
        logUser.setUser(user);
        logUser.setPassword(password);
        logUser.setUserid(userid);
        
        return logUser;
    }
    
    
}
