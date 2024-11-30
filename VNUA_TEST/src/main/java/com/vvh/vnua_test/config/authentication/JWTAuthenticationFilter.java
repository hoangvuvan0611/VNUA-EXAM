package com.vvh.vnua_test.config.authentication;

import com.vvh.vnua_test.utils.DataUtils;
import com.vvh.vnua_test.utils.JWTProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JWTProvider jwtProvider;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            String jwt = paresJwt(request);
            if (!DataUtils.isEmptyOrNull(jwt) && jwtProvider.validateToken(jwt)) {
                SecurityContextHolder.getContext().setAuthentication(jwtProvider.parseTokenToExtractUserInfo(jwt));
            }
        } catch (Exception ex) {
            logger.error("Cannot set User Authentication :{}", ex);
        }
        filterChain.doFilter(request, response);
    }

    private String paresJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}
