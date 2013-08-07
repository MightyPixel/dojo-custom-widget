define(["dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./SuggestionItem.html"],
    function(declare, _WidgetBase, _TemplatedMixin, template){
        return declare([_WidgetBase, _TemplatedMixin], {
            suggestionTextNode: null,

            suggestionText: "Suggestion",
            templateString: template,

            baseClass: "suggestionItem",
        });
});
