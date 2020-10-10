package com.etland.web.prd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.etland.web.cmm.Proxy;
import com.etland.web.prd.Product;

@Repository
public interface ProductMapper {
	public void insertProduct(Product cust);
	public List<Product> selectProductList(Map<?,?> map);
	public List<?> selectProducts(Proxy pxy);
	public Product selectProduct(Product prd);
	public int countProducts(Map<?,?> map);
	public int countAllProducts();
	public List<?> searchProducts(Proxy pxy);
	public int countSearchProducts(String search);
	public void updateProduct(Product prd);
	public Map<String, Object> selectProfile(Map<?,?> map);
	public void deleteProduct(Product prd);
	public Map<String, Object> selectPhone(Map<?,?> map);
	
	
}
