//EDI
$('body').on('click', '.SF', function () {
    var id = $(this).attr('id');
	inputErrorRemove('strainerPopUp');
    $('.strainerPopUp').removeClass('dispNone');
    $('.strainerPopUp').show();
	$('.strainerPopUp .body ul.nav li').removeClass('active');
	$('.strainerPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.strainerPopUp .Input').removeClass('dispNone');
	$('.strainerPopUp .Output').addClass('dispNone');
	$('.strainerPopUp .Note').addClass('dispNone');
	$('.strainerPopUp .Documentation').addClass('dispNone');
    //$('.strainerPopUp div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.strainerPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.strainerPopUp div .popTitle').text(gateTitle);
    $('.strainerPopUp').attr("myId", id);
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
                }
            }
        } else {
            $tds.eq(2).text('-');
        }
    });

    if (localStorage.getItem(id) !== null) {
        getSavedData_sf = JSON.parse(localStorage.getItem('' + id + ''));
        //console.log("id" + JSON.stringify(getStoredData));recoveryId
        $('.strainerPopUp #applicationId').val(getSavedData_sf.applicationId);
		if(getSavedData_sf.applicationId =='Non MBR')
		{
			$('#feedwaterFilter').show();
		}else{
			$('#feedwaterFilter').hide();
		}
        $('#feedWaterId').val(getSavedData_sf.feedWaterId);
        $(".strainerPopUp input[name=recoveryId]").val(getSavedData_sf.recoveryId);
        $(".strainerPopUp textarea[name=sf_Note]").val(getSavedData_sf.sf_Note);
    }else{
		$(".strainerPopUp input[name=recoveryId]").val('');
		$('#feedwaterFilter').show();
		$('#applicationId').val('Select');
		$('#feedWaterId').val('Select');
	}
});

$('body').on('click', '.strainerPopUp .updateBtn', function (e) {
    var popUpId = $(this).parent().parent().attr('myId');
    var inputData = {};
    var validFlag = 0;
    $(".strainerPopUp input[name=recoveryId]").css('border', '1px solid #e1e2e5');
    $("#applicationId").css('border', '1px solid #e1e2e5');
    $("#feedWaterId").css('border', '1px solid #e1e2e5');
	
    if($("#applicationId").val() == "Select" ){
        validFlag = 1;
        $("#applicationId").css('border', '1px solid red');
    }
	if($("#feedWaterId").val() == "Select" ){
        validFlag = 1;
        $("#feedWaterId").css('border', '1px solid red');
    }
    if ($(".strainerPopUp input[name=recoveryId]").val() == "" || $(".strainerPopUp input[name=recoveryId]").val()<0 || $(".strainerPopUp input[name=recoveryId]").val()>100) {
        validFlag = 1;
        $(".strainerPopUp input[name=recoveryId]").css('border', '1px solid red');
    }
    
    
    //if (validFlag == 0) {
        inputData.applicationId = $('#applicationId').val();

        inputData.totalFeedFlowId = $(".strainerPopUp input[name=totalFeedFlowId]").val();
        inputData.feedWaterId = $('#feedWaterId').val();
        inputData.recoveryId = $(".strainerPopUp input[name=recoveryId]").val();
        inputData.sf_Note = $(".strainerPopUp textarea[name=sf_Note]").val();
        localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(sfFormArrya.indexOf(popUpId) === -1) {
            sfFormArrya.push(popUpId);            
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
$('body').on('change', '.strainerPopUp #applicationId', function () {
    if(this.value=='Non MBR')
    {
        $('#feedwaterFilter').show();
    }
    else
    $('#feedwaterFilter').hide();
});

$(document).on('change', '.strainerPopUp input', function () {
	var num = this.value.match(/^[0-9.]+$/);
    if (num === null) {
	// If we have no match, value will be empty.
	this.value = "";
	}
});

//on Enter press next input 
$(document).on('keypress', '.strainerPopUp input,.strainerPopUp select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
