package com.etland.web.prd;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.etland.web.cat.Category;
import com.etland.web.cat.CategoryMapper;
import com.etland.web.cmm.IConsumer;
import com.etland.web.cmm.IFunction;
import com.etland.web.cmm.ISupplier;
import com.etland.web.cmm.PrintService;
import com.etland.web.cmm.Proxy;
import com.etland.web.cmm.Users;
import com.etland.web.sup.Supplier;
import com.etland.web.sup.SupplierMapper;

@RestController
public class ProductCtrl {
	@Autowired Product prd;
	@Autowired PrintService ps;
	@Autowired Users<?> user;
	@Autowired Map<String,Object> map;
	@Autowired Proxy pxy;
	@Autowired ProductMapper prdMap;
	@Autowired CategoryMapper catMap;
	@Autowired SupplierMapper supMap;
	@Autowired Category cat;
	@Autowired Supplier sup;

	private static final Logger logger = LoggerFactory.getLogger(ProductCtrl.class);
	@GetMapping("/phones/{page}")
	public Map<?,?> list(
			@PathVariable String page) {
		logger.info("======= 프로덕트 list 진입 ======");
		map.clear();
		map.put("page_num", page);
		map.put("page_size", "5");
		map.put("block_size", "5");
		ISupplier sup = ()-> prdMap.countAllProducts();
		map.put("total_count", sup.get());
		pxy.carryOut(map);
		IFunction i = (Object o) -> prdMap.selectProducts(pxy);
		List<?> ls = (List<?>) i.apply(pxy);
		map.clear();
		map.put("ls", ls);
		map.put("pxy", pxy);
		return map;
	}
	
	@Transactional
	@PostMapping("/phones")
    public Map<?, ?> regist(
            @RequestBody Product param) {
        logger.info("=========프로덕트 regist 진입======");
        List<String> ls = param.getFreebies();
        IFunction f = s -> catMap.txCategory((String)s);
        IFunction f2 = s -> supMap.txSupplier((String)s);
        String cateID = (String) f.apply(param.getCategoryID()); 
        String suppID = (String) f2.apply(param.getSupplierID());
        param.setCategoryID(cateID);
        param.setSupplierID(suppID);
        IConsumer i = o -> prdMap.insertProduct((Product)o);  
        i.accept(param);
        map.clear();
        map.put("msg", "SUCCESS");
        return map;
    }

	@GetMapping("/phones/{search}/{page}")
    public Map<?, ?> search(
            @PathVariable String search,
            @PathVariable String page) {
        logger.info("=========프로덕트 search 진입======");
        map.clear();
        
        
        map.put("search", search);
        map.put("page_num", page);
        map.put("total_count", prdMap.countSearchProducts(search));
        pxy.carryOut(map);
        ps.accept("검색어:: "+search);
        ps.accept("페이지:: "+page);
        ps.accept("스타트:: "+pxy.getStartRow());
        ps.accept("엔드:: "+pxy.getEndRow());
        map.clear();
        map.put("ls", prdMap.searchProducts(pxy));
        map.put("pxy", pxy);
        return map;
    }
	
	@GetMapping("/phones/{search}/grid/{page}")
    public Map<?, ?> grid(
            @PathVariable String search,
            @PathVariable String page) {
        logger.info("=========프로덕트 grid 진입======");
        map.clear();
        map.put("search", search);
        map.put("page_num", page);
        map.put("page_size", "9");
        map.put("total_count", prdMap.countSearchProducts(search));
        pxy.carryOut(map);
        ps.accept("검색어:: "+search);
        ps.accept("페이지:: "+page);
        ps.accept("스타트:: "+pxy.getStartRow());
        ps.accept("엔드:: "+pxy.getEndRow());
        map.clear();
        map.put("ls", prdMap.searchProducts(pxy));
        map.put("pxy", pxy);
        return map;
    }
	@PostMapping("/phones/file")
	public Map<?,?> fileUpload(@RequestBody MultipartFile file )throws Exception{
		ps.accept("넘어온 파일명: "+file.getName());
		return map;
		
	}

	
}
