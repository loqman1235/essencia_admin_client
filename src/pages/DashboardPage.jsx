import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import {
  MdOutlineShoppingBag,
  MdOutlinePerson,
  MdOutlineLabel,
  MdOutlineReceipt,
} from "react-icons/md";
import Cookies from "js-cookie";
import axios from "axios";

const DashboardPage = () => {
  const [counts, setCounts] = useState({
    productCount: 0,
    userCount: 0,
    orderCount: 0,
    brandCount: 0,
  });

  const getCounts = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "http://localhost:3001/api/v1/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCounts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <div>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 gap-5">
        {/* Card */}
        <DashboardCard
          title="Produits"
          count={counts.productCount}
          icon={<MdOutlineShoppingBag size={40} />}
          bgColor="bg-[#4A6FDD]"
        />
        <DashboardCard
          title="Commandes"
          count={counts.orderCount}
          icon={<MdOutlineReceipt size={40} />}
          bgColor="bg-[#1CC98A]"
        />
        <DashboardCard
          title="Utilisateurs"
          count={counts.userCount}
          icon={<MdOutlinePerson size={40} />}
          bgColor="bg-[#35B8CD]"
        />
        <DashboardCard
          title="Marques"
          count={counts.brandCount}
          icon={<MdOutlineLabel size={40} />}
          bgColor="bg-[#F6C442]"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
