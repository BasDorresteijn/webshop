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
    private final Connection conn;
    
    @Inject
    public ProductDAO(DbManager dbManager) {
        this.dbManager = dbManager;
        this.conn = dbManager.getConnection();
    }
    
    public ArrayList<Product> getAllProducten() {
        ArrayList<Product> producten = new ArrayList<>();
        try {
            PreparedStatement getProducten = conn.prepareStatement("SELECT * FROM product ORDER BY productname desc");
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
            getProducten.close();
            rs.close();
            return producten;
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public Product getProduct(String productName) {
        
        try {
            Product p = new Product();
            PreparedStatement getProduct = conn.prepareStatement("SELECT * FROM product WHERE productname = ? ");
            getProduct.setString(1, productName);
            ResultSet rs = getProduct.executeQuery();
            while(rs.next()) {
                p.setProductName(rs.getString(1));
                p.setPrice(rs.getDouble(2));
                p.setDescription(rs.getString(3));
                p.setAvailable(rs.getInt(4));
                p.setSoldAmount(rs.getInt(5));
            }
            getProduct.close();
            rs.close();
            return p;
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public void add(Product product) {
        try {
            PreparedStatement insertProduct = conn.prepareStatement("insert into product values(?,?,?,?,?)");
            insertProduct.setString(1, product.getProductName());
            insertProduct.setDouble(2, product.getPrice());
            insertProduct.setString(3, product.getDescription());
            insertProduct.setInt(4, product.getAvailable());
            insertProduct.setInt(5, product.getSoldAmount());
            insertProduct.execute();
            insertProduct.close();
        } catch (SQLException ex) {
            Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void update(String productname, Product product) {
        try {
            PreparedStatement updateProduct = conn.prepareStatement("update product set productname = ?, price = ?, description = ?, "
                    + "available = ?, soldAmount = ? WHERE productname = ?");
            updateProduct.setString(1, product.getProductName());
            updateProduct.setDouble(2, product.getPrice());
            updateProduct.setString(3, product.getDescription());
            updateProduct.setInt(4, product.getAvailable());
            updateProduct.setInt(5, product.getSoldAmount());            
            updateProduct.setString(6, productname);
            System.out.println("wowowowow");
            System.out.println(product.getAvailable());
            updateProduct.execute();
            updateProduct.close();
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void buy(String productname, Product product) {
        try {
            PreparedStatement updateProduct = conn.prepareStatement("update product set available = ? WHERE productname = ?");
            updateProduct.setInt(1, product.getAvailable());         
            updateProduct.setString(2, productname);
            updateProduct.execute();
            updateProduct.close();
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void setAvailable(String productname, int add) {
        try {
            PreparedStatement setAvailable = conn.prepareStatement("UPDATE product SET available = available + ? WHERE productname=?");
            setAvailable.setString(2, productname);
            setAvailable.setInt(1, add);
            setAvailable.execute();
            setAvailable.close();
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void setSoldAmount(String productname, int soldAmount) {
        try {
            PreparedStatement setSoldAmount = conn.prepareStatement("UPDATE product SET soldAmount = soldAmount + ? WHERE productname=?");
            setSoldAmount.setString(2, productname);
            setSoldAmount.setInt(1, soldAmount);
            setSoldAmount.execute();
            setSoldAmount.close();
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void remove(String productname) {
        try {
            PreparedStatement removeProduct = conn.prepareStatement("delete from product where productname = ?");
            removeProduct.setString(1, productname);
            removeProduct.execute();
            removeProduct.close();
        } catch (SQLException ex) {
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
