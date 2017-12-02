/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.hsleiden.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Singleton;

/**
 *
 * @author bas_d
 */
@Singleton
public class DbManager {
    private final String url = "jdbc:postgresql://localhost/webshop";
    private final String username = "postgres";
    private final String password = "postgres";
    
    ArrayList<Connection> connections = new ArrayList<>();
    
    public Connection getConnection() {
        Connection conn;
        try {
            conn = DriverManager.getConnection(url, username, password);
            connections.add(conn);
            return conn;
        } catch (SQLException ex) {
            Logger.getLogger(DbManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    public void closeConnection(Connection connection) {
        try {
            connections.remove(connection);
            connection.close();
        } catch (SQLException ex) {
            Logger.getLogger(DbManager.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public ArrayList<Connection> getConnections() {
        return connections;
    }

    public void setConnections(ArrayList<Connection> connections) {
        this.connections = connections;
    }
    
    
}
