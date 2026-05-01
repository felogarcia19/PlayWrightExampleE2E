export const navigationData = {
  baseUrl:  'https://preludeelectronics.com/',
  titlePattern: /Home/i,

  /** Labels of every top-nav menu item */
  menuItems: ['Home', 'Software', 'Electronics', 'Audio', 'Contact', 'About'],

  /** Expected URL after clicking each menu item */
  urls: {
    home:        'https://preludeelectronics.com/',
    software:    /what-makes-our-software-unique/,
    electronics: /\/electronics\//,
    audio:       /\/audio\//,
    contact:     /\/159-2\//,
    about:       /\/about\//,
  },

  /** Pattern matched on the h1/h2 of each destination page */
  headings: {
    software:    /SOFTWARE/i,
    electronics: /ELECTRONICS/i,
    audio:       /AUDIO/i,
    contact:     /CONTACT/i,
    about:       /ABOUT/i,
  },

  /** The Home anchor href must end with the root domain */
  homeLinkHrefPattern: /preludeelectronics\.com\/?$/,
};
