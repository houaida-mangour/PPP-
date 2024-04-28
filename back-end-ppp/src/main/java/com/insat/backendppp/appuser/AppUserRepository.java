package com.insat.backendppp.appuser;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true) //more into this
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

 //Without extends JpaRepository<AppUser, Long>:
 //Parameter 0 of constructor in com.insat.backendppp.appuser.AppUserService
 // required a bean of type 'com.insat.backendppp.appuser.AppUserRepository' that could not be found.
 //Consider defining a bean of type 'com.insat.backendppp.appuser.AppUserRepository'
 // in your configuration.

 Optional<AppUser> findByEmail (String email);
 
}
