({
    getScoreData : function(component) {
        let action = component.get('c.getScoreData');
        let recordId = component.get('v.recordId');
        let parentObjectType = component.get('v.parentObjectType')
        
        console.log('parentObjectType',parentObjectType);
        
        action.setParams({
            recordId: recordId,
            parentObjectType: parentObjectType
        })
        
        action.setCallback(this, function(res){
            let data = res.getReturnValue();
            let state = res.getState();
            console.log('getScoreData',data);
            
            if(state === 'SUCCESS'){
                this.setScoreData(component, data)
            } else {
                console.log('ERROR', res.getError());
            }
        })
        
        $A.enqueueAction(action);
    },
    setScoreData : function(component, data){
        component.set('v.score', data.score.Score__c);
        component.set('v.reasons', data.scoreReasons);
        
        if(data.scoreReasons.length == 0){
            component.set('v.hasData', false)
        }
    }
})