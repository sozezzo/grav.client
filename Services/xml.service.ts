export class XmlService {

  exists(hash:string, password: string){
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

  test(password: string){
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
