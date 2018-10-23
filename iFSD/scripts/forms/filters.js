//FITERS
var unitConverionDone=false;

$('body').on('click', '.filters', function () {
	var id = $(this).attr('id');
	inputErrorRemove('filterspopUp');
	$('.filterspopUp').removeClass('dispNone');
	$('.filterspopUp #filterType').val("Vertical Multimedia Filter");
	//$('.filterspopUp #filterType').trigger("change");
	$('.filterspopUp').show();
	$('.filterspopUp .body ul.nav li').removeClass('active');
	$('.filterspopUp .body ul.nav li:eq(0)').addClass('active');
	$('.filterspopUp .Input').removeClass('dispNone');
	$('.filterspopUp .Output').addClass('dispNone');
	$('.filterspopUp .Note').addClass('dispNone');
	$('.filterspopUp .Documentation').addClass('dispNone');
	//$('.filterspopUp div .popTitle').text(id);drainTime
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.filterspopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.filterspopUp div .popTitle').text(gateTitle);
	$('.filterspopUp').attr("myId", id);
	$('.popUpTabError').text('');
	$('#subSurfaceWashShow select').val('No');
	
	var table = $("table.inputTable tbody");
	if(unitConverionDone==false){
		table.find('tr').each(function (i) {
			var $tds = $(this).find('td'),
			getUnitType = $tds.eq(0).attr('unitType');
			if (getUnitType != '-') {
				getSavedUnit = JSON.parse(localStorage.getItem('SelectedUnits'));
				for (var j = 0; j < getSavedUnit.length; j++) {
					if (getUnitType == getSavedUnit[j].unitType) {
					  $tds.eq(2).text(getSavedUnit[j].unit);
					}
				}
			} else {
				$tds.eq(2).text('-');
			}

		});
		unitConverionDone	=	true;
	}
	
	$('#organicCbnFilter').hide();
    $('#inletChlFilter').hide();
	$('#subFillFilter').hide();
	$('#anthraDepFilter').hide();
	$('#greenSandFilter').hide();
	$('#sandDepthFilter').hide();
    $('#anthraDepthFilter').hide();
    $('#garnetDepthFilter').hide();
    $('#tanLgthFilter').hide();
    $('#airScourShow').hide();
    $('#subSurfaceWashShow').hide();
	
  if (localStorage.getItem(id) !== null) {
    getSavedData_filters = JSON.parse(localStorage.getItem('' + id + ''));
    //console.log("id" + JSON.stringify(getStoredData));greenSandLoadId
	$('#filterType').val(getSavedData_filters.filterType);
    $(".filterspopUp input[name=designFlowRate]").val(getSavedData_filters.designFlowRate);
    $(".filterspopUp input[name=maxFlowRate]").val(getSavedData_filters.maxFlowRate);
    $(".filterspopUp input[name=installedUnits]").val(getSavedData_filters.installedUnits);
    $(".filterspopUp input[name=unitsInService]").val(getSavedData_filters.unitsInService);
    //$(".filterspopUp input[name=inletSolids]").val(getSavedData_filters.inletSolids);
    $(".filterspopUp input[name=loadingRate]").val(getSavedData_filters.loadingRate);
    $(".filterspopUp input[select=airScourId]").val(getSavedData_filters.airScourId);
    $(".filterspopUp input[select=subSurfaceWashId]").val(getSavedData_filters.subSurfaceWashId);
    $(".filterspopUp input[name=backWashTime]").val(getSavedData_filters.backWashTime);
    $(".filterspopUp input[name=drainTime]").val(getSavedData_filters.drainTime);
    $(".filterspopUp input[name=refillTime]").val(getSavedData_filters.refillTime);

    $(".filterspopUp input[name=inletTotalCarbon]").val(getSavedData_filters.inletTotalCarbon);
    $(".filterspopUp input[name=inletChlorine]").val(getSavedData_filters.inletChlorine);
    $(".filterspopUp input[name=mediaBed]").val(getSavedData_filters.mediaBed);
    $(".filterspopUp input[name=backWashTemphigh]").val(getSavedData_filters.backWashTemphigh);
    $(".filterspopUp input[name=backWashTempLow]").val(getSavedData_filters.backWashTempLow);
    $(".filterspopUp select[name=postBackWash]").val(getSavedData_filters.postBackWash);
    $(".filterspopUp input[name=designPressure]").val(getSavedData_filters.designPressure);
    $(".filterspopUp input[name=corrosionAllowance]").val(getSavedData_filters.corrosionAllowance);
    $(".filterspopUp select[name=choiceLining]").val(getSavedData_filters.choiceLining);
    $(".filterspopUp input[name=outerDia]").val(getSavedData_filters.outerDia);
    $(".filterspopUp input[name=tanLength]").val(getSavedData_filters.tanLength);
    $(".filterspopUp select[name=headType]").val(getSavedData_filters.headType);
	$(".filterspopUp input[name=sandDepthId]").val(getSavedData_filters.sandDepthId);
    $(".filterspopUp input[name=anthraId]").val(getSavedData_filters.anthraId);
    $(".filterspopUp input[name=garnetId]").val(getSavedData_filters.garnetId);
	$(".filterspopUp select[name=subFillTypeId]").val(getSavedData_filters.subFillTypeId);
	$(".filterspopUp select[name=anthraciteCapId]").val(getSavedData_filters.anthraciteCapId);
	$(".filterspopUp select[name=filterType]").val(getSavedData_filters.filterType);	  
	 
    $(".filterspopUp input[name=sandDepth]").val(getSavedData_filters.sandDepth);
    $(".filterspopUp input[name=anthraciteDepth]").val(getSavedData_filters.anthraciteDepth);
    $(".filterspopUp input[name=greenSandLoad]").val(getSavedData_filters.greenSandLoad);
    //$(".filterspopUp input[name=anthraciteCarbonVolume]").val(getSavedData_filters.anthraciteCarbonVolume);
    //$(".filterspopUp input[name=subFill]").val(getSavedData_filters.subFill);anthraciteDepCap
    $(".filterspopUp input[name=anthraciteDepCap]").val(getSavedData_filters.anthraciteDepCap);
    $(".filterspopUp input[name=shellJointEfficiency]").val(getSavedData_filters.shellJointEfficiency);
    $(".filterspopUp input[name=headJointEfficiency]").val(getSavedData_filters.headJointEfficiency);
    //$(".filterspopUp input[name=headJointEfficiency]").val(getSavedData_filters.loadingRate);
    //$(".filterspopUp input[name=headJointEfficiency]").val(getSavedData_filters.airScourId);
    //$(".filterspopUp input[name=headJointEfficiency]").val(getSavedData_filters.subSurfaceWashId);
    //$(".filterspopUp input[name=headJointEfficiency]").val(getSavedData_filters.subSurfaceWashId);
	
	/* $(".filterspopUp input[name=rinseTime]").val(getSavedData_filters.rinseTime);
	$(".filterspopUp input[name=rinseTime]").val(getSavedData_filters.rinseTime);
	$(".filterspopUp input[name=rinseTime]").val(getSavedData_filters.rinseTime); */
	
    $(".filterspopUp input[name=rinseTime]").val(getSavedData_filters.rinseTime);
    $(".filterspopUp input[name=surfaceWashTime]").val(getSavedData_filters.surfaceWashTime);
    $(".filterspopUp input[name=airScourTime]").val(getSavedData_filters.airScourTime);
    $(".filterspopUp select[name=rinseServiceFlow]").val(getSavedData_filters.rinseServiceFlow);
	$(".filterspopUp select[name=rinseFeedRecycle]").val(getSavedData_filters.rinseFeedRecycle);
	  
    $(".filterspopUp textarea[name=filters_Note]").val(getSavedData_filters.filters_Note);
    $(".filterspopUp textarea[name=greenSandLoadId]").val(getSavedData_filters.greenSandLoadId);
	if(getSavedData_filters.filterType == 'Activated Carbon Filter') {
		$('#subFillFilter').show();
		$('#subFillFilter').show();
		
	} else if (getSavedData_filters.filterType == 'Greensand Filter') {
		$('#greenSandFilter').show();
		$('#anthraDepFilter').show();
		$('#airScourShow').show();
		$('#subSurfaceWashShow').show();
	} else if (getSavedData_filters.filterType == 'Horizontal Multimedia Filter' || getSavedData_filters.filterType == 'Vertical Multimedia Filter'){
		$('#sandDepthFilter').show();
		$('#anthraDepthFilter').show();
		$('#garnetDepthFilter').show();
		$('#airScourShow').show();
		$('#subSurfaceWashShow').show();
	}
	if(getSavedData_filters.filterType == 'Horizontal Multimedia Filter'){
		$('#tanLgthFilter').show();
	}
  }else{
	$('#sandDepthFilter').show();
    $('#anthraDepthFilter').show();
    $('#garnetDepthFilter').show();
	$('#filterType').val('Select');
    $(".filterspopUp input[name=designFlowRate]").val('');
    $(".filterspopUp input[name=maxFlowRate]").val('');
    $(".filterspopUp input[name=installedUnits]").val(1);
    $(".filterspopUp input[name=unitsInService]").val(1);
    //$(".filterspopUp input[name=inletSolids]").val('');
    $(".filterspopUp input[name=loadingRate]").val(2);
    $(".filterspopUp select[select=airScourId]").val('Yes');
    $(".filterspopUp select[select=subSurfaceWashId]").val('Yes');
    $(".filterspopUp input[name=backWashTime]").val('');
    $(".filterspopUp input[name=drainTime]").val('');
    $(".filterspopUp input[name=refillTime]").val('');

    $(".filterspopUp input[name=inletTotalCarbon]").val('');
    $(".filterspopUp input[name=inletChlorine]").val('');
    $(".filterspopUp input[name=mediaBed]").val(30);
    $(".filterspopUp input[name=backWashTemphigh]").val('');
    $(".filterspopUp input[name=backWashTempLow]").val('');
    $(".filterspopUp select[name=postBackWash]").val('Yes');
    $(".filterspopUp input[name=designPressure]").val('');
    $(".filterspopUp input[name=corrosionAllowance]").val(0);
    $(".filterspopUp select[name=choiceLining]").val('Select');
    $(".filterspopUp input[name=outerDia]").val('');
    $(".filterspopUp input[name=tanLength]").val('');
    $(".filterspopUp select[name=headType]").val('Select');
    $(".filterspopUp input[name=sandDepthId]").val(0.3048);
    $(".filterspopUp input[name=anthraId]").val(0.4572);
    $(".filterspopUp input[name=garnetId]").val(0.2286);
    $(".filterspopUp input[name=greenSandLoad]").val(0.2286);
    $(".filterspopUp select[name=subFillTypeId]").val('Select');
    $(".filterspopUp select[name=anthraciteCapId]").val('Yes');
    //$(".filterspopUp input[name=anthraciteCarbonVolume]").val(''); 
    //$(".filterspopUp input[name=subFill]").val('');
    $(".filterspopUp input[name=anthraciteDepCap]").val('');
    $(".filterspopUp input[name=shellJointEfficiency]").val(0.85);
    $(".filterspopUp input[name=headJointEfficiency]").val(1);
    $(".filterspopUp input[name=rinseTime]").val('');
    $(".filterspopUp input[name=surfaceWashTime]").val('');
    $(".filterspopUp input[name=airScourTime]").val('');
    $(".filterspopUp select[name=rinseServiceFlow]").val('Yes');
    $(".filterspopUp select[name=rinseFeedRecycle]").val('Yes');
    $(".filterspopUp textarea[name=filters_Note]").val('');
    $(".filterspopUp textarea[name=greenSandLoadId]").val('');
	var table = $(".filterspopUp table.inputTable tbody");
	//if(unitConverionDone==false){
		table.find('tr').each(function (i) {
			var $tds = $(this).find('td'),
			getUnitType = $tds.eq(0).attr('unitType');
			if ($tds.eq(1).find('input').val() != '' && $tds.eq(1).find('input').val() != undefined) {
				var value2 = $tds.eq(2).text();
				var value1 = $tds.eq(1).find('input').val();
				//console.log(value2+'Unit');
				if (value2 != '' && value2 != undefined && value1 != '' && value1 != undefined && getUnitType != '-'
				&& getUnitType != '' && getUnitType != undefined) {
				  //console.log($tds.eq(1).find('input').attr('name'));

				var m;
				try {
				  m = unitoutputjson[value2][0];
				} catch (e) {

				}
				var c;
				try {
				  c = unitoutputjson[value2][1];
				} catch (e) {

				}
				var unitConvertionValue = Number(m) * Number(value1) + Number(c);
				var fixedVal = Number(unitConvertionValue);
				$tds.eq(1).find('input').val(fixedVal);

				}
			}
		});
		//unitConverionDone	=	true;
	//}
  }
});

