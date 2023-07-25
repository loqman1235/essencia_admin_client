import { PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    password_conf: "",
  });
  // const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const getUser = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `https://essencia-backend.onrender.com/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setInputs({
          ...inputs,
          username: response.data.user.username,
          email: response.data.user.email,
          address: response.data.user.address,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = Cookies.get("token");
      const response = await axios.put(
        `https://essencia-backend.onrender.com/api/v1/users/${id}`,
        inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setErrors({});
      navigate(`/users`);
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = {};
        error.response.data.errors.forEach((error) => {
          errorData[error.path] = error.msg;
        });
        setErrors(errorData);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl tracking-tight font-medium text-zinc-700">
          Modifier un utilisateur
        </h2>
      </div>
      <div className="w-full md:w-1/2 flex gap-5">
        <form
          onSubmit={handleUpdateUser}
          encType="multipart/form-data"
          className="flex-1"
        >
          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="username" className="text-sm">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className={`border rounded-md ${
                errors.username ? "border-red-600" : "border-gray-200"
              } outline-none p-4 w-full bg-white`}
              onChange={handleChange}
              value={inputs.username}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="text"
              name="email"
              className={`border rounded-md ${
                errors.email ? "border-red-600" : "border-gray-200"
              } outline-none p-4 w-full bg-white`}
              onChange={handleChange}
              value={inputs.email}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              className={`border rounded-md ${
                errors.address ? "border-red-600" : "border-gray-200"
              } outline-none p-4 w-full bg-white`}
              onChange={handleChange}
              value={inputs.address}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={`border rounded-md ${
                errors.password ? "border-red-600" : "border-gray-200"
              } outline-none p-4 w-full bg-white`}
              onChange={handleChange}
              value={inputs.password}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="password_conf" className="text-sm">
              Confirmation du mot de passe
            </label>
            <input
              id="password_conf"
              type="password"
              name="password_conf"
              className={`border rounded-md ${
                errors.password_conf ? "border-red-600" : "border-gray-200"
              } outline-none p-4 w-full bg-white`}
              onChange={handleChange}
              value={inputs.password_conf}
            />
            {errors.password_conf && (
              <p className="text-sm text-red-600">{errors.password_conf}</p>
            )}
          </div>

          <button
            className="btn btn-success text-white w-1/2"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Modifier"
            )}
          </button>
        </form>

        {/* <div className="flex flex-col gap-2 w-[280px]">
          {photo ? (
            <div className="bg-gray-200 text-gray-300 w-full rounded-md h-[280px] mt-6 flex items-center justify-center">
              {typeof photo === "string" ? (
                <img src={photo} className="object-contain" alt="Brand" />
              ) : (
                <img
                  src={URL.createObjectURL(photo)}
                  className="object-contain"
                  alt="Brand"
                />
              )}
            </div>
          ) : (
            <div className="bg-neutral-50 text-neutral-200 w-full rounded-md h-[280px] mt-6 flex items-center justify-center">
              <PhotoIcon className="w-20 h-20" />
            </div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default EditUserPage;
