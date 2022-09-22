export const menuItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'New Meetup',
    url: '/new-meetup',
  },
  {
    title: 'Sports Analysis',
    url: '/sports-analysis',
    submenu: [
      {
        title: '賽事預測比例',
        url: 'sport-prediction',
      }
    ],
  }
];