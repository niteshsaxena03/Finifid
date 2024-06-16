import { createContext, useContext } from "react";

const Firebase = createContext(null);

export const FirebaseContext = useContext(Firebase);

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};
