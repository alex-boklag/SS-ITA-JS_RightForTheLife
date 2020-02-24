export const UploadImages = (inputFiles, setProgress) =>
  new Promise(resolve => {
    const data = new FormData();
    const files = [...inputFiles];
    const links = [];

    files.forEach(file => {
      data.set('image', file);

      fetch(
        'https://api.imgbb.com/1/upload?key=d0cdfe1b182d9f6c3d98eedd10838d28',
        {
          method: 'POST',
          body: data,
        },
      )
        .then(res => res.json())
        .then(json => {
          links.push(json.data.url);
          if (setProgress) {
            setProgress(Math.round((links.length / files.length) * 100));
          }
          if (links.length === files.length) {
            resolve(links);
          }
        })
        .catch(err => {
          throw new Error(err);
        });
    });
  });
