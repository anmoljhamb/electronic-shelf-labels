import ws from "ws";

export class Communication {
  #sockets: Record<string, ws>;

  constructor() {
    this.#sockets = {};
  }

  hasProduct(productId: string) {
    return productId in this.#sockets;
  }

  addSocket(productId: string, socket: ws) {
    this.#sockets[productId] = socket;
  }

  getSocket(productId: string) {
    if (!this.hasProduct(productId))
      throw new Error(`Web Socket not found for ${productId}.`);
    return this.#sockets[productId];
  }

  removeSocket(productId: string) {
    if (!this.hasProduct(productId))
      throw new Error(`Web Socket not found for ${productId}.`);
    delete this.#sockets[productId];
  }
}
