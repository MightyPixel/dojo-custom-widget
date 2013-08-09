define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/dom-style",
        "dojo/text!./SuggestionItem.html"],
    function(declare,
             _WidgetBase,
             _TemplatedMixin,
             domStyle,
             template){
        return declare([_WidgetBase, _TemplatedMixin], {
            suggestionText: "Suggestion",
            templateString: template,

            baseClass: "suggestionItem",

            select: function() {
                domStyle.set(this.domNode, "backgroundColor", "red");
            },

            diselect: function() {
                domStyle.set(this.domNode, "backgroundColor", "white");
            }

        });
});
