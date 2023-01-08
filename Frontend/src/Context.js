import { createContext, useState, useContext } from 'react';


const Usercontext = createContext(55);

const Changecontext = createContext(55);

export function UseTokenContext() {
    return useContext(Usercontext);
}

export function UbdateUseTokenContext() {
    return useContext(Changecontext);
}

export function TokenProvider({ children }) {
    const [token, settoken] = useState(11);

    function ChangeToken(val) {
        settoken(val);
    }

    return (
        <Usercontext.Provider value={token}>
            <Changecontext.Provider value={ChangeToken}>
                {children}
            </Changecontext.Provider>
        </Usercontext.Provider>
    );
}

//export { Usercontext, Changecontext };