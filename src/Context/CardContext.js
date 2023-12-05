import React, { createContext, useContext } from 'react';

const CardContext = createContext({
    name: "",
    count: 0,
    price: 0,
    discount: 0,
    itemTotal: () => 0,
    handlerPlus: () => {},
    handlerMinus: () => {},
    handlerChangeName: () => {},
    handlerChangePrice: () => {},
    handlerAddProduct: () => {},
});

export const useCardContext = () => useContext(CardContext);

export const CardProvider = ({ children, value }) => <CardContext.Provider value={value}>{children}</CardContext.Provider>;