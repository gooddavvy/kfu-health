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
      sx={{
        justifyContent: "center",
        padding: "10px 24px",
        marginLeft: "20px", // Adjusted margin for better spacing
        background: "linear-gradient(135deg, #ff4081, #ff1744)", // Gradient similar to the total points rectangle
        color: "#fff", // White text for contrast
        borderRadius: "12px", // Rounded corners
        fontWeight: "bold", // Bold text to match the total points
        boxShadow: "0 4px 10px rgba(255, 23, 68, 0.3)", // Subtle shadow for depth
        transition: "background 0.3s ease, transform 0.3s ease", // Smooth transitions for hover effect
        "&:hover": {
          background: "linear-gradient(135deg, #ff1744, #ff4081)", // Reverse gradient on hover
          transform: "scale(1.05)", // Slight scale up on hover for interactivity
        },
      }}
    >
      Logout
    </Button>
  );
}
