import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import PartnerDashboard from "./PartnerDashboard";
import IndividualDashboard from "./IndividualDashboard";

function Dashboard() {
  const reduxUser = useSelector((state) => state.auth.user);
  const storedUser = localStorage.getItem("user");
  const user = reduxUser || (storedUser && JSON.parse(storedUser));

  return (
    <Layout>
      {user?.role === "partner" && <PartnerDashboard />}
      {user?.role === "individual" && <IndividualDashboard />}
    </Layout>
  );
}

export default Dashboard;
