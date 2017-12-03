/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.model;

import com.fasterxml.jackson.annotation.JsonView;
import java.util.ArrayList;
import nl.hsleiden.View;

/**
 *
 * @author bas_d
 */
public class Cart {
    
    @JsonView(View.Protected.class) 
    private User user;
    
    @JsonView(View.Public.class) 
    private ArrayList<Product> products;

    public ArrayList<Product> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<Product> products) {
        this.products = products;
    }
    
    public void addProduct(Product product) {
        products.add(product);
    }
    
    public void emptyCart() {
        products.clear();
    }
    
    public void removeProduct(Product product) {
        products.remove(product);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
    
}
