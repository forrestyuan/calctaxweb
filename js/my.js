//全局变量
	var preTaxSalary=$('.preTaxSalary');  //税前工资
	var insurance=$('.insurance'); //保险金
	var startPoint=$('.startPoint'); //起征点
	var yearPrice=$('.yearPrice'); //年终奖
	var monthAverageSalary=$('.monthAverageSalary');//平均每月
	var delPrice=$('.delPrice');//减除费用
	var cutMoney=$('.cutMoney');//应纳税所得金额
	var taxRate=$('.taxRate');//适用税率
	var quickCutNum=$('.quickCutNum');//速算扣除数
	var delIncome=$('.delIncome');//应缴税款
	var realSalary=$('.realSalary');//实发工资
	var showFormu =$('.showFormu');//显示计算公式
	var istuhaoW =$('.istuhao');//生活类型 是否是土豪
	var shouru=$('.shouru');//收入金额
	var time=$('.time');
	var postIncome=$('.postIncome');//税后收入
	
	var preTaxSalaryV=$('#preTaxSalary');  //税前工资
	var insuranceV=$('#insurance'); //保险金
	var startPointV=$('#startPoint'); //起征点
	var yearPriceV=$('#yearPrice'); //年终奖
	var monthAverageSalaryV=$('#monthAverageSalary');//平均每月
	var delPriceV=$('#delPrice');//减除费用
	var cutMoneyV=$('#cutMoney');//应纳税所得金额
	var taxRateV=$('#taxRate');//适用税率
	var quickCutNumV=$('#quickCutNum');//速算扣除数
	var delIncomeV=$('#delIncome');//应缴税款
	var realSalaryV=$('#realSalary');//实发工资
	var showFormuV =$('#showFormu');//显示计算公式
	var istuhaoV =$('#istuhao');//生活类型 是否是土豪
	var shouruV=$('#shouru');//收入金额
	var timeV=$('#time');
	var postIncomeV=$('#postIncome');
//网页加载完执行
$(window).load(function(){
	hideAllResult();
	//选择所得税类型切换页面
	$('.tt').click(function(){
		var typeArr=$('.tt');//所有taxtype
		$(this).css({"background-color":"red","border-radius":"0"});//设置选中类型样式
		//还原未选中类型样式
		for(var i=0;i<typeArr.length;i++){
			if($(typeArr[i]).attr('data-type')!=$(this).attr('data-type')){
				$(typeArr[i]).css({"background-color":"#5cb85c","border-radius":"5px","border-color":"#4cae4c"});
			}
		}
		//调用类型设置函数
		var dataType=$(this).attr('data-type');
		setType(dataType);
		$('#calculate').attr("data-type",dataType);
		console.log($(this).attr('data-type'));
	});
	//显示更多税类型
	$('#showMoreType').click(function(){
		$('.taxType').animate({'height':'580px'});
		$(this).hide();
		$('#hideMoreType').show();
	});
	$('#hideMoreType').click(function(){
		$('.taxType').animate({'height':'200px'});
		$(this).hide();
		$('#showMoreType').show();
	});
	
	//点击计算
	$('#calculate').click(function(){
		var datatype=$(this).attr('data-type');
		if(datatype=='tt1'){
			calcu1();
		}else if(datatype=='tt6'){
			tt6();
		}else{
			calcu3(datatype);
		}
	});
});

