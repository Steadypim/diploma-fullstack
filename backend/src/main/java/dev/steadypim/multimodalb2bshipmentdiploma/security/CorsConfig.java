package dev.steadypim.multimodalb2bshipmentdiploma.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Value("#{'${allowed-origins}'.split(',')}")
    private List<String> allowedOrigins;

    @Value("#{'${allowed-methods}'.split(',')}")
    private List<String> allowedMethods;

    @Value("#{'${allowed-headers}'.split(',')}")
    private List<String> allowedHeaders;

    @Value("#{'${exposed-headers}'.split(',')}")
    private List<String> exposedHeaders;

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(allowedMethods);
        configuration.setAllowedHeaders(allowedHeaders);
        configuration.setExposedHeaders(exposedHeaders);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/", configuration);
        return source;
    }
}
