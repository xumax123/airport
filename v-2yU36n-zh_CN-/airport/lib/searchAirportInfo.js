//返回的是一个 机场相关的四字代码，是一个数组。由于每一个dataArr是一个2维数组。
function findAirportData(airport4Code,dataArr){
var tempDataArr=[];
	airport4Code=airport4Code.toUpperCase();
	for(var i=0;i<dataArr.length;i++){
		airport4CodeInData=dataArr[i][0];
		if(airport4CodeInData==airport4Code){
			tempDataArr.push(dataArr[i]);
		}
	}
//console.log(tempDataArr);
	var returnArr=[];
	for(var j=0;j<tempDataArr.length;j++){
		for(var k=1;k<tempDataArr[j].length;k++){
			returnArr.push(tempDataArr[j][k]);
		}
	}
	if(returnArr.length>0){
		returnArr.unshift(airport4Code);
		return returnArr;
	}else{
		return [];
	}
}

//在查询是否是B 类等特殊机场，以及是否是 无过站放行时，都是查，是不是在那个数据里，在的话，就是返回  真，不然就是 假。
function findIfInDataArr(airport4Code,dataArr){
	airport4Code=airport4Code.toUpperCase();
	for(var i=0;i<dataArr.length;i++){
		if(dataArr[i][0]==airport4Code){
			return true;
		}
	}
	return false;
}
function getSpecialQulifiedAirportString(airport4Code,dataArr){
	var info="除非满足下列条件，合格证持有人不得使用任何人担任机长，任何人也不得担任机长，飞入或飞出民航局公布的需要特殊机长资格的机场： <br />（1）机长在前12个日历月内，已经在航空器或D级以上模拟机上作为驾驶员飞行机组成员， 进入该机场完成包括起飞和着陆在内的操作，或者 <br />（2）该机长已经使用局方可接受的图形工具获得该机场的运行资格。";
	
	if(findIfInDataArr(airport4Code,dataArr)){
		return "【特殊机场】 <br /> "+info +"<br /><br />";
	}else{
		return "";
	}
}
/*
console.log(findAirportData("vvvs",ILSlands));
console.log(findAirportData("vvvs",freqs));
console.log(findAirportData("vvvs",airports));
*/
function getDispathString(airport4Code,dataArr){
	var dispatchInfo='无过站放行，按照“机组检查单”完成绕机检查，在记录本上记录检查结果。未发现故障时，在故障报告栏填写“按照机组检查单进行检查检查结果正常”，不需进行适航放行。有故障时，在报告栏记录故障现象，通知签派，紧急时，可联系：<a href="tel:02028237979">020-28237979</a> 。';
	
	if(findIfInDataArr(airport4Code,dataArr)){
		return "【无过站放行】 <br /> "+dispatchInfo +"<br /><br />";
	}else{
		return "";
	}
}
function airportsColumName(colNum){
	return ['四字代码','机场名称','三字代码','E190','A319_100','A320_200','A321_200','A330_200','A330_300','A380_800','B737_300','B737_700','B737_800','B757_200','B777_200','B777F','B747_400F','B777_300ER','B787_8'][colNum];
}
function getAltAirportString(airport4Code,dataArr){
	var info="【机场类型说明】<br />"+
"正常使用机场：<br />在定期运行中用作常规起降点的经批准的机场<br />"+
"加油机场：<br />仅可用于飞机加油的经批准的机场<br />"+
"临时使用机场：<br />在正常使用机场不能提供服务时，航空承运人用于提供定期服务的经批准的机场<br />"+
"备降机场：<br />在计划的机场不可用时，飞机可着陆的机场<br />"+
"注：加油和临时使用机场不适用于135部运行<br />"
	var landType={"R":"正常使用机场","A":"备降机场","F":"加油机场","P":"临时使用机场"};
	var airportInfo="";
	var dataArr=findAirportData(airport4Code,dataArr);
	if(dataArr.length<1){
		return "";
	}	
	for(var i=0;i<dataArr.length;i++){
		if(dataArr[i]!="【禁】"){
			var landTypeString=landType[dataArr[i]];
			if(landTypeString==undefined){
				landTypeString=dataArr[i];
			}
			var 	airportsColumNameString="";
			if(airportsColumName(i)=="A320_200"||airportsColumName(i)=="A319_100"||airportsColumName(i)=="A321_200"){
				airportsColumNameString="<span class='a319320321'>"+airportsColumName(i)+"</span>";
			}else{
				airportsColumNameString=airportsColumName(i);
			}
			airportInfo=airportInfo+airportsColumNameString+":"+landTypeString+"<br />";
		}
	}
	return airportInfo+info;
}
function getFreqString(airport4Code,dataArr){
	var dataArr=findAirportData(airport4Code,dataArr);
	if(dataArr.length<1){
		return "";
	}
	return "相关频率："+dataArr[1]+"<br />";
}
function getILSlandString(airport4Code,dataArr){
	var dataArr=findAirportData(airport4Code,dataArr);
	if(dataArr.length<1){
		return "";
	}
	var landRunway="";
	for(var i=1;i<dataArr.length;i++){
		landRunway=landRunway+dataArr[i]+" ";
	}
	return "一类自动落地跑道："+landRunway+"<br />";
}
function airportNameTo4Code(name){
//airports是一个全局的数组。
	var reg=new RegExp(name);
	for(var i=0;i<airports.length;i++){
		if(reg.test(airports[i][1])){
			return airports[i][0];
		}
	}
	return "";
}
function threeCodeTo4Code(threeCode){
	threeCode=threeCode.toUpperCase();
	for(var i=0;i<airports.length;i++){
		if(airports[i][2]==threeCode){
			return airports[i][0];
		}
	}
	return "";
}
//console.log(threeCodeTo4Code("xmn"));
//airportNameTo4Code("美兰");

//console.log(findAirportData("ZJHK",airports));
//document.write(getAltAirportString("ZJHK",airports));