/*清除内容*/
function clearCont(){
	preTaxSalaryV.text(""); //税前工资
		insuranceV.text("");//保险金
		//startPointV.text("");//起征点
		yearPriceV.text("");//年终奖
		monthAverageSalaryV.text("");//平均每月
		delPriceV.text("");//减除费用
		cutMoneyV.text("");//应纳税所得金额
		taxRateV.text("");//适用税率
		quickCutNumV.text("");//速算扣除数
		delIncomeV.text("");//应缴税款
		realSalaryV.text("");//实发工资
		//showFormuV.text("");显示计算公式
		//istuhaoV.text("");//生活类型 是否是土豪*/
		shouruV.text("");//收入金额
		//timeV.text("");
		postIncomeV.text("");
}
/*隐藏所有*/
function hideAllResult(){
		preTaxSalary.hide(); //税前工资
		insurance.hide();//保险金
		startPoint.hide();//起征点
		yearPrice.hide();//年终奖
		monthAverageSalary.hide();//平均每月
		delPrice.hide();//减除费用
		cutMoney.hide();//应纳税所得金额
		taxRate.hide();//适用税率
		quickCutNum.hide();//速算扣除数
		delIncome.hide();//应缴税款
		realSalary.hide();//实发工资
		//showFormu.hide();显示计算公式
		//istuhao.hide();//生活类型 是否是土豪*/
		shouru.hide();//收入金额
		time.hide();
		postIncome.hide();
}
/*显示某种*/
function someShow(){
	shouru.show();
	cutMoney.show();taxRate.show();delIncome.show();
	quickCutNum.show();postIncome.show();
}
function tt1show(){
			preTaxSalary.show();insurance.show();startPoint.show();
		taxRate.show(); cutMoney.show(); quickCutNum.show(); 
		realSalary.show(); delIncome.show();istuhao
}
function tt3show(){
		yearPrice.show();
		monthAverageSalary.show(); taxRate.show(); quickCutNum.show();
		delIncome.show(); $(postIncome).show();
}

