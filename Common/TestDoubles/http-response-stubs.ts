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
