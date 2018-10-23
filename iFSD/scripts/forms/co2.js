$('body').on('click', '.CO2', function(){
	var id=$(this).attr('id');
	inputErrorRemove('co2Popup');
	$('.co2Popup').removeClass('dispNone');
	$('.co2Popup').show();
	$('.popUpTabError').text('');
	$('.co2Popup .body ul.nav li').removeClass('active');
	$('.co2Popup .body ul.nav li:eq(0)').addClass('active');
	$('.co2Popup .body .Input').removeClass('dispNone');
	$('.co2Popup .body .Output').addClass('dispNone');
	$('.co2Popup .body .Note').addClass('dispNone');
	$('.co2Popup .body .Calculation').addClass('dispNone');
	//$('.co2Popup div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.co2Popup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.co2Popup div .popTitle').text(gateTitle);
	$('.co2Popup').attr("myId", id);
	if(localStorage.getItem(id) !== null){
		getSavedData_co2 = JSON.parse(localStorage.getItem(''+id+''));
		//console.log("id" + JSON.stringify(getStoredData));
		//$(".co2Popup input[name=designFlowRate]").val(getSavedData_co2.designFlowRate);
		$(".co2Popup input[name=normalFlowRate]").val(getSavedData_co2.normalFlowRate);
		//$(".co2Popup input[name=cO2ConcentrationIn]").val(getSavedData_co2.cO2ConcentrationIn);
		$(".co2Popup input[name=cO2ConcentrationOut]").val(getSavedData_co2.cO2ConcentrationOut);
		//$(".co2Popup input[name=waterMinTemperature]").val(getSavedData_co2.waterMinTemperature);
		$(".co2Popup input[name=liquidLoadingRate]").val(getSavedData_co2.liquidLoadingRate);
		$(".co2Popup input[name=a]").val(getSavedData_co2.a);
		$(".co2Popup input[name=b]").val(getSavedData_co2.b);
		$(".co2Popup input[name=c]").val(getSavedData_co2.c);
		$(".co2Popup input[name=d]").val(getSavedData_co2.d);
		$(".co2Popup input[name=e]").val(getSavedData_co2.e);
		$(".co2Popup input[name=clearwellRetentionTime]").val(getSavedData_co2.clearwellRetentionTime);
		$(".co2Popup input[name=turndownRatio]").val(getSavedData_co2.turndownRatio);
		$(".co2Popup input[name=towerHeight]").val(getSavedData_co2.towerHeight);
		$(".co2Popup input[name=clearwellHeight]").val(getSavedData_co2.clearwellHeight);
		$(".co2Popup input[name=packingSupportGratingHeight]").val(getSavedData_co2.packingSupportGratingHeight);
		$(".co2Popup input[name=overflowNozzleDiameter]").val(getSavedData_co2.overflowNozzleDiameter);
		//$(".co2Popup input[name=demisterHeight]").val(getSavedData_co2.demisterHeight);
		$(".co2Popup input[name=inletHeaderDistributorSize]").val(getSavedData_co2.inletHeaderDistributorSize);
		$(".co2Popup input[name=sprayNozzleHeight]").val(getSavedData_co2.sprayNozzleHeight);
		$(".co2Popup input[name=fanSize]").val(getSavedData_co2.fanSize);
		$(".co2Popup .co2_Note").val(getSavedData_co2.co2_Note);
	}else{
		//$(".co2Popup input[name=designFlowRate]").val('');
		$(".co2Popup input[name=normalFlowRate]").val('');
		//$(".co2Popup input[name=cO2ConcentrationIn]").val('');
		$(".co2Popup input[name=cO2ConcentrationOut]").val('');
		//$(".co2Popup input[name=waterMinTemperature]").val('');
		$(".co2Popup input[name=liquidLoadingRate]").val('');
		$(".co2Popup input[name=a]").val(26.92);
		$(".co2Popup input[name=b]").val(-0.61);
		$(".co2Popup input[name=c]").val(0.029);
		$(".co2Popup input[name=d]").val(-0.0008);
		$(".co2Popup input[name=e]").val(0.000008);
		$(".co2Popup input[name=clearwellRetentionTime]").val('');
		$(".co2Popup input[name=turndownRatio]").val('');
		$(".co2Popup input[name=towerHeight]").val(120);
		$(".co2Popup input[name=clearwellHeight]").val(180);
		$(".co2Popup input[name=packingSupportGratingHeight]").val(1.5);
		$(".co2Popup input[name=overflowNozzleDiameter]").val('');
		//$(".co2Popup input[name=demisterHeight]").val('');
		$(".co2Popup input[name=inletHeaderDistributorSize]").val('');
		$(".co2Popup input[name=sprayNozzleHeight]").val('');
		$(".co2Popup input[name=fanSize]").val(3);
		$(".co2Popup .co2_Note").val('');
	}
	
	//Unit type Set
	var table = $("table tbody");
	table.find('tr').each(function (i){
        var $tds = $(this).find('td'),
		getUnitType = $tds.eq(0).attr('unitType');
		if(getUnitType != '-'){
			getSavedUnit = JSON.parse(localStorage.getItem('SelectedUnits'));
			for(var j=0; j<getSavedUnit.length;j++){
				if(getUnitType == getSavedUnit[j].unitType){
					$tds.eq(2).text(getSavedUnit[j].unit);
				}
			}
		}else{
			$tds.eq(2).text('-');
		}
    });
	//output two decimal
	$('.co2Popup .twoDecimalOut').each(function(){
		var thisVal = $(this).text();
		var values = parseFloat(thisVal).toFixed(2);
		if(thisVal)
		$(this).text(values);
	});

	
});

