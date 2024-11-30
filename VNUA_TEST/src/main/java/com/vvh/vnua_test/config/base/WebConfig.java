package com.vvh.vnua_test.config.base;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Domain cho phep
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Method cho phep
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Content-Type") // Header tra ve cho client
                .allowCredentials(true) // Cho phep co cookies khong
                .maxAge(3600); // Thoi gian cache

    }
}
