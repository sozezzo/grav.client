import { MethodResponse } from './method-response';
import { xml2js } from 'xml-js';
import { RATED } from './rated';

export class AddressesMethodResponse extends MethodResponse {

  public rating: RATED;
  public userImage: string;
  public userImageUrl: string;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const members : Array<any> = this.json.methodResponse.params.param.value.struct.member.value.struct.member;
      members.forEach(member => {
        switch (member.name._text) {
          case "rating":
            const numericRating = Number(this.parseFieldValue(member.value));
            this.rating = numericRating as RATED;
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
