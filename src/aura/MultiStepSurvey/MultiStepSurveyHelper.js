({
    doInit : function(cmp) {
		// this._initScanner(cmp);
    },
    _initScanner : function(cmp){
        cmp.set('v.initialized', false)
		var _vShelfScanner = cmp.get('v.shelfScanner') || undefined,
            _vModelId = cmp.get('v.modelId'),
            _cScanCompleteFunc = cmp.getReference('c.handleScanEvent');
        if(!_vShelfScanner){
            $A.createComponent('c:ShelfScanner', { 'modelId': _vModelId, 'scanCompletedEvent': _cScanCompleteFunc},
            function(shelfScanner, status, errorMessage){
                if (status === "SUCCESS") {
                    cmp.set('v.shelfScanner', shelfScanner);
                    cmp.set('v.initialized', true);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            });
        }            
    },
    saveSurveyResponses : function(cmp) {
        var action = cmp.get("c.saveSurveyResponses");
        var surveyOrderResponse = cmp.find("surveyOrderResponse").get("v.value");
        var surveyDeliveryResponse = cmp.find("surveyDeliveryResponse").get("v.value");
        action.setParams( { 
            "surveyOrderResponse": surveyOrderResponse,
            "surveyDeliveryResponse": surveyDeliveryResponse
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()) {
                    console.log(response.getReturnValue());
                 //   this.createCasesForResponses(cmp, response.getReturnValue());
                    this._clearCtx(cmp);
                }
            } else if(state === "ERROR") {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    createCasesForResponses : function(cmp, newDeliveryResponse) {
        //var surveyResponses = cmp.get("v.surveyResponses");
        var action = cmp.get("c.createCasesForResponses");
        action.setParams( { 
            "newDeliveryResponse": newDeliveryResponse
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    _clearCtx : function(cmp){
		//this._initScanner(cmp);
        cmp.set('v.currentProgress', 0);
		cmp.set('objectDetected', false);

    }
})