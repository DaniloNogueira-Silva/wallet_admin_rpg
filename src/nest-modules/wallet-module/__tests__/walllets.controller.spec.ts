import { SortDirection } from "src/core/shared/domain/repository/search-params";
import { WalletsController } from "../walllet.controller";
import { CreateWalletOutput } from "src/core/wallet/application/use-cases/create-wallet/create-wallet.use-case";
import { CreateWalletDto } from "../dto/create-walllet.dto";
import {
  WalletCollectionPresenter,
  WalletPresenter,
} from "../walllet.presenter";
import { UpdateWalletOutput } from "src/core/wallet/application/use-cases/update-wallet/update-wallet.use-case";
import { UpdateWalletInput } from "src/core/wallet/application/use-cases/update-wallet/update-wallet.input";
import { GetWalletOutput } from "src/core/wallet/application/use-cases/get-wallet/get-wallet.use-case";
import { ListWalletsOutput } from "src/core/wallet/application/use-cases/list-wallets/list-wallets.use-case";

describe("WalletsController Unit Tests", () => {
  let controller: WalletsController;

  beforeEach(async () => {
    controller = new WalletsController();
  });

  it("should creates a wallet", async () => {
    //Arrange
    const output: CreateWalletOutput = {
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      balance: 123,
      savings: 10,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller["createUseCase"] = mockCreateUseCase;
    const input: CreateWalletDto = {
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      balance: 123,
      savings: 10,
    };

    //Act
    const presenter = await controller.create(input);

    //Assert
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(presenter).toBeInstanceOf(WalletPresenter);
    expect(presenter).toStrictEqual(new WalletPresenter(output));
  });

  it("should updates a wallet", async () => {
    const id = "9366b7dc-2d71-4799-b91c-c64adb205104";
    const output: UpdateWalletOutput = {
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      balance: 123,
      savings: 10,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller["updateUseCase"] = mockUpdateUseCase;
    const input: Omit<UpdateWalletInput, "id"> = {
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      balance: 123,
      savings: 10,
    };
    const presenter = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(presenter).toBeInstanceOf(WalletPresenter);
    expect(presenter).toStrictEqual(new WalletPresenter(output));
  });

  it("should deletes a wallet", async () => {
    const expectedOutput = undefined;
    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    //@ts-expect-error defined part of methods
    controller["deleteUseCase"] = mockDeleteUseCase;
    const id = "9366b7dc-2d71-4799-b91c-c64adb205104";
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it("should gets a wallet", async () => {
    const id = "9366b7dc-2d71-4799-b91c-c64adb205104";
    const output: GetWalletOutput = {
      id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      balance: 123,
      savings: 10,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller["getUseCase"] = mockGetUseCase;
    const presenter = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(presenter).toBeInstanceOf(WalletPresenter);
    expect(presenter).toStrictEqual(new WalletPresenter(output));
  });

  it("should list wallets", async () => {
    const output: ListWalletsOutput = {
      items: [
        {
          id: "9366b7dc-2d71-4799-b91c-c64adb205104",
          user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
          balance: 123,
          savings: 10,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    //@ts-expect-error defined part of methods
    controller["listUseCase"] = mockListUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: "balance",
      sort_dir: "desc" as SortDirection,
    };
    const presenter = await controller.search(searchParams);
    expect(presenter).toBeInstanceOf(WalletCollectionPresenter);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new WalletCollectionPresenter(output));
  });
});
