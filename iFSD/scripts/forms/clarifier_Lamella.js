$('body').on('click', '.Lamella', function(){
	var id=$(this).attr('id');
	$('.cLamellaPopup').removeClass('dispNone');
	$('.cLamellaPopup').show();
	$('.popUpTabError').text('');
	$('.cLamellaPopup .body ul.nav li').removeClass('active');
	$('.cLamellaPopup .body ul.nav li:eq(0)').addClass('active');
	$('.cLamellaPopup .body .Input').removeClass('dispNone');
	$('.cLamellaPopup .body .Output').addClass('dispNone');
	$('.cLamellaPopup .body .Note').addClass('dispNone');
	$('.cLamellaPopup .body .Calculation').addClass('dispNone');
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.cLamellaPopup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.cLamellaPopup div .popTitle').text(gateTitle);
	$('.cLamellaPopup').attr("myId", id);
	$("#chemicalSelection").val('');
	$("#chemicalSelection").val($("#chemicalSelection option:first").val());
	if(localStorage.getItem(id) !== null){
		getSavedData_cLamella = JSON.parse(localStorage.getItem(''+id+''));
		//chemicalSelection
//$(".cLamellaPopup input[name=clarifierProductFlowRate]").val(getSavedData_cLamella.clarifierProductFlowRate);
		$(".cLamellaPopup input[name=clarifierSludgeBlowdown]").val(getSavedData_cLamella.clarifierSludgeBlowdown);
		//$(".cLamellaPopup input[name=feedTSS]").val(getSavedData_cLamella.feedTSS);
		//$(".cLamellaPopup input[name=colorCUEstimatedvalue]").val(getSavedData_cLamella.colorCUEstimatedvalue);
		$("#chemicalSelection").val(getSavedData_cLamella.chemicalSelection);
		$(".cLamellaPopup input[name=kgDrysludge]").val(getSavedData_cLamella.kgDrysludge);
		$(".cLamellaPopup input[name=ofSludgeasfixedsoils]").val(getSavedData_cLamella.ofSludgeasfixedsoils);
		$(".cLamellaPopup input[name=fixedSoilSpecificGravity]").val(getSavedData_cLamella.fixedSoilSpecificGravity);
		$(".cLamellaPopup input[name=volatileSoilSpecificGravity]").val(getSavedData_cLamella.fixedSoilSpecificGravity);
		$(".cLamellaPopup input[name=clarifierDiameter]").val(getSavedData_cLamella.fixedSoilSpecificGravity);
		$(".cLamellaPopup input[name=clarifierActiveDepth]").val(getSavedData_cLamella.clarifierActiveDepth);
		$(".cLamellaPopup input[name=clarifierFlocculationZoneArea]").val(getSavedData_cLamella.clarifierFlocculationZoneArea);
		$('.selectedChemical').text(getSavedData_cLamella.chemicalSelection);
	}else{
		//$(".cLamellaPopup input[name=clarifierProductFlowRate]").val('');
		$(".cLamellaPopup input[name=clarifierSludgeBlowdown]").val('');
		//$(".cLamellaPopup input[name=feedTSS]").val('');
		//$(".cLamellaPopup input[name=colorCUEstimatedvalue]").val('');
		$("#chemicalSelection").val();
		$(".cLamellaPopup input[name=kgDrysludge]").val('');
		$(".cLamellaPopup input[name=ofSludgeasfixedsoils]").val('');
		$(".cLamellaPopup input[name=fixedSoilSpecificGravity]").val('');
		$(".cLamellaPopup input[name=volatileSoilSpecificGravity]").val('');
		$(".cLamellaPopup input[name=clarifierDiameter]").val('');
		$(".cLamellaPopup input[name=clarifierActiveDepth]").val('');
		$(".cLamellaPopup input[name=clarifierFlocculationZoneArea]").val('');
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
	$('.cLamellaPopup .twoDecimalOut').each(function() {
		var thisVal = $(this).text();
		var values = parseFloat(thisVal).toFixed(2);
		if(thisVal)
		$(this).text(values);
	});
});

$('body').on('click','.cLamellaPopup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	$(".cLamellaPopup input[name=clarifierProductFlowRate]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=clarifierSludgeBlowdown]").css('border','1px solid #e1e2e5');
	//$(".cLamellaPopup input[name=feedTSS]").css('border','1px solid #e1e2e5');
	//$(".cLamellaPopup input[name=colorCUEstimatedvalue]").css('border','1px solid #e1e2e5');
	$("#chemicalSelection").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=kgDrysludge]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=ofSludgeasfixedsoils]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=fixedSoilSpecificGravity]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=volatileSoilSpecificGravity]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=clarifierDiameter]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=clarifierActiveDepth]").css('border','1px solid #e1e2e5');
	$(".cLamellaPopup input[name=clarifierFlocculationZoneArea]").css('border','1px solid #e1e2e5');
	
	/* if($(".cLamellaPopup input[name=clarifierProductFlowRate]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=clarifierProductFlowRate]").css('border','1px solid red');
	} */
	if($(".cLamellaPopup input[name=clarifierSludgeBlowdown]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=clarifierSludgeBlowdown]").css('border','1px solid red');
	}
	/* if($(".cLamellaPopup input[name=feedTSS]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=feedTSS]").css('border','1px solid red');
	} 
	if($(".cLamellaPopup input[name=colorCUEstimatedvalue]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=colorCUEstimatedvalue]").css('border','1px solid red');
	}*/
	if($("#chemicalSelection").val() == ""){
		validFlag = 1;
		$("#chemicalSelection").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=kgDrysludge]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=kgDrysludge]").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=ofSludgeasfixedsoils]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=ofSludgeasfixedsoils]").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=fixedSoilSpecificGravity]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=fixedSoilSpecificGravity]").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=volatileSoilSpecificGravity]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=volatileSoilSpecificGravity]").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=clarifierDiameter]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=clarifierDiameter]").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=clarifierActiveDepth]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=clarifierActiveDepth]").css('border','1px solid red');
	}
	if($(".cLamellaPopup input[name=clarifierFlocculationZoneArea]").val() == ""){
		validFlag = 1;
		$(".cLamellaPopup input[name=clarifierFlocculationZoneArea]").css('border','1px solid red');
	}
	
	//if(validFlag == 0){
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};
		//inputData.clarifierProductFlowRate = $(".cLamellaPopup input[name=clarifierProductFlowRate]").val();
		inputData.clarifierSludgeBlowdown = $(".cLamellaPopup input[name=clarifierSludgeBlowdown]").val();
		//inputData.feedTSS = $(".cLamellaPopup input[name=feedTSS]").val();
		//inputData.colorCUEstimatedvalue = $(".cLamellaPopup input[name=colorCUEstimatedvalue]").val();
		inputData.chemicalSelection = $("#chemicalSelection").val();
		inputData.kgDrysludge = $(".cLamellaPopup input[name=kgDrysludge]").val();
		inputData.ofSludgeasfixedsoils = $(".cLamellaPopup input[name=ofSludgeasfixedsoils]").val();
		inputData.fixedSoilSpecificGravity = $(".cLamellaPopup input[name=fixedSoilSpecificGravity]").val();
		inputData.volatileSoilSpecificGravity = $(".cLamellaPopup input[name=volatileSoilSpecificGravity]").val();
		inputData.clarifierDiameter = $(".cLamellaPopup input[name=clarifierDiameter]").val();
		inputData.clarifierActiveDepth = $(".cLamellaPopup input[name=clarifierActiveDepth]").val();
		inputData.clarifierFlocculationZoneArea = $(".cLamellaPopup input[name=clarifierFlocculationZoneArea]").val();
		
		localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(lamellaFormArray.indexOf(popUpId) === -1) {
			lamellaFormArray.push(popUpId);			
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
$(document).on('change', '#chemicalSelection', function(){
	$('.selectedChemical').text($(this).val());
});
