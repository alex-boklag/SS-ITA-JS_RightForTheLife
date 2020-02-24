export const extractVideoIdFromYouTubeLink = link => {
  return link.replace(/.*(watch\?v=|tu\.be\/)/, '');
};
