//filtraFast
var unitConverionDoneEdi=false;
$('body').on('click', '.FF', function () {
    var id = $(this).attr('id');
    $('.FiltraFastPopUp').removeClass('dispNone');
    $('.FiltraFastPopUp').show();
	$('.FiltraFastPopUp .body ul.nav li').removeClass('active');
	$('.FiltraFastPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.FiltraFastPopUp .Input').removeClass('dispNone');
	$('.FiltraFastPopUp .Output').addClass('dispNone');
	$('.FiltraFastPopUp .Note').addClass('dispNone');
	$('.FiltraFastPopUp .Documentation').addClass('dispNone');
    //$('.FiltraFastPopUp div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.FiltraFastPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.FiltraFastPopUp div .popTitle').text(gateTitle);
    $('.FiltraFastPopUp').attr("myId", id);
    $(".FiltraFastPopUp #modeltype").trigger("change");
	$('.popUpTabError').text('');
    var table = $(".FiltraFastPopUp table.inputTable tbody");
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
        getSavedData_FF = JSON.parse(localStorage.getItem('' + id + ''));
        $(".FiltraFastPopUp select[name=filterType]").val(getSavedData_FF.filterType);
        $(".FiltraFastPopUp select[name=filterCellSize]").val(getSavedData_FF.filterCellSize);
        $(".FiltraFastPopUp input[name=NoOfFilterUnits]").val(getSavedData_FF.NoOfFilterUnits);
        $(".FiltraFastPopUp input[name=cFUIV]").val(getSavedData_FF.cFUIV);
        $(".FiltraFastPopUp input[name=fCIV]").val(getSavedData_FF.fCIV);
        $(".FiltraFastPopUp input[name=fCEV]").val(getSavedData_FF.fCEV);
        $(".FiltraFastPopUp input[name=cFUEV]").val(getSavedData_FF.cFUEV);
        $(".FiltraFastPopUp input[name=ftoWCV]").val(getSavedData_FF.ftoWCV);
        $(".FiltraFastPopUp input[name=bSV]").val(getSavedData_FF.bSV);
        $(".FiltraFastPopUp input[name=bWVM]").val(getSavedData_FF.bWVM);
        $(".FiltraFastPopUp input[name=aSV]").val(getSavedData_FF.aSV);
        $(".FiltraFastPopUp select[name=bT]").val(getSavedData_FF.bT);
		$(".FiltraFastPopUp input[name=nOfFCOofSDC]").val(getSavedData_FF.nOfFCOofSDC);
		$(".FiltraFastPopUp input[name=aSR]").val(getSavedData_FF.aSR);
		$(".FiltraFastPopUp input[name=bR]").val(getSavedData_FF.bR);

		if(getSavedData_FF.bT == 'Air + Water' ){
			$('#airScourRate').show();
		}else{
			$('#airScourRate').hide();
		}

    }else{
		$(".FiltraFastPopUp select[name=filterType]").val('Single Cell');
        $(".FiltraFastPopUp select[name=filterCellSize]").val('2 by 4');
        $(".FiltraFastPopUp input[name=NoOfFilterUnits]").val('');
		$(".FiltraFastPopUp input[name=cFUIV]").val(0.762);
		$(".FiltraFastPopUp input[name=fCIV]").val(0.762);
		$(".FiltraFastPopUp input[name=fCEV]").val(0.762);
		$(".FiltraFastPopUp input[name=cFUEV]").val(0.762);
		$(".FiltraFastPopUp input[name=ftoWCV]").val(0.762);
		$(".FiltraFastPopUp input[name=bSV]").val(1.524);
		$(".FiltraFastPopUp input[name=bWVM]").val(0.762);
		$(".FiltraFastPopUp input[name=aSV]").val(21.336);
		$(".FiltraFastPopUp select[name=bT]").val('Air + Water');		
		$('#airScourRate').show();
		$(".FiltraFastPopUp input[name=nOfFCOofSDC]").val('');
		$(".FiltraFastPopUp input[name=aSR]").val('');
		$(".FiltraFastPopUp input[name=bR]").val('');
	}
});

