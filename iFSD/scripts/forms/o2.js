$('body').on('click', '.O2', function(){
	var id=$(this).attr('id');
	inputErrorRemove('o2Popup');
	$('.popUpTabError').text('');
	$('.o2Popup').removeClass('dispNone');
	$('.o2Popup').show();
	$('.o2Popup .body ul.nav li').removeClass('active');
	$('.o2Popup .body ul.nav li:eq(0)').addClass('active');
	$('.o2Popup .body .Input').removeClass('dispNone');
	$('.o2Popup .body .Output').addClass('dispNone');
	$('.o2Popup .body .Note').addClass('dispNone');
	$('.o2Popup .body .Calculation').addClass('dispNone');
	//$('.o2Popup div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.o2Popup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.o2Popup div .popTitle').text(gateTitle);
	$('.o2Popup').attr("myId", id);
	if(localStorage.getItem(id) !== null){
		getSavedData_O2 = JSON.parse(localStorage.getItem(''+id+''));
		//console.log("id" + JSON.stringify(getStoredData));
		$(".o2Popup input[name=flowRate]").val(getSavedData_O2.flowRate);
		$(".o2Popup input[name=diameter]").val(getSavedData_O2.diameter);
		$(".o2Popup input[name=inletO2]").val(getSavedData_O2.inletO2);
		$(".o2Popup input[name=inletN2]").val(getSavedData_O2.inletN2);
		$(".o2Popup input[name=inletCO2]").val(getSavedData_O2.inletCO2);
		$(".o2Popup input[name=outletO2Stage2]").val(getSavedData_O2.outletO2Stage2);
		$(".o2Popup input[name=temperature]").val(getSavedData_O2.temperature);		
		/* $(".o2Popup input[name=density]").val(getSavedData_O2.density);
		$(".o2Popup input[name=viscosity]").val(getSavedData_O2.viscosity);
		$(".o2Popup input[name=diffCoefO2]").val(getSavedData_O2.diffCoefO2);
		$(".o2Popup input[name=diffCoefN2]").val(getSavedData_O2.diffCoefN2);
		$(".o2Popup input[name=hO2]").val(getSavedData_O2.hO2);
		$(".o2Popup input[name=hN2]").val(getSavedData_O2.hN2);
		$(".o2Popup input[name=pH2O]").val(getSavedData_O2.pH2O); */
		$(".o2Popup input[name=towerPackingDepth]").val(getSavedData_O2.towerPackingDepth);
		$(".o2Popup input[name=inletToPackingHeight]").val(getSavedData_O2.inletToPackingHeight);
		$(".o2Popup input[name=inletToUpperHeadTL]").val(getSavedData_O2.inletToUpperHeadTL);
		$(".o2Popup input[name=towerPackingDepth2]").val(getSavedData_O2.towerPackingDepth2);
		$(".o2Popup input[name=loopSealHeight]").val(getSavedData_O2.loopSealHeight);
		$(".o2Popup input[name=clearwellRetentionTime]").val(getSavedData_O2.clearwellRetentionTime);
		$(".o2Popup input[name=clearwellStraightSideHeight]").val(getSavedData_O2.clearwellStraightSideHeight);
		$(".o2Popup input[name=pumpOutletDiameter]").val(getSavedData_O2.pumpOutletDiameter);
		$(".o2Popup input[name=low_LowLevelalarm]").val(getSavedData_O2.low_LowLevelalarm);
		$(".o2Popup input[name=lowLevelalarm]").val(getSavedData_O2.lowLevelalarm);
		$(".o2Popup input[name=highLevelalarm]").val(getSavedData_O2.highLevelalarm);
		$(".o2Popup input[name=inletDiameter]").val(getSavedData_O2.inletDiameter);
		$(".o2Popup input[name=overflow]").val(getSavedData_O2.overflow);
		$(".o2Popup input[name=skirtStraightSideHeight]").val(getSavedData_O2.skirtStraightSideHeight);
	}else{
		$(".o2Popup input[name=flowRate]").val('');
		$(".o2Popup input[name=diameter]").val('');
		$(".o2Popup input[name=inletO2]").val('');
		$(".o2Popup input[name=inletN2]").val('');
		$(".o2Popup input[name=inletCO2]").val('');
		$(".o2Popup input[name=outletO2Stage2]").val('');
		$(".o2Popup input[name=temperature]").val('');		
		/* $(".o2Popup input[name=density]").val('');
		$(".o2Popup input[name=viscosity]").val('');
		$(".o2Popup input[name=diffCoefO2]").val('');
		$(".o2Popup input[name=diffCoefN2]").val('');
		$(".o2Popup input[name=hO2]").val('');
		$(".o2Popup input[name=hN2]").val('');
		$(".o2Popup input[name=pH2O]").val(''); */
		$(".o2Popup input[name=towerPackingDepth]").val('');
		$(".o2Popup input[name=inletToPackingHeight]").val('');
		$(".o2Popup input[name=inletToUpperHeadTL]").val('');
		$(".o2Popup input[name=towerPackingDepth2]").val('');
		$(".o2Popup input[name=loopSealHeight]").val('');
		$(".o2Popup input[name=clearwellRetentionTime]").val('');
		$(".o2Popup input[name=clearwellStraightSideHeight]").val('');
		$(".o2Popup input[name=pumpOutletDiameter]").val('');
		$(".o2Popup input[name=low_LowLevelalarm]").val('');
		$(".o2Popup input[name=lowLevelalarm]").val('');
		$(".o2Popup input[name=highLevelalarm]").val('');
		$(".o2Popup input[name=inletDiameter]").val('');
		$(".o2Popup input[name=overflow]").val('');
		$(".o2Popup input[name=skirtStraightSideHeight]").val('');
	}
	//Unit type Set
	var table = $("table.inputUnit tbody");
	table.find('tr').each(function (i) {
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
	//Output Unit Set
	var table = $("table.outputUnit tbody");
	table.find('tr').each(function (i) {
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
	$('.o2Popup .twoDecimalOut').each(function() {
		var thisVal = $(this).text();
		var values = parseFloat(thisVal).toFixed(2);
		if(thisVal)
		$(this).text(values);
	});
});

$('body').on('click','.o2Popup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	$(".o2Popup input[name=flowRate]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=diameter]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=inletO2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=inletN2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=inletCO2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=outletO2Stage2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=temperature]").css('border','1px solid #e1e2e5');
	/* $(".o2Popup input[name=density]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=viscosity]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=diffCoefO2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=diffCoefN2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=hO2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=hN2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=pH2O]").css('border','1px solid #e1e2e5'); */
	$(".o2Popup input[name=towerPackingDepth]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=inletToPackingHeight]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=inletToUpperHeadTL]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=towerPackingDepth2]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=loopSealHeight]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=clearwellRetentionTime]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=clearwellStraightSideHeight]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=pumpOutletDiameter]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=low_LowLevelalarm]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=lowLevelalarm]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=highLevelalarm]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=inletDiameter]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=overflow]").css('border','1px solid #e1e2e5');
	$(".o2Popup input[name=skirtStraightSideHeight]").css('border','1px solid #e1e2e5');
	
	if($(".o2Popup input[name=flowRate]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=flowRate]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=diameter]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=diameter]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=inletO2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=inletO2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=inletN2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=inletN2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=inletCO2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=inletCO2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=outletO2Stage2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=outletO2Stage2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=temperature]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=temperature]").css('border','1px solid red');
	}
	/* if($(".o2Popup input[name=density]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=density]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=viscosity]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=viscosity]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=diffCoefO2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=diffCoefO2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=diffCoefN2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=diffCoefN2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=hO2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=hO2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=hN2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=hN2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=pH2O]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=pH2O]").css('border','1px solid red');
	} */
	if($(".o2Popup input[name=towerPackingDepth]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=towerPackingDepth]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=inletToPackingHeight]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=inletToPackingHeight]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=inletToUpperHeadTL]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=inletToUpperHeadTL]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=towerPackingDepth2]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=towerPackingDepth2]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=loopSealHeight]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=loopSealHeight]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=clearwellRetentionTime]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=clearwellRetentionTime]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=clearwellStraightSideHeight]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=clearwellStraightSideHeight]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=pumpOutletDiameter]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=pumpOutletDiameter]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=low_LowLevelalarm]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=low_LowLevelalarm]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=lowLevelalarm]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=lowLevelalarm]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=highLevelalarm]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=highLevelalarm]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=inletDiameter]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=inletDiameter]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=overflow]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=overflow]").css('border','1px solid red');
	}
	if($(".o2Popup input[name=skirtStraightSideHeight]").val() == ""){	
		validFlag = 1;
		$(".o2Popup input[name=skirtStraightSideHeight]").css('border','1px solid red');
	}
	//if(validFlag ==0){
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};
		inputData.flowRate = $(".o2Popup input[name=flowRate]").val();
		inputData.diameter = $(".o2Popup input[name=diameter]").val();
		inputData.inletO2 = $(".o2Popup input[name=inletO2]").val();
		inputData.inletN2 = $(".o2Popup input[name=inletN2]").val();
		inputData.inletCO2 = $(".o2Popup input[name=inletCO2]").val();
		inputData.outletO2Stage2 = $(".o2Popup input[name=outletO2Stage2]").val();
		inputData.temperature = $(".o2Popup input[name=temperature]").val();		
		/* inputData.density = $(".o2Popup input[name=density]").val();
		inputData.viscosity = $(".o2Popup input[name=viscosity]").val();
		inputData.diffCoefO2 = $(".o2Popup input[name=diffCoefO2]").val();
		inputData.diffCoefN2 = $(".o2Popup input[name=diffCoefN2]").val();
		inputData.hO2 = $(".o2Popup input[name=hO2]").val();
		inputData.hN2 = $(".o2Popup input[name=hN2]").val();
		inputData.pH2O = $(".o2Popup input[name=pH2O]").val(); */
		inputData.towerPackingDepth = $(".o2Popup input[name=towerPackingDepth]").val();
		inputData.inletToPackingHeight = $(".o2Popup input[name=inletToPackingHeight]").val();
		inputData.inletToUpperHeadTL = $(".o2Popup input[name=inletToUpperHeadTL]").val();
		inputData.towerPackingDepth2 = $(".o2Popup input[name=towerPackingDepth2]").val();
		inputData.loopSealHeight = $(".o2Popup input[name=loopSealHeight]").val();
		inputData.clearwellRetentionTime = $(".o2Popup input[name=clearwellRetentionTime]").val();
		inputData.clearwellStraightSideHeight = $(".o2Popup input[name=clearwellStraightSideHeight]").val();
		inputData.pumpOutletDiameter = $(".o2Popup input[name=pumpOutletDiameter]").val();
		inputData.low_LowLevelalarm = $(".o2Popup input[name=low_LowLevelalarm]").val();
		inputData.lowLevelalarm = $(".o2Popup input[name=lowLevelalarm]").val();
		inputData.highLevelalarm = $(".o2Popup input[name=highLevelalarm]").val();
		inputData.inletDiameter = $(".o2Popup input[name=inletDiameter]").val();
		inputData.overflow = $(".o2Popup input[name=overflow]").val();
		inputData.skirtStraightSideHeight = $(".o2Popup input[name=skirtStraightSideHeight]").val();		
		localStorage.setItem(popUpId,  JSON.stringify(inputData));
		if(o2FormArrya.indexOf(popUpId) === -1) {
			o2FormArrya.push(popUpId);			
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

$(document).on('change', '.o2Popup .twoDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(2);
	$(this).val(values);
});

//on Enter press next input 
$(document).on('keypress', '.o2Popup input,.o2Popup select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
