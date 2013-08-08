define(["dojo/on", "dojo/keys" ,"dojo/dom-construct", "dojo/_base/array", "dojo/_base/declare","dojo/_base/lang","dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/request",
    "widget/SuggestionWiget/SuggestionItem/SuggestionItem.js"],
    function(on,keys,domConstruct, arrayUtil, declare, lang, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, request, SuggestionItem){
        return declare([_WidgetBase, _TemplatedMixin], {
            _inputNode: null,
            _suggestionsNode: null,
            _suggestionItemsList: [],
            _currentItemIndex: null,

            templateString: template,
            baseClass: "suggestionWidget",

            _autoCompleteItems: null,

            _handleKeyUp: function(event) {

                switch(event.charOrCode) {
                    case keys.UP_ARROW: this._moveSelectionUp();break;
                    case keys.DOWN_ARROW: this._moveSelectionDown(); break;

                    default: this._loadItems();
                }

                //TO DO:
                //handle arrows
                //handle escape
                //handle enter

            },

            _moveSelectionUp: function() {
              if (! this._hasSuggestions()) {
                  return;
              }
              if (this._currentItemIndex == null) {

              }
            },

            _moveSelectionDown: function() {

            },

            _hasSuggestions: function() {
              return this._suggestionItemsList != null && this._suggestionItemsList.length > 0;
            },

            _loadItems: function() {
                var me = this;
                if (this._autoCompleteItems == null) {
                    request("data/words.json", {
                        handleAs: "json"
                    }).then(function(words) {
                        console.log(words);
                        me._autoCompleteItems = words;
                        me._fillSuggestions();
                    });
                } else {
                    this._fillSuggestions();
                }
            },

            _autoCompleteStart: function() {
            },

            _fillSuggestions: function() {
                this._emptySuggestions();
                var searchText = this._inputNode.value;
                var me = this;
                arrayUtil.forEach(this._autoCompleteItems, function(item, index){
                    if (item.indexOf(searchText) == 0) {
                        var itemWidget = new SuggestionItem({suggestionText : item});
                        me._suggestionItemsList.push(itemWidget);
                        itemWidget.placeAt(me._suggestionsNode, "last");
                    }
                });
                this._showDropDown();
            },

            _emptySuggestions: function() {
                this._suggestionItemsList = [];
                domConstruct.empty(this._suggestionsNode);
            },

            _showDropDown: function() {
                domStyle.set(this._suggestionsNode, "position", "relative");
                domStyle.set(this._suggestionsNode, "display","block");
            },

            _hideDropDown: function() {
                domStyle.set(this._suggestionsNode, "display","none");
            },

            setAutoCompleteItems: function(words) {
                this._autoCompleteItems = words;
            },


            postCreate: function(){
                this.inherited(arguments);
                this.own(
                    on(this._inputNode, "keyup", lang.hitch(this, this._handleKeyUp))
                );
            }

        });
});