$('body').on('click', '.FiltraFastPopUp .updateBtn', function (e) {
    var popUpId = $(this).parent().parent().attr('myId');
    var inputData = {};
    var validFlag = 0;
    $(".FiltraFastPopUp input[name=NoOfFilterUnits]").css('border', '1px solid #e1e2e5');	
	$(".FiltraFastPopUp input[name=cFUIV]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=fCIV]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=fCEV]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=cFUEV]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=ftoWCV]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=bSV]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=bWVM]").css('border', '1px solid #e1e2e5');
	$(".FiltraFastPopUp input[name=aSV]").css('border', '1px solid #e1e2e5');
	
	/*COnvert To standard Units before comparison*/
	//UnitConversion
		var table = $(".FiltraFastPopUp table.inputTable tbody");
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

		if (($('.FiltraFastPopUp input[name=NoOfFilterUnits]').val() == "" || $('.FiltraFastPopUp input[name=NoOfFilterUnits]').val() < 1)) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=NoOfFilterUnits]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=cFUIV]").attr('uCVal') < 0.6096 || $(".FiltraFastPopUp input[name=cFUIV]").attr('uCVal') > 0.9144 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=cFUIV]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=fCIV]").attr('uCVal') < 0.6096 || $(".FiltraFastPopUp input[name=fCIV]").attr('uCVal') > 0.9144 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=fCIV]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=fCEV]").attr('uCVal') < 0.6096 || $(".FiltraFastPopUp input[name=fCEV]").attr('uCVal') > 0.9144 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=fCEV]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=cFUEV]").attr('uCVal') < 0.6096 || $(".FiltraFastPopUp input[name=cFUEV]").attr('uCVal') > 0.9144 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=cFUEV]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=ftoWCV]").attr('uCVal') < 0.6096 || $(".FiltraFastPopUp input[name=ftoWCV]").attr('uCVal') > 0.9144 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=ftoWCV]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=bSV]").attr('uCVal') < 1.2192 || $(".FiltraFastPopUp input[name=bSV]").attr('uCVal') > 1.8288 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=bSV]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=bWVM]").attr('uCVal') < 0.6096 || $(".FiltraFastPopUp input[name=bWVM]").attr('uCVal') > 0.9144 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=bWVM]").css('border', '1px solid red');
		}
		if ($(".FiltraFastPopUp input[name=aSV]").attr('uCVal') < 18.288 || $(".FiltraFastPopUp input[name=aSV]").attr('uCVal') > 24.384 ) {
			validFlag = 1;
			$(".FiltraFastPopUp input[name=aSV]").css('border', '1px solid red');
		}

   // if (validFlag == 0) {
        inputData.filterType = $(".FiltraFastPopUp select[name=filterType]").val();
        inputData.filterCellSize = $(".FiltraFastPopUp select[name=filterCellSize]").val();
        inputData.NoOfFilterUnits = $(".FiltraFastPopUp input[name=NoOfFilterUnits]").val();
        inputData.cFUIV = $(".FiltraFastPopUp input[name=cFUIV]").val();
        inputData.fCIV = $(".FiltraFastPopUp input[name=fCIV]").val();
        inputData.fCEV = $(".FiltraFastPopUp input[name=fCEV]").val();
        inputData.cFUEV = $(".FiltraFastPopUp input[name=cFUEV]").val();
        inputData.ftoWCV = $(".FiltraFastPopUp input[name=ftoWCV]").val();
        inputData.bSV = $(".FiltraFastPopUp input[name=bSV]").val();
        inputData.bWVM = $(".FiltraFastPopUp input[name=bWVM]").val();
        inputData.aSV = $(".FiltraFastPopUp input[name=aSV]").val();
        inputData.bT = $(".FiltraFastPopUp select[name=bT]").val();
        inputData.nOfFCOofSDC = $(".FiltraFastPopUp input[name=nOfFCOofSDC]").val();
        inputData.aSR = $(".FiltraFastPopUp input[name=aSR]").val();
        inputData.bR = $(".FiltraFastPopUp input[name=bR]").val();


        localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(ffFormArray.indexOf(popUpId) === -1) {
            ffFormArray.push(popUpId);            	
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


$('body').on('change', '.FiltraFastPopUp #bT', function () {
	var bTtype = $(this).val();
	if(bTtype == "Air + Water"){
		$('#airScourRate').show();
	}else{
		$('#airScourRate').hide();
	}
});



/* $(document).on('change', '.FiltraFastPopUp #NoOfFilterUnits', function () {
	$(this).val($(this).val().replace(/[^\d]+/, ""));
});
 */