$('body').on('click', '.filterspopUp .updateBtn', function (e) {
  var validFlag = 0;
  $('.popUpTabError').text('');
  var popUpId = $(this).parent().parent().attr('myId');
  var inputData = {};

  $(".filterspopUp input[name=designFlowRate]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=maxFlowRate]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=installedUnits]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=unitsInService]").css('border', '1px solid #e1e2e5');
  //$(".filterspopUp input[name=inletSolids]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=inletTotalCarbon]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=inletChlorine]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=loadingRate]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp select[name=airScourId]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp select[name=subSurfaceWashId]").css('border', '1px solid #e1e2e5');


  $(".filterspopUp input[name=mediaBed]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=backWashTemphigh]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=backWashTempLow]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=postBackWash]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=designPressure]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=corrosionAllowance]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp select[name=choiceLining]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=outerDia]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=tanLength]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp select[name=headType]").css('border', '1px solid #e1e2e5');;
  $(".filterspopUp input[name=sandDepthId]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=anthraId]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=garnetId]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=greenSandLoad]").css('border', '1px solid #e1e2e5');
  //$(".filterspopUp input[name=anthraciteCarbonVolume]").css('border', '1px solid #e1e2e5');
  //$(".filterspopUp input[name=subFill]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=anthraciteDepCap]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=shellJointEfficiency]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=headJointEfficiency]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=greenSandLoadId]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=drainTime]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=refillTime]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=rinseTime]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp input[name=surfaceWashTime]").css('border', '1px solid #e1e2e5');
  $('#filterType').css('border', '1px solid #e1e2e5');
  $(".filterspopUp select[name=choiceLining]").css('border', '1px solid #e1e2e5');
  $(".filterspopUp select[name=subFillTypeId]").css('border', '1px solid #e1e2e5');
  
if($('#filterType').val() == "Select"){
	validFlag = 1;
	$('#filterType').css('border', '1px solid red');
}
if($(".filterspopUp select[name=headType]").val() == "Select"){
	validFlag = 1;
	$(".filterspopUp select[name=headType]").css('border', '1px solid red');
}


if ($(".filterspopUp input[name=loadingRate]").val() == "") {
	validFlag = 1;
	$(".filterspopUp input[name=loadingRate]").css('border', '1px solid red');
}
/* if ($(".filterspopUp input[name=inletSolids]").val() == "") {
	validFlag = 1;
	$(".filterspopUp input[name=inletSolids]").css('border', '1px solid red');
} */
if($('#filterType').val() == "Greensand Filter"){
	if ($(".filterspopUp input[name=greenSandLoadId]").val() == "" || ($(".filterspopUp input[name=greenSandLoadId]").val() < "0" || $(".filterspopUp input[name=greenSandLoadId]").val() > "15")) {
		validFlag = 1;
		$(".filterspopUp input[name=greenSandLoadId]").css('border', '1px solid red');
	  }
}
  /* if ($(".filterspopUp input[name=designFlowRate]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=designFlowRate]").css('border', '1px solid red');
  } 
  if ($(".filterspopUp input[name=maxFlowRate]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=maxFlowRate]").css('border', '1px solid red');
  }*/
  if ($(".filterspopUp input[name=mediaBed]").val() == "" || $(".filterspopUp input[name=mediaBed]").val() > 100) {
    validFlag = 1;
    $(".filterspopUp input[name=mediaBed]").css('border', '1px solid red');
  }
  if ($(".filterspopUp input[name=backWashTemphigh]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=backWashTemphigh]").css('border', '1px solid red');
  }
  if ($(".filterspopUp input[name=backWashTempLow]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=backWashTempLow]").css('border', '1px solid red');
  }
  if ($(".filterspopUp select[name=postBackWash]").val() == "") {
    validFlag = 1;
    $(".filterspopUp select[name=postBackWash]").css('border', '1px solid red');
  }
  if ($(".filterspopUp input[name=designPressure]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=designPressure]").css('border', '1px solid red');
  }
  if ($(".filterspopUp select[name=choiceLining]").val() == "Select") {
    validFlag = 1;
    $(".filterspopUp select[name=choiceLining]").css('border', '1px solid red');
  }
  if ($(".filterspopUp input[name=outerDia]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=outerDia]").css('border', '1px solid red');
  }
  if($('#filterType').val() == "Horizontal Multimedia Filter"){
	  if ($(".filterspopUp input[name=tanLength]").val() == "") {
		validFlag = 1;
		$(".filterspopUp input[name=tanLength]").css('border', '1px solid red');
	  }
  }
  
  if($('#filterType').val() == 'Vertical Multimedia Filter' || $('#filterType').val() == 'Horizontal Multimedia Filter'){
	  if ($(".filterspopUp input[name=sandDepthId]").val() == "") {
		validFlag = 1;
		$(".filterspopUp input[name=sandDepthId]").css('border', '1px solid red');
	  }
	  if ($(".filterspopUp input[name=anthraId]").val() == "") {
		validFlag = 1;
		$(".filterspopUp input[name=anthraId]").css('border', '1px solid red');
	  }
	  if ($(".filterspopUp input[name=garnetId]").val() == "") {
		validFlag = 1;
		$(".filterspopUp input[name=garnetId]").css('border', '1px solid red');
	  }
  }
  
  /*if ($(".filterspopUp input[name=anthraciteCarbonVolume]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=anthraciteCarbonVolume]").css('border', '1px solid red');
  }
   if ($(".filterspopUp input[name=greenSandLoad]").val() == "" || $(".filterspopUp input[name=greenSandLoad]").val() < 0 || $(".filterspopUp input[name=greenSandLoad]").val() > 15) {
    validFlag = 1;
    $(".filterspopUp input[name=greenSandLoad]").css('border', '1px solid red');
  } */
  
  /* if ($(".filterspopUp input[name=shellJointEfficiency]").val() == "" || $(".filterspopUp input[name=shellJointEfficiency]").val() < 0 || $(".filterspopUp input[name=shellJointEfficiency]").val() > 1) {
    validFlag = 1;
    $(".filterspopUp input[name=shellJointEfficiency]").css('border', '1px solid red');
  } */
  if ($(".filterspopUp input[name=shellJointEfficiency]").val() == "" || ($(".filterspopUp input[name=shellJointEfficiency]").val() < "0" || $(".filterspopUp input[name=shellJointEfficiency]").val() > "1")) {
    validFlag = 1;
    $(".filterspopUp input[name=shellJointEfficiency]").css('border', '1px solid red');
  }
  if ($(".filterspopUp input[name=headJointEfficiency]").val() == "" || ($(".filterspopUp input[name=headJointEfficiency]").val() < "0" || $(".filterspopUp input[name=headJointEfficiency]").val() > "1")) {
    validFlag = 1;
    $(".filterspopUp input[name=headJointEfficiency]").css('border', '1px solid red');
  }
  $(".filterspopUp :input").each(function () {
    if ($(this).val() < 0) {
      validFlag = 2;
      var name=$(this).attr('name');
      $(".filterspopUp input[name="+name+"]").css('border', '1px solid red');
    }
  });
  if ($(".filterspopUp input[name=installedUnits]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=installedUnits]").css('border', '1px solid red');
  }
  if ($(".filterspopUp input[name=unitsInService]").val() == "") {
    validFlag = 1;
    $(".filterspopUp input[name=unitsInService]").css('border', '1px solid red');
  }
  if($('#filterType').val() == 'Activated Carbon Filter'){
	  
	  if ($(".filterspopUp select[name=subFillTypeId]").val() == "Select") {
		validFlag = 1;
		$(".filterspopUp select[name=subFillTypeId]").css('border', '1px solid red');
	  }
  }


  //if (validFlag == 0) {
    inputData.designFlowRate = $(".filterspopUp input[name=designFlowRate]").val();
    inputData.maxFlowRate = $(".filterspopUp input[name=maxFlowRate]").val();
    inputData.installedUnits = $(".filterspopUp input[name=installedUnits]").val();
    inputData.unitsInService = $(".filterspopUp input[name=unitsInService]").val();
    //inputData.inletSolids = $(".filterspopUp input[name=inletSolids]").val();
    
    inputData.mediaBed = $(".filterspopUp input[name=mediaBed]").val();
    inputData.backWashTemphigh = $(".filterspopUp input[name=backWashTemphigh]").val();
    inputData.backWashTempLow = $(".filterspopUp input[name=backWashTempLow]").val();
    inputData.postBackWash = $(".filterspopUp select[name=postBackWash]").val();
    inputData.designPressure = $(".filterspopUp input[name=designPressure]").val();
    inputData.corrosionAllowance = $(".filterspopUp input[name=corrosionAllowance]").val();
    inputData.choiceLining = $(".filterspopUp select[name=choiceLining]").val();
    inputData.outerDia = $(".filterspopUp input[name=outerDia]").val();
    
    inputData.headType = $(".filterspopUp select[name=headType]").val();
	if($('#filterType').val() == 'Horizontal Multimedia Filter'){
		inputData.tanLength = $(".filterspopUp input[name=tanLength]").val();
	}else{
		inputData.tanLength = "";
	}

	if($('#filterType').val() == 'Activated Carbon Filter'){
		inputData.subFillTypeId = $(".filterspopUp select[name=subFillTypeId]").val();
		inputData.inletTotalCarbon = $(".filterspopUp input[name=inletTotalCarbon]").val();
		inputData.inletChlorine = $(".filterspopUp input[name=inletChlorine]").val();
		inputData.airScourId = "";
		inputData.subSurfaceWashId = "";
	}else{
		inputData.subFillTypeId = "Select";
		inputData.airScourId = $(".filterspopUp select[name=airScourId]").val();
		inputData.subSurfaceWashId = $(".filterspopUp select[name=subSurfaceWashId]").val();
		inputData.inletTotalCarbon = "";
		inputData.inletChlorine = "";
	}
	if($('#filterType').val() == 'Greensand Filter'){
		inputData.anthraciteCapId = $(".filterspopUp select[name=anthraciteCapId]").val();
		inputData.greenSandLoadId =$(".filterspopUp input[name=greenSandLoadId]").val();
	}else{
		inputData.anthraciteCapId = "Yes";
		inputData.greenSandLoadId = "";
	}
	if($('#filterType').val() == 'Vertical Multimedia Filter' || $('#filterType').val() == 'Horizontal Multimedia Filter'){
		inputData.sandDepthId = $(".filterspopUp input[name=sandDepthId]").val();
		inputData.anthraId = $(".filterspopUp input[name=anthraId]").val();
		inputData.garnetId = $(".filterspopUp input[name=garnetId]").val();
	}else{
		inputData.sandDepthId = "";
		inputData.anthraId = "";
		inputData.garnetId = "";
	}
	
	inputData.filterType = $(".filterspopUp select[name=filterType]").val();    
    inputData.greenSandLoad = $(".filterspopUp input[name=greenSandLoad]").val();
    //inputData.anthraciteCarbonVolume = $(".filterspopUp input[name=anthraciteCarbonVolume]").val();
    //inputData.subFill = $(".filterspopUp input[name=subFill]").val();inletChlorine
    inputData.anthraciteDepCap = $(".filterspopUp input[name=anthraciteDepCap]").val();
    inputData.backWashTime = $(".filterspopUp input[name=backWashTime]").val();
    inputData.drainTime = $(".filterspopUp input[name=drainTime]").val();
    inputData.shellJointEfficiency = $(".filterspopUp input[name=shellJointEfficiency]").val();
    inputData.headJointEfficiency = $(".filterspopUp input[name=headJointEfficiency]").val();
    inputData.loadingRate = $(".filterspopUp input[name=loadingRate]").val();
    
    inputData.refillTime = $(".filterspopUp input[name=refillTime]").val();
    inputData.rinseTime = $(".filterspopUp input[name=rinseTime]").val();
    inputData.surfaceWashTime = $(".filterspopUp input[name=surfaceWashTime]").val();
    inputData.airScourTime = $(".filterspopUp input[name=airScourTime]").val();
    inputData.rinseServiceFlow = $(".filterspopUp select[name=rinseServiceFlow]").val();
    inputData.rinseFeedRecycle = $(".filterspopUp select[name=rinseFeedRecycle]").val();
    inputData.filters_Note == $(".filterspopUp textarea[name=filters_Note]").val();
    
   
    inputData.filterType = $("#filterType").val();

    localStorage.setItem(popUpId, JSON.stringify(inputData));
	
	if(mmfFormArray.indexOf(popUpId) === -1) {
		mmfFormArray.push(popUpId);		
	}
	if(validFlag==0){
	  $('#'+popUpId).addClass('restClass');
	  $('#'+popUpId).removeClass('testClass');
	}
	else{
	  $('#'+popUpId).removeClass('restClass');
		  $('#'+popUpId).addClass('testClass');
	}
	
	//}
 /*
  else {
    $('.popUpTabError').text('');
    $('.popUpTabError').text('Please enter all highlighted input from all tab.');
    if (validFlag == 2)
      $('.popUpTabError').text('Please enter non negative values.');
    e.stopImmediatePropagation();
  }
  */
});

