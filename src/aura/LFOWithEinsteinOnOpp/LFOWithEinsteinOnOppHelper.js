({
	loadCmp : function(){
        window.setTimeout(
            $A.getCallback(function() {
                document.getElementsByClassName('insight')[0].classList.remove('fade');
                document.getElementsByClassName('insight')[1].classList.remove('fade');
                document.getElementsByClassName('insight')[2].classList.remove('fade');
                document.getElementsByClassName('insight')[3].classList.remove('fade');
                document.getElementsByClassName('insight')[4].classList.remove('fade');
                document.getElementById('placeholder1').classList.add('show');
            }), 500
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
    
    enqueueInsightCall : function(cmp) {
        var recipients = this.getEmailAttributes(cmp);
        
        if(recipients && recipients.length > 0) {
        	this.enqueueOpportunitiesCall(cmp, recipients);
        }
    },
    
    enqueueOpportunitiesCall : function(cmp, recipients) {
        var action = cmp.get("c.getOpptyStuff");
        action.setParams({
            "emails": recipients
        });
        action.setCallback(this, function(response) {
            debugger;
            
            var data = response.getReturnValue();
            var all_data = data.split('#*#');
            cmp.set("v.account_name", all_data[0]);
            cmp.set("v.closedate", all_data[1]);
            if(all_data[2] != "null"){
                //if not null, set
                cmp.set("v.act_subject", all_data[2]);
            }
            if(all_data[3] != "null"){
                //if not null, set
                cmp.set("v.act_text", all_data[3]);
            }
            if(all_data[4] == "Call"){
                cmp.set("v.act_type", "https://www.dropbox.com/s/lpniuoi6dru2vez/phoneicon.png?raw=1");
            }
            else{
                cmp.set("v.act_type", "https://www.dropbox.com/s/vr2q3nfczjpt925/email.png?raw=1");
            }
            if(all_data[5] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight1").style.display = "block";
                cmp.set("v.class_cus1", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight1").style.display = "none";
                cmp.set("v.class_cus1", "invisible");
            }
            if(all_data[6] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight2").style.display = "block";
                cmp.set("v.class_cus2", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight2").style.display = "none";
                cmp.set("v.class_cus2", "invisible");
            }
            if(all_data[7] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight3").style.display = "block";
                cmp.set("v.class_cus3", "visible");
                if(all_data[8] != "null"){
                    //if not null, set
                    cmp.set("v.con_name", all_data[8]);
                }
                if(all_data[9] != "null"){
                    //if not null, set
                    cmp.set("v.comp_name", all_data[9]);
                }
            }
            else{
                //don't display it
                //document.getElementById("insight3").style.display = "none";
                cmp.set("v.class_cus3", "invisible");
            }
            if(all_data[10] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight4").style.display = "block";
                cmp.set("v.class_cus4", "visible");
                if(all_data[11] != "null"){
                    //if not null, set
                    cmp.set("v.slow_reason", all_data[11]);
                }
            }
            else{
                //don't display it
                //document.getElementById("insight4").style.display = "none";
                cmp.set("v.class_cus4", "invisible");
            }
            if(all_data[12] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight5").style.display = "block";
                cmp.set("v.class_cus5", "visible");
                if(all_data[13] != "null"){
                    //if not null, set
                    cmp.set("v.boost_reason", all_data[13]);
                }
            }
            else{
                //don't display it
                //document.getElementById("insight5").style.display = "none";
                cmp.set("v.class_cus5", "invisible");
            }
            if(all_data[14] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight6").style.display = "block";
                cmp.set("v.class_cus6", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight6").style.display = "none";
                cmp.set("v.class_cus6", "invisible");
            }
            if(all_data[15] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight7").style.display = "block";
                cmp.set("v.class_cus7", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight7").style.display = "none";
                cmp.set("v.class_cus7", "invisible");
            }
            if(all_data[16] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight8").style.display = "block";
                cmp.set("v.class_cus8", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight8").style.display = "none";
                cmp.set("v.class_cus8", "invisible");
            }
            if(all_data[17] == 'true'){
                //get element by ID display insight
                //document.getElementById("insight9").style.display = "block";
                cmp.set("v.class_cus9", "visible");
            }
            else{
                //don't display it
                //document.getElementById("insight9").style.display = "none";
                cmp.set("v.class_cus9", "invisible");
            }
            if(all_data[18] != 'null'){
                //set email subject if not null
                cmp.set("v.email_subject", all_data[18]);
            }
            else{
                //set it to default
                cmp.set("v.email_subject", "Introduction");
            }
            if(all_data[19] != 'null'){
                //set email subject if not null
                cmp.set("v.email_body", all_data[19]);
            }
            else{
                //set it to default
                cmp.set("v.email_body", "Hi Susan, <br/><br/>Any chance you can introduce me to Lauren Jacobs. She\'s a C-Level at Presido Tech that we need to be more engaged. <br/><br/>Thanks, <br/>Alex</p>");
            }
            if(all_data[20] != 'null'){
                //set email subject if not null
                cmp.set("v.email_cid", all_data[20]);
            }
            else{
                //set it to default
                cmp.set("v.email_cid", "0036A00000NWBPPIAQ");
            }
            if(all_data[21] != 'null'){
                //set email subject if not null
                cmp.set("v.email_cname", all_data[21]);
            }
            else{
                //set it to default
                cmp.set("v.email_cname", "Susan Chan");
            }
            if(all_data[22] != 'null'){
                //set email subject if not null
                cmp.set("v.email_cemail", all_data[22]);
            }
            else{
                //set it to default
                cmp.set("v.email_cemail", "Susan@chan.test");
            }
            
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
    
    setEmailAttributes: function(cmp, recordId, publisherId){
        var attributes = {};
        var subject = cmp.get("v.email_subject");
        var body = cmp.get("v.email_body");
        var cid = cmp.get("v.email_cid");
        var cname = cmp.get("v.email_cname");
        var cemail = cmp.get("v.email_cemail");
		
        //{ 
        //	label: "name", 
        //	email: "email@domain.com", 
        //	id: "entity id", 
        //	nameAndEmail: "name email", 
        //	entityLabel: "Entity Label", 
        //	icon: { 
        //			alt: "Contact", 
		//			backgroundColor:  "A094ED",
		//			url:"/img/icon/t4v35/standard/contact_120.png" 
        //  } 
        //
        //}  
        
        attributes.emailSubject = JSON.stringify(subject);
        // the text for the email body can have merge field and format like the example
        attributes.emailBody =JSON.stringify(body);
        
        attributes.toEmailAddresses = [{label: cname,
                                        email: cemail,
                                        id: cid,
                                        nameAndEmail: subject,
                                        entityLabel: "Entity Label",
                                        icon: {
                                            alt: "Contact",
                                            backgroundColor: "A094ED",
                                            url:"/img/icon/t4v35/standard/contact_120.png"
                                        }
                                       }];
		//attributes.bccEmailAddresses = [{email address}];
        //attributes.ccEmailAddresses = [{email address}];
                                        
        attributes._isDocked = true;
        attributes.recordId = recordId;
        attributes.entityType = recordId.substring(0,3);
        attributes._publisherId = publisherId;
        attributes._cookieIdentifier = "hideSfsWarningModal";
        
        return attributes;
    },
    
    getEmailAttributes : function(cmp) {
		var people = cmp.get('v.people');
        
        if(people) {
            var peopleEmails = this.filterEmails(people);
            return peopleEmails;
        }
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