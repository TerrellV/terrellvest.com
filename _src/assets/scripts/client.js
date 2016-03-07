(function(){

  var portModule = {
    isBizActive: false,
    isFirstLoad: true,
    onMobile: undefined,
    prevSizeMobile: undefined,
    init: function(){
      this.cacheDom();
      this.makeAjaxRequests().then(this.insertLists.bind(this));
      this.bindGenericListeners();
      this.determineEvents();
    },
    checkHistoryState: function(){
      // this needs to wait for ajax request and insertLists;
      // this is also called onload of the page
      if (history.state !== null )
        if (history.state.activeTab === "business") {
          this.switchPage(true);
          // this.desktopSlider.classList.add('slider-down');
        }

        else if(history.state.activeTab === "web"){
          this.switchPage(false);
          // this.desktopSlider.classList.remove('slider-down');
        }
    },
    cacheDom: function(){
      this.portfolioPostsContainer = document.querySelector('#portfolio-posts');
      this.portfolioHeader = document.querySelector('#portfolio-main header');
      this.headingOne = document.querySelector('#portfolio-main header h1:nth-child(1)');
      this.headingTwo = document.querySelector('#portfolio-main header h1:nth-child(2)');
      this.headingsArr = [this.headingOne,this.headingTwo];
    },
    bindGenericListeners:function(){

      const _this = this;
      // begin state with web as default;

      // as user goes back or forward change page as necessary
      window.onpopstate = function(e) {
        if (e.state.activeTab === "business") {
          _this.switchPage(true);
          // _this.desktopSlider.classList.add('slider-down');
        } else {
          _this.switchPage(false);
          // _this.desktopSlider.classList.remove('slider-down');
        }
      };

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
          xhr.open('GET','./../assets/html/' + partial + '.html',true);
          xhr.onreadystatechange = function(response){
            if(xhr.readyState === 4 && xhr.status === 200) {
              // make value accessable on parent object via this
               _this[_this.toCamelCase(partial)] = xhr.responseText; // >> this.businessList
               res();
            }
          };
          xhr.send(null);
        }
      })

      return Promise.all(promiseArr);
    },
    insertLists: function(){
      // create business list
      var bizDiv = document.createElement('div');
      bizDiv.setAttribute('id','biz-posts');
      bizDiv.innerHTML = this.businessList;
      bizDiv.className = "hide-me";

      // create web list
      var webDiv = document.createElement('div');
      webDiv.setAttribute('id','web-posts');
      webDiv.innerHTML = this.webList;

      // add both components into one
      this.portfolioPostsContainer.innerHTML =  webDiv.outerHTML + bizDiv.outerHTML;

      // cache dome from newly created elements
      this.bizListNode = document.querySelector("#portfolio-posts #biz-posts");
      this.webListNode = document.querySelector("#portfolio-posts #web-posts");
      // call checkHistoryState
      this.checkHistoryState();
    },
    switchTitleClickEvents: function(){
      var toRemove = (this.onMobile)
        ? [this.boundBgBizListener,this.boundBgWebListener]
        : [this.boundSmBizListener,this.boundSmWebListener];
      var toAdd = (this.onMobile)
        ? [this.boundSmBizListener,this.boundSmWebListener]
        : [this.boundBgBizListener,this.boundBgWebListener];

      this.headingOne.removeEventListener('click',toRemove[0], false)
      this.headingTwo.removeEventListener('click',toRemove[1], false)
      // add events
      this.headingOne.addEventListener('click', toAdd[0], false)
      this.headingTwo.addEventListener('click', toAdd[1], false)
    },
    onLoadBindTitleClickEvents: function() {
      var bizListener = (this.onMobile)? this.boundSmBizListener : this.boundBgBizListener;
      var webListener = (this.onMobile)? this.boundSmWebListener : this.boundBgWebListener;

      this.headingOne.addEventListener('click',bizListener,false);
      this.headingTwo.addEventListener('click',webListener,false);
    },
    insertCorrectSlider: function(){
      // this is only called on initial load not on resize
      if (this.onMobile) {
        this.mobileSlider = document.createElement('span');
        this.mobileSlider.setAttribute('id','mobile-slider');
        if(location.hash === '#web' || location.hash === ''){
          this.mobileSlider.className =  'default-slider mobile-slider';
          this.mobileSlider.style.width = this.headingOne.clientWidth + "px";
        } else if(location.hash === '#business'){
          this.mobileSlider.className =  'default-slider mobile-slider slider-right';
          this.mobileSlider.style.width = this.headingTwo.clientWidth + "px";
        }


        this.portfolioHeader.appendChild(this.mobileSlider);
      } else {
        console.log('location:',location.hash);
        // creating correct slider element for larger devices
        this.desktopSlider = document.createElement('span');
        this.desktopSlider.setAttribute('id','desktop-slider');
        if(location.hash === '#web' || location.hash === ''){
          this.desktopSlider.className = 'default-slider desktop-slider';
          this.headingTwo.classList.add('inactive-page-title');
        }
        else if (location.hash === '#business') {
          this.desktopSlider.className = 'default-slider desktop-slider slider-down';
          this.headingTwo.classList.remove('inactive-page-title');
          this.headingOne.classList.add('inactive-page-title');
        }
        this.portfolioHeader.appendChild(this.desktopSlider);
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
        ? "default-slider mobile-slider slider-right" : "default-slider mobile-slider";
        var val = (this.isBizActive)? this.headingTwo.clientWidth : this.headingOne.clientWidth;
        ele.style.width = val + "px";
      } else {
        this.desktopSlider = ele;
        var eleToRemove = document.querySelector('#portfolio-main header span');
        var eleId = 'desktop-slider';
        ele.setAttribute('id',eleId);
        ele.className = (this.isBizActive)
        ? "default-slider desktop-slider slider-move-down" : "default-slider desktop-slider";
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
        this.headingTwo.classList.remove('inactive-page-title');
        this.headingOne.classList.add('inactive-page-title');
      } else {
        this.bizListNode.classList.add('hide-me');
        this.webListNode.classList.remove('hide-me');
        this.headingOne.classList.remove('inactive-page-title');
        this.headingTwo.classList.add('inactive-page-title');
      }
    },
    moveSliderRight: function(){
      history.pushState({'activeTab':'business'},'Business Projects','#business');
      console.log(window.history);
      this.switchPage(true);
      this.mobileSlider.classList.add('slider-right');
      this.mobileSlider.style.width = this.headingTwo.clientWidth + "px";
    },
    moveSliderLeft: function(){
      history.pushState({'activeTab':'web'},'Web Projects','#web');
      console.log(window.history);
      this.switchPage(false);
      this.mobileSlider.classList.remove('slider-right');
      this.mobileSlider.style.width = this.headingOne.clientWidth + "px";
    },
    moveSliderDown: function(){
      history.pushState({'activeTab':'business'},'Business Projects','#business');
      console.log(window.history);
      this.switchPage(true);
      this.desktopSlider.classList.add('slider-down');
    },
    moveSliderUp: function(){
      history.pushState({'activeTab':'web'},'Web Projects','#web');
      console.log(window.history);
      this.switchPage(false);
      this.desktopSlider.classList.remove('slider-down');
    }
  }

  portModule.init();
})()
