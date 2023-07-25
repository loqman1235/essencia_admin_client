import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const getOrders = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`http://localhost:3001/api/v1/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateDeliveryStatus = async (e, orderId) => {
    const newDeliveryStatus = e.target.value;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, deliveryStatus: newDeliveryStatus }
          : order
      )
    );

    try {
      const token = Cookies.get("token");
      await axios.put(
        `http://localhost:3001/api/v1/orders/${orderId}`,
        { deliveryStatus: newDeliveryStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delivery status updated successfully");
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl tracking-tight font-medium text-zinc-700">
          Gérer les commandes
        </h2>
      </div>
      <div className={`overflow-x-auto ${orders.length > 0 ? "shadow" : ""}"`}>
        {orders?.length > 0 ? (
          <table className="table bg-white rounded-md">
            {/* head */}
            {/* 
            John Doe
            123 Main Street Los Angeles, California, 90001
            United States */}

            <thead>
              <tr>
                <th></th>
                <th>ID commande</th>
                <th>Produits</th>
                <th>Nom</th>
                <th>E-mail</th>
                <th>Adresse de livraison</th>
                <td>Méthode de paiement</td>
                <td>Total</td>
                <th>Date de création</th>
                <td>Statut paiement</td>
                <td>Statut livraison</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td></td>
                  <td>{order.orderID}</td>
                  <td>
                    {order.products
                      .map((product) => product.productName)
                      .join(", ")}
                  </td>
                  <td>{order.address.name}</td>
                  <td>{order.email}</td>
                  <td>
                    {order.address.street},{order.address.city},
                    {order.address.state}
                    {order.address.state ? "," : ""} {order.address.postalCode},
                    {order.address.country}
                  </td>
                  <td className="capitalize">{order.paymentMethod}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    {moment(order?.createdAt).format("DD MMM YYYY HH:mm A")}
                  </td>
                  <td>
                    {order.paymentStatus === "Payé" ? (
                      <div className="badge_success">{order.paymentStatus}</div>
                    ) : (
                      <div className="badge_warning">{order.paymentStatus}</div>
                    )}
                  </td>
                  <td>
                    {order.deliveryStatus === "Livré" ? (
                      <div className="badge_success">
                        {order.deliveryStatus}
                      </div>
                    ) : (
                      <div className="badge_warning">
                        {order.deliveryStatus}
                      </div>
                    )}
                  </td>
                  <td>
                    <td>
                      {/* Delivery Status */}
                      <select
                        value={order.deliveryStatus}
                        className="p-2 outline-none bg-gray-50 border border-gray-100 rounded-sm"
                        onChange={(e) => updateDeliveryStatus(e, order._id)}
                      >
                        <option value="En attente">En attente</option>
                        <option value="En cours de livraison">
                          En cours de livraison
                        </option>
                        <option value="Expédié">Expédié</option>
                        <option value="Livré">Livré</option>
                      </select>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">
            Aucune commande trouvée pour le moment
          </p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
