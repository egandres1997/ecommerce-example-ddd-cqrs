export class ProductAlreadyExists extends Error {
  private constructor(message: string) {
    super(message);
  }

  static withNameOf(name: string): ProductAlreadyExists {
    return new ProductAlreadyExists(
      `Product with Name of ${name} already exists`,
    );
  }
}
