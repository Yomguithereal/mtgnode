var cheerio = require('cheerio'),
    request = require('request'),
    async = require('async')
    fs = require('fs');

var setConversion = {
  'LEA': 'al',
  'LEB': 'be',
  'ARN': 'an',
  '2ED': 'un',
  'ATQ': 'aq',
  '3ED': 'rv',
  'LEG': 'lg',
  'DRK': 'dk',
  'FEM': 'fe',
  '4ED': '4e',
  'ICE': 'ia',
  'CHR': 'ch',
  'HML': 'hl',
  'ALL': 'ai',
  'MIR': 'mr',
  'VIS': 'vi',
  '5ED': '5e',
  'POR': 'po',
  'WTH': 'wl',
  'TMP': 'tp',
  'STH': 'sh',
  'PO2': 'po2',
  'EXO': 'ex',
  'UGL': 'ug',
  'USG': 'us',
  'ULG': 'ul',
  '6ED': '6e',
  'PTK': 'p3k',
  'UDS': 'ud',
  'S99': 'st',
  'MMQ': 'mm',
  'BRB': 'br',
  'NMS': 'ne',
  'S00': 'st2k',
  'PCY': 'pr',
  'BTD': 'bd',
  'INV': 'in',
  'PLS': 'ps',
  '7ED': '7e',
  'APC': 'ap',
  'ODY': 'od',
  'TOR': 'tr',
  'JUD': 'ju',
  'ONS': 'on',
  'LGN': 'le',
  'SCG': 'sc',
  '8ED': '8e',
  'MRD': 'mi',
  'DST': 'ds',
  '5DN': '5dn',
  'CHK': 'cok',
  'UNH': 'uh',
  'BOK': 'bok',
  'SOK': 'sok',
  '9ED': '9e',
  'RAV': 'rav',
  'GPT': 'gp',
  'DIS': 'di',
  'CSP': 'cs',
  'TSP': 'ts',
  'PLC': 'pc',
  'FUT': 'fut',
  '10E': '10e',
  'LRW': 'lw',
  'EVG': 'evg',
  'MOR': 'mt',
  'SHM': 'shm',
  'EVE': 'eve',
  'DRB': 'fvd',
  'ALA': 'ala',
  'DD2': 'jvs',
  'CON': 'cfx',
  'DDC': 'dvd',
  'ARB': 'arb',
  'M10': 'm10',
  'V09': 'fve',
  'ZEN': 'zen',
  'DDD': 'gvl',
  'H09': 'pds',
  'WWK': 'wwk',
  'DDE': 'pvc',
  'ROE': 'roe',
  'M11': 'm11',
  'V10': 'fvr',
  'DDF': 'evt',
  'SOM': 'som',
  'PD2': 'pd2',
  'MBS': 'mbs',
  'DDG': 'kvd',
  'NPH': 'nph',
  'CMD': 'cmd',
  'M12': 'm12',
  'V11': 'fvl',
  'DDH': 'avn',
  'ISD': 'isd',
  'PD3': 'pd3',
  'DKA': 'dka',
  'DDI': 'vvk',
  'AVR': 'avr',
  'M13': 'm13',
  'V12': 'v12',
  'DDJ': 'ivg',
  'RTR': 'rtr',
  'CMA': 'cma',
  'GTC': 'gtc',
  'SVT': 'svt',
  'DGM': 'dgm',
  'MMA': 'mma',
  'M14': 'm14',
  'THS': 'ths'
}

var toScrap = [
  'LEA',
  'LEB',
  'ARN',
  '2ED',
  'ATQ',
  '3ED',
  'LEG',
  'DRK',
  'FEM',
  '4ED',
  'ICE',
  'CHR',
  'HML',
  'ALL',
  'MIR',
  'VIS',
  '5ED',
  'POR',
  'WTH',
  'TMP',
  'STH',
  'PO2',
  'BRB',
  'S00',
  'BTD'
]

var editions = {};

function scrapOne(ed, callback) {
  editions[ed] = [];
  request(
    'http://magiccards.info/'+setConversion[ed]+'/en.html',
    function(error, response, body) {

      // Loading into cheerio
      var $ = cheerio.load(body);

      $('td[align=right]').each(function(i) {
        var nb = +$(this).text();

        if (!isNaN(nb)) {
          var cardName = $(this).parent().children('td').eq(1).text();
          editions[ed][nb] = cardName;
        }
      });

      callback();
    }
  );
}

var q = async.queue(function (task, callback) {
  scrapOne(task, callback);
}, 5);

q.drain = function() {
  fs.writeFileSync('./db/Numbers.json', JSON.stringify(editions));
  console.log('Finished.');
}

toScrap.map(function(ed){
  q.push(ed, function(err){});
});



