const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: '/free-time-finder',
  title: 'Tucker.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Tucker Bendix',
  role: 'lol',
  description:
    'Welcome to my page.',
  resume: 'https://example.com',
  social: {
    linkedin: 'https://linkedin.com/in/tucker-bendix/',
    github: 'https://github.com/tmb5cg',
  },
}

const autocropper = {
  // all the properties are optional - can be left empty or deleted
  title: 'Autocropper',
  description:
    'This tool automatically extracts individual cropped photos from your uploaded photo.',
  subhead: '',
  social: {
    linkedin: 'https://linkedin.com/in/tucker-bendix/',
    github: 'https://github.com/tmb5cg',
  },
}

const autobid = {
  // all the properties are optional - can be left empty or deleted
  title: 'FIFA 22 Autobidder',
  description:
    'This tool automatically extracts individual cropped photos from your uploaded photo.',
  subhead: '',
  social: {
    linkedin: 'https://linkedin.com/in/tucker-bendix/',
    github: 'https://github.com/tmb5cg',
  },
}


const projects = [
  // projects can be added an removed
  // if there are no projects, Projects section won't show up
  {
    name: 'Autocropper.io',
    description:
      'The only web tool that will auto crop scanned photos in one pass - multiple photos in a single scan. The best way to scan a lot of photos.',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: '/autocropper',
  },
  {
    name: 'FIFA 22 Trading Bot',
    description:
      "Selenium bot that autobids and autobuys players on FIFA 22 Ultimate Team's transfer market. User configurable settings, advanced logging and performance monitoring, robust error reporting. Open source, free.",
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: '/fifa-autobidder',
  },
  {
    name: 'FreeTimeFinder',
    description:
      'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    name: 'InstaBot',
    description:
      'Instagram bot that scrapes memes from r/programmerhumor and posts to @dankcsmemes daily',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    name: 'Monkeypox Vaccine Appointment Finder',
    description:
      'Scrapes NYS vaccine appointment portal and alerts updates via SMS',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
  {
    name: 'ConEd API',
    description:
      'Logs energy usage by listening to ConEd user portal',
    stack: ['SASS', 'TypeScript', 'React'],
    sourceCode: 'https://github.com',
    livePreview: 'https://github.com',
  },
]

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'Python',
  'PostgreSQL, SQL',
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Git',
  'CI/CD',  'Visual Studio Code', ''
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'tuckerbendix@icloud.com',
}

export { header, autocropper, about, projects, skills, contact, autobid }
