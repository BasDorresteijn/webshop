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
    
    @Inject
    public CartDAO(ProductDAO productDAO, UserDAO userDAO, DbManager dbManager) {
        this.productDAO = productDAO;
        this.userDAO = userDAO;
        this.dbManager = dbManager;
    }
    
    public ArrayList<Cart> getCarts() {
        Connection conn = dbManager.getConnection();
        try {
            PreparedStatement getcarts = conn.prepareStatement("SELECT * FROM cart");
            ResultSet rs = getcarts.executeQuery();
            User user = new User();
            ArrayList<Cart> carts = new ArrayList<>();
            Cart cart = new Cart();
            while(rs.next()) {
                if(user == null) {
                    user = userDAO.get(rs.getString(1));
                    cart.setUser(user);
                    cart.addProduct(productDAO.getProduct(rs.getString(2)));
                } else if(user == userDAO.get(rs.getString(1))) {
                    cart.addProduct(productDAO.getProduct(rs.getString(2)));
                } else {
                    carts.add(cart);
                    user = userDAO.get(rs.getString(1));
                    cart = new Cart();
                }
            }
            dbManager.closeConnection(conn);
            return carts;
        } catch (SQLException ex) {
            Logger.getLogger(CartDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
        return null;
    }
    
}
