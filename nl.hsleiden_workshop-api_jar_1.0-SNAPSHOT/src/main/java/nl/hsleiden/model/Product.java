/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.model;

import com.fasterxml.jackson.annotation.JsonView;
import nl.hsleiden.View;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

/**
 *
 * @author bas_d
 */
public class Product {
    
    @NotEmpty
    @Length(min = 3, max = 100)
    @JsonView(View.Public.class)
    private String productName;
    
    @JsonView(View.Public.class)
    private double price;
    
    @JsonView(View.Public.class)
    private String description;
    
    @JsonView(View.Public.class)
    private int available;
    
    @JsonView(View.Protected.class)
    private int soldAmount;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }

    public int getSoldAmount() {
        return soldAmount;
    }

    public void setSoldAmount(int soldAmount) {
        this.soldAmount = soldAmount;
    }
    
    
}
