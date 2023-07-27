import { PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    volume: "",
    price: "",
    brand: "",
  });
  const [photos, setPhotos] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const updatedPhotos = Array.from(files);
    setPhotos(updatedPhotos);
  };

  // Getting brands
  const getBrands = async () => {
    try {
      const response = await axios.get(
        "https://essencia-backend.onrender.com/api/v1/brands",
        {
          withCredentials: true,
        }
      );
      setBrands(response.data.brands);
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `https://essencia-backend.onrender.com/api/v1/products/${id}`
      );
      if (response.data.success) {
        console.log(response.data.data);
        setInputs({
          name: response.data.data.name,
          description: response.data.data.description,
          volume: response.data.data.volume,
          price: response.data.data.price,
          brand: response.data.data.brand._id,
        });
        setPhotos(response.data.data.images);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append only new images selected in the file input
    for (let i = 0; i < photos.length; i++) {
      if (typeof photos[i] === "object" && photos[i].url) {
        // This is an existing image, re-add it to the form data
        formData.append("photos", photos[i].url);
      } else {
        // This is a new image, add the file object to the form data
        formData.append("photos", photos[i]);
      }
    }
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("volume", inputs.volume);
    formData.append("price", inputs.price);
    // Check if inputs.brand is a valid ObjectId
    if (inputs.brand && /^[0-9a-fA-F]{24}$/.test(inputs.brand)) {
      formData.append("brandId", inputs.brand);
    }

    try {
      setLoading(true);
      const token = Cookies.get("token");
      const response = await axios.put(
        `https://essencia-backend.onrender.com/api/v1/products/${id}`,
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

      navigate("/products");
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
          Modifier un produit
        </h2>
      </div>
      <div className="w-full md:flex gap-5">
        <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
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
              onChange={handleChange}
              value={inputs.name}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              className={`border rounded-md ${
                !errors.description ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-white`}
              onChange={handleChange}
              value={inputs.description}
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="photos" className="text-sm">
              Images
            </label>
            <input
              id="photos"
              type="file"
              name="photos"
              multiple
              className={`border rounded-md ${
                !errors.photos ? "border-gray-200 " : "border-red-600 "
              } outline-none p-4 w-full bg-white`}
              onChange={handlePhotoChange}
            />
            {errors.photos && (
              <p className="text-sm text-red-600">{errors.photos}</p>
            )}
          </div>

          <div className="grid grid-cols-3 items-center gap-2 w-full">
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="volume" className="text-sm">
                Volume
              </label>
              <input
                id="volume"
                type="number"
                name="volume"
                className={`border rounded-md ${
                  !errors.volume ? "border-gray-200 " : "border-red-600 "
                } outline-none p-4 w-full bg-white`}
                onChange={handleChange}
                value={inputs.volume}
              />
              {errors.volume && (
                <p className="text-sm text-red-600">{errors.volume}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 mb-5">
              <label htmlFor="price" className="text-sm">
                Prix
              </label>
              <input
                id="price"
                type="number"
                name="price"
                className={`border rounded-md ${
                  !errors.price ? "border-gray-200 " : "border-red-600 "
                } outline-none p-4 w-full bg-white`}
                onChange={handleChange}
                value={inputs.price}
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 mb-5 ">
              <label htmlFor="brand" className="text-sm">
                Marque
              </label>
              <select
                name="brand"
                id="brand"
                className={`border rounded-md ${
                  !errors.brand ? "border-gray-200 " : "border-red-600 "
                } outline-none p-4 w-full bg-white`}
                onChange={handleChange}
                value={inputs.brand}
              >
                <option value=""></option>
                {brands &&
                  brands.map((brand) => (
                    <option key={brand._id} value={brand?._id}>
                      {brand?.name}
                    </option>
                  ))}
              </select>
              {errors.brand && (
                <p className="text-sm text-red-600 whitespace-nowrap">
                  {errors.brand}
                </p>
              )}
            </div>
          </div>
          <button className="btn btn-success text-white w-1/2">
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Modifier"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-2 w-full md:w-[400px]">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-300 w-full rounded-md h-[280px] mt-6 flex items-center justify-center p-5"
              >
                {typeof photo === "object" && photo.url ? ( // If it's an object with a 'url' property, display the image using the 'url'
                  <img
                    src={photo.url}
                    className="object-contain w-full h-full"
                    alt={`Product ${index}`}
                  />
                ) : (
                  // If it's a file object, create an object URL
                  <img
                    src={URL.createObjectURL(photo)}
                    className="object-contain w-full h-full"
                    alt={`Product ${index}`}
                  />
                )}
              </div>
            ))
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

export default EditProductPage;
