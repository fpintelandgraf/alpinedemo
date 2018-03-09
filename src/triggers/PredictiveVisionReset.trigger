trigger PredictiveVisionReset on Lead (before update) {

    for(Id leadID : Trigger.oldMap.keySet()){
        Lead oldLead = Trigger.oldMap.get(leadID);
        Lead newLead = Trigger.newMap.get(leadID);
        
        if (oldLead.Shadow_Roof_Type__c != newLead.Shadow_Roof_Type__c ){
                newLead.CustomL__c = true;
                newLead.escore__c = '70';
                newLead.Indicator_1_Strength__c = '3';
                newLead.Top_Predictive_1__c = 'Roof type is';
                newLead.Top_Predictive_Result_1__c = 'Unknown';
                newLead.Indicator_1_Positive__c = False;
                newLead.Indicator_2_Strength__c = '2';
                newLead.Top_Predictive_2__c = 'Visited';
                newLead.Top_Predictive_Result_2__c = 'Quote Page';
                newLead.Indicator_2_Positive__c = True;
                newLead.Indicator_3_Strength__c = '1';
                newLead.Top_Predictive_3__c = 'Address is';
                newLead.Top_Predictive_Result_3__c = 'Valid';
                newLead.Indicator_3_Positive__c = True;
                newLead.Indicator_4_Strength__c = '1';
                newLead.Top_Predictive_4__c = 'Phone number is';
                newLead.Top_Predictive_Result_4__c = 'Valid';
                newLead.Indicator_4_Positive__c = True;
                newLead.Indicator_5_Strength__c = '1';
                newLead.Top_Predictive_5__c = 'Did not download';
                newLead.Top_Predictive_Result_5__c = 'The Advantage of Solar e-book';
                newLead.Indicator_5_Positive__c = False;
                newLead.Lead_Score_Value__c = 70;
        }
        
        if (oldLead.Roof_Type__c != newLead.Roof_Type__c){
            System.debug('Hurdle 1: Old: ' + oldLead.Roof_Type__c + ' New: ' + newLead.Roof_Type__c);
            
            if ((oldLead.Roof_Type__c == 'Flat' || oldLead.Roof_Type__c == 'Pitched') && (newLead.Roof_Type__c == '' || newLead.Roof_Type__c == 'Unknown' || newLead.Roof_Type__c == null) ){
                newLead.CustomL__c = true;
                newLead.escore__c = '70';
                newLead.Indicator_1_Strength__c = '3';
                newLead.Top_Predictive_1__c = 'Roof type is';
                newLead.Top_Predictive_Result_1__c = 'Unknown';
                newLead.Indicator_1_Positive__c = False;
                newLead.Indicator_2_Strength__c = '2';
                newLead.Top_Predictive_2__c = 'Visited';
                newLead.Top_Predictive_Result_2__c = 'Quote Page';
                newLead.Indicator_2_Positive__c = True;
                newLead.Indicator_3_Strength__c = '1';
                newLead.Top_Predictive_3__c = 'Address is';
                newLead.Top_Predictive_Result_3__c = 'Valid';
                newLead.Indicator_3_Positive__c = True;
                newLead.Indicator_4_Strength__c = '1';
                newLead.Top_Predictive_4__c = 'Phone number is';
                newLead.Top_Predictive_Result_4__c = 'Valid';
                newLead.Indicator_4_Positive__c = True;
                newLead.Indicator_5_Strength__c = '1';
                newLead.Top_Predictive_5__c = 'Did not download';
                newLead.Top_Predictive_Result_5__c = 'The Advantage of Solar e-book';
                newLead.Indicator_5_Positive__c = False;
                newLead.Lead_Score_Value__c = 70;
            }
        }
    }
        
}