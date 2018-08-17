//EDI
var unitConverionDone=false;
$('body').on('click', '.CF', function () {	
	//$('.popUp :input[type="number"]').attr('step','any');
    var id = $(this).attr('id');
    $('.cfPopUp').removeClass('dispNone');
    $('.cfPopUp').show();
	$('.cfPopUp .body ul.nav li').removeClass('active');
	$('.cfPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.cfPopUp .Input').removeClass('dispNone');
	$('.cfPopUp .Output').addClass('dispNone');
	$('.cfPopUp .Note').addClass('dispNone');
	$('.cfPopUp .Documentation').addClass('dispNone');
    //$('.cfPopUp div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.cfPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.cfPopUp div .popTitle').text(gateTitle);
    $('.cfPopUp').attr("myId", id);
	$('.popUpTabError').text('');
    /* var table = $("table.inputTable tbody");
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
    }); */
	var table = $(".cfPopUp table.inputTable tbody");
	if(unitConverionDone==false){
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
		unitConverionDone	=	true;
	}

    if (localStorage.getItem(id) !== null) {
        getSavedData_cf = JSON.parse(localStorage.getItem('' + id + ''));
        //console.log("id" + JSON.stringify(getStoredData));
        $(".cfPopUp input[name=cftotalFeedFlowId]").val(getSavedData_cf.cftotalFeedFlowId);
        $("select[name=cffilterTypeOptions]").val(getSavedData_cf.cffilterTypeOptions);
        $(".cfPopUp input[name=cfflowTieId]").val(getSavedData_cf.cfflowTieId);
       // $(".cfPopUp textarea[name=cf_Note]").val(getSavedData_cf.cf_Note);
    }else{
		$(".cfPopUp input[name=cfflowTieId]").val('');
		$("select[name=cffilterTypeOptions]").val('RO.Zs 01-20');
	}
});

$('body').on('click', '.cfPopUp .updateBtn', function () {
    var popUpId = $(this).parent().parent().attr('myId');
    var inputData = {};
    var validFlag = 0;
    $(".cfPopUp input[name=cftotalFeedFlowId]").css('border', '1px solid #e1e2e5');
    $(".cfPopUp input[name=cfflowTieId]").css('border', '1px solid #e1e2e5');
    

    if ($(".cfPopUp input[name=cftotalFeedFlowId]").val() == "") {
        validFlag = 1;
        $(".cfPopUp input[name=cftotalFeedFlowId]").css('border', '1px solid red');
    }
    if ($(".cfPopUp input[name=cfflowTieId]").val() == "" ) {
        validFlag = 1;
        $(".cfPopUp input[name=cfflowTieId]").css('border', '1px solid red');
      
    }
    //if (validFlag == 0) {
        inputData.cftotalFeedFlowId = $(".cfPopUp input[name=cftotalFeedFlowId]").val();
        inputData.cffilterTypeOptions = $("select[name=cffilterTypeOptions]").val();
        inputData.cfflowTieId = $(".cfPopUp input[name=cfflowTieId]").val();
        inputData.cf_Note = $(".cfPopUp textarea[name=cf_Note]").val();
        
        localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(cfFormArray.indexOf(popUpId) === -1) {
            cfFormArray.push(popUpId);            
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

$(document).on('change', '.cfPopUp input', function () {
	var num = this.value.match(/^[0-9.]+$/);
    if (num === null) {
	// If we have no match, value will be empty.
	this.value = "";
	}
});