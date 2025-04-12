
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, FileText, Home, LayoutDashboard, Package2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Invoices", path: "/invoices", icon: <FileText className="h-5 w-5" /> },
    { name: "Clients", path: "/clients", icon: <Building2 className="h-5 w-5" /> },
    { name: "Products", path: "/products", icon: <Package2 className="h-5 w-5" /> }
  ];

  return (
    <div className="bg-textile-600 text-white h-screen w-64 p-4 fixed left-0 top-0">
      <div className="flex items-center mb-8 pl-2 pt-4">
        <div className="bg-white rounded p-1 mr-2">
          <Building2 className="h-6 w-6 text-textile-600" />
        </div>
        <h1 className="text-xl font-bold">Billing Bricks</h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-white/20 font-medium"
                    : "hover:bg-white/10"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
