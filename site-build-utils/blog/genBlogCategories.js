import path from 'path';

/* ABOUT FILE
 * function loops through the blog posts array and generates a lists of categories that exist
 * categories are only generated once and are all lowercase
*/
export default function genBlogCategories(postBankArray) {
  return postBankArray
    .reduce((categoryArr, postObj, i) => {
      if (postObj.categories && postObj.categories.length > 0) {

        const newCategories = postObj.categories
          .map(category => category.toLowerCase())
          .filter(category => {
            return categoryArr.indexOf(category) === -1
          });

        const categoriesToAdd = removeDuplicates(newCategories);

        function removeDuplicates(arr=[]) {
          return arr.reduce((newArr, category, index) => {
            const allButCat = newArr.filter(cat => cat !== category);
            return allButCat.concat(category);
          }, arr);
        }

        return categoryArr.concat(categoriesToAdd);
      }

      return categoryArr;
    }, [])
}
