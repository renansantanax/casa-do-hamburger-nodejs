import { Link, useLocation } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import { LogOut, ShoppingCart, Box, LayoutDashboard, Plus } from "lucide-react";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  const handleAuthUser = async () => {
    const response = await fetch("http://localhost:3000/me", {
      credentials: "include",
    });

    if (!response.ok) {
      setUser(null);
      return;
    }

    const data = await response.json();
    setUser(data);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        console.log("não deu certo");
      }

      setUser(null);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleAuthUser();
  }, []);

  const getNavItemClass = (path: string) => {
    const baseClass =
      "flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border";

    if (location.pathname === path) {
      return `${baseClass} text-[#161410] bg-[#F2DAAC]`;
    }

    return baseClass;
  };

  return (
    <div className="bg-[#161410]">
      <div className="mx-auto flex w-full items-center justify-between p-3 md:w-184.25 md:p-0">
        <Link to="/">
          <img src="./logo.png" alt="" />
        </Link>
        {user ? (
          <div className="flex items-center gap-8 text-white">
            <div className="flex items-center gap-2 text-[#F2DAAC]">
              <Link to="/">
                <div className={getNavItemClass("/")}>
                  <Box size={18} />
                </div>
              </Link>
              <Link to="/pedidos">
                <div className={getNavItemClass("/pedidos")}>
                  <LayoutDashboard size={18} />
                </div>
              </Link>
              <div className="flex h-8.75 w-8.75 cursor-pointer items-center justify-center rounded-md border">
                <Plus size={18} />
              </div>
            </div>
            <div className="relative cursor-pointer">
              <ShoppingCart size={18} />
              <p className="absolute -top-4 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#F2DAAC] text-[#161410]">
                1
              </p>
            </div>
            <div className="ml-2 flex items-center gap-2">
              <p>Olá, {user?.name}</p>

              <LogOut
                onClick={() => {
                  handleLogout();
                }}
                size={18}
                className="cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="flex h-8.75 w-32.5 cursor-pointer items-center justify-center rounded-sm bg-[#F2DAAC]">
              Entrar
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
