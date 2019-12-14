import { Result } from "./result";
import { ExistsMethodResponse } from "../Domain/method-responses";

export interface GravatarInterface {
  exists(... emailAddresses: string[]) : Promise<Result<ExistsMethodResponse>>;
}