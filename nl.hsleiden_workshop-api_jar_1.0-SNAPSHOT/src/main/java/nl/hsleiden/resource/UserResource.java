package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.inject.Singleton;
import io.dropwizard.auth.Auth;
import java.util.Collection;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import nl.hsleiden.View;
import nl.hsleiden.model.User;
import nl.hsleiden.service.UserService;

/**
 * @author Bas Dorresteijn
 */
@Singleton
@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource
{
    private final UserService service;
    
    @Inject
    public UserResource(UserService service)
    {
        this.service = service;
    }
    
    @GET
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<User> retrieveAll()
    {
        return service.getAll();
    }
    
    @GET
    @JsonView(View.Private.class)
    @RolesAllowed("ADMIN")
    @Path("/admin")
    public Collection<User> retrieveAllAdmin(@Auth User user)
    {
        return service.getAll(user);
    }
    
    @GET
    @Path("/{fullname}")
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public User retrieve(@PathParam("fullname") String fullname)
    {
        return service.get(fullname);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    public void create(@Valid User user)
    {
        service.add(user);
    }
    
    @PUT
    @Path("/{fullname}")
    @Consumes(MediaType.APPLICATION_JSON)
    @JsonView(View.Protected.class)
    @RolesAllowed("ADMIN")
    public void update(@PathParam("fullname") String fullname, User user)
    {
        service.updateroles(user, fullname);
    }
    
    @DELETE
    public void delete(@Auth User user)
    {
        service.delete(user.getFullName());
    }
    
    @GET
    @Path("/me")
    @JsonView(View.Private.class)
    public User authenticate(@Auth User authenticator)
    {
        return authenticator;
    }
    
    @PUT
    @Path("/me")
    public void updateMe(@Auth User authenticator, @Valid User user) {
        service.update(user, authenticator.getName());
    }
}
