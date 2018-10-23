var total_Cations = 0;
var total_Anions = 0;
var totalCations_meqI = 0;
var totalCations_ppm = 0;
var totalAnions_meqI = 0;
var totalAnions_ppm = 0;
var feedMWArray = [40.078,24.305,22.99,39.098,18.038,137.327,87.62,55.845,1,62.004,96.064,35.453,18.998,62.004,79.904,94.971,10.811,60.084,34.082,61.017,44.01,60.009,1];
var feedValArray = [2,2,1,1,1,2,2,2,2,0,2,1,1,1,1,3,0,0,0,1,0,2,0];
var currentFeedId ;


function feedCalculation(i, el){

	$('#feedTableNew tr').each(function(index){
		var thisMGI, thisMEQI, thisPPMCaco3 ;
		 		
		//totalCations
		
		$(this).find('td').each(function(i){
			var $this = $(this);

			if(i == 1){				
				thisMGI = $($this).find('.feedInput').val();
				
				if(index <=9){
					total_Cations = Number(total_Cations) + Number(thisMGI);
					$('.totalCations').val(total_Cations);
				}else if(index > 10 && index < 23){
					total_Anions =  Number(total_Anions) + Number(thisMGI);
					$('.totalAnions').val(total_Anions);
				}
				
				thisMEQI = Number((thisMGI * feedValArray[index - 1])/feedMWArray[index - 1]);
				if(index <=9){
					totalCations_meqI = totalCations_meqI + thisMEQI;
				}else if(index > 10 && index < 23){
					totalAnions_meqI = totalAnions_meqI + thisMEQI;
				}
				thisPPMCaco3 = Number(thisMEQI *50);
				if(index <=9){
					totalCations_ppm = totalCations_ppm + thisPPMCaco3;
				}else if(index > 10 && index < 23){
					totalAnions_ppm = totalAnions_ppm + thisPPMCaco3;
				}
			}
			if(i == 2){
				$($this).text(thisMEQI.toFixed(2));
				$('.totalCations_meqI').text(totalCations_meqI.toFixed(2));
				$('.totalAnions_meqI').text(totalAnions_meqI.toFixed(2));
			}
			if(i == 3){
				$($this).text(thisPPMCaco3.toFixed(2));
				$('.totalCations_ppm').text(totalCations_ppm.toFixed(2));
				$('.totalAnions_ppm').text(totalAnions_ppm.toFixed(2));
			}
		});
				
	});	
}
$('body').on('change', '.feedInput', function(){
	total_Cations = 0;
	total_Anions = 0;
	totalCations_meqI = 0;
	totalCations_ppm = 0;
	totalAnions_meqI = 0;
	totalAnions_ppm = 0;
	feedCalculation();
	feedParametresCal();
});

//Feed form input click empty value
/* $('body').on('click', '.feedInput', function(){
	this.select();
}); */

function feedParametresCal(){
	var tdsTotdal = 0;
	var feed_flow = $(".FeedPopUp input[name=feed_flow]").val();
	var feed_Temperature = $(".FeedPopUp input[name=feed_Temperature]").val();
	var feed_Pressure = $(".FeedPopUp input[name=feed_Pressure]").val();
	var feed_Total_Akalinity = $(".FeedPopUp input[name=feed_Total_Akalinity]").val();
	var feed_pH = $(".FeedPopUp input[name=feed_pH]").val();
	var feed_TSS = $(".FeedPopUp input[name=feed_TSS]").val();
	var feed_TOC = $(".FeedPopUp input[name=feed_TOC]").val();
	var feed_DOC = $(".FeedPopUp input[name=feed_DOC]").val();
	var feed_COD = $(".FeedPopUp input[name=feed_COD]").val();
	var feed_TKN = $(".FeedPopUp input[name=feed_TKN]").val();
	var feed_Turbidity = $(".FeedPopUp input[name=feed_Turbidity]").val();
	var feed_Color = $(".FeedPopUp input[name=feed_Color]").val();
	tdsTotdal = Number(total_Cations) + Number(total_Anions) + Number(1.22) * Number(feed_Total_Akalinity); 
	
	$('.tdsTotal').val(tdsTotdal);
}
$('body').on('change', '.feedparam', function(){
	feedParametresCal();
});

$('body').on('click', '#feedPopUp .clrBtn', function () {
	
	$('#feedTableNew tbody tr td input').val(0);
	total_Cations = 0;
	total_Anions = 0;
	totalCations_meqI = 0;
	totalCations_ppm = 0;
	feedCalculation();
});

