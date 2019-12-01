export class ExistsHttpResponseStub {
  private xml: string;
  constructor(success: boolean, emailHash: string, errorMessage: string = ""){
    this.xml = success ? `
    <?xml version="1.0"?>
    <methodResponse>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>${emailHash}</name>
                            <value>
                                <int>1</int>
                            </value>
                        </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodResponse>
  ` : rpcFaultXml(errorMessage);
  }
  public get value(): Promise<Response> {
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(this.xml)
    } as Response);
  }
}

export class AddressesHttpResponseStub {
  private xml: string;
  constructor(success: boolean, email: string, errorMessage: string = ""){
    this.xml = success ? `
    <?xml version="1.0"?>
    <methodResponse>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>${email}</name>
                            <value>
                                <struct>
                                    <member>
                                        <name>rating</name>
                                        <value>
                                            <int>0</int>
                                        </value>
                                    </member>
                                    <member>
                                        <name>userimage</name>
                                        <value>
                                            <string>4ddf23534256fb555cfbf10acd7728b2</string>
                                        </value>
                                    </member>
                                    <member>
                                        <name>userimage_url</name>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/4ddf23534256fb555cfbf10acd7728b2.jpg</string>
                                        </value>
                                    </member>
                                </struct>
                            </value>
                        </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodResponse>
  ` : rpcFaultXml(errorMessage);
  }
  public get value(): Promise<Response> {
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(this.xml)
    } as Response);
  }
}

function rpcFaultXml(faultString: string){
  return `
  <?xml version="1.0"?>
  <methodResponse>
      <fault>
        <value>
        <struct>
          <member>
            <name>faultCode</name>
            <value><int>-9</int></value>
          </member>
          <member>
            <name>faultString</name>
            <value><string>${faultString}</string></value>
          </member>
        </struct>
      </value>
      </fault>
  </methodResponse>
  `;
}
