export function getTreeElementByProperty(tree, property: string, value): any {
  function searchTree(element, property, value) {
    if (element[property] === value) {
      return element;
    } else if (element.children != null) {
      var i: number;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = searchTree(element.children[i], property, value);
      }
      return result;
    }
    return null;
  }

  return searchTree(tree, property, value);
}
