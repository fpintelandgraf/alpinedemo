@isTest
public class PlatformEventsTestCtrl {
    static testMethod void runTests(){
        PlatformEventsNotificationCtrl.getSessionId();
        PlatformEventsCtrl.fakeTest();
    }
}