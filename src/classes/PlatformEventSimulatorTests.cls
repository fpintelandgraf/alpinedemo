@isTest
public class PlatformEventSimulatorTests {
 
	static testMethod void validateIoTExplorerSimulatorControllerCreateEvent() {
		Sample_Event_Data_Store__c item = new Sample_Event_Data_Store__c();
   
        PlatformEventSimulatorController.createEvent(item);
    }
    
  static testMethod void validateIoTExplorerSimulatorControllerPublishEvent() {
    	Sample_Event_Data_Store__c item = new Sample_Event_Data_Store__c();
        	
      
		//IoTExplorerSimulatorController.publishEvent(item);
    }
    
    static testMethod void validateIoTExplorerSimulatorControllerPublishAndPersistEvent() {
    	Sample_Event_Data_Store__c item = new Sample_Event_Data_Store__c();
       SampleEvent__e  eventItem = new SampleEvent__e();
        
        
		PlatformEventSimulatorController.publishAndPersistEvent(eventItem, item);
    }
    
    static testMethod void validateIoTExplorerSimulatorControllerGetEventFields() {
			PlatformEventSimulatorController.getEventFields('SampleEvent__e');
    }
    
    static testMethod void validateIoTExplorerSimulatorControllerGetLookupFieldNames() {
         
          Account acct = new Account();
           acct.Name = 'Sample Name';
           	insert acct;
       
         PlatformEventSimulatorController.getLookupFieldName('Case', acct.id);
    }
    
    static testMethod void validateIOTExplorerChartControllerGetSessionId() {
        PlatformEventsChartController.getSessionId();
    }
    
       static testMethod void validateIOTExplorerChartControllerGetEventFields() {
           PlatformEventsChartController.getEventFields('SampleEvent__e');
    } 
    
       static testMethod void validateIOTExplorerChartControllerGetEventData() {
       		Account acct = new Account();
           acct.Name = 'Sample Name';
           	insert acct;
           
        
           String fieldName = 'id';
           
         
         PlatformEventsChartController.getEventData(fieldName, 'Case', acct.Id);
    }
    
   
    

    
}