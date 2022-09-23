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
    title: 'Sports',
    submenu: [
      {
        title: 'Prediction',
        url: '/sports/prediction',
      }
    ],
  },{
    title: 'Banks',
    submenu: [
      {
        title: 'Accounts',
        url: '/banks/accounts',
      },
      {
        title: 'Credit Cards',
        url: '/banks/credit-cards',
      }
    ],
  },
  {
    title: 'Tools',
    url: '/tools',
  }
]
