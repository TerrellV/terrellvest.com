(function(){

  console.log('helper js loaded');

  var postModule = {
    cacheDom: function(){
      this.articleEle = document.querySelector('article');
      this.postTitleEle = document.querySelector(".subhead h1");
    },
    render: function(){
      this.setArticlePosition();
    },
    setArticlePosition: function(){
      var w = window.innerWidth;
      var isOutside = undefined;
      var firstOutside = false;
      if (w > 750 && w < 1000 ) {
        trigger = false;
        var h = this.postTitleEle.clientHeight;
        // 16 = top margin of main tag
        var val = "-"+ (h + 18) + "px";
        this.articleEle.style.marginTop = val;
      } else {
        this.articleEle.style.marginTop = 0;
        if (this.articleEle.style.marginTop > 0) {
          console.log('it has a marginTop');
        }
      }

    },
    addEventListeners: function(){
      window.addEventListener('resize', this.setArticlePosition.bind(this));
    },
    init: function(){
      this.cacheDom();
      this.render();
      this.addEventListeners();
    }

  }

  postModule.init();


})()
