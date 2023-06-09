import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/Scope Logo.png`} alt="Logo" height="70" className="mr-2" />
           
        </div>
    );
};

export default AppFooter;
