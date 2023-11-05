import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/globalContext";
import { getAdminInfo, getUserInfo } from "../../api/userApi";

export const useSession = () => {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();

  const login = async (
    userId: string | undefined,
    password: string | undefined
  ) => {
    let user;
    if (userId && password) {
      localStorage.setItem("auth", window.btoa(`${userId}:${password}`));
      localStorage.setItem("userId", userId);

      user = await getAdminInfo(userId.toString());

      navigate("/products");
    } else if (userId) {
      localStorage.setItem("auth", window.btoa(`${userId}:`));
      localStorage.setItem("userId", userId);
      user = await getUserInfo(userId.toString());
      navigate("/shop");
    }

    if (user) {
      dispatch({
        type: "ADD_USER",
        payload: {
          firstName: user.firstName,
          isAdmin: false,
          address: {
            city: user.residence,
            street: user.street,
            zipCode: user.zipCode,
            houseNo: user.houseNo,
            residence: user.residence,
          },
        },
      });
    }
  };

  const logout = () => {
    state.shoppingCart.priceWithoutVat = 0;
    state.shoppingCart.products = [];
    state.shoppingCart.total = 0;

    localStorage.removeItem("auth");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return { login, logout, user: state.userInfo };
};
