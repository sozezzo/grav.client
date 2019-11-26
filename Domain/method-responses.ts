import { FaultError } from './fault-error';
import { xml2js } from 'xml-js';
import { UserImage } from './user-image';
import { UserAddress } from './user-address';

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

  private parseUserAddress(member: any): UserAddress{
    const address = new UserAddress();
    address.userEmail = this.parseFieldValue(member.name);
    const members : Array<any> = member.value.struct.member;
    members.forEach(member => {
      switch (member.name._text) {
        case "rating":
          address.imageRating = Number(this.parseFieldValue(member.value));
          break;
        case "userimage":
          address.userImage = this.parseFieldValue(member.value);
          break;
        case "userimage_url":
          address.userImageUrl = this.parseFieldValue(member.value);
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
