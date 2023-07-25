import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const { login, inputs, setInputs, loginErrors, errorMessage } =
    useContext(AuthContext);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <div className="px-5 w-full h-screen flex items-center justify-center bg-[#FEFEFF]">
      <div className="w-full md:w-[480px] bg-white shadow-gray-300 shadow-xl rounded-md p-5">
        <h2 className="text-2xl mb-5 font-bold text-zinc-700">Login</h2>
        <form onSubmit={handleSubmit}>
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
                !loginErrors.email ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-[#FEFEFF]`}
              onChange={handleChange}
            />
            {loginErrors.email && (
              <p className="text-sm text-red-600">{loginErrors.email}</p>
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
                !loginErrors.password ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-[#FEFEFF]`}
              onChange={handleChange}
            />
            {loginErrors.password && (
              <p className="text-sm text-red-600">{loginErrors.password}</p>
            )}

            {errorMessage && (
              <span className="text-red-600 text-sm">{errorMessage}</span>
            )}
          </div>
          <button className="w-full bg-sky-600 uppercase tracking-wide text-white flex items-center justify-center rounded-md p-4 font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