//Feed Form Validations
$('body').on('click', '.Feed', function(){
	$('.feedInputCont').show();
	$('.feedOutput').hide();
	$('#feedOutput').hide();
	$('#backToInput').hide();
	var id=$(this).attr('id');
	inputErrorRemove('FeedPopUp');
	$('.FeedPopUp').removeClass('dispNone');
	$('.FeedPopUp').show();
	$('.popUpTabError').text('');
	$('.FeedPopUp .body ul.nav li').removeClass('active');
	$('.FeedPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.FeedPopUp .body .Input').removeClass('dispNone');
	$('.FeedPopUp .body .Output').addClass('dispNone');
	$('.FeedPopUp .body .Note').addClass('dispNone');
	$('.FeedPopUp .body .Calculation').addClass('dispNone');
	//$('.co2Popup div .popTitle').text(id); totalAnions_Feed
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.FeedPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.FeedPopUp div .popTitle').text(gateTitle);
	$('.FeedPopUp').attr("myId", id);
	if(localStorage.getItem(id) !== null){
		getSavedData_Feed = JSON.parse(localStorage.getItem(''+id+''));
		$(".FeedPopUp input[name=calcium_Feed]").val(getSavedData_Feed.calcium_Feed);
		$(".FeedPopUp input[name=magnesium_Feed]").val(getSavedData_Feed.magnesium_Feed);
		$(".FeedPopUp input[name=Sodium_Feed]").val(getSavedData_Feed.Sodium_Feed);
		$(".FeedPopUp input[name=Potassium_Feed]").val(getSavedData_Feed.Potassium_Feed);
		$(".FeedPopUp input[name=Ammonia_Feed]").val(getSavedData_Feed.Ammonia_Feed);
		$(".FeedPopUp input[name=Barium_Feed]").val(getSavedData_Feed.Barium_Feed);
		$(".FeedPopUp input[name=Strontium_Feed]").val(getSavedData_Feed.Strontium_Feed);
		$(".FeedPopUp input[name=Iron_Feed]").val(getSavedData_Feed.Iron_Feed);
		$(".FeedPopUp input[name=Maganese_Feed]").val(getSavedData_Feed.Maganese_Feed);
		$(".FeedPopUp input[name=totalCations_Feed]").val(getSavedData_Feed.totalCations_Feed);
		$(".FeedPopUp input[name=Sulfate_Feed]").val(getSavedData_Feed.Sulfate_Feed);
		$(".FeedPopUp input[name=Chloride_Feed]").val(getSavedData_Feed.Chloride_Feed);
		$(".FeedPopUp input[name=Fluoride_Feed]").val(getSavedData_Feed.Fluoride_Feed);
		$(".FeedPopUp input[name=Nitrate_Feed]").val(getSavedData_Feed.Nitrate_Feed);
		$(".FeedPopUp input[name=Bromide_Feed]").val(getSavedData_Feed.Bromide_Feed);
		$(".FeedPopUp input[name=Phosphate_Feed]").val(getSavedData_Feed.Phosphate_Feed);
		$(".FeedPopUp input[name=Boron_Feed]").val(getSavedData_Feed.Boron_Feed);
		$(".FeedPopUp input[name=Silica_Feed]").val(getSavedData_Feed.Silica_Feed);
		$(".FeedPopUp input[name=hydrogenSulphide_Feed]").val(getSavedData_Feed.hydrogenSulphide_Feed);
		$(".FeedPopUp input[name=Bicarbonate_Feed]").val(0);
		$(".FeedPopUp input[name=carbonDiOxide_Feed]").val(0);
		$(".FeedPopUp input[name=carbonate_Feed]").val(0);
		$(".FeedPopUp input[name=totalAnions_Feed]").val(getSavedData_Feed.totalAnions_Feed);
		$(".FeedPopUp input[name=feed_flow]").val(getSavedData_Feed.feed_flow);
		$(".FeedPopUp input[name=feed_Temperature]").val(getSavedData_Feed.feed_Temperature);
		$(".FeedPopUp input[name=feed_Pressure]").val(getSavedData_Feed.feed_Pressure);
		$(".FeedPopUp input[name=feed_Total_Akalinity]").val(getSavedData_Feed.feed_Total_Akalinity);
		$(".FeedPopUp input[name=feed_pH]").val(getSavedData_Feed.feed_pH);
		$(".FeedPopUp input[name=feed_TSS]").val(getSavedData_Feed.feed_TSS);
		$(".FeedPopUp input[name=feed_TOC]").val(getSavedData_Feed.feed_TOC);
		$(".FeedPopUp input[name=feed_DOC]").val(getSavedData_Feed.feed_DOC);
		$(".FeedPopUp input[name=feed_COD]").val(getSavedData_Feed.feed_COD);
		$(".FeedPopUp input[name=feed_TKN]").val(getSavedData_Feed.feed_TKN);
		$(".FeedPopUp input[name=feed_Turbidity]").val(getSavedData_Feed.feed_Turbidity);
		$(".FeedPopUp input[name=feed_Color]").val(getSavedData_Feed.feed_Color);
		$(".FeedPopUp input[name=feed_TDS]").val(getSavedData_Feed.feed_TDS);

		feedCalculation();
	}else{
		$(".FeedPopUp input[name=calcium_Feed]").val(0);
		$(".FeedPopUp input[name=magnesium_Feed]").val(0);
		$(".FeedPopUp input[name=Sodium_Feed]").val(0);
		$(".FeedPopUp input[name=Potassium_Feed]").val(0);
		$(".FeedPopUp input[name=Ammonia_Feed]").val(0);
		$(".FeedPopUp input[name=Barium_Feed]").val(0);
		$(".FeedPopUp input[name=Strontium_Feed]").val(0);
		$(".FeedPopUp input[name=Iron_Feed]").val(0);
		$(".FeedPopUp input[name=Maganese_Feed]").val(0);
		$(".FeedPopUp input[name=totalCations_Feed]").val(0);
		$(".FeedPopUp input[name=Sulfate_Feed]").val(0);
		$(".FeedPopUp input[name=Chloride_Feed]").val(0);
		$(".FeedPopUp input[name=Fluoride_Feed]").val(0);
		$(".FeedPopUp input[name=Nitrate_Feed]").val(0);
		$(".FeedPopUp input[name=Bromide_Feed]").val(0);
		$(".FeedPopUp input[name=Phosphate_Feed]").val(0);
		$(".FeedPopUp input[name=Boron_Feed]").val(0);
		$(".FeedPopUp input[name=Silica_Feed]").val(0);
		$(".FeedPopUp input[name=hydrogenSulphide_Feed]").val(0);
		$(".FeedPopUp input[name=Bicarbonate_Feed]").val(0);
		$(".FeedPopUp input[name=carbonDiOxide_Feed]").val(0);
		$(".FeedPopUp input[name=carbonate_Feed]").val(0);
		$(".FeedPopUp input[name=totalAnions_Feed]").val(0);
		$(".FeedPopUp input[name=feed_flow]").val('');
		$(".FeedPopUp input[name=feed_Temperature]").val('');
		$(".FeedPopUp input[name=feed_Pressure]").val('');
		$(".FeedPopUp input[name=feed_Total_Akalinity]").val('');
		$(".FeedPopUp input[name=feed_pH]").val('');
		$(".FeedPopUp input[name=feed_TSS]").val(0);
		$(".FeedPopUp input[name=feed_TOC]").val(0);
		$(".FeedPopUp input[name=feed_DOC]").val(0);
		$(".FeedPopUp input[name=feed_COD]").val(0);
		$(".FeedPopUp input[name=feed_TKN]").val(0);
		$(".FeedPopUp input[name=feed_Turbidity]").val(0);
		$(".FeedPopUp input[name=feed_Color]").val(0);
		$(".FeedPopUp input[name=feed_TDS]").val(0);
		$('#feedTableNew tbody tr td input').val(0);
		total_Cations = 0;
		total_Anions = 0;
		totalCations_meqI = 0;
		totalCations_ppm = 0;
		feedCalculation();
		$('#feedTableNew .totalAnions_meqI').text('0.00');
		$('#feedTableNew .totalAnions_ppm').text('0.00');
	}

	if(executionFlag == true){
		currentFeedId = id;
		$('#feedOutput').show();
		//feedCalculation();
	}else{
		$('#feedOutput').hide();
	}
});


