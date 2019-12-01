export interface ResponseStub {
    value: Promise<Response>;
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

export class ExistsHttpResponseStub implements ResponseStub {
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

export class AddressesHttpResponseStub implements ResponseStub {
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

export class UserImagesHttpResponseStub implements ResponseStub {
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
                            <name>a0a78968780b5069869406cb34af326d</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/a0a78968780b5069869406cb34af326d.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>a68c2b2e469676717d9894c80ca16e82</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/a68c2b2e469676717d9894c80ca16e82.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>bdb24d1875ec87625e2da6f28605d800</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/bdb24d1875ec87625e2da6f28605d800.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>4ddf23534256fb555cfbf10acd7728b2</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/4ddf23534256fb555cfbf10acd7728b2.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>0fa6e24a27f544abb2536746b5b9d5f0</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/0fa6e24a27f544abb2536746b5b9d5f0.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>cd73b8e804398c2709453d36fba41ede</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/cd73b8e804398c2709453d36fba41ede.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>b823ea7d9a98e427c3cc21d38f7a17ed</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/b823ea7d9a98e427c3cc21d38f7a17ed.jpg</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                        <member>
                            <name>d83bae7ec0e25069af6f3a006ecbf289</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>0</string>
                                        </value>
                                        <value>
                                            <string>http://en.gravatar.com/userimage/150849239/d83bae7ec0e25069af6f3a006ecbf289.jpg</string>
                                        </value>
                                    </data>
                                </array>
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

export class SaveImageUrlHttpResponseStub implements ResponseStub {
    protected xml: string;
    constructor(success: boolean, errorMessage: string = ""){
        this.xml = success ? `
        <?xml version="1.0"?>
        <methodResponse>
        <params>
            <param>
                <value>
                    <string>b13ef59e996c16dcc127df002dd4578b</string>
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

export class SaveImageHttpResponseStub 
       extends SaveImageUrlHttpResponseStub 
       implements ResponseStub {
    constructor(success: boolean, errorMessage: string = ""){
        super(success, errorMessage);
    }
}

export class SaveEncodedImageHttpResponseStub 
       extends SaveImageUrlHttpResponseStub 
       implements ResponseStub {
    constructor(success: boolean, errorMessage: string = ""){
        super(success, errorMessage);
    }
}
