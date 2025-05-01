package za.ac.tut.entites;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Tk
 */
@Entity
@Table(name = "HOSPITALUSERS_TBL")
public class HospitalUser implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private Long id;
    @Column(name = "IDNUMBER", nullable = false, length = 13)
    private String idnum;
    @Column(name = "FIRSTNAME", nullable = true, length = 20)
    private String name;
    @Column(name = "LASTNAME", nullable = true, length = 20)
    private String surname;
    @Column(nullable = true, length = 1)
    private String gender;

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
        if (!(object instanceof HospitalUser)) {
            return false;
        }
        HospitalUser other = (HospitalUser) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "za.ac.tut.entites.HospitalUser[ id=" + id + " ]";
    }
    
}
