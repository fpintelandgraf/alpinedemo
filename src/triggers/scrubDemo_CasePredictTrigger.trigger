trigger scrubDemo_CasePredictTrigger on Case (after insert) {
    scrubDemo_SvcCloudPredictionHelper.caseSubjectSentiment(trigger.new[0].id);	
    //scrubDemo_SvcCloudPredictionHelper.caseClassifierIntent(trigger.new[0].id);
}