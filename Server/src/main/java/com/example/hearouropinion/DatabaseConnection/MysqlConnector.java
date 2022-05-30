package com.example.hearouropinion.DatabaseConnection;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class MysqlConnector extends DBConnector {

    private Map<String, String> getConfigData(String[] params) throws ClassCastException, IOException {
        Map<String, String> toReturn = new HashMap<>();
        Gson gson = new Gson();
        try (Reader reader = new BufferedReader(new FileReader("D:\\Desktop\\University\\HearOurOpinion\\src\\main\\java\\com\\example\\hearouropinion\\config.json"))) {

            Map<?, ?> map = gson.fromJson(reader, Map.class);
            for (String param: params) {
                toReturn.put(param, (String) map.get(param));
            }

        } catch (IOException e) {
            throw new IOException(e.getMessage());
        }

        return toReturn;
    }

    @Override
    public Connection connect() throws ClassNotFoundException, SQLException, IOException {
        Map<String, String> config = getConfigData(new String[]{"mysqlUrl", "user", "password", "MysqlDriverName"});
        Class.forName(config.get("MysqlDriverName"));
        return DriverManager.getConnection(config.get("mysqlUrl"), config.get("user"), config.get("password"));
    }
}
