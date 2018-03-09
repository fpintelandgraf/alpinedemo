<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <rules>
        <fullName>Assign to Data%2Ecom Record Type</fullName>
        <active>true</active>
        <booleanFilter>1 OR 2</booleanFilter>
        <criteriaItems>
            <field>Account.AccountSource</field>
            <operation>equals</operation>
            <value>Data.com</value>
        </criteriaItems>
        <criteriaItems>
            <field>Account.Account_Source_Custom__c</field>
            <operation>contains</operation>
            <value>Data.com</value>
        </criteriaItems>
        <description>Used to change the record type to Data.com for Accounts imported from Data.com</description>
        <triggerType>onCreateOnly</triggerType>
    </rules>
</Workflow>
