import { FaultError } from './fault-error';
import { xml2js } from 'xml-js';
import { ImageRating } from './image-rating';

export class MethodResponse {

  constructor(public json: any) { 
    let faultCode: number = 0;
    let faultString: string = "";
    const { fault } = this.json.methodResponse;
    if(fault){
      const members : Array<any> = fault.value.struct.member;
      members.map(member => {
        if(member.name._text == "faultCode"){
          faultCode = Number(this.parseFieldValue(member.value));
        } else if (member.name._text == "faultString"){
          faultString = this.parseFieldValue(member.value);
        }
      })
      throw new FaultError(faultCode, faultString);
    }
  }

  protected parseFieldValue(fieldValue: any): string {
    if(fieldValue.boolean) return fieldValue.boolean._text;
    if(fieldValue.int) return fieldValue.int._text;
    if(fieldValue.string) return fieldValue.string._text;
    return fieldValue._text;
  };
}

export class ExistsMethodResponse extends MethodResponse {

  public name: string;
  public value: number;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const { name, value } = this.json.methodResponse.params.param.value.struct.member;
      this.name = this.parseFieldValue(name);
      this.value = Number(this.parseFieldValue(value));
    }
  }
}

export class AddressesMethodResponse extends MethodResponse {

  public imageRating: ImageRating;
  public userEmail: string;
  public userImage: string;
  public userImageUrl: string;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const { member } = this.json.methodResponse.params.param.value.struct;
      this.userEmail = this.parseFieldValue(member.name);
      const members : Array<any> = member.value.struct.member;
      members.forEach(member => {
        switch (member.name._text) {
          case "rating":
            this.imageRating = Number(this.parseFieldValue(member.value));
            break;
          case "userimage":
            this.userImage = this.parseFieldValue(member.value);
            break;
          case "userimage_url":
            this.userImageUrl = this.parseFieldValue(member.value);
            break;
          default:
            break;
        }
      })
    }
  }
}

export class TestMethodResponse extends MethodResponse {

  public name: string;
  public value: number;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const { name, value } = this.json.methodResponse.params.param.value.struct.member;
      this.name = this.parseFieldValue(name);
      this.value = Number(this.parseFieldValue(value));
    }
  }
}
