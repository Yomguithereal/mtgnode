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
    this._template = $('#tpl_card').html();
    this._dummyTemplate = $('#tpl_dummy_card').html();

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

      return Mustache.to_html(this._template, data);
    }

    this.renderDummy = function(){
      return Mustache.to_html(this._dummyTemplate, {side: this._prefix});
    }
  }

  // Exporting
  //-----------
  window.CardTemplate = CardTemplate;
})(Mustache, CardDriver);
