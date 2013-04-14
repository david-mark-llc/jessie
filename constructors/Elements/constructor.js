/* */


if (query) {
	var Elements = function(nodes, rootNode) {		
		if (!(this instanceof Elements) {
			return new Elements( nodes, rootNode );
		}
		
		if ('string' == typeof nodes) {
			if (1 === rootNode.nodeType) {
				nodes = queryElement(nodes, rootNode);
			} else {
				nodes = query(nodes, rootNode);				
			}
		}
		
		this.getNodes = function() {
			return nodes.slice(0);
		}
		
		this.getRootNode = function() {
			return rootNode;
		}
		
		this.load = function(nodes, rootNode) {
			
		}
	};
}