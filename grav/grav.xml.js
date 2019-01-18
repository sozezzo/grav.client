module.exports = function GravXML(password){
  return {
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

    /*
    grav_test: function (){},
    grav_test: function (){},
    grav_test: function (){},
    grav_test: function (){}
    */
   
  }
}