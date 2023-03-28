//package com.roller.doc.api.config;
//
//import com.roller.doc.api.util.JWTAuthenticationFilter;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//
//@Configuration
//@Slf4j
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//
//    protected SecurityFilterChain configure(HttpSecurity http) throws Exception{
//        http
//                .httpBasic().disable()
//                .cors().and()
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .addFilterBefore()
//                .oauth2Login()
//                .successHandler()
//                .userInfoEndpoint()
//                .userService();
//
//
//        return http.build();
//    }
//}
