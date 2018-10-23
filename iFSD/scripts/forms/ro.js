//EDI
var unitConverionDoneEdi=false;
$('body').on('click', '.RO', function () {
    var id = $(this).attr('id');
	inputErrorRemove('roPopUp');
    $('.roPopUp').removeClass('dispNone');
    $('.roPopUp').show();
	$('.roPopUp .body ul.nav li').removeClass('active');
	$('.roPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.roPopUp .Input').removeClass('dispNone');
	$('.roPopUp .Output').addClass('dispNone');
	$('.roPopUp .Note').addClass('dispNone');
	$('.roPopUp .Documentation').addClass('dispNone');
    //$('.roPopUp div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.roPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.roPopUp div .popTitle').text(gateTitle);
    $('.roPopUp').attr("myId", id);
    var table = $("table.inputTable tbody");
    $('.roPopUp #elemType').trigger('change');
	$('.popUpTabError').text('');
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


    if (localStorage.getItem(id) !== null) {
        getSavedData_ro = JSON.parse(localStorage.getItem('' + id + ''));
        //console.log("id" + JSON.stringify(getStoredData));roFlux
        $(".roPopUp input[name=roFeedFlowRate]").val(getSavedData_ro.roFeedFlowRate);
        $(".roPopUp input[name=roRecovery]").val(getSavedData_ro.roRecovery);
        $(".roPopUp input[name=roRejection]").val(getSavedData_ro.roRejection);
        $(".roPopUp input[name=roFlux]").val(getSavedData_ro.roFlux);
        $(".roPopUp input[name=roFeedFlowRate]").val(getSavedData_ro.roFeedFlowRate);
        $(".roPopUp input[name=roRecovery]").val(getSavedData_ro.roRecovery);
        $(".roPopUp input[name=roRejection]").val(getSavedData_ro.roRejection);
        //$(".roPopUp input[name=roFlux]").val(getSavedData_ro.roFlux);
        $(".roPopUp input[name=roFluxChange]").val(getSavedData_ro.roFluxChange);
        $(".roPopUp input[name=roElemAge]").val(getSavedData_ro.roElemAge);
        $(".roPopUp input[name=saltPassage]").val(getSavedData_ro.saltPassage);
        $(".roPopUp input[name=pumpEfficiency]").val(getSavedData_ro.pumpEfficiency);
        $(".roPopUp input[name=roPressure]").val(getSavedData_ro.roPressure);
        $(".roPopUp input[name=rocaid]").val(getSavedData_ro.rocaid);
        $(".roPopUp input[name=romgid]").val(getSavedData_ro.romgid);
        $(".roPopUp input[name=ronaid]").val(getSavedData_ro.ronaid);
        $(".roPopUp input[name=ronaid]").val(getSavedData_ro.ronaid);
        $(".roPopUp input[name=rokid]").val(getSavedData_ro.rokid);
        $(".roPopUp input[name=ronhid]").val(getSavedData_ro.ronhid);
        $(".roPopUp input[name=robaid]").val(getSavedData_ro.robaid);
        $(".roPopUp input[name=rosrId]").val(getSavedData_ro.rosrId);
        $(".roPopUp input[name=roFeId]").val(getSavedData_ro.roFeId);
        $(".roPopUp input[name=roMnId]").val(getSavedData_ro.roMnId);
        $(".roPopUp input[name=rosoId]").val(getSavedData_ro.rosoId);
        $(".roPopUp input[name=roclId]").val(getSavedData_ro.roclId);
        $(".roPopUp input[name=rofId]").val(getSavedData_ro.rofId);
        $(".roPopUp input[name=ronoId]").val(getSavedData_ro.ronoId);
        $(".roPopUp input[name=roBrId]").val(getSavedData_ro.roBrId);
        $(".roPopUp input[name=roPoId]").val(getSavedData_ro.roPoId);
        $(".roPopUp input[name=roBId]").val(getSavedData_ro.roBId);
		$(".roPopUp input[name=roSilicaId]").val(getSavedData_ro.roSilicaId);
		
        $(".roPopUp input[name=rohsid]").val(getSavedData_ro.rohsid);
        $(".roPopUp input[name=rohcoId]").val(getSavedData_ro.rohcoId);
        $(".roPopUp input[name=rohcotId]").val(getSavedData_ro.rohcotId);
        $(".roPopUp input[name=rohcothId]").val(getSavedData_ro.rohcothId);
        $(".roPopUp select[name=elementType]").val(getSavedData_ro.elementType);
        $(".roPopUp select[name=roElementsPerVessel]").val(getSavedData_ro.roElementsPerVessel);
        $(".roPopUp textarea[name=ro_Note]").val(getSavedData_ro.ro_Note);
        $(".roPopUp input[name=roElemArea]").val(getSavedData_ro.roElemArea);
    }else{
		$(".roPopUp input[name=roRecovery]").val('');
		$(".roPopUp select[name=elementType]").val('Select');
        $(".roPopUp select[name=roElementsPerVessel]").val(6);
		$(".roPopUp input[name=roFlux]").val(0.008333);
		$(".roPopUp input[name=roElemArea]").val(37.158784);
		$(".roPopUp input[name=roElemAge]").val(1);
		$(".roPopUp input[name=roFluxChange]").val(5);		
		$(".roPopUp input[name=saltPassage]").val(7);
		$(".roPopUp input[name=pumpEfficiency]").val(84);
		//
		$(".roPopUp input[name=rocaid]").val(99);
        $(".roPopUp input[name=romgid]").val(99.1);
        $(".roPopUp input[name=ronaid]").val(98.8);
        $(".roPopUp input[name=rokid]").val(98.2);
        $(".roPopUp input[name=ronhid]").val(81);
        $(".roPopUp input[name=robaid]").val(99);
        $(".roPopUp input[name=rosrId]").val(99);
        $(".roPopUp input[name=roFeId]").val(99);
        $(".roPopUp input[name=roMnId]").val(0);
        $(".roPopUp input[name=rosoId]").val(99);
        $(".roPopUp input[name=roclId]").val(98.9);
        $(".roPopUp input[name=rofId]").val(99.8);
        $(".roPopUp input[name=ronoId]").val(93);
        $(".roPopUp input[name=roBrId]").val(98.8);
        $(".roPopUp input[name=roPoId]").val(99);
        $(".roPopUp input[name=roBId]").val(50);
        $(".roPopUp input[name=roSilicaId]").val(98);
        $(".roPopUp input[name=rohsid]").val(1);
        $(".roPopUp input[name=rohcoId]").val(98.4);
        $(".roPopUp input[name=rohcotId]").val(2);
        $(".roPopUp input[name=rohcothId]").val(99.9);
		var table = $(".roPopUp table.inputTable tbody");
		//if(unitConverionDone==false){
			table.find('tr').each(function (i) {
				var $tds = $(this).find('td'),
				getUnitType = $tds.eq(0).attr('unitType');
				if ($tds.eq(1).find('input').val() != '' && $tds.eq(1).find('input').val() != undefined) {
					var value2 = $tds.eq(2).text();
					var value1 = $tds.eq(1).find('input').val();
					//console.log(value2+'Unit');
					if (value2 != '' && value2 != undefined && value1 != '' && value1 != undefined && getUnitType != '-' && getUnitType != '' && getUnitType != undefined) {
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
					var unitConvertionValue = Number(m) * Number(value1) + c;
					var fixedVal = Number(unitConvertionValue);
					$tds.eq(1).find('input').val(fixedVal);

					}
				}
			});
			//unitConverionDone	=	true;
		//}
	}
});

