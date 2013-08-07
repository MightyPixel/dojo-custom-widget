define(["dojo/on", "dojo/_base/declare","dojo/_base/lang","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/request"],
    function(on, declare, lang, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, request){
        return declare([_WidgetBase, _TemplatedMixin], {
            _inputNode: null,
            suggestionsNode: null,

            templateString: template,
            baseClass: "suggestionWidget",

            autoCompleteItems: [],

            _handleKeyUp: function(event) {
                console.log("button pressed");
            },

            _autoCompleteStart: function() {
            },

            _fillDropDown: function(words) {
                console.log(words);
            },

            _openDropDown: function() {
                domStyle.set(domNode, "position", "relative");
                domStyle.set(domNode, "display","block");
            },

            _closeDropDown: function() {
                domStyle.set(suggestionsNode, "display","none");
            },


            postCreate: function(){
                this.inherited(arguments);
                console.log(this.inputNode);
                request("data/words.json", {
                    handleAs: "json"
                }).then(this._fillDropDown);

                this.own(
                    on(this._inputNode, "keyup", lang.hitch(this, this._handleKeyUp))
                );
            }

        });
});
