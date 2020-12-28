/* eslint-disable @typescript-eslint/naming-convention */
import { Record } from './record';
export class Config extends Record<Config> {

    key: string;
    value: string;
    description: string;
    category: string;
    publicConfig: boolean;
}

export enum CCategory {
    DAILYLIST = 'DailyList',
    EMAIL = 'Emails',
    GENERAL = 'General',
    ONLINEORDERS = 'OnlineOrders',
    PAYPAL = 'PayPal'
}