$('body').on('click', '.roPopUp .updateBtn', function (e) {
    var popUpId = $(this).parent().parent().parent().attr('myid');
	
    var inputData = {};
    var validFlag = 0;
    $(".roPopUp input[name=roFeedFlowRate]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roRecovery]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roRejection]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roFlux]").css('border', '1px solid #e1e2e5');

    $(".roPopUp input[name=roFluxChange]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roElemAge]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=saltPassage]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=pumpEfficiency]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roPressure]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rocaid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=romgid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=ronaid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=ronaid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rokid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=ronhid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=robaid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rosrId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roFeId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roMnId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rosoId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roclId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rofId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=ronoId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roBrId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roPoId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roBId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roSilicaId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rohsid]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rohcoId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rohcotId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=rohcothId]").css('border', '1px solid #e1e2e5');
    $(".roPopUp input[name=roElemArea]").css('border', '1px solid #e1e2e5');
	$("#elemType").css('border', '1px solid #e1e2e5');
	
	/*COnvert To standard Units before comparison*/
	//UnitConversion
	var table = $(".roPopUp table.inputTable tbody");
	table.find('tr').each(function (i) {
		var $tds = $(this).find('td'),
		getUnitType = $tds.eq(0).attr('unitType');

		if ($tds.eq(1).find('input').val() != '' && $tds.eq(1).find('input').val() != undefined) {
			var value2 = $tds.eq(2).text();
			var value1 = $tds.eq(1).find('input').val();
			if (value2 != '' && value2 != undefined && value1 != '' && value1 != undefined && getUnitType != '-' && getUnitType != '' && getUnitType != undefined) {
				var m;
				try {
					m = unitinputjson[value2][0];
				} catch (e) {

				}
				var c;
				try {
					c = unitinputjson[value2][1];
				} catch (e) {

				}
				var unitConvertionValue = Number(m) * Number(value1) + c;
				var fixedVal = Number(unitConvertionValue);
				$tds.eq(1).find('input').attr('uCVal', fixedVal);
			}
		}
	});

    if ($(".roPopUp input[name=roFeedFlowRate]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roFeedFlowRate]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roRecovery]").val() == "" || ($(".roPopUp input[name=roRecovery]").val()<0 || $(".roPopUp input[name=roRecovery]").val()>100)) {
        validFlag = 1;
        $(".roPopUp input[name=roRecovery]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roRejection]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roRejection]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roFlux]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roFlux]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roFluxChange]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roFluxChange]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roElemAge]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roElemAge]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=saltPassage]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=saltPassage]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=pumpEfficiency]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=pumpEfficiency]").css('border', '1px solid red');
    }
	if ($(".roPopUp input[name=pumpEfficiency]").val() < 0 || $(".roPopUp input[name=pumpEfficiency]").val() > 100) {
        validFlag = 1;
        $(".roPopUp input[name=pumpEfficiency]").css('border', '1px solid red');
    }
	
    if ($(".roPopUp input[name=roPressure]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roPressure]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rocaid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rocaid]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=romgid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=romgid]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=ronaid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=ronaid]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rokid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rokid]").css('border', '1px solid red');
    }
	if ($(".roPopUp input[name=ronhid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=ronhid]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=robaid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=robaid]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rosrId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rosrId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roFeId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roFeId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roMnId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roMnId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rosoId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rosoId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roclId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roclId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rofId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rofId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rofId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rofId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=ronoId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=ronoId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=ronoId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=ronoId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roBrId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roBrId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roPoId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roPoId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=roBId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roBId]").css('border', '1px solid red');
    }	
	if ($(".roPopUp input[name=roSilicaId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roSilicaId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rohsid]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rohsid]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rohcoId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rohcoId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rohcotId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rohcotId]").css('border', '1px solid red');
    }
    if ($(".roPopUp input[name=rohcothId]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=rohcothId]").css('border', '1px solid red');
    }
	if ($(".roPopUp input[name=roElemArea]").val() == "") {
        validFlag = 1;
        $(".roPopUp input[name=roElemArea]").css('border', '1px solid red');
    }
	if ($("#elemType").val() == 'Select') {
        validFlag = 1;
        $("#elemType").css('border', '1px solid red');
    }
    if ($(".roPopUp #elemType").val() == 'BWRO' && (Number($(".roPopUp input[name=roFlux]").attr('uCVal')) <0.00556 || Number($(".roPopUp input[name=roFlux]").attr('uCVal')) > 0.014583)) {
        validFlag = 1;
        $(".roPopUp input[name=roFlux]").css('border', '1px solid red');
    }	
	if ($(".roPopUp #elemType").val() == 'NF' && ($(".roPopUp input[name=roFlux]").attr('uCVal') < 0.000694 || $(".roPopUp input[name=roFlux]").attr('uCVal') > 0.017361)){
        validFlag = 1;
        $(".roPopUp input[name=roFlux]").css('border', '1px solid red');
    }
	if ($(".roPopUp #elemType").val() == 'SWRO' && ($(".roPopUp input[name=roFlux]").attr('uCVal') < 0.005556 || $(".roPopUp input[name=roFlux]").attr('uCVal') > 0.017361)){
        validFlag = 1;
        $(".roPopUp input[name=roFlux]").css('border', '1px solid red');
    }
	


    //if (validFlag == 0) {
        inputData.roFeedFlowRate = $(".roPopUp input[name=roFeedFlowRate]").val();
        inputData.roRecovery = $(".roPopUp input[name=roRecovery]").val();
        inputData.roRejection = $(".roPopUp input[name=roRejection]").val();
        inputData.roFlux = $(".roPopUp input[name=roFlux]").val();
        inputData.roFluxChange = $(".roPopUp input[name=roFluxChange]").val();
        inputData.roElemAge = $(".roPopUp input[name=roElemAge]").val();
        inputData.saltPassage = $(".roPopUp input[name=saltPassage]").val();
        inputData.pumpEfficiency = $(".roPopUp input[name=pumpEfficiency]").val();
        inputData.roPressure = $(".roPopUp input[name=roPressure]").val();
        inputData.rocaid = $(".roPopUp input[name=rocaid]").val();
        inputData.romgid = $(".roPopUp input[name=romgid]").val();
        inputData.ronaid = $(".roPopUp input[name=ronaid]").val();
        inputData.rokid = $(".roPopUp input[name=rokid]").val();
        inputData.ronhid = $(".roPopUp input[name=ronhid]").val();
        inputData.robaid = $(".roPopUp input[name=robaid]").val();
        inputData.rosrId = $(".roPopUp input[name=rosrId]").val();
        inputData.roFeId = $(".roPopUp input[name=roFeId]").val();
        inputData.roMnId = $(".roPopUp input[name=roMnId]").val();
        inputData.rosoId = $(".roPopUp input[name=rosoId]").val();
        inputData.roclId = $(".roPopUp input[name=roclId]").val();
        inputData.rofId = $(".roPopUp input[name=rofId]").val();
        inputData.ronoId = $(".roPopUp input[name=ronoId]").val();
        inputData.roBrId = $(".roPopUp input[name=roBrId]").val();
        inputData.roPoId = $(".roPopUp input[name=roPoId]").val();
        inputData.roBId = $(".roPopUp input[name=roBId]").val();
		inputData.roSilicaId = $(".roPopUp input[name=roSilicaId]").val();
        inputData.rohsid = $(".roPopUp input[name=rohsid]").val();
		
        inputData.rohcoId = $(".roPopUp input[name=rohcoId]").val();
        inputData.rohcotId = $(".roPopUp input[name=rohcotId]").val();
        inputData.rohcothId = $(".roPopUp input[name=rohcothId]").val();
        inputData.elementType = $(".roPopUp select[name=elementType]").val();
        inputData.roElementsPerVessel = $(".roPopUp select[name=roElementsPerVessel]").val();
        inputData.ro_Note = $(".roPopUp textarea[name=ro_Note]").val();
        inputData.roElemArea = $(".roPopUp input[name=roElemArea]").val();
		
        localStorage.setItem(popUpId, JSON.stringify(inputData));
		console.log(popUpId+' Pop up Id');
		if(rofFormArray.indexOf(popUpId) === -1) {
            rofFormArray.push(popUpId);            
		}
		if(validFlag==0){
			$('#'+popUpId).addClass('restClass');
			$('#'+popUpId).removeClass('testClass');
		}
		else{
			$('#'+popUpId).removeClass('restClass');
			$('#'+popUpId).addClass('testClass');
		}
   // }
   /*
    else {
        $('.popUpTabError').text('');
        $('.popUpTabError').text('Please enter all highlighted input from all tab.');
        e.stopImmediatePropagation();
    }
    */
});

