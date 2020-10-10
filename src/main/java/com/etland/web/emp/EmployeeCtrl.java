package com.etland.web.emp;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.etland.web.cmm.IConsumer;
import com.etland.web.cmm.IFunction;
import com.etland.web.cmm.ISupplier;
import com.etland.web.cmm.PrintService;
import com.etland.web.cmm.Users;
import com.etland.web.cst.CustomerCtrl;

@RestController
public class EmployeeCtrl {
private static final Logger logger = LoggerFactory.getLogger(CustomerCtrl.class);
	
	@Autowired Employee emp;
	@Autowired PrintService ps;
	@Autowired EmployeeMapper empMap;
	@Autowired Users<?> user;
	@Autowired Map<String,Object> map;
	
	@GetMapping("/employees")
	public Employee login() {
		ISupplier i = () -> empMap.findOneEmployee();
		return (Employee)i.get();
	}
	
}










