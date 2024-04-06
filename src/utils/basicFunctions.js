function checkSame(id1,id2){

    if (id1 == id2 )
      return 1;
    else
      return 0;
    
  }
  
  
  const customOrder = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  function sorter(oneId,twoId){

      console.log(oneId,twoId);
      let result;
      if(oneId != undefined && twoId!= undefined){
        for (let i = 0; i < Math.min(oneId.length, twoId.length); i++) {
                let charA = oneId[i];
                let charB = twoId[i];
                let indexA = customOrder.indexOf(charA);
                let indexB = customOrder.indexOf(charB);
                if (indexA !== indexB) {
                  result = Math.min(indexA,indexB);
                  result = indexA < indexB ? oneId+":"+twoId : twoId+":"+oneId ;
                  break;
            }
        }
    }
    else
      result = 0;    
    return result;

  }
  

  function arrayRemove(arr, value) {
   
    return arr.filter(function (data) {
        return data != value;
    });
  
  }
  
  function socketWorker(sendingSocket,To,data){
    if(idActive.includes(To)){
      let n = idNames.length;
      for(let i=0;i<n;i++){
        if(idNames[i]["ID"] === To){
          k = idNames[i].Socket;
          io.to(k).emit(work, data);
        }
      }
    }
  }

  module.exports = {
    checkSame,
    sorter,
    arrayRemove,
    socketWorker
  }