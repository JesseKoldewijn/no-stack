export type Product = {
  id: string;
  name: string;
  price: number;
};

export class ProductsService {
  // In a real app this would be a DB call. We keep it simple for MVP.
  async findOne(id: string): Promise<Product> {
    // Simulate DB latency so Octane `use()` can suspend + stream.
    await new Promise((r) => setTimeout(r, 20));
    return {
      id,
      name: `Product ${id}`,
      price: 199 + Number(id) * 3,
    };
  }
}

