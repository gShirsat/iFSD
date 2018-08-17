function calculatePumpPower(properties){
  var pumpEfficiency=getPropertyValue(properties,'P3')/100;
  var motorEfficiency=getPropertyValue(properties,'P4')/100;
  var vfdEfficiency=getPropertyValue(properties,'P5')/100;
  var inlet=getPropertyValue(properties,'P1');
  var discharge=getPropertyValue(properties,'P2');
  var flowRate=getPropertyValue(properties,'F1');
  
  var pumpPower=0;
  if(flowRate>0){
    var pressure=discharge-inlet;
    pumpPower=100*(pressure*flowRate)/(pumpEfficiency*motorEfficiency*vfdEfficiency);
    if(pumpPower<0)
      pumpPower=0;
  }
  return pumpPower;
}