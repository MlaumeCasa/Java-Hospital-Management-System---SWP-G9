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
public class LoginServlet extends HttpServlet {

    @EJB
    LoginUserFacadeLocal lufl;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userid = req.getParameter("userid");
        String password = req.getParameter("password");
        String userType = "a";
        Boolean userExists = false;
        
        //Login Addtions
        int loginAttempts = 0;
        
        LoginUser loginUser = createUser(userid,password,userType);
        req.getSession().setAttribute("loginUser", loginUser);
        
        List<LoginUser> users = lufl.findAll();
        
        for (LoginUser user : users) {
            if (user.getUserid().equals(userid)) {
                userExists = true;
                userType = user.getUser();
                loginUser = user;            
            }
        }
        
        req.getSession().setAttribute("loggedUser", loginUser);
        
        RequestDispatcher rd;
        PrintWriter out = resp.getWriter();
        
        switch(userType.toLowerCase()){
            case "admin":
                rd = req.getRequestDispatcher("admin_home.jsp");
                //out.println("Admin.html");
                break;
            case "patient":
                rd = req.getRequestDispatcher("patient_home.jsp");
                //out.println("patient.html");
                break;
            default:
                req.getSession().invalidate();
                rd = req.getRequestDispatcher("index.html");     
        }
        
        rd.forward(req, resp);
        
    }

    private LoginUser createUser(String userid, String password, String userType) {
        LoginUser loginUser = new LoginUser();
        
        loginUser.setUser(userid);
        loginUser.setPassword(password);
        loginUser.setUser(userType);
        
        return loginUser;
    }
}
