package za.ac.tut.business;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import za.ac.tut.entites.LoginUser;

/**
 *
 * @author Tk
 */
@Stateless
public class LoginUserFacade extends AbstractFacade<LoginUser> implements LoginUserFacadeLocal {

    @PersistenceContext(unitName = "HospitalEJBModulePU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public LoginUserFacade() {
        super(LoginUser.class);
    }
    
}
