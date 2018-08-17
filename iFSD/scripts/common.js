
var rofFormArray = [];
var mmfFormArray = [];
var limeStoneFormArray = [];
var ixmMixedBedArray = [];
var feedFormArray = [];
var spliterLength;
var ediFormArray = [];
var hydratedlimeFormArray = [];
var splitterFormArray = [];
var tank_splitterFormArray = [];
var cfFormArray = [];
var lamellaFormArray = [];
var sfFormArrya = [];
var o2FormArrya = [];
var co2FormArrya = [];
var ddFormArray= [];
var ffFormArray= [];
var unitinputjson;
var unitoutputjson;
var objList=[];
var flowJSON=[];
var responseJSON=[];
var feedCount=0;
var pumpCount=0;
var filterCount=0;
var cfCount=0;
var mmfCount=0;
var mixerCount=0;
var roCount=0;
var splitterCount=0;
var productCount=0;
var rejectionCount=0;
var testFSDCount=0;
var bAFCount=0;
var iFASCount=0;
var mBBRCount=0;
var mBRCount=0;
var iterationJSON=[];
var ionMolalLibrary=[];
var rejectTS=[];
//var ms = require('microseconds');
var ionOffset=23;
var trackIds="";
var newCountJson={};
var draggedArray = [];
var streamvaluecount = 0;
var connectorInputArray = [];
var prevOpenFile;
var allUnit = ['BAF','IFAS', 'MBBR', 'MBR', 'DAF', 'Lamella', 'SC', 'SC(XRC)', 'OWS-API', 'Crystallizer', 'Evap(BC)', 'ABW', 'GAC', 'CF', 'DMF', 'FF', 'GSF', 'MMF', 'SF', 'CP', 'MB', 'SAC', 'WAC', 'NF', 'RO', 'UF', 'CO2', 'O2', 'Gen-O3', 'Remin', 'CLS', 'UV', 'Pumps', 'Tank', 'Feed', 'Mixer', 'Splitter'];
jQuery.fn.center = function() {
	   this.css({top: ($(window).height() - $(this).outerHeight()) / 2,left: ($(window).width() - $(this).outerWidth()) / 2});
	   return this;
};

function filterJSON(json, key, value){
	return json.filter(function(jsonObj){ 
		return jsonObj[key] == value;
		});
}

function containsObject(json, key, value){
  return filterJSON(json, key, value).length>0;
}

function copyProperties(json){
  return JSON.parse(JSON.stringify(json));
}

function showLoader(){
	$('.overlay,.newOverlayLoader').css('z-index','99999999').show();
}

function hideLoader(){
	$('.overlay,.newOverlayLoader').css('z-index','9999');
	$('.newOverlayLoader').hide();
	if($('.popUp:visible').length===0){
		$('.overlay').hide();
	}
}

function copyIonProperties(json){
  var data= json.filter(function(jsonObj){
    if(jsonObj['id'].startsWith('FI')){
      var id=Number(jsonObj['id'].replace('FI',''));
      if(id!=10 && id<ionOffset){
        return jsonObj;
      }
    }
  });
  return JSON.parse(JSON.stringify(data));
}

function returnIonData(param){
  return param.filter(function(jsonObj){
    if(jsonObj['id'].startsWith('FI')){
      var id=Number(jsonObj['id'].replace('FI',''));
      if(id!=10 && id<ionOffset){
        return jsonObj;
      }
    }
  });
}

function getPosition(json, key, value){
  var position=-1;
  $.each(json,function(index){
    if(this[key]==value)
      position= index;
  });
  return position;
}

function makeConnection(source,target,anchor){
	jsPlumb.connect({
		source:source,
		target:target,
		anchor:anchor,
		connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: false } ],
		connectorStyle: { strokeStyle: "#666", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
		overlays:[[ "Arrow", { width:10, length:14, location:1, foldback: 0.8, id:"arrow" } ],
		["Custom", {
									  create:function(component) {
												var streamlength = $('[name=tag]').length+1;
												streamvaluecount++;
												//  alert("streamlength:::"+streamlength);
												// alert("streamvaluecount:::"+streamvaluecount);
												return $("<input class='customOverlay' name='tag' type='number' value='"+streamvaluecount+"' placeholder='cold' onfocusout='changeStreamText("+streamvaluecount+")'  style='text-align:center; cursor: pointer;  background: white; width:50px;' />");
											},
						  location:0.5,
								id:"customOverlay"
				}]
		],
		endpoint: ["Dot", {radius: 2}]
	});
}

function getConnection(source, target){
	var connection = jsPlumb.getConnections({
        source: source,
        target: target
	});
	return connection;
}

function getNextObjects(sourceId){
  var connection=getConnectionFromSource(sourceId);
  var targteId=[];
  if(connection.length>0){
    $.each(connection, function(index){
      targteId.push(getObject(this.targetId));
    });
  }
  return targteId;
}

function getPrevObjects(sourceId){
  var connection=getConnectionToTarget(sourceId);
  var targteId=[];
  if(connection.length>0){
    $.each(connection, function(index){
      targteId.push(getObject(this.sourceId));
    });
  }
  return targteId;
}

function getConnectionFromSource(source){
  var connection = jsPlumb.getConnections({
        source: source
	});
	return connection;
}

function getConnectionFromSourceToTarget(target){
  var isTarget = jsPlumb.getConnections({
        target: target
  });
  var isSource = jsPlumb.getConnections({
    source: target
});

	return isTarget.length ? isTarget : isSource.length ? isSource : [];
}

function getConnectionToTarget(target){
  var connection = jsPlumb.getConnections({
        target: target
	});
	return connection;
}


function removeConnection(source, target, isAll){
	var length=1;
	var connection = getConnection(source, target);
	if(isAll){
		length=connection.length;
	}
	for(var index=0; index<length; index++){
		if (connection[index]) {
			jsPlumb.detach(connection[index]);
		}
	}
}

function hasConnection(source, target){
	return getConnection(source, target).length>0;
}

function setFlowOut(){
  
}

var lastSource; var lastTarget;
function makeDraggable(id ){
	newState=jsPlumb.getSelector(id);
	jsPlumb.makeSource(newState,{
		filter:".ep,.ep1,.ep2,.ep3",
		anchor:"Continuous",
		connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: false } ],
		connectorStyle: { strokeStyle: "blue", lineWidth: 1.5, outlineColor: "transparent", outlineWidth: 2 },
		connectorOverlays:[[ "Arrow", { width:10, length:14, location:1, foldback: 0.8, id:"arrow" } ],
							["Custom", {
										create:function(component) {
											streamvaluecount++;
											return $("<input class='customOverlay connectorInput' name='tag' type='text' value='"+streamvaluecount+"' placeholder='No.' style='text-align:center; cursor: pointer; background: white; width:50px;' />");
										},
							location:0.5,                              
							id:"customOverlay"
							}]						  
						  ],
		endpoint: ["Dot", {radius: 2}]
	});

	jsPlumb.makeTarget(newState,{
		anchor:"Continuous",
		endpoint: ["Dot", {radius: 2}]
	});

	jsPlumb.bind("dblclick", function (c) {
		var count = 0;
		count++;
		if(count==1){
/* 			var cSource = c.sourceId;
			var cTarget = c.targetId;
			count++; */
			var r = confirm("Are you sure you want to delete selected stream?");
			if (r == true) {
				jsPlumb.detach(c);
			}
		}
		return false;
		
	});
	
	jsPlumb.bind("beforeDrop", function(connection) {
		//console.log("connection", connection);
		lastSource = connection.sourceId; lastTarget = connection.targetId;
		//wastNProductOutCheck(lastSource, lastTarget);
		//testA(lastSource, lastTarget);
	return connection.sourceId !== connection.targetId && !hasConnection(connection.targetId,connection.sourceId) && isConnectionInLimit(connection.sourceId, connection.targetId) ;//&& wastNProductOutCheck(lastSource, lastTarget)
  });
	//jsPlumb.draggable(newState);
	jsPlumb.draggable(newState, {
		containment: "parent"
	});
	
	/* setTimeout(function(){ 
		jsPlumb.bind("connection", function(connection) {
			console.log('done', connection.endpoints[0]._continuousAnchorEdge);
			//jsPlumb.detach(connection);
		});
	}, 2000); */
	
	
	/* jsPlumb.bind("connectionDragStop", function (connection) {
			console.log('ggg', connection);
			var getSource = connection.sourceId;
				getSource = getSource.replace(/[0-9]/g, '');
			var getTarget = connection.targetId;
				getTarget = getTarget.replace(/[0-9]/g, '');
			if(getTarget == "WasteOut"){
				if(connection.endpoints[0]._continuousAnchorEdge == "bottom" && connection.endpoints[1]._continuousAnchorEdge == "top" ){
					return true;
				}else{
					jsPlumb.detach(connection);
				}
			}
			if(getTarget == "ProductOut"){
				if(connection.endpoints[0]._continuousAnchorEdge == "right" && connection.endpoints[1]._continuousAnchorEdge == "left"){
					return true;
				}else{
					jsPlumb.detach(connection);
				}
			}
	}); */
	
	//wastNProductOutCheck(lastSource, lastTarget);
	
}

function testA(){
	var t = jsPlumb.getAllConnections();
	console.log("oooo", t);
}

/*function makeDraggable(id){
	newState=jsPlumb.getSelector(id);
	jsPlumb.makeSource(newState,{
		filter:".ep,.ep1,.ep2,.ep3",
		anchor:"Continuous",
		connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: false } ],
		connectorStyle: { strokeStyle: "#666", lineWidth: 1.5, outlineColor: "transparent", outlineWidth: 2 },
		connectorOverlays:[[ "Arrow", { width:10, length:14, location:1, foldback: 0.8, id:"arrow" } ],
		                  //[ "Label", {location: 0.5,location:1,id: "label",cssClass: "aLabel",visible:true} ]
							["Custom", {
										create:function(component) {
											var streamlength2 = $('[name=tag]').length+1;
											streamvaluecount++;
											// alert("streamlength:::"+streamlength2);
											return $("<input class='customOverlay' name='tag' type='text' value='"+streamvaluecount+"' onfocusout='changeStreamText("+streamvaluecount+")' placeholder='cold' style='text-align:center; cursor: pointer;  background: white; width:50px;'/>");
										},
							location:0.5,                              
							id:"customOverlay"
							}]						  
						  ],
		endpoint: ["Dot", {radius: 2}]
	});
	  
	jsPlumb.makeTarget(newState,{
		anchor:"Continuous",
		endpoint: ["Dot", {radius: 2}]
	});
	
	jsPlumb.bind("click", function (c) {
			jsPlumb.detach(c);
	});
        
	jsPlumb.bind("beforeDrop", function(connection) {
    return connection.sourceId !== connection.targetId &&
    !hasConnection(connection.targetId,connection.sourceId)
    && isConnectionInLimit(connection.sourceId, connection.targetId);
  });
	jsPlumb.draggable(newState);
}*/

function wastNProductOutCheck(lastSource, lastTarget){
	var tmpConn = getConnection(lastSource, lastTarget);
	var getTarget = tmpConn.targetId;
	if(getTarget)
	getTarget = getTarget.replace(/[0-9]/g, '');
	if(getTarget == "WasteOut"){
		if(tmpConn.endpoints[0]._continuousAnchorEdge == "bottom" && tmpConn.endpoints[1]._continuousAnchorEdge == "top" ){
			return true;
		}else{
			return false;
		}
	}
	if(getTarget == "ProductOut"){
		if(tmpConn.endpoints[0]._continuousAnchorEdge == "right" && tmpConn.endpoints[1]._continuousAnchorEdge == "left"){
			return true;
		}else{
			return false;
		}
	}
}

