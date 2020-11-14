package com.CS157Ateam5.server;

import com.CS157Ateam5.server.RegistErrorChecker;
import com.CS157Ateam5.server.JWTUtil;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;






@RestController
@CrossOrigin
public class UserController {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	 
	 @CrossOrigin
	 @PostMapping(value="/")
	 public @ResponseBody String addNewEntry(@RequestBody Users user) {
		 	//RegistErrorChecker myObj = new RegistErrorChecker("","","");
		 	List<String> usernameList = new ArrayList<>();
		 	List<String> emailList = new ArrayList<>();
		 	String usernameQuery = "SELECT username FROM users WHERE users.username = '"+user.getUsername()+"';";
		 	String emailQuery = "SELECT username FROM users WHERE users.email = '"+user.getEmail()+"';";
		 	
			usernameList.addAll(jdbcTemplate.queryForList(usernameQuery, String.class));
			emailList.addAll(jdbcTemplate.queryForList(emailQuery, String.class));

			
			if(usernameList.size()>0) {
		    	//myObj.setUsernameError("Duplicate username.");
		    	
		    	return "Duplicate username.";
		    }
		    else if(emailList.size()>0){
		    	//myObj.setEmailError("Duplicate email.");
		    	return "Duplicate email.";
		    }
		    else if(user.getPassword().equals(user.getConfirmPassword()) == false){
		    	//myObj.setConfirmPasswordError("Password does not match.");
		    	return "Password does not match. " + user.getPassword() + " this does not equal to: " + user.getConfirmPassword();
		    }
		   else {
			    JWTUtil jwt = new JWTUtil();
			    BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
			    String hashedPassword = passEncoder.encode(user.getPassword());
		    	jdbcTemplate.update("INSERT INTO users(email,password,username) values('" + user.getEmail()+"','"+hashedPassword+"','"+user.getUsername()+"')");
		    	String token = jwt.generateToken(user.getEmail());
		    	return token;
		    }
		}
	}
