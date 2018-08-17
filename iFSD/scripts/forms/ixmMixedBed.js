//IMX Mix Bed
$('body').on('click', '.MB', function () {
    var id = $(this).attr('id');
    $('.ixMixBedPopUp').removeClass('dispNone');
    $('.ixMixBedPopUp').show();
	$('.popUpTabError').text('');
    var table = $("table.inputTable tbody");
    table.find('tr').each(function (i) {

        var $tds = $(this).find('td'),
            getUnitType = $tds.eq(0).attr('unitType');
        if (getUnitType != '-') {
            getSavedUnit = JSON.parse(localStorage.getItem('SelectedUnits'));
            for (var j = 0; j < getSavedUnit.length; j++) {
                if (getUnitType == getSavedUnit[j].unitType) {
                    $tds.eq(2).text(getSavedUnit[j].unit);
                    console.log('match');
                }
            }
        } else {
            $tds.eq(2).text('-');
        }
    });
    $('.ixMixBedPopUp .body ul.nav li').removeClass('active');
	$('.ixMixBedPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.ixMixBedPopUp .Input').removeClass('dispNone');
	$('.ixMixBedPopUp .Output').addClass('dispNone');
	$('.ixMixBedPopUp .Note').addClass('dispNone');
	$('.ixMixBedPopUp .Documentation').addClass('dispNone');

	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.ixMixBedPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.ixMixBedPopUp div .popTitle').text(gateTitle);
    //$('.ixMixBedPopUp div .popTitle').text(id);
    $('.ixMixBedPopUp').attr("myId", id);

	
	$('#ixm_acidType').val('H2SO4');
	$(".ixMixBedPopUp select[name=ixminert]").val('No');
	$(".ixMixBedPopUp select[name=ixmGrossFlow]").val('Yes');
	$(".ixMixBedPopUp select[name=ixmRecycleMixBed]").val('Yes');
	$(".ixMixBedPopUp select[name=ixmInsertResins]").val('Yes');
	$(".ixMixBedPopUp select[name=ixmAmberstepResins]").val('Yes');
	$(".ixMixBedPopUp select[name=ixmBackwashSource]").val('Influent');
	$(".ixMixBedPopUp select[name=ixmHeatedCaustics]").val('Yes');
	$(".ixMixBedPopUp select[name=ixmUnderdrainType]").val('Flat Strainer Plate');
	$(".ixMixBedPopUp select[name=ixmServiceFlowRinse]").val('Yes');
	$('#acidTypeLinked').text('H2SO4');
    $('#linkAcidType2').text('H2SO4');
	$('#causticLinkId2').text('');
	$('#causticLinkId2A').text('');
	$('#linkAcidType3').text('H2SO4');
    /* var text1 = $('#acidTypeLinked').text();
    var text2 = $('#linkAcidType2').text();
    var text3 = $('#linkAcidType3').text();

    if (text1.indexOf($('#ixm_acidType option:selected').text()) < 0) {
        $('#acidTypeLinked').text(text1 + $('#ixm_acidType option:selected').text());
        $('#linkAcidType2').text(text2 + $('#ixm_acidType option:selected').text());
        $('#linkAcidType3').text(text3 +" "+ $(".ixMixBedPopUp input[name=ixmAcidCon]").val()+"% "+$('#ixm_acidType option:selected').text());
    }*/


    if (localStorage.getItem(id) !== null){
        getSavedData_ixm = JSON.parse(localStorage.getItem('' + id + ''));
		$('#acidTypeLinked').text(getSavedData_ixm.ixm_acidTypeText);
		$('#linkAcidType2').text(getSavedData_ixm.ixm_acidTypeText);
		$('#linkAcidType3').text(getSavedData_ixm.ixm_acidTypeText);
        $(".ixMixBedPopUp select[name=ixminert]").val(getSavedData_ixm.ixminert);
        $(".ixMixBedPopUp input[name=ixmcaid]").val(getSavedData_ixm.ixmcaid);
        $(".ixMixBedPopUp input[name=ixmmgid]").val(getSavedData_ixm.ixmmgid);
        $(".ixMixBedPopUp input[name=ixmna]").val(getSavedData_ixm.ixmna);
        $(".ixMixBedPopUp input[name=ixmk]").val(getSavedData_ixm.ixmk);
        $(".ixMixBedPopUp input[name=ixmnh]").val(getSavedData_ixm.ixmnh);
        /* $(".ixMixBedPopUp input[name=ixmhco]").val(getSavedData_ixm.ixmhco);
        $(".ixMixBedPopUp input[name=ixmso]").val(getSavedData_ixm.ixmso);
        $(".ixMixBedPopUp input[name=ixmcl]").val(getSavedData_ixm.ixmcl);
        $(".ixMixBedPopUp input[name=ixmno]").val(getSavedData_ixm.ixmno);
        $(".ixMixBedPopUp input[name=ixmco]").val(getSavedData_ixm.ixmco);
        $(".ixMixBedPopUp input[name=ixmsio]").val(getSavedData_ixm.ixmsio); */
        $(".ixMixBedPopUp input[name=ixmhcation]").val(getSavedData_ixm.ixmhcation);
        $(".ixMixBedPopUp input[name=ixmhcanion]").val(getSavedData_ixm.ixmhcanion);
        $(".ixMixBedPopUp input[name=ixmSAC]").val(getSavedData_ixm.ixmSAC);
        $(".ixMixBedPopUp input[name=ixmSBA]").val(getSavedData_ixm.ixmSBA);
        $(".ixMixBedPopUp input[name=ixmCatEx]").val(getSavedData_ixm.ixmCatEx);
        $(".ixMixBedPopUp input[name=ixmAnEx]").val(getSavedData_ixm.ixmAnEx);
        $(".ixMixBedPopUp input[name=ixmAcid]").val(getSavedData_ixm.ixmAcid);
        $(".ixMixBedPopUp input[name=ixmCaustic]").val(getSavedData_ixm.ixmCaustic);
        $(".ixMixBedPopUp select[name=ixm_acidType]").val(getSavedData_ixm.ixm_acidType);
        $(".ixMixBedPopUp input[name=ixmAcidCon]").val(getSavedData_ixm.ixmAcidCon);
        $(".ixMixBedPopUp input[name=ixmStep1]").val(getSavedData_ixm.ixmStep1);
        $(".ixMixBedPopUp input[name=ixmStep2]").val(getSavedData_ixm.ixmStep2);
        $(".ixMixBedPopUp input[name=ixmConcCaustic]").val(getSavedData_ixm.ixmConcCaustic);
        $(".ixMixBedPopUp input[name=ixmDiluteCaustic]").val(getSavedData_ixm.ixmDiluteCaustic);
        $(".ixMixBedPopUp input[name=imxflowRate]").val(getSavedData_ixm.imxflowRate);
        $(".ixMixBedPopUp input[name=ixmRunLength]").val(getSavedData_ixm.ixmRunLength);
        $(".ixMixBedPopUp select[name=ixmGrossFlow]").val(getSavedData_ixm.ixmGrossFlow);
        $(".ixMixBedPopUp select[name=ixmRecycleMixBed]").val(getSavedData_ixm.ixmRecycleMixBed);
        $(".ixMixBedPopUp select[name=ixmInsertResins]").val(getSavedData_ixm.ixmInsertResins);
        $(".ixMixBedPopUp select[name=ixmAmberstepResins]").val(getSavedData_ixm.ixmAmberstepResins);
        $(".ixMixBedPopUp select[name=ixmBackwashSource]").val(getSavedData_ixm.ixmBackwashSource);
        $(".ixMixBedPopUp select[name=ixmHeatedCaustics]").val(getSavedData_ixm.ixmHeatedCaustics);
        //$(".ixMixBedPopUp select[name=ixmBackwashSource]").val(getSavedData_ixm.ixmBackwashSource);
        //$(".ixMixBedPopUp select[name=ixmAmberstepResins]").val(getSavedData_ixm.ixmAmberstepResins);
        $(".ixMixBedPopUp select[name=ixmUnderdrainType]").val(getSavedData_ixm.ixmUnderdrainType);
        $(".ixMixBedPopUp input[name=ixmLiningThickness]").val(getSavedData_ixm.ixmLiningThickness);
        $(".ixMixBedPopUp input[name=ixmForceBedDepth]").val(getSavedData_ixm.ixmForceBedDepth);
        $(".ixMixBedPopUp input[name=ixmForceBedAnion]").val(getSavedData_ixm.ixmForceBedAnion);
        //$(".ixMixBedPopUp select[name=ixmAmberstepResins]").val(getSavedData_ixm.ixmAmberstepResins);
        //$(".ixMixBedPopUp select[name=ixmBackwashSource]").val(getSavedData_ixm.ixmBackwashSource);
        $(".ixMixBedPopUp select[name=ixmHeatedCaustic]").val(getSavedData_ixm.ixmHeatedCaustic);
        //$(".ixMixBedPopUp select[name=ixmUnderdrainType]").val(getSavedData_ixm.ixmUnderdrainType);
        //$(".ixMixBedPopUp input[name=ixmLiningThickness]").val(getSavedData_ixm.ixmLiningThickness);
        $(".ixMixBedPopUp input[name=ixmMBDiameter]").val(getSavedData_ixm.ixmMBDiameter);
        $(".ixMixBedPopUp input[name=ixmMBFreeboard]").val(getSavedData_ixm.ixmMBFreeboard);
        $(".ixMixBedPopUp input[name=ixmResinHighTemp]").val(getSavedData_ixm.ixmResinHighTemp);
        $(".ixMixBedPopUp input[name=ixmbackWashA]").val(getSavedData_ixm.ixmbackWashA);
        $(".ixMixBedPopUp input[name=ixmbackWashB]").val(getSavedData_ixm.ixmbackWashB);
        $(".ixMixBedPopUp input[name=ixmbackWashC]").val(getSavedData_ixm.ixmbackWashC);
        $(".ixMixBedPopUp input[name=ixmbackWashD]").val(getSavedData_ixm.ixmbackWashD);
        $(".ixMixBedPopUp input[name=ixmCausticInjection]").val(getSavedData_ixm.ixmCausticInjection);
        $(".ixMixBedPopUp select[name=ixmServiceFlowRinse]").val(getSavedData_ixm.ixmServiceFlowRinse);
        $(".ixMixBedPopUp input[name=ixmSlowBW]").val(getSavedData_ixm.ixmSlowBW);
        $(".ixMixBedPopUp input[name=ixmSlowWO]").val(getSavedData_ixm.ixmSlowWO);
        $(".ixMixBedPopUp input[name=ixmDesignPressure]").val(getSavedData_ixm.ixmDesignPressure);
        $(".ixMixBedPopUp input[name=ixmAcidInjectionflow]").val(getSavedData_ixm.ixmAcidInjectionflow);
		$('#linkAcidType3').text($(".ixMixBedPopUp input[name=ixmAcidCon]").val()+"% "+$('#ixm_acidType option:selected').text());
		$('#causticLinkId2').text($('.ixMixBedPopUp #ixmConcCausticId').val()+ '%');
		$('#causticLinkId2A').text($('.ixMixBedPopUp #ixmConcCausticId').val()+ '%');
    }else{
		$(".ixMixBedPopUp select[name=ixminert]").val('No');
        $(".ixMixBedPopUp input[name=ixmcaid]").val('');
        $(".ixMixBedPopUp input[name=ixmmgid]").val('');
        $(".ixMixBedPopUp input[name=ixmna]").val('');
        $(".ixMixBedPopUp input[name=ixmk]").val('');
        $(".ixMixBedPopUp input[name=ixmnh]").val('');
        /* $(".ixMixBedPopUp input[name=ixmhco]").val(getSavedData_ixm.ixmhco);
        $(".ixMixBedPopUp input[name=ixmso]").val(getSavedData_ixm.ixmso);
        $(".ixMixBedPopUp input[name=ixmcl]").val(getSavedData_ixm.ixmcl);
        $(".ixMixBedPopUp input[name=ixmno]").val(getSavedData_ixm.ixmno);
        $(".ixMixBedPopUp input[name=ixmco]").val(getSavedData_ixm.ixmco);
        $(".ixMixBedPopUp input[name=ixmsio]").val(getSavedData_ixm.ixmsio); */
        $(".ixMixBedPopUp input[name=ixmhcation]").val('');
        $(".ixMixBedPopUp input[name=ixmhcanion]").val('');
        $(".ixMixBedPopUp input[name=ixmSAC]").val('');
        $(".ixMixBedPopUp input[name=ixmSBA]").val('');
        $(".ixMixBedPopUp input[name=ixmCatEx]").val('');
        $(".ixMixBedPopUp input[name=ixmAnEx]").val('');
        $(".ixMixBedPopUp input[name=ixmAcid]").val('');
        $(".ixMixBedPopUp input[name=ixmCaustic]").val('');
        //$(".ixMixBedPopUp select[name=ixm_acidType]").val('');
        $(".ixMixBedPopUp input[name=ixmAcidCon]").val(93);
        $(".ixMixBedPopUp input[name=ixmStep1]").val('');
        $(".ixMixBedPopUp input[name=ixmStep2]").val('');
        $(".ixMixBedPopUp input[name=ixmConcCaustic]").val(50);
        $(".ixMixBedPopUp input[name=ixmDiluteCaustic]").val(4);
        $(".ixMixBedPopUp input[name=imxflowRate]").val('');
        $(".ixMixBedPopUp input[name=ixmRunLength]").val('');
        //$(".ixMixBedPopUp select[name=ixmGrossFlow]").val('');
        //$(".ixMixBedPopUp select[name=ixmRecycleMixBed]").val('');
        //$(".ixMixBedPopUp select[name=ixmInsertResins]").val('');
        //$(".ixMixBedPopUp select[name=ixmAmberstepResins]").val('');
        //$(".ixMixBedPopUp select[name=ixmBackwashSource]").val('');
        //$(".ixMixBedPopUp select[name=ixmHeatedCaustics]").val('');
        //$(".ixMixBedPopUp select[name=ixmBackwashSource]").val(getSavedData_ixm.ixmBackwashSource);
        //$(".ixMixBedPopUp select[name=ixmAmberstepResins]").val(getSavedData_ixm.ixmAmberstepResins);
        //$(".ixMixBedPopUp select[name=ixmUnderdrainType]").val('');
        $(".ixMixBedPopUp input[name=ixmLiningThickness]").val('');
        $(".ixMixBedPopUp input[name=ixmForceBedDepth]").val('');
        $(".ixMixBedPopUp input[name=ixmForceBedAnion]").val('');
        //$(".ixMixBedPopUp select[name=ixmAmberstepResins]").val(getSavedData_ixm.ixmAmberstepResins);
        //$(".ixMixBedPopUp select[name=ixmBackwashSource]").val(getSavedData_ixm.ixmBackwashSource);
        //$(".ixMixBedPopUp select[name=ixmHeatedCaustic]").val('');
        //$(".ixMixBedPopUp select[name=ixmUnderdrainType]").val(getSavedData_ixm.ixmUnderdrainType);
        //$(".ixMixBedPopUp input[name=ixmLiningThickness]").val(getSavedData_ixm.ixmLiningThickness);
        $(".ixMixBedPopUp input[name=ixmMBDiameter]").val('');
        $(".ixMixBedPopUp input[name=ixmMBFreeboard]").val('');
        $(".ixMixBedPopUp input[name=ixmResinHighTemp]").val('');
/*         $(".ixMixBedPopUp input[name=ixmbackWashA]").val('');
        $(".ixMixBedPopUp input[name=ixmbackWashB]").val('');
        $(".ixMixBedPopUp input[name=ixmbackWashC]").val('');
        $(".ixMixBedPopUp input[name=ixmbackWashD]").val(''); */
        $(".ixMixBedPopUp input[name=ixmCausticInjection]").val('');
        //$(".ixMixBedPopUp select[name=ixmServiceFlowRinse]").val('');
        $(".ixMixBedPopUp input[name=ixmSlowBW]").val('');
        $(".ixMixBedPopUp input[name=ixmSlowWO]").val('');
        $(".ixMixBedPopUp input[name=ixmDesignPressure]").val('');
        $(".ixMixBedPopUp input[name=ixmAcidInjectionflow]").val('');
	}
});
//Unit type Set
/* var popUpId = $(this).attr('id');

var getTable = $('#'+popUpId);
getTable.find('tr').each(function (i, el) {
    var $tds = $(this).find('td'),
        propertyTxt = $tds.eq(0).text(),
        pValue = $tds.eq(1).text(),
        unit = $tds.eq(2).text();
        console.log(propertyTxt);
});  */



