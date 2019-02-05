define(function(require){
//加载数据
	require("data/altAirport.txt");
	require("data/freqency.txt");
	require("data/ILSi.txt");
	require("data/selfDispatch");
	require("data/specialQulifiedAirport");
//加我设计的处理库
	require("lib/searchAirportInfo");
	require("$UI/airport/appVersionChecker");
		
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button2Click = function(event){
		$("#airportDisplay").html("")
	};

	Model.prototype.button1Click = function(event){
			var airport4Code=this.comp("input1").val();
			this.comp("input1").val("");
			var is4Code=new RegExp("[^A-Za-z]");
			if(is4Code.test(airport4Code)||airport4Code.length>4){
				airport4Code=airportNameTo4Code(airport4Code);
			}else if(airport4Code.length==3){
				//	console.log("3333333333333");
				airport4Code=threeCodeTo4Code(airport4Code);
			}
			if(airport4Code==""){
				//alert("请输入正确的三、四字代码或者正确的机场名称")
				this.comp("messageDialog1").show({
				title:"输入有误",
				message:"请输入正确的三、四字代码或者机场名称"
				})
				return;
			}
			
			var info=getSpecialQulifiedAirportString(airport4Code,specialQulifiedAirport)+getDispathString(airport4Code,selfDispatch)+getFreqString(airport4Code,freqs)+getILSlandString(airport4Code,ILSlands)+getAltAirportString(airport4Code,airports);
			if(!info){
				$("#airportDisplay").prepend("<div class='airportInfo'>机场信息："+this.comp("input1").val()+"<br />【查无信息】"+"</div>");
			}else{
			$("#airportDisplay").prepend("<div class='airportInfo'>"+info+"</div>");
			}
	};

	return Model;
});