import ws from "ws";

export class Communication {
  static #sockets: Record<string, ws> = {};

  static hasProduct(productId: string) {
    return productId in Communication.#sockets;
  }

  static addSocket(productId: string, socket: ws) {
    Communication.#sockets[productId] = socket;
  }

  static getSocket(productId: string) {
    if (!Communication.hasProduct(productId))
      throw new Error(`Web Socket not found for ${productId}.`);
    return Communication.#sockets[productId];
  }

  static removeSocket(productId: string) {
    if (!Communication.hasProduct(productId))
      throw new Error(`Web Socket not found for ${productId}.`);
    delete Communication.#sockets[productId];
  }
}
