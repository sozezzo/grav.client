import { ImageRating } from "./image-rating";

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

export class SaveImageUrlMethodCall implements MethodCall {
  
  constructor(public imageUrl: string, public imageRating: ImageRating, public password: string){}

  public get xml(): string {
    return `<methodCall>
                <methodName>grav.saveUrl</methodName>
                <params>
                    <param>
                        <value>
                            <struct>
                                <member>
                                    <name>url</name>
                                    <value>
                                        <string>${this.imageUrl}</string>
                                    </value>
                                </member>
                                <member>
                                    <name>rating</name>
                                    <value>
                                        <int>${Number(this.imageRating)}</int>
                                    </value>
                                </member>
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

export class UserImagesMethodCall implements MethodCall {

  constructor(public password: string){}

  public get xml(): string {
    return `<methodCall>
                <methodName>grav.userimages</methodName>
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
            </methodCall>`
  }
}

export class UseUserImageMethodCall implements MethodCall {

  constructor(public imageName: string, public emailAddresses: Array<string>, public password: string){}

  public get xml(): string {
    return `<methodCall>
                <methodName>grav.useUserimage</methodName>
                <params>
                    <param>
                        <value>
                            <struct>
                                <member>
                                    <name>userimage</name>
                                    <value>
                                        <string>${this.imageName}</string>
                                    </value>
                                </member>
                                <member>
                                    <name>addresses</name>
                                    <value>
                                        <array>
                                            <data>
                                                <value>
                                                    <string>${this.emailAddresses[0]}</string>
                                                </value>
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
                            </struct>
                        </value>
                    </param>
                </params>
            </methodCall>`;
  }
}

export class RemoveImageMethodCall implements MethodCall {
  
  constructor(public emailAddresses: Array<string>, public password: string){}

  public get xml(): string {
    return `<methodCall>
                <methodName>grav.removeImage</methodName>
                <params>
                    <param>
                        <value>
                            <struct>
                                <member>
                                    <name>addresses</name>
                                    <value>
                                        <array>
                                            <data>
                                                <value>
                                                    <string>${this.emailAddresses[0]}</string>
                                                </value>
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
                            </struct>
                        </value>
                    </param>
                </params>
            </methodCall>`
  }
}

export class DeleteUserImageMethodCall implements MethodCall {

  constructor(public imageName: string, public password: string){}

  public get xml(): string {
    return `<methodCall>
                <methodName>grav.deleteUserimage</methodName>
                <params>
                    <param>
                        <value>
                            <struct>
                                <member>
                                    <name>userimage</name>
                                    <value>
                                        <string>${this.imageName}</string>
                                    </value>
                                </member>
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

  public get xml() : string {
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
