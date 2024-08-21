import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create({
        id: order.id.id,
        client: order.client,
        products: order.products,
        status: order.status,
        createdAt: new Date(),
        updatedAt: new Date()
    })
  }
  findOrder(id: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
}
