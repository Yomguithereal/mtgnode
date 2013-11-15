/*
| -------------------------------------------------------------------
|  MTGNode Card Templates
| -------------------------------------------------------------------
|
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function(Mustache, Driver, undefined){

  // Templates
  //-----------
  function CardTemplate(id_prefix){

    // Properties
    var self = this;
    this._prefix = id_prefix || 'card';
    this._index = -1;
    this._driver = Driver;

    // Templates
    this._templates = {
      standard: $('#tpl_card').html(),
      dummy: $('#tpl_dummy_card').html(),
      search: $('#tpl_search_card').html()
    }

    // Methods
    this.render = function(card, index_override){
      if(index_override === undefined){
        this._index += 1;
        index = this._index;
      }
      else{
        index = index_override;
      }

      var data = {
        id_prefix: this._prefix,
        number: index,
        multiverseid: card.multiverseid,
        src: this._driver.getUrl(card),
        side: this._prefix
      }

      // Contextual Classes
      if (~card.types.indexOf('Land'))
        data.type = 'land';
      else if (~card.types.indexOf('Enchantment'))
        data.type = 'enchantment';

      return Mustache.to_html(this._templates.standard, data);
    }

    this.renderDummy = function() {
      return Mustache.to_html(this._templates.dummy, {side: this._prefix});
    }

    this.renderSearch = function(card, index_override) {
      return Mustache.to_html(this._templates.search, {
        number: index_override,
        src: this._driver.getUrl(card)
      });
    }
  }

  // Exporting
  //-----------
  window.CardTemplate = CardTemplate;
})(Mustache, CardDriver);
