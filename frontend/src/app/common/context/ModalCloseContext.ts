import { createContext, useContext } from "react";

export const ModalCloseContext = createContext<() => void>(() => { });

export const useModalClose = ():(() => void) => useContext(ModalCloseContext);