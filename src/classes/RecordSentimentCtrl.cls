public class RecordSentimentCtrl {
    
      @AuraEnabled
    public static String getRecordName(Id recordId){
         Schema.SObjectType objectName = recordId.getSObjectType(); 
     
        return   objectName.getDescribe().getLabel();
    }
    
    @AuraEnabled
    public static List<Einstein_Probability> getRecordAnalysis(Id recordId, String modelId, String fieldName){
        
        System.debug('Getting Sentiment...' + recordId  + ' ' + modelId + ' ' + fieldName);
      /* 
        
        scrubDemo_Interaction_Analysis__c analysis = [SELECT Id, Prediction_Conf_1__c, Prediction_Conf_2__c, Prediction_Conf_3__c, 
                                                      Prediction_Result_1__c, Prediction_Result_2__c, Prediction_Result_3__c
                                                      FROM scrubDemo_Interaction_Analysis__c
                                                      WHERE Analyzed_Object_ID__c  = :recordId
                                                      ORDER BY CreatedDate DESC
                                                      LIMIT 1];
        */
       // if(analysis == null) {
           
             Schema.SObjectType objectName = recordId.getSObjectType(); 
          System.debug('Got Record ');
          System.debug(objectName);
        System.debug('SELECT id, ' + fieldName + ' FROM ' + objectName + ' where id =: ' + recordId + ' order by id limit 1');
             SObject recordItem = Database.query('SELECT id, ' + fieldName + ' FROM ' + objectName + ' where id = \'' + recordId + '\' order by id limit 1');
          
        System.debug(recordItem);
        
        String text = (String)recordItem.get(fieldName);
            
          System.debug(text);
        
            List<einsteinUtilities.Prediction>  predictionList ;
        
        if(modelId == 'CommunitySentiment') {
            predictionList  = EinsteinLanguage.Sentiment(text);
        } else {
       		predictionList = EinsteinLanguage.Intent(text, modelId);
        }
        
        	List<Einstein_Probability> results = new List<Einstein_Probability>();
        for(einsteinUtilities.Prediction item: predictionList){
            if(item.probability > 0.01){
                Einstein_Probability retVal = new Einstein_Probability();
                retVal.label = item.label;
                retVal.probability = item.probability;
                results.add(retVal);
            }
        }
         
        //analysis = new scrubDemo_Interaction_Analysis__c();
            
           //analysis
     //   }
        System.debug(results);
        return results;
    }

}