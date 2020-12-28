/* eslint-disable @typescript-eslint/naming-convention */
import { Record } from './record';

export class CostRule extends Record<CostRule> {
    minWorker: number;
    maxWorker: number;
    cost: number;
}

export class TransportRule extends Record<TransportRule> {
    key: string;
    lookupKey: string;
    transportType: TransportType;
    zoneLabel: string;
    zipcodes: string[];
    costRules: CostRule[];
}

export enum TransportType {
    transport_van,
    transport_bus,
    transport_pickup
}
