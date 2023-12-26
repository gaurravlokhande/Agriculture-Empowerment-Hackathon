import { LightningElement, track } from 'lwc';
import insertFeedback from '@salesforce/apex/AgricultureEmpowerment.insertFeedback';
import feedbackimage from '@salesforce/resourceUrl/feedbackimage';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Feedback extends LightningElement {
    feedbackimage = feedbackimage;
    @track queryValue;
    handleQueryChange(event){
        this.queryValue = event.target.value;
    }
    handleSubmitClick(){
        console.log('enter')
        let isValid = true;
        this.template.querySelectorAll("lightning-textarea").forEach(item=>{
            let fieldValue = item.value;
            let fieldName = item.name;

            let fieldError = 'Please Enter the';
            if(!fieldValue){
                isValid = false;
                item.setCustomValidity(fieldError +" "+ fieldName);
            }else{
                item.setCustomValidity("");
            }
            item.reportValidity();
        });
        if(!isValid){
            return;
        }
        insertFeedback({queryValue:this.queryValue})
        .then(result=>{
            console.log('result',result);
            this.dispatchEvent(new ShowToastEvent({
                title: "Record Submitted Succesfully...",
                variant: "success"
            }));
            this.queryValue = '';
        })
        .catch(error=>{
            console.log('error',error);
        })


    }
}