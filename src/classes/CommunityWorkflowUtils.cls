global class CommunityWorkflowUtils {
    
    @InvocableMethod (label = 'Get Commuity User Details' description = 'Returns Community User, Contact & Account IDs for the currently logged-in user.')
    global static List<FetchCommunityUserDetailsResult> FetchCommUserDetails() {        
        List<FetchCommunityUserDetailsResult> resultList = new List<FetchCommunityUserDetailsResult>();
        resultList.add(fetchCurrentUser());      
        System.debug('### resultList - ' + resultList);
        return resultList;
    }
    
    public static FetchCommunityUserDetailsResult fetchCurrentUser() {
        FetchCommunityUserDetailsResult result = new FetchCommunityUserDetailsResult();
        User commUser = [select Id, ContactId, AccountId from User where Id = :UserInfo.getUserId()];
        System.debug('### fetchCurrentUser ###');
        System.debug('### UserId - ' + commUser.Id);
        System.debug('### ContactId - ' + commUser.ContactId);
        System.debug('### AccountId - ' + commUser.AccountId);
        result.UserId = commUser.Id;
        result.ContactId = commUser.ContactId;
        result.AccountId = commUser.AccountId;
        return result;
    }
    
    global class FetchCommunityUserDetailsResult {
        @InvocableVariable
        global Id UserId;
        
        @InvocableVariable
        global Id ContactId;
        
        @InvocableVariable
        global Id AccountId;        
    }
}