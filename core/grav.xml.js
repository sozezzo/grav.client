module.exports = function GravXML(email, password){
  return {  

    grav_exists: function(hash){

      return `<methodCall>
                <methodName>grav.test</methodName>
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

    },

    grav_test: function (){
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
    },

    grav_userimages: function (){
      return `<methodCall>
              <methodName>grav.userimages</methodName>
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
    },

    grav_saveUrl: function (imageUrl){
      return `<methodCall>
                <methodName>grav.saveUrl</methodName>
                <params>
                  <param><value><struct>
                    <member>
                      <name>url</name>
                      <value>
                        <string>${imageUrl}</string>
                      </value>
                    </member>
                    <member>
                      <name>rating</name>
                      <value>
                        <int>0</int>
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
    },

    grav_useUserimage: function (imageName){
      return `<methodCall>
                <methodName>grav.useUserimage</methodName>
                <params>
                  <param><value><struct>
                    <member>
                      <name>userimage</name>
                      <value>
                        <string>${imageName}</string>
                      </value>
                    </member>
                    <member>
                      <name>addresses</name>
                      <value>
                        <array>
                        <data>
                          <value><string>${email}</string></value>
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
}