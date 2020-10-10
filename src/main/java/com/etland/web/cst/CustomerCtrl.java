package com.etland.web.cst;

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
import org.springframework.web.bind.annotation.RestController;

import com.etland.web.cmm.IFunction;
import com.etland.web.cmm.ISupplier;
import com.etland.web.cmm.IConsumer;
import com.etland.web.cmm.PrintService;
import com.etland.web.cmm.Proxy;
import com.etland.web.cmm.Users;
import com.etland.web.emp.EmployeeMapper;

@RestController
public class CustomerCtrl {
	private static final Logger logger = LoggerFactory.getLogger(CustomerCtrl.class);
	
	@Autowired Customer cust;
	@Autowired PrintService ps;
	@Autowired CustomerMapper custMap;
	@Autowired EmployeeMapper empMap;
	@Autowired Users<?> user;
	@Autowired Map<String,Object> map;
	@Autowired Proxy pxy;
	
	@PostMapping("/customers/{userid}")
	public Customer login(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("======= login 진입 ======");
		IFunction i = (Object o) -> custMap.selectCustomer(param);
		return (Customer)i.apply(param);
	}
	
	@GetMapping("/customers/page/{page}")
	public Map<?,?> list(
			@PathVariable String page) {
		logger.info("======= list 진입 ======");
		 // page_num, page_size, block_Size, total_count
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_size", "5");
		ISupplier sup = ()-> custMap.countAllCustomers();
		map.put("total_count", sup.get());
		pxy.carryOut(map);
		ps.accept("시작값: "+pxy.getStartRow());
		ps.accept("마지막값: "+pxy.getEndRow());
		IFunction i = (Object o) -> custMap.selectCustomers(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		ps.accept("리스트:: "+ls);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@PostMapping("/customers")
	public Map<?,?> join(
			@RequestBody Customer param) {
		logger.info("======= 등록 진입 ======");
		IConsumer i = (Object o) -> custMap.insertCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	@PutMapping("/customers/{userid}")
	public Map<?,?> update(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("======= 수정 진입 ======");
		IConsumer i = (Object o) -> custMap.updateCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	@DeleteMapping("/customers/{userid}")
	public Map<?,?> delete(
			@PathVariable String userid,
			@RequestBody Customer param) {
		logger.info("======= 삭제 진입 ======");
		IConsumer i = (Object o) -> custMap.deleteCustomer(param);
		i.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
}




