$('body').on('click', '.Limestone', function(){
	var id=$(this).attr('id');
	inputErrorRemove('rLimestonePopup');
	$('.popUpTabError').text('');
	$('.rLimestonePopup').removeClass('dispNone');
	$('.rLimestonePopup').show();
	$('.rLimestonePopup .body ul.nav li').removeClass('active');
	$('.rLimestonePopup .body ul.nav li:eq(0)').addClass('active');
	$('.rLimestonePopup .body .Input').removeClass('dispNone');
	$('.rLimestonePopup .body .Output').addClass('dispNone');
	$('.rLimestonePopup .body .Design').addClass('dispNone');
	$('.rLimestonePopup .body .Note').addClass('dispNone');
	$('.rLimestonePopup .body .Calculation').addClass('dispNone');
	//$('.rLimestonePopup div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.rLimestonePopup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.rLimestonePopup div .popTitle').text(gateTitle);
	$('.rLimestonePopup').attr("myId", id);
	//$('#remineralizationType').val("Select");
	//$('#Gravity, #Pressure').hide();
	if(localStorage.getItem(id) !== null){
		var getSavedData_rLimestone = JSON.parse(localStorage.getItem(''+id+''));

		$(".rLimestonePopup input[name=remineralizationBypass]").val(getSavedData_rLimestone.remineralizationBypass);
		$(".rLimestonePopup input[name=reactiveCO2_H2SO4]").val(getSavedData_rLimestone.reactiveCO2_H2SO4);
		$(".rLimestonePopup input[name=cO2Stream1A]").val(getSavedData_rLimestone.cO2Stream1A);
		$(".rLimestonePopup input[name=cO2Stream1B]").val(getSavedData_rLimestone.cO2Stream1B);
		$(".rLimestonePopup input[name=naOH]").val(getSavedData_rLimestone.naOH);
		$(".rLimestonePopup input[name=h2SO4]").val(getSavedData_rLimestone.h2SO4);
		$("#remineralizationType").val(getSavedData_rLimestone.remineralizationType);
		
		if(getSavedData_rLimestone.remineralizationType == "Gravity"){
			$('#Gravity').show();
			$(".rLimestonePopup input[name=reactorLength]").val(getSavedData_rLimestone.reactorLength);
			$(".rLimestonePopup input[name=reactorWidth]").val(getSavedData_rLimestone.reactorWidth);
			$(".rLimestonePopup input[name=assumedBeddepth]").val(getSavedData_rLimestone.assumedBeddepth);
			$(".rLimestonePopup input[name=reductionInFinshedBedDepth]").val(getSavedData_rLimestone.reductionInFinshedBedDepth);
			$(".rLimestonePopup input[name=numberOfSpareUnitsN]").val(getSavedData_rLimestone.numberOfSpareUnitsN);
			$(".rLimestonePopup input[name=assumedCaCO3Purity]").val(getSavedData_rLimestone.assumedCaCO3Purity);
			$(".rLimestonePopup input[name=specificCaCO3100Consumption]").val(getSavedData_rLimestone.specificCaCO3100Consumption);
			$(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").val(getSavedData_rLimestone.assumedCaCO3SpecificGravity);
			//Empty Pressure input 
			$(".rLimestonePopup input[name=pR_vesselDiameter]").val('');
			$(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").val('');
			$(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").val('');
			$(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").val('');
			$(".rLimestonePopup input[name=pR_coldWaterTemperature]").val('');
			$(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").val('');
			$(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").val('');
			$(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").val('');

		}
		if( getSavedData_rLimestone.remineralizationType == "Pressure"){
			$('#Pressure').show();
			$(".rLimestonePopup input[name=pR_vesselDiameter]").val(getSavedData_rLimestone.pR_vesselDiameter);
			$(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").val(getSavedData_rLimestone.pR_assumedTotalBedDepth);
			$(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").val(getSavedData_rLimestone.pR_reductionInFinshedBedDepth);
			$(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").val(getSavedData_rLimestone.pR_NumberOfSpareUnits);
			$(".rLimestonePopup input[name=pR_coldWaterTemperature]").val(getSavedData_rLimestone.pR_coldWaterTemperature);
			$(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").val(getSavedData_rLimestone.pR_assumedCaCO3Purity);
			$(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").val(getSavedData_rLimestone.pR_specificCaCO3100Consumption);
			$(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").val(getSavedData_rLimestone.pR_AssumedCaCO3SpecificGravity);
			//Empty Gravity input 
			$(".rLimestonePopup input[name=reactorLength]").val('');
			$(".rLimestonePopup input[name=reactorWidth]").val('');
			$(".rLimestonePopup input[name=assumedBeddepth]").val('');
			$(".rLimestonePopup input[name=reductionInFinshedBedDepth]").val('');
			$(".rLimestonePopup input[name=numberOfSpareUnitsN]").val('');
			$(".rLimestonePopup input[name=assumedCaCO3Purity]").val('');
			$(".rLimestonePopup input[name=specificCaCO3100Consumption]").val('');
			$(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").val('');
		}
		
	}else{

		$(".rLimestonePopup input[name=remineralizationBypass]").val('');
		$(".rLimestonePopup input[name=reactiveCO2_H2SO4]").val('');
		$(".rLimestonePopup input[name=cO2Stream1A]").val('');
		$(".rLimestonePopup input[name=cO2Stream1B]").val('');
		$(".rLimestonePopup input[name=naOH]").val('');
		$(".rLimestonePopup input[name=h2SO4]").val('');
		$(".rLimestonePopup input[name=reactorLength]").val('');
		$(".rLimestonePopup input[name=reactorWidth]").val('');
		$(".rLimestonePopup input[name=assumedBeddepth]").val('');
		$(".rLimestonePopup input[name=reductionInFinshedBedDepth]").val('');
		$(".rLimestonePopup input[name=numberOfSpareUnitsN]").val('');
		$(".rLimestonePopup input[name=assumedCaCO3Purity]").val('');
		$(".rLimestonePopup input[name=specificCaCO3100Consumption]").val('');
		$(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").val('');
		//Pressure Remineralization 
		$(".rLimestonePopup input[name=pR_vesselDiameter]").val('');
		$(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").val('');
		$(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").val('');
		$(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").val('');
		$(".rLimestonePopup input[name=pR_coldWaterTemperature]").val('');
		$(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").val('');
		$(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").val('');
		$(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").val('');
		$("#remineralizationType").val('Select');
		$('#Gravity, #Pressure').hide();
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
	$(".rLimestonePopup .Output .table tbody tr td:nth-child(2)").each(function(){
		if(!($(this).hasClass("rType"))){
		var thisVal = $(this).text();
		var values = parseFloat(thisVal).toFixed(2);
		if(thisVal)
		$(this).text(values);
		}
	});

});

$('body').on('click','.rLimestonePopup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');

	$(".rLimestonePopup input[name=remineralizationBypass]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=reactiveCO2_H2SO4]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=cO2Stream1A]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=cO2Stream1B]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=naOH]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=h2SO4]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=reactorLength]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=reactorWidth]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=assumedBeddepth]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=reductionInFinshedBedDepth]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=numberOfSpareUnitsN]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=assumedCaCO3Purity]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=specificCaCO3100Consumption]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").css('border','1px solid #e1e2e5');
	//
	$(".rLimestonePopup input[name=pR_vesselDiameter]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_coldWaterTemperature]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").css('border','1px solid #e1e2e5');
	$(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").css('border','1px solid #e1e2e5');
	$("#remineralizationType").css('border','1px solid #e1e2e5');
	

	if($(".rLimestonePopup input[name=remineralizationBypass]").val() == ""){
		validFlag = 1;
		$(".rLimestonePopup input[name=remineralizationBypass]").css('border','1px solid red');
	}
	if($(".rLimestonePopup input[name=reactiveCO2_H2SO4]").val() == ""){
		validFlag = 1;
		$(".rLimestonePopup input[name=reactiveCO2_H2SO4]").css('border','1px solid red');
	}
	if($(".rLimestonePopup input[name=cO2Stream1A]").val() == ""){
		validFlag = 1;
		$(".rLimestonePopup input[name=cO2Stream1A]").css('border','1px solid red');
	}
	if($(".rLimestonePopup input[name=cO2Stream1B]").val() == ""){
		validFlag = 1;
		$(".rLimestonePopup input[name=cO2Stream1B]").css('border','1px solid red');
	}
	if($(".rLimestonePopup input[name=naOH]").val() == ""){
		validFlag = 1;
		$(".rLimestonePopup input[name=naOH]").css('border','1px solid red');
	}
	if($(".rLimestonePopup input[name=h2SO4]").val() == ""){
		validFlag = 1;
		$(".rLimestonePopup input[name=h2SO4]").css('border','1px solid red');
	}
	
	//Remineralization Design 
	if($('#remineralizationType').val() == "Gravity"){
		if($(".rLimestonePopup input[name=reactorLength]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=reactorLength]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=reactorWidth]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=reactorWidth]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=assumedBeddepth]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=assumedBeddepth]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=reductionInFinshedBedDepth]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=reductionInFinshedBedDepth]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=numberOfSpareUnitsN]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=numberOfSpareUnitsN]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=assumedCaCO3Purity]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=assumedCaCO3Purity]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=specificCaCO3100Consumption]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=specificCaCO3100Consumption]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").css('border','1px solid red');
		}
		
	}
	//Pressure
	if($('#remineralizationType').val() == "Pressure"){
		if($(".rLimestonePopup input[name=pR_vesselDiameter]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_vesselDiameter]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_coldWaterTemperature]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_coldWaterTemperature]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").css('border','1px solid red');
		}
		if($(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").val() == ""){
			validFlag = 1;
			$(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").css('border','1px solid red');
		}
		
	}
	
	//if(validFlag == 0){
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};

		inputData.remineralizationBypass = $(".rLimestonePopup input[name=remineralizationBypass]").val();
		inputData.reactiveCO2_H2SO4 = $(".rLimestonePopup input[name=reactiveCO2_H2SO4]").val();
		inputData.cO2Stream1A = $(".rLimestonePopup input[name=cO2Stream1A]").val();
		inputData.cO2Stream1B = $(".rLimestonePopup input[name=cO2Stream1B]").val();
		inputData.naOH = $(".rLimestonePopup input[name=naOH]").val();
		inputData.h2SO4 = $(".rLimestonePopup input[name=h2SO4]").val();
		inputData.remineralization_Design = $("#remineralizationDesign").val();
		inputData.remineralizationType = $('#remineralizationType').val();

		if($('#remineralizationType').val() == "Gravity"){
			
			inputData.reactorLength = $(".rLimestonePopup input[name=reactorLength]").val();
			inputData.reactorWidth = $(".rLimestonePopup input[name=reactorWidth]").val();
			inputData.assumedBeddepth = $(".rLimestonePopup input[name=assumedBeddepth]").val();
			inputData.reductionInFinshedBedDepth = $(".rLimestonePopup input[name=reductionInFinshedBedDepth]").val();
			inputData.numberOfSpareUnitsN = $(".rLimestonePopup input[name=numberOfSpareUnitsN]").val();
			inputData.assumedCaCO3Purity = $(".rLimestonePopup input[name=assumedCaCO3Purity]").val();
			inputData.specificCaCO3100Consumption = $(".rLimestonePopup input[name=specificCaCO3100Consumption]").val();
			inputData.assumedCaCO3SpecificGravity = $(".rLimestonePopup input[name=assumedCaCO3SpecificGravity]").val();
		}
		if($('#remineralizationType').val() == "Pressure"){
			inputData.pR_vesselDiameter = $(".rLimestonePopup input[name=pR_vesselDiameter]").val();
			inputData.pR_assumedTotalBedDepth = $(".rLimestonePopup input[name=pR_assumedTotalBedDepth]").val();
			inputData.pR_reductionInFinshedBedDepth = $(".rLimestonePopup input[name=pR_reductionInFinshedBedDepth]").val();
			inputData.pR_NumberOfSpareUnits = $(".rLimestonePopup input[name=pR_NumberOfSpareUnits]").val();
			inputData.pR_coldWaterTemperature = $(".rLimestonePopup input[name=pR_coldWaterTemperature]").val();
			inputData.pR_assumedCaCO3Purity = $(".rLimestonePopup input[name=pR_assumedCaCO3Purity]").val();
			inputData.pR_specificCaCO3100Consumption = $(".rLimestonePopup input[name=pR_specificCaCO3100Consumption]").val();
			inputData.pR_AssumedCaCO3SpecificGravity = $(".rLimestonePopup input[name=pR_AssumedCaCO3SpecificGravity]").val();
		}
		localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(limeStoneFormArray.indexOf(popUpId) === -1) {
			limeStoneFormArray.push(popUpId);			
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
		$('.popUpTabError').text('Please enter all highlighted input from all tab.');
		e.stopImmediatePropagation();
	}	
	*/
});

$('body').on('change', '#remineralizationType', function(){
	var test = $(this).val();
	$(".rL_design").hide();
	$("#"+test).removeClass('dispNone');
	$("#"+test).show();
	$("."+test).removeClass('dispNone');
	$("."+test).show();
	if(test == 'Gravity'){
		$('.rType').text('Gravity');
	}else{
		$('.rType').text('Pressure');
	}
});

$(document).on('change', '.rLimestonePopup :input[type="number"]',function(){
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(2);
	$(this).val(values);
});

//on Enter press next input 
$(document).on('keypress', '.rLimestonePopup input,.rLimestonePopup select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