function isConnectionInLimit(sourceId, targetId){

  var maxIn=Number($('#'+targetId).attr('maxIn'));
  var maxOut=Number($('#'+sourceId).attr('maxOut'));
  var inConnection=getConnectionToTarget(targetId).length;
  var outConnection=getConnectionFromSource(sourceId).length;
  return maxIn>inConnection && maxOut>outConnection;
}


function returnTableFormat(jsonData){
  var htmlData='';
  $.each(jsonData, function(index){
    var propId= this.ID;
    var propName= this.Property;
    var defaultValue=this.DefaultValue;
    var editable="";
    if(this.Type=="Input"){
      editable="contenteditable='true'";
    }
    htmlData=htmlData+"<tr propId='"+propId+"'><td>"+propName+"</td><td "+editable+">"+defaultValue+"</td></tr>";
  });
  return htmlData;
}

function returntableFormatFromCols(jsonData){
  var length=jsonData.length;
  var htmlData='';
  $.each(jsonData[0], function(index){
    var propName= this.Property;
    htmlData+='<tr><td>'+propName+'</td>';
    var row=index;
    for(var col=0; col<length; col++){
      var propId= jsonData[col][row].ID;
      var defaultValue=jsonData[col][row].DefaultValue;
      htmlData+='<td propId="'+propId+'">'+defaultValue+'</td>';
    }
    htmlData+='</tr>';
  });
  return htmlData;
}

function returnIonTable(ionData){
  var htmlData="";
  var total_Cations = 0;
  var total_Anions = 0;
  $.each(ionData, function(index){
    var propId=this.ID;
    var propName=this.Property;
    var value=this.DefaultValue;
    editable="contenteditable='true'";
	editableFalse="contenteditable='false'";
	var meqI = Number((this.DefaultValue *2)/40.078);
	var ppmCaco3 = Number(meqI *50);

	if(index <=9){
		total_Cations = total_Cations + this.DefaultValue;		
	}
	if(index >9){
		total_Anions = total_Anions + this.DefaultValue;		
	}
	//console.log(total_Cations);
	if(propId == 'FI10' || propId == 'FI22' || propId == 'FI23' || propId == 'FI24' || propId == 'FI25'){
		if(propId == 'FI10'){
			htmlData+='<tr propId="'+propId+'"><td>'+propName+'</td><td '+editableFalse+'>'+total_Cations+'</td><td '+editableFalse+'>'+meqI.toFixed(4)+'</td>'+'<td '+editableFalse+'>'+ppmCaco3.toFixed(4)+'</td><td>0</td></tr>';
		}else if(propId == 'FI25'){
			htmlData+='<tr propId="'+propId+'"><td>'+propName+'</td><td '+editableFalse+'>'+total_Anions+'</td><td '+editableFalse+'>'+meqI.toFixed(4)+'</td>'+'<td '+editableFalse+'>'+ppmCaco3.toFixed(4)+'</td><td>0</td></tr>';
		}else{
			htmlData+='<tr propId="'+propId+'"><td>'+propName+'</td><td '+editableFalse+'>'+value+'</td><td '+editableFalse+'>'+meqI.toFixed(4)+'</td>'+'<td '+editableFalse+'>'+ppmCaco3.toFixed(4)+'</td><td>0</td></tr>';
		}
	}else{
		htmlData+='<tr propId="'+propId+'"><td>'+propName+'</td><td '+editable+'>'+value+'</td><td '+editableFalse+'>'+meqI.toFixed(4)+'</td>'+'<td '+editableFalse+'>'+ppmCaco3.toFixed(4)+'</td><td>0</td></tr>';
	}
  });
  return htmlData;
}

function returnSaturationTable(saturationData){
  var htmlData="";
  $.each(saturationData, function(index){
    var propId=this.ID;
    var propName=this.Property;
    var value=this.DefaultValue;
    htmlData+='<tr propId="'+propId+'"><td align="left" class="bold">'+propName+'</td>'+
				   '<td align="right" data-attr="'+propName+'" class="bold">'+value+'</td></tr>';
    });
    return htmlData;
}
function loadPopUpDetails(){
  $.ajax({ 
		type : "GET", 
		url: "data/properties.json",
		contentType: "application/json; charset=utf-8", 
		dataType : "json",
		success : function(data){
		  responseJSON=data;
		  var feed=responseJSON.Feed.Properties;
      var saturationData=feed.filter(function(jsonObj){ return jsonObj['ID'].startsWith('FS');});
      var ionData=feed.filter(function(jsonObj){ return jsonObj['ID'].startsWith('FI');});
      var paramData=feed.filter(function(jsonObj){ return jsonObj['ID'].startsWith('FP');});

		  var pump=responseJSON.Pump.Properties;
		  var ro=responseJSON.RO.Properties;
		  var splitter=responseJSON.Splitter.Properties;
		  var uf=responseJSON.UF.Properties;
		  var mmf=responseJSON.MMF.Properties;
		  var cf=responseJSON.CF.Properties;
		  var roFeed=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('RF');});
		  var roPermeate=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('RP');});
		  var roConc=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('RC');});
		  var roRecovery=filterJSON(ro,'ID','R26')[0];
		  var roReject=filterJSON(ro,'ID','R27')[0];
		  
		  var mmfFeed=mmf.filter(function(jsonObj){ return jsonObj['ID'].startsWith('MMF');});
		  var mmfPermeate=mmf.filter(function(jsonObj){ return jsonObj['ID'].startsWith('MMP');});
		  var mmfConc=mmf.filter(function(jsonObj){ return jsonObj['ID'].startsWith('MMC');});
		  var mmfRecovery=filterJSON(mmf,'ID','MM22')[0];
		  
		  var cfFeed=cf.filter(function(jsonObj){ return jsonObj['ID'].startsWith('CF');});
		  var cfPermeate=cf.filter(function(jsonObj){ return jsonObj['ID'].startsWith('CP');});
		  var cfConc=cf.filter(function(jsonObj){ return jsonObj['ID'].startsWith('CC');});
		  var cfRecovery=filterJSON(cf,'ID','C22')[0];
		  
      $('.pumpPopUp .body>div.Input tbody,.pumpPopUp .body>div.Output tbody').empty();
      $('.roPopUp .tabDiv tbody').empty();
      $('.ufPopUp .body tbody').empty();
      
      $('#feedPopUp #feedTable tbody').html(returnIonTable(ionData));
      $('#feedPopUp .Saturation tbody').html(returnSaturationTable(saturationData));
      /* $.each($('#feedPopUp .form-horizontal .form-control'), function(index){
        $(this).attr('propId', paramData[index].ID);
        $(this).val(Number(paramData[index].DefaultValue).toFixed(2));
      }); */ 
      $('.pumpPopUp .body>div.Input tbody').html(returnTableFormat(filterJSON(pump,'Type','Input')));
		  $('.pumpPopUp .body>div.Output tbody').html(returnTableFormat(filterJSON(pump,'Type','Output')));
		  $('.roPopUp .Design tbody').html(returnTableFormat(filterJSON(ro,'Tab',1)));
  		$('.roPopUp .Rejection tbody').html(returnTableFormat(filterJSON(ro,'Tab',2)));
      $('.roPopUp .Output tbody').html(returntableFormatFromCols([roFeed, roPermeate, roConc]));
      $('.roPopUp .checkboxdiv .Permeate label').text(roRecovery.Property);
      $('.roPopUp .checkboxdiv .Rejection label').text(roReject.Property);
      $('.roPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId',roRecovery.ID).val(roRecovery.DefaultValue);
      $('.roPopUp .checkboxdiv .Rejection input[type="text"]').attr('propId',roReject.ID).val(roReject.DefaultValue);
      $('.splitterPopUp .body:eq(0) label').text(splitter[0].Property);
		  $('.splitterPopUp .body:eq(0) input').attr('propId',splitter[0].ID).val(splitter[0].DefaultValue).trigger('change');
		  $('.ufPopUp .body tbody').html(returnTableFormat(uf));
		  
		  /*$('.mmfPopUp .Design tbody').html(returnTableFormat(filterJSON(mmf,'Tab',1)));
  		$('.mmfPopUp .Rejection tbody').html(returnTableFormat(filterJSON(mmf,'Tab',2)));*/
      $('.mmfPopUp .Output tbody').html(returntableFormatFromCols([mmfFeed, mmfPermeate, mmfConc]));
      $('.mmfPopUp .checkboxdiv .Permeate label').text(mmfRecovery.Property);
      $('.mmfPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId',mmfRecovery.ID).val(mmfRecovery.DefaultValue);
      /*
      $('.cfPopUp .Design tbody').html(returnTableFormat(filterJSON(cf,'Tab',1)));
  		$('.cfPopUp .Rejection tbody').html(returnTableFormat(filterJSON(cf,'Tab',2)));*/
      $('.cfPopUp .Output tbody').html(returntableFormatFromCols([cfFeed, cfPermeate, cfConc]));
      $('.cfPopUp .checkboxdiv .Permeate label').text(cfRecovery.Property);
      $('.cfPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId',cfRecovery.ID).val(cfRecovery.DefaultValue);
		 //runBatFile(0,loadFeedDefaultValues);
    },error : function(exception){
			
    }
  });
}


function loaddictInDetails(){
  $.ajax({ 
		type : "GET", 
		url: "data/dicin.json",
		contentType: "application/json; charset=utf-8", 
		dataType : "json",
		success : function(data){
		  unitinputjson= data; 
		  /* console.log(data); */
		},error : function(exception){
			console.log(exception);
			
    }
  });
  
  
}
function loaddictOutDetails(){
  $.ajax({ 
		type : "GET", 
		url: "data/dicout.json",
		contentType: "application/json; charset=utf-8", 
		dataType : "json",
		success : function(data){
		  unitoutputjson= data; 
		  /* console.log(data); */
		},error : function(exception){
			console.log(exception);
			
    }
  });
  
  
}



function getObject(id){
  var object=null;
  var position = getPosition(objList, 'id', id);
  object= objList[position];
  return object;
}

/* function getStartObjects(){
  var object=[];
  $.each($('.w'), function(){
    var objId=$(this).attr('id');
    if(getConnectionToTarget(objId).length===0){
      object.push(getObject(objId));
    }
  });
  return object;
} */

function getStartObjects(){
  var object=[];
  $.each($('.w'), function(){
    var objId=$(this).attr('id');
    if(getConnectionFromSourceToTarget(objId).length===0){
      object.push(getObject(objId));
    }
  });
  return object;
}
//new code
function addObjectNew(id){
  var object=null;
    object=new Feed(id);
    objList.push(object);
}
function addObject(id){
  var object=null;
  if(id.startsWith('Feed')){
    object=new Feed(id);
    objList.push(object);
  }else if(id.startsWith('pump')){
    object=new Pump(id);
    objList.push(object);
    setPumpProperties(id);
  }else if(id.startsWith('ro')){
    object=new RO(id);
    objList.push(object);
  }else if(id.startsWith('splitter')){
    object=new Splitter(id);
    objList.push(object);
  }else if(id.startsWith('mixer')){
    object=new Mixer(id);
    objList.push(object);
    setMixerProperties(id);
  }else if(id.startsWith('uf')){
    object=new UF(id);
    objList.push(object);
  }else if(id.startsWith('mmf')){
    object=new MMF(id);
    objList.push(object);
  }else if(id.startsWith('cf')){
    object=new CF(id);
    objList.push(object);
  }else if(id.startsWith('product')){
    object=new Product(id);
    objList.push(object);
  }else if(id.startsWith('rejection')){
    object=new Rejection(id);
    objList.push(object);
  }else if(id.startsWith('testFSD')){
    object=new TestFSD(id);
    objList.push(object);
  }else if(id.startsWith('baf')){
    object=new Baf(id);
    objList.push(object);
  }else if(id.startsWith('ifas')){
    object=new IFAS(id);
    objList.push(object);
  }else if(id.startsWith('mbbr')){
    object=new MBBR(id);
    objList.push(object);
  }else if(id.startsWith('mbr')){
    object=new MBR(id);
    objList.push(object);
  }
  
}

