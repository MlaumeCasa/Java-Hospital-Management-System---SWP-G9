/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.ac.tut.business;

import java.util.List;
import javax.ejb.Local;
import za.ac.tut.entites.LoginUser;

/**
 *
 * @author Tk
 */
@Local
public interface LoginUserFacadeLocal {

    void create(LoginUser loginUser);

    void edit(LoginUser loginUser);

    void remove(LoginUser loginUser);

    LoginUser find(Object id);

    List<LoginUser> findAll();

    List<LoginUser> findRange(int[] range);

    int count();
    
}
