package nl.hsleiden.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private List<User> users;
    private DbManager dbManager;
    
    @Inject
    public UserDAO(DbManager dbManager)
    {
        this.dbManager = dbManager;
        updateUsers();
    }
    
    private void updateUsers() {
        Connection conn = dbManager.getConnection();
        
        try {
            ResultSet getshit = conn.prepareStatement("select * from userdata").executeQuery();
            while(getshit.next()) {
                User user1 = new User();
                user1.setFullName(getshit.getString(1));
                user1.setPostcode(getshit.getString(2));
                user1.setStreetnumber(getshit.getString(3));
                user1.setEmailAddress("first@user.com");
                user1.setPassword("first");
                user1.setRoles(new String[] { "GUEST", "ADMIN" });

                User user2 = new User();
                user2.setFullName(getshit.getString(1));
                user2.setPostcode(getshit.getString(2));
                user2.setStreetnumber(getshit.getString(3));
                user2.setEmailAddress("second@user.com");
                user2.setPassword("second");
                user2.setRoles(new String[] { "GUEST" });
                
                users = new ArrayList<>();
                users.add(user1);
                users.add(user2);
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
    }
    
    public List<User> getAll()
    {
        return users;
    }
    
    public User get(int id)
    {
        try
        {
            return users.get(id);
        }
        catch(IndexOutOfBoundsException exception)
        {
            return null;
        }
    }
    
    public User getByEmailAddress(String emailAddress)
    {
        Optional<User> result = users.stream()
            .filter(user -> user.getEmailAddress().equals(emailAddress))
            .findAny();
        
        return result.isPresent()
            ? result.get()
            : null;
    }
    
    public void add(User user)
    {
        users.add(user);
    }
    
    public void update(int id, User user)
    {
        users.set(id, user);
    }
    
    public void delete(int id)
    {
        users.remove(id);
    }
}
