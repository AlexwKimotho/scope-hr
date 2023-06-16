import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model = [
    {
      label: "Dashboard",
      items: [

        {
          label: "Dashboard", 
          icon: "pi pi-fw pi-home", 
          to: "/" 
        },

        {
          label: "Organization",
          icon: "pi pi-fw pi-building",
          items: [
            { label: "Organization Profile", icon: "pi pi-fw pi-database", to: "/pages/Organisation-profile" },
            { label: "Divisions", icon: "pi pi-fw pi-building", to: "/pages/Divisions" },
            { label: "Departments", icon: "pi pi-fw pi-sitemap", to: "/pages/Departments"},
            { label: "Organization Awards", icon: "pi pi-fw pi-ticket", to: "/pages/Awards" },
          ],
        },
        {
          label: "Employees",
          icon: "pi pi-fw pi-users",
          items: [
            { label: "Employee Data", icon: "pi pi-fw pi-user-edit" },
            { label: "Employee Learning", icon: "pi pi-fw pi-book" },
            { label: "Employee Reward", icon: "pi pi-fw pi-inbox" },
            { label: "Contracts", icon: "pi pi-fw pi-file" },
          ],
        },
        {
            label: "General Information", 
            icon: "pi pi-info-circle", 
            to: "/" 
          },
          {
            label: "Timesheet",
            icon: "pi pi-fw pi-clock",
            to: "/pages/crud",
          },
          {
            label: "Gig Platform",
            icon: "pi pi-fw pi-briefcase",
            items: [
              { label: "Project Management", icon: "pi pi-fw pi-sitemap" },
              { label: "Team Management", icon: "pi pi-fw pi-user-edit" },
              { label: "Ticket Management", icon: "pi pi-fw pi-ticket" },
            ],
          },
      ],
    },
    {
      label: "HR Modules",
      items: [
        {
          label: "Payroll",
          icon: "pi pi-fw pi-credit-card",
          to: "/blocks",
          badge: "NEW",
        },
        {
            label: "Leave Management",
            icon: "pi pi-fw pi-send",
            items: [
              { label: "Leave Requests", icon: "pi pi-fw pi-send" },
              { label: "Remote Work Request", icon: "pi pi-fw pi-home" },
            ],
          },
          {
            label: "Performance",
            icon: "pi pi-fw pi-chart-bar",
            to: "/blocks",
            badge: "NEW",
          },
          {
            label: "KPI Management",
            icon: "pi pi-fw pi-star",
            to: "/blocks",
            // badge: "NEW",
          },
      ],
    },
    {
      label: "Account Management",
      items: [
        {
          label: "User Accounts",
          icon: "pi pi-fw pi-users",
          to: "/pages/SignIn",
        },
        {
            label: "My Account",
            icon: "pi pi-fw pi-user",
            to: "/pages/crud",
          },   {
            label: "Manage Password ",
            icon: "pi pi-fw pi-lock",
            to: "/pages/crud",
          },
      ],
    },
];
  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}

        {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