function deleteObject(id){
  objList=objList.filter(function(obj){
    return obj.id!=id;
  });
}

function appendProperties(param, objProperties){
  var properties=JSON.parse(JSON.stringify(param));
  $.each(objProperties, function(index){
    var prop=filterJSON(param,'id',this.id);
    if(prop.length===0){
      properties.push(this);
    }
  });
  return properties;
}

function getROTargets(id){
  var connection=getConnectionFromSource(id);
  var recoveryObject=null;
  var rejectObject=null;
  $.each(connection, function(){
    var endpointAnchor=this.endpoints[0]._continuousAnchorEdge.toLowerCase();
    var targetId=this.targetId;
    if(endpointAnchor.startsWith('bottom') || endpointAnchor.startsWith('left')){
      rejectObject=filterJSON(objList,'id',targetId)[0];
    }else if(endpointAnchor.startsWith('top') ||endpointAnchor.startsWith('right')){
      recoveryObject=filterJSON(objList,'id',targetId)[0];
    }
  });
  return [recoveryObject,rejectObject];
}

function getSplitterTargets(id){
  var connection=getConnectionFromSource(id);
  var recycleObject=null;
  var rejectObject=null;
  $.each(connection, function(){
    var endpointAnchor=this.endpoints[0]._continuousAnchorEdge.toLowerCase();
    var targetId=this.targetId;
    if(/*targetId.startsWith("mixer")*/!endpointAnchor.startsWith('right')){
      recycleObject=filterJSON(objList,'id',targetId)[0];
    }else if(/*endpointAnchor.startsWith('bottom') ||*/endpointAnchor.startsWith('right')){
      rejectObject=filterJSON(objList,'id',targetId)[0];
    }
  });
  return [recycleObject,rejectObject];
}

