package za.ac.tut.entites;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SecondaryTable;
import javax.persistence.Table;

/**
 *
 * @author Tk
 */
@Entity
@Table(name = "LOGINUSER_TBL")
@SecondaryTable(name = "HOSPITALUSER_TBL")
public class LoginUser implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "USERID", nullable = false, length = 14)
    private String userid;
    @Column(nullable = false, length = 25 )
    private String password;
    @Column(name = "USERTYPE", nullable = false, length = 20)
    private String user;
    //HOSPITALUSER_TBL
    @Column(table = "HOSPITALUSER_TBL", name = "IDNUMBER", nullable = false, length = 13)
    private String idnum;
    @Column(table = "HOSPITALUSER_TBL", name = "FIRSTNAME", nullable = true, length = 20)
    private String name;
    @Column(table = "HOSPITALUSER_TBL", name = "LASTNAME", nullable = true, length = 20)
    private String surname;
    @Column(table = "HOSPITALUSER_TBL", nullable = true, length = 1)
    private String gender;
    //Constructor

    public LoginUser() {
    }

    public LoginUser(String userid, String password, String user) {
        this.userid = userid;
        this.password = password;
        this.user = user;
    }

    public LoginUser(Long id, String userid, String password, String user, String idnum, String name, String surname, String gender) {
        this.id = id;
        this.userid = userid;
        this.password = password;
        this.user = user;
        this.idnum = idnum;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
    }
    
    public LoginUser(
        String userid, 
        String password, 
        String user, 
        String idnum, 
        String name, 
        String surname, 
        String gender
    ) {
        this.userid = userid;
        this.password = password;
        this.user = user;
        this.idnum = idnum;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
    }
    
    
    //Getters and Setters

    public String getIdnum() {
        return idnum;
    }

    public void setIdnum(String idnum) {
        this.idnum = idnum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
    
    

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof LoginUser)) {
            return false;
        }
        LoginUser other = (LoginUser) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "za.ac.tut.entites.LoginUser[ id=" + id + " ]";
    }
    
}
