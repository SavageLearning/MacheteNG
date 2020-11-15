import { SelectItem } from 'primeng/api';

export class MySelectItem implements SelectItem {
  constructor(public label: string, public value: string) {}
}

export class YesNoSelectItem implements SelectItem {
  constructor(public label: string, public value: boolean) {}
}
