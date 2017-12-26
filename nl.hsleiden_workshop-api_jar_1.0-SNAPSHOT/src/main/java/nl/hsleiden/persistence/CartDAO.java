/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
import nl.hsleiden.model.Cart;
import nl.hsleiden.model.Product;

/**
 *
 * @author bas_d
 */
@Singleton
public class CartDAO {

    private final ProductDAO productDAO;
    private final UserDAO userDAO;
    private final DbManager dbManager;
    private final Connection conn;
    
    @Inject
    public CartDAO(ProductDAO productDAO, UserDAO userDAO, DbManager dbManager) {
        this.productDAO = productDAO;
        this.userDAO = userDAO;
        this.dbManager = dbManager;
        conn = dbManager.getConnection();
    }
    
    public Cart getCart(String fullname) {
        try {
            PreparedStatement getCart = conn.prepareStatement("SELECT * FROM cart WHERE user_fullname = ?");
            getCart.setString(1, fullname);
            ResultSet rs = getCart.executeQuery();
            Cart cart = new Cart();
            cart.setUser(userDAO.get(fullname));
            while(rs.next()) {
                cart.addProduct(productDAO.getProduct(rs.getString(2)));
            }
            return cart;
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;  
    }
    
    public ArrayList<Cart> getCarts() {
        try {
            PreparedStatement getCarts = conn.prepareStatement("SELECT * FROM cart");
            ResultSet rs = getCarts.executeQuery();
            String fullname = "";
            ArrayList<Cart> carts = new ArrayList<>();
            while(rs.next()) {
                if(fullname.equals(rs.getString(1))) {
                } else {
                    fullname = rs.getString(1);
                    carts.add(getCart(rs.getString(1)));
                }
            }
            return carts;
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    
    public void addProduct(String product, String fullname) {
        try {
            PreparedStatement addProductToCart = conn.prepareStatement("INSERT INTO cart VALUES(?, ?)");
            addProductToCart.setString(1, fullname);
            addProductToCart.setString(2, product);
            addProductToCart.execute();
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void addCart(Cart cart) {
        for(Product product : cart.getProducts()) {
            addProduct(product.getProductName(), cart.getUser().getFullName());
        }
    }
    
    public void updateCart(String fullname, Cart cart) {
        removeCart(fullname);
        addCart(cart);
    }
    
    public void removeCart(String fullname) {
        try {
            PreparedStatement removeCart = conn.prepareStatement("DELETE from cart where user_fullname = ?");
            removeCart.setString(1, fullname);
            removeCart.execute();
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        } 
    }
    
    public void removeProductFromCart(String fullname, String product) {
        try {
            PreparedStatement removeProductFromCart = conn.prepareStatement("DELETE from cart where user_fullname = ? AND product_productname = ?");
            removeProductFromCart.setString(1, fullname);
            removeProductFromCart.setString(2, product);
            removeProductFromCart.execute();
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
