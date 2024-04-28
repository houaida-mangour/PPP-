package com.insat.backendppp.registration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {
    @Override
    public boolean test(String s) {
        //To-do: Regex to validate email
        return true;
    }
}
