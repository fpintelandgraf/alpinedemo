({
	doInit : function(component, event, helper) {
        
       
        
        component.set('v.cardLabel', 'Einstein Intent');
        
        let action = component.get('c.getRecordAnalysis');
               
        action.setParams({
            recordId: component.get('v.recordId'),
            modelId:  component.get('v.modelId'),
            fieldName: component.get('v.fieldName')
        })
        
         
        
        action.setCallback(this, function(res){
            let state = res.getState();
            let retVal = res.getReturnValue();
       
            if(state === 'SUCCESS'){
              
                if(retVal){
                    component.set('v.predictionList', retVal);
                    component.set('v.hasData', true);
                }
            } else {
                console.log(res.getError());
            }
        })
        
        $A.enqueueAction(action);
        
        let action2 = component.get('c.getRecordName');
               
        action2.setParams({
            recordId: component.get('v.recordId'),
           
        })
        
         
        
        action2.setCallback(this, function(res){
            let state = res.getState();
            let retVal = res.getReturnValue();
       
            if(state === 'SUCCESS'){
              
                if(retVal){
                     let modelId =  component.get('v.modelId');
                    let einsteinLabel = '';
                    
                    if(modelId == 'CommunitySentiment') {
                        einsteinLabel = 'Sentiment';
                    } else {
                        einsteinLabel = 'Intent';
                    }
                    let title = retVal + ' '  + einsteinLabel;
                    
                    component.set('v.cardLabel', title);
                    
                }
            } else {
                console.log(res.getError());
            }
        })
        
        $A.enqueueAction(action2);
    }
})