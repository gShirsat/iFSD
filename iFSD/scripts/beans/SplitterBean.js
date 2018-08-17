function Splitter(objectId){
  this.id=objectId;
  this.type="splitter";
  this.objProperties=[];
  this.outputParam=[];
  this.recycleParam=[];
  this.rejectParam=[];
  this.lastRecycleTS=0;
  this.lastRejectTS=0;
  
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
    var rejection=filterJSON(param,'id','FP1')[0].value;
    var recyclePercentage=filterJSON(this.objProperties,'id','S1')[0].value/100;
    var recycle=rejection*recyclePercentage;
    var concOut=rejection-recycle;
    console.log("rejection="+rejection+",recycle="+recycle+",concOut="+concOut);
    filterJSON(param,'id','S2')[0].value=recycle;
    filterJSON(param,'id','S3')[0].value=concOut;
    var ions=param.filter(function(jsonObj){ return jsonObj['id'].startsWith('FI');});
    for(var index=0; index<ions.length; index++){
      this.objProperties.push(ions[index]);
    }
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    console.log('Separating Output Data to '+this.id+' Object'+ms.now());
    this.outputParam=param;
    var recycleParam=param.filter(function(jsonObj){ 
      return jsonObj['id']!=='S3';
    });
    recycleParam=JSON.parse(JSON.stringify(recycleParam));
    filterJSON(recycleParam,'id','TS')[0].value=ms.now();
	  filterJSON(recycleParam,'id','FP1')[0].value=filterJSON(recycleParam,'id','S2')[0].value;
    var rejectParam=param.filter(function(jsonObj){ 
      return jsonObj['id']!=='S2';
    });
    
    rejectParam=JSON.parse(JSON.stringify(rejectParam));
    filterJSON(rejectParam,'id','TS')[0].value=ms.now();
    filterJSON(rejectParam,'id','FP1')[0].value=filterJSON(rejectParam,'id','S3')[0].value;
    var nextObjects=getSplitterTargets(this.id);
    if(nextObjects!==null){
      this.setRecycleOutput(recycleParam,nextObjects[0]); //add STS
      this.setRejectOutput(rejectParam,nextObjects[1]); //add STS
    }
  };
  
  this.setRecycleOutput=function(param,nextObject){
    //console.log('Setting Recycle Data to '+this.id+' Object');
    this.recycleParam=param;
    var currentTS=filterJSON(param,'id','TS')[0].value;
    var execute=false;
    if(this.lastRecycleTS==0 ||this.lastRecycleTS<currentTS){
      this.lastRecycleTS=currentTS;
      execute=true;
    }
    if(execute){
       if(nextObject!==null){
        console.log('Passing Recycle Data From '+this.id+' Object to '+nextObject.id+' Object');
        nextObject.setInput(param, this.id);
      }else{
        console.log('Recycle Data Transfer Stopped at '+this.id+' Object');
      }
    }
  };
  
  this.setRejectOutput=function(param,nextObject){
    this.rejectParam=param;
    var currentTS=filterJSON(param,'id','TS')[0].value;
    var execute=false;
    if(this.lastRejectTS==0 ||this.lastRejectTS<currentTS){
      this.lastRejectTS=currentTS;
      execute=true;
    }
    if(execute){
      if(nextObject!==null){
        console.log('Passing Reject Data From '+this.id+'Object to '+nextObject.id+' Object');
        nextObject.setInput(param, this.id);
      }else{
        console.log('Reject Data Transfer Stopped at '+this.id+' Object');
       }
    }
  };
}