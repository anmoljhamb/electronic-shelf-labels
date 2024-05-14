import { getAllUsers } from "../v1/controllers/carts";
import { clients } from "../v1/sockets/client";

export const updateData = async () => {
  const users = await getAllUsers();
  clients.forEach((client) => {
    client.send(JSON.stringify(users));
  });
};
