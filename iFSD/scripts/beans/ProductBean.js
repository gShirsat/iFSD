function Product(objectId){
  this.id=objectId;
  this.type="product";
  this.objProperties=[];
  this.outputParam=[];
  
  this.setProperties= function(properties){
    this.objProperties=properties;
  };
  
  this.setInput= function(param){
    //console.log('Product setInput called');
    param=appendProperties(param,this.objProperties);
    this.doCalc(param);
  };
  
  this.doCalc=function(param){
    //console.log('Product doCalc called');
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    console.log('Product setOutput called');
    this.outputParam=param;
  };
}