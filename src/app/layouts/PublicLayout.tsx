import React, { JSX } from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = (): JSX.Element => {
  return <Outlet />;
};

export default PublicLayout;
