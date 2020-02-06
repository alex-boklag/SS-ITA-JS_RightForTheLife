//export const BE_URL = 'http://localhost:4000';
export const BE_URL = 'http://192.168.0.105:4000';

export const API = Object.freeze({
  ANIMALS: {
    name: 'ANIMALS',
    // api: `${BE_URL}/animals`,
    api: 'https://maksv21.github.io/softserve/animals/',
  },
  NEWS: {
    name: 'NEWS',
    api: `${BE_URL}/news`,
  },
  HAPPY_STORIES: {
    name: 'HAPPY_STORIES',
    api: `${BE_URL}/happyStories`,
  },
  DONATE: {
    name: 'DONATE',
    api: `${BE_URL}/donate`,
  },
  SUPPLIES: {
    name: 'SUPPLIES',
    api: `${BE_URL}/supplies`,
  },
  ABOUT_US: {
    // name: 'ABOUT_US',
    name: 'https://maksv21.github.io/softserve/about',
    api: `${BE_URL}/about`,
  },
  EMERGENCY_HELP: {
    name: 'EMERGENCY_HELP',
    api: `${BE_URL}/emergency`,
  },
  REPORTS: {
    name: 'REPORTS',
    api: 'https://raw.githubusercontent.com/protonaby/demo3-animal-shelter/master/db/reports_common.json',
  },
});
