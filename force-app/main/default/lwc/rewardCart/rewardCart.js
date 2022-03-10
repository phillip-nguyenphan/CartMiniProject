import { LightningElement, wire, track } from 'lwc';
import {
    subscribe,
    unsubscribe,
    MessageContext,
    APPLICATION_SCOPE
  } from "lightning/messageService";

import POVMC from "@salesforce/messageChannel/rewardMessageChannel__c";
export default class RewardCart extends LightningElement {

    @wire(MessageContext)

    messageContext;
    subscription = null;

    @track
    rewardItems = [];

    // adds reward item the the rewardItems array
    handleMessage(message) {
        this.rewardItems.push(message);
        console.log(this.rewardItems.length); // checks if array length is increased
    }

    handleUnsubscribe() {
        console.log("in handle unsubscribe");
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Subscribing to the message channel
    connectedCallback(){
        this.subscribeToMessageChannel();
    }

    // Unsubscribing to the message channel
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Subscribed to the LMS and handled message
    subscribeToMessageChannel() {

        console.log("subscribed");
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                POVMC,
                (message) => {
                    this.handleMessage(message),
                    { scope: APPLICATION_SCOPE }
                }
                );
        }
    }
}