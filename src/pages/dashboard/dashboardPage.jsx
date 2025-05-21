import React from "react";
import WelcomeGuest from "../../components/dashboard/WelcomeGuest";
import AdminOverview from "../../components/dashboard/AdminOverview";
import UserHome from "../../components/dashboard/userHome";
import { useUserDetails } from "../../shared/hooks/useUserDetails";

const DashboardPage = () => {
  const { isLogged } = useUserDetails();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const renderDashboard = () => {
    if (!isLogged) return <WelcomeGuest />;
    if (user.role === "ADMIN_ROLE" || user.role === "HOST_ROLE") return <AdminOverview />;
    return <UserHome />;
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      {renderDashboard()}
    </div>
  );
};

export default DashboardPage;
