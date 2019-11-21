import { MethodResponse } from './method-response';
import { xml2js } from 'xml-js'

export class TestMethodResponse extends MethodResponse {

  public name: string;
  public value: number;

  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
    if(!this.json.methodResponse.fault){
      const { name, value } = this.json.methodResponse.params.param.value.struct.member;
      this.name = this.parseFieldValue(name);
      this.value = this.parseFieldValue(value);
    }
  }
}