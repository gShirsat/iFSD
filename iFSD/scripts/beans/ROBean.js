function RO(objectId){
  this.id=objectId;
  this.type="ro";
  this.objProperties=[];
  this.recoveryParam=[];
  this.rejectParam=[];
  this.outputParam=[];
  this.history=[];
  this.lastPermeateTS=0;
  this.lastConcTS=0;
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
    var recovery=filterJSON(this.objProperties,'id','R26')[0].value/100;
    var rejection=filterJSON(this.objProperties,'id','R27')[0].value/100;
    var feedRate=filterJSON(param,'id','FP1')[0];
    var rawFeed=filterJSON(param,'id','RF')[0].value;
    var TDS=filterJSON(param,'id','FP3')[0];
    var alkanality=filterJSON(param,'id','FP2')[0];
    var calcium=filterJSON(param,'id','F11')[0];
    var concRecycle=0;
    var concTDS=filterJSON(param,'id','RC2')[0].value;
    var feed=filterJSON(param,'id','FP1')[0].value;
    var roFeedTDS=TDS.value;
    /* Rajesh: Added prev conc parameters */
    var conc = 0;
    var concR = 0;
    
    //Rajesh: Initializing feedTDS
    var feedTDS = TDS;
    var permTDS = TDS;
    if(this.outputParam!==null && this.outputParam.length>0){
      feedRate=filterJSON(this.outputParam,'id','RF1')[0];
      //Rajesh: Don't need TDS back; RF2 holds last calculated roFeedTDS value
      //roFeedTDS=filterJSON(this.outputParam,'id','RF2')[0].value;
      alkanality=filterJSON(this.outputParam,'id','RF3')[0];
      calcium=filterJSON(this.outputParam,'id','RF4')[0];
      concRecycle = 1;
      if(param.filter(function(e) { return e.name == 'S1'; }).length > 0){
        concRecycle=filterJSON(param,'id','S1')[0].value/100;
      }
      
      /* Rajesh: Fetching previous params for roFeedTDS calc as per the formula provided by JP */
      conc = filterJSON(param,'id','RC1')[0].value;
    }
    
    if(feedRate.value>0){
      var perm=feed*recovery;
      conc=feed-perm;
      concR=conc*concRecycle;
      var concOut=conc-concR;
      var totalFeed=feedRate.value+concR;
      var massImbalance=(concOut+perm-feedRate.value)/feedRate.value;
    
     permTDS=(1-rejection)*roFeedTDS;
      
      //Formula says: (RoFeed*RoFeedTDS - Permeate*PermTDS) / (RoFeed - Permeate)
      concTDS=(feed*roFeedTDS-perm*permTDS)/(feed-perm);
      
      console.log('ro : '+this.id+', feed : '+feed+', roFeedTDS : '+roFeedTDS+', perm : '+perm+', permTDS : '+permTDS+', concTDS == '+concTDS);
      
      iterationJSON.push({
        "feed":feed,
        "perm":perm,
        "conc":conc,
        "concR":concR,
        "concOut":concOut,
        "totalFeed":totalFeed,
        "massImbalance":massImbalance,
        "roFeedTDS":roFeedTDS,
        "permTDS":permTDS,
        "concTDS":concTDS
      });
      console.log('98'+this.id+"====="+roFeedTDS);
      filterJSON(param,'id','RF1')[0].value=feed;
      filterJSON(param,'id','RP1')[0].value=perm;
      filterJSON(param,'id','RC1')[0].value=conc;
      filterJSON(param,'id','RF2')[0].value=roFeedTDS;
      filterJSON(param,'id','RP2')[0].value=permTDS;
      filterJSON(param,'id','RC2')[0].value=concTDS;
      /*filterJSON(param,'name','FlowValue')[0].value=feed;*/
      
      filterJSON(this.objProperties,'id','RF1')[0].value=feed;
      filterJSON(this.objProperties,'id','RP1')[0].value=perm;
      filterJSON(this.objProperties,'id','RC1')[0].value=conc;
      filterJSON(this.objProperties,'id','RF2')[0].value=roFeedTDS;
      filterJSON(this.objProperties,'id','RP2')[0].value=permTDS;
      filterJSON(this.objProperties,'id','RC2')[0].value=concTDS;
      var ionData=copyIonProperties(param);
      var ionsData=calculateROIons(ionData, this.id);
      var ionProps=this.objProperties.filter(function(jsonObj){
        if(jsonObj['id'].startsWith('RF')||jsonObj['id'].startsWith('RP')||jsonObj['id'].startsWith('RC')){
          var id=Number(jsonObj['id'].replace('RF','').replace('RP','').replace('RC',''));
          if(id>3 && id<25)
          return jsonObj;
        }
      });
      /*
      Rajesh: Keeping earlier calculated values of roFeedTDS, permTDS & concTDS*/
      
      $.each(ionProps, function(index){
        var ion=[];
        var name=this.name;
        if(this.id.startsWith('RF')){
          ion=filterJSON(ionsData[0],'name',name);
          if(ion.length>0){
            this.value=ion[0].mglValue;
          }
        }else if(this.id.startsWith('RP')){
          ion=filterJSON(ionsData[1],'name',name);
          if(ion.length>0){
            this.value=ion[0].mglValue;
          }
        }else if(this.id.startsWith('RC')){
          ion=filterJSON(ionsData[2],'name',name);
          if(ion.length>0){
            this.value=ion[0].mglValue;
          }
        }
      });
      
      var ph=filterJSON(param,'id','FP4')[0].value;
      var temp=filterJSON(param,'id','FP5')[0].value;
      /* Rajesh: Assigned roFeedTDS to the feedTDS for data table population*/
      feedTDS=roFeedTDS;//filterJSON(param,'id','FP3')[0].value;
      /*var phs=calculateROPH(ph,recovery,rejection);
      var temps=calculateROTemp(temp,recovery,rejection);*/
      
      filterJSON(this.objProperties,'id','RF2')[0].value=feedTDS;
      filterJSON(this.objProperties,'id','RP2')[0].value=permTDS;
      filterJSON(this.objProperties,'id','RC2')[0].value=concTDS;
      filterJSON(this.objProperties,'id','RF25')[0].value=filterJSON(param,'id','FP4')[0].value;
      filterJSON(this.objProperties,'id','RF26')[0].value=filterJSON(param,'id','FP5')[0].value;
      filterJSON(this.objProperties,'id','RP25')[0].value=filterJSON(param,'id','FP4')[0].value;
      filterJSON(this.objProperties,'id','RP26')[0].value=filterJSON(param,'id','FP5')[0].value;
      filterJSON(this.objProperties,'id','RC25')[0].value=filterJSON(param,'id','FP4')[0].value;
      filterJSON(this.objProperties,'id','RC26')[0].value=filterJSON(param,'id','FP5')[0].value;
    }
    if(!trackIds.includes(this.id)){
      trackIds+="_"+this.id;
    }
    this.setOutput(param);
  };
  
  this.setOutput=function(param){
    var permTDS = filterJSON(this.objProperties,'id','RP2')[0].value;
    var concTDS = filterJSON(this.objProperties,'id','RC2')[0].value;
    //console.log('Separating Output Data to '+this.id+' Object');
    this.outputParam=param;
    var recoveryParam=param.filter(function(jsonObj){ 
      return !jsonObj['id'].startsWith('RC');
    });
    recoveryParam=JSON.parse(JSON.stringify(recoveryParam));
    filterJSON(recoveryParam,'id','ROTS')[0].value=ms.now();
    filterJSON(recoveryParam,'id','FP1')[0].value=filterJSON(recoveryParam,'id','RP1')[0].value;
    filterJSON(recoveryParam,'id','FP4')[0].value=filterJSON(recoveryParam,'id','RP25')[0].value;
    filterJSON(recoveryParam,'id','FP5')[0].value=filterJSON(recoveryParam,'id','RP26')[0].value;
    
    //Rajesh: Assigning permeate TDS to next recovery stream to support two pass calcs
    filterJSON(recoveryParam,'id','FP3')[0].value = permTDS;
    
    var recoveryIons=returnIonData(recoveryParam)
    var permIons=recoveryParam.filter(function(jsonObj){
        if(jsonObj['id'].startsWith('RP')){
          var id=Number(jsonObj['id'].replace('RP',''));
          if(id>3)
          return jsonObj;
        }
      });
    $.each(recoveryIons, function(index){
      var name=this.name;
      this.mglValue=filterJSON(permIons,'name',name)[0].value;
    });
    var rejectParam=param.filter(function(jsonObj){ 
      return !jsonObj['id'].startsWith('RP');
    });
    rejectParam=JSON.parse(JSON.stringify(rejectParam));
    filterJSON(rejectParam,'id','ROTS')[0].value=ms.now();
    filterJSON(rejectParam,'id','FP1')[0].value=filterJSON(rejectParam,'id','RC1')[0].value;
    filterJSON(rejectParam,'id','FP4')[0].value=filterJSON(rejectParam,'id','RC25')[0].value;
    filterJSON(rejectParam,'id','FP5')[0].value=filterJSON(rejectParam,'id','RC26')[0].value;
    filterJSON(rejectParam,'id','FP3')[0].value = concTDS;
    var rejectIons=returnIonData(rejectParam)
    var concIons=rejectParam.filter(function(jsonObj){
        if(jsonObj['id'].startsWith('RC')){
          var id=Number(jsonObj['id'].replace('RC',''));
          if(id>3)
          return jsonObj;
        }
      });
    $.each(rejectIons, function(index){
      var name=this.name;
      this.mglValue=filterJSON(concIons,'name',name)[0].value;
    });
    var nextObjects=getROTargets(this.id);
    if(nextObjects!==null && nextObjects.length!=0){
      this.setRecoveryOutput(recoveryParam,nextObjects[0]);
      this.setRejectOutput(rejectParam, nextObjects[1]);
    }else{
     console.log('No Recovery or Reject Target found for '+this.id+' Object'); 
    }
  };
  
  this.setRecoveryOutput=function(param, nextObject){
    //console.log('Setting Recovery Data to '+this.id+' Object');
    this.recoveryParam=param;
    var currentTS=filterJSON(param,'id','ROTS')[0].value;
    var execute=false;
    if(this.lastPermeateTS==0 ||this.lastPermeateTS<currentTS){
      this.lastPermeateTS=currentTS;
      execute=true;
    }
    if(execute){
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
    var currentTS=filterJSON(param,'id','ROTS')[0].value;
    var execute=false;
    if(this.lastConcTS==0 ||this.lastConcTS<currentTS){
      this.lastConcTS=currentTS;
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