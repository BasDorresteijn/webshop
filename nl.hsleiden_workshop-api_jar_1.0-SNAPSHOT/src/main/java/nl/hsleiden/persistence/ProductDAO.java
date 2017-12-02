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
    
    private DbManager dbManager;
    
    @Inject
    public ProductDAO(DbManager dbManager) {
        this.dbManager = dbManager;
    }
    
    public ArrayList<Product> getAllProducten() {
        Connection conn = dbManager.getConnection();
        ArrayList<Product> producten = new ArrayList<>();
        try {
            PreparedStatement getProducten = conn.prepareStatement("SELECT * FROM producten");
            ResultSet rs = getProducten.executeQuery();
            while(rs.next()) {
                Product p = new Product();
                p.setProductName(rs.getString(1));
                p.setPrice(rs.getDouble(2));
                p.setDescription(rs.getString(3));
                p.setAvailable(rs.getInt(4));
                p.setSoldAmount(rs.getInt(5));
                producten.add(p);
            }
            return producten;
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public Product getProduct(String productName) {
        Connection conn = dbManager.getConnection();
        
        try {
            PreparedStatement getProduct = conn.prepareStatement("SELECT * FROM producten WHERE productname = ? ");
            getProduct.setString(0, productName);
            ResultSet rs = getProduct.executeQuery();
            while(rs.next()) {
                Product p = new Product();
                p.setProductName(rs.getString(1));
                p.setPrice(rs.getDouble(2));
                p.setDescription(rs.getString(3));
                p.setAvailable(rs.getInt(4));
                p.setSoldAmount(rs.getInt(5));
                return p;
            }
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
