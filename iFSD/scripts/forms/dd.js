//EDI
var unitConverionDoneEdi=false;
$('body').on('click', '.DensaDeg', function () {
    //console.log("Inside fucntion");
    var id = $(this).attr('id');
    $('.ddPopUp').removeClass('dispNone');
    $('.ddPopUp').show();
	$('.ddPopUp .body ul.nav li').removeClass('active');
	$('.ddPopUp .body ul.nav li:eq(0)').addClass('active');
	$('.ddPopUp .Input').removeClass('dispNone');
	$('.ddPopUp .Output').addClass('dispNone');
	$('.ddPopUp .Note').addClass('dispNone');
    $('.ddPopUp .Documentation').addClass('dispNone');
    //$('.ddPopUp .steelTankNo').addClass('dispNone');

    //$('.ddPopUp div .popTitle').text(id);
	var gateTitle = $(this).find('.txt-elipse').text();
	var gateUserTitle = $(this).find('.edit').val();
	if(gateUserTitle)
	$('.ddPopUp div .popTitle').text(gateTitle +'-'+ gateUserTitle);
	else
	$('.ddPopUp div .popTitle').text(gateTitle);
    $('.ddPopUp').attr("myId", id);
    var table = $("table.inputTable tbody");
    $('.ddPopUp #elemType').trigger('change');
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

        //console.log("Id is as here====="+id);
		getSavedData_dd = JSON.parse(localStorage.getItem('' + id + ''));

        //$('.ddPopUp .steelTankNo').addClass('dispNone');
        if(getSavedData_dd.ddSt=='No'){
			$('.ddPopUp .steelTankNo').addClass('dispNone');
			$('.ddPopUp .steelTankYes').removeClass('dispNone');
		}
        else if(getSavedData_dd.ddSt=='Yes'){
			$('.ddPopUp .steelTankYes').addClass('dispNone');
			$('.ddPopUp .steelTankNo').removeClass('dispNone');
		}
        getSavedData_dd = JSON.parse(localStorage.getItem('' + id + ''));
        //console.log("id" + JSON.stringify(getStoredData));roFlux
        if(getSavedData_dd.ddSocrm=='Single')
        $('.ddPopUp .socrmSingle').addClass('dispNone');
        

        
        $(".ddPopUp input[name=ddPf]").val(getSavedData_dd.ddPf);
        $(".ddPopUp select[name=ddApplication]").val(getSavedData_dd.ddApplication);
        $(".ddPopUp input[name=ddNou]").val(getSavedData_dd.ddNou);
        $(".ddPopUp select[name=ddMs]").val(getSavedData_dd.ddMs);
        $(".ddPopUp select[name=ddFrs]").val(getSavedData_dd.ddFrs);
        $(".ddPopUp input[name=ddHoa]").val(getSavedData_dd.ddHoa);
        $(".ddPopUp input[name=ddEtss]").val(getSavedData_dd.ddEtss);
        $(".ddPopUp select[name=ddCs]").val(getSavedData_dd.ddCs);
        $(".ddPopUp input[name=ddScd]").val(getSavedData_dd.ddScd);
        $(".ddPopUp input[name=ddEsc]").val(getSavedData_dd.ddEsc);
        $(".ddPopUp select[name=ddSt]").val(getSavedData_dd.ddSt);
        $(".ddPopUp select[name=ddStmoc]").val(getSavedData_dd.ddStmoc);
        $(".ddPopUp select[name=ddStp]").val(getSavedData_dd.ddStp);
        $(".ddPopUp select[name=ddStfi]").val(getSavedData_dd.ddStfi);
        $(".ddPopUp select[name=ddStfo]").val(getSavedData_dd.ddStfo);
        $(".ddPopUp select[name=ddStb]").val(getSavedData_dd.ddStb);
        $(".ddPopUp select[name=ddStl]").val(getSavedData_dd.ddStl);
        $(".ddPopUp select[name=ddIsm]").val(getSavedData_dd.ddIsm);
        $(".ddPopUp select[name=ddIsp]").val(getSavedData_dd.ddIsp);
        $(".ddPopUp select[name=ddIsf]").val(getSavedData_dd.ddIsf);
        $(".ddPopUp select[name=ddTmoc]").val(getSavedData_dd.ddTmoc);
        $(".ddPopUp select[name=ddLcp]").val(getSavedData_dd.ddLcp);
        $(".ddPopUp select[name=ddNoupp]").val(getSavedData_dd.ddNoupp);
        $(".ddPopUp select[name=ddLoc]").val(getSavedData_dd.ddLoc);
        $(".ddPopUp select[name=ddSmp]").val(getSavedData_dd.ddSmp);
        $(".ddPopUp select[name=ddSpm]").val(getSavedData_dd.ddSpm);
        $(".ddPopUp select[name=ddTnorp]").val(getSavedData_dd.ddTnorp);
        $(".ddPopUp select[name=ddTnosp]").val(getSavedData_dd.ddTnosp);
        $(".ddPopUp select[name=ddMv]").val(getSavedData_dd.ddMv);
        $(".ddPopUp input[name=ddMp]").val(getSavedData_dd.ddMp);
        $(".ddPopUp select[name=ddMf]").val(getSavedData_dd.ddMf);
        $(".ddPopUp select[name=ddVfd]").val(getSavedData_dd.ddVfd);
        $(".ddPopUp select[name=ddIios]").val(getSavedData_dd.ddIios);
        $(".ddPopUp select[name=ddEg]").val(getSavedData_dd.ddEg);
        $(".ddPopUp select[name=ddTom]").val(getSavedData_dd.ddTom);
        $(".ddPopUp select[name=ddWmoc]").val(getSavedData_dd.ddWmoc);
        $(".ddPopUp select[name=ddTod]").val(getSavedData_dd.ddTod);
        $(".ddPopUp select[name=ddOse]").val(getSavedData_dd.ddOse);
        $(".ddPopUp select[name=ddMm]").val(getSavedData_dd.ddMm);
        $(".ddPopUp select[name=ddTps]").val(getSavedData_dd.ddTps);
        $(".ddPopUp select[name=ddEpd]").val(getSavedData_dd.ddEpd);
        $(".ddPopUp select[name=ddBos]").val(getSavedData_dd.ddBos);
        $(".ddPopUp select[name=ddSocrm]").val(getSavedData_dd.ddSocrm);
        $(".ddPopUp select[name=ddCrmdt]").val(getSavedData_dd.ddCrmdt);
        $(".ddPopUp select[name=ddCrmipd]").val(getSavedData_dd.ddCrmipd);
        $(".ddPopUp input[name=ddFsld]").val(getSavedData_dd.ddFsld);
        $(".ddPopUp select[name=ddSrmdt]").val(getSavedData_dd.ddSrmdt);
        $(".ddPopUp select[name=ddSrmipd]").val(getSavedData_dd.ddSrmipd);
        $(".ddPopUp select[name=ddRmo]").val(getSavedData_dd.ddRmo);
        $(".ddPopUp select[name=ddPt]").val(getSavedData_dd.ddPt);
        $(".ddPopUp select[name=ddA]").val(getSavedData_dd.ddA);
        $(".ddPopUp select[name=ddR]").val(getSavedData_dd.ddR);
        $(".ddPopUp input[name=ddUf]").val(getSavedData_dd.ddUf);
        $(".ddPopUp input[name=ddTh]").val(getSavedData_dd.ddTh);
        $(".ddPopUp select[name=ddOts]").val(getSavedData_dd.ddOts);


    }else{

        $('.ddPopUp .steelTankNo').addClass('dispNone');
        $('.ddPopUp .socrmSingle').addClass('dispNone');
		
		$(".ddPopUp input[name=ddPf]").val('');
		$(".ddPopUp select[name=ddApplication]").val('Clarification');
		$(".ddPopUp select[name=ddNou]").val('');
		$(".ddPopUp input[name=ddNou]").val('');
		$(".ddPopUp select[name=ddMs]").val('#4');
		$(".ddPopUp select[name=ddFrs]").val('Design');
		$(".ddPopUp input[name=ddHoa]").val('');
		$(".ddPopUp input[name=ddEtss]").val('');
		$(".ddPopUp select[name=ddCs]").val('Ferric Chloride');
		$(".ddPopUp input[name=ddScd]").val('');
		$(".ddPopUp input[name=ddEsc]").val('');
		$(".ddPopUp select[name=ddSt]").val('No');
		$(".ddPopUp select[name=ddStmoc]").val('CS');
		$(".ddPopUp select[name=ddStp]").val('SP-6 + Prime');
		$(".ddPopUp select[name=ddStfi]").val('By Contractor');
		$(".ddPopUp select[name=ddStfo]").val('By Contractor');
		$(".ddPopUp select[name=ddStb]").val('By Contractor');
		$(".ddPopUp select[name=ddStl]").val('No');
		$(".ddPopUp select[name=ddIsm]").val('CS');
		$(".ddPopUp select[name=ddIsp]").val('SP-10 + Prime');
		$(".ddPopUp select[name=ddIsf]").val('By Contractor');
		$(".ddPopUp select[name=ddTmoc]").val('CS');
		$(".ddPopUp select[name=ddLcp]").val('Yes');
		$(".ddPopUp select[name=ddNoupp]").val('1');
		$(".ddPopUp select[name=ddLoc]").val('1');
		$(".ddPopUp select[name=ddSmp]").val('No');
		$(".ddPopUp select[name=ddSpm]").val('CS');
		$(".ddPopUp select[name=ddTnorp]").val('0');
		$(".ddPopUp select[name=ddTnosp]").val('0');
		$(".ddPopUp select[name=ddMv]").val('480');
		$(".ddPopUp input[name=ddMp]").val('3');
		$(".ddPopUp select[name=ddMf]").val('60');
		$(".ddPopUp select[name=ddVfd]").val('No');
		$(".ddPopUp select[name=ddIios]").val('Yes');
		$(".ddPopUp select[name=ddEg]").val('250');
		$(".ddPopUp select[name=ddTom]").val('TEFC');
		$(".ddPopUp select[name=ddTod]").val('VFD');
		$(".ddPopUp select[name=ddOse]").val('NEMA 4X');
		$(".ddPopUp select[name=ddMm]").val('Lightnin');
		$(".ddPopUp select[name=ddTps]").val('6');
		$(".ddPopUp select[name=ddEpd]").val('6');
		$(".ddPopUp select[name=ddBos]").val('Peak');
		$(".ddPopUp select[name=ddSocrm]").val('Single');
		$(".ddPopUp select[name=ddCrmdt]").val('2.00');
		$(".ddPopUp select[name=ddCrmipd]").val('6');
		$(".ddPopUp input[name=ddFsld]").val('4');
		$(".ddPopUp select[name=ddSrmdt]").val('2.00');
		$(".ddPopUp select[name=ddSrmipd]").val('6');
		$(".ddPopUp select[name=ddRmo]").val('#4');
		$(".ddPopUp select[name=ddPt]").val('Progressive Cavity');
		$(".ddPopUp select[name=ddA]").val('Municipal');
		$(".ddPopUp select[name=ddR]").val('5.00');
		$(".ddPopUp input[name=ddUf]").val('1.5');
		$(".ddPopUp input[name=ddTh]").val('1.5');
		$(".ddPopUp select[name=ddOts]").val('6');


		var table = $(".ddPopUp table.inputTable tbody");
		//if(unitConverionDone==false){
			table.find('tr').each(function (i) {
				var $tds = $(this).find('td'),
				getUnitType = $tds.eq(0).attr('unitType');
				if ($tds.eq(1).find('input').val() != '' && $tds.eq(1).find('input').val() != undefined) {
					var value2 = $tds.eq(2).text();
					var value1 = $tds.eq(1).find('input').val();
					console.log(value2+'Unit');
					if (value2 != '' && value2 != undefined && value1 != '' && value1 != undefined && getUnitType != '-'
					&& getUnitType != '' && getUnitType != undefined) {
					  console.log($tds.eq(1).find('input').attr('name'));

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

$('body').on('click', '.ddPopUp .updateBtn', function (e) {
    var popUpId = $(this).parent().parent().parent().attr('myid');
	
    var inputData = {};
    var validFlag = 0;
   
    $(".ddPopUp input[name=ddPf]").css('border', '1px solid #e1e2e5');
  //  $(".ddPopUp select[name=ddApplication]").val(getSavedData_dd.ddApplication);
    $(".ddPopUp input[name=ddNou]").css('border', '1px solid #e1e2e5');
   // $(".ddPopUp select[name=ddMs]").val(getSavedData_dd.ddMs);
   // $(".ddPopUp select[name=ddFrs]").val(getSavedData_dd.ddFrs);
    $(".ddPopUp input[name=ddHoa]").css('border', '1px solid #e1e2e5');
    $(".ddPopUp input[name=ddEtss]").css('border', '1px solid #e1e2e5');
    //$(".ddPopUp select[name=ddCs]").val(getSavedData_dd.ddCs);
    $(".ddPopUp input[name=ddScd]").css('border', '1px solid #e1e2e5');
    $(".ddPopUp input[name=ddEsc]").css('border', '1px solid #e1e2e5');
    //$(".ddPopUp select[name=ddSt]").val(getSavedData_dd.ddSt);
    //$(".ddPopUp select[name=ddStmoc]").val(getSavedData_dd.ddStmoc);
    //$(".ddPopUp select[name=ddStp]").val(getSavedData_dd.ddStp);
  /*  $(".ddPopUp select[name=ddStfi]").val(getSavedData_dd.ddStfi);
    $(".ddPopUp select[name=ddStfo]").val(getSavedData_dd.ddStfo);
    $(".ddPopUp select[name=ddStb]").val(getSavedData_dd.ddStb);
    $(".ddPopUp select[name=ddStl]").val(getSavedData_dd.ddStl);
    $(".ddPopUp select[name=ddIsm]").val(getSavedData_dd.ddIsm);
    $(".ddPopUp select[name=ddIsp]").val(getSavedData_dd.ddIsp);
    $(".ddPopUp select[name=ddIsf]").val(getSavedData_dd.ddIsf);
    $(".ddPopUp select[name=ddTmoc]").val(getSavedData_dd.ddTmoc);
    $(".ddPopUp select[name=ddLcp]").val(getSavedData_dd.ddLcp);
    $(".ddPopUp select[name=ddNoupp]").val(getSavedData_dd.ddNoupp);
    $(".ddPopUp select[name=ddLoc]").val(getSavedData_dd.ddLoc);
    $(".ddPopUp select[name=ddSmp]").val(getSavedData_dd.ddSmp);
    $(".ddPopUp select[name=ddSpm]").val(getSavedData_dd.ddSpm);
    $(".ddPopUp select[name=ddTnorp]").val(getSavedData_dd.ddTnorp);
    $(".ddPopUp select[name=ddTnosp]").val(getSavedData_dd.ddTnosp);
    $(".ddPopUp select[name=ddMv]").val(getSavedData_dd.ddMv);
   
   */
    $(".ddPopUp input[name=ddMp]").css('border', '1px solid #e1e2e5');
 /*   $(".ddPopUp select[name=ddMf]").val(getSavedData_dd.ddMf);
    $(".ddPopUp select[name=ddVfd]").val(getSavedData_dd.ddVfd);
    $(".ddPopUp select[name=ddIios]").val(getSavedData_dd.ddIios);
    $(".ddPopUp select[name=ddEg]").val(getSavedData_dd.ddEg);
    $(".ddPopUp select[name=ddTom]").val(getSavedData_dd.ddTom);
    $(".ddPopUp select[name=ddWmoc]").val(getSavedData_dd.ddWmoc);
    $(".ddPopUp select[name=ddTod]").val(getSavedData_dd.ddTod);
    $(".ddPopUp select[name=ddOse]").val(getSavedData_dd.ddOse);
    $(".ddPopUp select[name=ddMm]").val(getSavedData_dd.ddMm);
    $(".ddPopUp select[name=ddTps]").val(getSavedData_dd.ddTps);
    $(".ddPopUp select[name=ddEpd]").val(getSavedData_dd.ddEpd);
    $(".ddPopUp select[name=ddBos]").val(getSavedData_dd.ddBos);
    $(".ddPopUp select[name=ddSocrm]").val(getSavedData_dd.ddSocrm);
    $(".ddPopUp select[name=ddCrmdt]").val(getSavedData_dd.ddCrmdt);
    $(".ddPopUp select[name=ddCrmipd]").val(getSavedData_dd.ddCrmipd);
 */   $(".ddPopUp input[name=ddFsld]").css('border', '1px solid #e1e2e5');
 /*   $(".ddPopUp select[name=ddSrmdt]").val(getSavedData_dd.ddSrmdt);
    $(".ddPopUp select[name=ddSrmipd]").val(getSavedData_dd.ddSrmipd);
    $(".ddPopUp select[name=ddRmo]").val(getSavedData_dd.ddRmo);
    $(".ddPopUp select[name=ddPt]").val(getSavedData_dd.ddPt);
    $(".ddPopUp select[name=ddA]").val(getSavedData_dd.ddA);
    $(".ddPopUp select[name=ddR]").val(getSavedData_dd.ddR);
  */  $(".ddPopUp input[name=ddUf]").css('border', '1px solid #e1e2e5');
    $(".ddPopUp input[name=ddTh]").css('border', '1px solid #e1e2e5');
 //   $(".ddPopUp select[name=ddOts]").val(getSavedData_dd.ddOts);



	/*COnvert To standard Units before comparison*/
	//UnitConversion
	var table = $(".ddPopUp table.inputTable tbody");
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

    if ($(".ddPopUp input[name=roFeedFlowRate]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=roFeedFlowRate]").css('border', '1px solid red');
    }
 
    if ($(".ddPopUp input[name=ddPf]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddPf]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddNou]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddNou]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddHoa]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddHoa]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddEtss]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddEtss]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddScd]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddScd]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddEsc]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddEsc]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddMp]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddMp]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddFsld]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddFsld]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddUf]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddUf]").css('border', '1px solid red');
    }
    if ($(".ddPopUp input[name=ddTh]").val() == "") {
        validFlag = 1;
        $(".ddPopUp input[name=ddTh]").css('border', '1px solid red');
    }
    
	


    //if (validFlag == 0) {
        inputData.roFeedFlowRate = $(".ddPopUp input[name=roFeedFlowRate]").val();
       
        
        inputData.ddPf = $(".ddPopUp input[name=ddPf]").val();
        inputData.ddApplication = $(".ddPopUp select[name=ddApplication]").val();
        inputData.ddNou = $(".ddPopUp input[name=ddNou]").val();
        inputData.ddMs = $(".ddPopUp select[name=ddMs]").val();
        inputData.ddFrs = $(".ddPopUp select[name=ddFrs]").val();
        inputData.ddHoa = $(".ddPopUp input[name=ddHoa]").val();
        inputData.ddEtss = $(".ddPopUp input[name=ddEtss]").val();
        inputData.ddCs = $(".ddPopUp select[name=ddCs]").val();
        inputData.ddScd = $(".ddPopUp input[name=ddScd]").val();
        inputData.ddEsc = $(".ddPopUp input[name=ddEsc]").val();
        inputData.ddSt = $(".ddPopUp select[name=ddSt]").val();
        inputData.ddStmoc = $(".ddPopUp select[name=ddStmoc]").val();
        inputData.ddStp = $(".ddPopUp select[name=ddStp]").val();
        inputData.ddStfi = $(".ddPopUp select[name=ddStfi]").val();
        inputData.ddStfo = $(".ddPopUp select[name=ddStfo]").val();
        inputData.ddStb = $(".ddPopUp select[name=ddStb]").val();
        inputData.ddStl = $(".ddPopUp select[name=ddStl]").val();
        inputData.ddIsm = $(".ddPopUp select[name=ddIsm]").val();
        inputData.ddIsp = $(".ddPopUp select[name=ddIsp]").val();
        inputData.ddIsf = $(".ddPopUp select[name=ddIsf]").val();
        inputData.ddTmoc = $(".ddPopUp select[name=ddTmoc]").val();
        inputData.ddLcp = $(".ddPopUp select[name=ddLcp]").val();
        inputData.ddNoupp = $(".ddPopUp select[name=ddNoupp]").val();
        inputData.ddLoc = $(".ddPopUp select[name=ddLoc]").val();
        inputData.ddSmp = $(".ddPopUp select[name=ddSmp]").val();
        inputData.ddSpm = $(".ddPopUp select[name=ddSpm]").val();
        inputData.ddTnorp = $(".ddPopUp select[name=ddTnorp]").val();
        inputData.ddTnosp = $(".ddPopUp select[name=ddTnosp]").val();
        inputData.ddMv = $(".ddPopUp select[name=ddMv]").val();
        inputData.ddMp = $(".ddPopUp input[name=ddMp]").val();
        inputData.ddMf = $(".ddPopUp select[name=ddMf]").val();
        inputData.ddVfd = $(".ddPopUp select[name=ddVfd]").val();
        inputData.ddIios = $(".ddPopUp select[name=ddIios]").val();
        inputData.ddEg = $(".ddPopUp select[name=ddEg]").val();
        inputData.ddTom = $(".ddPopUp select[name=ddTom]").val();
        inputData.ddWmoc = $(".ddPopUp select[name=ddWmoc]").val();
        inputData.ddTod = $(".ddPopUp select[name=ddTod]").val();
        inputData.ddOse = $(".ddPopUp select[name=ddOse]").val();
        inputData.ddMm = $(".ddPopUp select[name=ddMm]").val();
        inputData.ddTps = $(".ddPopUp select[name=ddTps]").val();
      
        inputData.ddEpd = $(".ddPopUp select[name=ddEpd]").val();
        inputData.ddBos = $(".ddPopUp select[name=ddBos]").val();
        inputData.ddSocrm = $(".ddPopUp select[name=ddSocrm]").val();
        inputData.ddCrmdt = $(".ddPopUp select[name=ddCrmdt]").val();
        inputData.ddCrmipd = $(".ddPopUp select[name=ddCrmipd]").val();
        inputData.ddFsld = $(".ddPopUp input[name=ddFsld]").val();
        inputData.ddSrmdt = $(".ddPopUp select[name=ddSrmdt]").val();
        inputData.ddSrmipd = $(".ddPopUp select[name=ddSrmipd]").val();
        inputData.ddRmo = $(".ddPopUp select[name=ddRmo]").val();
        inputData.ddPt = $(".ddPopUp select[name=ddPt]").val();
        inputData.ddA = $(".ddPopUp select[name=ddA]").val();
        inputData.ddR = $(".ddPopUp select[name=ddR]").val();
        inputData.ddUf = $(".ddPopUp input[name=ddUf]").val();
        inputData.ddTh = $(".ddPopUp input[name=ddTh]").val();
        inputData.ddOts = $(".ddPopUp select[name=ddOts]").val();



        //console.log("Input data is as follows========"+inputData);
		
        localStorage.setItem(popUpId, JSON.stringify(inputData));
		//console.log(popUpId+' Pop up Id');
		if(ddFormArray.indexOf(popUpId) === -1) {
            ddFormArray.push(popUpId);            
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




/*


$('body').on('change', '.ddPopUp #elemType', function () {
    if (this.value == 'BWRO') {
        $(".ddPopUp input[name=rocaid]").val(99);
        $(".ddPopUp input[name=romgid]").val(99.1);
        $(".ddPopUp input[name=ronaid]").val(98.8);
        $(".ddPopUp input[name=rokid]").val(98.2);
        $(".ddPopUp input[name=ronhid]").val(81);
        $(".ddPopUp input[name=robaid]").val(99);
        $(".ddPopUp input[name=rosrId]").val(99);
        $(".ddPopUp input[name=roFeId]").val(99);
        $(".ddPopUp input[name=roMnId]").val(0);
        $(".ddPopUp input[name=rosoId]").val(99);
        $(".ddPopUp input[name=roclId]").val(98.9);
        $(".ddPopUp input[name=rofId]").val(99.8);
        $(".ddPopUp input[name=ronoId]").val(93);
        $(".ddPopUp input[name=roBrId]").val(98.8);
        $(".ddPopUp input[name=roPoId]").val(99);
        $(".ddPopUp input[name=roBId]").val(50);
        $(".ddPopUp input[name=roSilicaId]").val(98);
        $(".ddPopUp input[name=rohsid]").val(1);
        $(".ddPopUp input[name=rohcoId]").val(98.4);
        $(".ddPopUp input[name=rohcotId]").val(2);
        $(".ddPopUp input[name=rohcothId]").val(99.9);
        $(".ddPopUp input[name=roFlux]").val(0.008333);
        $(".ddPopUp input[name=roElemArea]").val(37.158784 );


    }
    if (this.value == 'NF') {
        $(".ddPopUp input[name=rocaid]").val(45.58082);
        $(".ddPopUp input[name=romgid]").val(94.6924);
        $(".ddPopUp input[name=ronaid]").val(26.38243);
        $(".ddPopUp input[name=rokid]").val(28.94245);
        $(".ddPopUp input[name=ronhid]").val(25.2849);
        $(".ddPopUp input[name=robaid]").val(43.34207);
        $(".ddPopUp input[name=rosrId]").val(43.01514);
        $(".ddPopUp input[name=roFeId]").val(42.70056);
        $(".ddPopUp input[name=roMnId]").val(42.7557);
        $(".ddPopUp input[name=rosoId]").val(94.7234);
        $(".ddPopUp input[name=roclId]").val(38.77688);
        $(".ddPopUp input[name=rofId]").val(26.0427);
        $(".ddPopUp input[name=ronoId]").val(25.54137);
        $(".ddPopUp input[name=roBrId]").val(26.06936);
        $(".ddPopUp input[name=roPoId]").val(51.4181);
        $(".ddPopUp input[name=roBId]").val(25.01553);
        $(".ddPopUp input[name=roSilicaId]").val(25.03466);
        $(".ddPopUp input[name=rohsid]").val(25.01106);
        $(".ddPopUp input[name=rohcoId]").val(29.17987);
        $(".ddPopUp input[name=rohcotId]").val(23.40419);
        $(".ddPopUp input[name=rohcothId]").val(37.33604);
        $(".ddPopUp input[name=roFlux]").val(0.010417);
        $(".ddPopUp input[name=roElemArea]").val( 36.231);
    }
    if (this.value == 'SWRO') {
        $(".ddPopUp input[name=rocaid]").val(99.88);
        $(".ddPopUp input[name=romgid]").val(99.91);
        $(".ddPopUp input[name=ronaid]").val(99.5);
        $(".ddPopUp input[name=rokid]").val(99.26);
        $(".ddPopUp input[name=ronhid]").val(85);
        $(".ddPopUp input[name=robaid]").val(99.88);
        $(".ddPopUp input[name=rosrId]").val(99.88);
        $(".ddPopUp input[name=roFeId]").val(99.88);
        $(".ddPopUp input[name=roMnId]").val(0);
        $(".ddPopUp input[name=rosoId]").val(99.94);
        $(".ddPopUp input[name=roclId]").val(99.55);
        $(".ddPopUp input[name=rofId]").val(99.9);
        $(".ddPopUp input[name=ronoId]").val(94);
        $(".ddPopUp input[name=roBrId]").val(99.5);
        $(".ddPopUp input[name=roPoId]").val(99.6);
        $(".ddPopUp input[name=roBId]").val(55);
        $(".ddPopUp input[name=roSilicaId]").val(98.8);
        $(".ddPopUp input[name=rohsid]").val(1);
        $(".ddPopUp input[name=rohcoId]").val(98.5);
        $(".ddPopUp input[name=rohcotId]").val(2);
        $(".ddPopUp input[name=rohcothId]").val(99.93);
        $(".ddPopUp input[name=roFlux]").val(0.008333);
        $(".ddPopUp input[name=roElemArea]").val(37.158784);

    }


});

$(document).on('change', '.ddPopUp input', function () {
	var num = this.value.match(/^\d+$/);
    if (num === null) {
	// If we have no match, value will be empty.
	this.value = "";
	}
});


*/

$(document).on('change', '.ddPopUp #ddStid', function () {	
    if (this.value == 'Yes') {
		$(".steelTankNo").removeClass('dispNone');
		$(".steelTankYes").addClass('dispNone');
    }    
    if (this.value == 'No') {
        $(".steelTankYes").removeClass('dispNone');
        $(".steelTankNo").addClass('dispNone');
    }
});

$(document).on('change', '.ddPopUp #ddSocrmid', function () {
    if (this.value == 'Single') {   
		$(".socrmSingle").addClass('dispNone');
    }    
    if (this.value == 'Common') {
        $(".socrmSingle").removeClass('dispNone');      
    }
});
