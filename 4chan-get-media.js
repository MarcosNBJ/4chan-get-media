const axios = require('axios');
const cheerio = require('cheerio');

exports.get_thread_media = (threadUrl) => {
  const mediaList = [];
  return axios.get(threadUrl)
      .then(function(response) {
        const $ = cheerio.load(response.data);
        $('div.postContainer').each((i, elem) => {
          const media = $(elem).find('.fileThumb');
          if (media.length) {
            mediaList.push({
              thumbnail: 'https:'+ media.find('img').attr('src'),
              url: 'https:'+ media.attr('href'),
            });
          }
        });
        return mediaList;
      }, (error) => console.log(error) );
};
