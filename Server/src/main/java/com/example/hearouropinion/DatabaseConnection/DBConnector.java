package com.example.hearouropinion.DatabaseConnection;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

public abstract class DBConnector {
    abstract Connection connect() throws ClassNotFoundException, SQLException, IOException;
}
