import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/admin/register",
        inputs
      );
      if (response.status === 200) {
        console.log(response);
        setErrors({});
        setInputs({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
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
    <div className="px-5 w-full h-screen flex items-center justify-center bg-[#FEFEFF]">
      <div className="w-full md:w-[480px] bg-white shadow-gray-300 shadow-xl rounded-md p-5">
        <h2 className="text-2xl mb-5 font-bold text-zinc-700">S'inscrire</h2>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="username" className="text-sm text-gray-500">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={inputs.username}
              className={`border rounded-md ${
                !errors.username ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-[#FEFEFF]`}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={inputs.email}
              className={`border rounded-md ${
                !errors.email ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-[#FEFEFF]`}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="password" className="text-sm text-gray-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={inputs.password}
              className={`border rounded-md ${
                !errors.password ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-[#FEFEFF]`}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <button className="w-full bg-green-600 uppercase tracking-wide text-white flex items-center justify-center rounded-md p-4 font-semibold">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
