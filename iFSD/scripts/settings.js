$('.s_mb').click(function(){
    $('.settings_MB').removeClass('dispNone');
    $('.settings_MB').show();
    $('.settings_RM').hide();
    $('.settings_TI').hide();
});
$('.s_ti').click(function(){
    $('.settings_TI').removeClass('dispNone');
    $('.settings_TI').show();
    $('.settings_MB').hide();
    $('.settings_RM').hide();
});
$('.s_rm').click(function(){
    $('.settings_RM').removeClass('dispNone');
    $('.settings_RM').show();
    $('.settings_TI').hide();
    $('.settings_MB').hide();
});


$('body').on('click', '.settings_RM .updateBtn', function () {
    var rmSaveData =  $('#rSelect').val();
    localStorage.setItem('rmFormdata',  JSON.stringify(rmSaveData));
});


$('body').on('click', '.settings_TI .updateBtn', function (e) {
//$(".settings_TI .updateBtn").live('click',function(e){ 
    var validFlag = 0;
    $(".settings_TI #Flow").css('border', '1px solid #e1e2e5');
    $(".settings_TI #Ions").css('border', '1px solid #e1e2e5');
    $(".settings_TI #iterations").css('border', '1px solid #e1e2e5');

    if($('#Flow').val() == '' ){
        validFlag = 1;
        $(".settings_TI #Flow").css('border', '1px solid red');
    }
    if($('#Ions').val() == '' ){
        validFlag = 1;
        $(".settings_TI #Ions").css('border', '1px solid red');
    }
    if($('#iterations').val() == '' ){
        validFlag = 1;
        $(".settings_TI #iterations").css('border', '1px solid red');
    }
    if(validFlag == 0){
        var tiSaveData={};
        tiSaveData.Flow =  $('#Flow').val();
        tiSaveData.Ions=$('#Ions').val();
        tiSaveData.iterations=$('#iterations').val();
        localStorage.setItem('tiFormdata',  JSON.stringify(tiSaveData));
    }
    else{
        $('.popUpTabError').text('');
		$('.popUpTabError').text('Please enter all highlighted input from all tab.');
		e.stopImmediatePropagation();
    }
});

$('body').on('click', '.settings_MB .updateBtn', function () {
    var validFlag = 0;
    $(".settings_TI #Flow").css('border', '1px solid #e1e2e5');

    if($('#Flow').val() == '' ){
        validFlag = 1;
        $(".settings_TI #Flow").css('border', '1px solid red');
    }

    var mbItems=[];
    $("input:checkbox[name=mbItem]:checked").each(function(){
        mbItems.push($(this).val());
    });
    if(validFlag == 0){
        localStorage.setItem('mbItems',  JSON.stringify(mbItems));
    }else{
        $('.popUpTabError').text('');
		$('.popUpTabError').text('Please enter all highlighted input from all tab.');
		e.stopImmediatePropagation();
    }
});


$(document).on('change', '.settings_TI .iterations', function () {
	var num = this.value.match(/^[0-9]+$/);
    if (num === null) {
	// If we have no match, value will be empty.
	this.value = "";
	}
}); 

