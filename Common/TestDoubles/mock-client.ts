import { GravatarInterface } from "../gravatar.interface";

export class MockGravatarClient implements GravatarInterface {
  
  exists(...emailAddresses: string[]): Promise<import("../result").Result<import("../../Domain/method-responses").ExistsMethodResponse>> {
    throw new Error("Method not implemented.");
  }

}