"use client";

import { useUserStore } from "@/store/store";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { user } = useUserStore();

  const router = useRouter();

  return (
    <div className="bg-slate-200 p-2 flex items-end justify-end">
      <Button
        color="error"
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
      >
        Log out
      </Button>
      {user?.avatar === null ? (
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          {user?.firstName?.charAt(0) || ""}
          {user?.lastName?.charAt(0) || ""}
        </Avatar>
      ) : (
        <Avatar
          // src={`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.avatar}`}
          src={user?.avatar}
          sx={{ width: 56, height: 56 }}
        />
      )}
    </div>
  );
};

export default NavBar;
