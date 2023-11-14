import React, { useState } from "react";
import Interviews from "./Interviews";
import About from "./About";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Modal } from "./Modal";
import { Link } from "react-router-dom";
 import "../App.css"
 import profile from "./Images/1699708758159.png"
import EntireLayout from "./EntireLayout";


interface UserProfile {
  profilePicture: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  password: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  userData: UserProfile;
  onEditProfile: (updatedData: UserProfile) => void;
}

// const Dashboard: React.FC = () => {
  // const loggedInUser = useSelector(
  //   (store: RootState) => store.authReducer.loggedInUser
  // );
  // console.log(loggedInUser);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [activeMenuItem, setActiveMenuItem] = useState<
  //   "roadmaps" | "interviews"
  // >("interviews");

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const openModal = (): void => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = (): void => {
  //   setIsModalOpen(false);
  // };

  // const toggleSidebar = () => {
  //   setIsSidebarOpen((prevState) => !prevState);
  // };

  // const closeSidebar = () => {
  //   setIsSidebarOpen((prevState) => !prevState);
  // };

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleSaveClick = () => {
  //   // Perform validation (e.g., check if passwords match)
  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }
  //   setIsEditing(false);
  //   closeModal();
  // };

  // return (
    // <>
    // <EntireLayout />
    //   <button
    //     data-drawer-target="default-sidebar"
    //     data-drawer-toggle="default-sidebar"
    //     aria-controls="default-sidebar"
    //     type="button"
    //     className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
    //     onClick={toggleSidebar}
    //   >
    //     <span className="sr-only">Open sidebar</span>
    //     <svg
    //       className="w-6 h-6"
    //       aria-hidden="true"
    //       fill="currentColor"
    //       viewBox="0 0 20 20"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         clipRule="evenodd"
    //         fillRule="evenodd"
    //         d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
    //       ></path>
    //     </svg>
    //   </button>

    //   <aside
    //     id="default-sidebar"
    //     className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform mt- ${
    //       isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    //     } sm:translate-x-0`}
    //     aria-label="Sidebar">
    //     <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
    //       <ul className="space-y-2 font-medium">
    //         <li
    //           className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 d group"
    //           onClick={closeSidebar}
    //         >
    //           <svg
    //             className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="currentColor"
    //             viewBox="0 0 22 21"
    //           >
    //             <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
    //             <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
    //           </svg>
    //           <span className="ms-3">Dashboard</span>
    //         </li>
    //         <li
    //           className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-purple-100 group ${
    //             activeMenuItem === "interviews" && "bg-purple-200"
    //           }`}
    //           onClick={() => setActiveMenuItem("interviews")}
    //         >
    //           <svg
    //             className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="currentColor"
    //             viewBox="0 0 22 21"
    //           ></svg>
    //           <span className="ms-3">Interviews</span>
    //         </li>
    //         <li
    //           className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-purple-100 group ${
    //             activeMenuItem === "roadmaps" && "bg-purple-200"
    //           }`}
    //           onClick={() => setActiveMenuItem("roadmaps")}
    //         >
    //           <svg
    //             className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="currentColor"
    //             viewBox="0 0 22 21"
    //           ></svg>
    //           <span className="ms-3">Roadmaps</span>
    //         </li>
    //         <li
    //           className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-100 group `}
    //           onClick={openModal}
    //         >
    //           <svg
    //             className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="currentColor"
    //             viewBox="0 0 22 21"
    //           ></svg>
    //           <span className="ms-3">Profile</span>
    //         </li>
    //         {/* Additional list items based on your HTML structure */}
    //       </ul>
    //     </div>
    //   </aside>

    //   {/* Conditional rendering based on the selected menu item */}
    //   <div className="p-4 sm:ml-64">
    //     {activeMenuItem === "interviews" && <Interviews />}
    //     {activeMenuItem === "roadmaps" && <About />}
    //     {/* Additional conditional rendering based on the selected menu item */}
    //   </div>
    //   <div>

         
    //       <Modal
    //         isOpen={isModalOpen}
    //         onClose={closeModal}>
    //         </div>
    //         <div className="profile-data">
    //           <h1>User Details</h1>
    //           <p>
    //             {" "}
    //             Username:{" "}
    //             {isEditing ? (
    //               <input
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //               />
    //             ) : (
    //               "Jahir Pendhari"
    //             )}
    //           </p>
    //           {/* <p>Email: {"jahirpp1999@gmail.com"}</p> */}
    //           <p>
    //             Email:{" "}
    //             {isEditing ? (
    //               <input
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //               />
    //             ) : (
    //               "jahirpp1999@gmail.com"
    //             )}
    //           </p>
    //           {/* <p>Bio: {"I'am Jahir Pendhari"}</p> */}
    //           <p>
    //             Bio:{" "}
    //             {isEditing ? (
    //               <input
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //               />
    //             ) : (
    //               "I'am Jahir Pendhari"
    //             )}
    //           </p>

    //           {isEditing && (
    //             <div>
    //               <label>New Password:</label>
    //               <input
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />

    //               <label>Confirm Password:</label>
    //               <input
    //                 type="password"
    //                 value={confirmPassword}
    //                 onChange={(e) => setConfirmPassword(e.target.value)}
    //               />
    //             </div>
    //           )}

    //           <button
    //             onClick={isEditing ? handleSaveClick : handleEditClick}
    //             className="btn"
    //           >
    //             {isEditing ? "Save" : "Edit Profile"}
    //           </button>
    //         </div>
    //       </div>
    //     </Modal>
    //   </div>
    // </>
  // )
// };

// export default Dashboard;
