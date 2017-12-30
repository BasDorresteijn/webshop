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
import nl.hsleiden.model.User;

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
    
    public double getTotalPrice(User user) {
        try {
            PreparedStatement getPrice = conn.prepareStatement("SELECT sum(product.price) FROM cart JOIN product "
                    + "ON cart.product_productname = product.productname WHERE cart.user_fullname = ?");
            getPrice.setString(1, user.getFullName());
            ResultSet rs = getPrice.executeQuery();
            rs.next();
            return rs.getDouble(1);
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return 0;
    }
    
    
    public void addProduct(String product, String fullname) {
        try {
            PreparedStatement addProductToCart = conn.prepareStatement("INSERT INTO cart (user_fullname, product_productname) VALUES(?, ?)");
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
        removeCart(fullname, false);
        addCart(cart);
    }
    
    private ArrayList<String> getProductsInCart(String fullname) {
        try {
            PreparedStatement getProducts = conn.prepareStatement("SELECT DISTINCT product_productname FROM cart WHERE user_fullname = ?");
            getProducts.setString(1, fullname);
            ResultSet rs = getProducts.executeQuery();
            ArrayList<String> products = new ArrayList<>();
            while(rs.next()) {
                products.add(rs.getString(1));
            }
            return products;
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    private void addAvailable(String fullname, String product) {
        try {
            PreparedStatement addAvailable = conn.prepareStatement("SELECT COUNT(product_productname) FROM cart WHERE user_fullname = ? AND product_productname = ?");
            addAvailable.setString(1, fullname);
            addAvailable.setString(2, product);
            ResultSet rs = addAvailable.executeQuery();
            rs.next();
            productDAO.setAvailable(product, rs.getInt(1));
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void addSoldAmount(String fullname, String product) {
        try {
            PreparedStatement addAvailable = conn.prepareStatement("SELECT COUNT(product_productname) FROM cart WHERE user_fullname = ? AND product_productname = ?");
            addAvailable.setString(1, fullname);
            addAvailable.setString(2, product);
            ResultSet rs = addAvailable.executeQuery();
            rs.next();
            productDAO.setSoldAmount(product, rs.getInt(1));
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    public void removeCart(String fullname, boolean buy) {
        try {
            for(String productnaam : getProductsInCart(fullname)) {
                if(buy) {
                    addSoldAmount(fullname, productnaam);
                } else {
                    addAvailable(fullname, productnaam);
                }
            }
            PreparedStatement removeCart = conn.prepareStatement("DELETE from cart where user_fullname = ?");
            removeCart.setString(1, fullname);
            removeCart.execute();
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        } 
    }
    
    public void removeProductFromCart(String fullname, String product) {
        try {
            PreparedStatement removeProductFromCart = conn.prepareStatement("SELECT min(id) from cart where user_fullname = ? AND product_productname = ?");
            removeProductFromCart.setString(1, fullname);
            removeProductFromCart.setString(2, product);
            ResultSet rs = removeProductFromCart.executeQuery();
            rs.next();
            
            PreparedStatement removeProductFromCart2 = conn.prepareStatement("DELETE from cart where id = ?");
            removeProductFromCart2.setInt(1, rs.getInt(1));
            removeProductFromCart2.execute();
            
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
