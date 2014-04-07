// Getting some info about sets on magiccards.info
var request = require('request'),
    cheerio = require('cheerio');

var url = 'http://magiccards.info/sitemap.html',
    scraped = {};

request.get(url, function(err, response, body) {
  var $ = cheerio.load(body);

  $('h2').each(function() {
    var lang = $(this).children('small').eq(0).text();

    scraped[lang] = {};

    $(this).next('table').find('small').each(function() {
      var enEdition = $(this).prev('a').attr('href').split('/')[1];
      scraped[lang][enEdition] = $(this).text();
    });

    finished();
  });
});


function finished() {
  var fs = require('fs');

  fs.writeFileSync('done.json', JSON.stringify(scraped), 'utf-8');
}
