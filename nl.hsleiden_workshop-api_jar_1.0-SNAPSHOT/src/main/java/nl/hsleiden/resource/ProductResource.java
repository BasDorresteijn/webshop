/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.resource;

import com.fasterxml.jackson.annotation.JsonView;
import java.util.Collection;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import nl.hsleiden.View;
import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;
import nl.hsleiden.service.ProductService;

/**
 *
 * @author bas_d
 */
@Singleton
@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
public class ProductResource {
    private final ProductService productService;

    @Inject
    public ProductResource(ProductService productService) {
        this.productService = productService;
    }
    
    @GET
    @JsonView(View.Public.class)
    @RolesAllowed("GUEST")
    public Collection<Product> retrieveAll()
    {
        return productService.getAll();
    }
    
    @GET
    @Path("/admin")
    @JsonView(View.Private.class)
    @RolesAllowed("ADMIN")
    public Collection<Product> retrieveAllAdmin()
    {
        return productService.getAll();
    }
    
    @POST
    @JsonView(View.Private.class)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed("ADMIN")
    public void addProduct(@Valid Product product) {
        productService.addProduct(product);
    }
    
    @DELETE 
    @RolesAllowed("ADMIN")
    @Path("/{productname}")
    public void deleteProduct(@PathParam("productname") String productname) {
        productService.removeProduct(productname);
    }
}
