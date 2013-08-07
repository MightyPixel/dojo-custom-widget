define(["dojo/on", "dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./SuggestionWidget.html", "dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],
    function(on, declare, _WidgetBase, _TemplatedMixin, template, domStyle, baseFx, lang){
        return declare([_WidgetBase, _TemplatedMixin], {
            inputNode: null,
            suggestionsNode: null,
            templateString: template,
            baseClass: "suggestionWidget",

            autoCompleteItems: [],

            _handleKeyUp: function(event) {
                console.log("button pressed");
            },

            _autoCompleteStart: function() {
            },

            _fillDropDown: function() {

            }

            _openDropDown: function() {
                domStyle.set(domNode, "position", "relative");
                domStyle.set(domNode, "display","block");
            },

            _closeDropDown: function() {
                domStyle.set(suggestionsNode, "display","none");
            }


            postCreate: function(){
                this.inherited(arguments);
                console.log(this.inputNode);
                this.own(
                    on(this.inputNode, "keyup", lang.hitch(this, this._handleKeyUp))
                );
            }

        });
});
