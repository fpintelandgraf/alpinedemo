({
    init : function(component,event,helper){
    },
    loadMe : function(component,event,helper){
        component.set('v.cardLabel', 'Einstein Insights')
        console.log('loading');
        helper.loadCmp();
        var action = component.get("c.getMoreOpptyStuff");
        action.setParams({
            "opptyid": component.get("v.recordId")
        });
        
        // Register the callback function
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            var all_data = data.split('#*#');
            component.set("v.account_name", all_data[0]);
            component.set("v.closedate", all_data[1]);
            if(all_data[2] != "null"){
                //if not null, set
                component.set("v.act_subject", all_data[2]);
            }
            if(all_data[3] != "null"){
                //if not null, set
                component.set("v.act_text", all_data[3]);
            }
            if(all_data[4] == "Call"){
                component.set("v.act_type", "https://www.dropbox.com/s/lpniuoi6dru2vez/phoneicon.png?raw=1");
            }
            else{
                component.set("v.act_type", "https://www.dropbox.com/s/vr2q3nfczjpt925/email.png?raw=1");
            }
            if(all_data[5] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight1").style.display = "block";
                component.set("v.class_cus1", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight1").style.display = "none";
                component.set("v.class_cus1", "invisible");
            }
            if(all_data[6] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight2").style.display = "block";
                component.set("v.class_cus2", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight2").style.display = "none";
                component.set("v.class_cus2", "invisible");
            }
            if(all_data[7] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight3").style.display = "block";
                component.set("v.class_cus3", "visible");
                if(all_data[8] != "null"){
                    //if not null, set
                    component.set("v.con_name", all_data[8]);
                }
                if(all_data[9] != "null"){
                    //if not null, set
                    component.set("v.comp_name", all_data[9]);
                }
            }
            else{
                //don't display it
                //document.getElementById("insight3").style.display = "none";
                component.set("v.class_cus3", "invisible");
            }
            if(all_data[10] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight4").style.display = "block";
                component.set("v.class_cus4", "visible");
                if(all_data[11] != "null"){
                    //if not null, set
                    component.set("v.slow_reason", all_data[11]);
                }
            }
            else{
                //don't display it
                //document.getElementById("insight4").style.display = "none";
                component.set("v.class_cus4", "invisible");
            }
            if(all_data[12] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight5").style.display = "block";
                component.set("v.class_cus5", "visible");
                if(all_data[13] != "null"){
                    //if not null, set
                    component.set("v.boost_reason", all_data[13]);
                }
            }
            else{
                //don't display it
                //document.getElementById("insight5").style.display = "none";
                component.set("v.class_cus5", "invisible");
            }
            if(all_data[14] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight6").style.display = "block";
                component.set("v.class_cus6", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight6").style.display = "none";
                component.set("v.class_cus6", "invisible");
            }
            if(all_data[15] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight7").style.display = "block";
                component.set("v.class_cus7", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight7").style.display = "none";
                component.set("v.class_cus7", "invisible");
            }
            if(all_data[16] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight8").style.display = "block";
                component.set("v.class_cus8", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight8").style.display = "none";
                component.set("v.class_cus8", "invisible");
            }
            if(all_data[17] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight9").style.display = "block";
                component.set("v.class_cus9", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight9").style.display = "none";
                component.set("v.class_cus9", "invisible");
            }
            if(all_data[18] != 'null'){
                //set email subject if not null
                component.set("v.email_subject", all_data[18]);
            }
            else{
                //set it to default
                component.set("v.email_subject", "Introduction");
            }
            if(all_data[19] != 'null'){
                //set email subject if not null
                component.set("v.email_body", all_data[19]);
            }
            else{
                //set it to default
                component.set("v.email_body", "Hi Susan, <br/><br/>Any chance you can introduce me to Lauren Jacobs. She\'s a C-Level at Presido Tech that we need to be more engaged. <br/><br/>Thanks, <br/>Alex</p>");
            }
            if(all_data[20] != 'null'){
                //set email subject if not null
                component.set("v.email_cid", all_data[20]);
            }
            else{
                //set it to default
                component.set("v.email_cid", "0036A00000NWBPQIAQ");
            }
            if(all_data[21] != 'null'){
                //set email subject if not null
                component.set("v.email_cname", all_data[21]);
            }
            else{
                //set it to default
                component.set("v.email_cname", "Susan Chan");
            }
            if(all_data[22] != 'null'){
                //set email subject if not null
                component.set("v.email_cemail", all_data[22]);
            }
            else{
                //set it to default
                component.set("v.email_cemail", "Susan@chan.test");
            }
            
        });
        
        $A.enqueueAction(action);
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
        /*
        var el = event.srcElement;
   		var id = el.dataset.id;//id here is from 'data-id' in the element
        
        var li = component.get("v.lastInsight");
        component.set("v.lastInsight",id);

        var cmpTarget = component.find('content'+id);
	    $A.util.toggleClass(cmpTarget, 'expand');
        
        var cmpTarget = component.find('hover');
	    $A.util.removeClass(cmpTarget, 'show');
        var cmpTarget = component.find('aDock');
	    $A.util.addClass(cmpTarget, 'bounce');
        window.setTimeout(
            $A.getCallback(function() {
                var cmpTarget = component.find('aDock');
            	$A.util.addClass(cmpTarget, 'active');
            }), 300
        );
        */
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
    },
    /*acceptDiscount : function(component,event){
        var cmpTarget = component.find('hover');
	    $A.util.toggleClass(cmpTarget, 'show');
        
        var acceptAction = component.get("c.accepted");
        acceptAction.setCallback(this,(response)=>{
            var state = response.getState();
            if(state=="SUCCESS"){
                console.log(response.getReturnValue());
            	$A.get('e.force:refreshView').fire();            
				doAllThat(1);
            }
        });
		function doAllThat(num){
            console.log('go '+num);
            if(num == 1){
                document.getElementById('insight-img1').classList.add('rotateNeutral');
                setTimeout(()=>{
                    document.getElementById('insight-img1-rep').classList.add('show');

                    document.getElementById('insight-img1').classList.add('disappear');
                    
                    document.getElementById('insight1').classList.remove('down');
                    setTimeout(function(){
                    	doAllThat(num+1);
                	},1000)
                },1000)
            }else{
                document.getElementById('insight-img'+num).classList.add('rotate');
                setTimeout(()=>{
                    document.getElementById('insight-img'+num+'-rep').classList.add('show');

                    document.getElementById('insight-img'+num).classList.add('disappear');
                    
                    document.getElementById('insight'+num).classList.remove('down');
                    document.getElementById('insight'+num).classList.add('up');
                    
                    if(num==2) document.getElementById('insight-text2').innerHTML = "ElectroZ LLC Recommended";
                    if(num==3) document.getElementById('insight-text3').innerHTML = "Likely to Close in Time";
                    if(num<3){		
                    	setTimeout(function(){
                            doAllThat(num+1);
                        },1000)
					}
                    
                },1000)
            }
        }
        $A.enqueueAction(acceptAction);
	}*/
})