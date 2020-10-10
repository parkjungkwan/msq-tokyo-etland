"use strict";
var auth = auth || {};

auth = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.';
	let _,js,
		compojs,custjs,
		r_cnt, l_cnt;
	let init =()=>{
		_ = $.ctx();
		js = $.js();
		compojs = js+'/cmp/compo.js';
		custjs = js+'/cst/cust.js';
		r_cnt = '#right_content';
		l_cnt = '#left_content';
	};
	let onCreate =()=>{
		init();
		$.when(
			$.getScript(compojs),
			$.getScript(custjs),
			$.Deferred(function(d){
				 $(d.resolve);
			})
		).done(()=>{
			setContentView();
			$('form button[type=submit]').click(e=>{
					e.preventDefault();
					login();
			});
		}).fail(()=>{
			alert(WHEN_ERR);
		});
	};
	let setContentView =()=>{
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
				 case 'login':
					 $(r_cnt).empty();
					 $(compo.cust_login_form())
					 .appendTo(r_cnt);
					 $('form button[type=submit]').click(e=>{
						e.preventDefault();
						login();
					});
					 return;
				 case 'join':
					 $(r_cnt).empty();
					 $(compo.cust_join_form())
					 .appendTo(r_cnt);
					 join();
					 return;
				 case 'register':
					 $(r_cnt).empty();
					 $(compo.emp_register_form())
					 .appendTo(r_cnt);
					 return;
				 case 'access':
					 $(r_cnt).empty();
					 $(compo.emp_access_form())
					 .appendTo(r_cnt);
					 $('#access_btn').click(()=>{
						emp.custLst();
						 // 시간단축을 위한 과정 생략 access();
					 });
					 return;
				 }
			 });
		});
		$('#login').addClass('active');
		$('#srch_grp').hide();
	};
	let nav=()=>{
		return [{
			txt : '로그인', name : 'login'
		},{
			txt : '회원가입', name : 'join'
		},{
			txt : '사원등록', name : 'register'
		},{
			txt : '사원접속', name : 'access'
		}];
	};
	let login =()=>{
		init();
		onCreate();
		$(r_cnt).html(compo.cust_login_form());
		$('form button[type=submit]').click(e=>{
			e.preventDefault();
			let data = {
					customerID:$('form input[name=customerID]').val(),
					password:$('form input[name=password]').val()};
			 $.ajax({
				 url : _+'/customers/'+data.customerID,
				 type : 'POST',
				 dataType : 'json',
				 data : JSON.stringify(data),
				 contentType : 'application/json',
				 success : d =>{
					 if(d.customerID!==''){
						cust.det();
					 }else{
						 alert('로그인 실패');
					 }
					 
				 },
				 error : e=>{
					 alert('실패');
				 }
			 });
		});
		
	};
	let join =()=>{
		let data = {
				customerID:$('form input[name=uname]').val(),
				password:$('form input[name=psw]').val()};
		 $.ajax({
			 url : _+'/customers',
			 type : 'POST',
			 dataType : 'json',
			 data : JSON.stringify(data),
			 contentType : 'application/json',
			 success : d =>{
				 if(d.msg==='SUCCESS'){
					 alert('회원가입 성공  '+d.msg);
					 $("#right_content").html(compo.cust_login_form());
					 $('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
					});
				
				 }else{
					 alert('회원가입 실패');
					 $("#right_content").html(compo.cust_join_form());
					 join();
				 }
				 
			 },
			 error : e=>{
				 alert('실패');
			 }
		 });
	};
	let register =()=>{
		let data = {
				employeeID:$('form input[name=employeeID]').val(),
				name:$('form input[name=name]').val(),
				manager:$('form input[name=manager]').val(),
				birthDate:$('form input[name=birthDate]').val(),
				photo:$('form input[name=photo]').val(),
				notes:$('form input[name=notes]').val()};
		 $.ajax({
			 url : _+'/employees/',
			 type : 'POST',
			 dataType : 'json',
			 data : JSON.stringify(data),
			 contentType : 'application/json',
			 success : d =>{
				 if(d.msg==='SUCCESS'){
					 alert('회원가입 성공  '+d.msg);
					 $("#right_content").html(compo.cust_login_form());
					 $('form button[type=submit]').click(e=>{
							e.preventDefault();
							login();
					});
				
				 }else{
					 alert('회원가입 실패');
					 $("#right_content").html(compo.cust_join_form());
					 join();
				 }
				 
			 },
			 error : e=>{
				 alert('실패');
			 }
		 });
	};
	let access =()=>{
		let ok = confirm('사원 입니까?');
		if(ok){
			let emp_no = prompt('사원번호 입력하세요');
			$.getJSON(_+'/employees',d=>{
				if(emp_no === d.employeeID){
					alert('사원 인증 ');
					// 이름 입력창을 그린다
					if($('#name').val() === d.name){
						// 고객 명단 가져오기
						emp.custLst();
					}else{
						
					}
				}else{
					alert('사원번호가 일치하지 않습니다 ');
					// 사원번호가 일치하지 않습니다.
				}
			});
			
		}else{
			alert('사원 전용 페이지 입니다 ');
			// 사원 전용 페이지 입니다
			// 되돌아가기 버튼 이 보인다.
		}
		
	};
	
	return {login:login,join:join,register:register,
		access:access
	};
})();

