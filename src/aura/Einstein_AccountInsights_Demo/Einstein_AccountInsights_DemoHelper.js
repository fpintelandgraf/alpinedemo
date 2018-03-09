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
    }
})