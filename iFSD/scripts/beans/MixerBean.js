function Mixer(objectId){
  this.id=objectId;
  this.type="mixer";
  this.objProperties=[];
  this.outputParam=[];
  this.ionData=[];
  this.multiStreamData=[];
  this.setProperties= function(properties){
    this.objProperties=properties;
  };
  
  this.setInput= function(param, prevObject){
    //console.log('Setting Input Data to '+this.id+' Object');
    param=appendProperties(param,this.objProperties);
    ionData=returnIonData(param)
    
    if(filterJSON(this.multiStreamData,'id',prevObject).length==0){
      this.multiStreamData.push({
        "id":prevObject,
        "value":filterJSON(param,'id','FP1')[0].value,
        "tds":filterJSON(param,'id','FP3')[0].value,
        "pH":filterJSON(param,'id','FP4')[0].value,
        "temperature":filterJSON(param,'id','FP5')[0].value,
        "ions": ionData
      });
    }else{
      filterJSON(this.multiStreamData,'id',prevObject)[0].value=filterJSON(param,'id','FP1')[0].value;
      filterJSON(this.multiStreamData,'id',prevObject)[0].tds=filterJSON(param,'id','FP3')[0].value;
      filterJSON(this.multiStreamData,'id',prevObject)[0].pH=filterJSON(param,'id','FP4')[0].value;
      filterJSON(this.multiStreamData,'id',prevObject)[0].temperature=filterJSON(param,'id','FP5')[0].value;
      filterJSON(this.multiStreamData,'id',prevObject)[0].ions=ionData;
    }
    
    this.objProperties.push(filterJSON(param,'id','FP4')[0]);
    this.objProperties.push(filterJSON(param,'id','FP5')[0]);
    this.doCalc(param);
  };
  
  this.doCalc=function(param){
    //console.log('Performing operations on Data for '+this.id+' Object');
    var currentFlow=filterJSON(param,'id','FP1')[0].value;
    var prevFlow=0;
    if(this.outputParam!==null && this.outputParam.length>0){
      prevFlow=filterJSON(this.outputParam,'id','FP1')[0].value;
    }
    var ions=returnIonData(param);
    var tdsTotal=0;
    for(var index=0; index<ions.length; index++){
      this.objProperties.push(ions[index]);
      if(ions[index].id!="FI21"){
        tdsTotal+=ions[index].mglValue;
      }
    }
    this.objProperties.push({"id":"M4","name":"tdsTotal","value":tdsTotal});
    this.objProperties.push({"id":"M5","name":"tdsIn","value":tdsTotal});
    var recycleIons=returnIonData(param);
    
    var mixedStreamData=calculateMixerData(this.multiStreamData);
    filterJSON(param,'id','FP1')[0].value=mixedStreamData.flow;
    filterJSON(param,'id','FP3')[0].value=mixedStreamData.TDS;
    filterJSON(param,'id','FP4')[0].value=mixedStreamData.pH;
    filterJSON(param,'id','FP5')[0].value=mixedStreamData.temperature;
    ions=mixedStreamData.ions;
    currentFlow=mixedStreamData.flow;
    
    $.each(recycleIons, function(index){
      var name=this.name;
      if(ions[index] !== null && ions.filter(function(e) { return e.name == name; }).length > 0){
        this.mglValue=ions[index].mglValue;
      }
    });
    
    if((Number(prevFlow).toFixed(Number($("#decimalPlaces").val()))!==Number(currentFlow).toFixed(Number($("#decimalPlaces").val())))
    && iterationJSON.length<Number($("#numOfIterations").val())){
      console.log('\n\n'+prevFlow+"===="+currentFlow);
      if(!trackIds.includes(this.id)){
        trackIds+="_"+this.id;
      }
      this.setOutput(param);
    }
  };
  
  this.setOutput=function(param){
    //console.log('Setting Output Data to '+this.id+' Object');
    this.outputParam=param;
    var nextObject=getNextObjects(this.id);
    if(nextObject!==null && nextObject.length>0){
      console.log('Passing Output From '+this.id+' to '+nextObject[0].id+' Object');
      nextObject[0].setInput(param, this.id);
    }else{
      console.log('Data Transfer Stopped at '+this.id+' Object');
    }
  };
}
