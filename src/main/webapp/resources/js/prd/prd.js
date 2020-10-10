"use strict";
var prd = prd || {};
prd = (()=>{
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
		}).fail(()=>{
			alert(WHEN_ERR);
		});
	};
	let setContentView=()=>{
		$.when(
                $.js()+'/cmp/compo.js',
                $.js()+'/cst/cust.js'
        ).done(()=>{
            $('#right_content').empty();
             $('#right_content').html(compo.carousel());
             let i = 0;
             for(i=1; i<4;i++){
            	 $('#caro-img-'+i)
            	 .attr('src',$.img()+'/s10-'+i+'.jpg')
            	 .css('width','600px')
            	 ;
             };
        })
	};
	let pos=()=>{
		init();
		$(r_cnt).html(compo.prd_pos_form());
		$('#prd_post_btn').click(function(e){
			alert('-----1-----');
			e.preventDefault();
			let freebies = [];
			 $(".checks:checked").each(function(i) {
				 freebies.push($(this).val());
			});
			
			let pname = $('#product_name').val();
			let price = $('#price').val();
			let comment = $('#comment').val();
			let unit = $('#unit').val();
			if($.fn.nullChecker([pname, price, unit])){
				alert('빈칸을 입력해주세요');
			}else{
				alert('성공 널이 아닙니다');
			}
			 
			let data = {categoryID:$('#category_name option:selected').val(),
						productName:pname,
						price:price,
						unit:unit,
						supplierID:$('#supplier_name').val(),
						color:$('input[name=color]:checked').val(),
						freebies:freebies,
						comment:$('#comment').val()};
			$.ajax({
				url:_+'/phones',
				type:'post',
				data:JSON.stringify(data),
				dataType:'json',
				contentType:'application/json',
				success:d=>{
					alert('성공');
					//lst(1);
				},
				error:e=>{
					alert('에러');
				}
			})
		});
		$('#img_upload_btn').click(function(){
			let ok = (this.files[0].name.match(/jpg|gif|png|jpeg/i)) ? true : false;
			if(ok){
				let fd = new FormData();
				fd.append('file', this.files[0]);
				$.ajax({
					url : _+'/phones/file',
					type : 'POST',
					data : fd,
					async : false,
					cache : false,
					contentType : false,
					processData : false,
					success : d=>{
						alert('파일업로드 성공');
					},
					error : e=>{
						alert('파일업로드 실패');
					}
					
					
				});
			}else{
				alert('gif, png, jpg, jpeg 파일만 업로드 할 수 있습니다');
				
			}
		});
	};
	let lst =x=>{
		init();
		$(r_cnt).empty();
		$.getJSON(_+'/phone/page/'+x, d=>{
			$('<div class="grid-item" id="content_1">'
			+'<h1><font style="font-size: 20px;margin: 0 auto;">고객 목록</font>'
			+'</h1>'
		    +'</div>'
		    +'<div class="grid-item" id="content_2"></div>')
		    .appendTo(r_cnt);
			let table ='<table><tr><th>No.</th>'
			+'<th></th>'
			+'<th>상품아이디</th>'
			+'<th>상품명</th>'
			+'<th>공급업체</th>'
			+'<th>카테고리</th>'
			+'<th>UNIT</th>'
			+'<th>PRICE</th>'
			+'</tr>'
			$.each(d.ls,(i,j)=>{
				table += '<tr><td>'+j.rownum+'</td>'
				+'<td>'+j.productID+'</td>'
				+'<td>'+j.productName+'</td>'
				+'<td>'+j.supplierID+'</td>'
				+'<td>'+'남'+'</td>'
				+'<td>'+j.categoryID+'</td>'
				+'<td>'+j.unit+'</td>'
				+'<td>'+j.price+'</td>'
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
					prodlst(pxy.prevBlock);
				});
			}
			let i = 0;
			for(i=pxy.startPage; i<=pxy.endPage; i++){
				if(pxy.pageNum == i){
					$('<li><a class="page active">'+i+'</a></li>')
					.appendTo('#ul')
					.click(function(){
						prodlst($(this).text());
					});
				}else{
					$('<li><a class="page">'+i+'</a></li>')
					.appendTo('#ul')
					.appendTo('#ul')
					.click(function(){
						prodlst($(this).text());
					});
				}
			}
			if(pxy.existNext){
				$('<li><a>&raquo;</a></li>')
				.appendTo('#ul')
				.click(function(){
					prodlst(pxy.nextBlock);
				});
			}
			
		});
		
	};
	let get=()=>{
		
	};
	let put=()=>{
		
	};
	let del=()=>{
		
	};
	
	
	return {lst: lst,pos: pos
			};
})();



