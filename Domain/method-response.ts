export class MethodResponse {

  constructor(public json: any) { }

  protected parseFieldValue<T>(fieldValue: any): T {
    if(fieldValue.boolean) return fieldValue.boolean._text as T;
    if(fieldValue.int) return fieldValue.int._text as T;
    if(fieldValue.string) return fieldValue.string._text as T;
    return fieldValue._text as T;
  };
}
