package com.insat.backendppp.registration;

import com.insat.backendppp.appuser.AppUser;
import com.insat.backendppp.appuser.AppUserRole;
import com.insat.backendppp.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final EmailValidator emailValidator;
    private final AppUserService appUserService;
    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        //IllegalStateException is an unchecked exception
        //That's why we don't need to put "throws" in the method signature
        //However, we should handle it  later in the course of project for optimal working of our code.
        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }



        return appUserService.signUp(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER
                )
        );
    }
}
