package com.etland.web.cmm;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.etland.web.cst.Customer;
import com.etland.web.emp.Employee;

import lombok.Data;


@Data @Lazy
@Component
public class Users<T> {
	ArrayList<T> users = new ArrayList<>();
	
	void add(T item) {users.add(item);}
	T get(int i) {return users.get(i);}
	int size() {return users.size();}
	
	public Object user(Object p){
		Object o = null;
		if (p instanceof Customer) {
            o = new Customer();
             
        } else if (p instanceof Employee) {
        	o = new Employee();
        }
		return o;
	}
}
