import fetchMock = require("fetch-mock");
import { emailHash } from "./primitive-stubs";

const origin = "https://secure.gravatar.com";

export function mockHttpRequests(){  
  fetchMock.post(`${origin}/xmlrpc?user=${emailHash}`, 200)
           .post('https://dailyavatar.io/api/v1/avatars', 200)
           .post('https://dailyavatar.io/api/v1/avatars/base64', 200);
  
};

