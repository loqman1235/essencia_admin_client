import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://essencia-backend.onrender.com/api/v1/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const removeUser = async (id) => {
    try {
      const token = Cookies.get("token");
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers); // Update the state immediately
      const response = await axios.delete(
        `https://essencia-backend.onrender.com/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/users");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl tracking-tight font-medium text-zinc-700">
          Gérer les utilisateurs
        </h2>
        <Link to="/users/create" className="btn btn-sm btn-success text-white">
          Créer
        </Link>
      </div>
      <div className={`overflow-x-auto ${users.length > 0 ? "shadow" : ""}"`}>
        {users?.length > 0 ? (
          <table className="table bg-white rounded-md">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nom d'utilisateur</th>
                <th>E-mail</th>
                <th>Adresse</th>
                <td>Date de création</td>
                <td>Date de mise à jour</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <th></th>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.address}</td>
                  <td>
                    {moment(user?.createdAt).format("DD MMM YYYY HH:mm A")}
                  </td>
                  <td>
                    {moment(user?.updatedAt).format("DD MMM YYYY HH:mm A")}
                  </td>
                  <td className="flex items-center gap-1">
                    <Link
                      to={`/users/edit/${user._id}`}
                      className="btn-success text-white w-8 h-8 rounded-none flex items-center justify-center "
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => removeUser(user._id)}
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
          <p className="text-gray-400">
            Aucune commande trouvée pour le moment
          </p>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
