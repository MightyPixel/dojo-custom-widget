define(["dojo/on", "dojo/_base/declare","dojo/_base/lang","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/request"],
    function(on, declare, lang, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, request){
        return declare([_WidgetBase, _TemplatedMixin], {
            _inputNode: null,
            _suggestionsNode: null,

            templateString: template,
            baseClass: "suggestionWidget",

            _autoCompleteItems: null,

            _handleKeyUp: function(event) {
                if (this._autoCompleteItems == null) {
                    request("data/words.json", {
                        handleAs: "json"
                    }).then(function(words) {
                        this.setAutoCompleteItems(words);
                        this._fillSuggestions();
                    });
                }
                this._fillDropDown();
            },

            _autoCompleteStart: function() {
            },

            _fillSuggestions: function() {
                //TO DO: find matches
                this._showDropDown();
            },

            _showDropDown: function() {
                domStyle.set(domNode, "position", "relative");
                domStyle.set(domNode, "display","block");
            },

            _hideDropDown: function() {
                domStyle.set(suggestionsNode, "display","none");
            },

            setAutoCompleteItems: function(words) {
                this._autoCompleteItems = words;
            },


            postCreate: function(){
                this.inherited(arguments);
                console.log(this.inputNode);

                this.own(
                    on(this._inputNode, "keyup", lang.hitch(this, this._handleKeyUp))
                );
            }

        });
});
