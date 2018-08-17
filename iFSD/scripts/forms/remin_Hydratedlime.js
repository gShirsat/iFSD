$('body').on('click', '.Hydratedlime', function(){
	var id=$(this).attr('id');
	$('.popUpTabError').text('');
	$('.rHydratedlimePopup').removeClass('dispNone');
	$('.rHydratedlimePopup').show();
	$('.rHydratedlimePopup .body ul.nav li').removeClass('active');
	$('.rHydratedlimePopup .body ul.nav li:eq(0)').addClass('active');
	$('.rHydratedlimePopup .body .Input').removeClass('dispNone');
	$('.rHydratedlimePopup .body .Output').addClass('dispNone');
	$('.rHydratedlimePopup .body .Note').addClass('dispNone');
	$('.rHydratedlimePopup .body .Calculation').addClass('dispNone');
	//$('.rHydratedlimePopup div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.rHydratedlimePopup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.rHydratedlimePopup div .popTitle').text(gateTitle);
	$('.rHydratedlimePopup').attr("myId", id);
	if(localStorage.getItem(id) !== null){
		getSavedData_rHydratedlime = JSON.parse(localStorage.getItem(''+id+''));
		/* $(".rHydratedlimePopup input[name=flow]").val(getSavedData_rHydratedlime.flow);
		$(".rHydratedlimePopup input[name=temp]").val(getSavedData_rHydratedlime.temp);
		$(".rHydratedlimePopup input[name=na]").val(getSavedData_rHydratedlime.na);
		$(".rHydratedlimePopup input[name=k]").val(getSavedData_rHydratedlime.k);
		$(".rHydratedlimePopup input[name=ca]").val(getSavedData_rHydratedlime.ca);
		$(".rHydratedlimePopup input[name=mg]").val(getSavedData_rHydratedlime.mg);
		$(".rHydratedlimePopup input[name=hCO3]").val(getSavedData_rHydratedlime.hCO3);
		$(".rHydratedlimePopup input[name=cO3]").val(getSavedData_rHydratedlime.cO3);
		$(".rHydratedlimePopup input[name=c2]").val(getSavedData_rHydratedlime.c2);
		$(".rHydratedlimePopup input[name=cl]").val(getSavedData_rHydratedlime.cl);
		$(".rHydratedlimePopup input[name=sO4]").val(getSavedData_rHydratedlime.sO4);
		$(".rHydratedlimePopup input[name=b]").val(getSavedData_rHydratedlime.b); */
		$(".rHydratedlimePopup input[name=cO2]").val(getSavedData_rHydratedlime.cO2);
		$(".rHydratedlimePopup input[name=caOH2]").val(getSavedData_rHydratedlime.caOH2);
		$(".rHydratedlimePopup input[name=naOH]").val(getSavedData_rHydratedlime.naOH);
	}else{
		/* $(".rHydratedlimePopup input[name=flow]").val('');
		$(".rHydratedlimePopup input[name=temp]").val('');
		$(".rHydratedlimePopup input[name=na]").val('');
		$(".rHydratedlimePopup input[name=k]").val('');
		$(".rHydratedlimePopup input[name=ca]").val('');
		$(".rHydratedlimePopup input[name=mg]").val('');
		$(".rHydratedlimePopup input[name=hCO3]").val('');
		$(".rHydratedlimePopup input[name=cO3]").val('');
		$(".rHydratedlimePopup input[name=c2]").val('');
		$(".rHydratedlimePopup input[name=cl]").val('');
		$(".rHydratedlimePopup input[name=sO4]").val('');
		$(".rHydratedlimePopup input[name=b]").val(''); */
		$(".rHydratedlimePopup input[name=cO2]").val('');
		$(".rHydratedlimePopup input[name=caOH2]").val('');
		$(".rHydratedlimePopup input[name=naOH]").val('');
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
	$('.rHydratedlimePopup .twoDecimalOut').each(function() {
		var thisVal = $(this).text();
		var values = parseFloat(thisVal).toFixed(2);
		if(thisVal)
		$(this).text(values);
	});

});

$('body').on('click','.rHydratedlimePopup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	/* $(".rHydratedlimePopup input[name=flow]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=temp]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=na]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=k]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=ca]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=mg]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=hCO3]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=cO3]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=c2]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=cl]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=sO4]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=b]").css('border','1px solid #e1e2e5'); */
	$(".rHydratedlimePopup input[name=cO2]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=caOH2]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=naOH]").css('border','1px solid #e1e2e5');
	
	/* if($(".rHydratedlimePopup input[name=flow]").val() == ""){	
		validFlag = 1;
		$(".rHydratedlimePopup input[name=flow]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=temp]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=temp]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=na]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=na]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=k]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=k]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=ca]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=ca]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=ca]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=ca]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=mg]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=mg]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=hCO3]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=hCO3]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=cO3]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=cO3]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=c2]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=c2]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=cl]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=cl]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=sO4]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=sO4]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=b]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=b]").css('border','1px solid red');
	} */
	if($(".rHydratedlimePopup input[name=cO2]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=cO2]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=caOH2]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=caOH2]").css('border','1px solid red');
	}
	if($(".rHydratedlimePopup input[name=naOH]").val() == ""){
		validFlag = 1;
		$(".rHydratedlimePopup input[name=naOH]").css('border','1px solid red');
	}
	//if(validFlag ==0){
		var popUpId = $(this).parent().parent().attr('myId');	
		var inputData = {};
		/* inputData.flow = $(".rHydratedlimePopup input[name=flow]").val();
		inputData.temp = $(".rHydratedlimePopup input[name=temp]").val();
		inputData.na = $(".rHydratedlimePopup input[name=na]").val();
		inputData.k = $(".rHydratedlimePopup input[name=k]").val();
		inputData.ca = $(".rHydratedlimePopup input[name=ca]").val();
		inputData.mg = $(".rHydratedlimePopup input[name=mg]").val();
		inputData.hCO3 = $(".rHydratedlimePopup input[name=hCO3]").val();
		inputData.cO3 = $(".rHydratedlimePopup input[name=cO3]").val();
		inputData.c2 = $(".rHydratedlimePopup input[name=c2]").val();
		inputData.cl = $(".rHydratedlimePopup input[name=cl]").val();
		inputData.sO4 = $(".rHydratedlimePopup input[name=sO4]").val(); */
		inputData.b = $(".rHydratedlimePopup input[name=b]").val();
		inputData.cO2 = $(".rHydratedlimePopup input[name=cO2]").val();
		inputData.caOH2 = $(".rHydratedlimePopup input[name=caOH2]").val();
		inputData.naOH = $(".rHydratedlimePopup input[name=naOH]").val();		
		localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(hydratedlimeFormArray.indexOf(popUpId) === -1) {
			hydratedlimeFormArray.push(popUpId);			
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

$(document).on('change', '.rHydratedlimePopup .twoDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(2);
	$(this).val(values);
});
