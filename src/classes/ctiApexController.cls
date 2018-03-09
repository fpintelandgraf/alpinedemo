public with sharing class ctiApexController {
	public ctiApexController() {

	}

	@auraEnabled
	public Static List<Contact> getTheContacts(String searchTerm) {
		String srch = '%' + searchTerm + '%';
		return [SELECT Email,HomePhone,Id,MobilePhone,Name,Phone FROM Contact WHERE Name LIKE: srch];
	}

	@auraEnabled
	public Static String createMyTask(String myAccountId, String myContactId, String myDescription) {
		//System.debug('coshea : ' + myDuration);
		//Integer myInt = Integer.valueOf(myDuration);

		Task tsk = new Task();
		tsk.WhoId = myContactId;
		tsk.CallDisposition = 'Internal';
		tsk.CallObject = 'DemoCall';
		tsk.Subject = 'Call Log';
		tsk.Priority = 'Normal';
		tsk.Description = myDescription;
		//tsk.CallDurationInSeconds = myInt;
		tsk.Type = 'Call';
		tsk.CallType = 'Inbound';
		tsk.WhatId = myAccountId;
		insert tsk;

		return tsk.Id;
	}

	@auraEnabled
	public Static openCTIconfig__c getMyConfig() {
		return [SELECT AccountName__c,Account__c,ContactName__c,Contact__c,Id,isActive__c,Phone__c,Title__c FROM openCTIconfig__c WHERE isActive__c=true LIMIT 1];
	}
}