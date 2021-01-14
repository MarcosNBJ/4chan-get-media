const axios = require('axios');
const cheerio = require('cheerio');

exports.get_thread_media = (threadUrl) => {
  const mediaList = [];
  axios.get(threadUrl)
      .then(function(response) {
        const $ = cheerio.load(response.data);
        $('div.postContainer').each((i, elem) => {
          const media = $(elem).find('.fileThumb');
          if (media.length) {
            mediaList[i] = {
              thumbnail: 'https:'+ media.find('img').attr('src'),
              url: 'https:'+ media.attr('href'),
            };
          }
        });
      }, (error) => console.log(error) );
  return mediaList;
};
