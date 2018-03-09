@isTest
public class CommunityWorkflowUtilsTest {
    
    public static testmethod void test() {       
        
        Profile profileId = [SELECT Id FROM Profile WHERE Name like 'Standard User' LIMIT 1];
        
        User u = new User(LastName = 'LIVESTONE',
                          FirstName='JAYSON',
                          Alias = 'jliv',
                          Email = 'jason.liveston@asdf.com',
                          Username = 'bhau.liveston@asdf.com',
                          ProfileId = profileId.id,
                          TimeZoneSidKey = 'GMT',
                          LanguageLocaleKey = 'en_US',
                          EmailEncodingKey = 'UTF-8',
                          LocaleSidKey = 'en_US');
        insert u; 
        
        System.runAs(u) {
            System.debug('### Current User - ' + UserInfo.getUserName());
            System.debug('### Current Profile - ' + UserInfo.getProfileId());  
            CommunityWorkflowUtils.FetchCommUserDetails();
        }
    }
}