$('body').on('click','.FeedPopUp .updateBtn', function(e){
	var validFlag = 0;
	$('.popUpTabError').text('');
	$(".FeedPopUp input[name=calcium_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=magnesium_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Sodium_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Potassium_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Ammonia_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Barium_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Strontium_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Iron_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Maganese_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=totalCations_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Sulfate_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Chloride_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Fluoride_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Nitrate_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Bromide_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Phosphate_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Boron_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=Silica_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=hydrogenSulphide_Feed]").css('border','1px solid #e1e2e5');
	//$(".FeedPopUp input[name=Bicarbonate_Feed]").css('border','1px solid #e1e2e5');
	//$(".FeedPopUp input[name=carbonDiOxide_Feed]").css('border','1px solid #e1e2e5');
	//$(".FeedPopUp input[name=carbonate_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=totalAnions_Feed]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_flow]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_Temperature]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_Pressure]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_Total_Akalinity]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_pH]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_TSS]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_TOC]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_DOC]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_COD]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_TKN]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_Turbidity]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_Color]").css('border','1px solid #e1e2e5');
	$(".FeedPopUp input[name=feed_TDS]").css('border','1px solid #e1e2e5');
	
	if($(".FeedPopUp input[name=calcium_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=calcium_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=magnesium_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=magnesium_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Sodium_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Sodium_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Ammonia_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Ammonia_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Barium_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Barium_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Strontium_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Strontium_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Iron_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Iron_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Maganese_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Maganese_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=totalCations_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=totalCations_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Sulfate_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Sulfate_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Chloride_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Chloride_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Fluoride_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Fluoride_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Nitrate_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Nitrate_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Bromide_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Bromide_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Phosphate_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Phosphate_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Boron_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Boron_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=Silica_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Silica_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=hydrogenSulphide_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=hydrogenSulphide_Feed]").css('border','1px solid red');
	}
	/* if($(".FeedPopUp input[name=Bicarbonate_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=Bicarbonate_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=carbonDiOxide_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=carbonDiOxide_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=carbonate_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=carbonate_Feed]").css('border','1px solid red');
	} */
	if($(".FeedPopUp input[name=totalAnions_Feed]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=totalAnions_Feed]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_flow]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_flow]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_Temperature]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_Temperature]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_Pressure]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_Pressure]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_Total_Akalinity]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_Total_Akalinity]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_pH]").val() == "" || ($(".FeedPopUp input[name=feed_pH]").val() < 0 || $(".FeedPopUp input[name=feed_pH]").val() > 14)){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_pH]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_TSS]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_TSS]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_TOC]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_TOC]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_DOC]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_DOC]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_COD]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_COD]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_TKN]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_TKN]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_Turbidity]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_Turbidity]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_Color]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_Color]").css('border','1px solid red');
	}
	if($(".FeedPopUp input[name=feed_TDS]").val() == ""){
		validFlag = 1;
		$(".FeedPopUp input[name=feed_TDS]").css('border','1px solid red');
	}
	
	
	
	//if(validFlag == 0){
		var popUpId = $(this).parent().parent().attr('myId');
		var inputData = {};
		inputData.calcium_Feed = $(".FeedPopUp input[name=calcium_Feed]").val();
		inputData.magnesium_Feed = $(".FeedPopUp input[name=magnesium_Feed]").val();
		inputData.Sodium_Feed = $(".FeedPopUp input[name=Sodium_Feed]").val();
		inputData.Potassium_Feed = $(".FeedPopUp input[name=Potassium_Feed]").val();
		inputData.Ammonia_Feed = $(".FeedPopUp input[name=Ammonia_Feed]").val();
		inputData.Barium_Feed = $(".FeedPopUp input[name=Barium_Feed]").val();
		inputData.Strontium_Feed = $(".FeedPopUp input[name=Strontium_Feed]").val();
		inputData.Iron_Feed = $(".FeedPopUp input[name=Iron_Feed]").val();
		inputData.Maganese_Feed = $(".FeedPopUp input[name=Maganese_Feed]").val();
		inputData.totalCations_Feed = $(".FeedPopUp input[name=totalCations_Feed]").val();
		inputData.Sulfate_Feed = $(".FeedPopUp input[name=Sulfate_Feed]").val();
		inputData.Chloride_Feed = $(".FeedPopUp input[name=Chloride_Feed]").val();
		inputData.Fluoride_Feed = $(".FeedPopUp input[name=Fluoride_Feed]").val();
		inputData.Nitrate_Feed = $(".FeedPopUp input[name=Nitrate_Feed]").val();
		inputData.Bromide_Feed = $(".FeedPopUp input[name=Bromide_Feed]").val();
		inputData.Phosphate_Feed = $(".FeedPopUp input[name=Phosphate_Feed]").val();
		inputData.Boron_Feed = $(".FeedPopUp input[name=Boron_Feed]").val();
		inputData.Silica_Feed = $(".FeedPopUp input[name=Silica_Feed]").val();
		inputData.hydrogenSulphide_Feed = $(".FeedPopUp input[name=hydrogenSulphide_Feed]").val();
		inputData.Bicarbonate_Feed = "0";
		inputData.carbonDiOxide_Feed = "0";
		inputData.carbonate_Feed = "0";
		inputData.totalAnions_Feed = $(".FeedPopUp input[name=totalAnions_Feed]").val();
		inputData.feed_flow = $(".FeedPopUp input[name=feed_flow]").val();
		inputData.feed_Temperature = $(".FeedPopUp input[name=feed_Temperature]").val();
		inputData.feed_Pressure = $(".FeedPopUp input[name=feed_Pressure]").val();
		inputData.feed_Total_Akalinity = $(".FeedPopUp input[name=feed_Total_Akalinity]").val();
		inputData.feed_pH = $(".FeedPopUp input[name=feed_pH]").val();
		inputData.feed_TSS = $(".FeedPopUp input[name=feed_TSS]").val();
		inputData.feed_TOC = $(".FeedPopUp input[name=feed_TOC]").val();
		inputData.feed_DOC = $(".FeedPopUp input[name=feed_DOC]").val();
		inputData.feed_COD = $(".FeedPopUp input[name=feed_COD]").val();
		inputData.feed_TKN = $(".FeedPopUp input[name=feed_TKN]").val();
		inputData.feed_Turbidity = $(".FeedPopUp input[name=feed_Turbidity]").val();
		inputData.feed_Color = $(".FeedPopUp input[name=feed_Color]").val();
		inputData.feed_TDS = $(".FeedPopUp input[name=feed_TDS]").val();
		
		localStorage.setItem(popUpId,  JSON.stringify(inputData));
		
		if(feedFormArray.indexOf(popUpId) === -1){
			feedFormArray.push(popUpId);
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
	}*/	
});

