import { UseCase } from './use-case.interface';
import { GravatarClient } from '../Presentation';
import { UserAddress } from '../Domain/user-address';

export class GetPrimaryImageUseCase implements UseCase<string> {

  public client: GravatarClient;
  
  execute(): Promise<string> {
    return this.client.addresses()
    .then(result => result.Value.userAddresses)
    .then(addresses => {
      return addresses.find(address => {
        address.email == this.client.email
      })
    })
    .then(address => (<UserAddress>address).imageName)
  }
}