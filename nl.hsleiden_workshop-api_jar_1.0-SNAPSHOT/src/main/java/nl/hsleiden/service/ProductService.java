/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.service;

import java.util.Collection;
import javax.inject.Inject;
import javax.ws.rs.ForbiddenException;
import nl.hsleiden.model.Product;
import nl.hsleiden.model.User;
import nl.hsleiden.persistence.ProductDAO;

/**
 *
 * @author bas_d
 */
public class ProductService {

    private final ProductDAO productDAO;
    
    @Inject
    public ProductService(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public Collection<Product> getAll() {
        return productDAO.getAllProducten();
    }
    
    public Product getProduct(String productName) {
        return productDAO.getProduct(productName);
    }
    
    public void updateProduct(String productnaam, Product product) {
        productDAO.update(productnaam, product);
    }
    
    public void buy(String productnaam, Product product) {
        productDAO.buy(productnaam, product);
    }
    
    
    public void addProduct(Product product) {
        productDAO.add(product);
    }
    
    public void removeProduct(String productname) {
        productDAO.remove(productname);
    }
}
