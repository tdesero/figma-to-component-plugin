export function getTreeElementByName(tree, name): any {
  function searchTree(element, name) {
    if (element.name === name) {
      return element;
    } else if (element.children != null) {
      var i: number;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree(element.children[i], name);
      }
      return result;
    }
    return null;
  }

  return searchTree(tree, name);
}
