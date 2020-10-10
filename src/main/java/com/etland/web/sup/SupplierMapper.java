package com.etland.web.sup;

import org.springframework.stereotype.Repository;

import com.etland.web.cst.Customer;

@Repository
public interface SupplierMapper {
	public String txSupplier(String supplierID);
}
