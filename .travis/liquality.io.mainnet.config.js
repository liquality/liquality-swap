import Client from '@liquality/client'

const footerVersion = `${process.env.REACT_APP_TRAVIS_COMMIT || 'dev'}+${Client.version}`

export default {
  assets: {
    eth: {
      rpc: {
        url: 'https://mainnet.infura.io/v3/3bbb5ebeb45e4b2b9a35261f272fb611'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      network: 'mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    btc: {
      api: {
        url: 'https://blockstream.info/api'
      },
      feeNumberOfBlocks: 2,
      network: 'bitcoin',
      explorerPath: 'https://blockstream.info/tx/'
    },
    dai: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/3bbb5ebeb45e4b2b9a35261f272fb611'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      network: 'mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    usdt: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/3bbb5ebeb45e4b2b9a35261f272fb611'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      network: 'mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    usdc: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/3bbb5ebeb45e4b2b9a35261f272fb611'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      network: 'mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    }
  },
  hostName: 'Liquality',
  hostIcon: 'https://raw.githubusercontent.com/liquality/chainabstractionlayer/master/liquality-logo.png',
  hostAgent: 'https://liquality.io/agent',
  injectScript: `
  function addSentry () {
    (function loadScript(src, callback) {
      var s,
          r,
          t;
      r = false;
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      s.onload = s.onreadystatechange = function() {
        //console.log( this.readyState ); //uncomment this line to see which ready states are called.
        if ( !r && (!this.readyState || this.readyState == 'complete') )
        {
          r = true;
          callback();
        }
      };
      t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
    })('https://browser.sentry-cdn.com/4.6.4/bundle.min.js', function () {
      Sentry.init({
        dsn: 'https://12ddc74cff10472ebb8a940da86e12d9@sentry.io/1415462',
        release: '${footerVersion}'
      })
    });
  }

  function addIntercom () {
    window.intercomSettings = {
      app_id: "hzt4o9u6"
    };
    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/hzt4o9u6';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
  }

  function addGA () {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-52D86Z5');

    // Router GA Pageview
    const sendPageView = (path) => {
      window.ga('set', 'page', path);
      window.ga('send', 'pageview');
    }

    var pushState = history.pushState;
    history.pushState = function () {
      pushState.apply(history, arguments);
      sendPageView(arguments[2])
    };

    window.onpopstate = function (e) {
      sendPageView(document.location.pathname + document.location.search)
    };
  }

  function addFullStory () {
    window['_fs_debug'] = false;
    window['_fs_host'] = 'fullstory.com';
    window['_fs_org'] = 'JY1D7';
    window['_fs_namespace'] = 'FS';
    (function(m,n,e,t,l,o,g,y){
      if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
      g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
      o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
      y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
      g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
      g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
      g.consent=function(a){g("consent",!arguments.length||a)};
      g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
      g.clearUserCookie=function(){};
    })(window,document,window['_fs_namespace'],'script','user');
  }

  function addHotJar () {
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1260353,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  }

  function addAnalytics () {
    addGA();
    addIntercom();
    addSentry();
    addFullStory();
    addHotJar();
  }

  if (window.localStorage.getItem('enableAnalytics') == 'true') {
    console.log('Analytics enabled')
    addAnalytics();
  }

  function acceptTerms () {
    window.localStorage.setItem('acceptedTerms', true);
    window.localStorage.setItem('enableAnalytics', document.getElementById('analytics-checkbox').checked);
    window.onbeforeunload = null;
    location.reload();
  }

  function termsLoaded () {
    if (!(window.localStorage.getItem('acceptedTerms') == 'true')) {
      document.getElementById("terms").style = '';
    }
  }
  `,
  injectFooter: `<p style="text-align: center; margin-bottom: 8px">
  <a href="https://liquality.io/support" target="_blank">Support</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/terms-of-use/standalone.html" target="_blank">Terms of Use</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/privacy-policy" target="_blank">Privacy Policy</a>
  </p>
  <p style="text-align: center;font-size: 80%; color: #aaa">${footerVersion}</p>
  <style>
    #terms {
      width: 100%;
      height: 100%;
      color: white;
      position:absolute;
      background: rgba(0, 0, 0, 70%);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .terms-wrapper {
      position: absolute;
      z-index: 999;
      top: 100px;
      left: 100px;
      right: 100px;
      bottom: 200px;
    }
  </style>
  <div id="terms" style="display: none;">
    <div class="terms-wrapper">
      <iframe style="width: 100%; height: 100%;" src="https://liquality.io/terms-of-use/standalone.html"></iframe>
      <p><input type="checkbox" id="analytics-checkbox"/> Enable analytics to help us better understand issues and improve the experience.</p>
      <div style="text-align: center;">
        <button
          class="Button btn btn-primary Button_wide"
          onclick="acceptTerms()"
          >I Accept</button>
      </div>
    </div>
  </div>
  <img src onerror="termsLoaded()">
  `
}
