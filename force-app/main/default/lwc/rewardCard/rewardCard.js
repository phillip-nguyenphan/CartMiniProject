import { LightningElement, api, wire } from 'lwc';

import {MessageContext, APPLICATION_SCOPE, publish} from 'lightning/messageService';
import POVMC from "@salesforce/messageChannel/rewardMessageChannel__c"

export default class RewardCard extends LightningElement {
    @api itemImgUrl;
    @api itemTitle;

    @api count = 0;

    quantity = 0;

    // Wired message Context
    @wire(MessageContext)
    context;


    // Adds 1 quantity
    handle_add(event){
        if (this.count >= 0) {
            this.count += 1;
        }       
    }


    // Removes 1 quantity
    handle_sub(event){
        if (this.count >= 1) {
            this.count -= 1;
        } 
    }

    // Reset quantity to 0 once submitted
    handle_submit(){
        this.quantity = this.count;
        this.count = 0;

        let message = {
            amount: this.quantity,
            item_name: this.itemTitle
    
        };
        publish(this.context, POVMC, message);
    }
}