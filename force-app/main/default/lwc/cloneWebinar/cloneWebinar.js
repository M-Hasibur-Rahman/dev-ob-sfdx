/**
 * Created by mhrahman on 13.07.2022.
 */

import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import cloneWebinar from '@salesforce/apex/QuestionnaireTableController.cloneWebinar';
import { NavigationMixin } from 'lightning/navigation';

export default class CloneWebinar extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    fields=['Name','Status__c','Type__c','Cost__c','Price_per_participant__c','Scoring__c','Description__c'];
    error;

    closeAction(){
      this.dispatchEvent(new CloseActionScreenEvent());
    }

    cloneOnClick(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        cloneWebinar({Names: fields.Name, status: fields.Status__c, types: fields.Type__c, cost: fields.Cost__c, priceparts: fields.Price_per_participant__c,
        scoring: fields.Scoring__c, description: fields.Description__c})
        .then((result)=>{
            console.log(result);
            this.navigateToRecordPage(result.Id);
        }).catch((error)=>{
            this.error=error;
        })
    }

    navigateToRecordPage(webinarQid) {
    //            console.log('Webinar created:',this.createdWebinarQ.Id);
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: webinarQid,
                        objectApiName: 'Webinar__c',
                        actionName: 'view'
                    }
                });
            }
}