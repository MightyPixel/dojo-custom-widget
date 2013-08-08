define(["dojo/on",
        "dojo/keys",
        "dojo/dom-construct",
        "dojo/_base/array",
        "dojo/_base/declare",
        "dojo/_base/lang","dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/text!./SuggestionWidget.html",
        "dojo/dom-style",
        "dojo/fx",
        "dojo/request",
        "dojo/dom",
        "widget/SuggestionWiget/SuggestionItem/SuggestionItem.js"],
    function(on,
            keys,
            domConstruct,
            arrayUtil,
            declare,
            lang,
            _WidgetBase,
            _TemplatedMixin,
            template,
            domStyle,
            fx,
            request,
            dom, 
            SuggestionItem){
        return declare([_WidgetBase, _TemplatedMixin], {
            _inputNode: null,
            _suggestionsNode: null,
            _suggestionItemsList: [],
            _currentItemIndex: 0,

            templateString: template,
            baseClass: "suggestionWidget",

            _autoCompleteItems: null,

            _handleKeyUp: function(event) {
                var charOrCode = event.charCode || event.keyCode;
                
                switch(charOrCode) {
                    case keys.UP_ARROW: this._moveSelectionUp();break;
                    case keys.DOWN_ARROW: this._moveSelectionDown(); break;
                    case keys.ESCAPE: this._escapeSuggestions();break;
                    case keys.ENTER:
                        if (this._currentItemIndex === null) {
                            this._enterItem();
                        } else {
                            this._selectCurrentItem();
                        }
                        break;
                    default: this._loadItems();
                }
            },

            _enterItem: function() {
                this._addItem(this._inputNode.value);
                
            },
            
            _selectCurrentItem: function() {
                var selectedItemText = this._suggestionItemsList[this._currentItemIndex].suggestionText;
                this._addItem(selectedItemText);
            },

            _escapeSuggestions: function() {
                console.log("Escaping");
                this._currentItemIndex = null;
                this._emptySuggestions();
            },

            _addItem: function(item) {
                console.log("Adding item " + item);
                this._inputNode.value = '';
                this._hideDropDown();
            },

            _moveSelectionUp: function() {
                if (! this._hasSuggestions()) {
                    return;
                }
                if (this._currentItemIndex === null || this._currentItemIndex === 0) {
                    this._currentItemIndex = this._suggestionItemsList.length - 1;
                } else {
                    this._currentItemIndex =  this._currentItemIndex - 1;
                }
                //this._suggestionItemsList[this._currentItemIndex]. 
            },

            _moveSelectionDown: function() {
                if (! this._hasSuggestions()) {
                    return;
                }
                if (this._currentItemIndex === null || this._currentItemIndex == (this._suggestionItemsList.length - 1)) {
                    this._currentItemIndex = 0;
                } else {
                    this._currentItemIndex =  this._currentItemIndex + 1;
                }
            },

            _hasSuggestions: function() {
                return this._suggestionItemsList !== null && this._suggestionItemsList.length > 0;
            },

            _loadItems: function() {
                var me = this;
                if (this._autoCompleteItems === null) {
                    request("data/words.json", {
                        handleAs: "json"
                    }).then(function(words) {
                        console.log(words);
                        me._autoCompleteItems = words;
                        me._fillSuggestions();
                    });
                } else {
                    me._fillSuggestions();
                    console.log("fillign sugestions");
                }
            },

            _autoCompleteStart: function() {
            },

            _fillSuggestions: function() {
                this._emptySuggestions();
                var searchText = this._inputNode.value;
                var me = this;
                arrayUtil.forEach(this._autoCompleteItems, function(item, index){
                    if (item.indexOf(searchText) === 0) {
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
                //domStyle.set(this._suggestionsNode, "position", "relative");
                //domStyle.set(this._suggestionsNode, "display","block");
                
                // TODO precalculate node size

                fx.wipeIn({ node: this._suggestionsNode }).play();
            },

            _hideDropDown: function() {
                fx.wipeOut({ node: this._suggestionsNode }).play();
                console.log("hiding");
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