//Output
function getFeedOutputData(name){
	$('.feedInputCont').hide();
	$('.feedOutput').show();
	$('#feedOutputTable tbody').empty();
	var fs = require('fs');
	var XLSX = require('xlsx');
	var reader = new FileReader();
	var workbook = XLSX.readFile('C:/iFSD/Data/iFSDSheet.xlsx', { sheetStubs: true });
	//var workbook = XLSX.readFile('C:/iFSD/Data/iFSDSheet-feed_sf_cf_ro_31July-Before.xlsx', { sheetStubs: true });
	var sheet_name_list = workbook.SheetNames;
	//read the sheet unitop_output
	var excelData = XLSX.utils.sheet_to_json(workbook.Sheets["unitop_output"]);
	var obj = excelData[0];
	var indexAndUnitOpMap = [];
	var indexForMap = 0;
	for (var key in obj) {
		if (indexForMap % 2 != 0)
			indexAndUnitOpMap[indexForMap] = key;
		indexForMap++;
	}

	var prevSearchText = '';
	var feedStart = 0;
	for (var i = 0; i < excelData.length; i++) {
		var obj1 = excelData[i];
		for (var key1 in obj1) {
			var k;
			for (k = 0; k < indexAndUnitOpMap.length; k++) {
				if (indexAndUnitOpMap[k] == key1)
					break;
			}
			searchText = obj1[key1];
			if (parseFloat(obj1[key1]) >= 0 && !isNaN(obj1[key1]))
				obj1[key1] = parseFloat(obj1[key1]).toFixed(2);

			if (indexAndUnitOpMap[k] != undefined) {
				if (name == indexAndUnitOpMap[k]) {
					if(obj1["Unitop Name"] != "Unitop Type"){
						var tdata = '';
						tdata += '<tr>'+
						'<td width="45%">'+obj1["Unitop Name"]+'</td>'+
						'<td width="25%">'+ obj1[key1] +'</td>'+
						'<td>mg/l</td>'+
						'</tr>';
						$('#feedOutputTable tbody').append(tdata);
					}					
					$('#backToInput').show();
					$('#feedOutput').hide();
				}
			}
		}
	}
}

//on Enter press next input 
$(document).on('keypress', '.FeedPopUp input,.FeedPopUp select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(document.activeElement) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});
//Feed output
$(document).on('click', '#feedOutput', function (e) {
	if(currentFeedId){
		getFeedOutputData(currentFeedId);
	}
});
$(document).on('click', '#backToInput', function (e) {
	$('#backToInput').hide();
	$('#feedOutput').show();
	$('.feedInputCont').show();
	$('.feedOutput').hide();
});

