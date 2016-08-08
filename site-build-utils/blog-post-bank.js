/* SAMPLE: INSERT AN OBJECT INTO THE BELOW ARRAY THAT LOOKS LIKE THIS

  {
    title: 'SOME TITLE',
    date: [YYYY,MM,DD],
    dcr: 'This should be a description of the post. It will serve as a preview.'
  }

*/

const blogPostBank = [
  {
    title: 'Figuring it Out',
    date: [2016,2,25],
    dcr: 'Upon graduating high school I began chasing an idea. I needed to know how I was going to spend the rest of my life. I needed to \"figure it out\".'
  },
  {
    title: '2015 Goals',
    date: [2016,1,1],
    dcr: 'A reflection on the goals I set out to accomplish and the lessons learned along the way.'
  }
];

export default blogPostBank;
