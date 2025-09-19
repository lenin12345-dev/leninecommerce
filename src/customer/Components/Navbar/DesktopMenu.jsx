import { useNavigate } from "react-router-dom";
import { navigation } from "../../../config/navigationMenu";

export default function DesktopMenu() {
  const navigate = useNavigate();
  return (
    <div className="hidden lg:ml-8 lg:block">
      <div className="flex h-full space-x-8">
        {navigation.categories.map((category) => (
          <button
            key={category.name}
            className="text-white hover:text-teal-400"
            onClick={() => navigate("/products")}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
