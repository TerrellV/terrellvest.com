if ( typeof document !== undefined) {
  console.log('browser should be loaded we should be fine',document);
  let aPageElementIds = [
    { path:
      { val:"/", id:"about-link" },
    },
    { path:
      { val:"/portfolio", id:"portfolio-link" },
    },
    { path:
      { val:"/blog", id:"blog-link" },
    }
  ]


  function styleActiveNavLink(classString){
    // establish values
    let currentPath = document.location.pathname;

    // get <nav/> dom element of based on loaded page
    let id = aPageElementIds.filter( o => o.path.val === currentPath)[0]["path"]["id"];
    let domEle = document.getElementById(id);

    // style dom element
    domEle.className = classString;
  }

  function styleAllNavLinks(classString){
    // get all <nav/> dom elements
    let domEles = document.querySelector('ul.navList').childNodes;

    // change class of all dom elements
    for(let i = 0; i < domEles.length; i++) {
      let a = domEles[i].childNodes;
      a[0].className = classString;
    }
  }

  // set all elements to innactive
  styleAllNavLinks("inactive");

  // // set one element to active
  styleActiveNavLink("active")
}
