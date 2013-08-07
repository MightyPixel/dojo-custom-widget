define(["dojo/on", "dojo/dom-construct", "dojo/_base/array", "dojo/_base/declare","dojo/_base/lang","dijit/_WidgetBase",
    "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/request",
    "wiget/SuggestionWiget/SuggestionItem/SuggestionItem.js"],
    function(on, domConstruct, arrayUtil, declare, lang, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, request, SuggestionItem){
        return declare([_WidgetBase, _TemplatedMixin], {
            _inputNode: null,
            _suggestionsNode: null,

            templateString: template,
            baseClass: "suggestionWidget",

            _autoCompleteItems: null,

            _handleKeyUp: function(event) {

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
                        itemWidget.placeAt(me._suggestionsNode, "last");
                    }
                });
                this._showDropDown();
            },

            _emptySuggestions: function() {
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
