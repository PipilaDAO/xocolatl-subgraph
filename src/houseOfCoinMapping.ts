import { BigInt } from "@graphprotocol/graph-ts"
import {
  HouseOfCoin,
  CoinMinted,
  CoinPayback,
  Liquidation,
  MarginCall,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TrustedSignerChanged
} from "../generated/HouseOfCoin/HouseOfCoin"
import { User } from "../generated/schema"

export function handleCoinMinted(event: CoinMinted): void {
  let id = event.params.user.toHex();
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let user = User.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!user) {
    user = new User(id)
    // Entity fields can be set using simple assignments
    user.xocMinted = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  user.xocMinted = user.xocMinted.plus(event.params.amount);

  // Entities can be written to the store with `.save()`
  user.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.HOUSE_TYPE(...)
  // - contract._checkRemainingMintingPower(...)
  // - contract.assetsAccountant(...)
  // - contract.backedAsset(...)
  // - contract.checkRemainingMintingPower(...)
  // - contract.computeCostOfLiquidation(...)
  // - contract.computeUserHealthRatio(...)
  // - contract.getBackedTokenID(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.liqParam(...)
  // - contract.maxDelay(...)
  // - contract.owner(...)
  // - contract.redstoneGetLastPrice(...)
  // - contract.supportsInterface(...)
  // - contract.trustedSigner(...)
}

export function handleCoinPayback(event: CoinPayback): void {
  let id = event.params.user.toHex();
  let user = User.load(id)
  if (!user) {
    user = new User(id)
  }
  user.xocMinted = user.xocMinted.minus(event.params.amount);
  user.save()
}

export function handleLiquidation(event: Liquidation): void {
  let id = event.params.userLiquidated.toHex();
  let user = User.load(id)
  if (!user) {
    user = new User(id)
  }
  user.ethDeposited = user.ethDeposited.minus(event.params.collateralAmount); 
  event.params
  user.save();
}

export function handleMarginCall(event: MarginCall): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleTrustedSignerChanged(event: TrustedSignerChanged): void {}
