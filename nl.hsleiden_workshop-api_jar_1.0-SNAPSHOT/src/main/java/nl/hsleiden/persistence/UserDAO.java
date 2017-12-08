package nl.hsleiden.persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.inject.Singleton;
import nl.hsleiden.model.User;

/**
 *
 * @author Peter van Vliet
 */
@Singleton
public class UserDAO
{
    private final DbManager dbManager;
    private final Connection conn;
    
    @Inject
    public UserDAO(DbManager dbManager)
    {
        this.dbManager = dbManager;
        this.conn = dbManager.getConnection();
    }
    
    public ArrayList<User> getAll() {
        ArrayList<User> users;
        try {
            users = new ArrayList<>();
            ResultSet rs = conn.prepareStatement("select * from webshop_user").executeQuery();
            while(rs.next()) {
                User user = new User();
                user.setFullName(rs.getString(1));
                user.setPostcode(rs.getString(2));
                user.setStreetnumber(rs.getString(3));
                user.setEmailAddress(rs.getString(4));
                user.setPassword(rs.getString(5));
                if(rs.getBoolean(6)) {
                    user.setRoles(new String[] { "GUEST", "ADMIN" });
                } else {
                    user.setRoles(new String[] { "GUEST" });
                }
                users.add(user);
            }
            return users;
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public User get(String fullName) {
        try {
            User user = new User();
            PreparedStatement getUser = conn.prepareStatement("select * from webshop_user where fullname = ? ");
            getUser.setString(1, fullName);
            ResultSet rs = getUser.executeQuery();
            while(rs.next()) {
                user.setFullName(rs.getString(1));
                user.setPostcode(rs.getString(2));
                user.setStreetnumber(rs.getString(3));
                user.setEmailAddress(rs.getString(4));
                user.setPassword(rs.getString(5));
                if(rs.getBoolean(6)) {
                    user.setRoles(new String[] { "GUEST", "ADMIN" });
                } else {
                    user.setRoles(new String[] { "GUEST" });
                }
            }
            return user;
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public User getByEmailAddress(String emailAddress) {
        try {
            User user = new User();;
            PreparedStatement getUser = conn.prepareStatement("select * from webshop_user where email = ? ");
            getUser.setString(1, emailAddress);
            ResultSet rs = getUser.executeQuery();
            while(rs.next()) {
                user.setFullName(rs.getString(1));
                user.setPostcode(rs.getString(2));
                user.setStreetnumber(rs.getString(3));
                user.setEmailAddress(rs.getString(4));
                user.setPassword(rs.getString(5));
                if(rs.getBoolean(6)) {
                    user.setRoles(new String[] { "GUEST", "ADMIN" });
                } else {
                    user.setRoles(new String[] { "GUEST" });
                }
            }
            return user;
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public void add(User user) {
        try {
            boolean admin = false;
            PreparedStatement insertUser = conn.prepareStatement("insert into webshop_user values(?,?,?,?,?,?)");
            insertUser.setString(1, user.getFullName());
            insertUser.setString(2, user.getPostcode());
            insertUser.setString(3, user.getStreetnumber());
            insertUser.setString(4, user.getEmailAddress());
            insertUser.setString(5, user.getPassword());
            for(int i = 0; i < user.getRoles().length; i++) {
                if(user.getRoles()[i].equals("ADMIN")) {
                    admin = true;
                }
            }
            insertUser.setBoolean(6, admin);
            insertUser.execute();
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void update(String fullName, User user) {
        try {
            boolean admin = false;
            PreparedStatement updateUser = conn.prepareStatement("update webshop_user set fullname = ?,"
                    + " postcode = ?, streetnumber = ?, email = ?,"
                    + " password = ?, adminrole = ? where fullname = ? ");
            updateUser.setString(1, user.getFullName());
            updateUser.setString(2, user.getPostcode());
            updateUser.setString(3, user.getStreetnumber());
            updateUser.setString(4, user.getEmailAddress());
            updateUser.setString(5, user.getPassword());
            for(int i = 0; i < user.getRoles().length; i++) {
                if(user.getRoles()[i].equals("ADMIN")) {
                    admin = true;
                }
            }
            updateUser.setBoolean(6, admin);
            updateUser.setString(7, fullName);
            updateUser.execute();
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void delete(String fullName) {
        try {
            PreparedStatement deleteUser = conn.prepareStatement("delete from webshop_user where fullname = ? ");
            deleteUser.setString(1, fullName);
            deleteUser.execute();
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