//Hide Show filter parameters
$('body').on('change', '.filterspopUp #filterType', function () {
  /* if (this.value == 2)
    $('#inletSldFilter').hide();
  else
    $('#inletSldFilter').show(); */

  if (this.value == 'Activated Carbon Filter') {
    $('#organicCbnFilter').show();
    $('#inletChlFilter').show();
  }
  else {
    $('#organicCbnFilter').hide();
    $('#inletChlFilter').hide();
  }
  if (this.value == 'Horizontal Multimedia Filter') {
    $('#tanLgthFilter').show();
  } else
    $('#tanLgthFilter').hide();

  if (this.value == 'Horizontal Multimedia Filter' || this.value == 'Vertical Multimedia Filter') {
    $('#sandDepthFilter').show();
    $('#anthraDepthFilter').show();
    $('#garnetDepthFilter').show();
  } else {
    $('#sandDepthFilter').hide();
    $('#anthraDepthFilter').hide();
    $('#garnetDepthFilter').hide();
  }
  if (this.value == 'Activated Carbon Filter') {
    //$('activatedCarbonFilter').show()
    $('#subFillFilter').show();
  }
  else {
    // $('activatedCarbonFilter').hide()
    $('#subFillFilter').hide();
  }
  if (this.value == 'Greensand Filter') {
    $('#greenSandFilter').show();
    $('#anthraDepFilter').show();
  } else {
    $('#greenSandFilter').hide();
    $('#anthraDepFilter').hide();
  }

  //hide show Output Parameters
  if (this.value == 'Greensand Filter') {
    $('#volGreenSandShow').show();
    $('#gsandandBedDepthShow').show();
  }
  else {
    $('#volGreenSandShow').hide();
    $('#gsandandBedDepthShow').hide();
  }
  if (this.value == 'Activated Carbon Filter') {
    $('#volAnthraShow').hide();
    $('#anthraBedDepthSshow').hide();
  }
  else {
    $('#volAnthraShow').show();
    $('#anthraBedDepthSshow').show();
  }
  if (this.value == 'Vertical Multimedia Filter' || this.value == 'Horizontal Multimedia Filter') {
    $('#volFilterSandShow').show();
    $('#filterSandDepthShow').show();
    $('#volGarnetShow').show();
    $('#garnetBedDepthShow').show();
  } else {
    $('#volFilterSandShow').hide();
    $('#filterSandDepthShow').hide();
    $('#volGarnetShow').hide();
    $('#garnetBedDepthShow').hide();
  }
  if (this.value == 'Activated Carbon Filter') {
    $('#volCarbonShow').show();
    $('#sandSubfillShow').show();
    $('#carbonBedDepthShow').show();
    $('#drainDownShow').hide();
    $('#airScourShow').hide();
    $('#refillShow').hide();
    $('#subSurfaceWashShow').hide();
  }
  else {
    $('#volCarbonShow').hide();
    //$('#sandSubfillShow').hide();
    $('#carbonBedDepthShow').hide();
    $('#drainDownShow').show();
    $('#airScourShow').show();
    $('#refillShow').show();
    $('#subSurfaceWashShow').show();
  }
  if (this.value == 'Activated Carbon Filter') {
    $('#drainDownFilter').hide();
    $('#drainDownTimeFilter').hide();
    $('#drainDownVolumeFilter').hide();
    $('#airScourFlowFilter').hide();
    $('#airScourTimeFilter').hide();
    $('#refillFlowFilter').hide();
    $('#refillTimeFilter').hide();
    $('#subsurfaceWashFlowFilter').hide();
    $('#subsurfaceWashTimeFilter').hide();
    $('#subsurfaceWashVolFilter').hide();
  }
  else {
    $('#drainDownFilter').show();
    $('#drainDownTimeFilter').show();
    $('#drainDownVolumeFilter').show();
    $('#airScourFlowFilter').show();
    $('#airScourTimeFilter').show();
    $('#refillFlowFilter').show();
    $('#refillTimeFilter').show();
    $('#subsurfaceWashFlowFilter').show();
    $('#subsurfaceWashTimeFilter').show();
    $('#subsurfaceWashVolFilter').show();
  }

});

$(document).on('change', '.filterspopUp .twoDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(2);
	$(this).val(values);
});
$(document).on('change', '#airScourShow select', function () {
	var thisVal = $(this).val();
	if(thisVal == 'Yes'){
		$('#subSurfaceWashShow select').val('No');
	}
});
$(document).on('change', '#subSurfaceWashShow select', function () {
	var thisVal = $(this).val();
	if(thisVal == 'Yes'){
		$('#airScourShow select').val('No');
	}
});

$(document).on('change', '.filterspopUp input', function () {
	var val = $(this).val();
    if(isNaN(val)){
         val = val.replace(/[^0-9\.]/g,'');
         if(val.split('.').length>2) 
             val =val.replace(/\.+$/,"");
    }
    $(this).val(val);
});

//on Enter press next input 
$(document).on('keypress', '.filterspopUp input,.filterspopUp select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});




