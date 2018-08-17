function Baf(objectId){
  this.id=objectId;
  this.type="baf";
  this.objProperties=[];
  this.outputParam=[];
  
  this.setProperties= function(properties){
    this.objProperties=properties;
  };
  
  this.setInput= function(param, prevObject
  ){
    //console.log('Baf setInput called');
    param=appendProperties(param,this.objProperties);
    this.doCalc(param);
  };
  
  this.doCalc=function(param){
    //console.log('Baf doCalc called');
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    console.log('Baf setOutput called');
    this.outputParam=param;
  };
}