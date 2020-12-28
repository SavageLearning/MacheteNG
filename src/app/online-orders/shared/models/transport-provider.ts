import { Record } from './record';
import { TransportProviderAvailability } from './transport-provider-availability';

export class TransportProvider extends Record<TransportProvider> {
    key: string;
    text: string;
    defaultAttribute: boolean;
    sortorder?: number;
    active: boolean;
    availabilityRules: TransportProviderAvailability[];
}
