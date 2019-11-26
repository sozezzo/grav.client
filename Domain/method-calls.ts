export interface MethodCall {
  xml: string;
}

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

export class AddressesMethodCall implements MethodCall {

  constructor(public password: string){}

  public get xml(): string {
    return `<methodCall>
            <methodName>grav.addresses</methodName>
            <params>
                <param>
                    <value>
                        <struct>
                            <member>
                                <name>password</name>
                                <value>
                                    <string>${this.password}</string>
                                </value>
                            </member>
                        </struct>
                    </value>
                </param>
            </params>
        </methodCall>`;
  }
}

export class TestMethodCall implements MethodCall {

  constructor(public password: string){}

  public get xml() : string  {
    return `<methodCall>
              <methodName>grav.test</methodName>
              <params>
                <param><value><struct>
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
