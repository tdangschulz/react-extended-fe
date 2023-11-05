import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/globalContext";
import { getAdminInfo, getUserInfo } from "../../api/userApi";
import { Profile } from "../../models";

export function mapUserInfo(user: any, isAdmin: boolean): Profile {
  return {
    id: user.id,
    firstName: user.firstName,
    isPremium: user.turnoverSoFar > 10000,
    lastName: user.lastName,
    isAdmin,
    password: user.password,
    address: {
      city: user.residence,
      street: user.street,
      zipCode: user.zipCode,
      houseNo: user.houseNo,
      residence: user.residence,
    },
  };
}

export default function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>
) {
  function withWrapper(props: P) {
    const { dispatch } = useGlobalState();
    const navigate = useNavigate();

    React.useEffect(() => {
      const auth = localStorage.getItem("auth");
      if (auth) {
        const init = async () => {
          const localAuth = window.atob(auth).split(":");
          let isAdmin = false;
          let user;
          if (localAuth[0] && localAuth[1]) {
            user = await getAdminInfo(localAuth[0]);
            isAdmin = true;
          } else if (localAuth[0] && !localAuth[1]) {
            user = await getUserInfo(localAuth[0]);
            isAdmin = false;
          }

          if (user) {
            dispatch({
              type: "ADD_USER",
              payload: mapUserInfo(user, isAdmin),
            });
          }
        };

        init();
      } else {
        navigate("/login");
      }
    }, []);

    return <Component {...props} />;
  }

  return withWrapper;
}
