export const homepageData = {
  url:          'https://preludeelectronics.com/',
  titlePattern: /Home/i,

  audioEngineering: {
    heading:        'Audio Engineering',
    speakerSystems: 'Speaker Systems',
    speakerItems:   ['Active speakers', 'Passive speakers', 'Two-way systems', 'Three-way systems'] as string[],
    enclosures:     'Acoustic Enclosures',
    enclosureItems: ['Bass-reflex (ported)', 'Sealed enclosures', 'Transmission line (T-Line)'] as string[],
    electronics:    'Audio Electronics',
    electronicsItems: ['Analog amplifiers', 'Digital amplifiers', 'Passive crossover networks'] as string[],
  },

  softwareEngineering: {
    heading:          'Software Engineering',
    introText:        /reliability, performance and long-term scalability/i,
    automationLabel:  'Automation Systems',
    automationItems:  ['Process automation', /Integration with hardware/i] as (string | RegExp)[],
    webDevLabel:      'Web Development',
    webDevItems:      ['Custom business websites', 'Web applications', 'Backend services and APIs'] as string[],
    architectureLabel: 'System Architecture',
    architectureItems: ['Scalable software architecture'] as string[],
    desktopLabel:     'Desktop Applications',
    desktopItems:     ['Custom desktop tools'] as string[],
  },

  electronicsEngineering: {
    heading:      'Electronics Engineering',
    introText:    /custom electronic systems from concept to implementation/i,
    categories:   ['Power Electronics', 'Communication Systems', 'Control Systems'] as string[],
    audioItems:   ['Signal processing circuits'] as string[],
    powerItems:   ['Power supply design', 'Voltage regulation'] as string[],
    controlItems: ['Embedded controllers', 'Sensor integration'] as string[],
  },
};
