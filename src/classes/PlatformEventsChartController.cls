public class PlatformEventsChartController {

    @AuraEnabled
	public static String getSessionId() {
 	 return UserInfo.getSessionId();
	}

     @AuraEnabled
    public static List<FieldDefinition> getEventFields(String eventName) {
      
          System.debug('Event name ' + eventName);

        eventName = eventName.left(eventName.length()-3);
        
             
         List<FieldDefinition> fieldList = [Select Label, DeveloperName, DataType, FieldDefinition.Publisher.isSalesforce From FieldDefinition where EntityDefinition.DeveloperName=: eventName ];
    
        System.debug(fieldList);
        
        List<FieldDefinition> fieldNames = new List<FieldDefinition>();
        for(FieldDefinition item: fieldList) {
            FieldDefinition name = item;
            Boolean isSalesforce =  item.Publisher.IsSalesforce;
            
			System.debug(item.DataType);

            System.debug('Field Type ' + item.DataType);
            
            if(!isSalesforce && !item.DataType.contains('Lookup') &&  (item.DataType.contains('Number') || item.DataType.contains('Percent')  || item.DataType.contains('Currency')   ) ) {
                fieldNames.add(name);
            }
        }
        
        return fieldNames;
    }
    
     @AuraEnabled
    public static List<Object> getEventData(String fieldName, String objectName,  String recordId) {
     	
        System.debug('Field Name' + fieldName);
         
        //this was written just so we could write a test class avoiding a custom field 
       String lookupFieldName = PlatformEventSimulatorController.getLookupFieldName(objectName, recordId);
        
         System.debug('Lookup Name ' + lookupFieldName);
       
         List<sObject> sobjList = Database.query('Select CreatedDate, ' + fieldName + ' from ' + objectName + ' where ' + lookupFieldName + '= \'' + recordId + '\' order by CreatedDate ASC limit 100');
        return sobjList;
    }
}