var
data = getGraphData(),
nodes = data.nodes,
links = data.links;

$.each(nodes, function(index, node) {
	node.index = index;
});

function getNodeById(id) {
	return _.find(nodes, { id : id });
}

function getNodeByIndex(index) {
	return nodes[index];
}

function getDependents(node, links) {
	return $.map(_.where(links, { target: node.index }), function(item){
		return getNodeByIndex(item.source);

	});
}

var modules = $.map(nodes, function(node){
	return {
		'id': node.id,
		'dependentCount': getDependents(node,links).length,
		'dependents': getDependents(node,links),
		'isOpen': ko.observable(false)
	};
});

modules = _.sortBy(modules, 'dependentCount').reverse();

var vm = {};

vm.modules = ko.observableArray(modules);

ko.applyBindings(vm);