$('body').on('click', '.ixMixBedPopUp .updateBtn', function (e) {
    var popUpId = $(this).parent().parent().parent().attr('myId');
    var inputData = {};
    var validFlag = 0;
    $(".ixMixBedPopUp input[name=ixmcaid]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmmgid]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmna]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmk]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmnh]").css('border', '1px solid #e1e2e5');
    /* $(".ixMixBedPopUp input[name=ixmhco]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmso]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmcl]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmno]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmco]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmsio]").css('border', '1px solid #e1e2e5'); */
    $(".ixMixBedPopUp input[name=ixmhcation]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmhcanion]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixminert]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmSAC]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmSBA]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmCatEx]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmAnEx]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmAcid]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmCaustic]").css('border', '1px solid #e1e2e5');

    $(".ixMixBedPopUp select[name=ixm_acidType]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmAcidCon]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmStep1]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmStep2]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmConcCaustic]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmDiluteCaustic]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=imxflowRate]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmRunLength]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmInsertResins]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmGrossFlow]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmRecycleMixBed]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmInsertResins]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmBackwashSource]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmHeatedCaustics]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmAmberstepResins]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmUnderdrainType]").css('border', '1px solid #e1e2e5');


    $(".ixMixBedPopUp input[name=ixmLiningThickness]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmForceBedDepth]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmForceBedAnion]").css('border', '1px solid #e1e2e5');
    //$(".ixMixBedPopUp input[name=ixmAmberstepResins]").css('border', '1px solid #e1e2e5');
    //$(".ixMixBedPopUp input[name=ixmBackwashSource]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmHeatedCaustic]").css('border', '1px solid #e1e2e5');
    //$(".ixMixBedPopUp input[name=ixmUnderdrainType]").css('border', '1px solid #e1e2e5');
    //$(".ixMixBedPopUp input[name=ixmLiningThickness]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmMBDiameter]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmMBFreeboard]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmResinHighTemp]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmbackWashA]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmbackWashB]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmbackWashC]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmbackWashD]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmCausticInjection]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp select[name=ixmServiceFlowRinse]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmSlowBW]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmSlowWO]").css('border', '1px solid #e1e2e5');
    $(".ixMixBedPopUp input[name=ixmDesignPressure]").css('border', '1px solid #e1e2e5');


    if ($(".ixMixBedPopUp input[name=ixmcaid]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmcaid]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmna]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmna]").css('border', '1px solid red');
    }

    if ($(".ixMixBedPopUp input[name=ixmk]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmk]").css('border', '1px solid red');
    }

    if ($(".ixMixBedPopUp input[name=ixmnh]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmnh]").css('border', '1px solid red');
    }
    /* if ($(".ixMixBedPopUp input[name=ixmhco]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmhco]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmso]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmso]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmcl]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmcl]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmno]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmno]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmco]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmco]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmsio]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmsio]").css('border', '1px solid red');
    }*/
    if ($(".ixMixBedPopUp input[name=ixmhcation]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmhcation]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixminert]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixminert]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmSAC]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmSAC]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmSBA]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmSBA]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmSBA]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmCatEx]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmAnEx]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmAnEx]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmAcid]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmAcid]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmCaustic]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmCaustic]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp select[name=ixm_acidType]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixm_acidType]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmAcidCon]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmAcidCon]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmAcidCon]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmAcidCon]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmStep1]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmStep1]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmStep2]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmStep2]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmConcCaustic]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmConcCaustic]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmDiluteCaustic]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmDiluteCaustic]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=imxflowRate]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=imxflowRate]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmRunLength]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmRunLength]").css('border', '1px solid red');
    }

    if ($(".ixMixBedPopUp input[name=ixmRunLength]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmRunLength]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp select[name=ixmGrossFlow]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixmGrossFlow]").css('border', '1px solid red');
    }

    if ($(".ixMixBedPopUp select[name=ixmRecycleMixBed]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixmRecycleMixBed]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp select[name=ixmBackwashSource]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixmBackwashSource]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp select[name=ixmAmberstepResins]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixmAmberstepResins]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp select[name=ixmUnderdrainType]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixmUnderdrainType]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp select[name=ixmLiningThickness]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp select[name=ixmLiningThickness]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmForceBedDepth]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmForceBedDepth]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmForceBedAnion]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmForceBedAnion]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmAmberstepResins]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmAmberstepResins]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmBackwashSource]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmBackwashSource]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmHeatedCaustic]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmHeatedCaustic]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmUnderdrainType]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmUnderdrainType]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmLiningThickness]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmLiningThickness]").css('border', '1px solid red');
    }
    if ($(".ixMixBedPopUp input[name=ixmMBDiameter]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmMBDiameter]").css('border', '1px solid red');
    }
	if ($(".ixMixBedPopUp input[name=ixmDesignPressure]").val() == "") {
        validFlag = 1;
        $(".ixMixBedPopUp input[name=ixmDesignPressure]").css('border', '1px solid red');
    }
	


   // if (validFlag == 0) {
        inputData.ixmcaid = $(".ixMixBedPopUp input[name=ixmcaid]").val();
        inputData.ixmna = $(".ixMixBedPopUp input[name=ixmna]").val();
        inputData.ixmk = $(".ixMixBedPopUp input[name=ixmk]").val();
        inputData.ixmk = $(".ixMixBedPopUp input[name=ixmk]").val()
        inputData.ixmnh = $(".ixMixBedPopUp input[name=ixmnh]").val();
        /* inputData.ixmhco = $(".ixMixBedPopUp input[name=ixmhco]").val();
        inputData.ixmso = $(".ixMixBedPopUp input[name=ixmso]").val();
        inputData.ixmcl = $(".ixMixBedPopUp input[name=ixmcl]").val();
        inputData.ixmno = $(".ixMixBedPopUp input[name=ixmno]").val();
        inputData.ixmco = $(".ixMixBedPopUp input[name=ixmco]").val();
        inputData.ixmsio = $(".ixMixBedPopUp input[name=ixmsio]").val(); */
        inputData.ixmhcation = $(".ixMixBedPopUp input[name=ixmhcation]").val();
        inputData.ixmhcanion = $(".ixMixBedPopUp input[name=ixmhcanion]").val();
        inputData.ixminert = $(".ixMixBedPopUp select[name=ixminert]").val();
        inputData.ixmSAC = $(".ixMixBedPopUp input[name=ixmSAC]").val();
        inputData.ixmSBA = $(".ixMixBedPopUp input[name=ixmSBA]").val();
        inputData.ixmCatEx = $(".ixMixBedPopUp input[name=ixmCatEx]").val();
        inputData.ixmAnEx = $(".ixMixBedPopUp input[name=ixmAnEx]").val();
        inputData.ixmAcid = $(".ixMixBedPopUp input[name=ixmAcid]").val();
        inputData.ixmCaustic = $(".ixMixBedPopUp input[name=ixmCaustic]").val();
        inputData.ixm_acidType = $(".ixMixBedPopUp select[name=ixm_acidType]").val();
        inputData.ixmAcidCon = $(".ixMixBedPopUp input[name=ixmAcidCon]").val();
        inputData.ixmStep1 = $(".ixMixBedPopUp input[name=ixmStep1]").val();
        inputData.ixmStep2 = $(".ixMixBedPopUp input[name=ixmStep2]").val();
        inputData.ixmConcCaustic = $(".ixMixBedPopUp input[name=ixmConcCaustic]").val();
        inputData.ixmDiluteCaustic = $(".ixMixBedPopUp input[name=ixmDiluteCaustic]").val();
        inputData.imxflowRate = $(".ixMixBedPopUp input[name=imxflowRate]").val();
        inputData.ixmRunLength = $(".ixMixBedPopUp input[name=ixmRunLength]").val();
        inputData.ixmGrossFlow = $(".ixMixBedPopUp select[name=ixmGrossFlow]").val();
        inputData.ixmRecycleMixBed = $(".ixMixBedPopUp select[name=ixmRecycleMixBed]").val();
        inputData.ixmInsertResins = $(".ixMixBedPopUp select[name=ixmInsertResins]").val();
        inputData.ixmBackwashSource = $(".ixMixBedPopUp select[name=ixmBackwashSource]").val();
        inputData.ixmHeatedCaustics = $(".ixMixBedPopUp select[name=ixmHeatedCaustics]").val();
        inputData.ixmAmberstepResins = $(".ixMixBedPopUp select[name=ixmAmberstepResins]").val();
        inputData.ixmUnderdrainType = $(".ixMixBedPopUp select[name=ixmUnderdrainType]").val();
        inputData.ixmLiningThickness = $(".ixMixBedPopUp input[name=ixmLiningThickness]").val();
        inputData.ixmMBDiameter = $(".ixMixBedPopUp input[name=ixmMBDiameter]").val();
		var text1=$('#causticLinkId2').text();
		if(text1!=undefined && text1.indexOf(inputData.ixmDiluteCaustic<0)){
			 $('#causticLinkId2').text(text1+inputData.ixmDiluteCaustic+' % NaOH');
		}
		inputData.ixmCaustic = $(".ixMixBedPopUp input[name=ixmCaustic]").val();
		inputData.ixmSlowBW = $(".ixMixBedPopUp input[name=ixmSlowBW]").val();
		inputData.ixmSlowWO = $(".ixMixBedPopUp input[name=ixmSlowWO]").val();
		inputData.ixmAcidInjectionflow = $(".ixMixBedPopUp input[name=ixmAcidInjectionflow]").val();
		inputData.ixmServiceFlowRinse = $(".ixMixBedPopUp select[name=ixmServiceFlowRinse]").val();
		inputData.ixmForceBedDepth = $(".ixMixBedPopUp input[name=ixmForceBedDepth]").val();
		inputData.ixmForceBedAnion = $(".ixMixBedPopUp input[name=ixmForceBedAnion]").val();
		inputData.ixmMBFreeboard = $(".ixMixBedPopUp input[name=ixmMBFreeboard]").val();
		inputData.ixmDesignPressure = $(".ixMixBedPopUp input[name=ixmDesignPressure]").val();
		inputData.ixmResinHighTemp = $(".ixMixBedPopUp input[name=ixmResinHighTemp]").val();
		inputData.ixmCausticInjection = $(".ixMixBedPopUp input[name=ixmCausticInjection]").val();
		inputData.ixmbackWashA = $(".ixMixBedPopUp input[name=ixmbackWashA]").val();
		inputData.ixmbackWashB = $(".ixMixBedPopUp input[name=ixmbackWashB]").val();
		inputData.ixmbackWashC = $(".ixMixBedPopUp input[name=ixmbackWashC]").val();
		inputData.ixmbackWashD = $(".ixMixBedPopUp input[name=ixmbackWashD]").val();
		inputData.ixm_acidTypeText = $("#ixm_acidType option:selected").text();

        localStorage.setItem(popUpId, JSON.stringify(inputData));
		
		if(ixmMixedBedArray.indexOf(popUpId) === -1) {
            ixmMixedBedArray.push(popUpId);            
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
        e.stopImmediatePropagation();
    }
    */

});

