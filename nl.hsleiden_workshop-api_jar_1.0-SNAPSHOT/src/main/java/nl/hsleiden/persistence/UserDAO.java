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
    private DbManager dbManager;
    
    @Inject
    public UserDAO(DbManager dbManager)
    {
        this.dbManager = dbManager;
    }
    
    public ArrayList<User> getAll() {
        Connection conn = dbManager.getConnection();
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
            dbManager.closeConnection(conn);
            return users;
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
        return null;
    }
    
    public User get(String fullName) {
        Connection conn = dbManager.getConnection();
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
            dbManager.closeConnection(conn);
            return user;
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
        return null;
    }
    
    public User getByEmailAddress(String emailAddress) {
        Connection conn = dbManager.getConnection();
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
            dbManager.closeConnection(conn);
            return user;
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
        return null;
    }
    
    public void add(User user) {
        Connection conn = dbManager.getConnection();
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
        dbManager.closeConnection(conn);
    }
    
    public void update(String fullName, User user) {
        Connection conn = dbManager.getConnection();
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
        dbManager.closeConnection(conn);

    }
    
    public void delete(String fullName) {
        Connection conn = dbManager.getConnection();
        try {
            PreparedStatement deleteUser = conn.prepareStatement("delete from webshop_user where fullname = ? ");
            deleteUser.setString(1, fullName);
            deleteUser.execute();
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);

    }
}
