package com.example.hearouropinion.Controllers.Interceptors.RequestInterceptors;

import com.auth0.jwk.JwkException;
import com.example.hearouropinion.Services.JWTAuthentification.JWTVerification;

import javax.servlet.http.HttpServletRequest;

public class JwtVerificationInterceptor extends RequestInterceptor {
    private final JWTVerification verification = new JWTVerification(null, "https://dev-60hiqvk9.us.auth0.com/");

    @Override
    public void intercept(HttpServletRequest request) throws JwkException {
        String token = request.getHeader("authorization").split(" ")[1];
        System.out.println(token);
        verification.verify(token);
    }
}
