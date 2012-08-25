var HostObject = (function () {
	var typeExpr = /^(function|object)$/i;
	return {
		"hasMethod": function (o, m) {
			var t = typeof o[m];
			return !!((typeExpr.test(t) && o[m]) || t == "unknown");
		}
		, "hasProp": function (o, p) {
			return !!(typeExpr.test(typeof o[p]) && o[p]);
		}
	};
})();

!(function (win) {
	var doc = win.document
		, html = HostObject.hasProp(doc, "documentElement") && doc.documentElement
		, hasClass;

	if (html && 'string' == typeof html.className) {
		hasClass = function (el, className) {
			return (new RegExp('(^|\\s)' + className + '(\\s|$)')).test(el.className);
		};
	}

	if (!hasClass) {
		return;
	}

	if (!doc.body && HostObject.hasMethod(doc.body, "getElementsByTagName")) {
		return;
	}

	if (!HostObject.hasMethod(doc, "createElement")) {
		return;
	}

	function ButtonRow() {
		var leftCell = doc.createElement("td")
			, radioCell = doc.createElement("td")
			, rightCell = doc.createElement("td");
		this.row = doc.createElement("tr");
		leftCell.innerHTML = "None";
		this.radio = doc.createElement("input");
		this.radio.type = "radio";
		this.radio.value = -1;
		rightCell.colSpan = 2;
		this.row.appendChild(leftCell);
		radioCell.appendChild(this.radio);
		this.row.appendChild(radioCell);
		this.row.appendChild(rightCell);
	}

	function appendButtonRow(table) {
		var firstRadio = findFirstRadioRadioButton(table);
		if (!findFirstRadioRadioButton) {return;}
		increaseRowSpanOnFirstCell(table);
		var buttonRow = new ButtonRow();
		buttonRow.radio.name = firstRadio.name;
		table.getElementsByTagName("tbody")[0].appendChild(buttonRow.row);
	}

	function increaseRowSpanOnFirstCell(table) {
		table.rows[0].cells[0].rowSpan += 1;
	}

	function findFirstRadioRadioButton(parent) {
		var inputs = parent.getElementsByTagName("input")
			, result = [];
		for (var input, idx=0, len=inputs.length; idx<len; ++idx) {
			input = inputs[idx];
			if (input.type.toLowerCase()=="radio") {
				return input;
			}
		}
	}

	var form = doc.forms[0]
		, tables = doc.getElementsByTagName("table");

	for (var table, idx=0, len= tables.length; idx<len; ++idx) {
		table = tables[idx];
		if (hasClass(table, "function-options")) {
			appendButtonRow(table);
		}
	}

})(this);
