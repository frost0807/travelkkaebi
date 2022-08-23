package com.bitcamp.travelkkaebi.encode;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Password {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * password encoding
     */
    public static String passwordEncoding(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * password matches
     */
    public static Boolean passwordMatch(String password, String originalPassword) {
        return passwordEncoder.matches(password, originalPassword);
    }

    /**
     * 회원가입시 패스워드 2차검증 method
     */
    public static void passwordSameCheck(String password, String secondPassword) {
        if (!password.equals(secondPassword))
            throw new RuntimeException("password Inconsistency...");
    }
}
