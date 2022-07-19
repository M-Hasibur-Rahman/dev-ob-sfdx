/**
 * Created by mhrahman on 07.07.2022.
 */
@IsTest
public with sharing class TEST_ContactTrigger {
    @IsTest
    private static void testRestrictContactByName() {
        Test.startTest();
        Contact contact = TEST_DataFactory.createTestContact('INVALIDNAME',false);
        Database.UpsertResult result = Database.upsert(contact,false);
        Test.stopTest();

        System.assert(!result.isSuccess());
        System.assert(result.getErrors().size()>0);
        //System.assertEquals('Cannot delete account with related opportunities.', result.getErrors()[0].getMessage());
    }
}