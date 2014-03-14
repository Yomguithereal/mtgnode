/*
| -------------------------------------------------------------------
|  MTGNode magiccards.info Card Driver
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function(undefined) {

  // Set Conversions
  //-----------------
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
    'HOP': 'pch',
    'ZEN': 'zen',
    'DDD': 'gvl',
    'H09': 'pds',
    'WWK': 'wwk',
    'DDE': 'pvc',
    'ROE': 'roe',
    'M11': 'm11',
    'V10': 'fvr',
    'DDF': 'ddf',
    'SOM': 'som',
    'PD2': 'pd2',
    'MBS': 'mbs',
    'DDG': 'kvd',
    'NPH': 'nph',
    'CMD': 'cmd',
    'M12': 'm12',
    'V11': 'fvl',
    'DDH': 'ddh',
    'ISD': 'isd',
    'PD3': 'pd3',
    'DKA': 'dka',
    'DDI': 'vvk',
    'AVR': 'avr',
    'M13': 'm13',
    'V12': 'v12',
    'DDJ': 'ddj',
    'RTR': 'rtr',
    'CMA': 'cma',
    'GTC': 'gtc',
    'DDK': 'ddk',
    'DGM': 'dgm',
    'MMA': 'mma',
    'M14': 'm14',
    'THS': 'ths',
    'PC2': 'pc2',
    'DDL': 'ddl',
    'C13': 'c13',
    'ARC': 'arc',
    'TSB': 'tsts'
  }

  // Properties
  //------------
  var baseUrl = 'http://magiccards.info/scans/en/';

  // Driver
  //--------
  this.currentDriver = function(card) {
    return baseUrl +
           (setConversion[card.set] || card.set) +
           '/' +
           card.number
           + '.jpg';
  };
}).call(this);
