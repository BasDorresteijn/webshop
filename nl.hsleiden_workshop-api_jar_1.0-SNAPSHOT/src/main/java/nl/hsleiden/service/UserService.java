package nl.hsleiden.service;

import java.util.Collection;
import javax.inject.Inject;
import javax.inject.Singleton;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.UserDAO;

/**
 *
 * @author Peter van Vliet
 */
@Singleton
public class UserService extends BaseService<User>
{
    private final UserDAO dao;
    
    @Inject
    public UserService(UserDAO dao)
    {
        this.dao = dao;
    }
    
    public Collection<User> getAll()
    {
        return dao.getAll();
    }
    
    public User get(String fullname)
    {
        return requireResult(dao.get(fullname));
    }
    
    public void add(User user)
    {
        user.setRoles(new String[] { "GUEST" });
        
        dao.add(user);
    }
    
    public void update(User authenticator, String fullname, User user)
    {
        // Controleren of deze gebruiker wel bestaat
        User oldUser = get(fullname);
        
        if (!authenticator.hasRole("ADMIN"))
        {
            // Vaststellen dat de geauthenticeerde gebruiker
            // zichzelf aan het aanpassen is
            assertSelf(authenticator, oldUser);
        }
        
        dao.update(fullname, user);
    }
    
    public void delete(String fullname)
    {
        // Controleren of deze gebruiker wel bestaat
        User user = get(fullname);
        
        dao.delete(fullname);
    }
}
