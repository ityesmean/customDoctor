package com.roller.doc.api.service.auth;



import com.roller.doc.db.repository.RedisRepository;
import com.roller.doc.util.CookieUtil;
import com.roller.doc.util.HeaderUtil;
import com.roller.doc.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@Component
@RequiredArgsConstructor
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {
    private final RedisUtil redisUtil;
    private final RedisRepository redisRepository;
    private final TokenService tokenService;
    private final CookieUtil cookieUtil;


    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        try {
            String accesstoken = HeaderUtil.getAccessToken(request);
            log.info("Logout access_token = {}",accesstoken);
            redisUtil.setDataExpire(accesstoken, "true", TokenService.accessPeriod);
        }catch(Exception e){
            e.printStackTrace();
        }

        String refreshtoken = cookieUtil.getRefreshTokenCookie(request);
        String email = tokenService.getEmail(refreshtoken);
        log.info("Log out Email = {}",email);
        redisUtil.delData(email);
        response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect("/");
    }
}


