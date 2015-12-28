
(function(){
    
  var busHtml = '<div><a href="/portfolio/master-your-money"><p>Master Your Money</p><span>May 20, 2015</span></a></div><div><a href="/portfolio/entrepreneur-workshop"><p>Entrepreneur Workshop</p><span>December 4, 2015</span></a></div>';
    
  var webHtml = '<div><a href="/portfolio/personal-website"><p>Personal Website</p><span>December 24, 2015</span></a></div><div><a href="/portfolio/twitch-viewer"><p>Twitch Viewer</p><span>June 24, 2015</span></a></div>';
    
  function app(){
  var portModule = {
    isBizActive: true,
    init: function(){
      this.cacheDom();
      this.bindEvents();
      this.render();
      this.getLengths();
    },
    cacheDom: function(){
      this.main = document.getElementById('posts-in-category');
      this.bHeading = document.getElementById('cat-one-title');
      this.wHeading = document.getElementById('cat-two-title');
      this.slider = document.getElementById('slider');
    },
    getLengths: function(){
      this.wCW = this.wHeading.clientWidth;
      this.bCW = this.bHeading.clientWidth;
    },
    bindEvents: function(){
      this.bHeading.addEventListener('click',this.handleBizClick.bind(this));
      this.wHeading.addEventListener('click',this.handleWebClick.bind(this));
    },
    handleBizClick:function(){
      this.switchPage();
      this.moveSliderLeft();
    },
    handleWebClick:function(){
      this.switchPage();
      this.moveSliderRight();
    },
    render: function(){
      var htmlToInsert = (this.isBizActive)? busHtml : webHtml;
      this.main.innerHTML = htmlToInsert;
      this.isBizActive = !this.isBizActive;
    },
    switchPage: function(){
      console.log('switching');
      this.render();
    },
    moveSliderRight: function(a,b){
      // val = offsetLeft of web title
      this.slider.classList.toggle('right-slider');
    },
    moveSliderLeft: function(a,b){
      this.slider.classList.toggle('right-slider');
    }
  }
  portModule.init();
};
    
  if(typeof document !== undefined) {
    
    app();
    
    console.log('we in the Browser');
    
  }

    
})()