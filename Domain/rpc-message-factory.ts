export enum RpcMessageType {
  EXISTS, 
  TEST,
};

interface RpcMessage { }

export class RpcMessageExists implements RpcMessage {
  public xml(hash:string, password: string) : string  {
    return `<methodCall>
              <methodName>grav.exists</methodName>
              <params>
                <param><value><struct>
                  <member>
                    <name>hashes</name>
                    <value>
                      <array>
                        <data>
                          <value>${hash}</value>
                        </data>
                      </array>
                    </value>
                  </member>
                  <member>
                    <name>password</name>
                    <value>
                      <string>${password}</string>
                    </value>
                  </member>
                </struct></value></param>
              </params>
            </methodCall>`;
  }
}

export class RpcMessageTest implements RpcMessage {
  public xml(password: string) : string  {
    return `<methodCall>
              <methodName>grav.test</methodName>
              <params>
                <param><value><struct>
                  <member>
                    <name>password</name>
                    <value>
                      <string>${password}</string>
                    </value>
                  </member>
                </struct></value></param>
              </params>
            </methodCall>`;
  }
}

export class RpcMessageFactory {
  static get(messageType:RpcMessageType) : RpcMessage {
    switch (messageType) {
      case RpcMessageType.TEST:
          return new RpcMessageTest();
          break;
      case RpcMessageType.EXISTS:
        return new RpcMessageExists();
        break;
      default:
        return new RpcMessageExists();
        break;
    }
  }
}