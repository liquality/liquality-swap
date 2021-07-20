import pkg from '../../package.json'

const CAL_VERSION = pkg.dependencies['@liquality/client'].replace('^', '').replace('~', '')
const footerVersion = `${process.env.REACT_APP_COMMIT_REF || 'dev'} + CAL ${CAL_VERSION}`

export default {
  assets: {
    MATIC: {
      rpc: {
        url: 'https://rpc-mainnet.matic.network/'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/polygon-mainnet-api'
      },
      network: 'polygon_mainnet',
      explorerPath: 'https://explorer-mainnet.maticvigil.com/tx/0x'
    },
    ETH: {
      rpc: {
        url: 'https://mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      network: 'ethereum_mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    BTC: {
      api: {
        url: 'https://liquality.io/electrs'
      },
      batchApi: {
        url: 'https://liquality.io/electrs-batch'
      },
      feeNumberOfBlocks: 2,
      network: 'bitcoin',
      explorerPath: 'https://blockstream.info/tx/'
    },
    RBTC: {
      rpc: {
        url: 'https://public-node.rsk.co'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/rsk-mainnet-api'
      },
      network: 'rsk_mainnet',
      explorerPath: 'https://explorer.rsk.co/tx/0x'
    },
    DAI: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      network: 'ethereum_mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    USDC: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      network: 'ethereum_mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    USDT: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      network: 'ethereum_mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    WBTC: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      network: 'ethereum_mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    UNI: {
      type: 'erc20',
      rpc: {
        url: 'https://mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-mainnet-api'
      },
      contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      network: 'ethereum_mainnet',
      explorerPath: 'https://etherscan.io/tx/0x'
    },
    NEAR: {
      explorerPath: 'https://explorer.mainnet.near.org/transactions/'
    }
  },
  defaultFee: 'average',
  hostName: 'Liquality',
  hostIcon: 'https://raw.githubusercontent.com/liquality/chainabstractionlayer/master/liquality-logo.png',
  agents: ['https://liquality.io/swap/agent'],
  injectScript: `
  function loadScript(src, callback) {
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
  }

  function addSentry () {
    loadScript('https://browser.sentry-cdn.com/5.27.1/bundle.min.js', function () {
      loadScript('https://browser.sentry-cdn.com/5.27.1/captureconsole.min.js', function () {
        loadScript('https://browser.sentry-cdn.com/5.27.1/bundle.tracing.min.js', function () {
          var dsn = window.location.pathname.indexOf('-dev') !== -1
            ? 'https://816ae35527f34f4fbde7165d34046382@sentry.io/4693986'
            : 'https://8ecc6862378646dd819d160876b47f75@sentry.io/4693923'

          Sentry.init({
            dsn: dsn,
            integrations: [
              new Sentry.Integrations.CaptureConsole({
                levels: ['error']
              }),
              new Sentry.Integrations.BrowserTracing()
            ],
            release: '${footerVersion}',
            ignoreErrors: ['NodeError: timeout of 0ms exceeded', 'NodeError: Network Error'],
            tracesSampleRate: 1.0
          })
        });
      });
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

  function addGTM () {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-52D86Z5');
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
    const interval = setInterval(() => { // Trigger feedback
      if(document.getElementsByClassName('SwapCompleted').length ||
        document.getElementsByClassName('SwapRedemption').length ||
        document.getElementsByClassName('SwapRefund').length) {
        hj('trigger', 'swap_completed_feedback');
        clearInterval(interval);
      }
    }, 4000);
  }

  function addAnalytics () {
    addGTM();
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
  <a href="https://liquality.io/support" target="_blank">FAQ</a>
  &nbsp;|&nbsp;
  <a href="https://youtu.be/G8zcvEy2Ccw" target="_blank">Youtube Tutorial</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/disclaimer/" target="_blank">Disclaimer</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/terms-of-use/standalone.html" target="_blank">Terms of Use</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/privacy-policy" target="_blank">Privacy Policy</a>
  &nbsp;|&nbsp;
  <a href="https://github.com/ConsenSys/liquality-audit-report-2018-11" target="_blank">Contract Audit</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io" target="_blank">Liquality.io</a>
  </p>
  <p style="text-align: center;font-size: 80%; color: #aaa">${footerVersion}</p>
  <style>
    #terms {
      width: 100%;
      height: 100%;
      position:absolute;
      background: rgba(0, 0, 0, 70%);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1000;
    }

    #terms h3 {
      color: #1D1E21;
    }

    .terms-wrapper {
      position: absolute;
      background: #F7F8F9;
      z-index: 999;
      top: 100px;
      left: 100px;
      right: 100px;
      padding: 20px;
      border-radius: 20px;
    }
  </style>
  <div id="terms" style="display: none;">
    <div class="terms-wrapper">
      <div class="reqs"><h3>Swap compatibility:</h3>
      • Chrome Browser <br/>
      • Ledger Nano S (BTC, ETH, ERC20) <br/>
      • Ledger Nano X (BTC) <br/>
      • MetaMask (ETH, ERC20) <br/>
      <br/>
      You are using an implementation that is on beta and was created to demonstrate the features of cross-chain atomic swaps.. The interface is secure and fully functional, and all contracts have been audited.<br/>
      To add tokens and extend features, please find developer tools on <a href="https://liquality.io">liquality.io</a>.<br/><br/>
      </div>
      <iframe style="width: 100%;" src="https://liquality.io/terms-of-use/standalone.html"></iframe>
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
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-52D86Z5"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  `
}