//除噪函数
function standare(){
	var value=preTaxSalaryV.val();
	var sru=shouruV.val();
	var yearp=yearPriceV.val();
	var isur=insurance.val();
	if(value.match("[a-zA-z]")||sru.match("[a-zA-z]")||yearp.match("[a-zA-z]")||isur.match("[a-zA-z]")){
		alert("wraning,非法");
		return;
	}
	if(value<0 ||sru<0 || yearp<0||isur<0){
		alert("输入金额报废@_@");
		return;
	}
	
	
}
/*计算函数*/
function calcu1(){
	standare();

		var bxfei=insuranceV.val(); //保险费
		var qizd=startPointV.val();  //起征点
		var sqgzi=preTaxSalaryV.val(); //税前工资
		var cutm=sqgzi-bxfei-qizd; ////应纳税所得金额
		var need;
		var rsv;
		cutMoneyV.text(cutm);
		if(cutm<0){
		        quickCutNumV.text("0");
			cutMoneyV.text("0");
			taxRateV.text("0%");
			need=0;
			delIncomeV.text(need);
			realSalaryV.text(sqgzi);
			tuhao(rsv);
		}else if(cutm<1500){
			quickCutNumV.text("0");
			taxRateV.text("3%");
			need=cutm*0.03;
		}else if(cutm>=1500 && cutm<=4500 ){
			quickCutNumV.text("105");
			taxRateV.text("10%");
			need=cutm*0.1-105;
		}else if(cutm>4500 && cutm<=9000){
			quickCutNumV.text("555");
			taxRateV.text("20%");
			need=cutm*0.2-555;
		}else if(cutm>9000 && cutm<=35000){
			quickCutNumV.text("1005");
			taxRateV.text("25%");
			need=cutm*0.25-1005;
		}else if(cutm>35000 && cutm<=55000){
			quickCutNumV.text("2755");
			taxRateV.text("30%");
			need=cutm*0.3-2755;
		}else if(cutm>55000 && cutm<=80000){
			quickCutNumV.text("5505");
			taxRateV.text("35%");
			need=cutm*0.35-5505;
		}else{
			quickCutNumV.text("13505");
			taxRateV.text("45%");
			need=cutm*0.45-13505;
		}
		delIncomeV.text(need);
		rsv=sqgzi-need-bxfei;
		realSalaryV.text(rsv);
		tuhao(rsv);
}
function calcuFork(sru,avg){
	cutMoneyV.text(sru);//应纳税所得金额
	var need;
	var shsru;
		if(avg<1500){
			quickCutNumV.text("0");
			taxRateV.text("3%");
			need=sru*0.03;
		}else if(avg>=1500 && avg<=4500 ){
			quickCutNumV.text("105");
			taxRateV.text("10%");
			 need=sru*0.1-105;
		}else if(avg>4500 && avg<=9000){
			quickCutNumV.text("555");
			taxRateV.text("20%");
			need=sru*0.2-555;
		}else if(avg>9000 && avg<=35000){
			quickCutNumV.text("1005");
			taxRateV.text("25%");
			need=sru*0.25-1005;
		}else if(avg>35000 && avg<=55000){
			quickCutNumV.text("2755");
			taxRateV.text("30%");
			need=sru*0.3-2755;
		}else if(avg>55000 && avg<=80000){
			quickCutNumV.text("5505");
			taxRateV.text("35%");
			var need=sru*0.35-5505;
		}else{
			quickCutNumV.text("13505");
			taxRateV.text("45%");
			need=sru*0.45-13505;
		}
		shsru=sru-need;
		delIncomeV.text(need);
		postIncomeV.text(shsru);
		tuhao(shsru);
}
function calcu3(ttType){
	standare();
	if(ttType=="tt3"){
		var sru=yearPriceV.val(); //收入
		var avg=sru/12;
		monthAverageSalaryV.text(avg);
		calcuFork(sru,avg);
	}else if(ttType=="tt4"){
		tt4();
	}else if(ttType=="tt5"){
		tt5();
	}else if(ttType=="tt7"){
		tt7();
	}else if(ttType=="tt8"){
		tt10();
	}else if(ttType=="tt9"){
		tt9();
	}else if(ttType=="tt10"){
		tt10();
		
	}else if(ttType=="tt11"){
		tt9();
	}else if(ttType=="tt12"){
		tt9();
	}else{
		tt9();
	}
}
function tt7(){
		var sru=shouruV.val();
	quickCutNum.hide();
	delPrice.show();
	if(sru<=4000){ 
		cutMoneyV.text(sru-800);
		var need=(sru-800)*0.14;
		delPriceV.text(800)
	}else{
		cutMoneyV.text(sru*0.8);
		var need=(sru*0.8)*0.14;
		delPriceV.text(sru*0.2);
	}
	taxRateV.text("14%");
	delIncomeV.text(need);
	var shsru=sru-need;
	postIncomeV.text(shsru);
		tuhao(shsru);
}
function tt9(){
	var sru=shouruV.val();
	cutMoneyV.text(sru);
	taxRateV.text('20%');
	var need=sru*0.2;
	delIncomeV.text(need);
	postIncomeV.text(sru-need);
	tuhao(sru-need);
}
function tt6(){
	var sru=shouruV.val();
	var t=timeV.val();
	var cutm=sru-(3500*t);
	cutMoneyV.text(cutm);
	var need;
	if(cutm<0){
		taxRateV.text('0%');
		cutMoneyV.text('0');
		quickCutNumV.text('0');
		delIncomeV.text('0');
	}else if(cutm<=15000){
		taxRateV.text('5%');
		quickCutNumV.text('0');
		need=cutm*0.05;
	}else if(cutm>15000&&cutm<=30000){
		taxRateV.text('10%');
		quickCutNumV.text('750');
		need=cutm*0.1-750;
	}else if(cutm>30000 &&cutm<=60000){
		taxRateV.text('20%');
		quickCutNumV.text('3750');
		need=cutm*0.2-3750;
	}else if(cutm>60000&&cutm<=100000){
		taxRateV.text('30%');
		quickCutNumV.text('9750');
		need=cutm*0.3-9750;
	}else{
		taxRateV.text('35%');
		quickCutNumV.text('14750');
		need=cutm*0.35-14750
	}
	delIncomeV.text(need);
	if(need>0){
		postIncomeV.text(sru-need);
		tuhao(sru-need);
	}else{
		postIncomeV.text(sru);
		tuhao(sru);
	}
		
}
function tt5(){
	var sru=shouruV.val();
	cutMoneyV.text(sru);

	var need;
	if(sru<=15000){
		taxRateV.text('0.05');
		quickCutNumV.text('0%');
		need=sru*0.05;
	}else if(sru>15000&&sru<=30000){
		taxRateV.text('10%');
		quickCutNumV.text('750');
		need=sru*0.1-750;
	}else if(sru>30000 &&sru<=60000){
		taxRateV.text('20%');
		quickCutNumV.text('3750');
		need=sru*0.2-3750;
	}else if(sru>60000&&sru<=100000){
		taxRateV.text('30%');
		quickCutNumV.text('9750');
		need=sru*0.3-9750;
	}else{
		taxRateV.text('35%');
		quickCutNumV.text('14750');
		need=sru*0.35-14750
	}
	delIncomeV.text(need);
	postIncomeV.text(sru-need);
	tuhao(sru-need);
}
function tt4(){
	var sru=shouruV.val();
	quickCutNum.hide();
	delPrice.show();
	delPriceV.text(sru*0.2);
	quickCutNum.show();
	cutMoneyV.text(sru*0.8);
	var need;
	if(sru<=20000){
		quickCutNumV.text(0);
		taxRateV.text("20%");
	    need=(sru*0.8)*0.2;
	}else if(sru>20000 &&sru<=60000){
		quickCutNumV.text(2000);
		taxRateV.text("30%");
		need=(sru*0.8)*0.3-2000;
	}else{
		quickCutNumV.text(7000);
		taxRateV.text("40%");
		need=(sru*0.8)*0.4-7000;
	}
	delIncomeV.text(need);
	postIncomeV.text(sru-need);
	tuhao(sru-need);
}
function tt10(){
	var sru=shouruV.val();
	quickCutNum.hide();
	delPrice.show();
	if(sru<=4000){ 
		cutMoneyV.text(sru-800);
		var need=(sru-800)*0.2;
		delPriceV.text(800)
	}else{
		cutMoneyV.text(sru*0.8);
		var need=(sru*0.8)*0.2;
		delPriceV.text(sru*0.2);
	}
	taxRateV.text("20%");
	delIncomeV.text(need);
	var shsru=sru-need;
	postIncomeV.text(shsru);
	tuhao(shsru);
}

