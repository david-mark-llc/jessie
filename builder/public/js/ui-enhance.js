var uiEnhance = {

  // Adds disabled-cue and "toggle all" for Constructors' prototype methods
  "constructorMethodCheckboxes": (function () {
    var doc = document
      , methodsListIdPrefix = "methods-"
      , constructorCheckboxIdPrefix = "constructor-"
      , toggleAllCheckboxIdPrefix = "toggle-all-"
      , constructorCheckboxGroups = {};

    function countChecked(boxes) {
      var result = 0;
      for (var idx=0, len=boxes.length; idx<len; ++idx) {
        if (boxes[idx].checked) {
          result += 1;
        }
      }
      return result;
    }

    function insertToggleAllBox(list, constructorName) {
      if (!list) {return;}
      var frag = doc.createDocumentFragment()
        , checkbox = doc.createElement("input")
        , label = doc.createElement("label")
        , labelText = doc.createTextNode(" All");
      checkbox.type = "checkbox";
      checkbox.id = toggleAllCheckboxIdPrefix+constructorName;
      label.setAttribute("for", checkbox.id);
      frag.appendChild(checkbox);
      label.appendChild(labelText);
      frag.appendChild(label);
      list.parentNode.insertBefore(frag, list);
    }

    // (un)?check all methods
    function toggleMethodCheckboxes(constructorName) {
      var checkBoxGroup = constructorCheckboxGroups[constructorName];
      if (!checkBoxGroup) {return;}
      for (var idx=0, len=checkBoxGroup.methods.length; idx<len; ++idx) {
        var box = checkBoxGroup.methods[idx];
          box.checked = checkBoxGroup.toggleMethods.checked;
      }
    }

    // sync constructor checkbox with method (and toggleMethods) boxes
    function syncDisabled(constructorName) {
      var checkboxGroup = constructorCheckboxGroups[constructorName];
      if (!checkboxGroup) {return;}
      var boxes = checkboxGroup.methods.concat(checkboxGroup.toggleMethods);
      for (var idx=0, len=boxes.length; idx<len; ++idx) {
        boxes[idx].disabled = !checkboxGroup.constructor.checked;
      }
    }

    // sync method boxes with the toggleMethods box
    function syncToggleAll(constructorName) {
      var checkboxGroup = constructorCheckboxGroups[constructorName];
      if (!checkboxGroup) {return;}
      checkboxGroup.toggleMethods.checked = countChecked(checkboxGroup.methods) == checkboxGroup.methods.length;
    }

    // get the prototype method checkboxes for a constructor
    function getMethodCheckboxes(methodList, constructorName) {
      var checkboxes = []
        , inputs = methodList.getElementsByTagName("input");
      for (var idx=0, len=inputs.length, item; idx<len; ++idx) {
        item = inputs[idx];
        if (item.type.toLowerCase()=="checkbox" && item.name.lastIndexOf(constructorName+"#")==0) {
          checkboxes.push(item);
        }
      }
      return checkboxes;
    }

    return function (constructorName) {
      var methodList = doc.getElementById(methodsListIdPrefix+constructorName);
      insertToggleAllBox(methodList, constructorName);
      var constructorCheckboxId = constructorCheckboxIdPrefix+constructorName
        , constructorCheckbox = doc.getElementById(constructorCheckboxId)
        , toggleMethods = doc.getElementById(toggleAllCheckboxIdPrefix+constructorName)
        , methodCheckboxes = getMethodCheckboxes(methodList, constructorName);

      // register related checkbox elements
      constructorCheckboxGroups[constructorName] = {
        "constructor": constructorCheckbox
        , "toggleMethods": toggleMethods
        , "methods": methodCheckboxes
      };

      // toggling all methods for a constructor
      toggleMethods.onclick = function () {
        var toggler = this
          , constructorName = toggler.id.replace(toggleAllCheckboxIdPrefix, "");
        toggleMethodCheckboxes(constructorName);
      };

      // syncing the toggle-all box with the list of boxes for methods
      methodList.onclick = function (e) {
        var target = e.target || e.srcElement
          , constructorName = "string" == typeof target.name && target.name.replace(/#\w+$/, "");
        syncToggleAll(constructorName);
      };

      // (dis|en)able associated prototype methods from constructor's checkbox
      constructorCheckbox.onclick = function () {syncDisabled(this.name);};
      syncDisabled(constructorName); // run (dis|en)abler routine once
    };

  })()

};
