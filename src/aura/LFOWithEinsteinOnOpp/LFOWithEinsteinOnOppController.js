({
	init : function(component, event, helper) {
		helper.loadCmp();
        helper.getEmailAttributes(component);
        helper.enqueueInsightCall(component);
    },
    
    handlePeopleChange : function(component, event, helper) {
        debugger;
        helper.getEmailAttributes(component);
        helper.enqueueInsightCall(component);
    },
    
    handleSubjectChange : function(component, event, helper) {
        
    },
    
    expandInsight : function(component,event,helper){
        var el = event.srcElement;
   		var id = el.dataset.id;//id here is from 'data-id' in the element
        
        var cmpTarget = component.find('content'+id);
	    $A.util.toggleClass(cmpTarget, 'expand');
    },
    
    fadeInsight : function(component,event,helper){
        var el = event.srcElement;
   		var id = el.dataset.id;//id here is from 'data-id' in the element
        
		document.getElementById('insight'+id).classList.add('fade');
        window.setTimeout(
            $A.getCallback(function() {
              /*  document.getElementById('insight'+id).classList.add('hide');*/
            }), 800
        );
    },
    
	handleClick : function(component, event, helper) {
		var cmpTarget = component.find('hover');
	    $A.util.toggleClass(cmpTarget, 'show');
	},
    
	closeBox : function(component, event, helper) {
		var cmpTarget = component.find('hover');
	    $A.util.removeClass(cmpTarget, 'show');
	},
    
    emailDock : function(component,event, helper){
        helper.showEmailComp(component);
    },

    closeDock : function(component,event){
        var id  = component.get("v.lastInsight");
        document.getElementById('insight'+id).classList.add('fade');
        window.setTimeout(
            $A.getCallback(function() {
            /*    document.getElementById('insight'+id).classList.add('hide');
            */
            }), 800
        );
        
        var cmpTarget = component.find('aDock');
	    $A.util.removeClass(cmpTarget, 'active');
        $A.util.removeClass(cmpTarget, 'bounce');
    }
})