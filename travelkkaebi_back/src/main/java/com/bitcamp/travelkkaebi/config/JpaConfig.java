package com.bitcamp.travelkkaebi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.PageableHandlerMethodArgumentResolverCustomizer;

@EnableJpaAuditing
@Configuration
public class JpaConfig {
    @Bean
    public PageableHandlerMethodArgumentResolverCustomizer customize() {
        return page -> page.setOneIndexedParameters(true);
    }
}