$('body').on('change', '.roPopUp #elemType', function () {
    if (this.value == 'BWRO') {
        $(".roPopUp input[name=rocaid]").val(99);
        $(".roPopUp input[name=romgid]").val(99.1);
        $(".roPopUp input[name=ronaid]").val(98.8);
        $(".roPopUp input[name=rokid]").val(98.2);
        $(".roPopUp input[name=ronhid]").val(81);
        $(".roPopUp input[name=robaid]").val(99);
        $(".roPopUp input[name=rosrId]").val(99);
        $(".roPopUp input[name=roFeId]").val(99);
        $(".roPopUp input[name=roMnId]").val(0);
        $(".roPopUp input[name=rosoId]").val(99);
        $(".roPopUp input[name=roclId]").val(98.9);
        $(".roPopUp input[name=rofId]").val(99.8);
        $(".roPopUp input[name=ronoId]").val(93);
        $(".roPopUp input[name=roBrId]").val(98.8);
        $(".roPopUp input[name=roPoId]").val(99);
        $(".roPopUp input[name=roBId]").val(50);
        $(".roPopUp input[name=roSilicaId]").val(98);
        $(".roPopUp input[name=rohsid]").val(1);
        $(".roPopUp input[name=rohcoId]").val(98.4);
        $(".roPopUp input[name=rohcotId]").val(2);
        $(".roPopUp input[name=rohcothId]").val(99.9);
        $(".roPopUp input[name=roFlux]").val(0.008333);
        $(".roPopUp input[name=roElemArea]").val(37.158784 );
    }
    if (this.value == 'NF') {
        $(".roPopUp input[name=rocaid]").val(45.58082);
        $(".roPopUp input[name=romgid]").val(94.6924);
        $(".roPopUp input[name=ronaid]").val(26.38243);
        $(".roPopUp input[name=rokid]").val(28.94245);
        $(".roPopUp input[name=ronhid]").val(25.2849);
        $(".roPopUp input[name=robaid]").val(43.34207);
        $(".roPopUp input[name=rosrId]").val(43.01514);
        $(".roPopUp input[name=roFeId]").val(42.70056);
        $(".roPopUp input[name=roMnId]").val(42.7557);
        $(".roPopUp input[name=rosoId]").val(94.7234);
        $(".roPopUp input[name=roclId]").val(38.77688);
        $(".roPopUp input[name=rofId]").val(26.0427);
        $(".roPopUp input[name=ronoId]").val(25.54137);
        $(".roPopUp input[name=roBrId]").val(26.06936);
        $(".roPopUp input[name=roPoId]").val(51.4181);
        $(".roPopUp input[name=roBId]").val(25.01553);
        $(".roPopUp input[name=roSilicaId]").val(25.03466);
        $(".roPopUp input[name=rohsid]").val(25.01106);
        $(".roPopUp input[name=rohcoId]").val(29.17987);
        $(".roPopUp input[name=rohcotId]").val(23.40419);
        $(".roPopUp input[name=rohcothId]").val(37.33604);
        $(".roPopUp input[name=roFlux]").val(0.010417);
        $(".roPopUp input[name=roElemArea]").val( 36.231);
    }
    if (this.value == 'SWRO') {
        $(".roPopUp input[name=rocaid]").val(99.88);
        $(".roPopUp input[name=romgid]").val(99.91);
        $(".roPopUp input[name=ronaid]").val(99.5);
        $(".roPopUp input[name=rokid]").val(99.26);
        $(".roPopUp input[name=ronhid]").val(85);
        $(".roPopUp input[name=robaid]").val(99.88);
        $(".roPopUp input[name=rosrId]").val(99.88);
        $(".roPopUp input[name=roFeId]").val(99.88);
        $(".roPopUp input[name=roMnId]").val(0);
        $(".roPopUp input[name=rosoId]").val(99.94);
        $(".roPopUp input[name=roclId]").val(99.55);
        $(".roPopUp input[name=rofId]").val(99.9);
        $(".roPopUp input[name=ronoId]").val(94);
        $(".roPopUp input[name=roBrId]").val(99.5);
        $(".roPopUp input[name=roPoId]").val(99.6);
        $(".roPopUp input[name=roBId]").val(55);
        $(".roPopUp input[name=roSilicaId]").val(98.8);
        $(".roPopUp input[name=rohsid]").val(1);
        $(".roPopUp input[name=rohcoId]").val(98.5);
        $(".roPopUp input[name=rohcotId]").val(2);
        $(".roPopUp input[name=rohcothId]").val(99.93);
        $(".roPopUp input[name=roFlux]").val(0.008333);
        $(".roPopUp input[name=roElemArea]").val(37.158784);
    }
});

$(document).on('change', '.roPopUp input', function () {
	var num = this.value.match(/^\d+$/);
    if (num === null) {
	// If we have no match, value will be empty.
	this.value = "";
	}
});

//on Enter press next input 
$(document).on('keypress', '.roPopUp input,.roPopUp select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
