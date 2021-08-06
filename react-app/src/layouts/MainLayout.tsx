import React, { ReactNode } from "react";
import SleekFooter from "../components/navigation/SleekFooter";
import Box from "@material-ui/core/Box";
import SleekNav from "../components/navigation/SleekNav";
import { useAuthContext } from "../context/AuthProvider";
import SleekNavAdmin from "../components/navigation/SleekNavAdmin";;



interface IProps {
  children: ReactNode;
  // any other props that come into the component
}
const MainLayout = ({ children }: IProps) => {
  const { isLoggedIn, isAdmin, isLoading } = useAuthContext() as any;
  return (
    <>
      
      {isLoggedIn && isAdmin && !isLoading ? (
        <>
         <SleekNavAdmin></SleekNavAdmin>
        </>
      ) : (<SleekNav></SleekNav>)
    }
      <Box>{children}</Box>
      <SleekFooter />
    </>
  );
};

export default MainLayout;
