import { Wallet } from "../../../domain/wallet.aggregate";
import { WalletOutputMapper } from "./wallet-output";

describe("WalletOutputMapper Unit Tests", () => {
  it("should convert a wallet in output", () => {
    const entity = Wallet.create({
      user_id: "123456-789-abc",
      balance: 25,
      savings: 100,
    });
    const spyToJSON = jest.spyOn(entity, "toJSON");
    const output = WalletOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.wallet_id.id,
      user_id: "123456-789-abc",
      balance: 25,
      savings: 100,
      created_at: entity.created_at,
    });
  });
});