function setFeedProperties(id){
  var object = getObject(id);
  var properties=[];
  $.each($('#feedPopUp #feedTable tbody tr'), function(index){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var mglValue=Number($(this).find('td:eq(1)').attr('original'))||0;
    var meqlValue=Number($(this).find('td:eq(2)').attr('original'))||0;
    var ppmValue=Number($(this).find('td:eq(3)').attr('original'))||0;
    var molalValue=Number($(this).find('td:eq(4)').attr('original'))||0;
    properties.push({"id":propId, "name":propName, "mglValue":mglValue.toFixed(4), "meqlValue":meqlValue.toFixed(4),"ppmValue":ppmValue.toFixed(4),"molalValue":molalValue.toFixed(4)});
  });
  $.each($('.form-horizontal .form-control'), function(index){
    var propId=$(this).attr('propId');
    var propName=$(this).parents('.form-group').find('label').text();
    var value=Number($(this).val())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  
  $.each($('.Saturation tbody tr'), function(index){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=$(this).find('td:eq(1)').text();
    properties.push({"id":propId, "name":propName, "value":value});
  });
  properties.push({"id": "RF", "name":"Raw Feed", "value":0});
  properties.push({"id": "RT", "name":"Raw TDS", "value":0});
  
  /* ionData=properties.filter(function(jsonObj){ return jsonObj['id'].startsWith('FI');});
  $.each(ionData, function(index){
    var propId="I"+(index+1);
    var propName=this.name;
    var mglValue=this.mglValue;
    properties.push({"id": propId, "name":propName, "value":mglValue});
  });
  object.setProperties(properties); */
}

function loadFeedProperties(id){
  var object = getObject(id);
  var properties=object.objProperties;
  if(properties.length===0){
    var feed=responseJSON.Feed.Properties;
    var saturationData=feed.filter(function(jsonObj){ return jsonObj['ID'].startsWith('FS');});
    var ionData=feed.filter(function(jsonObj){ return jsonObj['ID'].startsWith('FI');});
    var paramData=feed.filter(function(jsonObj){ return jsonObj['ID'].startsWith('FP');});
    $.each(ionData, function(index){
      var propId=this.ID;
      var propName=this.Property;
      var value=this.DefaultValue;
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(1)').text(Number(value).toFixed(2)).attr('original',value);
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(2)').text(Number(value).toFixed(2)).attr('original',value);
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(3)').text(Number(value).toFixed(2)).attr('original',value);
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(4)').text(Number(value).toFixed(2)).attr('original',value);
    });
    
    $.each(paramData, function(index){
      var propId=this.ID;
      var propName=this.Property;
      var value=this.DefaultValue;
      $('.form-horizontal .form-control[propId="'+propId+'"]').val(Number(value).toFixed(2)).attr('original',value);
    });
    
    $.each(saturationData, function(index){
      var propId=this.ID;
      var propName=this.Property;
      var value=this.DefaultValue;
      $('.Saturation tbody tr[propId="'+propId+'"]').find('td:eq(1)').html(value);
    });
  }else{
    var saturationData=properties.filter(function(jsonObj){ return jsonObj['id'].startsWith('FS');});
    var ionData=properties.filter(function(jsonObj){ return jsonObj['id'].startsWith('FI');});
    var paramData=properties.filter(function(jsonObj){ return jsonObj['id'].startsWith('FP');});
    $.each(ionData, function(index){
      var propId=this.id;
      var propName=this.name;
      var mglValue=this.mglValue;
      var meqlValue=this.meqlValue;
      var ppmValue=this.ppmValue;
      var molalValue=this.molalValue;
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(1)').text(Number(mglValue).toFixed(2)).attr('original',mglValue);
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(2)').text(Number(meqlValue).toFixed(2)).attr('original',meqlValue);
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(3)').text(Number(ppmValue).toFixed(2)).attr('original',ppmValue);
      $('#feedPopUp #feedTable tbody tr[propId="'+propId+'"]').find('td:eq(4)').text(Number(molalValue).toFixed(2)).attr('original',molalValue);
    });
    
    $.each(paramData, function(index){
      var propId=this.id;
      var propName=this.name;
      var value=this.value;
      $('.form-horizontal .form-control[propId="'+propId+'"]').val(Number(value).toFixed(2)).attr('original',value);
    });
    
    $.each(saturationData, function(index){
      var propId=this.id;
      var propName=this.name;
      var value=this.value;
      $('.Saturation tbody tr[propId="'+propId+'"]').find('td:eq(1)').text(value);
    });
  }
  $.each(properties, function(index){
    var propId=this.id;
    $('.FeedPopUp .tabDiv tbody tr[propId="'+propId+'"] td:eq(1)').text(Number(this.value).toFixed(2));
  });
}

function setPumpProperties(id){
  var object = getObject(id);
  var properties=[];
  $.each($('.pumpPopUp .body>div.Input tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  
  $.each($('.pumpPopUp .body>div.Output tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  object.setProperties(properties);
}

function loadPumpProperties(id){
  var object = getObject(id);
  var properties=object.objProperties;
  if(properties.length==0){
    var pump=JSON.parse(JSON.stringify(responseJSON.Pump.Properties));
    $('.pumpPopUp .body>div.Input tbody').html(returnTableFormat(filterJSON(pump,'Type','Input')));
	  $('.pumpPopUp .body>div.Output tbody').html(returnTableFormat(filterJSON(pump,'Type','Output')));
  }
  $.each(properties, function(index){
    var propId=this.id;
    $('.pumpPopUp .tabDiv tbody tr[propId="'+propId+'"] td:eq(1)').text(Number(this.value).toFixed(2));
  });
}

function setROProperties(id){
  var object = getObject(id);
  var properties=[];
  $.each($('.roPopUp .Design tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  
  $.each($('.roPopUp .Rejection tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  var propId=$('.roPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId');
  var propName=$('.roPopUp .checkboxdiv .Permeate label').text();
  var value=Number($('.roPopUp .checkboxdiv .Permeate input[type="text"]').val())||0;
  properties.push({"id":propId, "name":propName, "value":value}); 
  
  propId=$('.roPopUp .checkboxdiv .Rejection input[type="text"]').attr('propId');
  propName=$('.roPopUp .checkboxdiv .Rejection label').text();
  value=Number($('.roPopUp .checkboxdiv .Rejection input[type="text"]').val())||0;
  properties.push({"id":propId, "name":propName, "value":value});
  
  $.each($('.roPopUp .Output tbody tr'),function(){
    var propId=$(this).find('td:eq(1)').attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
    
    propId=$(this).find('td:eq(2)').attr('propId');
    propName=$(this).find('td:eq(0)').text();
    value=Number($(this).find('td:eq(2)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
    
    propId=$(this).find('td:eq(3)').attr('propId');
    propName=$(this).find('td:eq(0)').text();
    value=Number($(this).find('td:eq(3)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  properties.push({"id":"ROTS", "name":"TimeStamp","value":ms.now()});
  object.setProperties(properties);
}

function loadROProperties(id){
  var object = getObject(id);
  var properties=object.objProperties;
  if(properties.length==0){
    var ro=responseJSON.RO.Properties;
	  var roFeed=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('RF');});
	  var roPermeate=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('RP');});
	  var roConc=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('RC');});
	  var roRecovery=filterJSON(ro,'ID','R26')[0];
	  var roReject=filterJSON(ro,'ID','R27')[0];
	  $('.roPopUp .Design tbody').html(returnTableFormat(filterJSON(ro,'Tab',1)));
		$('.roPopUp .Rejection tbody').html(returnTableFormat(filterJSON(ro,'Tab',2)));
    $('.roPopUp .Output tbody').html(returntableFormatFromCols([roFeed, roPermeate, roConc]));
    $('.roPopUp .checkboxdiv .Permeate label').text(roRecovery.Property);
    $('.roPopUp .checkboxdiv .Rejection label').text(roReject.Property);
    $('.roPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId',roRecovery.ID).val(roRecovery.DefaultValue);
    $('.roPopUp .checkboxdiv .Rejection input[type="text"]').attr('propId',roReject.ID).val(roReject.DefaultValue);
  }else{
    var roRecovery=filterJSON(properties,'id','R26')[0];
	  var roReject=filterJSON(properties,'id','R27')[0];
    $('.roPopUp .checkboxdiv .Permeate input[type="text"]').val(roRecovery.value);
    $('.roPopUp .checkboxdiv .Rejection input[type="text"]').val(roReject.value);
  }
  $.each(properties, function(index){
    var propId=this.id;
    $('.roPopUp .tabDiv tbody tr[propId="'+propId+'"] td:eq(1)').text(Number(this.value).toFixed(2));
    $('.roPopUp .Output tbody td[propId="'+propId+'"]').text(Number(this.value).toFixed(2)).attr('original',this.value);
  });
}

function setSplitterProperties(id){
  var object = getObject(id);
  var properties=[];
  propId=$('.splitterPopUp .body input').attr('propId');
  propName=$('.splitterPopUp .body label').text();
  value=Number($('.splitterPopUp .body input[type="text"]').val())||0;
	properties.push({"id":propId, "name":propName, "value":value}); 
	properties.push({"id":"S2", "name":"Recycle", "value":0}); 
	properties.push({"id":"S3", "name":"ConcOut", "value":0}); 
	properties.push({"id":"TS", "name":"TimeStamp","value":ms.now()});
	object.setProperties(properties);
}

function loadSplitterProperties(id){
  var object = getObject(id);
  var properties=object.objProperties;
  if(properties.length==0){
	  $('.splitterPopUp .body:eq(0) input').val(100).trigger('change');
  }
  $.each(properties, function(index){
    if(this.id=="S1"){
      $('.splitterPopUp .body:eq(0) label').text(this.Property);
  	  $('.splitterPopUp .body:eq(0) input').attr('propId',this.id).val(Number(this.value).toFixed(2));
    }
  });
}

function setUFProperties(id){
  var object = getObject(id);
  var properties=[];
  $.each($('.ufPopUp .body tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  object.setProperties(properties);
}

function loadUFProperties(id){
  var object = getObject(id);
  var properties=JSON.parse(JSON.stringify(object.objProperties));
  if(properties.length==0){
    var uf=responseJSON.UF.Properties;
    $('.ufPopUp .body tbody').html(returnTableFormat(uf));
  }
  $.each(properties, function(index){
    var propId=this.id;
    $('.ufPopUp .body tbody tr[propId="'+propId+'"] td:eq(1)').text(Number(this.value).toFixed(2));
  });
}

function loadMMFProperties(id){
  var object = getObject(id);
  var properties=object.objProperties;
  if(properties.length==0){
    var ro=responseJSON.MMF.Properties;
	  var roFeed=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('MMF');});
	  var roPermeate=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('MMP');});
	  var roConc=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('MMC');});
	  var roRecovery=filterJSON(ro,'ID','MM22')[0];
	  /*$('.mmfPopUp .Design tbody').html(returnTableFormat(filterJSON(ro,'Tab',1)));
		$('.mmfPopUp .Rejection tbody').html(returnTableFormat(filterJSON(ro,'Tab',2)));*/
    $('.mmfPopUp .Output tbody').html(returntableFormatFromCols([roFeed, roPermeate, roConc]));
    $('.mmfPopUp .checkboxdiv .Permeate label').text(roRecovery.Property);
    $('.mmfPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId',roRecovery.ID).val(roRecovery.DefaultValue);
  }else{
    var roRecovery=filterJSON(properties,'id','MM22')[0];
	  var roReject=filterJSON(properties,'id','MM23')[0];
    $('.mmfPopUp .checkboxdiv .Permeate input[type="text"]').val(roRecovery.value);
    //$('.mmfPopUp .checkboxdiv .Rejection input[type="text"]').val(roReject.value);
  }
  $.each(properties, function(index){
    var propId=this.id;
    //$('.mmfPopUp .tabDiv tbody tr[propId="'+propId+'"] td:eq(1)').text(Number(this.value).toFixed(2));
    $('.mmfPopUp .Output tbody td[propId="'+propId+'"]').text(Number(this.value).toFixed(2));
    console.log(propId)
  });
}

function setMMFProperties(id){
  var object = getObject(id);
  var properties=[];
  /*$.each($('.mmfPopUp .Design tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  
  $.each($('.mmfPopUp .Rejection tbody tr'),function(){
    var propId=$(this).attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });*/
  var propId=$('.mmfPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId');
  var propName=$('.mmfPopUp .checkboxdiv .Permeate label').text();
  var value=Number($('.mmfPopUp .checkboxdiv .Permeate input[type="text"]').val())||0;
  properties.push({"id":propId, "name":propName, "value":value}); 
  
  $.each($('.mmfPopUp .Output tbody tr'),function(){
    var propId=$(this).find('td:eq(1)').attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
    
    propId=$(this).find('td:eq(2)').attr('propId');
    propName=$(this).find('td:eq(0)').text();
    value=Number($(this).find('td:eq(2)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
    
    propId=$(this).find('td:eq(3)').attr('propId');
    propName=$(this).find('td:eq(0)').text();
    value=Number($(this).find('td:eq(3)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  properties.push({"id":"MMTS", "name":"TimeStamp","value":ms.now()});
  object.setProperties(properties);
}

function loadCFProperties(id){
  var object = getObject(id);
  var properties=object.objProperties;
  if(properties.length==0){
    var ro=responseJSON.CF.Properties;
	  var roFeed=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('CF');});
	  var roPermeate=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('CP');});
	  var roConc=ro.filter(function(jsonObj){ return jsonObj['ID'].startsWith('CC');});
	  var roRecovery=filterJSON(ro,'ID','C22')[0];
	  /*$('.cfPopUp .Design tbody').html(returnTableFormat(filterJSON(ro,'Tab',1)));
		$('.cfPopUp .Rejection tbody').html(returnTableFormat(filterJSON(ro,'Tab',2)));*/
    $('.cfPopUp .Output tbody').html(returntableFormatFromCols([roFeed, roPermeate, roConc]));
    $('.cfPopUp .checkboxdiv .Permeate label').text(roRecovery.Property);
    $('.cfPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId',roRecovery.ID).val(roRecovery.DefaultValue);
  }else{
    var roRecovery=filterJSON(properties,'id','C22')[0];
	  var roReject=filterJSON(properties,'id','C23')[0];
    $('.cfPopUp .checkboxdiv .Permeate input[type="text"]').val(roRecovery.value);
  }
  $.each(properties, function(index){
    var propId=this.id;
    //$('.cfPopUp .tabDiv tbody tr[propId="'+propId+'"] td:eq(1)').text(Number(this.value).toFixed(2));
    $('.cfPopUp .Output tbody td[propId="'+propId+'"]').text(Number(this.value).toFixed(2));
    console.log(propId)
  });
}

function setCFProperties(id){
  var object = getObject(id);
  var properties=[];
  var propId=$('.cfPopUp .checkboxdiv .Permeate input[type="text"]').attr('propId');
  var propName=$('.cfPopUp .checkboxdiv .Permeate label').text();
  var value=Number($('.cfPopUp .checkboxdiv .Permeate input[type="text"]').val())||0;
  properties.push({"id":propId, "name":propName, "value":value}); 
  
  $.each($('.cfPopUp .Output tbody tr'),function(){
    var propId=$(this).find('td:eq(1)').attr('propId');
    var propName=$(this).find('td:eq(0)').text();
    var value=Number($(this).find('td:eq(1)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
    
    propId=$(this).find('td:eq(2)').attr('propId');
    propName=$(this).find('td:eq(0)').text();
    value=Number($(this).find('td:eq(2)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
    
    propId=$(this).find('td:eq(3)').attr('propId');
    propName=$(this).find('td:eq(0)').text();
    value=Number($(this).find('td:eq(3)').text())||0;
    properties.push({"id":propId, "name":propName, "value":value});
  });
  properties.push({"id":"CTS", "name":"TimeStamp","value":ms.now()});
  object.setProperties(properties);
}

function setMixerProperties(id){
  var object = getObject(id);
  var properties=[];
  properties.push({"id":"M1", "name":"FlowIn", "value":0});
  properties.push({"id":"M2", "name":"FlowOut", "value":0});
  properties.push({"id":"M3", "name":"Recycle", "value":0});
  properties.push({"id":"F0", "name":"F0", "value":0});
  object.setProperties(properties);
}

function getPropertyValue(properties,id){
  var prop=filterJSON(properties,"id",id);
  if(prop.length>0){
    return prop[0].value;
  }
  return 0;
}

function calculatePumpPower(properties){
  var pumpEfficiency=getPropertyValue(properties,'P3')/100;
  var motorEfficiency=getPropertyValue(properties,'P4')/100;
  var vfdEfficiency=getPropertyValue(properties,'P5')/100;
  var inlet=getPropertyValue(properties,'P1');
  var discharge=getPropertyValue(properties,'P2');
  var flowRate=getPropertyValue(properties,'F1');
  
  var pumpPower=0;
  if(flowRate>0){
    var pressure=discharge-inlet;
    pumpPower=100*(pressure*flowRate)/(pumpEfficiency*motorEfficiency*vfdEfficiency);
    if(pumpPower<0)
      pumpPower=0;
  }
  return pumpPower;
}

function calculateEnergy(properties){
  var pumpPower=getPropertyValue(properties,'P6');
  var energy=0;
  if(pumpPower>0){
    energy=pumpPower/(0.000108069151*3600);
  }
  return energy;
}

function setConnectionlabel(sourceId, targetId, value){
  var connection=getConnection(sourceId,targetId)[0];
  var labelObject=connection.getOverlay("label");
  labelObject.setLabel(value);
  labelObject.setVisible(true);
}

function setProperties(id){
  if(id.startsWith('feed')){
    setFeedProperties(id);
  }else if(id.startsWith('pump')){
    setPumpProperties(id);
  }else if(id.startsWith('ro')){
    setROProperties(id);
  }else if(id.startsWith('splitter')){
    setSplitterProperties(id);
  }else if(id.startsWith('mixer')){
    setMixerProperties(id);
  }else if(id.startsWith('uf')){
    setUFProperties(id);
  }else if(id.startsWith('mmf')){
    setMMFProperties(id);
  }else if(id.startsWith('cf')){
    setCFProperties(id);
  }
}


function setLabels(){
  $.each(objList, function(index){
    if(this.type=="ro"){
      var rejectFlow="Concentrate:<br/>"+Number(filterJSON(this.outputParam,'id','RC1')[0].value).toFixed(2);
      var permeateFlow="Permeate:<br/>"+Number(filterJSON(this.outputParam,'id','RP1')[0].value).toFixed(2);
      var nextObjects=getROTargets(this.id);
      if(nextObjects!=null && nextObjects.length>0){
        if(nextObjects[0]!=null)
          setConnectionlabel(this.id,nextObjects[0].id,permeateFlow);
        if(nextObjects[1]!=null)
          setConnectionlabel(this.id,nextObjects[1].id,rejectFlow);
      }
    }else if(this.type=="splitter"){
      var concRecycle=0;
      var concOut=0;
      if(this.outputParam.length>0){
        concRecycle="Stream1:<br/>"+Number(filterJSON(this.outputParam,'id','S2')[0].value).toFixed(2);
        concOut="Stream2:<br/>"+Number(filterJSON(this.outputParam,'id','S3')[0].value).toFixed(2);
      }else{
        concRecycle="Stream1:<br/>"+Number(filterJSON(this.recycleParam,'id','FP1')[0].value).toFixed(2);
        concOut="Stream2:<br/>"+Number(filterJSON(this.rejectParam,'id','FP1')[0].value).toFixed(2);
      }
      var nextObjects=getSplitterTargets(this.id);
      if(nextObjects!=null && nextObjects.length>0){
        if(nextObjects[0]!=null)
          setConnectionlabel(this.id,nextObjects[0].id,concRecycle);
        if(nextObjects[1]!=null)
          setConnectionlabel(this.id,nextObjects[1].id,concOut);
      }
    }else if(this.type=="cf"){
      var rejectFlow="Waste:<br/>"+Number(filterJSON(this.outputParam,'id','CC1')[0].value).toFixed(2);
      var permeateFlow="Outlet:<br/>"+Number(filterJSON(this.outputParam,'id','CP1')[0].value).toFixed(2);
      var nextObjects=getROTargets(this.id);
      console.log("rejectFlow="+rejectFlow+",permeateFlow="+permeateFlow)
      if(nextObjects!=null && nextObjects.length>0){
        if(nextObjects[0]!=null)
          setConnectionlabel(this.id,nextObjects[0].id,permeateFlow);
        if(nextObjects[1]!=null)
          setConnectionlabel(this.id,nextObjects[1].id,rejectFlow);
      }
    }else if(this.type=="mmf"){
      var rejectFlow="Waste:<br/>"+Number(filterJSON(this.outputParam,'id','MMC1')[0].value).toFixed(2);
      var permeateFlow="Outlet:<br/>"+Number(filterJSON(this.outputParam,'id','MMP1')[0].value).toFixed(2);
      var nextObjects=getROTargets(this.id);
      console.log("rejectFlow="+rejectFlow+",permeateFlow="+permeateFlow)
      if(nextObjects!=null && nextObjects.length>0){
        if(nextObjects[0]!=null)
          setConnectionlabel(this.id,nextObjects[0].id,permeateFlow);
        if(nextObjects[1]!=null)
          setConnectionlabel(this.id,nextObjects[1].id,rejectFlow);
      }
    }else if(this.type!="product" && this.type!="reject"){
      var flow=Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2);
      var nextObjects=getNextObjects(this.id);
      if(nextObjects!==null && nextObjects.length>0){
        setConnectionlabel(this.id,nextObjects[0].id,flow);
      }
    }
  });
}

function calculateROIons(ionData, id){
  /*
  Qf = Feed flow rate
  Qperm = Permeate flow rate
  Qconc = Concentrate flow rate
  
  X = Recovery % / 100;
  R = Rejection % / 100;
  
  Cf = Concentratation of any ion (mg/l) in feed
  
  Qperm = X * Qf
  Qconc = (1 - X) * Qf
  Cperm = (1 - R) * Cf
  Cconc = [((1-X)+(X * R))/ (1 - X)] * Cf
  */
  var object=getObject(id);
  var ionFeed=[];
  var ionPerm=[];
  var ionConc=[];
  var recovery=filterJSON(object.objProperties,'id','R26')[0].value/100;
  console.log("==================recovery="+recovery);
  $.each(ionData, function(index){
    var propId="R"+(index+5);
    var rejection=filterJSON(object.objProperties, 'id',propId)[0].value/100;
    console.log("984======propId="+propId+",rejection="+rejection);
    var operand1=(1-recovery);
    var operand2=recovery*rejection;
    var operand3=(1-rejection);
    
    var ionMgl=Number(this.mglValue);
    
    var permIon=operand3*ionMgl;
    //console.log("feedMGL("+this.name+")="+ionMgl+", rejection="+rejection+",permIon="+permIon);
    var concIon=((operand1+operand2)/operand1) * ionMgl;
    ionFeed.push({"id":this.id,"name":this.name,"mglValue":this.mglValue});
    ionPerm.push({"id":this.id,"name":this.name,"mglValue":permIon});
    ionConc.push({"id":this.id,"name":this.name,"mglValue":concIon});
    console.log("997======this.id="+this.id+",this.name="+this.name+",feed="+this.mglValue+",Permeate="+permIon+",Conc="+concIon);
  });
  return [ionFeed,ionPerm,ionConc];
}

function calculateMMFIons(ionData, id){
  /*
  Qf = Feed flow rate
  Qperm = Permeate flow rate
  Qconc = Concentrate flow rate
  
  X = Recovery % / 100;
  R = Rejection % / 100;
  
  Cf = Concentratation of any ion (mg/l) in feed
  
  Qperm = X * Qf
  Qconc = (1 - X) * Qf
  Cperm = (1 - R) * Cf
  Cconc = [((1-X)+(X * R))/ (1 - X)] * Cf
  */
  var object=getObject(id);
  var ionFeed=[];
  var ionPerm=[];
  var ionConc=[];
  var recovery=filterJSON(object.objProperties,'id','MM22')[0].value/100;

  $.each(ionData, function(index){
    var propId="R"+(index+5);
    var rejection=filterJSON(object.objProperties, 'id',propId)[0].value/100;
    
    var operand1=(1-recovery);
    var operand2=recovery*rejection;
    var operand3=(1-rejection);
    
    var ionMgl=Number(this.mglValue);
    
    var permIon=operand3*ionMgl;
    //console.log("feedMGL("+this.name+")="+ionMgl+", rejection="+rejection+",permIon="+permIon);
    var concIon=((operand1+operand2)/operand1) * ionMgl;
    ionFeed.push({"id":this.id,"name":this.name,"mglValue":this.mglValue});
    ionPerm.push({"id":this.id,"name":this.name,"mglValue":permIon});
    ionConc.push({"id":this.id,"name":this.name,"mglValue":concIon});
  });
  return [ionFeed,ionPerm,ionConc];
}

function calculateMixerIons(flowIon, recycleIon, flow, recycle, id){
  var totalFlow=flow+recycle;
  var ions=[];
  $.each(flowIon, function(index){
    var name=this.name;
    var flowMgl = filterJSON(flowIon,'name',name)[0].mglValue;
    var recyleMgl = filterJSON(recycleIon,'name',name)[0].mglValue;
    var value=(flow*flowMgl+recycle*recyleMgl)/totalFlow;
    ions.push({"id":this.id, "name": name, "mglValue":value});
    //console.log("812feedMGL("+name+")="+flowMgl+",flowMgl="+flow+", recycle="+recycle+",recyleMgl="+recyleMgl+",value="+value);
  });
  return ions;
}

function calculateMixerPH(flow, recycle, flowPh, recyclePh){
  var totalFlow=flow+recycle;
  return (flow*flowPh+recycle*recyclePh)/totalFlow;
}

function calculateMixerTemp(flow, recycle, flowTemp, recycleTemp){
  var totalFlow=flow+recycle;
  return (flow*flowTemp+recycle*recycleTemp)/totalFlow;
}

function calculateMixerData(multiStreamData){
  var ions=[];
  var flow=[];
  var tds=[];
  var ph=[];
  var temperature=[];
  
  $.each(multiStreamData, function(index){
    ions.push(this.ions);
    flow.push(this.value);
    tds.push(this.tds);
    ph.push(this.pH);
    temperature.push(this.temperature);
  });
  
  if(multiStreamData.length==1){
    var totalFlow=flow[0]
    var totalPh=(flow[0]*ph[0])/totalFlow;
    var totalTemperature=(flow[0]*temperature[0])/totalFlow;
    var totalTds=0;
    var ionData=[];
    $.each(ions[0], function(index){
      var name=this.name;
      var flowMgl = filterJSON(ions[0],'name',name)[0].mglValue;
      var value=(flow[0]*flowMgl)/totalFlow;
      if(ions[0][index].id!="FI21"){
        totalTds+=value;
      }
      ionData.push({"id":this.id, "name": name, "mglValue":value});
    });
    console.log(JSON.stringify({"1----flow":totalFlow, "pH":totalPh, "temperature":totalTemperature, "TDS":totalTds}));
    return {"flow":totalFlow, "pH":totalPh, "temperature":totalTemperature, "TDS":totalTds, "ions":ionData};
    
  }else if(multiStreamData.length==2){
    var totalFlow=flow[0]+flow[1];
    var totalPh=(flow[0]*ph[0]+flow[1]*ph[1])/totalFlow;
    var totalTemperature=(flow[0]*temperature[0]+flow[1]*temperature[1])/totalFlow;
    var totalTds=0;
    var ionData=[];
    $.each(ions[0], function(index){
      var name=this.name;
      var flowMgl = filterJSON(ions[0],'name',name)[0].mglValue;
      var recyleMgl = filterJSON(ions[1],'name',name)[0].mglValue;
      var value=(flow[0]*flowMgl+flow[1]*recyleMgl)/totalFlow;
      if(ions[0][index].id!="FI21"){
        totalTds+=value;
      }
      ionData.push({"id":this.id, "name": name, "mglValue":value});
      console.log(JSON.stringify({"id":this.id, "name": name, "mglValue":value}));
    });
    console.log(JSON.stringify({"2---flow":totalFlow, "pH":totalPh, "temperature":totalTemperature, "TDS":totalTds}));
    return {"flow":totalFlow, "pH":totalPh, "temperature":totalTemperature, "TDS":totalTds, "ions":ionData};
    
  }else if(multiStreamData.length==3){
    var totalFlow=flow[0]+flow[1]+flow[2];
    var totalPh=(flow[0]*ph[0]+flow[1]*ph[1]+flow[2]*ph[2])/totalFlow;
    var totalTemperature=(flow[0]*temperature[0]+flow[1]*temperature[1]+flow[2]*temperature[2])/totalFlow;
    var totalTds=0;
    var ionData=[];
    $.each(ions[0], function(index){
      var name=this.name;
      var flowMgl = filterJSON(ions[0],'name',name)[0].mglValue;
      var recyle1Mgl = filterJSON(ions[1],'name',name)[0].mglValue;
      var recyle2Mgl = filterJSON(ions[2],'name',name)[0].mglValue;
      var value=(flow[0]*flowMgl+flow[1]*recyle1Mgl+flow[2]*recyle2Mgl)/totalFlow;
      if(ions[0][index].id!="FI21"){
        totalTds+=value;
      }
      ionData.push({"id":this.id, "name": name, "mglValue":value});
      console.log(JSON.stringify({"id":this.id, "name": name, "mglValue":value}));
    });
    console.log(JSON.stringify({"3-----flow":totalFlow, "pH":totalPh, "temperature":totalTemperature, "TDS":totalTds}));
    return {"flow":totalFlow, "pH":totalPh, "temperature":totalTemperature, "TDS":totalTds, "ions":ionData};
  }
}

function calculateROPH(ph,recovery,rejection){
  var operand1=(1-rejection);
  var operand2=recovery*rejection;
  var permPH=operand1*ph;
  var concPH=(operand1+operand2)*ph/operand1;
  return [permPH,concPH];
}

function calculateROTemp(temp,recovery,rejection){
  var operand1=(1-rejection);
  var operand2=recovery*rejection;
  var permTemp=operand1*temp;
  var concTemp=(operand1+operand2)*temp/operand1;
  return [permTemp,concTemp];
}

function populateTable(){
  var feedRate= filterJSON(getStartObjects()[0].objProperties,'id','FP1')[0].value;
  var perm=getProductFlowRate();
  $('.roRecovery span').text(Number((perm*100)/feedRate).toFixed(2));
  $('.roRecovery').show();
}

function getProductFlowRate(){
  var flow=0;
  $.each(objList, function(index){
    if(this.type=="product"){
      console.log(this.id+"=="+filterJSON(this.outputParam,'id','FP1')[0].value)
      flow+=filterJSON(this.outputParam,'id','FP1')[0].value;
    }
  });
  return flow;
}

function addTable(){
  var cols=[1];
  headers=[""];
  subHeaders=[""];
  var flow=["Flow (gpm)"];
  var temperature=["Temperature"];
  var pH=["pH"];
  var TDS=["TDS (mg/l)"];
  $.each(objList, function(index){
    if(this.type=="feed"){
      headers.push(this.id.toUpperCase());
      subHeaders.push("");
      cols.push(1);
      flow.push(Number(filterJSON(this.objProperties,'id','FP1')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.objProperties,'id','FP4')[0].value).toFixed(2))
      temperature.push(Number(filterJSON(this.objProperties,'id','FP5')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','FP3')[0].value).toFixed(2));
    }else if(this.type=="ro"){
      headers.push(this.id.toUpperCase());
      subHeaders.push("RO Feed","RO Permeate", "RO Concentrate");
      cols.push(3);
      flow.push(Number(filterJSON(this.objProperties,'id','RF1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.objProperties,'id','RP1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.objProperties,'id','RC1')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','RF26')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','RP26')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','RC26')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.objProperties,'id','RF25')[0].value).toFixed(2))
      pH.push(Number(filterJSON(this.objProperties,'id','RP25')[0].value).toFixed(2))
      pH.push(Number(filterJSON(this.objProperties,'id','RC25')[0].value).toFixed(2))
      TDS.push(Number(filterJSON(this.objProperties,'id','RF2')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','RP2')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','RC2')[0].value).toFixed(2));
    }else if(this.type=="cf"){
      headers.push(this.id.toUpperCase());
      subHeaders.push("CF Inlet","CF Outlet", "CF Waste");
      cols.push(3);
      flow.push(Number(filterJSON(this.objProperties,'id','CF1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.objProperties,'id','CP1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.objProperties,'id','CC1')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','CF22')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','CP22')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','CC22')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2))
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2))
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2))
      TDS.push(Number(filterJSON(this.objProperties,'id','CF2')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','CP2')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','CC2')[0].value).toFixed(2));
    }else if(this.type=="mmf"){
      headers.push(this.id.toUpperCase());
      subHeaders.push("MMF Inlet","MMF Outlet", "MMF Waste");
      cols.push(3);
      flow.push(Number(filterJSON(this.objProperties,'id','MMF1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.objProperties,'id','MMP1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.objProperties,'id','MMC1')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','MMF22')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','MMP22')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.objProperties,'id','MMC22')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2))
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2))
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2))
      TDS.push(Number(filterJSON(this.objProperties,'id','MMF2')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','MMP2')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.objProperties,'id','MMC2')[0].value).toFixed(2));
    }else if(this.type=="pump"){
      headers.push(this.id.toUpperCase());
      subHeaders.push("Pump Inlet","Pump Outlet");
      cols.push(2);
      flow.push(Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2));
    }else if(this.type=="uf"){
      headers.push(this.id.toUpperCase());
      subHeaders.push("UF Inlet","UF Outlet");
      flow.push(Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2));
      flow.push(Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2));
      pH.push(Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2));
      temperature.push(Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2));
      TDS.push(Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2));
      cols.push(2);
    }
  });
  var tableData=[flow,pH,temperature,TDS];
  $('#collapseTable table').empty();
  var data="<thead>";
  $.each(headers, function(index){
    var colspan=cols[index];
    data+='<th colspan="'+colspan+'">'+this+'</th>';
  });
  data+="</thead><thead>";
  $.each(subHeaders, function(index){
    data+='<th>'+this+'</th>';
  });
  data+="</thead><tbody>";
  
  $.each(tableData, function(outIndex){
    var row=this;
    data+='<tr>';
    $.each(row, function(inIndex){
      data+='<td>'+this+'</td>';
    });
    data+='</tr>';
  });
  data+='</tbody>';
  $('#collapseTable table').html(data);
}

