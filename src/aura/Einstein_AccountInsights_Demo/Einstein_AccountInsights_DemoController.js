({
    init : function(component,event,helper){
       
    },
    
    
    loadMe : function(component,event,helper){
        component.set('v.cardLabel','Einstein Insights')
		console.log('loading');
        //helper.loadCmp();
        var action = component.get("c.getAccountStuff");
        action.setParams({
            "accountid": component.get("v.recordId")
        });
         
        // Register the callback function
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            if(data != null){
                var all_data = data.split('#*#');
            }
            else{
                var all_data = ['Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID','Invalid Account ID'];
            }
            
            //set account name
            component.set("v.insight1_ar[0]", all_data[0]);
            //set insight title, trend icon, article text, and color
            switch(all_data[1]){
                case 'Merger & Acquisition':
                    component.set("v.insight1_ar[1]", "M&A activity detected for " + all_data[0]);
                    component.set("v.insight1_ar[14]", "Here are 3 articles about " + all_data[0] + " and merger and acquisition activity.");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/zq6gplcsza98gqe/trending_NEUTRAL.png?raw=1");
                    component.set("v.class_col1", "neut");
                    break;
                    
                case 'Company Expanding':
                    component.set("v.insight1_ar[1]", all_data[0] + " is expanding");
                    component.set("v.insight1_ar[14]", "Here are 3 articles about " + all_data[0] + " expansion.");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/es337funzub8nan/trending_UP.png?raw=1");
                    component.set("v.class_col1", "green");
                    break;
                    
                case 'Company Cost Cutting':
                    component.set("v.insight1_ar[1]", all_data[0] + " is cutting costs");
                    component.set("v.insight1_ar[14]", "Here are 3 articles about " + all_data[0] + " and cost-cutting measures.");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    component.set("v.class_col1", "red");
                    break;
                    
                case 'Leadership Change':
                    component.set("v.insight1_ar[1]", "Leadership changes at " + all_data[0]);
                    component.set("v.insight1_ar[14]", "Here are 3 articles about changes to the executive leadership at " + all_data[0] + ".");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/zq6gplcsza98gqe/trending_NEUTRAL.png?raw=1");
                    component.set("v.class_col1", "neut");
                    break;
                    
                case 'Prospect unresponsive':
                    component.set("v.insight1_ar[1]", "Contact at " + all_data[0] + " hasn’t responded");
                    component.set("v.insight1_ar[14]", "We usually hear back within 4 days, but this contact hasn't responded in 8 days.");
                    component.set("v.class_cus1b", "invisible");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    component.set("v.class_col1", "red");
                    break;
                    
                case 'No communication':
                    component.set("v.insight1_ar[1]", "No communication at " + all_data[0]);
                    component.set("v.insight1_ar[14]", "There’s usually communication about this account every 5 days. So far, there hasn’t been any in 8 days.");
                    component.set("v.class_cus1b", "invisible");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    component.set("v.class_col1", "red");
                    break;
                    
                default:
                    component.set("v.insight1_ar[1]", "No communication at " + all_data[0]);
                    component.set("v.insight1_ar[14]", "There’s usually communication about this account every 5 days. So far, there hasn’t been any in 8 days.");
                    component.set("v.class_cus1b", "invisible");
                    component.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    component.set("v.class_col1", "red");
                    break;
            }
            
            //set article titles
            if(all_data[2] == "null"){
                all_data[2] = "A new future for " + all_data[0];
            }
            if(all_data[6] == "null"){
                all_data[6] = "Welcome change, or not?";
            }
            if(all_data[10] == "null"){
                all_data[10] = "The time has come for action at " + all_data[0];
            }
            component.set("v.insight1_ar[2]", all_data[2]);
            component.set("v.insight1_ar[6]", all_data[6]);
            component.set("v.insight1_ar[10]", all_data[10]);
            //set article dates
            var incr = 3;
            while(incr < 12){
                var daysold = all_data[incr];
                var monthsold = Math.round(daysold / 30);
                var yearsold = Math.round(daysold / 365);
                if(daysold < 1){
                    component.set("v.insight1_ar[" + incr + "]", "Today");
                }
                else if(daysold == 1){
                    component.set("v.insight1_ar[" + incr + "]", "1 day ago");
                }
                else if(daysold < 31){
                    component.set("v.insight1_ar[" + incr + "]", daysold + " days ago");
                }
                else if(daysold < 365){
                    component.set("v.insight1_ar[" + incr + "]", monthsold + " months ago");
                }
                else if(yearsold < 2){
                    component.set("v.insight1_ar[" + incr + "]", "1 year ago");
                }
                else if(yearsold > 1){
                    component.set("v.insight1_ar[" + incr + "]", yearsold + " years ago");
                }
                else{
                    component.set("v.insight1_ar[" + incr + "]", "2 days ago");
                }
                incr += 4;                
            }
            
            //set article sources
            if(all_data[4] == "null"){
                all_data[4] = "Financial Times";
            }
            if(all_data[8] == "null"){
                all_data[8] = "San Francisco Chronicle";
            }
            if(all_data[12] == "null"){
                all_data[12] = "Wall Street Journal";
            }
            component.set("v.insight1_ar[4]", all_data[4]);
            component.set("v.insight1_ar[8]", all_data[8]);
            component.set("v.insight1_ar[12]", all_data[12]);
            //set article urls
            if(all_data[5] == "null"){
                all_data[5] = "http://ft.com";
            }
            if(all_data[9] == "null"){
                all_data[9] = "http://sfchronicle.com";
            }
            if(all_data[13] == "null"){
                all_data[13] = "http://wsj.com";
            }
            component.set("v.insight1_ar[5]", all_data[5]);
            component.set("v.insight1_ar[9]", all_data[9]);
            component.set("v.insight1_ar[13]", all_data[13]);
            

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
            }), 500
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
            }), 500
        );
        
        
        var cmpTarget = component.find('aDock');
	    $A.util.removeClass(cmpTarget, 'active');
        $A.util.removeClass(cmpTarget, 'bounce');
    },

})