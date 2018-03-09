({
	/**
	 * Retrives the people from the email
	 */
    getEmailAttributes : function(cmp) {
		var people = cmp.get('v.people');
        
        if(people) {
            var peopleEmails = this.filterEmails(people);
            cmp.set("v.recipients", peopleEmails); 
        }
	},
    
    enqueueInsightCall : function(cmp) {
        var recipients = cmp.get("v.recipients");
        
        if(recipients && recipients.length > 0) {
        	this.enqueueAccountsCall(cmp, recipients);
        }
    },
    
    enqueueAccountsCall : function(cmp, recipients) {
        var action = cmp.get("c.getAccountStuff");
        action.setParams({
        	"emails": recipients
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
            cmp.set("v.insight1_ar[0]", all_data[0]);
            
            //set insight title, trend icon, article text, and color
            switch(all_data[1]){
                case 'Merger & Acquisition':
                    cmp.set("v.insight1_ar[1]", "M&A activity detected for " + all_data[0]);
                    cmp.set("v.insight1_ar[14]", "Here are 3 articles about " + all_data[0] + " and merger and acquisition activity.");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/zq6gplcsza98gqe/trending_NEUTRAL.png?raw=1");
                    cmp.set("v.class_col1", "neut");
                    break;
                    
                case 'Company Expanding':
                    cmp.set("v.insight1_ar[1]", all_data[0] + " is expanding");
                    cmp.set("v.insight1_ar[14]", "Here are 3 articles about " + all_data[0] + " expansion.");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/es337funzub8nan/trending_UP.png?raw=1");
                    cmp.set("v.class_col1", "green");
                    break;
                    
                case 'Company Cost Cutting':
                    cmp.set("v.insight1_ar[1]", all_data[0] + " is cutting costs");
                    cmp.set("v.insight1_ar[14]", "Here are 3 articles about " + all_data[0] + " and cost-cutting measures.");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    cmp.set("v.class_col1", "red");
                    break;
                    
                case 'Leadership Change':
                    cmp.set("v.insight1_ar[1]", "Leadership changes at " + all_data[0]);
                    cmp.set("v.insight1_ar[14]", "Here are 3 articles about changes to the executive leadership at " + all_data[0] + ".");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/zq6gplcsza98gqe/trending_NEUTRAL.png?raw=1");
                    cmp.set("v.class_col1", "neut");
                    break;
                    
                case 'Prospect unresponsive':
                    cmp.set("v.insight1_ar[1]", "Contact at " + all_data[0] + " hasn’t responded");
                    cmp.set("v.insight1_ar[14]", "We usually hear back within 4 days, but this contact hasn't responded in 8 days.");
                    cmp.set("v.class_cus1b", "invisible");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    cmp.set("v.class_col1", "red");
                    break;
                    
                case 'No communication':
                    cmp.set("v.insight1_ar[1]", "No communication at " + all_data[0]);
                    cmp.set("v.insight1_ar[14]", "There’s usually communication about this account every 5 days. So far, there hasn’t been any in 8 days.");
                    cmp.set("v.class_cus1b", "invisible");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    cmp.set("v.class_col1", "red");
                    break;
                    
                default:
                    cmp.set("v.insight1_ar[1]", "No communication at " + all_data[0]);
                    cmp.set("v.insight1_ar[14]", "There’s usually communication about this account every 5 days. So far, there hasn’t been any in 8 days.");
                    cmp.set("v.class_cus1b", "invisible");
                    cmp.set("v.image_trend1", "https://www.dropbox.com/s/u7e7n5zf2zggtsn/trending_DOWN.png?raw=1");
                    cmp.set("v.class_col1", "red");
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
            cmp.set("v.insight1_ar[2]", all_data[2]);
            cmp.set("v.insight1_ar[6]", all_data[6]);
            cmp.set("v.insight1_ar[10]", all_data[10]);
            //set article dates
            var incr = 3;

            while(incr < 12){
                var daysold = all_data[incr];
                var monthsold = Math.round(daysold / 30);
                var yearsold = Math.round(daysold / 365);
                if(daysold < 1){
                    cmp.set("v.insight1_ar[" + incr + "]", "Today");
                }
                else if(daysold == 1){
                    cmp.set("v.insight1_ar[" + incr + "]", "1 day ago");
                }
                else if(daysold < 31){
                    cmp.set("v.insight1_ar[" + incr + "]", daysold + " days ago");
                }
                else if(daysold < 365){
                    cmp.set("v.insight1_ar[" + incr + "]", monthsold + " months ago");
                }
                else if(yearsold < 2){
                    cmp.set("v.insight1_ar[" + incr + "]", "1 year ago");
                }
                else if(yearsold > 1){
                    cmp.set("v.insight1_ar[" + incr + "]", yearsold + " years ago");
                }
                else{
                    cmp.set("v.insight1_ar[" + incr + "]", "2 days ago");
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
            cmp.set("v.insight1_ar[4]", all_data[4]);
            cmp.set("v.insight1_ar[8]", all_data[8]);
            cmp.set("v.insight1_ar[12]", all_data[12]);
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
            cmp.set("v.insight1_ar[5]", all_data[5]);
            cmp.set("v.insight1_ar[9]", all_data[9]);
            cmp.set("v.insight1_ar[13]", all_data[13]);
        });
        
		$A.enqueueAction(action);
    },
    
    showEmailComp : function(cmp){
        // Generate a new publisher id, same as how email composer generates
        var publisherId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        publisherId = publisherId.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
      //  cmp.set("v._emailPublisherId", publisherId);
        var title = $A.get('$Label.EmailComposerHeaders.DockedTitle');               
        var recordId = cmp.get("v.recordId");
        var fields = {};
        
        var attributes = this.setEmailAttributes(cmp, recordId, publisherId);
        console.log('show email composer');
        
        $A.get("e.force:showDockingPanel").setParams({
            componentDef: 'emailui:composer',
            attributes: attributes,
            onError: function(status) {
                // error handling here
                console.log(status);
            },
            panelConfig: {
                // attributes for force:dockingPanel
                flavor: 'xlarge',
                title:  title,
                icon:   'email',
                iconColor: '95AEC5'
            }
        }).fire();
    },
    
    loadCmp : function(){
        window.setTimeout(
            $A.getCallback(function() {
                document.getElementsByClassName('insight')[0].classList.remove('fade');
                document.getElementsByClassName('insight')[1].classList.remove('fade');
                document.getElementsByClassName('insight')[2].classList.remove('fade');
                document.getElementsByClassName('insight')[3].classList.remove('fade');
                document.getElementsByClassName('insight')[4].classList.remove('fade');
                document.getElementById('placeholder1').classList.add('show');
            }), 800
        );
        
        window.setTimeout(
            $A.getCallback(function() {
                document.getElementById('placeholder2').classList.add('show');
                document.getElementsByClassName('insight')[1].classList.add('drop');
                document.getElementsByClassName('insight')[2].classList.add('follow1');
                document.getElementsByClassName('insight')[3].classList.add('follow1');
                document.getElementsByClassName('insight')[4].classList.add('follow1');
            }), 1000
        );
        window.setTimeout(
            $A.getCallback(function() {
                document.getElementById('placeholder3').classList.add('show');                
                document.getElementsByClassName('insight')[2].classList.add('drop');
                document.getElementsByClassName('insight')[3].classList.add('follow2');
                document.getElementsByClassName('insight')[4].classList.add('follow2');
            }), 1500
        );
        
        window.setTimeout(
            $A.getCallback(function() {
                document.getElementById('placeholder4').classList.add('show');                
                document.getElementsByClassName('insight')[3].classList.add('drop');
                document.getElementsByClassName('insight')[4].classList.add('follow3');
            }), 2000
        );
        
        
        window.setTimeout(
            $A.getCallback(function() {
                document.getElementById('placeholder1').classList.remove('show');     
                document.getElementById('placeholder2').classList.remove('show');     
                document.getElementById('placeholder3').classList.remove('show');   
                document.getElementById('placeholder4').classList.remove('show');   
                document.getElementsByClassName('insight')[0].classList.add('regular');
                document.getElementsByClassName('insight')[1].classList.add('regular');
                document.getElementsByClassName('insight')[2].classList.add('regular');
                document.getElementsByClassName('insight')[3].classList.add('regular');
                document.getElementsByClassName('insight')[4].classList.add('regular');
                document.getElementsByClassName('insight')[0].classList.remove('drop');
                document.getElementsByClassName('insight')[1].classList.remove('drop');
                document.getElementsByClassName('insight')[2].classList.remove('drop');
                document.getElementsByClassName('insight')[3].classList.remove('drop');
                document.getElementsByClassName('insight')[4].classList.remove('drop');
            }),2600
        );
	},
    
    
    filterEmails : function(people){
    	return this.getEmailsFromList(people.to).concat(this.getEmailsFromList(people.cc));
    },

    getEmailsFromList : function(list){
        var ret = [];
        
        for (var i in list) {
        	ret.push(list[i].email);
    	}	
   		
        return ret;
  }
})