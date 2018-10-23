var executionFlag = false;

$(document).ready(function () {
	
	$('.overlay').show();
	
	$('#dataSheetExcel').removeAttr("href", "#");
	$('#dataSheetPDF').removeAttr("href", "#");
	$('#massBalncePdf').removeAttr("href", "#");
	$('#massBalanceExcel').removeAttr("href", "#");

	loadPopUpDetails();

	setTimeout(function () {
		loaddictInDetails();
	}, 2000);
	loaddictOutDetails();
	localStorage.clear();

	$("#loadC02").load('forms/co2.html');
	$("#load02").load('forms/o2.html');
	$("#loadRremin_Hydratedlime").load('forms/remin_Hydratedlime.html');
	$("#loadRemin_Limestone").load('forms/remin_Limestone.html');
	$("#loadClarifier_Lamella").load('forms/clarifier_Lamella.html');
	$("#loadSplitter").load('forms/splitter.html');
	$("#loadFilters").load('forms/filters.html');
	$("#loadEdi").load('forms/edi.html');
	$("#loadCf").load('forms/cf.html');
	$("#loadSf").load('forms/strainer.html');
	$("#loadRo").load('forms/ro.html');
	$("#loadIXM").load('forms/ixMixBed.html');
	$("#loadFeed").load('forms/feed.html');
	$("#loadTankSplitter").load('forms/tank-splitter.html');
	$("#loadDd").load('forms/dd.html');
	$("#loadSettings_MB").load('forms/settings/Settings_MB.html');
	$("#loadSettings_TI").load('forms/settings/Settings_TI.html');
	$("#loadSettings_RM").load('forms/settings/Settings_RM.html');
	$("#loadFiltraFast").load('forms/filtraFast.html');
	//$("#loadEdr").load('forms/edr.html');
	

	//make Draggable
	$('#loadC02').draggable();
	$('#load02').draggable();
	$('#loadRremin_Hydratedlime').draggable();
	$('#loadRemin_Limestone').draggable();
	$('#loadClarifier_Lamella').draggable();
	$('#loadSplitter').draggable();
	$('#loadFilters').draggable();
	$('#loadEdi').draggable();
	$('#loadCf').draggable();
	$('#loadSf').draggable();
	$('#loadRo').draggable();
	$("#loadIXM").draggable();
	$("#loadTankSplitter").draggable();
	$("#loadDd").draggable();
	$("#loadEdr").draggable();
	$("#loadFiltraFast").draggable();
	
	$(".demo").draggable({
	  containment: "parent"
	});

	exeRunningFirst();

	//********** checking Access *************/
	function exeRunningFirst() {
		//********** EXE file Execution Started *************/
		var licenceFile = 'C:/SUEZ_HXProNet/EXE/PYTHON_EXE/HXProNet_License_Request/HXProNet_License_Request.txt';
		var fs = require('fs');
		if (fs.existsSync(licenceFile)) {
			fs.unlinkSync(licenceFile);
		}


		var check = 1;
		var spawn = require('child_process').spawn;
		// const bat = spawn('D:/Users/502763083/Desktop/excelfile_creation/excelfile_creation/excelfile_creation.exe', [pathd, 'excel_creation']);
		var bat = spawn('C:/SUEZ_HXProNet/EXE/PYTHON_EXE/HXProNet/HXProNet_enKey.exe', [check]);
		// const bat = spawn('excelfile_creation/excelfile_creation.exe', ['D:/Users/502763083/Desktop/valero_huston.xlsx', 'data_filter']);
		bat.stdout.on("data", function (data) {
			//console.log(data.toString());
		});
		bat.stderr.on("data", function (data) {
			console.error(data.toString());
		});
		bat.on("close", function (code) {
			if (code == 0) {
				readTextFile();
			} else {
				alert("Exe file execution failed");
			}
		});
	}
	//********** checking Access *************/


	function readTextFile() {
		var fs = require('fs');
		var file = "C:/SUEZ_HXProNet/check.txt";
		fs.readFile(file, "utf-8", function (err, data) {
			if (err) {
				return console.log(err);
			}
			fs.unlinkSync(file);
			if (data == 2) {
				$("#security").dialog("open");
			}
		});

	}

	$("#security").dialog({
		autoOpen: false,
		maxWidth: 400,
		maxHeight: 200,
		width: 400,
		height: 200,
		modal: true,
		title: "HXProNet access denied",
		open: function () {
			var markup = 'User does not have authority to access this, hence you need to take approval from admin !';
			$(this).html(markup);
		},
		buttons: {
			"Request Access": function () {
				requestAccess();
			},
			close: function () {
				process.exit(1);
			}
		},
		close: function () {
		}
	});

	//********** Send request access start *************/
	function requestAccess() {
		var check = 2;
		var spawn = require('child_process').spawn;
		var bat = spawn('C:/SUEZ_HXProNet/EXE/PYTHON_EXE/HXProNet/HXProNet_enKey.exe', [check]);
		bat.stdout.on("data", function (data) {
			//console.log(data.toString());
		});
		bat.stderr.on("data", function (data) {
			console.error(data.toString());
		});
		bat.on("close", function (code) {
			var fs = require('fs');
			var file = "C:/SUEZ_HXProNet/check.txt";
			fs.unlinkSync(file);
			process.exit(1);
		});
	}


	//Unit Operation add here
	$('body').on('click', '#sub-menu-bar .designDiv:not(".pull-right")', function () {
		var streamCounter = 0;
		unitOpsLeftPos = unitOpsLeftPos + 70;
		var isUnitSelected = localStorage.getItem('SelectedUnits');
		//if(isUnitSelected){
		//var name=$(this).find('h4').text().replace(' ','_');
		var getThis = $(this);
		if ($(getThis).hasClass("subCategory")) {
			console.log('Sub category clicked');
		} else {
			if(isUnitSelected){
				var name = $(this).find('h4').text().replace(' ', '_').replace(')', '_').replace('(', '_');
				if (newCountJson[name] && ($('.'+name+'').length > 0)) {
					newCountJson[name] = newCountJson[name] + 1;
				} else {
					newCountJson[name] = 1;
				}
				var id = name + newCountJson[name];
				draggedArray.push(id);

				var html;
				var classname;
				var anchorNameSource;
				var anchorNameTarget;
				if ($(this).parent().attr('id') == 'Filters' && (name == 'MF'))
					classname = name + ' filters';

				if (name == 'EDI' || name == 'MF' || name == 'SF' || name == 'FF') {
					if (classname != undefined)
						html = '<div class="w join testClass ' + classname + '" maxIn="1" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">';
					else
						html = '<div class="w join testClass ' + name + '" maxIn="1" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">';
					html = html + '<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						'<div class="ep3 red_Anchor" title="Waste Stream"></div>' +
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right", "Bottom"];
						anchorNameTarget = ["Left"];
				} else if (name == 'Feed') {
					html = '<div class="w join testClass ' + name + '" maxIn="0" maxOut="1" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						//'<div class="ep2 green_Anchor" title="Feed Stream"></div>'+
						//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right"];
						anchorNameTarget = ["Left"];
				} else if (name == 'RO') {
					html = '<div class="w join testClass ' + name + '" maxIn="1" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						'<div class="ep3 red_Anchor" title="Waste Stream"></div>' +
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right", "Bottom"];
						anchorNameTarget = ["Left"];
				} else if (name == 'MB') {
					html = '<div class="w join testClass ' + name + '" maxIn="1" maxOut="1" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right"];
						anchorNameTarget = ["Left"];
				} else if (name == 'CO2' || name == 'O2' || name == 'Hydratedlime' || name == 'Limestone' || name == 'CF') {
					html = '<div class="w join testClass ' + name + '" maxIn="1" maxOut="1" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right"];
						anchorNameTarget = ["Left"];
				} else if (name == 'Mixer' || name == 'Tank-Mixer') {
					html = '<div class="w join ' + name + '" maxIn="4" maxOut="1" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right"];
						anchorNameTarget = ["Left"];
				} else if (name == 'Splitter' || name == 'Tank-Splitter') {
					html = '<div class="w join testClass ' + name + '" maxIn="1" maxOut="4" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right"];
						anchorNameTarget = ["Left"];
				} else if (name == 'Lamella' || name == 'DensaDeg') {
					if (classname != undefined)
						html = '<div class="w join testClass ' + classname + '" maxIn="1" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">';
					else
						html = '<div class="w join testClass ' + name + '" maxIn="1" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">';

					html = html + '<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						'<div class="ep3 red_Anchor" title="Sludge"></div>' +
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right", "Bottom"];
						anchorNameTarget = ["Left"];
				}/* else if (name == 'DensaDeg') {
					if (classname != undefined)
						html = '<div class="w join testClass ' + classname + '" maxIn="3" maxOut="3" id="' + id + '" style="left: 7px; top: 31px;" title="'+name+'">';
					else
						html = '<div class="w join testClass ' + name + '" maxIn="3" maxOut="3" id="' + id + '" style="left: 7px; top: 31px;" title="'+name+'">';

					html = html + '<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep blue_Anchor" title="Product Stream"></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
						'<div class="ep3 red_Anchor" title="Sludge"></div>' +
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right", "Bottom"];
						anchorNameTarget = ["Left"];
				} */else if(name == 'ProductOut' || name == 'WasteOut'){
					html = '<div class="w join ' + name + '" maxIn="1" maxOut="0" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">' +
						'<p class="txt-elipse">' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						//'<div class="ep" title=""></div>' +
						//'<div class="ep1"></div>'+
						'<div class="ep2" title=""></div>'+
						//'<div class="ep3" title="Waste Stream"></div>'+
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Top"];
						anchorNameTarget = ["Left"];
				}else {
					if (classname != undefined)
						html = '<div class="w join testClass ' + classname + '" maxIn="2" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">';
					else
						html = '<div class="w join testClass ' + name + '" maxIn="2" maxOut="2" id="' + id + '" style="left: '+unitOpsLeftPos+'px; top: 31px;" title="'+name+'">';

					html = html + '<p class="txt-elipse" >' + name + '</p>' +
						'<img style="width: 34px;height: 34px;" src="' + $(this).find('img').attr('src') + '">' +
						'<div class="ep"></div>' +
						'<div class="ep1"></div>' +
						'<div class="ep2"></div>' +
						'<div class="ep3"></div>' +
						'<span class="dl">x</span>' +
						'<input type="text" class="edit" value="' + id + '" id="span' + id + '" maxlength="15" >' +
						'</div>';
						anchorNameSource = ["Right"];
						anchorNameTarget = ["Left"];
				}
				$('.canvasContainer .demo').append(html);
				addObject(id);
				if(name == 'EDI' || name == 'MF' || name == 'SF' || name == 'FF' || name == 'RO' || name == 'Lamella' || name == 'DensaDeg'){
					makeDraggableThree('#' + id, anchorNameSource, anchorNameTarget);
				}else{
					makeDraggable('#' + id, anchorNameSource, anchorNameTarget);
				}
				//console.log(draggedArray);
			}else{
				alert('Please select Unit.');
			}
		}
	});


	$('body').on('click', '.w .dl', function (e) {
		var r = confirm("Are you sure, you want to delete?");
		if (r == true) {
			
			var id = $(this).parent().attr('id');
			jsPlumb.removeAllEndpoints(jsPlumb.getSelector('#' + id));
			jsPlumb.detachAllConnections(jsPlumb.getSelector('#' + id));
			$('#' + id).remove();
			//remove from LocalStorage
			//console.log(newCountJson);
			if (localStorage.getItem(id) !== null) {
				localStorage.removeItem(id);
			}
			
			//Remove item form json count
			var idWihoutNum = id.replace(/[0-9]/g, '');
			/* if (newCountJson[idWihoutNum]) {
				newCountJson[idWihoutNum] = newCountJson[idWihoutNum] - 1;
			} else {
				newCountJson[idWihoutNum] = 1;
			} */
			//Remove item form forms array	
			if(idWihoutNum == 'CF'){
				var CF_i = cfFormArray.indexOf(id);
				if (CF_i != -1) {
					cfFormArray.splice(CF_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('cfFormCount')){
					var cfFC = JSON.parse(localStorage.getItem('cfFormCount'));
					cfFC_i = cfFC.indexOf(id);
					if (cfFC_i != -1) {
						cfFC.splice(cfFC_i, 1);
					}
					localStorage.setItem('cfFormCount', JSON.stringify(cfFC));
				}
			}else if(idWihoutNum == 'Lamella'){
				var lam_i = lamellaFormArray.indexOf(id);
				if (lam_i != -1) {
					lamellaFormArray.splice(lam_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('lamellaFormCount')){
					var lameFC = JSON.parse(localStorage.getItem('lamellaFormCount'));
					lameFC_i = lameFC.indexOf(id);
					if (lameFC_i != -1) {
						lameFC.splice(lameFC_i, 1);
					}
					localStorage.setItem('lamellaFormCount', JSON.stringify(lameFC));
				}
			}else if(idWihoutNum == 'CO'){
				var co2_i = co2FormArrya.indexOf(id);
				if (co2_i != -1) {
					co2FormArrya.splice(co2_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('co2FormCount')){
					var co2FC = JSON.parse(localStorage.getItem('co2FormCount'));
					co2FC_i = co2FC.indexOf(id);
					if (co2FC_i != -1) {
						co2FC.splice(co2FC_i, 1);
					}
					localStorage.setItem('co2FormCount', JSON.stringify(co2FC));
				}
			}else if(idWihoutNum == 'O'){
				var o2_i = o2FormArrya.indexOf(id);
				if (o2_i != -1) {
					o2FormArrya.splice(o2_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('o2FormCount')){
					var o2FC = JSON.parse(localStorage.getItem('o2FormCount'));
					o2FC_i = o2FC.indexOf(id);
					if (o2FC_i != -1) {
						o2FC.splice(o2FC_i, 1);
					}
					localStorage.setItem('o2FormCount', JSON.stringify(o2FC));
				}
			}else if(idWihoutNum == 'Hydratedlime'){
				var hy_i = hydratedlimeFormArray.indexOf(id);
				if (hy_i != -1) {
					hydratedlimeFormArray.splice(hy_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('hydratedlimeFormCount')){
					var hydraFC = JSON.parse(localStorage.getItem('hydratedlimeFormCount'));
					hydraFC_i = hydraFC.indexOf(id);
					if (hydraFC_i != -1) {
						hydraFC.splice(hydraFC_i, 1);
					}
					localStorage.setItem('hydratedlimeFormCount', JSON.stringify(hydraFC));
				}
			}else if(idWihoutNum == 'Limestone'){
				var lime_i = limeStoneFormArray.indexOf(id);
				if (lime_i != -1) {
					limeStoneFormArray.splice(lime_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('limeStoneFormCount')){
					var limeFC = JSON.parse(localStorage.getItem('limeStoneFormCount'));
					limeFC_i = limeFC.indexOf(id);
					if (limeFC_i != -1) {
						limeFC.splice(limeFC_i, 1);
					}
					localStorage.setItem('limeStoneFormCount', JSON.stringify(limeFC));
				}
			}else if(idWihoutNum == 'MB'){
				var ix_i = ixmMixedBedArray.indexOf(id);
				if (ix_i != -1) {
					ixmMixedBedArray.splice(ix_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('ixmMixedBedCount')){
					var mBFC = JSON.parse(localStorage.getItem('ixmMixedBedCount'));
					mBFC_i = mBFC.indexOf(id);
					if (mBFC_i != -1) {
						mBFC.splice(mBFC_i, 1);
					}
					localStorage.setItem('ixmMixedBedCount', JSON.stringify(mBFC));
				}
			}else if(idWihoutNum == 'RO'){				
				var ro_i = rofFormArray.indexOf(id);
				if (ro_i != -1) {
					rofFormArray.splice(ro_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('rofFormCount')){
					var roFC = JSON.parse(localStorage.getItem('rofFormCount'));
					roFC_i = roFC.indexOf(id);
					if (roFC_i != -1){
						roFC.splice(roFC_i, 1);
					}
					localStorage.setItem('rofFormCount', JSON.stringify(roFC));
				}
			}else if(idWihoutNum == 'Feed'){				
				var feed_i = feedFormArray.indexOf(id);
				if (feed_i != -1) {
					feedFormArray.splice(feed_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('feedFormCount')){
					var feedFC = JSON.parse(localStorage.getItem('feedFormCount'));
					console.log("feedFC", feedFC);
					feedFC_i = feedFC.indexOf(id);
					if (feedFC_i != -1) {
						feedFC.splice(feedFC_i, 1);
					}
					localStorage.setItem('feedFormCount', JSON.stringify(feedFC));
				}				
			}else if(idWihoutNum == 'EDI'){
				var edi_i = ediFormArray.indexOf(id);
				if (edi_i != -1) {
					ediFormArray.splice(edi_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('ediFormCount')){
					var eDIFC = JSON.parse(localStorage.getItem('ediFormCount'));
					eDIFC_i = eDIFC.indexOf(id);
					if (eDIFC_i != -1){
						eDIFC.splice(eDIFC_i, 1);
					}
					localStorage.setItem('ediFormCount', JSON.stringify(eDIFC));
				}
			}else if(idWihoutNum == 'MF'){			
				var mf_i = mmfFormArray.indexOf(id);
				if (mf_i != -1) {
					mmfFormArray.splice(mf_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('mmfFormCount')){
					var mFFC = JSON.parse(localStorage.getItem('mmfFormCount'));
					mFFC_i = mFFC.indexOf(id);
					if (mFFC_i != -1){
						mFFC.splice(mFFC_i, 1);
					}
					localStorage.setItem('mmfFormCount', JSON.stringify(mFFC));
				}
			}else if(idWihoutNum == 'SF'){
				var sf_i = sfFormArrya.indexOf(id);
				if (sf_i != -1) {
					sfFormArrya.splice(sf_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('sfFormCount')){
					var sFFC = JSON.parse(localStorage.getItem('sfFormCount'));
					sFFC_i = sFFC.indexOf(id);
					if (sFFC_i != -1){
						sFFC.splice(sFFC_i, 1);
					}
					localStorage.setItem('sfFormCount', JSON.stringify(sFFC));
				}
			}else if(idWihoutNum == 'Splitter'){
				var spt_i = splitterFormArray.indexOf(id);
				if (spt_i != -1) {
					splitterFormArray.splice(spt_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('splitterFormCount')){
					var spliFC = JSON.parse(localStorage.getItem('splitterFormCount'));
					spliFC_i = spliFC.indexOf(id);
					if (spliFC_i != -1){
						spliFC.splice(spliFC_i, 1);
					}
					localStorage.setItem('splitterFormCount', JSON.stringify(spliFC));
				}
			} else if(idWihoutNum == 'Tank-Splitter'){
				var spt_i = tank_splitterFormArray.indexOf(id);
				if (spt_i != -1) {
					tank_splitterFormArray.splice(spt_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('tankSplitterFormCount')){
					var spliFC = JSON.parse(localStorage.getItem('tankSplitterFormCount'));
					spliFC_i = spliFC.indexOf(id);
					if (spliFC_i != -1){
						spliFC.splice(spliFC_i, 1);
					}
					localStorage.setItem('tankSplitterFormCount', JSON.stringify(spliFC));
				}
			} else if(idWihoutNum == 'DensaDeg'){
				var dd_i = ddFormArray.indexOf(id);
				if (dd_i != -1) {
					ddFormArray.splice(dd_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('ddFormCount')){
					var ddFC = JSON.parse(localStorage.getItem('ddFormCount'));
					ddFC_i = ddFC.indexOf(id);
					if (ddFC_i != -1){
						ddFC.splice(ddFC_i, 1);
					}
					localStorage.setItem('ddFormCount', JSON.stringify(ddFC));
				}
			} else if(idWihoutNum == 'FF'){
				var dd_i = ddFormArray.indexOf(id);
				if (dd_i != -1) {
					ddFormArray.splice(dd_i, 1);
				}
				//removeFrom FormCount
				if(localStorage.getItem('ddFormCount')){
					var ddFC = JSON.parse(localStorage.getItem('ddFormCount'));
					ddFC_i = ddFC.indexOf(id);
					if (ddFC_i != -1){
						ddFC.splice(ddFC_i, 1);
					}
					localStorage.setItem('ddFormCount', JSON.stringify(ddFC));
				}
			}
			
			// Find and remove item from an array
			var i = draggedArray.indexOf(id);
			if (i != -1) {
				draggedArray.splice(i, 1);
			}
			deleteObject(id);
			if(draggedArray){
				unitOpsLeftPos = -70;
			}
			e.stopImmediatePropagation();
			return false;
		}else{
			return false;
		}
		

	});

	$('body').on('click', 'ul.feedTabs li', function () {
		$('ul.feedTabs li').removeClass('active');
		$('.FeedPopUp .tabDiv').addClass('dispNone');
		$(this).addClass('active');
		var tabName = $(this).children('a').text();
		$('.' + tabName).removeClass('dispNone');
	});

	$('body').on('click', 'ul.pumpTabs li', function () {
		$('ul.pumpTabs li').removeClass('active');
		$('.pumpPopUp .tabDiv').addClass('dispNone');
		$(this).addClass('active');
		var tabName = $(this).children('a').text();
		$('.' + tabName).removeClass('dispNone');
	});

	$('body').on('click', '.roPopUp ul.roTabs li', function () {
		//$('ul.roTabs li').removeClass('active');
		//$('.roPopUp .tabDiv').addClass('dispNone');
		//$('.roPopUp .tabDiv').addClass('dispNone');
		//$(this).addClass('active');
		var tabName = $(this).children('a').text();
		$('.' + tabName).removeClass('dispNone');
	});

	$('body').on('click', '.cfPopUp ul.roTabs li', function () {
		//$('ul.roTabs li').removeClass('active');
		//$('.cfPopUp .tabDiv').addClass('dispNone');
		//$(this).addClass('active');
		//var tabName = $(this).children('a').text();
		//$('.'+tabName).removeClass('dispNone');
	});

	$('body').on('click', '.mmfPopUp ul.roTabs li', function () {
		$('ul.roTabs li').removeClass('active');
		$('.mmfPopUp .tabDiv').addClass('dispNone');
		$(this).addClass('active');
		var tabName = $(this).children('a').text();
		$('.' + tabName).removeClass('dispNone');
	});

	$('body').on('click', 'ul.iFSDTab li', function () {
		if ($(this).html().indexOf('Output') >= 0 && executionFlag == true) {
			loadOutputFromFile($(this).parent().parent().parent().attr('myid'));
		}

		var parentClassName = $(this).parent().parent().parent().attr('class').split(' ')[0];

		//$(this).removeClass('active');

		$(this).parent().find('li').removeClass('active');

		$('.' + parentClassName + ' .tabDiv').addClass('dispNone');

		$(this).addClass('active');

		var tabName = $(this).children('a').text();

		$('.' + tabName).removeClass('dispNone');

	});

	//CO2	

	//CO2

	//O2

	//O2

	//Remin_Hydratedlime

	//Remin_Hydratedlime

	$('body').on('click', '.feed p,.feed br,.feed img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		loadFeedProperties(id);
		$('.FeedPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.pump p,.pump br,.pump img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		loadPumpProperties(id);
		$('.pumpPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.ro p,.ro br,.ro img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		//loadROProperties(id);
		//$('.roPopUp.popUp .header h3').text(id.toUpperCase());
		//$('.roPopUp.popUp').attr('instance',id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.splitter p,.splitter br,.splitter img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		loadSplitterProperties(id);
		$('.splitterPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.uf p,.uf br,.uf img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		loadUFProperties(id);
		$('.ufPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.mmf p,.mmf br,.mmf img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		loadMMFProperties(id);
		$('.mmfPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.cf p,.cf br,.cf img', function () {
		$('.overlay').show();
		var id = $(this).parent().attr('id');
		loadCFProperties(id);
		$('.cfPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
	});

	$('body').on('click', '.popUp .cancelBtn, .popUp .header .pull-right', function () {
		$('.overlay').hide();
		$('.popUp').addClass('dispNone').hide();
	});

	$('body').on('click', '.updateBtn, #feedPopUp .okBtn', function () {
		var popUp = $(this).parents('.popUp');
		var instanceId = $(popUp).attr('instance');
		if ($(popUp).hasClass('FeedPopUp')) {
			setFeedProperties(instanceId);
		} else if ($(popUp).hasClass('pumpPopUp')) {
			setPumpProperties(instanceId);
		} else if ($(popUp).hasClass('roPopUp')) {
			//setROProperties(instanceId);
		} else if ($(popUp).hasClass('splitterPopUp')) {
			setSplitterProperties(instanceId);
		} else if ($(popUp).hasClass('ufPopUp')) {
			setUFProperties(instanceId);
		} else if ($(popUp).hasClass('mmfPopUp')) {
			setMMFProperties(instanceId);
		} else if ($(popUp).hasClass('cfPopUp')) {
			// setCFProperties(instanceId);
		}
		$('.overlay').hide();
		$('.popUp').addClass('dispNone').hide();
	});


	$('body').on('change', '.roPopUp #recoveryInput,.roPopUp #rejectInput', function () {
		var value = Number($(this).val()) || 0;
		if (value >= 100 || value <= 0) {
			$(this).val(0);
		}
	});

	$('body').on('change', '.roPopUp input[type="checkbox"]', function () {
		if ($(this).is(':checked')) {
			$('.roPopUp input[type="checkbox"]').not(this).prop('checked', false).trigger('change');
		} else if (!$(this).is(':checked')) {
			$(this).siblings('input[type="text"]').attr('disabled', true).addClass('disabled');
		}
	});

	$('body').on('change', '#recycleInput', function () {
		var value = Number($(this).val()) || 0;
		if (value < 0 || value > 100) {
			$(this).val('100.00')
			$('#recycleInput1').val(Number(0).toFixed(2));
		} else {
			var value2 = 100 - value;
			$(this).val(Number(value).toFixed(2))
			$('#recycleInput1').val(Number(value2).toFixed(2));
		}
	});


	$('body').on('click', '.calcIterationDiv .accordion-group .accordion-heading a', function () {
		if ($(this).children('i').hasClass("icon-chevron-right")) {
			$(this).children('i').removeClass("icon-chevron-right");
			$(this).children('i').addClass("icon-chevron-down");
		}
		else {
			$(this).children('i').removeClass("icon-chevron-down");
			$(this).children('i').addClass("icon-chevron-right");
		}
		$("#collapseTable,.streamDetails .accordion-group .accordion-heading a span").slideToggle(0);
	});

	$('body').on('click', '#refresh', function () {
		location.reload();
	});

	$('body').on('click', '#savediv', function () {
		/* var objects = getStartObjects();
		if (objects.length > 1 || objects.length === 0) {
			$('#progress').hide();
			alert('Error! Object Connections Missing!');
		}else{ */
			var connectionsToSave = [];
			var sourceAndtargetIds = "";
			$.each(jsPlumb.getConnections(), function (idx, connection) {
				var endpointArray = [];
				//console.log();
				if (!sourceAndtargetIds.indexOf(connection.id) >= 0) {

					connectionsToSave.push({
						connectionId: connection.id,
						properties: [{
							maxin: $('#' + connection.sourceId).attr('maxIn'), maxout: $('#' + connection.sourceId).attr('maxOut'),
							label: $('#' + connection.sourceId + ' p')[0].innerHTML, image: $('#' + connection.sourceId + ' img').attr('src'), position: $('#' + connection.sourceId).attr('style'),
							class: $('#' + connection.sourceId).attr('class'),
							sourceId: connection.sourceId,
							sourceHeaderText: $('input#span' + connection.sourceId).val()
						}],
						connections: [{
							sourceId: connection.sourceId,
							targetId: connection.targetId,
							endpoint: endpointArray,
							labelText: document.getElementsByName('tag')[idx].value,
							overlays: $.map(connection.getOverlays(), function (overlay) {
								var temp = new Array();
								var obj = {};
								for (var key in overlay) {
									if (typeof overlay[key] !== 'function' && typeof overlay[key] !== 'object' && typeof overlay[key] != 'undefined') {
										if (key == 'loc') {
											obj["location"] = overlay[key];
										} else {
											obj[key] = overlay[key];
										}
									}
								}
								obj["cssClass"] = overlay.canvas.className;
								temp.push(obj);
								return temp;
							}),
							anchors: $.map(connection.endpoints, function(endpoint) {
								return [[endpoint.anchor.x, 
								endpoint.anchor.y, 
								endpoint.anchor.getOrientation()[0], 
								endpoint.anchor.getOrientation()[1],
								endpoint.anchor.offsets[0],
								endpoint.anchor.offsets[1]
								]];
										
							  })
						}]

					});
				}
				if (!sourceAndtargetIds.indexOf(connection.id) >= 0) {
					connectionsToSave.push({
						connectionId: connection.id,
						properties: [{
							maxin: $('#' + connection.targetId).attr('maxIn'), maxout: $('#' + connection.targetId).attr('maxOut'),
							label: $('#' + connection.targetId + ' p')[0].innerHTML, image: $('#' + connection.targetId + ' img').attr('src'), position: $('#' + connection.targetId).attr('style'),
							class: $('#' + connection.targetId).attr('class'),
							sourceId: connection.targetId,
							sourceHeaderText: $('input#span' + connection.targetId).val(),
							anchors: $.map(connection.endpoints, function(endpoint) {
								return [[endpoint.anchor.x, 
								endpoint.anchor.y, 
								endpoint.anchor.getOrientation()[0], 
								endpoint.anchor.getOrientation()[1],
								endpoint.anchor.offsets[0],
								endpoint.anchor.offsets[1]
								]];
										
							  })
						}],
					});
				}
				sourceAndtargetIds = sourceAndtargetIds + connection.id;
			});
		
			var aLSobj = {};
			var allLocalStorageVal = [];
			/* for (var a in localStorage){
				aLSobj[a] = localStorage[a];
			} */
			//EXE localStorage issue
			var hcount = 0;
			for (var a in localStorage){
				var getKey = a;
				hcount++;
				if(hcount <= localStorage.length){
					for(var h=0; h<localStorage.length;h++){
						aLSobj[getKey] = JSON.parse(localStorage[a]);
					}
				}
			}
			
			allLocalStorageVal.push(aLSobj);
			connectionsToSave.push({ allLocalStorage: allLocalStorageVal });
			//console.log(allLocalStorageVal);
			connectionsToSave.push({ cfFormCount: cfFormArray });
			connectionsToSave.push({ lamellaFormCount: lamellaFormArray });
			connectionsToSave.push({ co2FormCount: co2FormArrya });
			connectionsToSave.push({ ediFormCount: ediFormArray });
			connectionsToSave.push({ mmfFormCount: mmfFormArray });
			connectionsToSave.push({ ixmMixedBedCount: ixmMixedBedArray });
			connectionsToSave.push({ o2FormCount: o2FormArrya });
			connectionsToSave.push({ hydratedlimeFormCount: hydratedlimeFormArray });
			connectionsToSave.push({ limeStoneFormCount: limeStoneFormArray });
			connectionsToSave.push({ rofFormCount: rofFormArray });
			connectionsToSave.push({ splitterFormCount: splitterFormArray });
			connectionsToSave.push({ tankSplitterFormCount: tank_splitterFormArray });
			connectionsToSave.push({ sfFormCount: sfFormArrya });
			connectionsToSave.push({ feedFormCount: feedFormArray });
			connectionsToSave.push({ ddFormCount: ddFormArray });
			connectionsToSave.push({ ffFormCount: ffFormArray });
			/*File Details Save*/
			var fileDetails = {};
			fileDetails.selectedUnit = $('#unitDropdown').val();
			fileDetails.projectName = $('#project').val();
			fileDetails.customerName = $('#customer').val();
			fileDetails.locationName = $('#location').val();
			fileDetails.calenderIcon = $('#calenderIcon').val();
			connectionsToSave.push({ fileData: fileDetails });
			
			var jsonDataToSave = JSON.stringify(connectionsToSave);

			var file = new Blob([jsonDataToSave], { type: 'octet/stream' });
			$('#save').attr('href', URL.createObjectURL(file));
			$('#save').attr('download', "flowGraph.fsd");

			$('#save').click();

			//console.log(connectionsToSave);
		//}
	});
	$('#save').click(function (e) {
		e.preventDefault();  //stop the browser from following
		window.location.href = $('#save').attr('href');
		//window.URL.revokeObjectURL($('#save').attr('href'));
	});
	
	function removeAlljsPlumb(){
		for(var g=0; g<15;g++){
			jsPlumb.remove('CF'+g+'');
			jsPlumb.remove('EDI'+g+'');
			jsPlumb.remove('MF'+g+'');
			jsPlumb.remove('SF'+g+'');
			jsPlumb.remove('Feed'+g+'');
			jsPlumb.remove('RO'+g+'');
			jsPlumb.remove('MB'+g+'');
			jsPlumb.remove('CO2'+g+'');
			jsPlumb.remove('O2'+g+'');
			jsPlumb.remove('Hydratedlime'+g+'');
			jsPlumb.remove('Limestone'+g+'');
			jsPlumb.remove('Mixer'+g+'');
			jsPlumb.remove('Tank-Mixer'+g+'');
			jsPlumb.remove('Splitter'+g+'');
			jsPlumb.remove('Tank-Splitter'+g+'');
			jsPlumb.remove('Lamella'+g+'');
			jsPlumb.remove('WasteOut'+g+'');
			jsPlumb.remove('ProductOut'+g+'');
			jsPlumb.remove('DensaDeg'+g+'');
			jsPlumb.remove('FF'+g+'');
		}
	}
	
	var emptyFormArray = function(){
		cfFormArray = [];
		lamellaFormArray = [];
		co2FormArrya = [];
		o2FormArrya = [];
		hydratedlimeFormArray = [];
		limeStoneFormArray = [];
		ixmMixedBedArray = [];
		rofFormArray = [];
		feedFormArray = []; 
		ediFormArray = [];
		mmfFormArray = [];
		sfFormArrya = [];
		splitterFormArray = [];
		tank_splitterFormArray = [];
		ddFormArray = [];
		ffFormArray= [];
	}
	
	$("#load").click(function(){
        var currentFileName = $(this).val();
		if (prevOpenFile == currentFileName){
			$(this).val('');
		}
    });
	
	$('#load').change(function (e) {
		
		var fs = require('fs');
		var filePath = 'C:/iFSD/Data/iFSDSheet.xlsx';
		draggedArray = [];
		newCountJson = {};

		/*var fileExist = false;
		fs.exists(filePath, function (err) {
			if (err){
				fileExist = false
			}else{
				fileExist = true;
			}
		}); */
		/* if (fs.existsSync(filePath)) {
			fileExist = true;
		}else{
			fileExist = false
		} */
		//if(fileExist){
			fs.unlink(filePath, function (err) {
				if (err){
					console.log('iFSD.xlsx is not present or It is opened. Please close from task Manager.');
				}else{
					console.log('Existing iFSD.xlsx file deleted!');
				}
			});
		//}
		localStorage.clear();
		removeAlljsPlumb();
		
		
		var files = e.target.files;
		if(files[0].name){
			document.title = 'iFSD -' + files[0].name;
			prevOpenFile = files[0].path;
		}
		var jsonData;
		for (var i = 0, f; f = files[i]; i++) {

			// Only process image files.
			//	if (!f.type.match('image.*')) {
			//		continue;
			//	}




			$.get(f.path, function (data) {
				//location.reload();
				jsonData = JSON.parse(data);

				$.each(jsPlumb.getConnections(), function (idx, connection) {
					//Remove all connections and sources
					jsPlumb.detachAllConnections(connection.sourceId);
					jsPlumb.removeAllEndpoints(connection.sourceId);
					jsPlumb.detach(connection.sourceId); // <--
					$("#" + connection.sourceId).remove();
					jsPlumb.remove(connection);
					jsPlumb.reset();
				});


				$.each(jsonData, function (index, elem) {
					if (elem.properties != undefined) {
						type = elem.properties[0].label.replace(/[0-9]/g, '');
						if (newCountJson[type]) {
							newCountJson[type] = newCountJson[type] + 1;
						} else {
							newCountJson[type] = 1;
						}
					}
				});

				var connection1;
				var elem;
				var type;
				var targetId;
				var connectionIdsLoaded = "";
				$.each(jsonData, function (index, elem) {
					//if (elem.connections != undefined) // made change here for type
					if (elem.properties != undefined)
						type = elem.properties[0].label.replace(/[0-9]/g, '');

					//Source
					if (elem.properties != null && elem.properties != undefined) {
						var sourceIdsArr = connectionIdsLoaded.split(",");
						var ignoreFlag = 0;
						$.each(sourceIdsArr, function (index, sourceelem) {
							if (sourceelem == elem.properties[0].sourceId)
								ignoreFlag = 1;
						});

						if (ignoreFlag == 0) {
							loadSavedCanvas(elem.properties[0].sourceId, elem.properties[0].image, type, elem.properties[0].maxin, elem.properties[0].maxout, elem.properties[0].position, elem.properties[0].class, elem.properties[0].sourceHeaderText);
							connectionIdsLoaded = connectionIdsLoaded + "," + elem.properties[0].sourceId;
						}

					}
					if(elem.allLocalStorage){
						for (var a in elem.allLocalStorage[0]){
							localStorage.setItem(a, JSON.stringify(elem.allLocalStorage[0][a]));
						}
					}
					//forms count
					if(elem.cfFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.cfFormCount));
					}
					if(elem.lamellaFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.lamellaFormCount));
					}
					if(elem.co2FormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.co2FormCount));
					}
					if(elem.ediFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.ediFormCount));
					}
					if(elem.mmfFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.mmfFormCount));
					}
					if(elem.ixmMixedBedCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.ixmMixedBedCount));
					}
					if(elem.o2FormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.o2FormCount));
					}
					if(elem.hydratedlimeFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.hydratedlimeFormCount));
					}
					if(elem.limeStoneFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.limeStoneFormCount));
					}
					if(elem.rofFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.rofFormCount));
					}
					if(elem.splitterFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.splitterFormCount));
					}
					if(elem.tankSplitterFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.tankSplitterFormCount));
					}
					if(elem.sfFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.sfFormCount));
					}
					if(elem.feedFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.feedFormCount));
					}
					if(elem.fileData){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.fileData));
					}
					if(elem.ddFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.ddFormCount));
					}
					if(elem.ffFormCount){
						var getKey = Object.keys(elem);
						localStorage.setItem(''+getKey+'', JSON.stringify(elem.ffFormCount));
					}
				});

				$.each(jsonData, function (index1, elem1) {
					if (elem1.connections != undefined) {
						/* var name = elem1.properties[0].label;
						var getSourceID = "#"+elem1.connections[0].sourceId+"" ;
						var getTargetID = elem1.connections[0].targetId ;
						var targetIdWNo = getTargetID.replace(/[0-9]/g, '');
						var	anchorNameSource1, anchorNameTarget1;

						if(name == 'EDI' || name == 'MF' || name == 'SF' || name == 'FF' || name == 'RO' || name == 'Lamella' || name == 'DensaDeg'){
						if(targetIdWNo == "WasteOut" || targetIdWNo == "Tank-Splitter"){
							anchorNameSource1 = ["Bottom"];
						}else{
							anchorNameSource1 = ["Right"];
						}
						anchorNameTarget1 = ["Left"];
						//makeDraggableThree('#' + getID, anchorNameSource1, anchorNameTarget1);
						 makeSourceForLoad(getSourceID, anchorNameSource1);
						}
						else{
							anchorNameSource1 = ["Right"];
							anchorNameTarget1 = ["Left"];
							//makeDraggable('#' + getID, anchorNameSource1, anchorNameTarget1);
						} */
						
						connection1 = jsPlumb.connect({
							source: elem1.connections[0].sourceId,
							target: elem1.connections[0].targetId,
							anchors: elem1.connections[0].anchors,
							//connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: false }],
							//connectorStyle: { strokeStyle: "blue", lineWidth: 1.5, outlineColor: "transparent", outlineWidth: 2 },
							overlays: [["Arrow", { width: 10, length: 14, location: 1, foldback: 0.8, id: "arrow" }],
							["Custom", {
								create: function (component) {
									streamvaluecount++;
									return $("<input class='customOverlay connectorInput' name='tag' type='text' value='" + elem1.connections[0].labelText + "' placeholder='cold' style='text-align:center; cursor: pointer; background: white; width:50px;' />");
								},
								location: 0.5,
								id: "customOverlay"
							}]
							],
							
							endpoint: ["Dot", { radius: 2 }]
						});
						
					}
				});
				//load Unit in Table ;
				var getSelectedUnits = JSON.parse(localStorage.getItem('SelectedUnits'));
				
				var tdata;
				for(var k=0; k<getSelectedUnits.length; k++){
					tdata += "<tr><td>" + getSelectedUnits[k].unitType + "</td>"
								+"<td>" + getSelectedUnits[k].unit + "</td>";
				}
				$('#parametersTable').append(tdata);
				
				//populate selected unit in table coulmn
				

				//Max streamNumber 
				var streamNumberArray = $('._jsPlumb_overlay').get().map(function(el) { return el.value });
				var max = Math.max(...streamNumberArray);
				streamvaluecount = max + 1;
				
			});

		}

		//Trigger click all input forms
		$(".CF").trigger( "click" );
		$(".Lamella").trigger( "click" );
		$(".CO2").trigger( "click" );
		$(".EDI").trigger( "click" );
		$(".filters").trigger( "click" );
		$(".MB").trigger( "click" );
		$(".O2").trigger( "click" );
		$(".Hydratedlime").trigger( "click" );
		$(".Limestone").trigger( "click" );
		$(".RO").trigger( "click" );
		$(".Splitter").trigger( "click" );
		$(".Tank-Splitter").trigger( "click" );
		$(".SF").trigger( "click" );
		$(".Feed").trigger( "click" );
		$(".DensaDeg").trigger( "click" );
		$(".FF").trigger( "click" );
		$('.popUp').hide();
		
		//empty all form array
		cfFormArray = [];
		lamellaFormArray = [];
		co2FormArrya = [];
		o2FormArrya = [];
		hydratedlimeFormArray = [];
		limeStoneFormArray = [];
		ixmMixedBedArray = [];
		rofFormArray = [];
		feedFormArray = []; 
		ediFormArray = [];
		mmfFormArray = [];
		sfFormArrya = [];
		splitterFormArray = [];
		tank_splitterFormArray = [];
		ddFormArray = [];
		ffFormArray = [];

	});

	

	function loadSavedCanvas(id, src, type, maxin, maxout, style, className, sourceHeaderText) {
		var classname;
		//resting Canvas
		canvasReset();
		
		if(type == "MF"){ 
			classname = "'" + className.split(" ")[0] + " " + className.split(" ")[1] + " " + className.split(" ")[2] + " " + className.split(" ")[3] +  " " + className.split(" ")[4] +  " '";
		}else{
			classname = "'" + className.split(" ")[0] + " " + className.split(" ")[1] + " " + className.split(" ")[2] + " " + className.split(" ")[3] +  "'";
		}
		if(className.indexOf("testClass") != -1){
			var tt = classname.slice(0, -1);
			classname =  tt + " testClass'";
		}
		if(className.indexOf("restClass") != -1){
			var tt = classname.slice(0, -1);
			classname =  tt + " restClass'";
		}
		var html;
		if (id.indexOf('O2') <= 0 && id.indexOf('CO2'))
			name = id.replace(/[0-9]/g, '');
		else {
			if (id.indexOf('O2') >= 0)
				name = 'O2';
			if (id.indexOf('CO2') >= 0)
				name = 'CO2';
		}
		var anchorNameSource;
		var anchorNameTarget;
		if (name == 'EDI' || name == 'MF' || name == 'SF' || name == 'FF') {
			if (classname != undefined)
				html = '<div class=' + classname + ' maxIn="1" maxOut="2" id="' + id + '" style="' + style + '">';

			html = html + '<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				'<div class="ep3 red_Anchor" title="Waste Stream"></div>' +
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" id="span' + id + '" maxlength="15" value="' + sourceHeaderText + '">' +
				'</div>';
				anchorNameSource = ["Right", "Bottom"];
				anchorNameTarget = ["Left"];
		} else if (name == 'Feed') {
			html = '<div class=' + classname + ' maxIn="0" maxOut="1" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				//'<div class="ep2 green_Anchor" title="Feed Stream"></div>'+
				//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right"];
				anchorNameTarget = ["Left"];
		} else if (name == 'RO') {
			html = '<div class=' + classname + ' maxIn="1" maxOut="2" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				'<div class="ep3 red_Anchor" title="Waste Stream"></div>' +
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right", "Bottom"];
				anchorNameTarget = ["Left"];
		} else if (name == 'MB') {
			html = '<div class=' + classname + ' maxIn="1" maxOut="1" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right"];
				anchorNameTarget = ["Left"];
		} else if (name == 'CO2' || name == 'O2' || name == 'Hydratedlime' || name == 'Limestone' || name == 'CF') {
			html = '<div class=' + classname + ' maxIn="1" maxOut="1" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right"];
				anchorNameTarget = ["Left"];
		} else if (name == 'Mixer' || name == 'Tank-Mixer') {
			html = '<div class=' + classname + ' maxIn="4" maxOut="1" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right"];
				anchorNameTarget = ["Left"];
		} else if (name == 'Splitter' || name == 'Tank-Splitter') {
			html = '<div class=' + classname + ' maxIn="1" maxOut="4" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				//'<div class="ep3 red_Anchor" title="Waste Stream"></div>'+
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right"];
				anchorNameTarget = ["Left"];
		} else if (name == 'Lamella' || name == 'DensaDeg') {
			if (classname != undefined)
				html = '<div class=' + classname + '  maxIn="1" maxOut="2" id="' + id + '" style="' + style + '">';
			else
				html = '<div class=' + classname + '  maxIn="1" maxOut="2" id="' + id + '" style="' + style + '">';

			html = html + '<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				'<div class="ep3 red_Anchor" title="Sludge"></div>' +
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right", "Bottom"];
				anchorNameTarget = ["Left"];
		} /*else if (name == 'DensaDeg') {
			if (classname != undefined)
				html = '<div class=' + classname + '  maxIn="3" maxOut="3" id="' + id + '" style="' + style + '">';
			else
				html = '<div class=' + classname + '  maxIn="3" maxOut="3" id="' + id + '" style="' + style + '">';

			html = html + '<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep blue_Anchor" title="Product Stream"></div>' +
				//'<div class="ep1"></div>'+
				'<div class="ep2 green_Anchor" title="Feed Stream"></div>' +
				'<div class="ep3 red_Anchor" title="Sludge"></div>' +
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
		} */ else if(name == 'ProductOut' || name == 'WasteOut'){
			html = '<div class=' + classname + ' maxIn="1" maxOut="0" id="' + id + '" style="' + style + '">' +
				'<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep2" title=""></div>' +
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Top"];
				anchorNameTarget = ["Left"];
		}else {
			if (classname != undefined)
				html = '<div class=' + classname + '  maxIn="2" maxOut="2" id="' + id + '" style="' + style + '">';
			else
				html = '<div class=' + classname + '  maxIn="2" maxOut="2" id="' + id + '" style="' + style + '">';

			html = html + '<p class="txt-elipse">' + name + '</p>' +
				'<img style="width: 34px;height: 34px;" src="' + src + '">' +
				'<div class="ep"></div>' +
				'<div class="ep1"></div>' +
				'<div class="ep2"></div>' +
				'<div class="ep3"></div>' +
				'<span class="dl">x</span>' +
				'<input type="text" class="edit" value="' + sourceHeaderText + '" id="span' + id + '" maxlength="15" >' +
				'</div>';
				anchorNameSource = ["Right"];
				anchorNameTarget = ["Left"];
		}

		$('.canvasContainer .demo').append(html);

		addObject(id);
		//makeDraggable('#' + id);
		if(name == 'EDI' || name == 'MF' || name == 'SF' || name == 'FF' || name == 'RO' || name == 'Lamella' || name == 'DensaDeg'){
			makeDraggableThree('#' + id, anchorNameSource, anchorNameTarget);
		}else{
			makeDraggable('#' + id, anchorNameSource, anchorNameTarget);
		}
	}



	$('body').on('change', '#feedPopUp #sel2', function () {
		var value = Number($(this).val());
		clearFeedTable();
		$(this).val(value);
		if (value !== 0) {
			$('#feedPopUp .balanceBtn').attr('disabled', false).removeClass('disabled');
			var temp = Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
			var pH = Number($('#feedPopUp .form-control[data-attr="PH"]').val());
			var recovery = Number($('#feedPopUp .form-control[data-attr="recovery"]').val());
			var projUnits = [{ "TempUnit": "2", "PressUnit": "1", "FlowUnit": "5", "FluxUnit": "1", "PowerUnit": "1", "VolumeUnit": "3" }];
			var jsonData = {
				"PH": "7",
				"Temperature": "25",
				"Recovery": "75",
				"IonLibraryId": value,
				"ProjectNum": 0,
				"IsNew": true,
				"ProjectUnits": projUnits
			};
			writeInputFile(JSON.stringify(jsonData), 1, populateFeedPopUp);
		} else {
			$('#feedPopUp #chlorideBtn,#feedPopUp #sodiumBtn').attr('disabled', true).addClass('disabled');
			$('#feedPopUp .balanceBtn').attr('disabled', true).addClass('disabled');
		}
	});

	$('body').on('change', '#feedPopUp #sel1', function () {
		var sel2Value = $('#feedPopUp #sel2 option:selected').val();
		if (sel2Value != '0') {
			$('#feedPopUp #sel2 option[value="0"]').prop('selected', true);
			$('#feedPopUp #chlorideBtn,#feedPopUp #sodiumBtn').attr('disabled', true).addClass('disabled');
			$('#feedPopUp .balanceBtn').attr('disabled', true).addClass('disabled');
			var num = 0;
			$.each($('#feedTable tr:not(.dispNone)'), function (rowIndex) {
				$(this).children('td:eq(1),td:eq(3)').text(num.toFixed(2)).attr('original', num);
				$(this).children('td:eq(2)').text(num.toFixed(4)).attr('original', num);
			});
			$('#feedPopUp .okBtn').addClass('disabled').attr('disabled', true);
			populateSaturationData(null, false);
			$('#feedPopUp .form-control[data-attr="TDS"]').val('0.00');
			$('#feedPopUp #sel2 option[value="0"]').prop('selected', true);
		}
	});

	/* $('body').on('click', '#feedPopUp .clrBtn', function () {
		clearFeedTable();
		$('#feedPopUp .balanceBtn').attr('disabled', true).addClass('disabled');
		$('#feedPopUp #chlorideBtn,#feedPopUp #sodiumBtn').attr('disabled', true).addClass('disabled');
		$('#feedPopUp #sel2 option[value="0"]').prop('selected', true);
		$('#feedPopUp .form-control[data-attr="Alkalinity"]').val('');
		$('#feedPopUp #sel1 option[value="4"]').prop('selected', true);
	}); */

	$('body').on('click', '#feedPopUp .balanceBtn', function () {
		var ionJSON = prepareIonJSON(true);
		writeInputFile(JSON.stringify(ionJSON), 2, loadBalancedFeedValues);
	});

	$('body').on('click', '#feedPopUp #sodiumBtn, #feedPopUp #chlorideBtn', function () {
		var ions = [];
		var alkalinity = Number($('#feedPopUp .form-control[data-attr="Alkalinity"]').val());
		var temp = Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
		var pH = Number($('#feedPopUp .form-control[data-attr="PH"]').val());
		var tds = Number($('#feedPopUp .form-control[data-attr="TDS"]').val());
		var ions = prepareIonTableJson(false, false);
		var cationIndex = $('#feedTable .non-editable:eq(0)').index();
		var anionIndex = $('#feedTable .non-editable:eq(1)').index();
		sumAllIons(0, cationIndex);
		sumAllIons(cationIndex + 1, anionIndex);
		addMolalLibrary();
		var sumCations = Number($('#feedTable .non-editable:eq(0)').children('td:eq(2)').attr('original'));
		var sumAnions = Number($('#feedTable .non-editable:eq(1)').children('td:eq(2)').attr('original'));

		var isNa = true;
		if ($(this).attr('id') == 'chlorideBtn') {
			isNa = false;
		}
		var projUnits = [{ "TempUnit": "2", "PressUnit": "1", "FlowUnit": "5", "FluxUnit": "1", "PowerUnit": "1", "VolumeUnit": "3" }];
		var jsonData = {
			"IsNa": isNa,
			"TempUnit": 2,
			"CalcSaturation": [],
			"Temp": temp,
			"PH": pH,
			"Recovery": 0,
			"SumCations": sumCations,
			"SumAnions": sumAnions,
			"Alkalinity": alkalinity,
			"DtWater": ions,
			"IonLibraryMolal": [],
			"Isbalanced": false,
			"Coloumn": 5,
			"GessDesnsity": 0,
			"WtSolute": 0,
			"FinalIS": 0,
			"Tds": tds,
			"ProjectUnits": projUnits
		};
		writeInputFile(JSON.stringify(jsonData), 3, addChemicalCompound);
	});

	$('body').on('focus', '#feedTable td[contenteditable="true"]', function () {
		console.log('hi');
		var $this = $(this);
		$this.data('before', $this.text().trim());
		return $this;
	}).on('blur', '#feedTable td[contenteditable="true"]', function () {
		var $this = $(this);
		console.log('hibye');
		if ($this.data('before') !== $this.text().trim()) {
			var index = $(this).index();
			var parentRow = $(this).parent();
			var parentIndex = $(this).parent().index();
			var cationIndex = $('#feedTable .non-editable:eq(0)').index();
			var anionIndex = $('#feedTable .non-editable:eq(1)').index();
			var temp = Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
			var pH = Number($('#feedPopUp .form-control[data-attr="PH"]').val());
			var recovery = 0;
			$(this).attr('original', $(this).text());
			var ions = prepareIonTableJson(true, false);
			var column = index == 2 ? 6 : index == 3 ? 7 : 5;
			var projUnits = [{ "TempUnit": "2", "PressUnit": "1", "FlowUnit": "5", "FluxUnit": "1", "PowerUnit": "1", "VolumeUnit": "3" }];
			if (index == 1 && Number($this.text().trim()) > 100000) {
				$('#feedTable tbody tr:eq(' + parentIndex + ') td[contenteditable="true"]').text('0.00').attr('original', '0');
				$('#feedTable tbody tr:eq(' + parentIndex + ') td:last-child').text('0.00').attr('original', '0');
				alert('mg/l value should range between 0 - 100000');
				cationIndex = $('#feedTable .non-editable:eq(0)').index();
				anionIndex = $('#feedTable .non-editable:eq(1)').index();
				sumAllIons(0, cationIndex);
				sumAllIons(cationIndex + 1, anionIndex);
				addMolalLibrary();
				$('#feedPopUp .balanceBtn').removeClass('disabled').attr('disabled', false);
			} else {
				var jsonData = {
					"Col": column,
					"Row": parentIndex,
					"DtWater": ions,
					"Temp": temp,
					"TempUnit": 2,
					"PH": pH,
					"CalcSaturation": [],
					"Recovery": recovery,
					"ProjectUnits": projUnits
				};
				writeInputFile(JSON.stringify(jsonData), 4, updateFeedTable);
			}
		}
	});

	$('body').on('focus', '#feedPopUp .form-control[data-attr="TDS"]', function () {
		var $this = $(this);
		$this.data('before', Number($this.val().trim()));
		return $this;
	}).on('blur', '#feedPopUp .form-control[data-attr="TDS"]', function () {
		var $this = $(this);
		var value = Number($(this).val().trim());
		if ($this.data('before') > 0 && $this.data('before') !== value) {
			var waComposition = prepareIonTableJson(true, false);
			var alkalinity = Number($('#feedPopUp .form-control[data-attr="Alkalinity"]').val());
			var temp = Number($('#feedPopUp .form-control[data-attr="Temperature"]').attr('original'));
			var pH = Number($('#feedPopUp .form-control[data-attr="PH"]').val());
			var jsonData = {
				"Alkalinity": alkalinity,
				"TdsNew": value,
				"TdsOld": $this.data('before'),
				"DtWater": waComposition,
				"Temp": temp.toString()
			};
			writeInputFile(JSON.stringify(jsonData), 5, loadChangedTDSIons);
		}
	});
	/*Code for settings popup*/
	$('body').on('click', '.updateBtnSettings,.cancelBtnSettings,.settingsPopUp .header i', function () {
		var iterationValue = $("#numOfIterations").val();
		var decimalPlaceValue = $("#decimalPlaces").val();
		var regexNum = /[0-9]/;
		var iterationValueError = regexNum.test(iterationValue);
		var decimalPlaceValueError = regexNum.test(decimalPlaceValue);
		if (iterationValue != "") {
			if (iterationValue > 200 || iterationValue < 0 || iterationValueError == false) {
				$("#numOfIterations").val('100');
				return false;
			}
		}
		if (decimalPlaceValue != "") {
			if (decimalPlaceValue > 9 || decimalPlaceValue < 0 || decimalPlaceValueError == false) {
				$("#decimalPlaces").val('3');
				return false;
			}
		}
		$('.overlay').hide();
		$('.popUp').addClass('dispNone').hide();
	});

	/*$('body').on('click', '#pdfReport', function () {
		$('#pdfExport').trigger('click');
	});*/

	
	$('body').on('click', '#executeBtn', function () {
		
		$('.settings_MB .updateBtn').trigger('click');
		
		var inValidOpsCount = $('.testClass').length;
		if(inValidOpsCount>0){
			console.log("Please fill all data");
			alert("Please fill required data in all highlighted unit operations");
		}
		else{
		
		
		var filePath = "C:/iFSD/Data/iFSDSheet.xlsx";
		

		var homedata = getHomeData();
		var homeValues = homedata[0];

		var unitHeaderValuesData = getUnitHeaderValues();
		var unitHeaderValues = unitHeaderValuesData[0];

		var unitConversionValuesData = getUnitConversionValues();
		var unitConversionValues = unitConversionValuesData[0];
		
		var massBalanceFormat;		
		if(localStorage.getItem('mbItems')){
			massBalanceFormat = JSON.parse(localStorage.getItem('mbItems'));
		}

		var data999 = getCanvasData();
		if(data999){
		var dataValues = data999[0];

		var data2 = getUnitDetails();
		var unitValues = data2[0];

		//excel code
		var xl = require('excel4node');
		var fs = require('fs');
		// Create a new instance of a Workbook class
		var wb = new xl.Workbook();

		// Add Worksheets to the workbook
		var wshome = wb.addWorksheet('Home');
		var ws = wb.addWorksheet('Network_Info');
		var wsinput = wb.addWorksheet('unitop_input');

		var headerStyle = wb.createStyle({
			font: {
				bold: true,
				color: '#FFFFFF',
			},
			alignment: {
				wrapText: true,
				horizontal: 'center',
				vertical: 'center'
			}, border: {
				left: {
					style: 'thin',
					color: '#FFFFFF'
				},
				right: {
					style: 'thin',
					color: '#FFFFFF'
				},
				top: {
					style: 'thin',
					color: '#FFFFFF'
				},
				bottom: {
					style: 'thin',
					color: '#FFFFFF'
				}
			},
			fill: {
				type: 'pattern',
				patternType: 'solid',
				fgColor: '#0000FF'
			}
		});

		// For Home Details

		var rowNum;
		for (var index = 0; index < homeValues.length; index++) {
			rowNum = 1;
			var colNum = 1;
			if (index == 0) {
				wshome.cell(rowNum, colNum).string(homeValues[index].Project).style(headerStyle);
				wshome.cell(rowNum + 1, colNum).string(homeValues[index].Customer).style(headerStyle);
				wshome.cell(rowNum + 2, colNum).string(homeValues[index].Location).style(headerStyle);
				wshome.cell(rowNum + 3, colNum).string(homeValues[index].Date).style(headerStyle);
			} else {
				wshome.cell(rowNum, colNum + 1).string(homeValues[index].Project);
				wshome.cell(rowNum + 1, colNum + 1).string(homeValues[index].Customer);
				wshome.cell(rowNum + 2, colNum + 1).string(homeValues[index].Location);
				wshome.cell(rowNum + 3, colNum + 1).string(homeValues[index].Date);
			}
		}

		// For Stream names
		var rowNum;
		for (var index = 0; index < dataValues.length; index++) {
			rowNum = 1 + index + 1;
			var colNum = 9;
			if (index == 0) {
				ws.cell(rowNum, colNum).string(dataValues[index].StreamName).style(headerStyle);
				ws.cell(rowNum, colNum + 1).string(dataValues[index].Source).style(headerStyle);
				ws.cell(rowNum, colNum + 2).string(dataValues[index].Destination).style(headerStyle);
				//ws.cell(rowNum, colNum + 3).string(dataValues[index].Type).style(headerStyle);
			} else {
				ws.cell(rowNum, colNum).string(dataValues[index].StreamName);
				ws.cell(rowNum, colNum + 1).string(dataValues[index].Source);
				ws.cell(rowNum, colNum + 2).string(dataValues[index].Destination);
				//ws.cell(rowNum, colNum + 3).string(dataValues[index].Type);
			}
		}

		// For Unit names
		var rowNum1;
		var flag=true;	
		var wrongUnitOps=[];
			for (var index1 = 0; index1 < unitValues.length; index1++) {
			rowNum1 = 1 + index1 + 1;
			var colNum1 = 1;
			if (index1 == 0) {
				ws.cell(rowNum1, colNum1).string(unitValues[index1].UnitName).style(headerStyle);
				ws.cell(rowNum1, colNum1 + 1).string(unitValues[index1].UnitType).style(headerStyle);
				ws.cell(rowNum1, colNum1 + 2).string(unitValues[index1].FeedStream).style(headerStyle);
				ws.cell(rowNum1, colNum1 + 3).string(unitValues[index1].ProductStream).style(headerStyle);
				ws.cell(rowNum1, colNum1 + 4).string(unitValues[index1].WasteStream).style(headerStyle);

			} else {
				ws.cell(rowNum1, colNum1).string(unitValues[index1].UnitName);
				if(unitValues[index1].UnitType == 'Tank-Mixer'){
					ws.cell(rowNum1, colNum1 + 1).string('Mixer');
				}else if(unitValues[index1].UnitType == 'Tank-Splitter'){
					ws.cell(rowNum1, colNum1 + 1).string('Splitter');
				}else{
					ws.cell(rowNum1, colNum1 + 1).string(unitValues[index1].UnitType);
				}
				ws.cell(rowNum1, colNum1 + 2).string(unitValues[index1].FeedStream);
				ws.cell(rowNum1, colNum1 + 3).string(unitValues[index1].ProductStream);
				ws.cell(rowNum1, colNum1 + 4).string(unitValues[index1].WasteStream);
				
				var un=unitValues[index1].UnitName;
				var ut=unitValues[index1].UnitType;
				var fs=unitValues[index1].FeedStream;
				var ps=unitValues[index1].ProductStream;
				var w_s=unitValues[index1].WasteStream;				
				
				if(ut == 'Feed'){
					if(ps.length == 0){
						flag=false;
						wrongUnitOps.push(un);						
					}
				}else if(ut == 'RO' || ut == 'MF' || ut == 'SF' || ut == 'FF' || ut == 'EDI' || ut == 'Lamella' || ut == 'DensaDeg'){
					var con1_valid = false, con2_valid = false, con3_valid = false;
					if(fs.length == 0 || ps.length == 0 || w_s.length == 0){
						flag=false;
						wrongUnitOps.push(un);
					}
				}else if(ut == 'MB' || ut == 'CO2' || ut == 'CF' || ut == 'O2' || ut == 'Hydratedlime' || ut == 'Limestone'){
						var con1_valid_1 = false, con2_valid_1 = false;
						if(fs.length == 0 || ps.length == 0 ){
							flag=false;
							wrongUnitOps.push(un);
						}
				}
			}
		}


	if(flag==true){
			$('#progress').show();
			$('.overlay').show();		
		/* ------------- For unit Conversions ---------*/

		var colNum1 = 15;
		for (var index1 = 0; index1 < unitConversionValues.length; index1++) {
			colNum1 = 26 + index1;

			if (index1 == 0) {
			} else {
				ws.cell(1, colNum1).string(unitHeaderValues[index1].Header);
				ws.cell(2, colNum1).string(unitConversionValues[index1].Data);
			}
		}
		/* ------------- For unit Conversions ---------*/
		
		/* ------------- For Mass Balance Format ---------*/
		if(massBalanceFormat){
			var rowNumMB;
			for (var indexMB = 0; indexMB < massBalanceFormat.length; indexMB++) {
				rowNumMB = 3 + indexMB + 1;
				var colNumMB = 29;
				ws.cell(rowNumMB, colNumMB ).string(massBalanceFormat[indexMB]);
			}
		}
		/* ------------- For Mass Balance Format ---------*/


		var rowNo = 1;
		var colNum1 = 2;


		/* ---------------- For unit Co2 inputs ---------------- */


		//var co2_length = co2FormArrya.length;
		var co2_length;
		co2_length = co2FormArrya.length;
		if(co2_length == 0){
			if(localStorage.getItem('co2FormCount')){
				co2FormArrya = JSON.parse(localStorage.getItem('co2FormCount'));
				co2_length = co2FormArrya.length;
			}
		}

		for (var i = 0; i < co2_length; i++) {

			var curentId = co2FormArrya[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Normal Flow Rate", "CO2 Concentration Out", "Liquid Loading Rate", "Clearwell Retention Time", "Turndown ratio",
				"Tower Height", "Clearwell Height", "Packing Support Grating Height", "Overflow Nozzle Diameter", "Inlet Header Distributor Size", "Spray Nozzle Height", "Fan Size",
				"a", "b", "c", "d", "e",];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "normal_flow_rate", "co2_out", "liq_load", "ret_time", "turndown_ratio",
				"tow_height", "clear_height", "pack_supp_grat_height", "overflow_nozz_dia", "inlet_header_size", "spray_nozzle_height", "fan_size",
				"a", "b", "c", "d", "e",];


			var co2FormUnitValues = ["normalFlowRate", "cO2ConcentrationOut", "liquidLoadingRate", "clearwellRetentionTime", "turndownRatio",
				"towerHeight", "clearwellHeight", "packingSupportGratingHeight", "overflowNozzleDiameter", "inletHeaderDistributorSize", "sprayNozzleHeight", "fanSize",
				"a", "b", "c", "d", "e"];

			var co2FormUnitData = ["normalFlowRate1", "cO2ConcentrationOut1", "liquidLoadingRate1", "clearwellRetentionTime1", "turndownRatio1", "towerHeight1", "clearwellHeight1", "packingSupportGratingHeight1", "overflowNozzleDiameter1", "inletHeaderDistributorSize1", "sprayNozzleHeight1", "fanSize1",
				"a1", "b1", "c1", "d1", "e1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit Co2 inputs ---------------- */



		/* ---------------- For unit o2 inputs ---------------- */

		//var o2_length = o2FormArrya.length;
		var o2_length;
		o2_length = o2FormArrya.length;
		if(o2_length == 0){
			if(localStorage.getItem('o2FormCount')){
				o2FormArrya = JSON.parse(localStorage.getItem('o2FormCount'));
				o2_length = o2FormArrya.length;
			}
		}

		for (var i = 0; i < o2_length; i++) {

			var curentId = o2FormArrya[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream",
				"Inlet O2", "Inlet N2", "Outlet O2 Stage 2", "Diameter", "Stage-1 Tower Packing Depth",
				"Stage-1 Inlet to Packing Height", "Stage-1 Inlet to Upper Head T.L.",
				"Stage-2 Tower Packing Depth", "Stage-2 Loop Seal Height", "Clearwell Retention Time",
				"Clearwell Straight Side Height", "Pump Outlet Diameter", "Low-Low Level alarm",
				"Low Level alarm", "High Level alarm", "Inlet Diameter", "Overflow", "Skirt Straight Side Height"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "o2_in_stage1",
				"n2_in_stage1", "o2_out_stage2", "tower_diameter", "pack_depth_stage_1", "inlet_to_packheight",
				"inlet_to_upperhead", "pack_depth_stage_2", "loop_seal_height", "ret_time", "clearwell_straight_height",
				"pump_out_dia", "lll_alarm", "ll_alarm", "hl_alarm", "inlet_dia", "overflow", "skirt_straight_height"];


			var co2FormUnitValues = ["inletO2", "inletN2", "outletO2Stage2", "diameter", "towerPackingDepth",
				"inletToPackingHeight", "inletToUpperHeadTL", "towerPackingDepth2", "loopSealHeight",
				"clearwellRetentionTime", "clearwellStraightSideHeight", "pumpOutletDiameter", "low_LowLevelalarm",
				"lowLevelalarm", "highLevelalarm", "inletDiameter", "overflow", "skirtStraightSideHeight"];

			var co2FormUnitData = ["inletO21", "inletN21", "outletO2Stage21", "diameter1", "towerPackingDepth1",
				"inletToPackingHeight1", "inletToUpperHeadTL1", "towerPackingDepth21", "loopSealHeight1",
				"clearwellRetentionTime1", "clearwellStraightSideHeight1", "pumpOutletDiameter1", "low_LowLevelalarm1",
				"lowLevelalarm1", "highLevelalarm1", "inletDiameter1", "overflow1", "skirtStraightSideHeight1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];


			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit o2 inputs ---------------- */



		/* ---------------- For unit feed inputs ---------------- */
		//var feed_length = feedFormArray.length;
		var feed_length;
		feed_length = feedFormArray.length;
		if(feed_length == 0){
			if(localStorage.getItem('feedFormCount')){
				feedFormArray = JSON.parse(localStorage.getItem('feedFormCount'));
				feed_length = feedFormArray.length;
			}
		}

		for (var i = 0; i < feed_length; i++) {

			var curentId = feedFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Flow", "Temperature", "Pressure", "Calcium", "Magnesium", "Sodium", "Potassium", "Ammonia", "Barium", "Strontium", "Iron", "Maganese", "Sulfate", "Chloride", "Fluoride", "Nitrate", "Bromide", "Phosphate", "Boron", "Silica", "Hydrogen Sulfide", "Bicarbonate", "Carbon Dioxide", "Carbonate", "TSS", "TOC", "DOC", "COD", "TKN", "TDS", "Turbidity", "Color", "M-Alkalinity", "pH"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste",
				"flow", "temp", "press", "ca", "mg", "na", "k", "nh4",
				"ba", "sr", "fe", "mn", "so4", "cl",
				"f", "no3", "br", "po4", "b", "si",
				"h2s", "hco3", "co2", "co3", "tss", "toc",
				"doc", "cod", "tkn", "tds", "turbidity", "color", "malk", "ph"];

			var co2FormUnitValues = ["feed_flow", "feed_Temperature", "feed_Pressure", "calcium_Feed", "magnesium_Feed", "Sodium_Feed", "Potassium_Feed", "Ammonia_Feed", "Barium_Feed",
				"Strontium_Feed", "Iron_Feed", "Maganese_Feed",
				"Sulfate_Feed", "Chloride_Feed", "Fluoride_Feed", "Nitrate_Feed",
				"Bromide_Feed", "Phosphate_Feed", "Boron_Feed", "Silica_Feed", "hydrogenSulphide_Feed",
				"Bicarbonate_Feed", "carbonDiOxide_Feed", "carbonate_Feed", "feed_TSS", "feed_TOC", "feed_DOC", "feed_COD", "feed_TKN", "feed_TDS",
				"feed_Turbidity", "feed_Color", "feed_Total_Akalinity", "feed_pH"];

			var co2FormUnitData = ["feed_TDS1", "feed_Temperature1", "feed_Pressure1", "calciumfeed1", "magfeed1", "sodfeed1", "potfeedpotfeed1", "ammonfeed1", "barfeed1", "stornfeed1", "ironfeed1", "magnesefeed1", "sulfatefeed1", "chlfeed1", "flufeed1", "nitrateefeed1", "bromfeed1", "phosfeed1", "boronnfeed1", "silfeed1", "hydrogenfeed1", "bicarfeed1", "corfeed1", "corbonatfeed1", "feed_TSS1", "feed_TOC1", "feed_DOC1", "feed_COD1", "feed_TKN1", "feed_TDS_unit", "feed_Turbidity1", "feed_Color1", "feed_Total_Akalinity1", "feed_pH1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit feed inputs ---------------- */


		/* ---------------- For unit sf inputs ---------------- */

		//var sf_length = sfFormArrya.length;
		var sf_length;
		sf_length = sfFormArrya.length;
		if(sf_length == 0){
			if(localStorage.getItem('sfFormCount')){
				sfFormArrya = JSON.parse(localStorage.getItem('sfFormCount'));
				sf_length = sfFormArrya.length;
			}
		}

		for (var i = 0; i < sf_length; i++) {

			var curentId = sfFormArrya[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Application", "Feed Water", "Recovery"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "application", "fwtype", "recovery"];

			var co2FormUnitValues = ["applicationId", "feedWaterId", "recoveryId"]


			var inputdata = getSFForm(co2FormUnitValues, curentId);
			var inputdataValues = inputdata[0];

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit sf inputs ---------------- */


		/* ---------------- For unit Lamella inputs ---------------- */

		//var lamella_length = lamellaFormArray.length;
		
		var lamella_length;
		lamella_length = lamellaFormArray.length;
		if(lamella_length == 0){
			if(localStorage.getItem('lamellaFormCount')){
				lamellaFormArray = JSON.parse(localStorage.getItem('lamellaFormCount'));
				lamella_length = lamellaFormArray.length;
			}
		}

		var conceptName = $('#chemicalSelection').find(":selected").text();

		for (var i = 0; i < lamella_length; i++) {

			var curentId = lamellaFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Clarifier Sludge Blowdown",
				"Chemical Selection", "Kg dry sludge/kg " + conceptName + " coagulant", "% of Sludge as fixed soils", "Fixed Soil Specific Gravity", "Volatile Soil Specific Gravity",
				"Clarifier Diameter", "Clarifier Active Depth", "Clarifier Flocculation Zone Area to total Area (%)"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "clarifier_sludge_blowdown",
				"chemical_selection", "dry_sludge_per_chemical_dosage", "sludge_fixed_soils", "fixed_soil_sg", "volatile_soil_sg",
				"clarifier_dia", "clarifier_active_depth", "clarifier_flocculation_area_to_total_area"];


			var co2FormUnitValues = ["clarifierSludgeBlowdown", "chemicalSelection", "kgDrysludge", "ofSludgeasfixedsoils", "fixedSoilSpecificGravity",
				"volatileSoilSpecificGravity", "clarifierDiameter", "clarifierActiveDepth", "clarifierFlocculationZoneArea"];

			var co2FormUnitData = ["clarifierSludgeBlowdown1", "chemicalSelection1", "kgDrysludge1", "ofSludgeasfixedsoils1", "fixedSoilSpecificGravity1",
				"volatileSoilSpecificGravity1", "clarifierDiameter1", "clarifierActiveDepth1", "clarifierFlocculationZoneArea1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit Lamella inputs ---------------- */

		/* ---------------- For unit CF inputs ---------------- */

		//var cf_length = cfFormArray.length;
		var cf_length;
		cf_length = cfFormArray.length;
		if(cf_length == 0){
			if(localStorage.getItem('cfFormCount')){
				cfFormArray = JSON.parse(localStorage.getItem('cfFormCount'));
				cf_length = cfFormArray.length;
			}
		}
		

		for (var i = 0; i < cf_length; i++) {

			var curentId = cfFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Filter Type",
				"Flow per TIE"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "filter_type",
				"flow_per_tie"];


			var co2FormUnitValues = ["cffilterTypeOptions", "cfflowTieId"];

			var co2FormUnitData = ["cffilterTypeOptions1", "cfflowTieId1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit CF inputs ---------------- */

		/* ---------------- For unit Splitter inputs ---------------- */

		//var splitter_length = splitterFormArray.length;
		var splitter_length;
		splitter_length = splitterFormArray.length;
		if(splitter_length == 0){
			if(localStorage.getItem('splitterFormCount')){
				splitterFormArray = JSON.parse(localStorage.getItem('splitterFormCount'));
				splitter_length = splitterFormArray.length;
			}
		}

		for (var i = 0; i < splitter_length; i++) {

			var curentId = splitterFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "No of outlet streams"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "outlet_streams"];


			var co2FormUnitValues = ["numberOfOutletStreams"];

			var co2FormUnitData = ["numberOfOutletStreams1"];
			var t = JSON.parse(localStorage.getItem(curentId));
			outPutStreamLength = t.outPutStreamLength;
			if (outPutStreamLength) {
				//var t = JSON.parse(localStorage.getItem(curentId));
				for (var m = 0; m < t.outPutStreamArray.length; m++) {
					inputunitnames.push('Stream ' + t.outPutStreamArray[m] + '');
					inputnametops.push(t.outPutStreamArray[m]);
					//co2FormUnitValues.push('stream_');
					//co2FormUnitData.push('stream_'+t.outPutStreamArray[m]+'_1');
				}
			}

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];
			for (var n = 0; n < t.splitterStreams.length; n++) {
				inputdataValues.push(t.splitterStreams[n]);
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit Splitter inputs ---------------- */
		
		/* ---------------- For unit Tank - Splitter inputs ---------------- */

		//var splitter_length = splitterFormArray.length;
		var tank_splitter_length;
		tank_splitter_length = tank_splitterFormArray.length;
		if(tank_splitter_length == 0){
			if(localStorage.getItem('tankSplitterFormCount')){
				tank_splitterFormArray = JSON.parse(localStorage.getItem('tankSplitterFormCount'));
				tank_splitter_length = tank_splitterFormArray.length;
			}
		}

		for (var i = 0; i < tank_splitter_length; i++) {

			var curentId = tank_splitterFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "No of outlet streams"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "outlet_streams"];


			var co2FormUnitValues = ["tank_numberOfOutletStreams"];

			var co2FormUnitData = ["tank_numberOfOutletStreams1"];
			var t = JSON.parse(localStorage.getItem(curentId));
			tank_outPutStreamLength = t.tank_outPutStreamLength;
			if (tank_outPutStreamLength) {
				//var t = JSON.parse(localStorage.getItem(curentId));
				for (var m = 0; m < t.tank_outPutStreamArray.length; m++) {
					inputunitnames.push('Stream ' + t.tank_outPutStreamArray[m] + '');
					inputnametops.push(t.tank_outPutStreamArray[m]);
					//co2FormUnitValues.push('stream_');
					//co2FormUnitData.push('stream_'+t.outPutStreamArray[m]+'_1');
				}
			}

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];
			for (var n = 0; n < t.tank_splitterStreams.length; n++) {
				inputdataValues.push(t.tank_splitterStreams[n]);
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								if(unitValues[index1].UnitType == 'Tank-Splitter'){
									wsinput.cell(2, colNum1 + 2).string('Splitter');
								}else{
									wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								}
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit Tank - Splitter inputs ---------------- */


		/* ---------------- For unit Hydratedlime inputs ---------------- */

		//var hydratedlime_length = hydratedlimeFormArray.length;
		var hydratedlime_length;
		hydratedlime_length = hydratedlimeFormArray.length;
		if(hydratedlime_length == 0){
			if(localStorage.getItem('hydratedlimeFormCount')){
				hydratedlimeFormArray = JSON.parse(localStorage.getItem('hydratedlimeFormCount'));
				hydratedlime_length = hydratedlimeFormArray.length;
			}
		}

		for (var i = 0; i < hydratedlime_length; i++) {

			var curentId = hydratedlimeFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "CO2 add", "Ca(OH)2", "NaOH"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "co2_add", "caoh2", "naoh"];

			var co2FormUnitValues = ["cO2", "caOH2", "naOH"];

			var co2FormUnitData = ["cO21", "caOH21", "naOH1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {


					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit Hydratedlime inputs ---------------- */


		/* ---------------- For unit EDI inputs ---------------- */

		//var edi_length = ediFormArray.length;
		var edi_length;
		edi_length = ediFormArray.length;
		if(edi_length == 0){
			if(localStorage.getItem('ediFormCount')){
				ediFormArray = JSON.parse(localStorage.getItem('ediFormCount'));
				edi_length = ediFormArray.length;
			}
		}

		for (var i = 0; i < edi_length; i++) {

			var curentId = ediFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Model Type", "Co- Current Flow", "RO permeate softening", "Target Resistivity", "Flow per stack", "Target Silica", "Rectifier efficiency", "Recifier DC output"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "model_type", "co_current", "ro_perm_soft", "target_resistivity", "flowperstack", "target_silica", "rect_eff", "rect_dc_volt"];

			var co2FormUnitValues = ["edimodeltype", "coCurrentY", "roPerY", "stargetSenId",
				"sFlowPerStackId", "stargetSilicaId", "srectifierEffId", "srectifierDCId"];

			var co2FormUnitData = ["edimodeltype1", "coCurrentY1", "roPerY1", "stargetSenId1",
				"sFlowPerStackId1", "stargetSilicaId1", "srectifierEffId1", "srectifierDCId1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var index1 = 0; index1 < unitValues.length; index1++) {

						if (index1 == 0) {
						} else {
							if (unitValues[index1].UnitName == labelId) {
								wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
								wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
								wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
								wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
								wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
							}
						}
					}


					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit EDI inputs ---------------- */


		/* ---------------- For unit Limestone inputs ---------------- */


		//var limeStone_length = limeStoneFormArray.length;
		var limeStone_length;
		limeStone_length = limeStoneFormArray.length;
		if(limeStone_length == 0){
			if(localStorage.getItem('limeStoneFormCount')){
				limeStoneFormArray = JSON.parse(localStorage.getItem('limeStoneFormCount'));
				limeStone_length = limeStoneFormArray.length;
			}
		}

		for (var i = 0; i < limeStone_length; i++) {

			var curentId = limeStoneFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Remineralization Bypass", "Reactive CO2/H2SO4", "CO2 Stream 1A", "CO2 Stream 1B", "NaOH", "H2SO4", "Remineralization Type", "Reactor Length", "Reactor Width", "Assumed Bed depth", "Reduction in Finshed bed depth", "Number of Spare Units (N + )", "Assumed CaCO3 purity ", "Assumed CaCO3 specific gravity", "Vessel Diameter", "Assumed Total Bed depth", "Reduction in Finshed bed depth", "Number of Spare Units", "Assumed CaCO3 purity", "Assumed CaCO3 specific gravity"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "remin_bypass", "reactive_co2_by_h2so4", "co2_add_1a", "co2_add_1b", "naoh", "h2so4", "remin_type", "reactor_length", "reactor_width", "bed_depth_assumed", "finished_bed_depth_reduction", "no_spare_units", "caco3_purity", "caco3_sg", "vessel_diameter", "bed_depth_assumed", "finished_bed_depth_reduction", "no_spare_units", "caco3_purity", "caco3_sg"];

			var co2FormUnitValues = ["remineralizationBypass", "reactiveCO2_H2SO4", "cO2Stream1A", "cO2Stream1B", "naOH", "h2SO4", "remineralizationType", "reactorLength", "reactorWidth", "assumedBeddepth", "reductionInFinshedBedDepth", "numberOfSpareUnitsN", "assumedCaCO3Purity",
				"assumedCaCO3SpecificGravity", "pR_vesselDiameter", "pR_assumedTotalBedDepth", "pR_reductionInFinshedBedDepth", "pR_NumberOfSpareUnits", "pR_assumedCaCO3Purity", "pR_AssumedCaCO3SpecificGravity"];

			var co2FormUnitData = ["remineralizationBypass1", "reactiveCO2_H2SO41", "cO2Stream1A1", "cO2Stream1B1", "naOH1", "h2SO41", "remineralizationType1", "reactorLength1", "reactorWidth1", "assumedBeddepth1", "reductionInFinshedBedDepth1", "numberOfSpareUnitsN1", "assumedCaCO3Purity1",
				"assumedCaCO3SpecificGravity1", "pR_vesselDiameter1", "pR_assumedTotalBedDepth1", "pR_reductionInFinshedBedDepth1", "pR_NumberOfSpareUnits1", "pR_assumedCaCO3Purity1", "pR_AssumedCaCO3SpecificGravity1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit LimeStone inputs ---------------- */


		/* ---------------- For unit MF(Filter) inputs ---------------- */


		//var mmf_length = mmfFormArray.length;
		var mmf_length;
		mmf_length = mmfFormArray.length;
		if(mmf_length == 0){
			if(localStorage.getItem('mmfFormCount')){
				mmfFormArray = JSON.parse(localStorage.getItem('mmfFormCount'));
				mmf_length = mmfFormArray.length;
			}
		}

		for (var i = 0; i < mmf_length; i++) {

			var curentId = mmfFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Filter Type", "Total Design Flow rate", "Total Maximum Flow rate", "Total number of installed unit(s)", "Unit(s) in service, normally", "Loading Rate", "Inlet Total Organic Carbon, Optional", "Inlet Chlorine, Optional", "Media Bed Freeboard", "Back wash Temp, High", "Back wash Temp, Low", "Post back wash rinse", "Air Scour", "Sub surface wash", "Design Pressure", "Corrosion allowance (Optional)", "Choice of lining", "Outer Diameter", "Tan length", "Head Type", "Sand Depth", "Anthracite Depth",
				"Garnet Depth", "Sub Fill Type", "Green Sand Load", "Anthracite Cap", "Shell Joint efficiency", "Head Joint efficiency", "Backwash Time (Optional)", "Drain Time (Optional)", "Refill Time (Optional)", "Rinse Time (Optional)", "Subsurface Wash Time (Optional)","Air Scour Time (Optional)", "Rinse flow to be maintained same as service flow", "Rinse water recycled to feed"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "filter_type", "tot_design_flow", "tot_max_flow", "tot_units", "service_units", "loading_rate", "inlet_toc", "inlet_chlorine", "free_board", "bw_temp_high", "bw_temp_low", "post_bw_rinse", "airscour", "ssw", "design_pressure", "corr_allowance", "lining_type", "outer_dia",
				"tan_length", "head_type", "sand_depth", "anthracite_depth",
				"garnet_depth", "subfill_type", "greensand_load", "anthracite_cap", "shelljoint_eff", "headjoint_eff", "backwash_time", "drain_time", "refill_time", "rinse_time", "ssw_time", "air_scour_time", "rinse_serviceflow", "rinse_feed"];

			var co2FormUnitValues = ["filterType", "designFlowRate", "maxFlowRate", "installedUnits", "unitsInService", "loadingRate", "inletTotalCarbon", "inletChlorine", "mediaBed", "backWashTemphigh", "backWashTempLow", "postBackWash", "airScourId", "subSurfaceWashId", "designPressure", "corrosionAllowance", "choiceLining", "outerDia", "tanLength", "headType", "sandDepthId", "anthraId", "garnetId", "subFillTypeId", "greenSandLoadId", "anthraciteCapId", "shellJointEfficiency", "headJointEfficiency", "backWashTime", "drainTime", "refillTime", "rinseTime", "surfaceWashTime","airScourTime", "rinseServiceFlow", "rinseFeedRecycle"];

			var co2FormUnitData = ["filterType1","designFlowRate1", "maxFlowRate1", "installedUnits1", "unitsInService1", "loadingRate1", "inletTotalCarbon1", "inletChlorine1", "mediaBed1", "backWashTemphigh1", "backWashTempLow1", "postBackWash1", "airScourId1", "subSurfaceWashId1", "designPressure1", "corrosionAllowance1", "choiceLining1", "outerDia1", "tanLength1", "headType1", "sandDepthId1", "anthraId1", "garnetId1", "subFillTypeId1", "greenSandLoadId1", "anthraciteCapId1", "shellJointEfficiency1", "headJointEfficiency1", "backWashTime1", "drainTime1", "refillTime1", "rinseTime1", "surfaceWashTime1", "airScourTime1", "rinseServiceFlow1", "rinseFeedRecycle1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						//if (inputdataValues[k] !== 'NaN') {
							wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
							wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
							if (inputdataValues[k]) {
								wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
							} else {
								wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
							}
						//}
					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit MF(Filter) inputs ---------------- */

		/* ---------------- For unit Ix(MB) inputs ---------------- */


		//var ix_length = ixmMixedBedArray.length;
		var ix_length;
		ix_length = ixmMixedBedArray.length;
		if(ix_length == 0){
			if(localStorage.getItem('ixmMixedBedCount')){
				ixmMixedBedArray = JSON.parse(localStorage.getItem('ixmMixedBedCount'));
				ix_length = ixmMixedBedArray.length;
			}
		}

		for (var i = 0; i < ix_length; i++) {

			var curentId = ixmMixedBedArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream",
				"Cation", "Anion", "Inert",
				"SAC unit Leakage", "SBA unit Leakage", "Cation Excahnge Capacity", "Anion Exchange Capacity",
				"Acid Dosage", "Caustic Dosage",
				"Acid type", "Acid Concentration", "Acid Step1", "Acid Step2", "Conc. Caustic", "Dilute Caustic",
				"Run Length", "Use Gross Flow",
				"Recycle Mix Bed", "Inert Resins", "Ambersep Resins", "Back Wash Source", "Heated Caustic", "Underdrain Type", "Lining Thickness",
				"Force Bed Depth Cation", "Force Bed Depth Anion",
				"MB Diameter", "MB Freeboard", "Design Pressure",
				"Resin High Temperature", "Regen Temperature", "A", "B", "C", "D", "Slow BW", "Slow & Classify BW %",
				"Acid Injection Flow", "Caustic Injection Flow",
				"Use Service Flow for Rines"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste",
				"cation_res", "anion_res", "inert_res",
				"sac_unit_leakage", "sba_unit_leakage", "sac_kgr_per_ft3", "sba_kgr_per_ft3",
				"acid_dosage", "caustic_dosage",
				"acid_type", "acid_concetration", "acid_step_1", "acid_step_2", "conc_caustic", "dilute_caustic",
				"run_length", "use_gross_flow_as_serviceflow",
				"recycle_mixed_bed", "inert_resins", "ambersep_resins", "backwash_source",
				"heated_caustic", "underdrain_type", "lining_thickness",
				"force_bed_depth_cation", "force_bed_depth_anion",
				"mb_diameter", "mb_freeboard", "design_pressure",
				"resin_high_temperature", "regen_temperature", "a", "b", "c", "d", "slow_with_classify", "slow_without_classify_and_classify_backwash",
				"acid_injection_flow_rate_per_volume", "caustic_injection_flow_rate_per_volume", "use_service_flow_for_rinse"];

			var co2FormUnitValues = ["ixmhcation", "ixmhcanion", "ixminert",
				"ixmSAC", "ixmSBA", "ixmCatEx", "ixmAnEx",
				"ixmAcid", "ixmCaustic",
				"ixm_acidType", "ixmAcidCon", "ixmStep1", "ixmStep2", "ixmConcCaustic", "ixmDiluteCaustic",
				"ixmRunLength", "ixmGrossFlow",
				"ixmRecycleMixBed", "ixmInsertResins", "ixmAmberstepResins", "ixmBackwashSource",
				"ixmHeatedCaustics", "ixmUnderdrainType", "ixmLiningThickness",
				"ixmForceBedDepth", "ixmForceBedAnion",
				"ixmMBDiameter", "ixmMBFreeboard", "ixmDesignPressure",
				"ixmResinHighTemp", "ixmRegenHighTemp", "ixmbackWashA", "ixmbackWashB", "ixmbackWashC", "ixmbackWashD", "ixmSlowBW", "ixmSlowWO",
				"ixmAcidInjectionflow", "ixmCausticInjection", "ixmServiceFlowRinse"];

			var co2FormUnitData = ["ixmhcation1", "ixmhcanion1", "ixminert1",
				"ixmSAC1", "ixmSBA1", "ixmCatEx1", "ixmAnEx1",
				"ixmAcid1", "ixmCaustic1",
				"ixm_acidType1", "ixmAcidCon1", "ixmStep11", "ixmStep21", "ixmConcCaustic1", "ixmDiluteCaustic1",
				"ixmRunLength1", "ixmGrossFlow1",
				"ixmRecycleMixBed1", "ixmInsertResins1", "ixmAmberstepResins1", "ixmBackwashSource1",
				"ixmHeatedCaustics1", "ixmUnderdrainType1", "ixmLiningThickness1",
				"ixmForceBedDepth1", "ixmForceBedAnion1",
				"ixmMBDiameter1", "ixmMBFreeboard1", "ixmDesignPressure1",
				"ixmResinHighTemp1", "ixmRegenHighTemp1", "ixmbackWashA1", "ixmbackWashB1", "ixmbackWashC1", "ixmbackWashD1", "ixmSlowBW1", "ixmSlowWO1",
				"ixmAcidInjectionflow1", "ixmCausticInjection1", "ixmServiceFlowRinse1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit Ix(MB) inputs ---------------- */

		/* ---------------- For unit RO inputs ---------------- */


		//var ro_length = rofFormArray.length;
		var ro_length;
		ro_length = rofFormArray.length;
		if(ro_length == 0){
			if(localStorage.getItem('rofFormCount')){
				rofFormArray = JSON.parse(localStorage.getItem('rofFormCount'));
				ro_length = rofFormArray.length;
			}
		}

		for (var i = 0; i < ro_length; i++) {

			var curentId = rofFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "System Recovery", "Element Type", "Elements per vessel", "Average Flux", "Elements Area", "Elements Age", "Flux Annual Percentage change", "Salt passage", "Pump efficiency", "Ca", "Mg", "Na", "K", "NH4", "Ba", "Sr", "Fe", "Mn", "SO4", "CI", "F", "NO3", "Br", "Po4", "B", "Silica", "H2S", "HCO3", "CO2", "CO3"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste",
				"recovery_stg1", "element_type", "elementspervessel", "avg_flux_stg1", "membrane_area", "element_age", "flux_change", "saltpassage_change", "pump_eff", "ca_rej", "mg_rej", "na_rej", "k_rej", "nh4_rej", "ba_rej", "sr_rej", "fe_rej", "mn_rej", "so4_rej", "cl_rej", "f_rej", "no3_rej", "br_rej", "po4_rej", "b_rej", "sio2_rej", "h2s_rej", "hco3_rej", "co2_rej", "co3_rej"];

			var co2FormUnitValues = ["roRecovery", "elementType", "roElementsPerVessel", "roFlux", "roElemArea", "roElemAge", "roFluxChange", "saltPassage", "pumpEfficiency",
				"rocaid", "romgid", "ronaid", "rokid", "ronhid", "robaid", "rosrId", "roFeId", "roMnId",
				"rosoId", "roclId", "rofId", "ronoId", "roBrId", "roPoId", "roBId", "roSilicaId", "rohsid", "rohcoId", "rohcotId", "rohcothId"];

			var co2FormUnitData = ["roRecovery1", "elementType1", "roElementsPerVessel1", "roFlux1", "roElemArea1", "roElemAge1", "roFluxChange1", "saltPassage1", "pumpEfficiency1",
				"rocaid1", "romgid1", "ronaid1", "rokid1", "ronhid1", "robaid1", "rosrId1", "roFeId1", "roMnId1", "rosoId1", "roclId1", "rofId1", "ronoId1", "roBrId1", "roPoId1",
				"roBId1", "roSilicaId1", "rohsid1", "rohcoId1", "rohcotId1", "rohcothId1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit RO inputs ---------------- */
		
		/* ---------------- For unit DensaDeg inputs ---------------- */


		//var dd_length = ddFormArray.length;
		var dd_length;
		dd_length = ddFormArray.length;
		if(dd_length == 0){
			if(localStorage.getItem('ddFormCount')){
				ddFormArray = JSON.parse(localStorage.getItem('ddFormCount'));
				dd_length = ddFormArray.length;
			}
		}

		for (var i = 0; i < dd_length; i++) {

			var curentId = ddFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Peak Flow", "Application", "No. of Units", "Model", "Flow Rate Selection", "Hours of Operation per day", "Effluent TSS", "Coagulant Selection", "Coagulant Dose", "Effluent Sludge Concentration", "Steel Tank", "Steel Tank MOC", "Steel Tank Prep", "Steel Tank Finish (inside)", "Steel Tank Finish (outside) (#1-5)", "Steel Tank Bottom", "Steel Tank Legs (#1-5 only)", "Internal Steel MOC?", "Internal Steel Prep", "Internal Steel Finish", "Troughs MOC?", "Local Control Panel By SUEZ?", "No. Of Units Per Panel?", "Level Of Controls?", "Skid Mount Pumps?", "Skid Piping MOC", "Total No. Of Recycle Pumps?", "Total No. Of Sludge Pumps?", "Motor Voltage", "Motor Phase", "Motor Freq.", "VFDs By SUEZ?", "Include in our scope?", "Energy Gradient:", "Type of Motor:", "Wetted MOC:", "Type of Drive:", "Operating Station Enclosure:", "Mixer Manufacturers:", "Transfer Pipe Diameter (FINAL)", "Effluent Pipe Diameter", "Basis of Sizing", "Single or Common Rapid Mixer?", "RM Detention Time?", "RM Inlet Pipe Diameter?", "Flow Split Length (D)", "RM Detention Time?", "RM Inlet Pipe Diameter?", "Reactor Model Override", "Pump Type", "Application", "Recycle %", "Unit Freeboard", "Tube Height", "Outlet Trough Sides"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste", "peak_flow", "application", "no_of_units", "model_selection", "flow_rate_selection_for_sludge", "hours_opreations_per_day", "product_tss", "coagulant_selection" , "coagulant_dose", "effluent_sludge_concentration", "steel_tank", "steel_tank_moc", "steel_tank_prep", "steel_tank_finish_inside", "steel_tank_finish_outside", "steel_tank_bottom", "steel_tank_legs", "internal_steel_moc", "internal_steel_prep", "internal_steel_finish", "troughs_moc", "local_control_panel_by_suez", "no_of_units_per_panel", "level_of_controls", "skid_mount_pumps", "skid_piping_moc", "total_no_of_recycle_pumps", "total_no_of_sludge_pumps", "voltage", "motor_phase", "motor_freq", "vfd_by_suez", "include_in_our_scope", "energy_gradient", "type_of_motor", "wetted_moc", "type_of_drive", "operating_station_enclosure", "mixer_manufacturers", "transfer_pipe_diameter_final", "effluent_pipe_diameter", "basis_of_sizing", "single_or_common_rapid_mixer", "rm_detension_time", "rm_inlet_pipe_dia", "flow_split_length_D", "rm_detension_time", "rm_inlet_pipe_dia", "reactor_model_override", "pump_type", "pump_application", "recycle_percent", "unit_freeboard", "tube_height", "outlet_trough_sides"];

			var co2FormUnitValues = [ "ddPf", "ddApplication", "ddNou", "ddMs", "ddFrs", "ddHoa", "ddEtss", "ddCs", "ddScd", "ddEsc", "ddSt", "ddStmoc", "ddStp", "ddStfi", "ddStfo", "ddStb", "ddStl", "ddIsm", "ddIsp", "ddIsf", "ddTmoc", "ddLcp", "ddNoupp", "ddLoc", "ddSmp", "ddSpm", "ddTnorp", "ddTnosp", "ddMv", "ddMp", "ddMf", "ddVfd", "ddIios", "ddEg", "ddTom", "ddWmoc", "ddTod", "ddOse", "ddMm", "ddTps", "ddEpd", "ddBos", "ddSocrm", "ddCrmdt", "ddCrmipd", "ddFsld", "ddSrmdt", "ddSrmipd", "ddRmo", "ddPt", "ddA", "ddR", "ddUf", "ddTh", "ddOts"
			];

			var co2FormUnitData = ["ddPf1", "ddApplication1", "ddNou1", "ddMs1", "ddFrs1", "ddHoa1", "ddEtss1", "ddCs1", "ddScd1", "ddEsc1", "ddSt1", "ddStmoc1", "ddStp1", "ddStfi1", "ddStfo1", "ddStb1", "ddStl1", "ddIsm1", "ddIsp1", "ddIsf1", "ddTmoc1", "ddLcp1", "ddNoupp1", "ddLoc1", "ddSmp1", "ddSpm1", "ddTnorp1", "ddTnosp1", "ddMv1", "ddMp1", "ddMf1", "ddVfd1", "ddIios1", "ddEg1", "ddTom1", "ddWmoc1", "ddTod1", "ddOse1", "ddMm1", "ddTps1", "ddEpd1", "ddBos1", "ddSocrm1", "ddCrmdt1", "ddCrmipd1", "ddFsld1", "ddSrmdt1", "ddSrmipd1", "ddRmo1", "ddPt1", "ddA1", "ddR1", "ddUf1", "ddTh1", "ddOts1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit DensaDeg inputs ---------------- */
		
		/* ---------------- For unit FF FiltraFast inputs ---------------- */

		//var ro_length = rofFormArray.length;
		var ff_length;
		ff_length = ffFormArray.length;
		if(ff_length == 0){
			if(localStorage.getItem('ffFormCount')){
				ffFormArray = JSON.parse(localStorage.getItem('ffFormCount'));
				ff_length = ffFormArray.length;
			}
		}

		for (var i = 0; i < ff_length; i++) {

			var curentId = ffFormArray[i];
			var labelId = $('#' + curentId).find('.edit').val();

			var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream", "Filter Type", "Filter Cell Size", "No: of Filter Units", "Common Filter Unit Inlet Velocity (Optional)", "Filter Cell Inlet Velocity (Optional)", "Filter Cell Effluent Velocity (Optional)", "Common Filter Unit Effluent Velocity (Optional)", "Filter to Waste Cell Velocity (Optional)", "Backwash Supply Velocity (Optional)", "Backwash Waste Velocity Max (Optional)", "Air Scour Velocity (Optional)", "Filter Cell Media Compression (Optional)", "No: of filter cells out of service during cleaning", "Air Scour rate, Media Uncompression", "Air Scour Rate, Backwash", "Backwash Rate", "Air Scour  +Water Duration (Media Uncompression)", "Air Scour + Water Duration ( Backwash)", "Water Only Duration", "Purge Duration"];

			var inputnametops = ["name", "unitop", "feed", "product", "waste",
				"filter_type", "filter_size", "filter_units", "unit_inlet_flow_vel", "cell_inlet_flow_vel", "cell_effluent_flow_vel", "unit_effluent_flow_vel", "filtertowaste_cell_flow_vel", "backwash_flow_vel", "backwash_waste_vel", "airscour_flow_vel", "med_comp_vel",  "filtercell_outservice", "airscour_rate_uncomp", "airscour_rate_backwash", "backwash_rate", "airscour_water_uncomp_time", "airscour_water_bw_time", "wateronly_time", "purge_time"];

			var co2FormUnitValues = ["filterType", "filterCellSize", "NoOfFilterUnits", "cFUIV", "fCIV", "fCEV", "cFUEV", "ftoWCV", "bSV", "bWVM", "aSV", "fCM",  "nOfFCOofSDC", "aSRMC", "aSR", "bR", "aSWDMU", "aSWDB", "wOD", "pD"];

			var co2FormUnitData = ["filterType1", "filterCellSize1", "NoOfFilterUnits1", "cFUIV1", "fCIV1", "fCEV1", "cFUEV1", "ftoWCV1", "bSV1", "bWVM1", "aSV1", "fCM1", "nOfFCOofSDC1", "aSRMC1", "aSR1", "bR1", "aSWDMU1", "aSWDB1", "wOD1", "pD1"];

			var inputdata = getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, curentId);
			var inputdataValues = inputdata[0];

			for (var index1 = 0; index1 < unitValues.length; index1++) {

				if (index1 == 0) {
				} else {
					if (unitValues[index1].UnitName == labelId) {
						wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
						wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
						wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
						wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
						wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					}
				}
			}

			for (var index = 0; index < inputunitnames.length; index++) {

				var colNo = colNum1 + index;
				if (index == 0) {

					for (var k = 0; k < inputunitnames.length; k++) {
						wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
						wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
						if (inputdataValues[k]) {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string(inputdataValues[k]);
						} else {
							wsinput.cell(rowNo + 5 + k, colNo + 2).string("");
						}

					}
				}
			}
			colNum1 = colNum1 + 4;
		}
		/* ---------------- For unit FF FiltraFast inputs ---------------- */


		/* ---------------- For remaining components (Waste Out) ---------------- */
		var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream"];

		var inputnametops = ["name", "unitop", "feed", "product", "waste"];


		for (var index1 = 0; index1 < unitValues.length; index1++) {

			if (index1 == 0) {
			} else {
				if (unitValues[index1].UnitType == "WasteOut") {

					for (var index = 0; index < inputunitnames.length; index++) {

						var colNo = colNum1 + index;
						if (index == 0) {

							for (var k = 0; k < inputunitnames.length; k++) {
								wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
								wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
							}
						}
					}
					wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
					wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
					wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
					wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
					wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);

					colNum1 = colNum1 + 4;
				}
			}
		}
		/* ---------------- For remaining components (Waste Out) ---------------- */

		/* ---------------- For remaining components (Product Out) ---------------- */

		var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream"];

		var inputnametops = ["name", "unitop", "feed", "product", "waste"];


		for (var index1 = 0; index1 < unitValues.length; index1++) {

			if (index1 == 0) {
			} else {
				if (unitValues[index1].UnitType == "ProductOut") {

					for (var index = 0; index < inputunitnames.length; index++) {

						var colNo = colNum1 + index;
						if (index == 0) {

							for (var k = 0; k < inputunitnames.length; k++) {
								wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
								wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
							}
						}
					}

					wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
					wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
					wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
					wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
					wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					colNum1 = colNum1 + 4;
				}

			}

		}

		/* ---------------- For remaining components (Product Out) ---------------- */

		/* ---------------- For remaining components (Mixer) ---------------- */
		var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream"];
		var inputnametops = ["name", "unitop", "feed", "product", "waste"];
		for (var index1 = 0; index1 < unitValues.length; index1++) {
			if (index1 == 0) {
			} else {
				if (unitValues[index1].UnitType == "Mixer") {
					for (var index = 0; index < inputunitnames.length; index++) {
						var colNo = colNum1 + index;
						if (index == 0) {
							for (var k = 0; k < inputunitnames.length; k++) {
								wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
								wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
							}
						}
					}
					wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
					wsinput.cell(2, colNum1 + 2).string(unitValues[index1].UnitType);
					wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
					wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
					wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					colNum1 = colNum1 + 4;
				}
			}
		}
		/* ---------------- For remaining components (Mixer) ---------------- */
		/* ---------------- For remaining components (Tank - Mixer) ---------------- */
		var inputunitnames = ["unitop Name", "Unitop Type", "Feed Stream", "Product Stream", "Waste Stream"];
		var inputnametops = ["name", "unitop", "feed", "product", "waste"];
		for (var index1 = 0; index1 < unitValues.length; index1++) {
			if (index1 == 0) {
			} else {
				if (unitValues[index1].UnitType == "Tank-Mixer") {
					for (var index = 0; index < inputunitnames.length; index++) {
						var colNo = colNum1 + index;
						if (index == 0) {
							for (var k = 0; k < inputunitnames.length; k++) {
								wsinput.cell(rowNo + k, colNo).string(inputunitnames[k]);
								wsinput.cell(rowNo + k, colNo + 1).string(inputnametops[k]);
							}
						}
					}
					wsinput.cell(1, colNum1 + 2).string(unitValues[index1].UnitName);
					if(unitValues[index1].UnitType == 'Tank-Mixer'){
						wsinput.cell(2, colNum1 + 2).string('Mixer');
					}else{
						wsinput.cell(2, colNum1 + 2).string('Mixer');
					}
					wsinput.cell(3, colNum1 + 2).string(unitValues[index1].FeedStream);
					wsinput.cell(4, colNum1 + 2).string(unitValues[index1].ProductStream);
					wsinput.cell(5, colNum1 + 2).string(unitValues[index1].WasteStream);
					colNum1 = colNum1 + 4;
				}
			}
		}
		/* ---------------- For remaining components (Tank - Mixer) ---------------- */

		wb.write(filePath, function (err, stats) {
			if (err) {
				console.error(err);
			}
			console.log(stats);
		});

		//$('#pdfExport').val('');
		//  var pathd = path.resolve("./")+"\\FlowSheet.xlsx";

		//var pathd = filePath;
		//pathd = pathd.replace(new RegExp(/\\/g), "/");
		$('.overlay').hide();
		$('.pSuccess').text('');
		$('.pfail').text('');
		setTimeout(function () { updateProgress(); }, 100);
		setTimeout(function () { executePythonScript(); }, 1000);
		//setTimeout(function () { console.log('hello'); }, 100000);	
	

		//$('#progress').hide();
	}else{
		var errorMessage="Please check the stream connections for following unitops\n";
		errorMessage = errorMessage + wrongUnitOps;
		alert(errorMessage);
	}
	
	}

	}
	

});
	
	var progress=10;
	function updateProgress() {
		if(progress>=90)
		return;
		$('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
		
		progress = Number(progress) + 20;
		setTimeout(function () { updateProgress(); }, 100);

	}
	function executePythonScript() {		

		var spawn = require('child_process').spawn;
		// const bat = spawn('D:/Users/502763083/Desktop/excelfile_creation/excelfile_creation/excelfile_creation.exe', [pathd, 'excel_creation']);
		//var bat = spawn('fsd/test_code.exe', [pathd, 'excel_creation']);
		var bat = spawn('C:/iFSD/PythonEXE/iFSD.exe', ["C:/iFSD/Data/iFSDSheet.xlsx"]);
		// const bat = spawn('excelfile_creation/excelfile_creation.exe', ['D:/Users/502763083/Desktop/valero_huston.xlsx', 'data_filter']);

		bat.stdout.on("data", function (data) {
			console.log(data.toString());
		});
		bat.stderr.on("data", function (data) {
			//console.error(data.toString());
		});
		bat.on("close", function (code) {
			if (code == 0) {
				//progressbarvalue.progressbar("value", 100);
				$('.progress-bar').css('width', 100 + '%').attr('aria-valuenow', 100);
				$('.pSuccess').html("Simulation Completed Successfully");

				executionFlag = true;
				$('#dataSheetExcel').attr("href", "#");
				$('#dataSheetPDF').attr("href", "#");
				$('#massBalncePdf').attr("href", "#");
				$('#massBalanceExcel').attr("href", "#");
			} else {
				//progressbarvalue.progressbar("value", 100);
				//$('.pfail').text("Simulation failed");
				$('.pfail').html("Simulation failed");
				setTimeout(function () { readErrorFromExcel(); }, 500);
				executionFlag = false;
				$('#dataSheetExcel').removeAttr("href", "#");
				$('#dataSheetPDF').removeAttr("href", "#");
				$('#massBalncePdf').removeAttr("href", "#");
				$('#massBalanceExcel').removeAttr("href", "#");
			}

			progress = 10;

		});
		
	}
	
	function readErrorFromExcel(){
		var fs = require('fs');
		var XLSX = require('xlsx');
		var reader = new FileReader();
		var workbook = XLSX.readFile('C:/iFSD/Data/iFSDSheet.xlsx', { sheetStubs: true });
		var sheet_name_list = workbook.SheetNames;
		if(workbook.Sheets["Network_Info"]["AA5"]){
			var excelErrorData = workbook.Sheets["Network_Info"]["AA5"].h;
			$('.pfail').html("");
			$('.pfail').html("Simulation failed <br> "+ excelErrorData+ " ");
		}
	}

	function getUnitDetails() {

		var dataValues = [{ "UnitName": "Unit Name", "UnitType": "Unit Type", "FeedStream": "Feed Stream", "ProductStream": "Product Stream", "WasteStream": "Waste Stream" }];
		var con = jsPlumb.getAllConnections();
		var list = [];

		var pnextList = [];
		var inputlist = [];
		var wasteStream1 = [];


		var punitprev;
		var punitnext;
		var wasteStreamPrev;


		var streamlength = $('[name=tag]').length;
		var checklist = [];
		var stream = "Waste Stream"

		for (var i = 0; i < streamlength; i++) {

			list[i] = new Array(2);
			list[i][0] = con[i].sourceId;
			list[i][1] = con[i].targetId;

			var source = con[i].sourceId;
			var destination = con[i].targetId;



			var s = $('#span' + source).val();
			var t = $('#span' + destination).val();
			//var unittypesource = source.replace(/[0-9]/g, '');
			var unittypesource;
			if (!(source.indexOf('CO2')) || !(source.indexOf('O2'))) {
				unittypesource = source.slice(0, -1);
			} else {
				unittypesource = source.replace(/[0-9]/g, '');
				if (unittypesource == 'Hydratedlime') {
					unittypesource = 'HydratedLime';
				} else if (unittypesource == 'Limestone') {
					unittypesource = 'LimeStone';
				}
			}
			var desunittypesource;
			if (!(destination.indexOf('CO2')) || !(destination.indexOf('O2'))) {
				desunittypesource = destination.slice(0, -1);
			} else {
				desunittypesource = destination.replace(/[0-9]/g, '');
				if (desunittypesource == 'Hydratedlime') {
					desunittypesource = 'HydratedLime';
				} else if (desunittypesource == 'Limestone') {
					desunittypesource = 'LimeStone';
				}
			}
			/* var mainStreamType;
			if(con[i].endpoints[0]._continuousAnchorEdge == "bottom" && con[i].endpoints[1]._continuousAnchorEdge == "top"){
				mainStreamType = "Waste Stream";
			}  */



			if (checklist.indexOf(s) === -1) {
				checklist.push(s);
				var data333 = getCanvasData33();
				var dataV = data333[0];
				for (var index = 1; index < dataV.length; index++) {
					var des = dataV[index].Destination;
					var strname = dataV[index].StreamName;
					var sou = dataV[index].Source;
					var getStreamType = dataV[index].StreamType;
					if (des == s) {
						inputlist.push(strname);
						punitprev = inputlist.join();
					} else if (sou == s) {
						if (stream == getStreamType) {
							wasteStream1.push(strname);
							wasteStreamPrev = wasteStream1.join();
						} else {
							pnextList.push(strname);
							punitnext = pnextList.join();
						}
					}


				}

				if (punitprev == undefined) {
					punitprev = "";
				}
				if (punitnext == undefined) {
					punitnext = "";
				}
				if (wasteStreamPrev == undefined) {
					wasteStreamPrev = "";
				}

				dataValues.push({ "UnitName": s, "UnitType": unittypesource, "FeedStream": punitprev, "ProductStream": punitnext, "WasteStream": wasteStreamPrev });

				punitprev = "";
				punitnext = "";
				wasteStreamPrev = "";

				pnextList = [];
				inputlist = [];
				wasteStream1 = [];
			}


			if (checklist.indexOf(t) === -1) {
				checklist.push(t);
				var data333 = getCanvasData33();
				var dataV = data333[0];
				for (var index = 1; index < dataV.length; index++) {
					var des = dataV[index].Destination;
					var strname = dataV[index].StreamName;
					var sou = dataV[index].Source;
					var getStreamType = dataV[index].StreamType;

					if (des == t) {
						inputlist.push(strname);
						punitprev = inputlist.join();
					} else if (sou == t) {
						if (stream == getStreamType) {
							wasteStream1.push(strname);
							wasteStreamPrev = wasteStream1.join();
						} else {
							pnextList.push(strname);
							punitnext = pnextList.join();
						}
					}
				}

				if (punitprev == undefined) {
					punitprev = "";
				}
				if (punitnext == undefined) {
					punitnext = "";
				}
				if (wasteStreamPrev == undefined) {
					wasteStreamPrev = "";
				}

				dataValues.push({ "UnitName": t, "UnitType": desunittypesource, "FeedStream": punitprev, "ProductStream": punitnext, "WasteStream": wasteStreamPrev });
				punitprev = "";
				punitnext = "";
				wasteStreamPrev = "";
				pnextList = [];
				inputlist = [];
				wasteStream1 = [];
			}
		}
		return [dataValues];
	}

	function getCanvasData() {
		var dataValues = [{ "StreamName": "Stream Name", "Source": "Source", "Destination": "Destination", "Type": "Type" }];
		var con = jsPlumb.getAllConnections();
		var list = [];
		var coldList = [];
		var hotList = [];

		var objects = getStartObjects();
		var bbb;

		var streamlength = $('[name=tag]').length;
		if (objects.length !== 0) {
			alert('Error! Object Connections Missing!');
		} else {
			for (var i = 0; i < streamlength; i++) {
				bbb = document.getElementsByName('tag')[i].value;
				list[i] = new Array(2);
				list[i][0] = con[i].sourceId;
				list[i][1] = con[i].targetId;
				var source = con[i].sourceId;
				var destination = con[i].targetId;
				var type;
				var s;
				var t;
				var fluid;
				var res;

				s = $('#span' + source).val();
				t = $('#span' + destination).val();

				type = document.getElementsByName('tag')[i].getAttribute("placeholder");
				type = ' ';

				dataValues.push({ "StreamName": bbb, "Source": s, "Destination": t, "Type": type });
			}
			return [dataValues];
		}
	}

	function addTableToPDF(doc, svgPart, filePath) {
		var isTohide = false;
		if (!$('#collapseTable table').is(':visible')) {
			isTohide = true;
			$('.calcIterationDiv .accordion-group .accordion-heading a').trigger('click');
		}
		html2canvas($('#collapseTable table'), {
			onrendered: function (canvas) {
				var data = canvas.toDataURL("image/png");
				doc.addImage(data, 15, 120, 180, 50);
				$("#statemachine-demo canvas").remove();
				$("#statemachine-demo").append(svgPart);
				if (isTohide) {
					$('.calcIterationDiv .accordion-group .accordion-heading a').trigger('click');
				}
				var arrayBuffer = doc.output('arraybuffer');
				var buffer = new Buffer(arrayBuffer.byteLength);
				var view = new Uint8Array(arrayBuffer);
				for (var i = 0; i < buffer.length; ++i) {
					buffer[i] = view[i];
				} $("#statemachine-demo").append(svgPart);
				var fs = require('fs');
				var path = require('path');
				var nwGui = require('nw.gui');
				$('#pdfExport').val('');
				fs.writeFile(filePath, buffer, function (err) {
					if (err) {
						return console.log(err);
					}
					$('.overlay').hide();
					nwGui.Shell.openItem(filePath);
				});
			}
		});
	}

	$('body').on('click', '#settings', function () {
		$('.overlay').show();
		$('.settingsPopUp.popUp').removeClass('dispNone').show().center();
	});
	//$('#progress').hide();
});

//Zoom add
var currZoom = $("#main").css("zoom");
if (currZoom == 'normal') currZoom = 1;

$("#zoomIn").click(function () {
	canvasMode = 'ZoomIn';
	currZoom *= 1.2;
	$("#main").css("zoom", currZoom);
	$("main").css("-moz-transform", "Scale(" + currZoom + ")");
	$("#main").css("-moz-transform-origin", "0 0");
});

$("#zoomOff").click(function () {
	canvasMode = 'ZoomOff';
	currZoom = 1;
	$("#main").css("zoom", 1);
	$("#main").css("-moz-transform", "Scale(" + currZoom + ")");
	$("#main").css("-moz-transform-origin", "0 0");
});

$("#zoomOut").click(function () {
	canvasMode = 'ZoomOut';
	currZoom *= .8;
	$("#main").css("zoom", currZoom);
	$("#main").css("-moz-transform", "Scale(" + currZoom + ")");
	$("#main").css("-moz-transform-origin", "0 0");

});

// Lable validation
$(document).on('change', '.edit', function () {
	var thisValue = $(this).val().trim();
	if (thisValue) {
		var i = draggedArray.indexOf(thisValue);
		if (i != -1) {
			//draggedArray.splice(i, 1);
			$(this).val('');
			alert('Unit name can not be same !!');
			$(this).css({ "border": "1px dotted red" });
		} else {
			$('.connectorEmptyError').text('');
			$(this).css({ "border": "1px dotted rgb(231,231,231)" });
		}
	} else {
		$(this).css({ "border": "1px dotted red" });
		alert('Please enter unit name');
	}
});

$(document).on('focusin', '._jsPlumb_overlay ', function () {
	connectorInputArray = [];
	$('._jsPlumb_overlay ').each(function () {
		var connectorVal = $(this).val();
		if (connectorVal) {

			connectorInputArray.push(connectorVal);
		}
	});
})

//Stream validation
$(document).on('change', '._jsPlumb_overlay', function () {
	var inputValue = $(this).val().trim();
	if (inputValue) {
		var i = connectorInputArray.indexOf(inputValue);
		if (i != -1) {
			$(this).val('');
			alert('Streams can not be same !!.');
			$(this).css({ "border": "1px solid red" });
		} else {
			$('.labelError').text('');
			$(this).css({ "border": "1px solid #8989FF" });
			//draggedArray.push(prevVal);
		}
	} else {
		alert('Please enter streams.');
		$(this).css({ "border": "1px solid red" });
	}
});

//open Feed popup*/

$('body').on('click', '.Feed p,.Feed br,.Feed img', function () {
	$('.overlay').show();
	var id = $(this).parent().attr('id');
	loadFeedProperties(id);
	$('.FeedPopUp.popUp').attr('instance', id).removeClass('dispNone').show().center();
});


var selectIds = $('#panel1,#panel2,#panel3');
$(function ($) {
	selectIds.on('show.bs.collapse hidden.bs.collapse', function () {
		$(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
	})
});

function getFormUnitConversionDetails(co2FormUnitValues, co2FormUnitData, currentId) {

	var co2FormConvertionValues = [];

	for (var j = 0; j < co2FormUnitValues.length; j++) {
		var t = JSON.parse(localStorage.getItem(currentId));
		var value1 = t[co2FormUnitValues[j]];

		var value2 = $('#' + co2FormUnitData[j]).text();

		if (unitinputjson[value2]) {

			var m = unitinputjson[value2][0];
			var c = unitinputjson[value2][1];
			var unitConvertionValue = m * value1 + c;

			if(value1){
			co2FormConvertionValues.push(unitConvertionValue.toString());
			}else{
				co2FormConvertionValues.push("");
			}

		} else {

			co2FormConvertionValues.push(value1);

		}


	}

	return [co2FormConvertionValues];
}


function getSFForm(co2FormUnitValues, currentId) {
	var co2FormConvertionValues = [];

	for (var j = 0; j < co2FormUnitValues.length; j++) {
		var t = JSON.parse(localStorage.getItem(currentId));
		var value1 = t[co2FormUnitValues[j]];

		co2FormConvertionValues.push(value1.toString());

	}
	return [co2FormConvertionValues];
}

//Feed UnitConversion
$('body').on('click', '.Feed', function () {
	total_Cations = 0;
	total_Anions = 0;
	//feedCalculation();
	feedParametresCal();
	$('#feedPopUp .tempUnit').each(function () {
		var $this = $(this);
		var getUnitType = $this.attr('unitType');
		getSavedUnit = JSON.parse(localStorage.getItem('SelectedUnits'));
		for (var t = 0; t < getSavedUnit.length; t++) {
			if (getUnitType == getSavedUnit[t].unitType) {
				$this.text(getSavedUnit[t].unit);
			}
		}
	});
});



function getHomeData() {

	var dataValues = [{ "Project": "Project", "Customer": "Customer", "Location": "Location", "Date": "Date" }];

	var projectName = $('#project').val();
	var cust = $('#customer').val();
	var locationName = $('#location').val();
	var Datename = $('#calenderIcon').val();
	dataValues.push({ "Project": projectName, "Customer": cust, "Location": locationName, "Date": Datename });

	return [dataValues];

}

function getUnitConversionValues() {
	var dataValues = [{ "Data": "Data" }];

	var unitVal = $('#unitDropdown').find(":selected").text();

	if (unitVal == "Custom Units") {
		$('#parametersTable tr td:nth-child(2)').each(function () {

			var texto = $(this).find("select").val();

			if (texto == null) {
				texto = $(this).text();
			}

			dataValues.push({ "Data": texto });

		});

	} else {
		$('#parametersTable tr td:nth-child(2)').each(function () {
			var texto = $(this).find("select").val();

			if (texto == null) {
				texto = $(this).text();
			}
			dataValues.push({ "Data": texto });
		});
	}
	return [dataValues];
}

function getUnitHeaderValues() {
	var dataValues = [{ "Header": "Header" }];
	$('#parametersTable tr td:nth-child(1)').each(function () {
		var texto = $(this).text();
		dataValues.push({ "Header": texto });
	});
	return [dataValues];
}
function loadOutputFromFile(name) {

	var fs = require('fs');

	var XLSX = require('xlsx');

	var reader = new FileReader();

	var workbook = XLSX.readFile('C:/iFSD/Data/iFSDSheet.xlsx', { sheetStubs: true });
	//var workbook = XLSX.readFile('C:/iFSD/Data/iFSDSheet-feed_sf_cf_ro_31July-Before.xlsx', { sheetStubs: true });

	var sheet_name_list = workbook.SheetNames;

	//read the sheet unitop_output

	var excelData = XLSX.utils.sheet_to_json(workbook.Sheets["unitop_output"]);

	//console.log(excelData);

	var obj = excelData[0];

	var indexAndUnitOpMap = [];

	var indexForMap = 0;

	for (var key in obj) {

		if (indexForMap % 2 != 0)
			indexAndUnitOpMap[indexForMap] = key;
		indexForMap++;
	}

	var prevSearchText = '';
	var countLamella = 0;

	for (var i = 0; i < excelData.length; i++) {

		var obj1 = excelData[i];

		for (var key1 in obj1) {

			var k;

			for (k = 0; k < indexAndUnitOpMap.length; k++) {

				if (indexAndUnitOpMap[k] == key1)

					break;

			}

			searchText = obj1[key1];
			if (parseFloat(obj1[key1]) >= 0 && !isNaN(obj1[key1])){
				
				if(obj1["Unitop Name_2"] == "RW Clarifier Blowdown Flowrate" || obj1["Unitop Name_2"] == "Dosage"){
					obj1[key1] = parseFloat(obj1[key1]).toFixed(6);
				}else{
					obj1[key1] = parseFloat(obj1[key1]).toFixed(2);
				}
			}

			if (indexAndUnitOpMap[k] != undefined) {
				
				if (name == indexAndUnitOpMap[k]) {

					$('div[myid=' + indexAndUnitOpMap[k] + '] .Output td').each(function () {

						if ($(this).text().toLowerCase().trim() == prevSearchText.toLowerCase().trim()) {

							$(this).closest('td').next('td').text(obj1[key1]);

							$(this).closest('td').next('td').html(obj1[key1]);

							$(this).closest('td').next('td').find('span').text(obj1[key1]);

							$(this).closest('td').next('td').find('span').html(obj1[key1]);


						}
						else {

							if ($(this).text().toLowerCase().replace(/ /g, '') == prevSearchText.toLowerCase().replace(/ /g, '')) {

								$(this).closest('td').next('td').text(obj1[key1]);

								$(this).closest('td').next('td').html(obj1[key1]);

								$(this).closest('td').next('td').find('span').text(obj1[key1]);

								$(this).closest('td').next('td').find('span').html(obj1[key1]);

							}

						}
						
						if (indexAndUnitOpMap[k].indexOf('Lamella') >= 0 && prevSearchText.toLowerCase().replace(/ /g, '').indexOf('dosage') >= 0 && $(this).text().toLowerCase().replace(/ /g, '').indexOf('dosage') >= 0 ) {
							
							if(countLamella == 0){
								countLamella++;
								$(this).closest('td').next('td').find('span').text(obj1[key1]);

								$(this).closest('td').next('td').find('span').html(obj1[key1]);

								$(this).closest('td').next('td').text(obj1[key1]);

								$(this).closest('td').next('td').html(obj1[key1]);
								
							}
						}

					});
				}
			}
			prevSearchText = searchText;
		}
	}
}


$('.massBalance_link').click(function (e) {
	if (executionFlag == true) {
		var fs = require('fs');
		var XLSX = require('xlsx');

		var reader = new FileReader();
		var workbook = XLSX.readFile('C:/iFSD/Data/iFSDSheet.xlsx', { sheetStubs: true });
		var sheet_name_list = workbook.SheetNames;
		//read the sheet unitop_output
		var excelData = XLSX.utils.sheet_to_json(workbook.Sheets["MassBalance"], { header: 'A' });
		var htmlText =
			'<div class="header col-md-12 col-sm-12 col-xs-12">' +
			'<h3 class="pull-left popTitle"> Mass Balance</h3>' +
			'</div>' +
			'<div class="body col-md-12 col-sm-12 col-xs-12 tableScroller">';


		var htmlText = htmlText +
			'<table class="table table-bordered margin0 tableScroller Input" id="Input">' +
			'<tbody>';
		var textData = '';
		var index = 0;
		for (var i = 0; i < excelData.length; i++) {
			htmlText = htmlText + '<tr>'
			var obj1 = excelData[i];
			index = 0;

			for (var key1 in obj1) {
				if (index == 0)
					htmlText = htmlText + '<td width="10%">';
				else
					htmlText = htmlText + '<td>';

				if (parseFloat(obj1[key1]) >= 0 && !isNaN(obj1[key1]) && i!=0){
					if(i == 1)
						textData = parseFloat(obj1[key1]).toFixed(6);
					else
						textData = parseFloat(obj1[key1]).toFixed(2);
				}else{
					textData = obj1[key1];
				}
				htmlText = htmlText + textData + '</td>';
				index++;
			}
			htmlText = htmlText + '</tr>';



		}
		htmlText = htmlText + '</tbody></table></div></div>';
		$('#calculate').empty();
		$('#calculate').html(htmlText);

	}
});

//New File from inside application
$('#newFileBtnFromApp').on('click', function(){
	newFileFromApp = true;
	$('.welcomeScreen').hide();
	$('.newFileScreen').show();
	$('#parametersTable tr').remove();
	$('#newFileBackBtn').hide();
	//resting Canvas
	canvasReset();
	
	cfFormArray = [];
	lamellaFormArray = [];
	co2FormArrya = [];
	o2FormArrya = [];
	hydratedlimeFormArray = [];
	limeStoneFormArray = [];
	ixmMixedBedArray = [];
	rofFormArray = [];
	feedFormArray = []; 
	ediFormArray = [];
	mmfFormArray = [];
	sfFormArrya = [];
	splitterFormArray = [];
	tank_splitterFormArray = [];
	ddFormArray = [];
	ffFormArray = [];
		
	localStorage.clear();
	
	draggedArray = [];
	newCountJson = {};
	
	//Existing connection remove
	for(var g=0; g<15;g++){
		jsPlumb.remove('CF'+g+'');
		jsPlumb.remove('EDI'+g+'');
		jsPlumb.remove('MF'+g+'');
		jsPlumb.remove('SF'+g+'');
		jsPlumb.remove('Feed'+g+'');
		jsPlumb.remove('RO'+g+'');
		jsPlumb.remove('MB'+g+'');
		jsPlumb.remove('CO2'+g+'');
		jsPlumb.remove('O2'+g+'');
		jsPlumb.remove('Hydratedlime'+g+'');
		jsPlumb.remove('Limestone'+g+'');
		jsPlumb.remove('Mixer'+g+'');
		jsPlumb.remove('Tank-Mixer'+g+'');
		jsPlumb.remove('Splitter'+g+'');
		jsPlumb.remove('Tank-Splitter'+g+'');
		jsPlumb.remove('Lamella'+g+'');
		jsPlumb.remove('WasteOut'+g+'');
		jsPlumb.remove('ProductOut'+g+'');
		jsPlumb.remove('DensaDeg'+g+'');
		jsPlumb.remove('FF'+g+'');
	}
	
	$('#unitDropdown').attr('disabled', false);
	$('#unitDropdown').val('');
	$('#project').val('');
	$('#customer').val('');
	$('#location').val('');
	
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}
	$('#calenderIcon').val(formatDate(new Date()));
	
	//Stream Count reset
	streamvaluecount = 1;
	
	//Reset Unit opration left position
	unitOpsLeftPos = -70;
	
	//Reset last selected unit
	selectedUnit = "";
	
	//Default file name
	document.title = 'iFSD - New' ;
	
});