$('body').on('change', '.ixMixBedPopUp #ixm_acidType', function () {
    /* var text1 = $('#acidTypeLinked').text();
    var text2 = $('#linkAcidType2').text();
    var text3 = $('#linkAcidType3').text(); */

    /* if (text1.indexOf($('#ixm_acidType option:selected').text()) < 0) { */
        $('#acidTypeLinked').text( $('#ixm_acidType option:selected').text());
        $('#linkAcidType2').text($('#ixm_acidType option:selected').text());
        $('#linkAcidType3').text($(".ixMixBedPopUp input[name=ixmAcidCon]").val()+"% "+$('#ixm_acidType option:selected').text());
    /* } */
});

/* $('body').on('change', '.ixMixBedPopUp #ixmAcidCon', function () {
	$('#linkAcidType3').text($(".ixMixBedPopUp input[name=ixmAcidCon]").val()+"% "+$('#ixm_acidType option:selected').text());
});
$('body').on('change', '.ixMixBedPopUp #ixmConcCausticId', function () {
	$('#causticLinkId2').text($(this).val()+ '%');
	$('#causticLinkId2A').text($(this).val()+ '%');
}); */

$(document).on('click', 'a', function () {
	if($(this).html()=='Output'){
	loadOutputFromFile();
	}
});

$(document).on('change', '.ixMixBedPopUp .inputTable input', function () {
	if($(this).hasClass("alphaNumTxt")){
		console.log('alphaNumTxt');
	}else{
		var thisVal = $(this).val();
		var values = parseFloat(thisVal).toFixed(2);
		$(this).val(values);
	}
	
});

$(document).on('change', '.ixMixBedPopUp .sixDecimal', function () {
	var thisVal = $(this).val();
	var values = parseFloat(thisVal).toFixed(6);
	$(this).val(values);
});

