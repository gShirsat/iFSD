function CF(objectId){
  this.id=objectId;
  this.type="cf";
  this.objProperties=[];
  this.recoveryParam=[];
  this.rejectParam=[];
  this.outputParam=[];
  this.lastOutletTS=0;
  this.lastWasteTS=0;
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
    var recovery=filterJSON(this.objProperties,'id','C22')[0].value/100;
    var feed=filterJSON(param,'id','FP1')[0].value;
    var perm=feed*recovery;
    var conc=feed-perm;
    var TDS=filterJSON(param,'id','FP3')[0].value;
    filterJSON(param,'id','CF1')[0].value=feed;
    filterJSON(param,'id','CP1')[0].value=perm;
    filterJSON(param,'id','CC1')[0].value=conc;
    filterJSON(this.objProperties,'id','CF1')[0].value=feed;
    filterJSON(this.objProperties,'id','CP1')[0].value=perm;
    filterJSON(this.objProperties,'id','CC1')[0].value=conc;
    filterJSON(this.objProperties,'id','CF2')[0].value=TDS;
    filterJSON(this.objProperties,'id','CP2')[0].value=TDS;
    filterJSON(this.objProperties,'id','CC2')[0].value=TDS;
    filterJSON(this.objProperties,'id','CF22')[0].value=filterJSON(param,'id','FP5')[0].value;
    filterJSON(this.objProperties,'id','CP22')[0].value=filterJSON(param,'id','FP5')[0].value;
    filterJSON(this.objProperties,'id','CC22')[0].value=filterJSON(param,'id','FP5')[0].value;
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    var permTDS = filterJSON(this.objProperties,'id','CP2')[0].value;
    var concTDS = filterJSON(this.objProperties,'id','CC2')[0].value;
    //console.log('Separating Output Data to '+this.id+' Object');
    this.outputParam=param;
    var recoveryParam=param.filter(function(jsonObj){ 
      return !jsonObj['id'].startsWith('CC');
    });
    recoveryParam=JSON.parse(JSON.stringify(recoveryParam));
    filterJSON(recoveryParam,'id','CTS')[0].value=ms.now();
    filterJSON(recoveryParam,'id','FP1')[0].value=filterJSON(recoveryParam,'id','CP1')[0].value;
    filterJSON(recoveryParam,'id','FP5')[0].value=filterJSON(recoveryParam,'id','CP22')[0].value;
    
    //Rajesh: Assigning permeate TDS to next recovery stream to support two pass calcs
    filterJSON(recoveryParam,'id','FP3')[0].value = permTDS;
    
    var rejectParam=param.filter(function(jsonObj){ 
      return !jsonObj['id'].startsWith('CP');
    });
    rejectParam=JSON.parse(JSON.stringify(rejectParam));
    filterJSON(rejectParam,'id','CTS')[0].value=ms.now();
    filterJSON(rejectParam,'id','FP1')[0].value=filterJSON(rejectParam,'id','CC1')[0].value;
    filterJSON(rejectParam,'id','FP5')[0].value=filterJSON(rejectParam,'id','CC22')[0].value;
    filterJSON(rejectParam,'id','FP3')[0].value = concTDS;
    var nextObjects=getROTargets(this.id);
    if(nextObjects!==null && nextObjects.length!=0){
      this.setRecoveryOutput(recoveryParam,nextObjects[0]);
      this.setRejectOutput(rejectParam, nextObjects[1]);
    }else{
     console.log('No Recovery or Reject Target found for '+this.id+' Object'); 
    }
  };
  
  this.setRecoveryOutput=function(param, nextObject){
    this.recoveryParam=param;
    var currentTS=filterJSON(param,'id','CTS')[0].value;
    var execute=false;
    if(this.lastOutletTS==0 ||this.lastOutletTS<currentTS){
      this.lastOutletTS=currentTS;
      execute=true;
    }
    if(execute){
      //console.log('Setting Recovery Data to '+this.id+' Object');

      if(nextObject!==null){
        console.log('Passing Recovery Output From '+this.id+' to '+nextObject.id+' Object');
        nextObject.setInput(param, this.id);
      }else{
        console.log('Recovery Data Transfer Stopped at '+this.id+' Object');
      }
    }
  };
  
  this.setRejectOutput=function(param, nextObject){
    //console.log('Setting Reject Data to '+this.id+' Object');
    this.rejectParam=param;
    var currentTS=filterJSON(param,'id','CTS')[0].value;
    var execute=false;
    if(this.lastWasteTS==0 ||this.lastWasteTS<currentTS){
      this.lastWasteTS=currentTS;
      execute=true;
    }
    if(execute){
      if(nextObject!==null){
        console.log('Passing Reject Output From '+this.id+' to '+nextObject.id+' Object');
        nextObject.setInput(param, this.id);
      }else{
        console.log('Reject Data Transfer Stopped at '+this.id+' Object');
      }
    }
  };
}