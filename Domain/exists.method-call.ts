import { MethodCall } from './method-call';

export class ExistsMethodCall implements MethodCall {
  
  constructor(public hash:string, public password: string){}

  public get xml() : string  {
    return `<methodCall>
              <methodName>grav.exists</methodName>
              <params>
                <param><value><struct>
                  <member>
                    <name>hashes</name>
                    <value>
                      <array>
                        <data>
                          <value>${this.hash}</value>
                        </data>
                      </array>
                    </value>
                  </member>
                  <member>
                    <name>password</name>
                    <value>
                      <string>${this.password}</string>
                    </value>
                  </member>
                </struct></value></param>
              </params>
            </methodCall>`;
  }
}
