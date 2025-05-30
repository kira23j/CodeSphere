// "use client";

// import React, { useState, useEffect } from "react";
// import { usePrivy } from "@privy-io/react-auth";

// import { Button } from "@/components/ui/button";
// import { useWallets } from "@privy-io/react-auth";

// import { X, AlignJustify } from "lucide-react";
// import Link from "next/link";
// import DropdownMenu from "./drop-down-menu";
// import { getUserByAddress } from "@/utils/queries";

// const ActionButtons = () => {
//   const { ready, authenticated, login, logout } = usePrivy();
//   const disableLogin = !ready || (ready && authenticated);
//   const { wallets } = useWallets();

//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [UserInfo, setUserInfo] = useState("");
//   const toggleDropdown = () => {
//     setDropdownVisible(!isDropdownVisible);
//   };

//   const closeDropdown = () => {
//     setDropdownVisible(false);
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

//   console.log(UserInfo == "User does not exist.");
//   console.log(authenticated);

//   return (
//     <div className="pr-2">
//       <div className=" items-center justify-center flex ">
//         <div className="flex xl:space-x-4">
//           {authenticated && UserInfo !== "User does not exist." ? (
//             <>
//               <Link
//                 href={"/dashboard"}
//                 className="
//             lg:flex
//             items-center
//             hidden
            
//             "
//               >
//                 <div className="">Dashboard</div>
//               </Link>
//               <div
//                 className="font-thin     
//         lg:flex
//         ml-4 mr-0
//             items-center
//             hidden"
//               >
//                 |
//               </div>
//             </>
//           ) : authenticated && UserInfo == "User does not exist." ? (
//             <>
//               <Link
//                 href={"/onboard"}
//                 className="
//           lg:flex
//           items-center
//           hidden
         
//           "
//               >
//                 <div className="">Get DID</div>
//               </Link>
//               <div
//                 className="font-thin     
//       lg:flex
//           items-center
//           ml-4 mr-0
//           hidden"
//               >
//                 |
//               </div>
//             </>
//           ) : (
//             ""
//           )}
//         </div>

//         <div className="flex lg:space-x-2 items-center pr-4">
//           {/* <Link href={"/free"}>
//             <Button
//               variant={"outline"}
//               className="
//             lg:flex
//             items-center
//             hidden
//                 border-none 
//                 text-md
                
//                 "
//             ></Button>
//           </Link> */}
//           {authenticated ? (
//             <Button className="hidden lg:block " onClick={logout}>
//               Disconnect
//             </Button>
//           ) : (
//             <Button className="hidden lg:block" onClick={login}>
//               Connect
//             </Button>
//           )}
//         </div>

//       </div>

//       {isDropdownVisible && (
//         <div
//           onClick={toggleDropdown}
//           className="
//              rounded-full
//              xl:hidden"
//         >
//           <X className="h-5 w-5  items-center justify-center rounded-full" />
//         </div>
//       )}
//       {!isDropdownVisible && (
//         <div onClick={toggleDropdown} className="flex lg:hidden">
//           <AlignJustify className="h-6 w-6 items-center justify-center mr-2" />
//         </div>
//       )}

//       {isDropdownVisible && <DropdownMenu onClose={closeDropdown} />}
//     </div>
//   );
// };

// export default ActionButtons;
"use client";

import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import { X, AlignJustify } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import DropdownMenu from "./drop-down-menu";
import { getUserByAddress } from "@/utils/queries";

const ActionButtons = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const disableLogin = !ready || (ready && authenticated);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [UserInfo, setUserInfo] = useState("");

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      let userInfo = (await getUserByAddress(
        ready ? wallets[0]?.address : "0x0"
      )) as any;
      setUserInfo(userInfo);
    };

    getUserInfo();
  }, [ready, authenticated]);

  return (
    <div className="pr-2">
      <div className="flex items-center justify-center">
        <div className="flex xl:space-x-4">
          {authenticated && UserInfo !== "User does not exist." ? (
            <>
              <Link
                href={"/dashboard"}
                className="hidden lg:flex items-center text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <span className="hidden lg:flex text-gray-500">|</span>
            </>
          ) : authenticated && UserInfo === "User does not exist." ? (
            <>
              <Link
                href={"/onboard"}
                className="hidden lg:flex items-center text-gray-300 hover:text-white transition"
              >
                Get DID
              </Link>
              <span className="hidden lg:flex text-gray-500">|</span>
            </>
          ) : null}
        </div>

        <div className="flex lg:space-x-2 items-center pr-4">
          {authenticated ? (
            <Button
              onClick={logout}
              className="hidden lg:block bg-gray-700 text-white hover:bg-gray-600 transition"
            >
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={login}
              className="hidden lg:block bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Connect
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu icons */}
      {isDropdownVisible ? (
        <div
          onClick={toggleDropdown}
          className="xl:hidden text-gray-300 hover:text-white transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </div>
      ) : (
        <div
          onClick={toggleDropdown}
          className="flex lg:hidden text-gray-300 hover:text-white transition cursor-pointer"
        >
          <AlignJustify className="h-6 w-6 mr-2" />
        </div>
      )}

      {isDropdownVisible && <DropdownMenu onClose={closeDropdown} />}
    </div>
  );
};

export default ActionButtons;
