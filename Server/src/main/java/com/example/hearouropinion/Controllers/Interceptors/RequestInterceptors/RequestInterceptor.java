package com.example.hearouropinion.Controllers.Interceptors.RequestInterceptors;

import com.auth0.jwk.JwkException;

import javax.servlet.http.HttpServletRequest;

public abstract class RequestInterceptor {
    public abstract void intercept(HttpServletRequest request) throws JwkException;
}
