$('body').on('click', '.Tank-Splitter', function(){
	var id=$(this).attr('id');
	$('.tankSplitterPopup').removeClass('dispNone');
	$('.tankSplitterPopup').show();
	$('.popUpTabError').text('');
	$('.tankSplitterPopup .body ul.nav li').removeClass('active');
	$('.tankSplitterPopup .body ul.nav li:eq(0)').addClass('active');
	$('.tankSplitterPopup .body .Input').removeClass('dispNone');
	$('.tankSplitterPopup .body .Output').addClass('dispNone');
	$('.tankSplitterPopup .body .Note').addClass('dispNone');
	$('.tankSplitterPopup .body .Calculation').addClass('dispNone');

	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	tank_outPutStream = getOutputStreams(gateUserTitle);
	tank_outPutStreamLength = tank_outPutStream.length;

	if(gateUserTitle)
	$('.tankSplitterPopup div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.tankSplitterPopup div .popTitle').text(gateTitle);
	$('.tankSplitterPopup').attr("myId", id);

	$(".tankSplitterPopup input[name=tank_numberOfOutletStreams]").val(tank_outPutStreamLength);
	$('#tankSplitterTable tr.streams').remove();
	var spliterTable = '';
	
/* 	$('#splitterTable tr.streams input').each(function() {
		
	}); */
	if(localStorage.getItem(id) !== null){
		getSavedData_splitter = JSON.parse(localStorage.getItem(''+id+''));
		for(var m=0; m<getSavedData_splitter.tank_splitterStreams.length; m++){
			if(m != (getSavedData_splitter.tank_splitterStreams.length-1)){
			spliterTable += '<tr class="streams"><td>Stream '+tank_outPutStream[m]+'</td><td><input type="number" class="splitterStream" name="stream_'+tank_outPutStream[m]+'" value="'+getSavedData_splitter.tank_splitterStreams[m]+'" /></td><td></td></tr>';
			}else{
				spliterTable += '<tr class="streams"><td>Stream '+tank_outPutStream[m]+'</td><td><input type="number" name="stream_'+tank_outPutStream[m]+'" class="splitterStream splitterStreamTotal"  value="'+getSavedData_splitter.tank_splitterStreams[m]+'" /></td><td></td></tr>';
			}
		}
		$('#tankSplitterTable').append(spliterTable);
	}else{

		for(var m=0; m<tank_outPutStream.length; m++){
			if(m != (tank_outPutStream.length-1)){
			spliterTable += '<tr class="streams"><td>Stream '+tank_outPutStream[m]+'</td><td><input type="number" name="stream_'+tank_outPutStream[m]+'" class="splitterStream" /></td><td></td></tr>';
			}else{
				spliterTable += '<tr class="streams"><td>Stream '+tank_outPutStream[m]+'</td><td><input type="number" name="stream_'+tank_outPutStream[m]+'" class="splitterStream splitterStreamTotal"  /></td><td></td></tr>';
			}
		}
		$('#tankSplitterTable').append(spliterTable);
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

$('body').on('click','.tankSplitterPopup .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	$(".tankSplitterPopup input[name=tank_numberOfOutletStreams]").css('border','1px solid #e1e2e5');
	$(".tankSplitterPopup input[name=stream1]").css('border','1px solid #e1e2e5');
	$(".tankSplitterPopup input[name=stream2]").css('border','1px solid #e1e2e5');
	
	if($(".tankSplitterPopup input[name=tank_numberOfOutletStreams]").val() == ""){
		validFlag = 1;
		$(".tankSplitterPopup input[name=tank_numberOfOutletStreams]").css('border','1px solid red');
	}
	if($(".tankSplitterPopup input[name=stream1]").val() == ""){
		validFlag = 1;
		$(".tankSplitterPopup input[name=stream1]").css('border','1px solid red');
	}


	
	//if(validFlag == 0){ 
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};
		inputData.tank_numberOfOutletStreams = $(".tankSplitterPopup input[name=tank_numberOfOutletStreams]").val();
		var tank_splitterStreamArray = [];
		$(".splitterStream").each(function(){
			var thisVal = $(this).val();
			tank_splitterStreamArray.push(thisVal);
		});
		inputData.tank_splitterStreams = tank_splitterStreamArray;
		var tank_outPutStreamArray = [];
		for(var g=0; g<tank_outPutStream.length;g++){
			tank_outPutStreamArray.push(tank_outPutStream[g]);
		};
		inputData.tank_outPutStreamArray = tank_outPutStreamArray;
		inputData.tank_outPutStreamLength = tank_outPutStreamLength;
/* 		inputData.stream1 = $(".tankSplitterPopup input[name=stream1]").val();  splitterStreams
		inputData.stream2 = $(".tankSplitterPopup input[name=stream2]").val(); */
		
		localStorage.setItem(popUpId, JSON.stringify(inputData));
		if(tank_splitterFormArray.indexOf(popUpId) === -1) {
			tank_splitterFormArray.push(popUpId);
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



$('body').on("change", ".tankSplitterPopup .splitterStream", function(){
	
	if($(this).val() >1){
		$('.popUpTabError').text('Split Fraction can not be more than 1.');
		$(this).val('');
	}else{
		if(tank_outPutStreamLength > 1){
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
				$(".tankSplitterPopup .splitterStreamTotal").val(sumMinus1.toFixed(2));
			}
		}
	}
});
