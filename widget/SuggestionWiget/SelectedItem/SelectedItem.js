define(["dojo/_base/declare",
        "dojo/dom",
        "dojo/on",
        "dojo/dom-construct",
        "dijit/registry",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/dom-style",
        "dojo/_base/lang",
        "dojo/text!./SelectedItem.html"],
    function(declare,
             dom,
             on,
             domConstruct,
             registry,
             _WidgetBase,
             _TemplatedMixin,
             domStyle,
             lang,
             template){
        return declare([_WidgetBase, _TemplatedMixin], {
            _selectedItemTextNode: null,
            _removeItemButton: null,

            selectedItemText: "Selected",
            templateString: template,

            baseClass: "selectedItem",

            callForDeletion: function() {
                console.log(this.domNode.containerNode);//.removeSelectedItem(me);
                domConstruct.destroy(this.domNode.id);
            },

            postCreate: function() {
                this.inherited(arguments);
                console.log(dijit);
                this.own(
                    on(this._removeItemButton, "click", lang.hitch(this, this.callForDeletion))
                );
            }

        });
});
