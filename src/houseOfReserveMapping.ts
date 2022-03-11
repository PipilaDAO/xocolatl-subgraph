import { BigInt } from "@graphprotocol/graph-ts"
import {
  HouseOfReserve,
  // CollateralRatioChanged,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TrustedSignerChanged,
  UserDeposit,
  UserWithdraw
} from "../generated/HouseOfReserve/HouseOfReserve"
import { User } from "../generated/schema"

// export function handleCollateralRatioChanged(event: CollateralRatioChanged): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTrustedSignerChanged(event: TrustedSignerChanged): void {}

export function handleUserDeposit(event: UserDeposit): void {
  let id = event.params.user.toHex();
  let user = User.load(id)
  if (!user) {
    user = new User(id)
    user.ethDeposited = BigInt.fromI32(0)
  }
  user.ethDeposited = user.ethDeposited.plus(event.params.amount);
  user.save()
}

export function handleUserWithdraw(event: UserWithdraw): void {
  let id = event.params.user.toHex();
  let user = User.load(id)
  if (!user) {
    user = new User(id)
  }
  user.ethDeposited = user.ethDeposited.minus(event.params.amount);
  user.save()
}
