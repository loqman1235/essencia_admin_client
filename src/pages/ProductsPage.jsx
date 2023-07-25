import { Link, useNavigate } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://essencia-backend.onrender.com/api/v1/products",
        { withCredentials: true }
      );
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      const token = Cookies.get("token");
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts); // Update the state immediately
      const response = await axios.delete(
        `https://essencia-backend.onrender.com/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/products");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl tracking-tight font-medium text-zinc-700">
          Gérer les produit
        </h2>
        <Link
          to="/products/create"
          className="btn btn-sm btn-success text-white"
        >
          Créer
        </Link>
      </div>
      <div
        className={`overflow-x-auto ${products.length > 0 ? "shadow" : ""}"`}
      >
        {products.length > 0 ? (
          <table className="table bg-white rounded-md">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Volume</th>
                <th>Prix</th>
                <th>Marque</th>
                <th>Date de création</th>
                <td>Date de mise à jour</td>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th></th>
                  <th>
                    <div className="avatar">
                      <div className="w-10 rounded-sm">
                        <img
                          src={`https://essencia-backend.onrender.com/${product?.images[0]}`}
                        />
                      </div>
                    </div>
                  </th>
                  <td>{product?.name}</td>
                  <td>{product?.description.substring(0, 80)}...</td>
                  <td>{product?.volume}ml</td>
                  <td>${product?.price.toFixed(2)}</td>
                  <td>{product?.brand?.name}</td>
                  <td>
                    {moment(product?.createdAt).format("DD MMM YYYY HH:mm A")}
                  </td>
                  <td>
                    {moment(product?.updatedAt).format("DD MMM YYYY HH:mm A")}
                  </td>
                  <td className="flex items-center gap-1">
                    <Link
                      to={`/products/edit/${product._id}`}
                      className="btn-success text-white w-8 h-8 rounded-none flex items-center justify-center "
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="bg-red-500 w-8 h-8 rounded-none flex items-center justify-center text-white"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400"> Aucune produit trouvée </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