/*是否是土豪*/
function tuhao(shouru){
	if(shouru<=5000){
		istuhaoV.html("<h2><span class='glyphicon glyphicon-star'></span>屌丝级别</2>");
	}else if(shouru>5000&&shouru<=10000){
		istuhaoV.html("<h2><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>小康级别</2>");
	}else if(shouru>10000&&shouru<=50000){
		istuhaoV.html("<h2><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>中产级别</2>");
	}else if(shouru>50000&&shouru<=200000){
		istuhaoV.html("<h2><span class='glyphicon glyphicon-star'></span></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span>准土豪级别</2>");
	}else{
		istuhaoV.html("<h2><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span></span><span class='glyphicon glyphicon-star'></span></span><span class='glyphicon glyphicon-star'></span>土豪我们做朋友吧！！！</2>");
	}
}

function setType(dataType){
	hideAllResult();
	clearCont();
	if(dataType=='tt1'){ //tt1工资、薪金所得(月薪)
		showFormuV.html("个人所得税计算公式<br>"+
						"应纳税所得额 = 工资收入金额 － 各项社会保险费 － 起征点(3500元)<br>"+
						"应纳税额 = 应纳税所得额 x 税率 － 速算扣除数<br>"+
						"说明：如果计算的是外籍人士（包括港、澳、台），则个税起征点应设为4800元。");
		tt1show();
	}else if(dataType=='tt3'){//tt3年终奖
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 年终奖金<br>"+
						"应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数");
		tt3show();
		
	}else if(dataType=='tt4'){// tt4劳务报酬所得
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 劳务报酬（少于4000元） - 800元<br>"+
						"应纳税所得额 = 劳务报酬（超过4000元） × （1 - 20%）<br>"+
						"应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数<br>"+
						"说明：<br>"+
						"1、劳务报酬所得在800元以下的，不用缴纳个人所得税;<br>"+
						"2、劳务报酬所得大于800元且没有超过4000元，可减除800元的扣除费用;<br>"+
						"3、劳务报酬所得超过4000元的，可减除劳务报酬收入20%的扣除费用;"	);
		someShow();
		
	}else if(dataType=='tt5'){//tt5个体工商户的生产、经营所得
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 年度收入总额 - 成本、费用及损失<br>"+
						"应纳税额 = 应纳税所得额 × 适用税率 - 速算扣除数");
		someShow();
		
	}else if(dataType=='tt6'){// tt6对企事业单位的承包经营、承租经营所得
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 经营收入金额 －（减除必要费用 × 经营时间）<br>"+
						"应纳税额 = 应纳税所得额 × 适用税率 － 速算扣除数<br>"+
						"说明：上述公式中的“减除必要费用”，当前个税税法规定为3500元，经营时间以月份为计算单位。");
		someShow();
		time.show();
		
	}else if(dataType=='tt7'){//tt7稿酬所得
		showFormuV.html("稿酬所得计算公式<br>"+
						"应纳税所得额 = 稿酬所得（不超过4000元） - 800元<br>"+
						"应纳税所得额 = 稿酬所得（超过4000元）×（1 - 20%）<br>"+
						"应纳税额 = 应纳税所得额 ×14%");
		someShow();
		
	}else if(dataType=='tt8'){// tt8特许权使用费所得
		showFormuV.html("	计算公式<br>"+
						"应纳税所得额 = 特许权使用费（不超过4000元） - 800元<br>"+
						"应纳税所得额 = 特许权使用费（超过4000元）×（1 - 20%）<br>"+
						"应纳税额 = 应纳税所得额 × 20%");
		someShow();		
		
	}else if(dataType=='tt9'){// tt9利息、股息、红利所得
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 每次收入金额<br>"+
						"应纳税额 = 应纳税所得额 × 适用税率（20%）<br>"+
						"息、红利所得，以个人每次收入额为应纳税所得额，不扣除任何费用， 以支付单位或个人每次支付利息、股息、红利时，个人的所取得的收入为一次。");
		someShow();
		quickCutNum.hide();
	}else if(dataType=='tt10'){// tt10财产租赁所得
		showFormuV.html("财产租赁计算公式<br>"+
						"应纳税所得额 = 财产租赁所得（不超过4000元） - 800元<br>"+
						"应纳税所得额 = 财产租赁所得（超过4000元）×（1 - 20%）<br>"+
						"应纳税额 = 应纳税所得额 × 20%");
		someShow();
		
	}else if(dataType=='tt11'){// tt11财产转让所得
		showFormuV.html("财产转让计算公式<br>"+
						"应纳税所得额 = 财产转让收入金额 - 财产原值 - 相关税费及装修费等<br>"+
						"应纳税额 = 应纳税所得额 × 税率（20%）");
		someShow();		
		quickCutNum.hide();
		
	}else if(dataType=='tt12'){//tt12偶然所得
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 偶然所得<br>"+
						"应纳税额 = 应纳税所得额 × 税率（20%）<br>"+
						"说明：偶然所得，以个人每次取得的收入额为应纳税所得额，不扣除任何费用。以每次取得的该项收入为一次。");
		someShow();quickCutNum.hide();
		
	}else{ // tt13经国务院财政部门确定征税的其他所得
		showFormuV.html("计算公式<br>"+
						"应纳税所得额 = 每次收入金额<br>"+
						"应纳税额 = 应纳税所得额 × 适用税率（20%）");
		someShow();	quickCutNum.hide();
		
	}
}
