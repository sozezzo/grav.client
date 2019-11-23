import { FaultError } from './fault-error';

export class MethodResponse {

  constructor(public json: any) { 
    let faultCode: number = 0;
    let faultString: string = "";
    const { fault } = this.json.methodResponse;
    if(fault){
      const members : Array<any> = fault.value.struct.member;
      members.map(member => {
        if(member.name._text == "faultCode"){
          faultCode = this.parseFieldValue(member.value);
        } else if (member.name._text == "faultString"){
          faultString = this.parseFieldValue(member.value);
        }
      })
      throw new FaultError(faultCode, faultString);
    }
  }

  protected parseFieldValue<T>(fieldValue: any): T {
    if(fieldValue.boolean) return fieldValue.boolean._text as T;
    if(fieldValue.int) return fieldValue.int._text as T;
    if(fieldValue.string) return fieldValue.string._text as T;
    return fieldValue._text as T;
  };
}
