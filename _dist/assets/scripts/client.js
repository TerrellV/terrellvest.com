(function(){
  var portModule = {
    isBizActive: true,
    isFirstLoad: true,
    onMobile: undefined,
    prevSizeMobile: undefined,
    init: function(){
      this.cacheDom();
      this.makeAjaxRequests().then(this.insertLists.bind(this));
      this.bindGenericListeners();
      this.determineEvents();
    },
    cacheDom: function(){
      this.portfolioPostsContainer = document.querySelector('#portfolio-posts');
      this.portfolioHeader = document.querySelector('#portfolio-main header');
      this.bHeading = document.querySelector('#portfolio-main header h1:nth-child(1)');
      this.wHeading = document.querySelector('#portfolio-main header h1:nth-child(2)');
      this.headingsArr = [this.bHeading,this.wHeading];
    },
    bindGenericListeners:function(){
      // these new properties are added because bind creates a new functiona nd we need to hold reference to each specific function so that we can remove the function later. If function.bind was used evertime we used a method as a listener than a new function reference would be used
      this.boundSmBizListener = this.moveSliderLeft.bind(this);
      this.boundSmWebListener = this.moveSliderRight.bind(this);
      this.boundBgBizListener = this.moveSliderUp.bind(this);
      this.boundBgWebListener = this.moveSliderDown.bind(this);
      window.addEventListener('resize', this.determineEvents.bind(this));
    },
    toCamelCase: function(str){
      return str.replace(/-(.)/, function(match,p1,offset,string){
        return p1.toUpperCase()
      })
    },
    makeAjaxRequests: function(){
      var _this = this;
      var stringArr = ['business-list','web-list'];
      var promiseArr = [];

      stringArr.map(function(partial){
        promiseArr.push(new Promise(makeIndivRequest));
        function makeIndivRequest(res,rej){
          var xhr = new XMLHttpRequest();
          xhr.open('GET',`./../assets/html/${partial}.html`,true);
          xhr.onreadystatechange = function(response){
            if(xhr.readyState === 4 && xhr.status === 200) {
              // make value accessable on parent object via this
               _this[_this.toCamelCase(partial)] = xhr.responseText;
               res();
            }
          };
          xhr.send(null);
        }
      })

      return Promise.all(promiseArr);
    },
    insertLists: function(){
      var bizDiv = document.createElement('div');
      bizDiv.setAttribute('id','biz-posts');
      bizDiv.innerHTML = this.businessList;

      var webDiv = document.createElement('div');
      webDiv.setAttribute('id','web-posts');
      webDiv.innerHTML = this.webList;

      webDiv.className = "hide-me";
      this.portfolioPostsContainer.innerHTML = `
        ${bizDiv.outerHTML}
        ${webDiv.outerHTML}
      `;
      // cache dome from newly created elements
      this.bizListNode = document.querySelector("#portfolio-posts #biz-posts");
      this.webListNode = document.querySelector("#portfolio-posts #web-posts");
    },
    switchTitleClickEvents: function(){
      var toRemove = (this.onMobile)
        ? [this.boundBgBizListener,this.boundBgWebListener]
        : [this.boundSmBizListener,this.boundSmWebListener];
      var toAdd = (this.onMobile)
        ? [this.boundSmBizListener,this.boundSmWebListener]
        : [this.boundBgBizListener,this.boundBgWebListener];

      this.bHeading.removeEventListener('click',toRemove[0], false)
      this.wHeading.removeEventListener('click',toRemove[1], false)
      // add events
      this.bHeading.addEventListener('click', toAdd[0], false)
      this.wHeading.addEventListener('click', toAdd[1], false)
    },
    onLoadBindTitleClickEvents: function() {
      var bizListener = (this.onMobile)? this.boundSmBizListener : this.boundBgBizListener;
      var webListener = (this.onMobile)? this.boundSmWebListener : this.boundBgWebListener;

      this.bHeading.addEventListener('click',bizListener,false);
      this.wHeading.addEventListener('click',webListener,false);
    },
    insertCorrectSlider: function(){
      if (this.onMobile) {
        this.mobileSlider = document.createElement('span');
        this.mobileSlider.setAttribute('id','mobile-slider');
        this.portfolioHeader.appendChild(this.mobileSlider);
        this.mobileSlider.className =  'default-slider mobile-slider';
        this.mobileSlider.style.width = this.bHeading.clientWidth + "px";
      } else {
        // creating correct slider element
        this.desktopSlider = document.createElement('span');
        this.desktopSlider.setAttribute('id','desktop-slider');
        this.portfolioHeader.appendChild(this.desktopSlider);
        this.desktopSlider.className = 'default-slider desktop-slider';
      }
    },
    switchSliderElement: function(){

      var ele = document.createElement('span');

      if(this.onMobile) {
        this.mobileSlider = ele;
        var eleToRemove = document.querySelector('#portfolio-main header span');
        var eleId = 'mobile-slider';
        ele.setAttribute('id',eleId);
        ele.className = (this.isBizActive)
        ? "default-slider mobile-slider" : "default-slider mobile-slider slider-move-right";
        var val = (this.isBizActive)? this.bHeading.clientWidth : this.wHeading.clientWidth;
        ele.style.width = val + "px";
      } else {
        this.desktopSlider = ele;
        var eleToRemove = document.querySelector('#portfolio-main header span');
        var eleId = 'desktop-slider';
        ele.setAttribute('id',eleId);
        ele.className = (this.isBizActive)
        ? "default-slider desktop-slider" : "default-slider desktop-slider slider-move-down";
      }

      this.portfolioHeader.removeChild(eleToRemove);
      this.portfolioHeader.appendChild(ele);

    },
    determineEvents:function(){
      this.onMobile = window.innerWidth > 700? false : true;

      // determine first load screen size
      if ( this.isFirstLoad ) {
        this.onLoadBindTitleClickEvents();
        this.insertCorrectSlider();
      }

      // determine if we moved from big to small or small to big
      if (!this.onMobile && this.prevSizeMobile) {
        this.switchTitleClickEvents();
        this.switchSliderElement();
      }
      if (this.onMobile && this.prevSizeMobile === false) {
        this.switchTitleClickEvents();
        this.switchSliderElement()
      }

      // will be used next function call
      this.prevSizeMobile = this.onMobile? true : false;
      this.isFirstLoad = false;
    },
    switchPage: function(val){
      this.isBizActive = val;
      if(this.isBizActive) {
        this.bizListNode.classList.remove('hide-me');
        this.webListNode.classList.add('hide-me');
        this.bHeading.classList.remove('inactive-page-title');
        this.wHeading.classList.add('inactive-page-title');
      } else {
        this.bizListNode.classList.add('hide-me');
        this.webListNode.classList.remove('hide-me');
        this.wHeading.classList.remove('inactive-page-title');
        this.bHeading.classList.add('inactive-page-title');
      }
    },
    moveSliderRight: function(){
      this.switchPage(false);
      this.mobileSlider.classList.add('slider-move-right');
      this.mobileSlider.style.width = this.wHeading.clientWidth + "px";
    },
    moveSliderLeft: function(){
      this.switchPage(true);
      this.mobileSlider.classList.remove('slider-move-right');
      this.mobileSlider.style.width = this.bHeading.clientWidth + "px";
    },
    moveSliderDown: function(){
      this.switchPage(false);
      this.desktopSlider.classList.add('slider-move-down');
    },
    moveSliderUp: function(){
      this.switchPage(true);
      this.desktopSlider.classList.remove('slider-move-down');
    }
  }

  portModule.init();
})()
