import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef, useState } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef((props, ref) => {
  const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current
  }));

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="layout-topbar">
      <Link href="/" className="layout-topbar-logo">
        <img src={`/layout/images/Scope Logo.png`} width="70" height="70" alt="logo" />
        <span></span>
      </Link>

      <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
        <i className="pi pi-bars" />
      </button>

      <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
        <i className="pi pi-ellipsis-v" />
      </button>

      <Link href="/" className="layout-topbar-logo">
        <span className="magenta-text">iSCOPE HR</span>
      </Link>

      <div className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible, 'layout-topbar-menu-visible': menuVisible })}>
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </button>

        <Link href="/AppConfig.js">
          <button type="button" className="p-link layout-topbar-button">
            <i className="pi pi-cog"></i>
            <span>Sign-In</span>
          </button>
        </Link>
      </div>
    </div>
  );
});

export default AppTopbar;
