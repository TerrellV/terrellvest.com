// these variables will be inserted
//busHtml && webHtml as strings of html
// everything in this function will be executed

module.exports = function app(){
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
}
