//EDI
var unitConverionDoneEdi=false;
$('body').on('click', '.EDI', function () {
    var id = $(this).attr('id');
	inputErrorRemove('ediPopUp');
    $('.ediPopUp').removeClass('dispNone');
    $('.ediPopUp').show();
	$('.ediPopUp .body ul.nav li').removeClass('active');
	$('.ediPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.ediPopUp .Input').removeClass('dispNone');
	$('.ediPopUp .Output').addClass('dispNone');
	$('.ediPopUp .Note').addClass('dispNone');
	$('.ediPopUp .Documentation').addClass('dispNone');
    //$('.ediPopUp div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.ediPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.ediPopUp div .popTitle').text(gateTitle);
    $('.ediPopUp').attr("myId", id);
    $(".ediPopUp #modeltype").trigger("change");
	$('.popUpTabError').text('');
	$("#stargetSilicaId").val('Select');
    var table = $(".ediPopUp table.inputTable tbody");
	if(unitConverionDoneEdi==false)
	{
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
		unitConverionDoneEdi=true;
	}
    if (localStorage.getItem(id) !== null) {
        getSavedData_edi = JSON.parse(localStorage.getItem('' + id + ''));
        $(".ediPopUp select[name=edimodeltype]").val(getSavedData_edi.edimodeltype);
		/* if(getSavedData_edi.edimodeltype == 'E-cell'){
			$('#xStackY').show();
		}else{
			$('#xStackY').hide();
		} */
		if(getSavedData_edi.edimodeltype == 'MK-3 MiniHT Pharmaceutical' || getSavedData_edi.edimodeltype == 'MK-3PharmaHT'){
			$('#targetSilicaShow').hide();		
		}
        $('#coCurrentY').prop('checked',JSON.parse(getSavedData_edi.coCurrentY));
        //$(".ediPopUp input[name=coCurrentN]").val(getSavedData_edi.coCurrentN);
        $('#roPerY').prop('checked',JSON.parse(getSavedData_edi.roPerY));
        //$(".ediPopUp input[name=roPerN]").val(getSavedData_edi.roPerN); hhstack
        //$('#hhstack').prop('checked',JSON.parse(getSavedData_edi.hhstack));
        //$(".ediPopUp input[name=xStackN]").val(getSavedData_edi.xStackN);
        /*$(".ediPopUp input[name=feedwcaid]").val(getSavedData_edi.feedwcaid);
        $(".ediPopUp input[name=feedwmgid]").val(getSavedData_edi.feedwmgid);
        $(".ediPopUp input[name=feedwnaid]").val(getSavedData_edi.feedwnaid);
        $(".ediPopUp input[name=feedwkid]").val(getSavedData_edi.feedwkid);
        $(".ediPopUp input[name=feedwnhid]").val(getSavedData_edi.feedwnhid);
        $(".ediPopUp input[name=feedwbaId]").val(getSavedData_edi.feedwbaId);
        $(".ediPopUp input[name=feedwsrId]").val(getSavedData_edi.feedwsrId);
        $(".ediPopUp input[name=feedwcoId]").val(getSavedData_edi.feedwcoId);
        $(".ediPopUp input[name=feedwhcoId]").val(getSavedData_edi.feedwhcoId);
        $(".ediPopUp input[name=feedwsoId]").val(getSavedData_edi.feedwsoId);
        $(".ediPopUp input[name=feedwclId]").val(getSavedData_edi.feedwclId);
        $(".ediPopUp input[name=feedwfId]").val(getSavedData_edi.feedwfId);
        $(".ediPopUp input[name=feedwnoId]").val(getSavedData_edi.feedwnoId);
        $(".ediPopUp input[name=feedwsiId]").val(getSavedData_edi.feedwsiId);
        $(".ediPopUp input[name=feedph]").val(getSavedData_edi.feedphiId);*/
        $(".ediPopUp input[name=stargetSenId]").val(getSavedData_edi.stargetSenId);
        $(".ediPopUp input[name=sProdFlowId]").val(getSavedData_edi.sProdFlowId);
        $(".ediPopUp input[name=sFlowPerStackId]").val(getSavedData_edi.sFlowPerStackId);
        //$(".ediPopUp input[name=stempId]").val(getSavedData_edi.stempId);
		/* if(getSavedData_edi.stargetSilicaId !== ""){
			$(".ediPopUp select[name=stargetSilicaId]").val(getSavedData_edi.stargetSilicaId);
		}else{ */
			$(".ediPopUp select[name=stargetSilicaId]").val(getSavedData_edi.stargetSilicaId);
		//}
        $(".ediPopUp input[name=srectifierEffId]").val(getSavedData_edi.srectifierEffId);
        $(".ediPopUp select[name=srectifierDCId]").val(getSavedData_edi.srectifierDCId);
        //$(".ediPopUp input[name=sFeedpressureId]").val(getSavedData_edi.sFeedpressureId); 
        $(".ediPopUp textarea[name=edi_Note]").val(getSavedData_edi.edi_Note);
    }else{
		$(".ediPopUp select[name=edimodeltype]").val('Select');
		$('#srectifierDC').children('option[value="400 V"]').show();
        $('#srectifierDC').children('option[value="250 V"]').hide();
        $('#srectifierDC').children('option[value="300 V"]').hide();
        $('#srectifierDC').children('option[value="150 V"]').hide();
        $('#srectifierDC').prop('selectedIndex', 0);
		//$('#xStackY').show();
        $('#coCurrentY').prop('checked',false);
        $('#roPerY').prop('checked',false);
        //$('#hhstack').prop('checked',false);
		$(".ediPopUp input[name=stargetSenId]").val('');
		$(".ediPopUp input[name=sFlowPerStackId]").val('');
		//$(".ediPopUp input[name=stempId]").val('');
		//$(".ediPopUp input[name=sFeedpressureId]").val('');
		$("#stargetSilicaId").val('Select');
		
	}
});

