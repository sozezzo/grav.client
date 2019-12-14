import { FaultError } from './fault-error';
import { xml2js } from 'xml-js';
import { UserImage } from './user-image';
import { UserAddress } from './user-address';

export class MethodResponse {

  constructor(public json: any) { 
    let faultCode: number = 0;
    let faultString: string = "";
    const { fault } = this.json ? this.json.methodResponse : { fault: false };
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

const xmlToJson = (xml: string): any => {
  return xml.length ? xml2js(xml, { compact: true }) : false;
}

export class ExistsMethodResponse extends MethodResponse {

  public exists: { [emailHash: string]: boolean } = {};

  constructor(public xml: string){
    super(xmlToJson(xml));
    this.parseMembers();
  }
  public parseMembers(){
    if(this.json && !this.json.methodResponse.fault){
      const { member } = this.json.methodResponse.params.param.value.struct;
      if(Array.isArray(member)){
        member.forEach(this.parseExistsResult.bind(this))
      } else {
        this.parseExistsResult(member);
      }
    }
  }
  private parseExistsResult(member: any){
    const hashValue: string = this.parseFieldValue(member.name);
    const hashExists: boolean = Number(this.parseFieldValue(member.value)) == 1;
    this.exists[hashValue] = hashExists;
  }
}

export class AddressesMethodResponse extends MethodResponse {

  public userAddresses: Array<UserAddress>;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const { member } = this.json.methodResponse.params.param.value.struct;
      if(Array.isArray(member)){
        this.userAddresses = member.map(this.parseUserAddress.bind(this));
      } else {
        this.userAddresses = [this.parseUserAddress(member)];
      }      
    }
  }

  private parseUserAddress(member: any): UserAddress {
    const address = new UserAddress();
    address.email = this.parseFieldValue(member.name);
    const members : Array<any> = member.value.struct.member;
    members.forEach(member => {
      switch (member.name._text) {
        case "rating":
          address.imageRating = Number(this.parseFieldValue(member.value));
          break;
        case "userimage":
          address.imageName = this.parseFieldValue(member.value);
          break;
        case "userimage_url":
          address.imageUrl = this.parseFieldValue(member.value);
          break;
        default:
          break;
      }
    })
    return address;
  }
}

export class SaveImageUrlMethodResponse extends MethodResponse {
  public imageName: string;
  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const { value } = this.json.methodResponse.params.param;
      this.imageName = this.parseFieldValue(value);
    }
  }
}

export class UserImagesMethodResponse extends MethodResponse {

  public userImages: Array<UserImage>;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const rawUserImages = this.json.methodResponse.params.param.value.struct.member;
      const self = this;
      this.userImages = rawUserImages.map(function(img: any) {
        const userImage = new UserImage();
        userImage.name = self.parseFieldValue(img.name);
        const members: Array<any> = img.value.array.data.value;
        members.forEach(function(member){
          const memberValue = member.string._text;
          if(isNaN(memberValue)){
            userImage.url = memberValue;
          } else {
            userImage.rating = Number(memberValue);
          }
        })
        return userImage;
      });
    }
  }
}

export class UseUserImageMethodResponse extends MethodResponse {
  public success: boolean;
  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    const { member } = this.json.methodResponse.params.param.value.struct;
    if(Array.isArray(member)){
      this.success = member.every(m => Number(this.parseFieldValue(m.value)) == 1);
    } else {
      this.success = Number(this.parseFieldValue(member.value)) == 1;
    }
  }
}

export class RemoveImageMethodResponse extends MethodResponse {
  public success: boolean;
  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    const { member } = this.json.methodResponse.params.param.value.struct;
    if(Array.isArray(member)){
      this.success = member.every(m => Number(this.parseFieldValue(m.value)) == 1);
    } else {
      this.success = Number(this.parseFieldValue(member.value)) == 1;
    }
  }
}

export class DeleteUserImageMethodResponse extends MethodResponse {
  public success: boolean;
  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    const { value } = this.json.methodResponse.params.param;
    this.success = Number(this.parseFieldValue(value)) == 1;
  }
}

export class TestMethodResponse extends MethodResponse {

  public name: string;
  public value: number;

  constructor(public xml: string){
    super(xmlToJson(xml));
    this.parseMembers();
  }

  public parseMembers() {
    if(this.json && !this.json.methodResponse.fault){
      const { name, value } = this.json.methodResponse.params.param.value.struct.member;
      this.name = this.parseFieldValue(name);
      this.value = Number(this.parseFieldValue(value));
    }
  }
}
