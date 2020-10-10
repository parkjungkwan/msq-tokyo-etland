"use strict";
var cust = cust || {}
cust = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
	let _,js,
		compojs,prdjs,custjs,
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
		}).fail(()=>{
			alert(WHEN_ERR);
		});
		$('#srch_btn')
		.click(e=>{
			init();
			$(r_cnt).empty();
			let search = $('#srch_val').val();
			let page = '1';
			let url = _+'/phones/'+ search+'/'+page;
			alert(url);
			$.getJSON(url, d=>{
				$('<div class="grid-item" id="content_1">'
				+'<h1><font id="srch_tit" style="font-size: 20px;margin: 0 auto;">조회 결과</font>'
				+'</h1>'
				+'<button id="grid_btn">그리드로 보기</button>'
			    +'</div>'
			    +'<div class="grid-item" id="content_2"></div>')
			    .appendTo(r_cnt);
				let table ='<table><tr><th>No.</th>'
				+'<th>상품명</th>'
				+'<th>제조사</th>'
				+'<th>상품가격</th>'
				+'<th>수량</th>'
				+'</tr>'
				$.each(d.ls,(i,j)=>{
					table += '<tr><td>'+j.rownum+'</td>'
					+'<td>'+j.productName+'</td>'
					+'<td>'+j.supplierName+'</td>'
					+'<td>'+j.price+'</td>'
					+'<td>'+j.unit+'</td>'
					+'</tr>'
				});
				table += '</table>'
				$(table)
				.attr('id','cust_tab')
				.css({'font-family':'arial, sans-serif',
					'border-collapse':'collapse',
					'width':'100%',
					'text-align': 'center',
					'display': 'inline-block'
					
				})
				.addClass('pagination center')
				.appendTo('#content_2');
				let pxy = d.pxy;
				let ul = '<nav aria-label="Page navigation" style="width:400px;margin: 0 auto;"><ul id="ul" class="pagination"></ul></nav>';
				$(ul).appendTo('#content_2');
				if(pxy.existPrev){
					$('<li><a>&laquo;</a></li>')
					.appendTo('#ul')
					.click(function(){
						// 재귀호출
					});
				}
				let i = 0;
				for(i=pxy.startPage; i<=pxy.endPage; i++){
					if(pxy.pageNum == i){
						$('<li><a class="page active">'+i+'</a></li>')
						.appendTo('#ul')
						.click(function(){
							// 재귀호출
						});
					}else{
						$('<li><a class="page">'+i+'</a></li>')
						.appendTo('#ul')
						.click(function(){
							// 재귀호출
						});
					}
				}
				if(pxy.existNext){
					$('<li><a>&raquo;</a></li>')
					.appendTo('#ul')
					.click(function(){
						// 재귀호출
					});
				}
				// 그리드버튼 클릭시
				$('#grid_btn').click(e=>{
					$('#content_2').empty();
					let url = _+'/phones/'+ search+'/grid/'+page;
					$.getJSON(url,d=>{
						let i = 0;
				        $('<div id="grid" />').appendTo('#content_2');
						$.each(d.ls,(x,y)=>{
				            $('<div class="col-md-4">'
				                      +'<div class="thumbnail">'
				                        +'<a href="#" target="_blank">'
				                          +'<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanydDprvV35nlbHP2RwvjdyPrYgOgjevy7W_efJ2tTEVZvKKF" alt="Lights" style="width:100%">'
				                          +'<div class="caption">'
				                            +'<p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>'
				                          +'</div>'
				                        +'</a>'
				                      +'</div>'
				                    ).appendTo('#grid')
				        })
				       
					});
					$('#grid_btn').text('리스트 보기');
				});
			});
		});
	};
	let setContentView=()=>{
		$(l_cnt+' ul.nav').empty();
		$.each(nav(),(i,j)=>{
			 $('<li><a href="#">'+j.txt+'</a></li>')
			 .attr('name', j.name)
			 .attr('id', j.name)
			 .appendTo(l_cnt+' ul.nav')
			 .click(function(){
				 let that = $(this).attr('name');
				 $(this).addClass('active');
				 $(this).siblings().removeClass('active');
				 switch(that){
				 case 'det':
					 break;
				 case 'upd':
					 break;
				 case 'del':
					 break;
				 case 'shop':
					 
					 break;
			 	 case 'buylist':
					 
					 break;	
			 	case 'cart':
					 
					 break;	
			 	case 'logout':
					 
					 break;	
				 }
			 });
		});
		$('#detail').addClass('active');
		$('#srch_grp').show();
	};
	let nav=()=>{
		return [{
			txt : '마이페이지', name : 'det'
		},{
			txt : '정보수정', name : 'upd'
		},{
			txt : '회원탈퇴', name : 'del'
		},{
			txt : '쇼핑몰', name : 'shop'
		},{
			txt : '구매내역', name : 'buylist'
		},{
			txt : '장바구니', name : 'cart'
		},{
			txt : '로그아웃', name : 'logout'
		}];
	};
	let pos =()=>{};
	let det =()=>{
		init();
		onCreate();
		$(r_cnt).html(compo.cust_detail());
	};
	let lst =x=>{
		init();
		$(r_cnt).empty();
		$.getJSON(_+'/customers/page/'+x, d=>{
			$('<div class="grid-item" id="content_1">'
			+'<h1><font style="font-size: 20px;margin: 0 auto;">고객 목록</font>'
			+'</h1>'
		    +'</div>'
		    +'<div class="grid-item" id="content_2"></div>')
		    .appendTo(r_cnt);
			let table ='<table><tr><th>No.</th>'
			+'<th>아이디</th>'
			+'<th>이름</th>'
			+'<th>생년월일</th>'
			+'<th>성별</th>'
			+'<th>전화</th>'
			+'<th>주소</th>'
			+'<th>우편번호</th>'
			+'</tr>'
			$.each(d.ls,(i,j)=>{
				table += '<tr><td>'+j.rownum+'</td>'
				+'<td>'+j.customerID+'</td>'
				+'<td>'+j.customerName+'</td>'
				+'<td>'+j.ssn+'</td>'
				+'<td>'+'남'+'</td>'
				+'<td>'+j.phone+'</td>'
				+'<td>'+j.address+'</td>'
				+'<td>'+j.postalCode+'</td>'
				+'</tr>'
			});
			table += '</table>'
			$(table)
			.attr('id','cust_tab')
			.css({'font-family':'arial, sans-serif',
				'border-collapse':'collapse',
				'width':'100%',
				'text-align': 'center',
				'display': 'inline-block'
				
			})
			.addClass('pagination center')
			.appendTo('#content_2');
			let pxy = d.pxy;
			let ul = '<nav aria-label="Page navigation" style="width:400px;margin: 0 auto;"><ul id="ul" class="pagination"></ul></nav>';
			$(ul).appendTo('#content_2');
			if(pxy.existPrev){
				$('<li><a>&laquo;</a></li>')
				.appendTo('#ul')
				.click(function(){
					lst(pxy.prevBlock);
				});
			}
			let i = 0;
			for(i=pxy.startPage; i<=pxy.endPage; i++){
				if(pxy.pageNum == i){
					$('<li><a class="page active">'+i+'</a></li>')
					.attr('href',_+'/customers/page/'+i)
					.appendTo('#ul')
					.click(function(){
						lst($(this).text());
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.appendTo('#ul')
					.attr('href',_+'/customers/page/'+i)
					.appendTo('#ul')
					.click(function(){
						lst($(this).text());
					});
				}
			}
			if(pxy.existNext){
				$('<li><a>&raquo;</a></li>')
				.appendTo('#ul')
				.click(function(){
					lst(pxy.nextBlock);
				});
			}
			
		});
		
	};
	let upd =()=>{};
	let del =()=>{};
	
	return {
		pos:pos,
		lst:lst,
		det:det,
		upd:upd,
		del:del};
})();