$('body').on('click', '.ediPopUp .updateBtn', function (e) {
    var popUpId = $(this).parent().parent().attr('myId');
    var inputData = {};
    var validFlag = 0;
    $(".ediPopUp input[name=modeltype]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=coCurrentY]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=coCurrentN]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=roPerY]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=roPerN]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=xStackY]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=xStackN]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwcaid]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwmgid]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwnaid]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwkid]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwnhid]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwbaId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwsrId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwcoId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwsoId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwclId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwfId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwnoId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedwsiId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=feedph]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=stargetSenId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=sProdFlowId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid #e1e2e5');
    //$(".ediPopUp input[name=stempId]").css('border', '1px solid #e1e2e5');
    $("#stargetSilicaId").css('border', '1px solid #e1e2e5');
    $(".ediPopUp input[name=srectifierEffId]").css('border', '1px solid #e1e2e5');
    //$(".ediPopUp input[name=sFeedpressureId]").css('border', '1px solid #e1e2e5');
    $(".ediPopUp select[name=edimodeltype]").css('border', '1px solid #e1e2e5');


    if ($(".ediPopUp select[name=edimodeltype]").val() == "Select") {
        validFlag = 1;
        $(".ediPopUp select[name=edimodeltype]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=coCurrentY]").val() == "" || $(".ediPopUp input[name=coCurrentN]").val()) {
        validFlag = 1;
        $(".ediPopUp input[name=coCurrentY]").css('border', '1px solid red');
        $(".ediPopUp input[name=coCurrentN]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=roPerY]").val() == "" || $(".ediPopUp input[name=roPerN]").val()) {
        validFlag = 1;
        $(".ediPopUp input[name=roPerY]").css('border', '1px solid red');
        $(".ediPopUp input[name=roPerN]").css('border', '1px solid red');

    }
    if ($(".ediPopUp input[name=xStackY]").val() == "" || $(".ediPopUp input[name=xStackN]").val()) {
        validFlag = 1;
        $(".ediPopUp input[name=xStackY]").css('border', '1px solid red');
        $(".ediPopUp input[name=xStackN]").css('border', '1px solid red');

    }
    if ($(".ediPopUp input[name=feedwcaid]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwcaid]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwmgid]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwmgid]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwnaid]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwnaid]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwkid]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwkid]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwnhid]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwnhid]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwbaId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwbaId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwsrId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwsrId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwcoId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwcoId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwsoId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwsoId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwclId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwclId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwfId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwfId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwnoId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwnoId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedwsiId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedwsiId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=feedph]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=feedph]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=stargetSenId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=stargetSenId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=sProdFlowId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=sProdFlowId]").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=sFlowPerStackId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
    /* if ($(".ediPopUp input[name=stempId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=stempId]").css('border', '1px solid red');
    } */
    if ($("#stargetSilicaId").val() == "Select"){
        validFlag = 1;
        $("#stargetSilicaId").css('border', '1px solid red');
    }
    if ($(".ediPopUp input[name=srectifierEffId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=srectifierEffId]").css('border', '1px solid red');
    }
    /* if ($(".ediPopUp input[name=sFeedpressureId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=sFeedpressureId]").css('border', '1px solid red');
    } */
	/*COnvert To standard Units before comparison*/
	//UnitConversion
		var table = $(".ediPopUp table.inputTable tbody");
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
					var unitConvertionValue = Number(m) * Number(value1) + Number(c);
					var fixedVal = unitConvertionValue;
					$tds.eq(1).find('input').attr('uCVal', fixedVal);
				}
			}
		});
	
    
  //});


    if (($('select[name=edimodeltype]').val() == 'E-cell' || $('select[name=edimodeltype]').val() == 'MK-3' || $('select[name=edimodeltype]').val() == 'MK-3 MiniHT Industrial') && ($(".ediPopUp input[name=stargetSenId]").val() < 0 || $(".ediPopUp input[name=stargetSenId]").val() > 16)) {
        validFlag = 1;
        $(".ediPopUp input[name=stargetSenId]").css('border', '1px solid red');
    }
    if (($('select[name=edimodeltype]').val() == 'MK-3PharmaHT' || $('select[name=edimodeltype]').val() == 'MK-3 MiniHT Pharmaceutical') && ($(".ediPopUp input[name=stargetSenId]").val() < 0 || $(".ediPopUp input[name=stargetSenId]").val() > 10)) {
        validFlag = 1;
        $(".ediPopUp input[name=stargetSenId]").css('border', '1px solid red');
    }

    /* if ($('select[name=edimodeltype]').val() == 0 && $(".ediPopUp input[name=sProdFlowId]").val() <= 2.27) {
        validFlag = 1;
        $(".ediPopUp input[name=sProdFlowId]").css('border', '1px solid red');
    }

    if (($('select[name=edimodeltype]').val() == 1 || $('select[name=edimodeltype]').val() == 2) && $(".ediPopUp input[name=sProdFlowId]").val() <= 1.7) {
        validFlag = 1;
        $(".ediPopUp input[name=sProdFlowId]").css('border', '1px solid red');
    }

    if (($('select[name=edimodeltype]').val() == 3) && $(".ediPopUp input[name=sProdFlowId]").val() <= 0.567) {
        validFlag = 1;
        $(".ediPopUp input[name=sProdFlowId]").css('border', '1px solid red');
    }

    if (($('select[name=edimodeltype]').val() == 4) && ($(".ediPopUp input[name=sProdFlowId]").val() < 0.45 || $(".ediPopUp input[name=sProdFlowId]").val() > 1.36)) {
        validFlag = 1;
        $(".ediPopUp input[name=sProdFlowId]").css('border', '1px solid red');
    } */

	/*if ( $(".ediPopUp input[name=sFlowPerStackId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }*/

    /*if ($('select[name=edimodeltype]').val() == 'E-cell' && ($('select[name=stackUnit]').val() == 'MK-3') && ($(".ediPopUp input[name=sFlowPerStackId]").val() < 2.3 || $(".ediPopUp input[name=sFlowPerStackId]").val() > 6.4)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }

    if (($('select[name=edimodeltype]').val() == 'MK-3' || $('select[name=edimodeltype]').val() == 'MK-3PharmaHT') && ($('select[name=stackUnit]').val() == 'MK-3') && ($(".ediPopUp input[name=sFlowPerStackId]").val() < 1.7 || $(".ediPopUp input[name=sFlowPerStackId]").val() > 4.5)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }

    if (($('select[name=edimodeltype]').val() == 'MK-3 MiniHT Pharmaceutical') && ($('select[name=stackUnit]').val() == 1) && ($(".ediPopUp input[name=sFlowPerStackId]").val() < .567 || $(".ediPopUp input[name=sFlowPerStackId]").val() > 1.5)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
    if (($('select[name=edimodeltype]').val() == 4) && ($('select[name=stackUnit]').val() == 0) && ($(".ediPopUp input[name=sFlowPerStackId]").val() < 2 || $(".ediPopUp input[name=sFlowPerStackId]").val() > 6)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
    if (($('select[name=edimodeltype]').val() == 4) && ($('select[name=stackUnit]').val() == 1) && ($(".ediPopUp input[name=sFlowPerStackId]").val() < .45 || $(".ediPopUp input[name=sFlowPerStackId]").val() > 1.36)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    } 
    if ($(".ediPopUp input[name=sFlowPerStackId]").val() > $(".ediPopUp input[name=sProdFlowId]").val()) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }*/
	
    /* if (($('#stempId1').text() == 'F') && ($(".ediPopUp input[name=stempId]").val() < 41 || $(".ediPopUp input[name=stempId]").val() > 100)) {
        validFlag = 1;
        $(".ediPopUp input[name=stempId]").css('border', '1px solid red');
    }
    if (($('#stempId1').text() == 'C') && ($(".ediPopUp input[name=stempId]").val() < 5 || $(".ediPopUp input[name=stempId]").val() > 38)) {
        validFlag = 1;
        $(".ediPopUp input[name=stempId]").css('border', '1px solid red');
    } */
	if ($('select[name=edimodeltype]').val() == 'E-cell' && ($(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') < 2.3 || $(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') > 6.4)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
	if (($('select[name=edimodeltype]').val() == 'MK-3'|| $('select[name=edimodeltype]').val() == 'MK-3PharmaHT' ) && ($(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') < 1.7 || $(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') > 4.5)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
	if ($('select[name=edimodeltype]').val() == 'MK-3 MiniHT Pharmaceutical' && ($(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') < 0.567 || $(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') > 1.5 )) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
	if ($('select[name=edimodeltype]').val() == 'MK-3 MiniHT Industrial' && ($(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') < 0.45 || $(".ediPopUp input[name=sFlowPerStackId]").attr('uCVal') > 1.36 )) {
        validFlag = 1;
        $(".ediPopUp input[name=sFlowPerStackId]").css('border', '1px solid red');
    }
	
	/* if ($(".ediPopUp input[name=stempId]").attr('uCVal') < 5 || $(".ediPopUp input[name=stempId]").attr('uCVal') > 38) {
        validFlag = 1;
        $(".ediPopUp input[name=stempId]").css('border', '1px solid red');
    } */
    /* if ($(".ediPopUp input[name=stempId]").attr('uCVal') < 5 || $(".ediPopUp input[name=stempId]").attr('uCVal') > 38) {
        validFlag = 1;
        $(".ediPopUp input[name=stempId]").css('border', '1px solid red');
    } */
	
    if ($(".ediPopUp input[name=srectifierEffId]").val() < 40 || $(".ediPopUp input[name=srectifierEffId]").val() > 95) {
        validFlag = 1;
        $(".ediPopUp input[name=srectifierEffId]").css('border', '1px solid red');
    }
	/* if ($('#coCurrentY').is(":checked") == true && $(".ediPopUp input[name=sFeedpressureId]").val() == "") {
        validFlag = 1;
        $(".ediPopUp input[name=sFeedpressureId]").css('border', '1px solid red');
    }
	
    if ($('#coCurrentY').is(":checked") == true && ($(".ediPopUp input[name=sFeedpressureId]").attr('uCVal') < 3.1 || $(".ediPopUp input[name=sFeedpressureId]").attr('uCVal') > 6.9)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFeedpressureId]").css('border', '1px solid red');
    }

    if ($('#coCurrentY').is(":checked") == false && ($(".ediPopUp input[name=sFeedpressureId]").attr('uCVal') < 4.1 || $(".ediPopUp input[name=sFeedpressureId]").attr('uCVal') > 6.9)) {
        validFlag = 1;
        $(".ediPopUp input[name=sFeedpressureId]").css('border', '1px solid red');
    } */
		
	

    console.log("Function called"+validFlag);
   // if (validFlag == 0) {
        inputData.edimodeltype = $(".ediPopUp select[name=edimodeltype]").val();
		if($("#coCurrentY").is(':checked')){
			inputData.coCurrentY = "true";
		}else{
			inputData.coCurrentY = "false";
		}
		//console.log('CO COrrebt'+inputData.coCurrentY);
        //inputData.coCurrentN = $(".ediPopUp input[name=coCurrentN]").val();modeltype
		if($("#roPerY").is(':checked')){
			inputData.roPerY = "true";
		}else{
			inputData.roPerY = "false";
		}
		
        //inputData.roPerN = $(".ediPopUp input[name=roPerN]").val();
		/* if($("#hhstack").is(':checked')){
			inputData.hhstack = "true";
		}else{
			inputData.hhstack = "false";
		} */
        //inputData.xStackN = $(".ediPopUp input[name=xStackN]").val();
        /*inputData.feedwcaid = $(".ediPopUp input[name=feedwcaid]").val();
        inputData.feedwmgid = $(".ediPopUp input[name=feedwmgid]").val();
        inputData.feedwnaid = $(".ediPopUp input[name=feedwnaid]").val();
        inputData.feedwkid = $(".ediPopUp input[name=feedwkid]").val();
        inputData.feedwnhid = $(".ediPopUp input[name=feedwnhid]").val();
        inputData.feedwbaId = $(".ediPopUp input[name=feedwbaId]").val();
        inputData.feedwsrId = $(".ediPopUp input[name=feedwsrId]").val();
        inputData.feedwcoId = $(".ediPopUp input[name=feedwcoId]").val();
        inputData.feedwsoId = $(".ediPopUp input[name=feedwsoId]").val();
        inputData.feedwclId = $(".ediPopUp input[name=feedwclId]").val();
        inputData.feedwfId = $(".ediPopUp input[name=feedwfId]").val();
        inputData.feedwnoId = $(".ediPopUp input[name=feedwnoId]").val();
        inputData.feedwsiId = $(".ediPopUp input[name=feedwsiId]").val(); 
        inputData.feedph = $(".ediPopUp input[name=feedph]").val();*/
		
        inputData.stargetSenId = $(".ediPopUp input[name=stargetSenId]").val();
        inputData.sProdFlowId = $(".ediPopUp input[name=sProdFlowId]").val();
        inputData.sFlowPerStackId = $(".ediPopUp input[name=sFlowPerStackId]").val();
        //inputData.stempId = $(".ediPopUp input[name=stempId]").val();
		/* if($(".ediPopUp select[name=edimodeltype]").val() == "E-cell" || $(".ediPopUp select[name=edimodeltype]").val() == "MK-3" || $(".ediPopUp select[name=edimodeltype]").val() == "MK-3 MiniHT Industrial"){ */
			inputData.stargetSilicaId = $(".ediPopUp select[name=stargetSilicaId]").val();
		/* }else{
			inputData.stargetSilicaId = "";
		} */
        inputData.srectifierEffId = $(".ediPopUp input[name=srectifierEffId]").val();
        inputData.srectifierDCId = $(".ediPopUp select[name=srectifierDCId]").val();
        inputData.sFeedpressureId = $(".ediPopUp input[name=sFeedpressureId]").val();
        inputData.edi_Note = $(".ediPopUp textarea[name=edi_Note]").val();


        localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(ediFormArray.indexOf(popUpId) === -1) {
            ediFormArray.push(popUpId);
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
    /*else {
        $('.popUpTabError').text('');
        $('.popUpTabError').text('Please enter all highlighted input from all tab.');
        e.stopImmediatePropagation();
    }*/
});


$('body').on('change', '.ediPopUp #modeltype', function () {
    //console.log('comes in chane');
	outputHide(this.value);
    /* if (this.value == 'E-cell') {
        $('#xStackY').show();
    }
    else {
        $('#xStackY').hide();
    } */
    

    if (this.value == 'MK-3PharmaHT') {
        $('#opredMaxProdSul').hide();
    }
    else {
        $('#opredMaxProdSul').show();
    }

    if (this.value == 'E-cell') {

        $('#srectifierDC').children('option[value="400 V"]').show();
        $('#srectifierDC').children('option[value="250 V"]').hide();
        $('#srectifierDC').children('option[value="300 V"]').hide();
        $('#srectifierDC').children('option[value="150 V"]').hide();
        $('#srectifierDC').prop('selectedIndex', 0);
		$('#targetSilicaShow').show();
    }

    else if (this.value == 'MK-3') {
        $('#srectifierDC').children('option[value="250 V"]').show();
        $('#srectifierDC').children('option[value="300 V"]').show();
        $('#srectifierDC').children('option[value="400 V"]').hide();
        $('#srectifierDC').children('option[value="150 V"]').hide();
        $('#srectifierDC').prop('selectedIndex', 2);
		$('#targetSilicaShow').show();
    }

    else if (this.value == 'MK-3PharmaHT') {
        $('#srectifierDC').children('option[value="250 V"]').hide();
        $('#srectifierDC').children('option[value="300 V"]').show();
        $('#srectifierDC').children('option[value="400 V"]').hide();
        $('#srectifierDC').children('option[value="150 V"]').hide();
        $('#srectifierDC').prop('selectedIndex', 2);
		$('#targetSilicaShow').hide();
    } 
	else if (this.value == 'MK-3 MiniHT Pharmaceutical') {
		$('#targetSilicaShow').hide();
	}
    else if (this.value == 'MK-3 MiniHT Pharmaceutical' || this.value == 'MK-3 MiniHT Industrial') {
        $('#srectifierDC').children('option[value="250 V"]').hide();
        $('#srectifierDC').children('option[value="300 V"]').hide();
        $('#srectifierDC').children('option[value="400 V"]').hide();
        $('#srectifierDC').children('option[value="150 V"]').show();
        $('#targetSilicaShow').show();
        $('#srectifierDC').prop('selectedIndex', 3);
    }


    if (this.value == 'MK-3PharmaHT') {
        $('#opredMaxProdSul').hide();
    }
    else {
        $('#opredMaxProdSul').show();
    }


});

$('body').on('change', '.ediPopUp #roPerY', function () {
	var getmodeltype = $('.ediPopUp #modeltype').val();
	outputHide(getmodeltype);
});

function outputHide(thisVal){
	if ((thisVal == 'MK-3PharmaHT' || thisVal == 'MK-3 MiniHT Pharmaceutical') && $('#roPerY').is(":checked") == true) {
        $('#oproductSilica').hide();
        $('#opredSilica').hide();
        $('#opredMax').hide();
        $('#opredMaxSodium').hide();
        $('#opredMaxprodChloride').hide();

    } else {
        $('#oproductSilica').show();
        $('#opredSilica').show();
        $('#opredMax').show();
        $('#opredMaxSodium').show();
        $('#opredMaxprodChloride').show();
    }	
}
//on Enter press next input 
$(document).on('keypress', '.ediPopUp input,.ediPopUp select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
/*
$(document).on('change', '.ediPopUp input', function () {
	var num = this.value.match(/^\d+$/);
    if (num === null) {
	// If we have no match, value will be empty.
	this.value = "";
	}
});

*/ 

/* $(document).on('change', '.ediPopUp input', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(2);
	$(this).val(values);
});

$(document).on('change', '.ediPopUp .fiveDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(5);
	$(this).val(values);
}); */


