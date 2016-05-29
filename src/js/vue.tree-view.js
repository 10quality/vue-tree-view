/**
 * Tree view.
 * Vue Component.
 *
 * @author Alejandro Mostajo <http://about.me/amostajo>
 * @copyright 10Quality <http://www.10quality.com>
 * @license MIT
 * @version 1.0.0
 */
Vue.component('treeview', Vue.extend({
    template: '<div class="treeview {{class}}"><div class="node-data" v-for="(index, node) in tree"><div class="node" :class="{\'active\': node.isSelected}" @click.prevent="select(index, node[valuename])"><span class="icon node-parent-toggled" v-if="isValidNodes(node[children]) && node.isOpened"><svg viewBox="0 0 35 35"><g transform="translate(0,-1017.3621)"><path class="back" d="m 2.1411424,1026.4693 0,23.4146 27.0189286,0 0,-23.4146 -13.937805,0 0,-2.7898 -9.2657958,0 0,2.7898 z"/><path class="front" d="m 1,1051.3621 7,-19 2,0 1,-2 6,0 -1,2 19,0 -4.472399,18.9369 z"/><path class="light" d="m 29.696699,1047.0363 -0.820749,3.0631 -6,0 0.757614,-3"/></g></svg> </span><span class="icon node-parent" v-if="isValidNodes(node[children]) && !node.isOpened"><svg width="14" height="14" viewBox="0 0 35 35"><g transform="translate(0,-1017.3621)"><path class="fill" d="m 1,1026.1835 0,25.1786 33,0 0,-25.1786 -18.857143,0 0,-3 -10.017857,0 0,3 z"/><path class="light" d="m 32,1046.1625 0,3 -6,0 0,-3 6,0"/></g></svg> </span><span class="icon node" v-if="!isValidNodes(node[children])"><svg width="8" height="8" viewBox="0 0 35 35"><g transform="translate(0,-1017.3622)"><circle cx="17.488264" cy="1034.874" r="16.003242"/></g></svg></span><label>{{node[labelname]}}</label></div><div v-if="isValidNodes(node[children])" class="children" v-show="node.isOpened"><div class="margin"></div><div class="nodes"><treeview :id="id" :value.sync="value" :labelname="labelname" :valuename="valuename" :children="children" :tree="node[children]" class="inner"></treeview></div></div></div></div>',
    props:
    {
        /**
         * Unique identifier for treeview.
         * @since 1.0.0
         * @var string
         */
        id:
        {
            Type: String,
            default: 'tv_' + Math.ceil(Math.random()*100000),
        },
        /**
         * Value of the selected node in the tree.
         * @since 1.0.0
         * @var mixed
         */
        value: [String, Number],
        /**
         * Initial tree composition.
         * @since 1.0.0
         * @var array
         */
        tree:
        {
            Type: Array,
            default: [],
        },
        /**
         * Additional CSS class to apply to component.
         * @since 1.0.0
         * @var string
         */
        class:
        {
            Type: String,
            default: '',
        },
        /**
         * Name of the child nodes property.
         * @since 1.0.0
         * @var string
         */
        children:
        {
            Type: String,
            default: 'nodes',
        },
        /**
         * Name of the property holding the node name.
         * @since 1.0.0
         * @var string
         */
        labelname:
        {
            Type: String,
            default: 'label',
        },
        /**
         * Name of the property holding the node value.
         * @since 1.0.0
         * @var string
         */
        valuename:
        {
            Type: String,
            default: 'value',
        },
    },
    data: function() {
        return {
            /**
             * Selected node index.
             * @since 1.0.0
             * @var int
             */
            selectedIndex: -1,
        };
    },
    methods:
    {
        /**
         * Selects a node from tree view.
         * @since 1.0.0
         *
         * @param int   index Tree index selected.
         * @param mixed value Value selected.
         */
        select: function(index, value)
        {
            // Unselect from current level, children and parents
            this.unselectTree();
            this.toggleOpen(index);
            this.$set('selectedIndex', index);
            this.$set('tree['+index+'].isSelected', true);
            this.$set('value', value);
            // Call to event.
            this.$dispatch('treeview_click', {
                label: this.tree[this.labelname],
                value: this.tree[this.valuename],
            });
        },
        /**
         * Unselects selected index.
         * Calls children too.
         * @since 1.0.0
         */
        unselect: function()
        {
            for (var i in this.$children) {
                this.$children[i].unselect();
            }
            if (this.selectedIndex < 0) return;
            this.$set('tree['+this.selectedIndex+'].isSelected', false);
            this.selectedIndex = -1;
        },
        /**
         * Calls root parent unselect function.
         * @since 1.0.0
         */
        unselectTree: function()
        {
            for (var i in this.$root.$children) {
                if (this.$root.$children[i].id != undefined
                    && this.$root.$children[i].id == this.id
                ) {
                    this.$root.$children[i].unselect();
                }
            }
        },
        /**
         * Toggles open / close node.
         * @since 1.0.0
         *
         * @param int index Index to open
         */
        toggleOpen: function(index)
        {
            // Return if no children
            if (!this.isValidNodes(this.tree[index][this.children]))
                return;
            // Init
            if (this.tree[index].isOpened == undefined)
                this.$set('tree['+index+'].isOpened', false);
            // General
            this.$set('tree['+index+'].isOpened', !this.tree[index].isOpened);
        },
        /**
         * Returns flag indicating if nodes are valid or not.
         * @since 1.0.0
         *
         * @param array nodes Nodes to validate.
         */
        isValidNodes: function(nodes)
        {
            return nodes != undefined
                && Object.prototype.toString.call(nodes) === '[object Array]'
                && nodes.length > 0;
        },
    },
}));