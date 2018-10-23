$('body').on('click', '.Splitter', function(){
	var id=$(this).attr('id');
	inputErrorRemove('splitterPopup');
	$('.splitterPopup').removeClass('dispNone');
	$('.splitterPopup').show();
	$('.popUpTabError').text('');
	$('.splitterPopup .body ul.nav li').removeClass('active');
	$('.splitterPopup .body ul.nav li:eq(0)').addClass('active');
	$('.splitterPopup .body .Input').removeClass('dispNone');
	$('.splitterPopup .body .Output').addClass('dispNone');
	$('.splitterPopup .body .Note').addClass('dispNone');
	$('.splitterPopup .body .Calculation').addClass('dispNone');

	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	outPutStream = getOutputStreams(gateUserTitle);
	outPutStreamLength = outPutStream.length;

	if(gateUserTitle)
	$('.splitterPopup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.splitterPopup div .popTitle').text(gateTitle);
	$('.splitterPopup').attr("myId", id);
	$("#chemicalSelection").val('');
	$("#chemicalSelection").val($("#chemicalSelection option:first").val());
	$(".splitterPopup input[name=numberOfOutletStreams]").val(outPutStreamLength);
	$('#splitterTable tr.streams').remove();
	var spliterTable = '';
	
/* 	$('#splitterTable tr.streams input').each(function() {
		
	}); */
	if(localStorage.getItem(id) !== null){
		getSavedData_splitter = JSON.parse(localStorage.getItem(''+id+''));
		for(var m=0; m<getSavedData_splitter.splitterStreams.length; m++){
			if(m != (getSavedData_splitter.splitterStreams.length-1)){
			spliterTable += '<tr class="streams"><td>Stream '+outPutStream[m]+'</td><td><input type="number" class="splitterStream" name="stream_'+outPutStream[m]+'" value="'+getSavedData_splitter.splitterStreams[m]+'" /></td><td></td></tr>';
			}else{
				spliterTable += '<tr class="streams"><td>Stream '+outPutStream[m]+'</td><td><input type="number" name="stream_'+outPutStream[m]+'" class="splitterStream splitterStreamTotal"  value="'+getSavedData_splitter.splitterStreams[m]+'" /></td><td></td></tr>';
			}
		}
		$('#splitterTable').append(spliterTable);
	}else{

		for(var m=0; m<outPutStream.length; m++){
			if(m != (outPutStream.length-1)){
			spliterTable += '<tr class="streams"><td>Stream '+outPutStream[m]+'</td><td><input type="number" name="stream_'+outPutStream[m]+'" class="splitterStream" /></td><td></td></tr>';
			}else{
				spliterTable += '<tr class="streams"><td>Stream '+outPutStream[m]+'</td><td><input type="number" name="stream_'+outPutStream[m]+'" class="splitterStream splitterStreamTotal"  /></td><td></td></tr>';
			}
		}
		$('#splitterTable').append(spliterTable);
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
});

$('body').on('click','.splitterPopup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	$(".splitterPopup input[name=numberOfOutletStreams]").css('border','1px solid #e1e2e5');
	$(".splitterPopup input[name=stream1]").css('border','1px solid #e1e2e5');
	$(".splitterPopup input[name=stream2]").css('border','1px solid #e1e2e5');
	
	if($(".splitterPopup input[name=numberOfOutletStreams]").val() == ""){
		validFlag = 1;
		$(".splitterPopup input[name=numberOfOutletStreams]").css('border','1px solid red');
	}
	if($(".splitterPopup input[name=stream1]").val() == ""){
		validFlag = 1;
		$(".splitterPopup input[name=stream1]").css('border','1px solid red');
	}


	
	//if(validFlag == 0){
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};
		inputData.numberOfOutletStreams = $(".splitterPopup input[name=numberOfOutletStreams]").val();
		var splitterStreamArray = [];
		$(".splitterStream").each(function(){
			var thisVal = $(this).val();
			splitterStreamArray.push(thisVal);
		});
		inputData.splitterStreams = splitterStreamArray;
		var outPutStreamArray = [];
		for(var g=0; g<outPutStream.length;g++){
			outPutStreamArray.push(outPutStream[g]);
		};
		inputData.outPutStreamArray = outPutStreamArray;
		inputData.outPutStreamLength = outPutStreamLength;
/* 		inputData.stream1 = $(".splitterPopup input[name=stream1]").val();
		inputData.stream2 = $(".splitterPopup input[name=stream2]").val(); */
		
		localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(splitterFormArray.indexOf(popUpId) === -1) {
			splitterFormArray.push(popUpId);			
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



$('body').on("change", ".splitterPopup .splitterStream", function(){
	
	if($(this).val() >1){
		$('.popUpTabError').text('Split Fraction can not be more than 1.');
		$(this).val('');
	}else{
		if(outPutStreamLength > 1){
			var sum = 0;
			$(".splitterStream").each(function(){
				/* if(splitterLength > 0){
					splitterCount = splitterLength;
				}
				console.log(splitterCount); */
				if($(this).val()){
					$(this).css('border','1px solid #e1e2e5');
				}
				sum += +$(this).val();
			});
			if(sum > 1){
				$('.popUpTabError').text('Sum of Split Fraction Can not be more than 1.');
				$(".splitterStream").each(function(){
					$(this).val('');
					$(".splitterStreamTotal").val('');
				});
			}else{
				$('.popUpTabError').text('');
				var sumMinus1 = 1 - sum;
				$(".splitterPopup .splitterStreamTotal").val(sumMinus1.toFixed(2));
			}
		}
	}
});

//on Enter press next input 
$(document).on('keypress', '.splitterPopup input,.splitterPopup select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
