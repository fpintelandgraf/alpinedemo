public class LFOWithEinsteinController {  

    @AuraEnabled
    public static string getLeadStuff(String[] emails) {
        List<Lead> leads = getLeadsFromEmail(emails);

        String namey;
        
        if(leads != null && leads.size() > 0) {
            Lead theLead = leads.get(0);
            namey = getLeadString(theLead);
        }

        return namey;
    }

    @AuraEnabled
    public static string getOpptyStuff(String[] emails) {
        String retVal;
        
        if(emails != null) {
            List<Contact> contactsFromEmail = getContactsFromEmail(emails);
            
            if(contactsFromEmail != null && contactsFromEmail.size() > 0) {
                Map<String, String> accountStrings = getAccountsFromContacts(contactsFromEmail);
                
                if(accountStrings != null && accountStrings.size() > 0) {
                    Map<String, String> oppyStrings = getOppyFromAccounts(accountStrings);

                    if(oppyStrings != null && oppyStrings.size() > 0) {
                        Set<String> keys = oppyStrings.keySet();
                        String firstKey = keys.iterator().next();
                        retVal = oppyStrings.get(firstKey);
                    } 
                }
            }
        }
        
        return retVal;
    }
    
    @AuraEnabled
    public static string getAccountStuff(String[] emails) {
        String retVal;

        List<Contact> contacts = getContactsFromEmail(emails);

        if(contacts != null && contacts.size() > 0) {
            Map<String, String> accountsFromContacts = getAccountsFromContacts(contacts);               
            if(accountsFromContacts != null && accountsFromContacts.size() > 0) {
                String accountId = accountsFromContacts.keySet().iterator().next();
                
                if(accountId != null) {
                    retVal = getAccountString(accountId);
                }

            }
        }
        
        return retVal;
    }
    
    private static List<Lead> getLeadsFromEmail(String[] emails) {
        List<Lead> leads = [SELECT  Id,
                                    name, 
                                    title,
                                    company,
                                    city,
                                    escore__c,
                                    CustomL__c,
                                    Indicator_1_Positive__c, Top_Predictive_1__c, Top_Predictive_Result_1__c, Indicator_1_Strength__c,  
                                    Indicator_2_Positive__c, Top_Predictive_2__c, Top_Predictive_Result_2__c, Indicator_2_Strength__c,
                                    Indicator_3_Positive__c, Top_Predictive_3__c, Top_Predictive_Result_3__c, Indicator_3_Strength__c,
                                    Indicator_4_Positive__c, Top_Predictive_4__c, Top_Predictive_Result_4__c, Indicator_4_Strength__c,
                                    Indicator_5_Positive__c, Top_Predictive_5__c, Top_Predictive_Result_5__c, Indicator_5_Strength__c
                            FROM 
                                Lead 
                            WHERE
                                email IN :emails];

        return leads;        
    }
    
    private static String getLeadString(Lead theLead) {
        String retVal;
        
            retVal = theLead.name + '#*#' + 
                    theLead.title + '#*#' + 
                    theLead.company + '#*#' + 
                    theLead.city + '#*#' + 
                    theLead.escore__c + '#*#' + 
                    theLead.Indicator_1_Positive__c + '#*#' + 
                    theLead.Top_Predictive_1__c + '#*#' + 
                    theLead.Top_Predictive_Result_1__c + '#*#' + 
                    theLead.Indicator_2_Positive__c + '#*#' + 
                    theLead.Top_Predictive_2__c + '#*#' + 
                    theLead.Top_Predictive_Result_2__c + '#*#' + 
                    theLead.Indicator_3_Positive__c + '#*#' + 
                    theLead.Top_Predictive_3__c + '#*#' + 
                    theLead.Top_Predictive_Result_3__c + '#*#' + 
                    theLead.Indicator_4_Positive__c + '#*#' + 
                    theLead.Top_Predictive_4__c + '#*#' + 
                    theLead.Top_Predictive_Result_4__c + '#*#' + 
                    theLead.Indicator_5_Positive__c + '#*#' + 
                    theLead.Top_Predictive_5__c + '#*#' + 
                    theLead.Top_Predictive_Result_5__c + '#*#' + 
                    theLead.CustomL__c + '#*#' + 
                    theLead.Indicator_1_Strength__c + '#*#' + 
                    theLead.Indicator_2_Strength__c + '#*#' + 
                    theLead.Indicator_3_Strength__c + '#*#' + 
                    theLead.Indicator_4_Strength__c + '#*#' + 
                    theLead.Indicator_5_Strength__c;
        
        return retVal;
    }
    
    private static List<Contact> getContactsFromEmail(String[] emails) {
        List<Contact> retVal = [SELECT Id, AccountId, FirstName, LastName FROM Contact WHERE Email IN :emails];
        return retVal;
    }
    
    private static Map<String, String> getAccountsFromContacts(List<Contact> contacts) {
        Map<String, String> distinctAccounts = new Map<String, String>();

        for(Contact c : contacts) {
            String accountId = c.AccountId;
            if(distinctAccounts.containsKey(accountId) == false) {
                String accountString = getAccountString(accountId);
                distinctAccounts.put(accountId, accountString);
            }
        }
        
        return distinctAccounts;
    }
    
    private static String getAccountString(String accountId) {
        Account acctyay = [SELECT   name,
                                    Einstein_Account_Insights__c,
                                    Einstein_Article_1_Title__c, Einstein_Article_2_Title__c, Einstein_Article_3_Title__c,
                                    Einstein_Article_1_Source__c, Einstein_Article_2_Source__c, Einstein_Article_3_Source__c,
                                    Einstein_Article_1_Date__c, Einstein_Article_2_Date__c, Einstein_Article_3_Date__c,
                                    Einstein_Article_1_URL__c, Einstein_Article_2_URL__c, Einstein_Article_3_URL__c
                           FROM Account
                           WHERE Id = :accountid];
 
        Date articleDate1 = acctyay.Einstein_Article_1_Date__c;
        if(articleDate1 == null){
            articleDate1 = Date.today();
        }
        Date articleDate2 = acctyay.Einstein_Article_2_Date__c;
        if(articleDate2 == null){
            articleDate2 = Date.today();
        }
        Date articleDate3 = acctyay.Einstein_Article_3_Date__c;
        if(articleDate3 == null){
            articleDate3 = Date.today();
        }
        Date todayDate = Date.today();
        Integer daysbetween1 = articleDate1.daysBetween(todayDate);
        Integer daysbetween2 = articleDate2.daysBetween(todayDate);
        Integer daysbetween3 = articleDate3.daysBetween(todayDate);
                    
        String namey =  acctyay.name + '#*#' +
                        acctyay.Einstein_Account_Insights__c + '#*#' +
                        acctyay.Einstein_Article_1_Title__c + '#*#' +
                        daysbetween1 + '#*#' +
                        acctyay.Einstein_Article_1_Source__c + '#*#' +
                        acctyay.Einstein_Article_1_URL__c + '#*#' + 
                        acctyay.Einstein_Article_2_Title__c + '#*#' + 
                        daysbetween2 + '#*#' + 
                        acctyay.Einstein_Article_2_Source__c + '#*#' + 
                        acctyay.Einstein_Article_2_URL__c + '#*#' + 
                        acctyay.Einstein_Article_3_Title__c + '#*#' + 
                        daysbetween3 + '#*#' + 
                        acctyay.Einstein_Article_3_Source__c + '#*#' + 
                        acctyay.Einstein_Article_3_URL__c;

        return namey;
    }
    
    private static Map<String, String> getOppyFromAccounts(Map<String, String> accounts) {
        Map<String, String> distinctOpportunities = new Map<String, String>();
        
        for(String accountId : accounts.keySet()) {
            List<Opportunity> opps = [SELECT Id FROM Opportunity WHERE AccountId = :accountId];
            
            for(Opportunity o : opps) {
                String oppId = o.Id;
                
                if(distinctOpportunities.containsKey(oppId) == false) {
                    Opportunity opptyay = [SELECT   Account.name,
                                                    CloseDate,
                                                    Last_Activity_Text__c,
                                                    Last_Activity_Type__c,
                                                    Last_Activity_Subject__c,
                                                    Winning_Unlikely__c,
                                                    Prospect_Unresponsive__c, 
                                                    Competitor_Mentioned__c,
                                                    Name_of_Contact__c,
                                                    Competitor_they_Mentioned__c,
                                                    Deal_Slowing__c,
                                                    Slowing_Reason__c,
                                                    Deal_boosting__c,
                                                    Boosting_Reason__c,
                                                    Time_Consuming_Oppty__c,
                                                    No_Communication__c,
                                                    Re_engaged__c,
                                                    Task_Overdue__c, 
                                                    Email_Subject__c,
                                                    Email_Body__c,  
                                                    Contact_to_email__c,
                                                    Contact_to_email__r.name,
                                                    Contact_to_email__r.email
                                            FROM    Opportunity 
                                            WHERE   Id = :oppId];

                    String datetimestr =  opptyay.CloseDate.format();  
                    
                    String namey =  opptyay.Account.name + '#*#' + 
                                    datetimestr + '#*#' + 
                                    opptyay.Last_Activity_Subject__c + '#*#' + 
                                    opptyay.Last_Activity_Text__c + '#*#' + 
                                    opptyay.Last_Activity_Type__c + '#*#' + 
                                    opptyay.Winning_Unlikely__c + '#*#' + 
                                    opptyay.Prospect_Unresponsive__c + '#*#' + 
                                    opptyay.Competitor_Mentioned__c + '#*#' + 
                                    opptyay.Name_of_Contact__c + '#*#' + 
                                    opptyay.Competitor_they_Mentioned__c + '#*#' + 
                                    opptyay.Deal_Slowing__c + '#*#' + 
                                    opptyay.Slowing_Reason__c + '#*#' + 
                                    opptyay.Deal_boosting__c + '#*#' + 
                                    opptyay.Boosting_Reason__c + '#*#' + 
                                    opptyay.Time_Consuming_Oppty__c + '#*#' + 
                                    opptyay.No_Communication__c + '#*#' + 
                                    opptyay.Re_engaged__c + '#*#' + 
                                    opptyay.Task_Overdue__c + '#*#' + 
                                    opptyay.Email_Subject__c + '#*#' + 
                                    opptyay.Email_Body__c + '#*#' + 
                                    opptyay.Contact_to_email__c + '#*#' + 
                                    opptyay.Contact_to_email__r.name + '#*#' + 
                                    opptyay.Contact_to_email__r.email;

                    distinctOpportunities.put(oppId, namey);
                }
            }
        }
        
        return distinctOpportunities;
    }
}