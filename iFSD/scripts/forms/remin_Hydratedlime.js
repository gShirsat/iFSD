$('body').on('click', '.Hydratedlime', function(){
	var id=$(this).attr('id');
	inputErrorRemove('rHydratedlimePopup');
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

		$(".rHydratedlimePopup input[name=cO2]").val(getSavedData_rHydratedlime.cO2);
		$(".rHydratedlimePopup input[name=caOH2]").val(getSavedData_rHydratedlime.caOH2);
		$(".rHydratedlimePopup input[name=naOH]").val(getSavedData_rHydratedlime.naOH);
	}else{

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

	$(".rHydratedlimePopup input[name=cO2]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=caOH2]").css('border','1px solid #e1e2e5');
	$(".rHydratedlimePopup input[name=naOH]").css('border','1px solid #e1e2e5');
	

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

//on Enter press next input 
$(document).on('keypress', '.rHydratedlimePopup input,.rHydratedlimePopup select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
