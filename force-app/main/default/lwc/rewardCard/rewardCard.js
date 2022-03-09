import { LightningElement, api } from 'lwc';

export default class RewardCard extends LightningElement {
    @api itemImgUrl;
    @api itemTitle;
}