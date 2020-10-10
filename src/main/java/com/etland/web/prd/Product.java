package com.etland.web.prd;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data @Component @Lazy
public class Product {
	private String productID,
	   productName,
	   supplierID,
	   categoryID,
	   unit,
	   color,
	   comment,
	   price;
	   private List<String> freebies
	   ;
}
