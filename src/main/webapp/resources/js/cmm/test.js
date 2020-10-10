var test = test || {};
test = (()=>{
	let init=x=>{
		test.$.init(x);
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
	};
	return {init: init};
})();



