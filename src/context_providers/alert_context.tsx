import React, { useState, createContext } from "react";
import AlertModal from "../components/AlertModal";

interface contextType {
    errorAlert(message: string, cd: Function): void,
}


export const AlertContext = createContext<contextType>({} as contextType);

export function AlertProvider({ children }: React.PropsWithChildren<{}>) {
    const [message, setMessage] = useState<string>('');
    const [showModal, setShowModal] = useState(false);

    function errorAlert(message: string, cb: Function) {
        setMessage(message);
        setShowModal(true);
        cb()
    }

    return (
        <AlertContext.Provider
            value={{
                errorAlert,
            }}
        >
            {
                showModal ?
                    <AlertModal
                        message={<span>{message}</span>}
                        onOk={() => { }}
                        onClose={setShowModal}
                    />
                    :
                    null
            }
            {children || null}
        </AlertContext.Provider>
    );
}