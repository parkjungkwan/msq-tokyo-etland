package com.etland.web.cat;

import org.springframework.stereotype.Repository;

import com.etland.web.cst.Customer;

@Repository
public interface CategoryMapper {
	public String txCategory(String s);
}
