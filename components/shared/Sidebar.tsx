import {
  LayoutDashboard,
  HeartHandshake,
  Users,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="pt-[100px] p-5 shadow-md h-full">
      <ul className="list-none flex flex-col gap-2 font-semibold">
        <li className="  cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
          <LayoutDashboard />
          <p className="pl-2 hidden sm:block">Dashboard</p>
        </li>
        <li className="  cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
          <HeartHandshake />
          <p className="pl-2">Groups</p>
        </li>

        <li className="  cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
          <Users />
          <p className="pl-2">Friends</p>
        </li>

        <li className="  cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
          <User />
          <p className="pl-2">Account</p>
        </li>

        <li className="   cursor-pointer hover:text-white hover:bg-blue-600 dark:hover:bg-[#3c4c74] rounded-md p-5 flex text-xl items-center">
          <LogOut />
          <p className="pl-2">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
