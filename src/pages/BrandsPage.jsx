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

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const getBrands = async () => {
    try {
      const response = await axios.get(
        "https://essencia-backend.onrender.com/api/v1/brands",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.brands);
      setBrands(response.data.brands);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  const removeBrand = async (id) => {
    try {
      const token = Cookies.get("token");
      const updatedBrands = brands.filter((brand) => brand._id !== id);
      setBrands(updatedBrands); // Update the state immediately
      const response = await axios.delete(
        `https://essencia-backend.onrender.com/api/v1/brands/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl tracking-tight font-medium text-zinc-700">
          Gérer les marques
        </h2>
        <Link to="/brands/create" className="btn btn-sm btn-success text-white">
          Créer
        </Link>
      </div>
      <div className={`overflow-x-auto ${brands.length > 0 ? "shadow" : ""}"`}>
        {brands.length > 0 ? (
          <table className="table bg-white rounded-md">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Nom</th>
                <th>Date de création</th>
                <td>Date de mise à jour</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id}>
                  <th></th>
                  <th>
                    <div>
                      <div className="w-20 rounded-sm">
                        <img
                          className="object-cover w-full h-full"
                          src={`https://essencia-backend.onrender.com/${brand?.image}`}
                          alt={brand?.name}
                        />
                      </div>
                    </div>
                  </th>
                  <td>{brand?.name}</td>
                  <td>
                    {moment(brand?.createdAt).format("DD MMM YYYY HH:mm A")}
                  </td>
                  <td>
                    {moment(brand?.updatedAt).format("DD MMM YYYY HH:mm A")}
                  </td>

                  <td className="flex items-center gap-1">
                    <Link
                      to={`/brands/edit/${brand._id}`}
                      className="btn-success text-white w-8 h-8 rounded-none flex items-center justify-center "
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => removeBrand(brand?._id)}
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
          <p className="text-gray-400"> Aucune marque trouvée </p>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
