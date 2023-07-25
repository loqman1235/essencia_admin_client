import { PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  console.log(photo);

  const handleAddBrand = async (e) => {
    e.preventDefault();
    // Create a product
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", photo);

    try {
      setLoading(true);
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://essencia-backend.onrender.com/api/v1/brands",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setErrors({});
      setName("");
      setPhoto(null);
      navigate("/brands");
    } catch (error) {
      setLoading(false);
      console.error(error);
      if (error.response || error.response.data || error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl tracking-tight font-medium text-zinc-700">
          Créer une nouvelle marque
        </h2>
      </div>
      <div className="w-full md:flex gap-5">
        <form
          onSubmit={handleAddBrand}
          encType="multipart/form-data"
          className="flex-1"
        >
          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="name" className="text-sm">
              Nom
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={`border rounded-md ${
                !errors.name ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-white`}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="photo" className="text-sm">
              Image
            </label>
            <input
              id="photo"
              type="file"
              name="photo"
              className={`border rounded-md ${
                !errors.image ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-white`}
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {errors.image && (
              <p className="text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <button className="btn btn-success text-white w-1/2">
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Créer"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-2 w-full md:w-[280px]">
          {photo ? (
            <div className="bg-gray-200 text-gray-300 w-full rounded-md h-[280px] mt-6 flex items-center justify-center">
              <img
                src={URL.createObjectURL(photo)}
                className="object-contain"
              />
            </div>
          ) : (
            <div className="bg-neutral-50 text-neutral-200 w-full rounded-md h-[280px] mt-6 flex items-center justify-center">
              <PhotoIcon className="w-20 h-20" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandCreatePage;
