<<<<<<< HEAD
define(["dojo/on", "dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/request", "dojo/_base/lang"],
    function(on, declare, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, request, lang){
=======
define(["dojo/on", "dojo/_base/declare","dojo/_base/lang","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/request"],
    function(on, declare, lang, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, request){
>>>>>>> f52e996841fbd3c19fb02e0b485d2fd529a568b0
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
<<<<<<< HEAD
=======
                request("data/words.json", {
                    handleAs: "json"
                }).then(this._fillDropDown);
>>>>>>> f52e996841fbd3c19fb02e0b485d2fd529a568b0

                this.own(
                    on(this._inputNode, "keyup", lang.hitch(this, this._handleKeyUp))
                );
            }

        });
});
