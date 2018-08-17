function Feed(objectId){
  this.id=objectId;
  this.type="feed";
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
    filterJSON(param,'id','RF')[0].value=filterJSON(param,'id','FP1')[0].value;
    filterJSON(param,'id','RT')[0].value=filterJSON(param,'id','FP3')[0].value;
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
      nextObject[0].setInput(param, this.id);
    }else{
      console.log('Data Transfer Stopped at '+this.id+' Object');
    }
  };
}