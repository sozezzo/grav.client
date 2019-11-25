import { MethodCall } from './method-call';

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
