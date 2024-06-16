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
        link: "forms/schedule-list",
        parentId: 4,
      },
      {
        id: 6,
        label: "MENUITEMS.APPS.LIST.CARGOREPORT",
        link: "forms/cargo-report",
        parentId: 4,
      },
    ],
  },
  {
    id: 7,
    label: "MENUITEMS.APPS.LIST.REPORT",
    subItems: [
      {
        id: 8,
        label: "MENUITEMS.APPS.LIST.JOURNAL",
        link: "forms/journal-statement",
        parentId: 7,
      },
      {
        id: 9,
        label: "MENUITEMS.APPS.LIST.IMPORTJOURNAL",
        link: "forms/import-Journal",
        parentId: 7,
      },
    ],
  },
  {
    id: 10,
    label: "MENUITEMS.APPS.LIST.PARTY",
    subItems: [
      {
        id: 11,
        label: "MENUITEMS.APPS.LIST.PARTYLIST",
        link: "forms/party-list",
        parentId: 10,
      },
      {
        id: 12,
        label: "MENUITEMS.APPS.LIST.IMPORTPARTY",
        link: "forms/import-party",
        parentId: 10,
      },
    ],
  },
  //   {
  //   id: 13,
  //   label: "MENUITEMS.APPS.LIST.PARTY",
  //   subItems: [
  //     {
  //       id: 14,
  //       label: "MENUITEMS.APPS.LIST.PARTYLIST",
  //       link: "forms/party-list",
  //       parentId: 13,
  //     },
  //     {
  //       id: 15,
  //       label: "MENUITEMS.APPS.LIST.IMPORTPARTY",
  //       link: "forms/import-party",
  //       parentId: 13,
  //     },
  //   ],
  // },
  // {
  //   id: 16,
  //   label: 'MENUITEMS.APPS.LIST.Transactions',
  //   subItems: [
  //     {
  //       id: 17,
  //       label: 'MENUITEMS.APPS.LIST.IMPORTTRANSACTION',
  //       link: 'forms/import-transaction',
  //       parentId: 16
  //     },
  //     {
  //       id: 18,
  //       label: 'MENUITEMS.APPS.LIST.POSTPONEDINCOME',
  //       link: 'forms/posted-income',
  //       parentId: 16
  //     }
  //   ]
  // },
  {
    id: 19,
    label: "MENUITEMS.APPS.LIST.Transactions",
    subItems: [
      {
        id: 20,
        label: "MENUITEMS.APPS.LIST.IMPORTTRANSACTION",
        link: "forms/import-transaction",
        parentId: 19,
      },
      {
        id: 26,
        label: "MENUITEMS.APPS.LIST.BALANCESHEET",
        link: "forms/balancesheet",
        parentId: 19,
      },
      {
        id: 21,
        label: "MENUITEMS.APPS.LIST.POSTPONEDINCOME",
        link: "forms/posted-income",
        parentId: 19,
      },
      {
        id: 27,
        label: "MENUITEMS.APPS.LIST.INCOMESTATMENT",
        link: "forms/Income-statement",
        parentId: 19,
      },
      {
        id: 22,
        label: "MENUITEMS.APPS.LIST.ACCOUNTSTATEMENTS",
        link: "forms/account-statement",
        parentId: 19,
      },
    ],
  },
  {
    id: 23,
    label: "MENUITEMS.APPS.LIST.USER",
    subItems: [
      {
        id: 24,
        label: "MENUITEMS.APPS.LIST.USERLIST",
        link: "forms/users",
        parentId: 23,
      },
      {
        id: 25,
        label: "MENUITEMS.APPS.LIST.ACCOUNTLIST",
        link: "forms/accounts",
        parentId: 23,
      },
    ],
  },
  {
    id: 26,
    label: "MENUITEMS.APPS.LIST.TRIP",
    link: "forms/trip",
    icon: "trip",
  },
  {
    id: 27,
    label: "MENUITEMS.APPS.LIST.DISTRICT",
    link: "forms/district",
    icon: "trip",
  },
  {
    id: 28,
    label: "MENUITEMS.APPS.LIST.SUBDISTRICT",
    link: "forms/Sub_District",
    icon: "trip",
  },
];
