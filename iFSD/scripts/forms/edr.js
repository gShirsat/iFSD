//EDI
$('body').on('click', '.EDR', function () {
    var id = $(this).attr('id');
	inputErrorRemove('EDRPopUp');
    $('.EDRPopUp').removeClass('dispNone');
    $('.EDRPopUp').show();
	$('.EDRPopUp .body ul.nav li').removeClass('active');
	$('.EDRPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.EDRPopUp .Input').removeClass('dispNone');
	$('.EDRPopUp .Output').addClass('dispNone');
	$('.EDRPopUp .Note').addClass('dispNone');
	$('.EDRPopUp .Documentation').addClass('dispNone');
    $('.EDRPopUp div .popTitle').text(id);
    $('.EDRPopUp').attr("myId", id);
    var table = $("table.inputTable tbody");
    $('.EDRPopUp #elemType').trigger('change');
	$('.popUpTabError').text('');
});

$('body').on('click', '.edrPopUp .updateBtn', function (e) {
    console.log('Inside click method');
    var popUpId = $(this).parent().parent().parent().attr('myid');
	console.log($(this).parent().parent().attr('myid'));
    var edrInputData = {};
    var validFlag = 0;
    $(".EDRPopUp input[id=ffr]").css('border', '1px solid #e1e2e5');
    $(".EDRPopUp input[id=ftds]").css('border', '1px solid #e1e2e5');
    $(".EDRPopUp input[id=ftemperature]").css('border', '1px solid #e1e2e5');
    $(".EDRPopUp input[id=ptds]").css('border', '1px solid #e1e2e5');

    $(".EDRPopUp input[id=fcomposition]").css('border', '1px solid #e1e2e5');
    $(".EDRPopUp input[id=recovery]").css('border', '1px solid #e1e2e5');
    
	
	/*COnvert To standard Units before comparison*/
	//UnitConversion
	

    if ($(".EDRPopUp input[id=ffr]").val() == "") {
        validFlag = 1;
        $(".EDRPopUp input[id=ffr]").css('border', '1px solid red');
    }
    if ($(".EDRPopUp input[id=ftds]").val() == "") {
        validFlag = 1;
        $(".EDRPopUp input[id=ftds]").css('border', '1px solid red');
    }
    if ($(".EDRPopUp input[id=ftemperature]").val() == "") {
        validFlag = 1;
        $(".EDRPopUp input[id=ftemperature]").css('border', '1px solid red');

    }
    if ($(".EDRPopUp input[id=ptds]").val() == "") {
        validFlag = 1;
        $(".EDRPopUp input[id=ptds]").css('border', '1px solid red');

    }
    if ($(".EDRPopUp input[id=fcomposition]").val() == "") {
        validFlag = 1;
        $(".EDRPopUp input[id=fcomposition]").css('border', '1px solid red');

    }
    if ($(".EDRPopUp input[id=recovery]").val() == "") {
        validFlag = 1;
        $(".EDRPopUp input[id=recovery]").css('border', '1px solid red');

    }
    
	


    if (validFlag == 0) {
        edrInputData.ffr = $(".edrPopUp input[id=ffr]").val();
        edrInputData.ftds = $(".edrPopUp input[id=ftds]").val();
        edrInputData.ftemperature = $(".edrPopUp input[id=ftemperature]").val();
        edrInputData.ptds = $(".edrPopUp input[id=ptds]").val();
        edrInputData.fcomposition = $(".edrPopUp input[id=fcomposition]").val();
        edrInputData.recovery = $(".edrPopUp input[id=recovery]").val();


		
        localStorage.setItem(popUpId, JSON.stringify(edrInputData));
		console.log(popUpId+' Pop up Id');
		if(rofFormArray.indexOf(popUpId) === -1) {
			rofFormArray.push(popUpId);
		}
    }
    else {
        $('.popUpTabError').text('');
        $('.popUpTabError').text('Please enter all highlighted input from all tab.');
        e.stopImmediatePropagation();
    }
});


