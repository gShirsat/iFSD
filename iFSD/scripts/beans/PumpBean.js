function Pump(objectId){
  this.id=objectId;
  this.type="pump";
  this.objProperties=[];
  this.outputParam=[];
  
  this.setProperties= function(properties){
    this.objProperties=properties;
  };
  
  this.setInput= function(param, prevObject){
    //console.log('Setting Input Data to '+this.id+' Object');
    param=appendProperties(param,this.objProperties);
    this.doCalc(param);
  };
  
  this.doCalc=function(param){
    //console.log('Performing operations on Data for '+this.id+' Object');
    var pumpPower=filterJSON(param,'id','P6');
    var energy=filterJSON(param,'id','P7');
    pumpPower[0].value=calculatePumpPower(param);
    energy[0].value=calculateEnergy(param);
    var position=getPosition(this.objProperties,'id','P6');
    this.objProperties[position].value=pumpPower[0].value;
    this.objProperties[position+1].value=energy[0].value;
    var ions=returnIonData(param)
    var tdsTotal=0;
    for(var index=0; index<ions.length; index++){
      this.objProperties.push(ions[index]);
      if(ions[index].id!="FI21"){
        tdsTotal+=ions[index].mglValue;
      }
    }
    this.objProperties.push({"id":"P10","name":"tdsTotal","value":tdsTotal });
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
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