function Rejection(objectId){
  this.id=objectId;
  this.type="reject";
  this.objProperties=[];
  this.outputParam=[];
  
  this.setProperties= function(properties){
    this.objProperties=properties;
  };
  
  this.setInput= function(param, prevObject
  ){
    //console.log('Rejection setInput called');
    param=appendProperties(param,this.objProperties);
    this.doCalc(param);
  };
  
  this.doCalc=function(param){
    //console.log('Rejection doCalc called');
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    console.log('Rejection setOutput called');
    this.outputParam=param;
  };
}