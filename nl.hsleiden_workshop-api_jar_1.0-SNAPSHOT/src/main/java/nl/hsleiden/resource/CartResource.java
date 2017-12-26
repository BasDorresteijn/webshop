/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import io.dropwizard.auth.Auth;
import java.util.Collection;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import nl.hsleiden.View;
import nl.hsleiden.model.Cart;
import nl.hsleiden.model.User;
import nl.hsleiden.service.CartService;

/**
 *
 * @author bas_d
 */
@Singleton
@Path("/carts")
@Produces(MediaType.APPLICATION_JSON)
public class CartResource {
    
    private final CartService cartService;

    @Inject
    public CartResource(CartService cartService) {
        this.cartService = cartService;
    }
    
    @GET
    @JsonView(View.Private.class)
    @RolesAllowed("ADMIN")
    public Collection<Cart> retrieveAllAdmin()
    {
        return cartService.getAll();
    }
    
    @GET 
    @JsonView(View.Protected.class)
    @Path("/{fullname}")
    public Cart getCart(@PathParam("fullname") String fullname){
        return cartService.getCart(fullname);
    }
    
    @POST
    @Path("/addProduct")
    public void addProduct(@QueryParam("productName") String productName, @Auth User user) {
        cartService.addProduct(productName, user);
    }
    
    
    
}
