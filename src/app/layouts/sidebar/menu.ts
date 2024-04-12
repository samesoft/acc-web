import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.DASHBOARD.TEXT",
    link: "/",
    icon: "home",
  },
  {
    id: 3,
    label: "MENUITEMS.COMPONENTS.TEXT",
    isTitle: true,
  },
  {
    id: 4,
    label: "MENUITEMS.APPS.LIST.CARGO",
    subItems: [
      {
        id: 5,
        label: "MENUITEMS.APPS.LIST.CARGOSCHEUDLE",
        link: "tables/listjs",
        parentId: 4,
      },
      {
        id: 6,
        label: "MENUITEMS.APPS.LIST.CARGOREPORT",
        link: "cargo/cargoreport",
        parentId: 4,
      },
    ],
  },
  {
    id: 6,
    label: "MENUITEMS.APPS.LIST.REPORT",
    subItems: [
      {
        id: 7,
        label: "MENUITEMS.APPS.LIST.JOURNAL",
        link: "forms/journal-statement",
        parentId: 6,
      },
    ],
  },
  {
    id: 8,
    label: "MENUITEMS.APPS.LIST.PARTY",
    subItems: [
      {
        id: 9,
        label: "MENUITEMS.APPS.LIST.PARTYLIST",
        link: "forms/party-list",
        parentId: 8,
      },
      {
        id: 10,
        label: "MENUITEMS.APPS.LIST.IMPORTPARTY",
        link: "forms/import-party",
        parentId: 8,
      },
    ],
  },
  {
    id: 11,
    label: "MENUITEMS.APPS.LIST.Transactions",
    subItems: [
      {
        id: 12,
        label: "MENUITEMS.APPS.LIST.IMPORTTRANSACTION",
        link: "forms/import-transaction",
        parentId: 11,
      },
      {
        id: 13,
        label: "MENUITEMS.APPS.LIST.POSTPONEDINCOME",
        link: "forms/posted-income",
        parentId: 11,
      },
      // {
      //   id: 14,
      //   label: 'MENUITEMS.APPS.LIST.INCOMESTATMENT',
      //   link: 'forms/Income-statement',
      //   parentId: 11
      // },
      {
        id: 15,
        label: "MENUITEMS.APPS.LIST.ACCOUNTSTATEMENTS",
        link: "forms/account-statement",
        parentId: 11,
      },
    ],
  },
  {
    id: 16,
    label: "MENUITEMS.APPS.LIST.USER",
    subItems: [
      {
        id: 17,
        label: "MENUITEMS.APPS.LIST.USERLIST",
        link: "forms/users",
        parentId: 16,
      },
      {
        id: 18,
        label: "MENUITEMS.APPS.LIST.ACCOUNTLIST",
        link: "forms/accounts",
        parentId: 16,
      },
    ],
  },
];
