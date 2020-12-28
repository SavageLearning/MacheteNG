/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Created by jcii on 5/23/17.
 */
export class ExportColumn {
  name: string;
  is_nullable: boolean;
  system_type_name: string;
  include: boolean;

  constructor(options: {
    name?: string,
    is_nullable?: boolean,
    system_type_name?: string,
    include?: boolean

  } = {}) {
    this.name = 'LALA'; // options.name;
    this.is_nullable = options.is_nullable;
    this.system_type_name = options.system_type_name;
    this.include = true; // options.include || true;
  }
}
