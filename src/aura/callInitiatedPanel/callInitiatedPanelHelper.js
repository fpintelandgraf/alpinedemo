/*
Copyright 2016 salesforce.com, inc. All rights reserved.

Use of this software is subject to the salesforce.com Developerforce Terms of Use and other applicable terms that salesforce.com may make available, as may be amended from time to time. You may not decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, modify, or create derivative works of this software, updates thereto, or any part thereof. You may not use the software to engage in any development activity that infringes the rights of a third party, including that which interferes with, damages, or accesses in an unauthorized manner the servers, networks, or other properties or services of salesforce.com or any third party.

WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL SALESFORCE.COM HAVE ANY LIABILITY FOR ANY DAMAGES, INCLUDING BUT NOT LIMITED TO, DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR DAMAGES BASED ON LOST PROFITS, DATA OR USE, IN CONNECTION WITH THE SOFTWARE, HOWEVER CAUSED AND, WHETHER IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, WHETHER OR NOT YOU HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

({
    // get call center settings, to get the information about the call provider
    // then use open CTI to screen pop to the record, and runApex() to make a call
    screenPopAndCall : function(cmp) {
        var isClickToDial = cmp.get('v.clickToDial');
        var wasSearched = cmp.get('v.wasSearched');
        
        if(wasSearched || isClickToDial) {
            console.log('wasSearched || isClickToDial : true');
            var myRecordId = cmp.get('v.recordId');
            console.log('myRecordId : ' + myRecordId);
            
            sforce.opencti.screenPop({
                type: sforce.opencti.SCREENPOP_TYPE.SOBJECT, 
                params: { recordId: myRecordId }, 
                callback: function() {
                    console.log('screen pop worked!');
                }
            });
        }
    },
    
    // on Accept, accept the call by bringing up the Connected Panel
    renderConnectedPanel : function(cmp) {
        var wasSearched = cmp.get('v.wasSearched');
        var isClickToDial = cmp.get('v.clickToDial');
        var recordId;
        
        if(wasSearched) {
            recordId = cmp.get('v.recordId');
            var account = cmp.get('v.account');
            cmp.getEvent('renderPanel').setParams({
                type : 'c:connectedPanel',
                attributes : {
                    showDialPad : false,
                    recordId : recordId,
                    callType : 'Inbound',
                    account : account,
                    recordName: cmp.get('v.recordName'),
                    presence : cmp.get('v.presence')
                }
            }).fire();
            
            sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.SOBJECT, params: { recordId: recordId }, callback: function() {
                console.log('screen pop worked!');
            }});
        } else if(isClickToDial) {
            recordId = cmp.get('v.recordId');
            var account = cmp.get('v.account');
            cmp.getEvent('renderPanel').setParams({
                type : 'c:connectedPanel',
                attributes : {
                    showDialPad : false,
                    recordId : recordId,
                    callType : 'Outbound',
                    account : account,
                    recordName: cmp.get('v.recordName'),
                    presence : cmp.get('v.presence')
                }
            }).fire();
            
            sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.SOBJECT, params: { recordId: recordId }, callback: function() {
                console.log('screen pop worked!');
            }});
        } else {
            cmp.getEvent('getSettings').setParams({
                callback: function(data){
                    recordId = data['/buttonAssignments/popRecordUrl'];
                    console.log('Pop button URL', recordId);
                    cmp.getEvent('renderPanel').setParams({
                        type : 'c:connectedPanel',
                        attributes : {
                            showDialPad : false,
                            recordId : recordId,
                            callType : 'Inbound',
                            presence : cmp.get('v.presence')
                        }
                    }).fire()
                    
                    sforce.opencti.screenPop({type: sforce.opencti.SCREENPOP_TYPE.SOBJECT, params: { recordId: recordId }, callback: function() {
                        console.log('screen pop worked!');
                    }});
                }
            }).fire()
        }
        
    },
    
    // coshea wrote this function
    getSettings : function (cmp, event) {
        var action = cmp.get("c.getMyConfig");
        action.setCallback(this, function(a) {
            var res = a.getReturnValue();
            cmp.set("v.myContact", res);
            console.log('Contact : ' + res.Id);
            
            cmp.set("v.contactName", res.ContactName__c);
            cmp.set("v.accountName", res.AccountName__c);
            cmp.set("v.recordName_2", res.ContactName__c);
            cmp.set("v.recordId_2", res.Contact__c);
            cmp.set("v.title_2", res.Title__c);
            cmp.set("v.phone_2", res.Phone__c);
        });
        //$A.enqueueAction(action);
    }
    
})