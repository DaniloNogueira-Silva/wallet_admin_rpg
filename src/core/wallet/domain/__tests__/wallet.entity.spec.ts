import { Wallet, WalletId } from "../wallet.aggregate";

describe("Wallet Without Validator Unit Tests", () => {
  beforeEach(() => {
    Wallet.prototype.validate = jest
      .fn()
      .mockImplementation(Wallet.prototype.validate);
  });

  test("constructor of wallet", () => {
    const user_id = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";
    let wallet = new Wallet({
      user_id,
      balance: 1000,
      savings: 500,
      created_at: new Date(),
    });
    expect(wallet.wallet_id).toBeInstanceOf(WalletId);
    expect(wallet.user_id).toBe(user_id);
    expect(wallet.balance).toBe(1000);
    expect(wallet.savings).toBe(500);
    expect(wallet.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    wallet = new Wallet({
      user_id,
      balance: 1500,
      savings: 750,
      created_at,
    });
    expect(wallet.wallet_id).toBeInstanceOf(WalletId);
    expect(wallet.user_id).toBe(user_id);
    expect(wallet.balance).toBe(1500);
    expect(wallet.savings).toBe(750);
    expect(wallet.created_at).toBe(created_at);
  });

  describe("create command", () => {
    test("should create a wallet", () => {
      const wallet = Wallet.create({
        user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        balance: 2000,
        savings: 1000,
      });
      expect(wallet.wallet_id).toBeInstanceOf(WalletId);
      expect(wallet.user_id).toBe("a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11");
      expect(wallet.balance).toBe(2000);
      expect(wallet.savings).toBe(1000);
      expect(wallet.created_at).toBeInstanceOf(Date);
      expect(Wallet.prototype.validate).toHaveBeenCalledTimes(1);
      expect(wallet.notification.hasErrors()).toBe(false);
    });
  });

  describe("wallet_id field", () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new WalletId() }];

    test.each(arrange)("should be %j", (props) => {
      const wallet = new Wallet({
        ...props,
        user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        balance: 0,
        savings: 0,
        created_at: new Date(),
      });
      expect(wallet.wallet_id).toBeInstanceOf(WalletId);
    });
  });

  test("should change balance", () => {
    const wallet = new Wallet({
      user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      balance: 1000,
      savings: 500,
      created_at: new Date(),
    });
    wallet.changeBalance(1500);
    expect(wallet.balance).toBe(1500);
    expect(Wallet.prototype.validate).toHaveBeenCalledTimes(0);
    expect(wallet.notification.hasErrors()).toBe(false);
  });

  test("should change savings", () => {
    const wallet = new Wallet({
      user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      balance: 1000,
      savings: 500,
      created_at: new Date(),
    });
    wallet.changeSavings(750);
    expect(wallet.savings).toBe(750);
    expect(Wallet.prototype.validate).toHaveBeenCalledTimes(0);
    expect(wallet.notification.hasErrors()).toBe(false);
  });
});

describe("Wallet Validator", () => {
  describe("create command", () => {
    test("should create a valid wallet", () => {
      const wallet = Wallet.create({
        user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        balance: 2000,
        savings: 1000,
      });

      expect(wallet.notification.hasErrors()).toBe(false);
    });
  });

  describe("changeBalance method", () => {
    it("should change balance and be valid", () => {
      const wallet = Wallet.create({
        user_id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        balance: 1000,
        savings: 500,
      });
      wallet.changeBalance(1500);
      expect(wallet.notification.hasErrors()).toBe(false);
    });
  });
});
