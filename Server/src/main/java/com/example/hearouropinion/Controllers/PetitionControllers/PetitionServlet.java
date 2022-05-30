package com.example.hearouropinion.Controllers.PetitionControllers;

import com.auth0.jwk.JwkException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.hearouropinion.Controllers.Interceptors.RequestInterceptors.JwtVerificationInterceptor;
import com.example.hearouropinion.DatabaseConnection.DAOs.DAO;
import com.example.hearouropinion.DatabaseConnection.DAOs.MysqlDAO;
import com.example.hearouropinion.DatabaseConnection.MysqlConnector;
import com.example.hearouropinion.Entities.Petition;
import com.example.hearouropinion.Entities.ResponseError;
import com.example.hearouropinion.Entities.PetitionWithPetitionId;
import com.example.hearouropinion.Services.Validators.MyPetitionValidator;
import com.example.hearouropinion.Services.Validators.Validator;
import com.google.gson.Gson;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSyntaxException;

import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.Writer;
import java.sql.Connection;
import java.sql.SQLException;

@WebServlet(name = "PetitionServlet", value = "/api/petitions/*")
public class PetitionServlet extends HttpServlet {
    Validator validator;
    DAO dao;
    Gson gson;
    MysqlConnector connector;
    Connection connection;
    JwtVerificationInterceptor JWTInterceptor;

    public void init() {
        gson = new Gson();
        validator = new MyPetitionValidator();
        connector = new MysqlConnector();
        JWTInterceptor = new JwtVerificationInterceptor();
        try {
            connection = connector.connect();
            dao = new MysqlDAO(connection);
        } catch (ClassNotFoundException | IOException | SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {


        try (Writer out = response.getWriter()) {
            JWTInterceptor.intercept(request);

            if (request.getPathInfo() == null) {
                response.setStatus(200);
                out.append(gson.toJson(dao.getAll()));

            } else {
                System.out.println(request.getPathInfo().substring(1));
                Petition result = dao.getById(Integer.parseInt(request.getPathInfo().substring(1)));
                response.setStatus(200);
                out.append(gson.toJson(result));
            }


        } catch (JWTVerificationException | JwkException e) {
            System.out.println("jwt");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, gson.toJson(new ResponseError(HttpServletResponse.SC_FORBIDDEN, e.getMessage())));
        } catch (NumberFormatException e) {
            System.out.println("number");
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, gson.toJson(new ResponseError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage())));
        } catch (IOException | ClassNotFoundException | SQLException e) {
            System.out.println("sql");
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server feels dizzy today. Try again later :)");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {


        try (BufferedReader reader = request.getReader();
             Writer out = response.getWriter()) {
            JWTInterceptor.intercept(request);

            StringBuilder strBuilder = new StringBuilder();
            String s;

            while ((s = reader.readLine()) != null) {
                strBuilder.append(s);
            }

            JsonPrimitive jsonPrimitive = new JsonPrimitive(strBuilder.toString());
            Petition toCreate = gson.fromJson(jsonPrimitive.getAsString(), Petition.class);

            validator.validate(toCreate.asMap());

            PetitionWithPetitionId result = dao.create(toCreate);

            response.setStatus(200);
            out.append(gson.toJson(result));

        } catch (JWTVerificationException | JwkException e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, gson.toJson(new ResponseError(HttpServletResponse.SC_FORBIDDEN, e.getMessage())));
        } catch (IllegalArgumentException | NullPointerException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, gson.toJson(new ResponseError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage())));
        } catch (ClassNotFoundException | SQLException | IOException | JsonSyntaxException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server feels dizzy today. Try again later :)");
        }

    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try (BufferedReader reader = request.getReader();
             Writer out = response.getWriter()) {
            JWTInterceptor.intercept(request);


            StringBuilder strBuilder = new StringBuilder();
            String s;

            while ((s = reader.readLine()) != null) {
                strBuilder.append(s);
            }

            JsonPrimitive jsonPrimitive = new JsonPrimitive(strBuilder.toString());
            System.out.println(jsonPrimitive.getAsString());
            PetitionWithPetitionId toUpdate = gson.fromJson(jsonPrimitive.getAsString(), PetitionWithPetitionId.class);

            System.out.println("Before validation");
            validator.validate(toUpdate.asMap());

            PetitionWithPetitionId result = dao.update(Integer.parseInt(toUpdate.getPetitionId()), toUpdate);

            response.setStatus(200);
            out.append(gson.toJson(result));

        } catch (JWTVerificationException | JwkException e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, gson.toJson(new ResponseError(HttpServletResponse.SC_FORBIDDEN, e.getMessage())));
        } catch (IllegalArgumentException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, gson.toJson(new ResponseError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage())));
        } catch (ClassNotFoundException | SQLException | IOException e) {
            System.out.println(e.getMessage());
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server feels dizzy today. Try again later :)");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try (Writer out = response.getWriter()) {
            JWTInterceptor.intercept(request);

            PetitionWithPetitionId removed = dao.delete(Integer.parseInt(request.getPathInfo().substring(1)));

            response.setStatus(200);
            out.append(gson.toJson(removed));
        } catch (JWTVerificationException | JwkException e) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, gson.toJson(new ResponseError(HttpServletResponse.SC_FORBIDDEN, e.getMessage())));
        } catch (NullPointerException | NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, gson.toJson(new ResponseError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage())));
        } catch (SQLException | ClassNotFoundException | IOException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server feels dizzy today. Try again later :)");
        }

    }

    @Override
    public void destroy() {
        try {
            connection.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
