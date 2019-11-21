import { MethodResponse } from './method-response';
import { xml2js } from 'xml-js'

export class TestMethodResponse extends MethodResponse {
  constructor(public xml: string){
    super(xml2js(xml, { compact: true }));
  }
}