var selectedUnit;
var unitData = [
		{
			"paramName":"Mass",
			"SI_Units":[
				"kg",
				"lbs"
			],
			"US_Units":[
				"lbs",
				"kg"				
			]
		},
		{
			"paramName":"Mass Flow",
			"SI_Units":[
				"kg/sec",
				"kg/min",
				"kg/hr",
				"kg/day",
				"kg/yr",
				"lb/sec",
				"lb/min",
				"lb/hr",
				"lb/day",
				"lb/yr",
				"ton/sec",
				"ton/min",
				"ton/hr",
				"ton/day",
				"ton/yr"				
			],
			"US_Units":[
				"lb/hr",
				"kg/sec",
				"kg/min",
				"kg/hr",
				"kg/day",
				"kg/yr",
				"lb/sec",
				"lb/min",				
				"lb/day",
				"lb/yr",
				"ton/sec",
				"ton/min",
				"ton/hr",
				"ton/day",
				"ton/yr"				
			]
		},
		{
			"paramName":"Volume Flow",
			"SI_Units":[
				"cum/sec",
				"cum/min",
				"cum/hr",
				"cum/day",
				"cum/yr",
				"cuft/sec",
				"cuft/min",
				"cuft/hr",
				"cuft/day",
				"cuft/yr",
				"gal/sec",
				"gal/min",
				"gal/hr",
				"gal/day",
				"gal/yr",
				"l/sec",
				"l/min",
				"l/hr",
				"l/day",
				"l/yr",
				"kl/day",
				"Ml/day",
				"Ncum/hr",
				"MMSCFD",
				"MSCFD",
				"SCFD",
				"SCFM",
				"CFM",
				"MGD"
			],
			"US_Units":[
				"cuft/sec",
				"cum/sec",
				"cum/min",
				"cum/hr",
				"cum/day",
				"cum/yr",				
				"cuft/min",
				"cuft/hr",
				"cuft/day",
				"cuft/yr",
				"gal/sec",
				"gal/min",
				"gal/hr",
				"gal/day",
				"gal/yr",
				"l/sec",
				"l/min",
				"l/hr",
				"l/day",
				"l/yr",
				"kl/day",
				"Ml/day",
				"Ncum/hr",
				"MMSCFD",
				"MSCFD",
				"SCFD",
				"SCFM",
				"CFM",
				"MGD"
			]
		},
		{
			"paramName":"Pressure",
			"SI_Units":[
				"Pa",
				"bar",
				"barg",
				"mmbar",
				"Mpa",
				"kPa",				
				"kg/sqcm",
				"atm",
				"mmHg",
				"inHg",
				"psi",
				"psig"
			],
			"US_Units":[
				"psi",
				"bar",
				"barg",
				"mmbar",
				"Mpa",
				"kPa",
				"Pa",
				"kg/sqcm",
				"atm",
				"mmHg",
				"inHg",				
				"psig"
			]
		},
		{
			"paramName":"Temperature",
			"SI_Units":[
				"C",
				"F"
			],
			"US_Units":[
				"F",
				"C"	
			],
		},
		{
			"paramName":"Length",
			"SI_Units":[
				"m",
				"cm",
				"mm",
				"in",
				"ft"
			],
			"US_Units":[
				"ft",
				"m",
				"cm",
				"mm",
				"in"	
			]
		},
		{
			"paramName":"Area",
			"SI_Units":[
				"sqm",
				"sqcm",
				"sqmm",
				"sqin",
				"sqft"
			],
			"US_Units":[
				"sqft",
				"sqm",
				"sqcm",
				"sqmm",
				"sqin"	
			]
		},
		{
			"paramName":"Volume",
			"SI_Units":[
				"cum",
				"cucm",
				"cumm",
				"cuin",
				"cuft",
				"l",
				"gal"
			],
			"US_Units":[
				"cuft",
				"cum",
				"cucm",
				"cumm",
				"cuin",				
				"l",
				"gal"
			],
		},
		{
			"paramName":"Flux",
			"SI_Units":[
				"l/sqm-hr",
				"gal/sqft-min",				
				"cuft/sqft-sec",
				"gal/sqft-day",
				"cum/sqm-sec"
			],
			"US_Units":[
				"cuft/sqft-sec",
				"cum/sqm-sec",
				"gal/sqft-min",				
				"gal/sqft-day",
				"l/sqm-hr"
			]
		},
		{
			"paramName":"Time",
			"SI_Units":[
				"sec",
				"min",
				"hr",
				"day",
				"month",
				"yr"
			],
			"US_Units":[				
				"sec",
				"min",
				"hr",
				"day",
				"month",
				"yr"
			]
		},
		{
			"paramName":"Density",
			"SI_Units":[
				"kg/cum",
				"lb/cuft",
				"SG"
			],
			"US_Units":[				
				"lb/cuft",
				"kg/cum",
				"SG"
			]
		},
		{
			"paramName":"Viscosity",
			"SI_Units":[
				"Pa-sec",
				"cP",
				"mPa-sec"
			],
			"US_Units":[
				"cP",
				"Pa-sec",
				"mPa-sec"
			]
		},
		{
			"paramName":"Heat Capacity",
			"SI_Units":[
				"J/kg-C",
				"kJ/kg-C",
				"kcal/kg-C"
			],
			"US_Units":[
				"BTU/lb-F",
				"kJ/kg-C",
				"J/kg-C",
				"kcal/kg-C"
			]
		},
		{
			"paramName":"Latent Heat",
			"SI_Units":[
				"J/kg",
				"kJ/kg",				
				"kcal/kg",
				"BTU/lb-F"
			],
			"US_Units":[
				"BTU/lb",
				"kJ/kg",
				"J/kg",
				"kcal/kg",
				"BTU/lb-F"
			]
		},
		{
			"paramName":"Voltage",
			"SI_Units":[
				"Volts"
			],
			"US_Units":[
				"Volts"
			]
		},
		{
			"paramName":"Current",
			"SI_Units":[
				"Amp"
			],
			"US_Units":[
				"Amp"
			]
		},
		{
			"paramName":"Resistivity",
			"SI_Units":[
				"MOhm-cm"
			],
			"US_Units":[
				"MOhm-cm"
			]
		},
		{
			"paramName":"Conductivity",
			"SI_Units":[
				"uS/cm"
			],
			"US_Units":[
				"uS/cm"
			]
		},
		{
			"paramName":"AC Power",
			"SI_Units":[
				"kWhr"
			],
			"US_Units":[
				"kWhr"
			]
		},
		{
			"paramName":"DC Power",
			"SI_Units":[
				"kW"
			],
			"US_Units":[
				"kW"
			]
		},
		{
			"paramName":"AC Energy",
			"SI_Units":[
				"kWhr/1000gal"
			],
			"US_Units":[
				"kWhr/1000gal"
			]
		},
		{
			"paramName":"Loading Rate",
			"SI_Units":[
				"kg/cum",
				"lb/cuft"
			],
			"US_Units":[
				"lb/cuft",
				"kg/cum"
			]
		},
		{
			"paramName":"Velocity",
			"SI_Units":[
				"m/sec",
				"cm/sec",
				"mm/sec",
				"in/sec",
				"ft/sec"
			],
			"US_Units":[
				"ft/sec",
				"m/sec",
				"cm/sec",
				"mm/sec",
				"in/sec"
			]
		}
		
];