$('body').on('click','.co2Popup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	//$(".co2Popup input[name=designFlowRate]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=normalFlowRate]").css('border','1px solid #e1e2e5');
	//$(".co2Popup input[name=cO2ConcentrationIn]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=cO2ConcentrationOut]").css('border','1px solid #e1e2e5');
	//$(".co2Popup input[name=waterMinTemperature]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=liquidLoadingRate]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=a]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=b]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=c]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=d]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=e]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=clearwellRetentionTime]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=turndownRatio]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=towerHeight]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=clearwellHeight]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=packingSupportGratingHeight]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=overflowNozzleDiameter]").css('border','1px solid #e1e2e5');
	//$(".co2Popup input[name=demisterHeight]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=inletHeaderDistributorSize]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=sprayNozzleHeight]").css('border','1px solid #e1e2e5');
	$(".co2Popup input[name=fanSize]").css('border','1px solid #e1e2e5');
	
	/* if($(".co2Popup input[name=designFlowRate]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=designFlowRate]").css('border','1px solid red');
	} */
	if($(".co2Popup input[name=normalFlowRate]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=normalFlowRate]").css('border','1px solid red');
	}
	/*if($(".co2Popup input[name=cO2ConcentrationIn]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=cO2ConcentrationIn]").css('border','1px solid red');
	}*/
	if($(".co2Popup input[name=cO2ConcentrationOut]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=cO2ConcentrationOut]").css('border','1px solid red');
	}
	/* if($(".co2Popup input[name=waterMinTemperature]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=waterMinTemperature]").css('border','1px solid red');
	} */
	if($(".co2Popup input[name=liquidLoadingRate]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=liquidLoadingRate]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=a]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=a]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=b]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=b]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=c]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=c]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=d]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=d]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=d]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=d]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=e]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=e]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=clearwellRetentionTime]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=clearwellRetentionTime]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=turndownRatio]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=turndownRatio]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=towerHeight]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=towerHeight]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=clearwellHeight]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=clearwellHeight]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=packingSupportGratingHeight]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=packingSupportGratingHeight]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=overflowNozzleDiameter]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=overflowNozzleDiameter]").css('border','1px solid red');
	}
	/* if($(".co2Popup input[name=demisterHeight]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=demisterHeight]").css('border','1px solid red');
	} */
	if($(".co2Popup input[name=inletHeaderDistributorSize]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=inletHeaderDistributorSize]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=sprayNozzleHeight]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=sprayNozzleHeight]").css('border','1px solid red');
	}
	if($(".co2Popup input[name=fanSize]").val() == ""){
		validFlag = 1;
		$(".co2Popup input[name=fanSize]").css('border','1px solid red');
	}
	
	//if(validFlag == 0){
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};
		//inputData.designFlowRate = $(".co2Popup input[name=designFlowRate]").val();
		inputData.normalFlowRate = $(".co2Popup input[name=normalFlowRate]").val();
		//inputData.cO2ConcentrationIn = $(".co2Popup input[name=cO2ConcentrationIn]").val();
		inputData.cO2ConcentrationOut = $(".co2Popup input[name=cO2ConcentrationOut]").val();
		//inputData.waterMinTemperature = $(".co2Popup input[name=waterMinTemperature]").val();
		inputData.liquidLoadingRate = $(".co2Popup input[name=liquidLoadingRate]").val();
		inputData.a = $(".co2Popup input[name=a]").val();
		inputData.b = $(".co2Popup input[name=b]").val();
		inputData.c = $(".co2Popup input[name=c]").val();
		inputData.d = $(".co2Popup input[name=d]").val();
		inputData.e = $(".co2Popup input[name=e]").val();
		inputData.clearwellRetentionTime = $(".co2Popup input[name=clearwellRetentionTime]").val();
		inputData.turndownRatio = $(".co2Popup input[name=turndownRatio]").val();
		inputData.towerHeight = $(".co2Popup input[name=towerHeight]").val();
		inputData.clearwellHeight = $(".co2Popup input[name=clearwellHeight]").val();
		inputData.packingSupportGratingHeight = $(".co2Popup input[name=packingSupportGratingHeight]").val();
		inputData.overflowNozzleDiameter = $(".co2Popup input[name=overflowNozzleDiameter]").val();
		//inputData.demisterHeight = $(".co2Popup input[name=demisterHeight]").val();
		inputData.inletHeaderDistributorSize = $(".co2Popup input[name=inletHeaderDistributorSize]").val();
		inputData.sprayNozzleHeight = $(".co2Popup input[name=sprayNozzleHeight]").val();
		inputData.fanSize = $(".co2Popup input[name=fanSize]").val();
		//inputData.co2_Note = $(".co2Popup .co2_Note").val();
		
		localStorage.setItem(popUpId,  JSON.stringify(inputData));
		if(co2FormArrya.indexOf(popUpId) === -1) {
			co2FormArrya.push(popUpId);			
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
	else{
		$('.popUpTabError').text('');
		$('.popUpTabError').text('Please enter all highlighted input.');
		e.stopImmediatePropagation();
	}	
	*/
});

$(document).on('change', '.co2Popup .twoDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(2);
	$(this).val(values);
});


$(document).on('change', '.co2Popup .sixDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(6);
	$(this).val(values);
});

$(document).on('change', '.co2Popup .fiveDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(5);
	$(this).val(values);
});
//on Enter press next input 
$(document).on('keypress', '.co2Popup input,.co2Popup select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});

