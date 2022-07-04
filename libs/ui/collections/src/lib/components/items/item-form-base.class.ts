export abstract class ItemFormBase<Data> {
  abstract getValue(): Data;

  abstract setValue(value: Data): void;

  abstract reset(): void;

  abstract isValid(): boolean;
}
