import { Record } from './record';

export class TransportProviderAvailability extends Record<TransportProviderAvailability> {
    day: number;
    available: boolean;
}
