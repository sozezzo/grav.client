import { MethodResponse } from './method-response';
import { xml2js } from 'xml-js'

export class TestMethodResponse implements MethodResponse {
  
  public json: any;

  constructor(public xml: string){
    this.json = xml2js(xml);
  }
}