export const BE_URL = 'http://localhost:4000';

export const API = Object.freeze({
  HOME: {
    name: 'HOME',
    api: `${BE_URL}/home`,
  },
  DONATE: {
    name: 'DONATE',
    api: `${BE_URL}/donate`,
  },
  SUPPLIES: {
    name: 'SUPPLIES',
    api: `${BE_URL}/supplies`,
  },
  ANIMALS: {
    name: 'ANIMALS',
    api: `${BE_URL}/animals`,
  },
  HAPPY_STORIES: {
    name: 'HAPPY_STORIES',
    api: `${BE_URL}/happyStories`,
  },
  EMERGENCY_HELP: {
    name: 'EMERGENCY_HELP',
    api: `${BE_URL}/emergencies`,
  },
  NEWS: {
    name: 'NEWS',
    api: `${BE_URL}/news`,
  },
  ABOUT_US: {
    name: 'ABOUT_US',
    api: `${BE_URL}/about`,
  },
  REPORTS: {
    name: 'REPORTS',
    api: `${BE_URL}/reports`,
  },
});
