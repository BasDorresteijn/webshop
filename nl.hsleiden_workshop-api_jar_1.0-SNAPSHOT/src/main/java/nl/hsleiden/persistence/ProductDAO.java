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
import nl.hsleiden.model.Product;

/**
 *
 * @author bas_d
 */
@Singleton
public class ProductDAO {
    
    private final DbManager dbManager;
    
    @Inject
    public ProductDAO(DbManager dbManager) {
        this.dbManager = dbManager;
    }
    
    public ArrayList<Product> getAllProducten() {
        Connection conn = dbManager.getConnection();
        ArrayList<Product> producten = new ArrayList<>();
        try {
            PreparedStatement getProducten = conn.prepareStatement("SELECT * FROM product");
            ResultSet rs = getProducten.executeQuery();
            while(rs.next()) {
                Product p = new Product();
                p.setProductName(rs.getString(1));
                p.setPrice(rs.getString(2));
                p.setDescription(rs.getString(3));
                p.setAvailable(rs.getInt(4));
                p.setSoldAmount(rs.getInt(5));
                producten.add(p);
            }
            dbManager.closeConnection(conn);
            return producten;
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
        return null;
    }
    
    public Product getProduct(String productName) {
        Connection conn = dbManager.getConnection();
        
        try {
            Product p = new Product();
            PreparedStatement getProduct = conn.prepareStatement("SELECT * FROM producten WHERE productname = ? ");
            getProduct.setString(0, productName);
            ResultSet rs = getProduct.executeQuery();
            while(rs.next()) {
                p.setProductName(rs.getString(1));
                p.setPrice(rs.getString(2));
                p.setDescription(rs.getString(3));
                p.setAvailable(rs.getInt(4));
                p.setSoldAmount(rs.getInt(5));
            }
            dbManager.closeConnection(conn);
            return p;
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
        return null;
    }
    
    public void add(Product product) {
        Connection conn = dbManager.getConnection();
        try {
            PreparedStatement insertProduct = conn.prepareStatement("insert into product values(?,?,?,?,?)");
            insertProduct.setString(1, product.getProductName());
            insertProduct.setString(2, product.getPrice());
            insertProduct.setString(3, product.getDescription());
            insertProduct.setInt(4, product.getAvailable());
            insertProduct.setInt(5, product.getSoldAmount());
            insertProduct.execute();
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
    }

    public void remove(String productname) {
        Connection conn = dbManager.getConnection();
        try {
            PreparedStatement removeProduct = conn.prepareStatement("delete from product where productname = ?");
            removeProduct.setString(1, productname);
            removeProduct.execute();
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        dbManager.closeConnection(conn);
    }
}