function prepareExcelData(){
  var headers=[{"label":"Parameters", "merge":0}];
  var subHeaders=[""];
  var dataValues=[{"flow":"Flow (gpm)","TDS":"TDS (mg/l)","pH":"pH", "temperature":"Temperature"}];
  $.each(objList, function(index){
    if(this.type=="feed"){
      headers.push({"label":this.id.toUpperCase(), "merge":0});
      subHeaders.push("");
      var flow=Number(filterJSON(this.objProperties,'id','FP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','FP3')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.objProperties,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','FP5')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
    }else if(this.type=="ro"){
      headers.push({"label":this.id.toUpperCase(), "merge":2});
      subHeaders.push("RO Feed","RO Permeate", "RO Concentrate");
      var flow=Number(filterJSON(this.objProperties,'id','RF1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','RF2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.objProperties,'id','RF25')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','RF26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.objProperties,'id','RP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','RP2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.objProperties,'id','RP25')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','RP26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.objProperties,'id','RC1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','RC2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.objProperties,'id','RC25')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','RC26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
    }else if(this.type=="cf"){
      headers.push({"label":this.id.toUpperCase(), "merge":2});
      subHeaders.push("CF Inlet","CF Outlet", "CF Waste");
      var flow=Number(filterJSON(this.objProperties,'id','CF1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','CF2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','CF26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.objProperties,'id','CP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','CP2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','CP26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.objProperties,'id','CC1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','CC2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','CFC26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
    }else if(this.type=="mmf"){
      headers.push({"label":this.id.toUpperCase(), "merge":2});
      subHeaders.push("MMF Inlet","MMF Outlet", "MMF Waste");
      var flow=Number(filterJSON(this.objProperties,'id','MMF1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','MMF2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','MMF26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.objProperties,'id','MMP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','MMP2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','MMP26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.objProperties,'id','MMC1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.objProperties,'id','MMC2')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.objProperties,'id','MMFC26')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
    }else if(this.type=="pump"){
      headers.push({"label":this.id.toUpperCase(), "merge":1});
      subHeaders.push("Pump Inlet","Pump Outlet");
      var flow=Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
    }else if(this.type=="uf"){
      headers.push({"label":this.id.toUpperCase(), "merge":1});
      subHeaders.push("UF Inlet","UF Outlet");
      var flow=Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
      var flow=Number(filterJSON(this.outputParam,'id','FP1')[0].value).toFixed(2);
      var tds=Number(filterJSON(this.outputParam,'id','FP3')[0].value).toFixed(2);
      var ph=Number(filterJSON(this.outputParam,'id','FP4')[0].value).toFixed(2);
      var temperature=Number(filterJSON(this.outputParam,'id','FP5')[0].value).toFixed(2);
      dataValues.push({"flow":flow,"TDS":tds,"pH":ph, "temperature":temperature})
    }
  });
  return [headers, subHeaders, dataValues];
}

function generateExcelFile(filePath){
  var data=prepareExcelData();
  var mergeColOffset=0
  var headers=data[0];
  var subHeaders=data[1];
  var dataValues=data[2];
  var positionArr=[];
  
  var svgPart=$("#statemachine-demo svg,.aLabel");
  $("#statemachine-demo svg").each(function(index){
  		positionArr[index]=$(this).attr("style")
  })
  canvg();
  $("#statemachine-demo canvas").each(function(index){
  	$(this).attr("style",positionArr[index])
  });
  if(headers.length<=1 && subHeaders.length<=1 && dataValues.length<=1){
    $('#pdfExport').val('');
    $('.overlay').hide();
    alert('No data to Export');
  }
  var feedRate= filterJSON(getStartObjects()[0].objProperties,'id','FP1')[0].value;
  var perm=getProductFlowRate();
  var recovery=Number(perm/feedRate);
  var xl = require('excel4node'); 
  var wb = new xl.Workbook();
  var ws = wb.addWorksheet('FlowSheet');
  var numberStyle = wb.createStyle({
  	font: {
  		color: '#000000',
  	},
  	border: {
          left: {
              style: 'thin', 
              color: '#000000' 
          },
          right: {
              style: 'thin', 
              color: '#000000'
          },
          top: {
              style: 'thin', 
              color: '#000000'
          },
          bottom: {
              style: 'thin', 
              color: '#000000'
          }
  	},
  	numberFormat: '0.00; (0.00); 0'
  });

  var percentStyle = wb.createStyle({
  	font: {
  		bold: true,
  		color: '#000000',
  	},
  	numberFormat: '0.00 %; (0.00 %); 0 %'
  });
  var headerStyle = wb.createStyle({
  	font: {
  		bold: true,
  		color: '#FFFFFF',
  	}, 
  	alignment: {
  		wrapText: true,
  		horizontal: 'center',
  		vertical :'center'
  	},border: {
          left: {
              style: 'thin', 
              color: '#FFFFFF' 
          },
          right: {
              style: 'thin', 
              color: '#FFFFFF'
          },
          top: {
              style: 'thin', 
              color: '#FFFFFF'
          },
          bottom: {
              style: 'thin', 
              color: '#FFFFFF'
          }
  	},
  	fill: {
  		type: 'pattern',
          patternType: 'solid',
          fgColor: '#3f4145'
  	}
  });
  
  for(var index=0; index<headers.length; index++){
  	var label=headers[index].label;
  	var startColNum=mergeColOffset+1;
  	var mergeColNum=headers[index].merge+startColNum;
  	if(mergeColNum==startColNum){
  		ws.cell(1, startColNum).string(label).style(headerStyle);
  		console.log("label="+label+"=======(row,col)="+startColNum+","+mergeColNum)
  	}else{
  		ws.cell(1, startColNum, 1, mergeColNum, true).string(label).style(headerStyle);
  		console.log("label="+label+"=======(row,col)="+startColNum+","+mergeColNum)
  	}
  	mergeColOffset=mergeColNum;
  }
  ws.row(2).setHeight(45);
  ws.column(1).setWidth(16);
  for(var index=0; index<subHeaders.length; index++){
  	var colNum=index+1;
  	console.log("SubLabel="+subHeaders[index]+"=======(row,col)=2,"+colNum)
  	if(subHeaders[index]!=""){
  		ws.column(colNum).setWidth(13);
  	}
  	ws.cell(2, colNum).string(subHeaders[index]).style(headerStyle);
  }

  for(var index=0; index<dataValues.length; index++){
  	var rowNum=3;
  	var colNum=index+1;
  	if(index==0){
  		ws.cell(rowNum, colNum).string(dataValues[index].flow).style(numberStyle);
  		ws.cell(rowNum+1, colNum).string(dataValues[index].TDS).style(numberStyle);
  		ws.cell(rowNum+2, colNum).string(dataValues[index].pH).style(numberStyle);
  		ws.cell(rowNum+3, colNum).string(dataValues[index].temperature).style(numberStyle);
  		console.log("String dataValues(row,col)="+rowNum+","+colNum)
  	}else{
  		ws.cell(rowNum, colNum).number(Number(dataValues[index].flow)).style(numberStyle);
  		ws.cell(rowNum+1, colNum).number(Number(dataValues[index].TDS)).style(numberStyle);
  		ws.cell(rowNum+2, colNum).number(Number(dataValues[index].pH)).style(numberStyle);
  		ws.cell(rowNum+3, colNum).number(Number(dataValues[index].temperature)).style(numberStyle);
  		console.log("Number dataValues(row,col)="+rowNum+","+colNum)
  	}
  }
  
  ws.cell(8, 1).string('Final Recovery(%)').style(headerStyle);
  ws.cell(8, 2).number(recovery).style(percentStyle);

  html2canvas($('#statemachine-demo'),{
	  onrendered: function (canvas){
  		var data = canvas.toDataURL("image/png");
  		data=data.replace("data:image/png;base64,","")
  		require("fs").writeFile("image.png", data, 'base64', function(err) {
			  if(err)
				  console.err(err.stack);
				$("#statemachine-demo canvas").remove();
				$("#statemachine-demo").append(svgPart);
			  ws.addImage({
				  path: 'image.png',
				  type: 'picture',
				  position: {
					  type: 'twoCellAnchor',
  					from: {
  						col: 1,
  						colOff: 0,
  						row: 9,
  						rowOff: 0
  					},
  					to: {
  						col: 15,
  						colOff: 0,
  						row: 30,
  						rowOff: 0
  					}
				  }
			  });
  			wb.write(filePath, function (err, stats) {
    			if (err) {
    				console.error(err);
    			} 
    			var nwGui=require('nw.gui');
    			$('#pdfExport').val('');
    			$('.overlay').hide();
    			nwGui.Shell.openItem(filePath);
			  });
	    })
	  }
  });
}
function writeInputFile(data, serviceIndex, callback){
  showLoader();
  var fs=require('fs');
  var path=require('path');
  var nwPath=process.execPath;
  var nwDir=path.dirname(nwPath);
  var file=path.dirname(nwPath)+"\\FSD BEANS\\bin\\data\\input.txt";
  fs.writeFile(file, data, function(err) {
      if(err) {
          return console.log(err);
      }
  	runBatFile(serviceIndex,callback);
  }); 
}

function readOutputFile(callback){
  var fs=require('fs');
  var path=require('path');
  var nwPath=process.execPath;
  var nwDir=path.dirname(nwPath);
  var file=path.dirname(nwPath)+"\\FSD BEANS\\bin\\data\\output.txt";
  fs.readFile(file, "utf-8",function (err,data) {
    if (err) {
      return console.log(err);
    }
    callback(JSON.parse(data));
    console.log(JSON.parse(data));
  });
}

function runBatFile(serviceIndex, callback){
  showLoader();
	var path=require('path');
	var nwPath=process.execPath;
	var nwDir=path.dirname(nwPath);
	var batpath=path.dirname(nwPath)+"\\FSD BEANS\\bin\\FSDcalc.exe";
	var spawn=require('child_process').spawn;
	var cp=spawn(process.env.comspec, ['/c', batpath, serviceIndex]);
	cp.stdout.on("data",function(data) {
		//console.log(data.toString());
	});
	cp.stderr.on("data", function(data) {
		console.error(`stdout: ${data}`);
	});
	cp.on("close", function() {
		readOutputFile(callback);
	});
}

function loadFeedDefaultValues(response){
  /*Populating Water Source & Water Type*/
  $('#sel1').empty();
  $('#sel2').empty();
	var waterSource=response.FeedSource;
	var waterType=response.CustomIonLibrary;
	
	$.each(waterSource,function(index){
		$('#sel1').append('<option value="'+this.ID+'">'+this.Name+'</option>');
	});
	$('#sel1 option[value="4"]').prop('selected',true);
	
	$.each(waterType,function(index){
		$('#sel2').append('<option value="'+this.IonLibraryID+'">'+this.Name+'</option>');
	});
	
	/*loading IONS Table values of FeedPopUp*/
	var ionJson=response.WAComposition;
	var tableData='';
	populateFeedTable(ionJson);
	//addHiddenRows(response.Alkalinity, response.Temperature, response.PH);
	populateParameters(response);
	$('#feedPopUp .form-control[data-attr="TDS"]').val('0.00');
	$('#feedPopUp .form-control[data-attr="recovery"]').val(75.00);
  hideLoader();
}

function populateFeedPopUp(data){
	populateFeedTable(data.DtIons);
	$('#feedPopUp .balanceBtn').removeClass('disabled').attr('disabled',false);
	addMolalLibrary();
	populateSaturationData(data.CalcSaturation);
	hideLoader();
}

function loadBalancedFeedValues(response){
  populateFeedTable(response.Ions);
	//addHiddenRows(response.Alkalinity, response.Temp, response.PH);
	populateParameters(response);
	ionMolalLibrary=response.IonLibraryMolal;
	var cationIndex=	$('#feedTable .non-editable:eq(0)').index();
  var anionIndex=		$('#feedTable .non-editable:eq(1)').index();
  sumAllIons(0,cationIndex);
  sumAllIons(cationIndex+1,anionIndex);
	populateSaturationData(response.CalcSaturation,true);
	addMolalLibrary();
	toggleIonButtonStates();
	$('#feedPopUp .okBtn').removeClass('disabled').attr('disabled',false);
	hideLoader();
}

function addChemicalCompound(response){
  populateFeedTable(response.DtWater);
	var alkalinity= 	Number($('#feedPopUp .form-control[data-attr="Alkalinity"]').val());
	var temp= 			Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
	var pH= 			Number($('#feedPopUp .form-control[data-attr="PH"]').val());
	//addHiddenRows(alkalinity, temp, pH);
	ionMolalLibrary=response.IonLibraryMolal;
	populateParameters(response);
	populateSaturationData(response.CalcSaturation,true);
	toggleIonButtonStates();
	hideLoader();
}

function updateFeedTable(response){
  var alkalinity= 	Number($('#feedPopUp .form-control[data-attr="Alkalinity"]').val());
	var temp= 			  Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
	var pH= 			    Number($('#feedPopUp .form-control[data-attr="PH"]').val());
	populateFeedTable(response.DtWater);
	//addHiddenRows(alkalinity, temp, pH);
	var cationIndex=	$('#feedTable .non-editable:eq(0)').index();
  var anionIndex=		$('#feedTable .non-editable:eq(1)').index();
  sumAllIons(0,cationIndex);
  sumAllIons(cationIndex+1,anionIndex);
  populateSaturationData(response.CalcSaturation,true);
  $('#feedPopUp .balanceBtn').removeClass('disabled').attr('disabled',false)
	hideLoader();
}

function loadChangedTDSIons(response){
  populateFeedTable(response.DtWater);
	$('#feedPopUp .form-control[data-attr="Alkalinity"]').val(response.Alkalinity);
	var alkalinity= 	Number(response.Alkalinity);
	var temp= 			Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
	var pH= 			Number($('#feedPopUp .form-control[data-attr="PH"]').val());
	//addHiddenRows(alkalinity, temp, pH);
	$('#feedPopUp #chlorideBtn,#feedPopUp #sodiumBtn').attr('disabled',true).addClass('disabled');
	$('#feedPopUp .balanceBtn').removeClass('disabled').attr('disabled',false);
	hideLoader();
}

/*Toggle button states of balance, chloride, sodium after balancing*/
function toggleIonButtonStates(){
	var cations=Number($('#feedTable .non-editable:eq(0) td:eq(2)').text());
	var anions=Number($('#feedTable .non-editable:eq(1) td:eq(2)').text());
	if(cations-anions>0){
		$('#feedPopUp #chlorideBtn').attr('disabled',false).removeClass('disabled');
		$('#feedPopUp #sodiumBtn').attr('disabled',true).addClass('disabled');
	}else if(cations-anions<0){
		$('#feedPopUp #chlorideBtn').attr('disabled',true).addClass('disabled');
		$('#feedPopUp #sodiumBtn').attr('disabled',false).removeClass('disabled');
	}else if(cations-anions===0){
		$('#feedPopUp #chlorideBtn,#feedPopUp #sodiumBtn').attr('disabled',true).addClass('disabled');
	}
	$('#feedPopUp .balanceBtn').addClass('disabled').attr('disabled',true);
}

function populateParameters(paramData){
	var pH,recovery,sdi,tds,alkalinity,temperature;
	alkalinity=		Number(paramData.Alkalinity).toFixed(2);
	ph=				Number(paramData.PH).toFixed(2);
	recovery=		Number(Number(paramData.Recovery)||-1).toFixed(2);
	sdi=			Number(Number(paramData.SDI)||-1).toFixed(2);
	tds=			Number(Number(Number(paramData.TDS)||paramData.Tds)||-1).toFixed(2);
	temperature=	Number(Number(paramData.Temperature)||paramData.Temp).toFixed(2);
	
	$('#feedPopUp .form-control[data-attr="Alkalinity"]').val(alkalinity);
	$('#feedPopUp .form-control[data-attr="Temperature"]').val(temperature).attr('original',temperature);
	$('#feedPopUp .form-control[data-attr="PH"]').val(ph);
	
	if(recovery!=-1)
		$('#feedPopUp .form-control[data-attr="recovery"]').val(recovery);
	if(sdi!=-1)
		$('#feedPopUp .form-control[data-attr="SDI"]').val(sdi);
	if(tds!=-1)
		$('#feedPopUp .form-control[data-attr="TDS"]').val(tds);
}

function populateFeedTable(ionJson){
	$('.feedtable table tbody').empty();
	var tableData='';
	$.each(ionJson,function(index){
		var ionId=		this.IonId;
		var ion=		this.Ion;
		var mgl=		Number(this['mg/l']).toFixed(2);
		var meql=		Number(this['meq/l']).toFixed(4);
		var ppm=		Number(this['ppm as CaCO3']).toFixed(2);
		var molal=		this['molal'];
		var mass=		this.Mass;
		var charge=		Number(this.Charge)||0;
		var polarity=	this.Polarity;
		var propId="FI"+(index+1);
		if(typeof ionId=='undefined')
			ionId=		this.IonID;
		
		if(this.Ion=='Total Cations' || this.Ion=='Total Anions'){
			tableData+=	'<tr propId="'+propId+'" class="non-editable" atom-value="'+mass+'" valency="'+charge+'" polarity="'+polarity+'" ionId="'+ionId+'">'+
							'<td>'+ion+'</td>'+
							'<td original="'+this['mg/l']+'">'+mgl+'</td>'+
							'<td original="'+this['meq/l']+'">'+meql+'</td>'+
							'<td original="'+this['ppm as CaCO3']+'">'+ppm+'</td>'+
							'<td>'+molal+'</td>'+
						'</tr>';
		}else{
			tableData+=	'<tr propId="'+propId+'" atom-value="'+mass+'" valency="'+charge+'" polarity="'+polarity+'" ionId="'+ionId+'">'+
							'<td>'+ion+'</td>'+
							'<td original="'+this['mg/l']+'" contenteditable="true">'+mgl+'</td>'+
							'<td original="'+this['meq/l']+'" contenteditable="true">'+meql+'</td>'+
							'<td original="'+this['ppm as CaCO3']+'" contenteditable="true">'+ppm+'</td>'+
							'<td>'+molal+'</td>'+
						'</tr>';
		}
	});
	$('.feedtable table tbody').append(tableData);
	ionCachedTable=		ionJson;
	var cationIndex=	$('#feedTable .non-editable:eq(0)').index();
	var anionIndex=		$('#feedTable .non-editable:eq(1)').index();
	sumAllIons(0,cationIndex);
	sumAllIons(cationIndex+1,anionIndex);
}


/*perform summing all ions between given row indexes*/
function sumAllIons(fromIndex, toIndex){
	var mgl=0;meql=0,ppm=0;
	$.each($('#feedTable tbody tr'),function(rowIndex){
		if(rowIndex>=fromIndex && rowIndex<toIndex){
			var id=Number($(this).attr('ionid'));
			/*To be skipped for CO2*/
			if(id!=21){
				mgl+=Number($(this).children('td:eq(1)').attr('original'));
				meql+=Number($(this).children('td:eq(2)').attr('original'));
				ppm+=Number($(this).children('td:eq(3)').attr('original'));
			}
		}
	});
	var index=0;
	if(fromIndex>0){
		index=1;
	}
	$('#feedTable .non-editable:eq('+index+')').children('td:eq(1)').text(mgl.toFixed(2)).attr('original',mgl);
	$('#feedTable .non-editable:eq('+index+')').children('td:eq(2)').text(meql.toFixed(4)).attr('original',meql);
	$('#feedTable .non-editable:eq('+index+')').children('td:eq(3)').text(ppm.toFixed(2)).attr('original',ppm);
}

function populateSaturationData(saturationData){
	var baso4=			'0.00 %';
	var caf2=			'0.00 %';
	var caso4=			'0.00 %';
	var sio2=			'0.00 %';
	var srso4=			'0.00 %';
	var struvite=		'0.00 %';
	var lsi=			'0.00';
	var sndi=			'0.00';
	var pi=				'0.00 psi';
	var conductivity=	'0.00 &mu;S/cm';
	var density=		'0.00 kg/m3';
	
	if(saturationData!=null){
		baso4=			saturationData[0];
		caf2=			saturationData[1];
		caso4=			saturationData[5];
		sio2=			saturationData[2];
		srso4=			saturationData[3];
		struvite=		saturationData[7];
		lsi=			saturationData[4];
		sndi=			saturationData[11];
		pi=				saturationData[9] + ' psi';
		conductivity=	saturationData[10]+' &mu;S/cm';
		density=		saturationData[12]+' kg/m3';
	}
	var saturation=[baso4,caf2,caso4,sio2,srso4,struvite,lsi,
					sndi,pi,conductivity,density];
	
	$.each($('#feedPopUp .Saturation td[align="right"]'),function(index){
		$(this).html(saturation[index]);
	});
}

function clearFeedTable(){
	var num=0;
	$.each($('#feedTable tr:not(.dispNone)'),function(rowIndex){
		$(this).children('td:eq(1),td:eq(3)').text(num.toFixed(2)).attr('original',num);
		$(this).children('td:eq(2)').text(num.toFixed(4)).attr('original',num);
	});
	$('#feedPopUp .okBtn').addClass('disabled').attr('disabled',true);
	populateSaturationData(null,false);
	$('#feedPopUp .form-control[data-attr="TDS"]').val('0.00');
	$('#feedPopUp #sel2 option[value="0"]').prop('selected',true);
}

/*Prepare ionJSON from feedTable for ajax Data Input*/
function prepareIonTableJson(){
	var ions=[];
	$.each($('#feedTable tbody tr:not(.dispNone)'),function(index){
		var ionId=		Number($(this).attr('ionId'));
		var ion=		$(this).children('td:eq(0)').text().toString();
		var mgl=		Number($(this).children('td:eq(1)').attr('original'));
		var meql=		Number($(this).children('td:eq(2)').attr('original'));
		var ppm=		Number($(this).children('td:eq(3)').attr('original'));
		var molal=		Number($(this).children('td:eq(4)').text());
		var mass=		isNaN(Number($(this).attr('atom-value')))?0:Number($(this).attr('atom-value'));
		var charge=		Number($(this).attr('valency'));
		var polarity=	$(this).attr('polarity');
		ions.push({
			  "IonId": ionId.toString(),
			  "Ion": ion.toString(),
			  "Polarity": polarity.toString(),
			  "Charge": charge.toString(),
			  "Mass": mass.toString(),
			  "mg/l": mgl.toString(),
			  "meq/l": meql.toString(),
			  "ppm as CaCO3": ppm.toString(),
			  "molal": molal.toString()
		});
	});
	return ions;
}

/*prepare ionJSON from FeedTable and Parameters*/
function prepareIonJSON(){
	var alkalinity= Number($('#feedPopUp .form-control[data-attr="Alkalinity"]').val());
	var temp= 		Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
	var pH= 		Number($('#feedPopUp .form-control[data-attr="PH"]').val());
	var tds= 		Number($('#feedPopUp .form-control[data-attr="TDS"]').val());
	var ions=		prepareIonTableJson();
	var projUnits = [{"TempUnit":"2","PressUnit":"1","FlowUnit":"5","FluxUnit":"1","PowerUnit":"1","VolumeUnit":"3"}];
	var ionJSON= {
		"CustomLibrary": [],
		"FeedSource": [],
		"Ds": {},
		"Ions": ions,
		"IonLibraryMolal": [],
		"Temp": temp,
		"PH": pH,
		"Alkalinity": alkalinity,
		"Isbalanced": false,
		"Coloumn": 5,
		"GessDesnsity": 0,
		"WtSolute": 0,
		"FinalIS": 0,
		"Tds": tds,
		"TempUnit":2,
		"ProjectUnits":projUnits
	};
	return ionJSON;
}

function addMolalLibrary(){
	if(ionMolalLibrary.length!==0){
		var cation=ionMolalLibrary.filter(function(v){ return v["IonId"] == 1; });
		var anion=ionMolalLibrary.filter(function(v){ return v["IonId"] == 12; });
		var cationMeql=		Number(cation[0]['meq/l'])||Number(cation[0]['BaseMeq/l']);
		var cationPpm=		Number(cation[0]['ppm as CaCO3'])||Number(cation[0]['BasePPM as CaCO3']);
		var anionMeql=		Number(anion[0]['meq/l'])||Number(anion[0]['BaseMeq/l']);
		var anionPpm=		Number(anion[0]['ppm as CaCO3'])||Number(anion[0]['BasePPM as CaCO3']);
		var sumCationsMeql= Number($('#feedTable .non-editable:eq(0)').children('td:eq(2)').attr('original'))+Math.abs(cationMeql);
		var sumCationsPpm= 	Number($('#feedTable .non-editable:eq(0)').children('td:eq(3)').attr('original'))+Math.abs(cationPpm);
		var sumAnionsMeql= 	Number($('#feedTable .non-editable:eq(1)').children('td:eq(2)').attr('original'))+Math.abs(anionMeql);
		var sumAnionsPpm= 	Number($('#feedTable .non-editable:eq(1)').children('td:eq(3)').attr('original'))+Math.abs(anionPpm);
		
		$('#feedTable .non-editable:eq(0)').children('td:eq(2)').text(sumCationsMeql.toFixed(4)).attr('original',sumCationsMeql);
		$('#feedTable .non-editable:eq(0)').children('td:eq(3)').text(sumCationsPpm.toFixed(2)).attr('original',sumCationsPpm);
		$('#feedTable .non-editable:eq(1)').children('td:eq(2)').text(sumAnionsMeql.toFixed(4)).attr('original',sumAnionsMeql);
		$('#feedTable .non-editable:eq(1)').children('td:eq(3)').text(sumAnionsPpm.toFixed(2)).attr('original',sumAnionsPpm);
	}
}

function getCanvasData2(){

     var dataValues=[{"StreamName":"StreamName","Source":"Source","Destination":"Destination", "unitType":"unitType"}];

     var con=jsPlumb.getAllConnections();
     var list=[];

      var bbb;

      var streamlength = $('[name=tag]').length;

        for(i=0; i<streamlength; i++){

          bbb = document.getElementsByName('tag')[i].value;
          list[i]=new Array(2);
          list[i][0]=con[i].sourceId;
          list[i][1]=con[i].targetId;

         var source = con[i].sourceId;
         var destination = con[i].targetId;
		 var getUnitType = source.replace(/[0-9]/g, '');
		 var streamType = "";
		 var isWasteStream = con[i].endpoints;
		if(isWasteStream[0]._continuousAnchorEdge == "bottom" && isWasteStream[1]._continuousAnchorEdge == "top"){
			streamType = "Waste Stream";
		}

         var s = $('#span'+source ).val();
         var t = $('#span'+destination ).val();

          dataValues.push({"StreamName":bbb,"Source":s,"Destination":t, "unitType":getUnitType, "StreamType":streamType});

        }

        return [dataValues];

}

function getCanvasData33(){

     var dataValues=[{"StreamName":"StreamName","Source":"Source","Destination":"Destination", "unitType":"unitType", "StreamType":"StreamType"}];

     var con=jsPlumb.getAllConnections();
     var list=[];

      var bbb;

      var streamlength = $('[name=tag]').length;

        for(i=0; i<streamlength; i++){

          bbb = document.getElementsByName('tag')[i].value;
          list[i]=new Array(2);
          list[i][0]=con[i].sourceId;
          list[i][1]=con[i].targetId;

         var source = con[i].sourceId;
         var destination = con[i].targetId;
		 var getUnitType = source.replace(/[0-9]/g, '');
		 var streamType = "";
		 var isWasteStream = con[i].endpoints;
		if(isWasteStream[0]._continuousAnchorEdge == "bottom"){
			streamType = "Waste Stream";
		}

         var s = $('#span'+source ).val();
         var t = $('#span'+destination ).val();

          dataValues.push({"StreamName":bbb,"Source":s,"Destination":t, "unitType":getUnitType, "StreamType":streamType});

        }

        return [dataValues];

}

function changeText(id){

	//  alert(id);
  var labeltext = $('#'+id).text();
	// alert("labeltext:::"+labeltext);
	var sub = id.substring(4);
  var s1=getConnectionToTarget(sub).length;
  var s2=getConnectionFromSource(sub).length;
  var s3 = s1+s2;
  // alert("S1:::"+s3);


	var data = getCanvasData2();
	var stringCount=0;
  var dataValues=data[0];

	for(var index=1; index<dataValues.length; index++){
		var streamtext = dataValues[index].StreamName;
		var sourcetext = dataValues[index].Source;
		var destinationtext = dataValues[index].Destination;

		// alert("streamtext:::"+streamtext);
		// alert("source::"+sourcetext);
		// alert("destinationtext::"+destinationtext);
		// alert("stringCount:::"+stringCount);

		if(labeltext == streamtext){
			stringCount++;
			// alert("streamtext:::"+stringCount);
		}
		if(labeltext == sourcetext){
			stringCount++;
			// alert("sourcetext:::"+stringCount);
		}
		if(labeltext == destinationtext){
			stringCount++;
			// alert("destinationtext:::"+stringCount);
		}

	}
	// alert("Final:::"+stringCount);

	if(stringCount > s3){
		alert("Entered name is duplicated! Please change the name.");
		$('#'+id).text('Please Change Here');
	}


}

//Validation
  $(".maxNumber").keyup(function(){
	  if($(this).val()<-10 || $(this).val()>10 ){
		$(this).css({"border":"1px solid red"});
		$(this).val('');
	  }
	  else{
		$(this).css({"border":"1px solid #e1e2e5"});
	  }
  });
$('body').on('keyup','.edit',function(){
	var valLenth = $(this).val();
	if(valLenth.length<4){
		$(this).css({'width': 5 * 10});
	}else if(valLenth.length<30){
		$(this).css({'width': valLenth.length * 7});
	}else{
		$(this).css({'width': '200px'});
	}
	
});
$('body').on('click','.edit',function(){
	return false;
});

//Sub sub Category click
$('.subSubCategory').hide();
$('body').on('click','.subCategory', function(){
	$('.subSubCategory').show();
	$('.subNavs').hide();
	var getUnitName = $(this).find('h4').text();
	$('#'+getUnitName).show();
});

$('body').on('click','.closeSubCategory', function(){
	$('.subSubCategory').hide();
});

$('body').on('click', '.home-menu li', function(){
	$('.subSubCategory').hide();
});


function getOutputStreams(spliter4){

       
       var con=jsPlumb.getAllConnections();
       var list=[];	   
       var pnextList=[];
	   var streamLengthA;
      
       var punitprev;
       var punitnext;	   
      
       var streamlength = $('[name=tag]').length;
       var checklist = [];       
	   var stream = "Waste Stream"

       for(var p=0; p<streamlength; p++){

          list[p]=new Array(2);
          list[p][0]=con[p].sourceId;
          list[p][1]=con[p].targetId;

         var source = con[p].sourceId;
         var destination = con[p].targetId;

         var s = $('#span'+source ).val();
         var t = $('#span'+destination).val();
		 var unittypesource = source.replace(/[0-9]/g, '');
		 var desunittypesource = destination.replace(/[0-9]/g, '');
		 
		
			if (checklist.indexOf(s) === -1) {
                  checklist.push(s);
			var data333=getCanvasData33();
			var dataV=data333[0];
					for(var indexP=1; indexP<dataV.length; indexP++){
						var des = dataV[indexP].Destination;
						var strname = dataV[indexP].StreamName;
						var sou = dataV[indexP].Source;						
							if(sou == spliter4){
								if(pnextList.indexOf(strname) === -1){
									pnextList.push(strname);
									spliterLength = pnextList.length;
								}
								/* punitnext = pnextList.join();
									streamLengthA = punitnext.length; */			
							}							
					}
			
				punitprev= "";
				punitnext ="";           
						
			  //pnextList = [];		  
			}
       }
       return pnextList;
}

$('#pOK').click(function(){	
	$('#progress').hide();
	$('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
	$('.pSuccess').text("");
});

$('.ep').click(function(){
	thisCount = 0;
	thisCount = thisCount + 1;
	$(this).attr('clickCount', thisCount);
});
