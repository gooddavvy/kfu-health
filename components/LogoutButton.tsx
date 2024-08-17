import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth/login");
  };

  return (
    <Button
      onClick={handleLogout}
      style={{
        justifyContent: "center !important",
        width: "10%",
        marginLeft: "50px !important",
        backgroundColor: "red",
      }}
    >
      <span
        style={{
          justifySelf: "center !important",
          marginLeft: "10px !important",
          marginRight: "10px !important",
        }}
      >
        Logout
      </span>
    </Button>
  );
}
