package dev.steadypim.multimodalb2bshipmentdiploma.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Map;

import static java.time.Instant.now;
import static java.time.temporal.ChronoUnit.DAYS;
import static java.util.Date.from;

@Service
public class JWTUtil {

    private static final SecretKey key = Jwts.SIG.HS256.key().build();
    public String issueToken(String subject) {
        return issueToken(subject, Map.of());
    }

    public String issueToken(String subject, String ...scopes) {
        return issueToken(subject, Map.of("scopes", scopes));
    }

    public String issueToken(
            String subject,
            Map<String, Object> claims) {
        return Jwts
                .builder()
                .claims(claims)
                .subject(subject)
                .issuer("https://steadypim.diploma.com")
                .issuedAt(from(now()))
                .expiration(from(now().plus(15, DAYS)))
                .signWith(key)
                .compact();
    }

}
