import { MethodResponse } from './method-response';
import { xml2js } from 'xml-js';
import { ImageRating } from './image-rating';

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
