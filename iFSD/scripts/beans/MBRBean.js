function MBR(objectId){
  this.id=objectId;
  this.type="mbr";
  this.objProperties=[];
  this.outputParam=[];
  
  this.setProperties= function(properties){
    this.objProperties=properties;
  };
  
  this.setInput= function(param, prevObject
  ){
    //console.log('MBR setInput called');
    param=appendProperties(param,this.objProperties);
    this.doCalc(param);
  };
  
  this.doCalc=function(param){
    //console.log('MBR doCalc called');
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    console.log('MBBR setOutput called');
    this.outputParam=param;
  };
}