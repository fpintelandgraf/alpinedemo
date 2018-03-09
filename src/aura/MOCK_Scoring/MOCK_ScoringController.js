({
    onInit : function(component, event, helper) {
        let componentLabel = component.get('v.componentLabel');
		component.set("v.cardLabel", componentLabel);
        helper.getScoreData(component)
    }
})