function drawTable(unitData) {
    for (var i = 0; i < unitData.length; i++) {
        drawRow(unitData[i]);
    }
}

function drawRow(rowData) {
	
	var s = '<select>';
	var arr = [];
	if(selectedUnit == 'SI Units'){
		for (var i = 0; i <rowData.SI_Units.length; i++){		
			if(rowData.SI_Units.length>1){
				s += "<option value='" + rowData.SI_Units[i] + "'>" + rowData.SI_Units[i] + "</option>";
			}else{
				s = rowData.SI_Units[i];
			}
		}
	}else if(selectedUnit == 'US Units'){
		for (var i = 0; i <rowData.US_Units.length; i++){		
			if(rowData.US_Units.length>1){
				s += "<option value='" + rowData.US_Units[i] + "'>" + rowData.US_Units[i] + "</option>";
			}else{
				s = rowData.US_Units[i];
			}
		}
	}
	//if(rowData.custom_Units.length>1){
		s += '</select>';
	//}
	
	if(selectedUnit == 'SI Units'){
		var data = "<tr><td>" + rowData.paramName + "</td>"
		+"<td>" + s + "</td>";
	}else if(selectedUnit == 'US Units'){
		var data = "<tr><td>" + rowData.paramName + "</td>"
		+"<td>" + s + "</td>";
	}/* else if(selectedUnit == 'Custom Units'){
		var data = "<tr><td>" + rowData.paramName + "</td>"
		+"<td>" + s + "</td>";
	} */
	
	$('#parametersTable').append(data);
}

$('#unitDropdown').on('change', function() {
  selectedUnit = this.value;
  $('#parametersTable').empty();
  drawTable(unitData);
	
});


