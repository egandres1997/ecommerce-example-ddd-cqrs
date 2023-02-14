export class ProductWasNotFound extends Error {
  private constructor(message: string) {
    super(message);
  }

  static withIdOf(product: number): ProductWasNotFound {
    return new ProductWasNotFound(
      `Product with ID of ${product.toString()} was not found`,
    );
  }
}
