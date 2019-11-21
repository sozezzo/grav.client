"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RpcMessageType;
(function (RpcMessageType) {
    RpcMessageType[RpcMessageType["EXISTS"] = 0] = "EXISTS";
    RpcMessageType[RpcMessageType["TEST"] = 1] = "TEST";
})(RpcMessageType = exports.RpcMessageType || (exports.RpcMessageType = {}));
;
class RpcMessageExists {
    xml(hash, password) {
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
exports.RpcMessageExists = RpcMessageExists;
class RpcMessageTest {
    xml(password) {
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
exports.RpcMessageTest = RpcMessageTest;
class RpcMessageFactory {
    static get(messageType) {
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
exports.RpcMessageFactory = RpcMessageFactory;
