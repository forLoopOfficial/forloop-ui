export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Organize',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Events',
      url: '/events',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Create',
          url: '/events/create',
          icon: 'icon-plus'
        },
        {
          name: 'View',
          url: '/events',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      title: true,
      name: 'Manage',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Users',
      url: '/icons',
      icon: 'icon-user',
      children: [
        {
          name: 'View',
          url: '/users',
          icon: 'icon-user'
        }
      ]
    },
    {
      divider: true
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'About',
          url: '/pages/about',
          icon: 'icon-star'
        },
        {
          name: 'Member',
          url: '/pages/member',
          icon: 'icon-star'
        },
        {
          name: 'Team',
          url: '/pages/team',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Sponsors',
      url: '/sponsors',
      icon: 'icon-list',
      children: [
        {
          name: 'View',
          url: '/sponsors',
          icon: 'icon-list'
        }
      ]
    }
  ]
};
