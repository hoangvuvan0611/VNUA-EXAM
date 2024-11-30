package com.vvh.vnua_test.config.lang;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.List;
import java.util.Locale;

@Configuration
public class LocalResolver extends AcceptHeaderLocaleResolver implements WebMvcConfigurer {
    /**
     * Mac dinh cau hinh la tieng anh
     * @param request dau vao chua thong tin language yeu cau
     * @return doi tuong locale chua thong tin ngon ngu duoc xet
     */
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        // Lay thong tin ngon ngu yeu cau tu header cua request
        String languageHeader = request.getHeader("Accept-Language");
        return StringUtils.hasLength(languageHeader)
                // Neu ngon ngu yeu cau trong header thi tim kiem xem co loai ngon ngu yeu cau hay khong
                ? Locale.lookup(
                // Chuyen doi ngon ngu yeu cau tu header de tim kiem
                Locale.LanguageRange.parse(languageHeader),
                List.of(new Locale("vi"), new Locale("en")))
                // Neu khong tim thay ngon ngu yeu cau thi lay ngon ngu mac dinh
                : new Locale("vi");
    }

    /**
     * Thiet lap dinh dang response tra ve co kieu utf-8
     * @return bean chua config ve message tra ve
     */
    @Bean
    public ResourceBundleMessageSource bundleMessageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(3600);
        return messageSource;
    }
}
