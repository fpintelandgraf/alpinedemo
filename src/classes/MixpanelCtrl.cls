/*................................................................*/
/*Written by: Hanul Park..........................................*/
/*Package: Mixpanel...............................................*/
/*Version: 1.0....................................................*/
/*Documentation/Manifest: https://salesforce.quip.com/vWgkAaprUKJX*/
/*................................................................*/

global class MixpanelCtrl {
    
    global MixpanelCtrl(EMC_Controller emc){}
    global MixpanelCtrl(ApexPages.StandardController ctrl){}
    
    @AuraEnabled@RemoteAction
    global static OrgData getOrgData(){
        Id profileId = UserInfo.getProfileId();
        QLabs__mdt org_metadata = [SELECT DeveloperName, Identifier__c FROM QLabs__mdt WHERE DeveloperName = 'Org_Identifier' LIMIT 1];
        Profile userProfile = [Select CreatedBy.Email From Profile Where Id = :profileId Limit 1];
        String org_id = UserInfo.getOrganizationId();
        
        return new OrgData(userProfile.CreatedBy.Email, org_id, org_metadata.Identifier__c);
    }
    
    @AuraEnabled@RemoteAction
    global static Boolean createEvent(String data){
        Boolean isSuccess;
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://api.mixpanel.com/track/?data=' + data);
        req.setMethod('POST');
        HttpResponse res = http.send(req);
        isSuccess = res.getBody() == '0' ? false : true;
        
        return isSuccess;
    }
    
    @AuraEnabled@RemoteAction
    global static Boolean updateProfile(String data){
        Boolean isSuccess;
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('http://api.mixpanel.com/engage/?data=' + data);
        req.setMethod('POST');
        HttpResponse res = http.send(req);
        
        isSuccess = res.getBody() == '0' ? false : true;
        
        return isSuccess;
    }
    
    global class OrgData {
        @AuraEnabled@RemoteAction
        global String distinct_id {get;set;}
        @AuraEnabled@RemoteAction
        global String org_id {get;set;}
        @AuraEnabled@RemoteAction
        global String org_type {get;set;}
        
        global OrgData(){}
        global OrgData(String distinct_id, String org_id, String org_type){
            this.distinct_id = distinct_id;
            this.org_id = org_id;
            this.org_type = org_type;
        }
    }
}