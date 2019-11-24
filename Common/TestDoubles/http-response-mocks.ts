export class ExistsHttpResponseMock {
  private xml: string;
  constructor(success: boolean, emailHash: string){
    this.xml = `
    <?xml version="1.0"?>
    <methodResponse>
        <params>
            <param>
                <value>
                    <struct>
                        <member>
                            <name>${emailHash}</name>
                            <value>
                                <int>${success ? 1 : 0}</int>
                            </value>
                        </member>
                    </struct>
                </value>
            </param>
        </params>
    </methodResponse>
  `;
  }
  public get value(): Promise<Response> {
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve(this.xml)
    } as Response);
  }
}
