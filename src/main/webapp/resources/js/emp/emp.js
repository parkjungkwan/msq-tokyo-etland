"use strict";
var emp = emp || {};
emp =(()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
	let _,js,
		compojs,custjs,prdjs,
		r_cnt, l_cnt;
	let init =()=>{
		_ = $.ctx();
		js = $.js();
		compojs = js+'/cmp/compo.js';
		custjs = js+'/cst/cust.js';
		prdjs = js+'/prd/prd.js';
		r_cnt = '#right_content';
		l_cnt = '#left_content';
	};
	let onCreate=()=>{
		$.when(
			$.getScript(custjs),
			$.getScript(compojs),
			$.getScript(prdjs)	
		).done(()=>{
			setContentView();
			$('#srch_btn').on('click',()=>{
				alert('테스트');
			});
		}).fail(()=>{
			alert(WHEN_ERR);
		});
	};
	let setContentView =()=>{
		$('#nav').empty();
		$.each(nav(),(i,j)=>{
			 $('<li><a href="#">'+j.txt+'</a></li>')
			 .attr('name', j.name)
			 .attr('id', j.name)
			 .appendTo('#nav')
			 .click(function(){
				 let that = $(this).attr('name');
				 $(this).addClass('active');
				 $(this).siblings().removeClass('active');
				 switch(that){
				 case 'cust_lst':
					 break;
				 case 'item_pos':
					 $(r_cnt).html(compo.prd_pos_form());
					 prd.pos();
					 break;
				 case 'item_lst':
					 $(r_cnt).html(prdLst()); 
					 break;
				 case 'item_upd':
					 
					 
					 break;
			 	 case 'item_del':
					 
					 break;	
			 	case 'item_sta':
					 
					 break;	
			 }
			 });
		});
	};
	let nav =()=>{
		
		return [{
			txt : '고객 목록', name : 'cust_lst'
		},{
			txt : '상품 등록', name : 'item_pos'
		},{
			txt : '상품 목록', name : 'item_lst'
		},{
			txt : '상품 수정', name : 'item_upd'
		},{
			txt : '상품 삭제', name : 'item_del'
		},{
			txt : '상품 통계', name : 'item_sta'
		}];
		
		
	};
	let custLst =()=>{
		 let deferred = $.Deferred();
		 try {
		    // 완료되려면 50초가 걸리는 매우 복잡한 비동기 코드
			init();
			onCreate();
			cust.lst(1);
		    deferred.resolve('성공');
		 }catch (err) {
		    deferred.reject(err);
		 }
		 return deferred.promise();
		
	};
	let prdPos =()=>{};
	let prdLst =()=>{
		 let deferred = $.Deferred();
		 try {
		    // 완료되려면 50초가 걸리는 매우 복잡한 비동기 코드
			init();
			onCreate();
			prd.lst(1);
		    deferred.resolve('성공');
		 }catch (err) {
		    deferred.reject(err);
		 }
		 return deferred.promise();
		
	};
	let srch =()=>{
		
	};
	let prdGet =()=>{};
	let prdUpd =()=>{};
	let prdDel =()=>{};
	let prdSta =()=>{};
	return {
		custLst:custLst,prdLst:prdLst,
		prdPos:prdPos,prdUpd:prdUpd,prdDel:prdDel,prdSta:prdSta};
		
		
})();







