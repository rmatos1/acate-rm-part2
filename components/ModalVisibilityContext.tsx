import React, { useState } from 'react';

import { IVisibilityContext } from '../types';

const ModalVisibility = React.createContext<IVisibilityContext>({ 
    modalVisible: false, 
    toggleVisibility: () => false 
});

const ModalVisibilityProvider = (props: any) => {

    const [modalVisible, setModalVisibel] = useState(false);

    const toggleVisibility = (value: boolean) => setModalVisibel(value);

    return(
        <ModalVisibility.Provider value={{ modalVisible, toggleVisibility }}>
            { props.children }
        </ModalVisibility.Provider>
    )
}   

export { ModalVisibilityProvider, ModalVisibility }