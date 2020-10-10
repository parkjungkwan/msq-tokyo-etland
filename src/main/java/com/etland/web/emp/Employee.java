package com.etland.web.emp;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.etland.web.cmm.Users;

import lombok.Data;

@Data @Component @Lazy
public class Employee{
	private String employeeID,
	   manager,
	   name,
	   birthDate,
	   photo,
	   notes;
}
