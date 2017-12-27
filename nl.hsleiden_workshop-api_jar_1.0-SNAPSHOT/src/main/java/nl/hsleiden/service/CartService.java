/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.service;

import java.util.Collection;
import javax.inject.Inject;
import javax.inject.Singleton;
import nl.hsleiden.model.Cart;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.CartDAO;

/**
 *
 * @author bas_d
 */
@Singleton
public class CartService {
    
    private final CartDAO cartDAO;
    
    @Inject
    public CartService(CartDAO cartDAO) {
        this.cartDAO = cartDAO;
    }

    public Collection<Cart> getAll() {
        return cartDAO.getCarts();
    }

    public Cart getCart(String fullname) {
        return cartDAO.getCart(fullname);
    }
    
    public void addProduct(String productnaam, User user) {
        cartDAO.addProduct(productnaam, user.getFullName());
    }
    
    public void removeProduct(String productnaam, User user) {
        cartDAO.removeProductFromCart(user.getFullName(), productnaam);
    }
    
    public double getPrice(User user) {
        return cartDAO.getTotalPrice(user);
    }
    
}
