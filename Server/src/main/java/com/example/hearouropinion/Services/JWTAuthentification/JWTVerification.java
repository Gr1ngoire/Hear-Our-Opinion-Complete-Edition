package com.example.hearouropinion.Services.JWTAuthentification;

import com.auth0.jwk.*;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public class JWTVerification {
    private final RSAPrivateKey privateKey;
    private final RSAPublicKey publicKey;
    private final String tenant;

    // Verification based on RSA256
    public JWTVerification(RSAPublicKey publicKey, String tenant) {
        this.privateKey = null;
        this.publicKey = publicKey;
        this.tenant = tenant;
    }

    public void verify(String token) throws JWTVerificationException, JwkException {
        JwkProvider provider = new UrlJwkProvider(tenant);
        DecodedJWT jwt = JWT.decode(token);

        // Kid
        Jwk jwk = provider.get(jwt.getKeyId());
        Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(tenant)
                .build();

        jwt = verifier.verify(token);

//        System.out.println(jwt.getHeader());
//        System.out.println(jwt.getKeyId());
//        System.out.println(jwt.getPayload());
//        System.out.println(jwt.getSignature());
//        System.out.println(jwt.getToken());
//        System.out.println(jwt.getAlgorithm());
    }
}
