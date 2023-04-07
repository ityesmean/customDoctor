package com.roller.doc.util;

import com.roller.doc.api.service.auth.TokenService;
import com.roller.doc.db.repository.RedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;


@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final TokenService tokenservice;
    private final RedisUtil redisUtil;
    private final CookieUtil cookieUtil;
    private final RedisRepository redisRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = HeaderUtil.getAccessToken(request);
        String refreshtoken =null;
        log.info("Filter token = {}", token);
        try {
            if (tokenservice.verifyToken(token)) {
                String email = tokenservice.getEmail(token);
                log.info(redisUtil.getData(token));
                if (redisUtil.getData(token) != null){
                    throw new JwtException("Blacklist JWT Token");
                }
                log.info("Member Email = {}", email);
                response.setHeader("Authorization", "Bearer " + token);
                Authentication auth = getAuthentication(email,tokenservice.getPayload(token,"role"));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }else{
                throw new JwtException("Access Expired");
            }
        }catch(Exception e){
            log.info("JWT Token Reissue");
            try {
                refreshtoken = cookieUtil.getRefreshTokenCookie(request);
                String email=null;
                try {
                    email = tokenservice.getEmail(refreshtoken);
                }catch(Exception a){
                    throw new JwtException("RefreshToken Expired or Error");
                }
                log.info("Redis Refresh check = {}",redisUtil.getData(email));
                if(redisUtil.getData(email)==null || tokenservice.getExpiredTokenClaims(refreshtoken)){
                    log.info ("Refreshtoken Expired");
                    throw new JwtException("RefreshToken Expired");
                }

                String nickname = tokenservice.getPayload(refreshtoken,"nickname");
                String role = tokenservice.getPayload(refreshtoken,"role");
                log.info("ROLE = {}" ,role);
                String accesstoken = tokenservice.generateToken(email,role,nickname,"ACCESS");
                String newrefreshtoken = tokenservice.generateToken(email,role,nickname,"REFRESH");
                redisRepository.deleteById(email);
                redisUtil.setDataExpire(email,newrefreshtoken,tokenservice.refreshPeriod);
                ResponseCookie cookie = cookieUtil.getCookie(newrefreshtoken,tokenservice.refreshPeriod);
                response.setContentType("application/json;charset=UTF-8");
                response.setHeader("Authorization", "Bearer " + accesstoken);
                response.setHeader("Set-Cookie",cookie.toString());
                Authentication auth =getAuthentication(email,role);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }catch(JwtException j){
                log.debug("Refreshtoken invaild");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }
        filterChain.doFilter(request,response);
    }

    public Authentication getAuthentication(String email, String role){
        log.info("Auth Email, Role = {} , {}",email,role);
        return new UsernamePasswordAuthenticationToken(email, "", Collections.singleton((new SimpleGrantedAuthority(role))));
    }
}
