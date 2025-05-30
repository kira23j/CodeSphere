// "use client";
// import React, { useState, useEffect } from "react";
// import { useWallets } from "@privy-io/react-auth";
// import { usePrivy } from "@privy-io/react-auth";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// import { Accordion } from "@/components/ui/accordion";

// import { getUserByAddress } from "@/utils/queries";

// interface DropDownMenuProps {
//   onClose: () => void;
// }

// const DropdownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
//   const { ready, authenticated, login, logout } = usePrivy();
//   const disableLogin = !ready || (ready && authenticated);
//   const { wallets } = useWallets();
//   const [UserInfo, setUserInfo] = useState("");

//   const handleLinkClick = () => {
//     onClose();
//   };
//   useEffect(() => {
//     const getUserInfo = async () => {
//       let userInfo = (await getUserByAddress(
//         ready ? wallets[0]?.address : "0x0"
//       )) as any;
//       setUserInfo(userInfo);
//     };

//     getUserInfo();
//   }, [ready, authenticated]);
//   return (
//     <div className="w-screen h-screen bg-white  px-2 items-center justify-center absolute  right-0 xl:hidden">
//       <Accordion
//         defaultValue="item-1"
//         className="
//             pl-2
//             "
//         type="single"
//         collapsible
//       >
//         <Link
//           href={"/"}
//           className="
//             flex
//             flex-1
//             items-center 
//             justify-between
           
//             mt-11
//            pt-2
//             py-4
            
//             border-b
//             "
//         >
//           Home
//         </Link>

//         <Link
//           href={"/verify-identity"}
//           className="
//             flex
//             flex-1
//             items-center 
//             justify-between
     
          
//             py-4
            
//             border-b
//             "
//         >
//           Verify Identity
//         </Link>
//       </Accordion>

//       <div className="pt-12">
//         <div className="  space-y-4 flex flex-col px-4">
//           {authenticated && UserInfo !== "User does not exist." ? (
//             <Link href={"/dashboard"}>
//               <Button
//                 className="
//               w-full
                  
//                         "
//               >
//                 Dashboard
//               </Button>
//             </Link>
//           ) : authenticated && UserInfo == "User does not exist." ? (
//             <Link href={"/onboard"}>
//               <Button variant={"outline"} className="w-full">
//                 Get DID
//               </Button>
//             </Link>
//           ) : (
//             ""
//           )}
//           {authenticated ? (
//             <Button variant={"outline"} onClick={logout} className="w-full">
//               Disconnect
//             </Button>
//           ) : (
//             <Button variant={"outline"} onClick={login} className="w-full">
//               Connect
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DropdownMenu;

"use client";
import React, { useState, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { getUserByAddress } from "@/utils/queries";

interface DropDownMenuProps {
  onClose: () => void;
}

const DropdownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const { ready, authenticated, login, logout } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const { wallets } = useWallets();
  const [UserInfo, setUserInfo] = useState("");

  const handleLinkClick = () => {
    onClose();
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUserByAddress(
        ready ? wallets[0]?.address : "0x0"
      );
      setUserInfo(userInfo);
    };

    getUserInfo();
  }, [ready, authenticated]);

  return (
    <div className="w-screen h-screen px-2 absolute right-0 xl:hidden bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500">
      <Accordion
        defaultValue="item-1"
        className="pl-2"
        type="single"
        collapsible
      >
        <Link
          href="/"
          onClick={handleLinkClick}
          className="
            flex
            flex-1
            items-center 
            justify-between
            mt-11
            pt-2
            py-4
            border-b
            border-gray-300
            dark:border-gray-700
            hover:text-primary
            dark:hover:text-white
          "
        >
          Home
        </Link>

        <Link
          href="/verify-identity"
          onClick={handleLinkClick}
          className="
            flex
            flex-1
            items-center 
            justify-between
            py-4
            border-b
            border-gray-300
            dark:border-gray-700
            hover:text-primary
            dark:hover:text-white
          "
        >
          Verify Identity
        </Link>
      </Accordion>

      <div className="pt-12">
        <div className="space-y-4 flex flex-col px-4">
          {authenticated && UserInfo !== "User does not exist." ? (
            <Link href="/dashboard" onClick={handleLinkClick}>
              <Button className="w-full">Dashboard</Button>
            </Link>
          ) : authenticated && UserInfo === "User does not exist." ? (
            <Link href="/onboard" onClick={handleLinkClick}>
              <Button variant="outline" className="w-full">
                Get DID
              </Button>
            </Link>
          ) : null}
          {authenticated ? (
            <Button
              variant="outline"
              onClick={logout}
              className="w-full"
            >
              Disconnect
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={login}
              disabled={disableLogin}
              className="w-full"
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
