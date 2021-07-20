import pkg from '../../package.json'

const CAL_VERSION = pkg.dependencies['@liquality/client'].replace('^', '').replace('~', '')
const footerVersion = `${process.env.REACT_APP_COMMIT_REF || 'dev'} + CAL ${CAL_VERSION}`

export default {
  assets: {
      MATIC: {
    rpc: {
      url: 'https://rpc-mumbai.maticvigil.com/'
    },
    api: {
      type: 'scraper',
      url: 'https://liquality.io/polygon-testnet-api'
    },
    network: 'polygon_testnet',
    explorerPath: 'https://explorer-mumbai.maticvigil.com/tx/0x'
  },
    ETH: {
      rpc: {
        url: 'https://rinkeby.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-rinkeby-api'
      },
      network: 'rinkeby',
      explorerPath: 'https://rinkeby.etherscan.io/tx/0x'
    },
    BTC: {
      api: {
        url: 'https://liquality.io/testnet/electrs'
      },
      batchApi: {
        url: 'https://liquality.io/electrs-testnet-batch'
      },
      feeNumberOfBlocks: 2,
      network: 'bitcoin_testnet',
      explorerPath: 'https://blockstream.info/testnet/tx/'
    },
    RBTC: {
      rpc: {
        url: 'https://public-node.testnet.rsk.co'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/rsk-testnet-api'
      },
      network: 'rsk_testnet',
      explorerPath: 'https://explorer.testnet.rsk.co/tx/0x'
    },
    DAI: {
      type: 'erc20',
      rpc: {
        url: 'https://rinkeby.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-rinkeby-api'
      },
      contractAddress: '0xcE2748BE67fB4346654B4500c4BB0642536365FC',
      network: 'rinkeby',
      explorerPath: 'https://rinkeby.etherscan.io/tx/0x'
    },
    USDC: {
      type: 'erc20',
      rpc: {
        url: 'https://rinkeby.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'
      },
      api: {
        type: 'scraper',
        url: 'https://liquality.io/eth-rinkeby-api'
      },
      contractAddress: '0xcE2748BE67fB4346654B4500c4BB0642536365FC',
      network: 'rinkeby',
      explorerPath: 'https://rinkeby.etherscan.io/tx/0x'
    },
    NEAR: {
      explorerPath: 'https://explorer.testnet.near.org/transactions/'
    }
  },

  defaultFee: 'average',
  hostName: 'Liquality',
  hostIcon: 'https://raw.githubusercontent.com/liquality/chainabstractionlayer/master/liquality-logo.png',
  agents: ['https://liquality.io/swap-testnet/agent'],
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
    loadScript('https://browser.sentry-cdn.com/5.18.1/bundle.min.js', function () {
      loadScript('https://browser.sentry-cdn.com/5.18.1/captureconsole.min.js', function () {
        var dsn = window.location.pathname.indexOf('-dev') !== -1
          ? 'https://47837321894a4befa9211cf8754587dc@sentry.io/4694007'
          : 'https://d9929a726dba4e929d6fded47f4b3fb4@sentry.io/4693957'

        Sentry.init({
          dsn: dsn,
          integrations: [
            new Sentry.Integrations.CaptureConsole({
              levels: ['error']
            })
          ],
          release: '${footerVersion}',
          ignoreErrors: ['NodeError: timeout of 0ms exceeded', 'NodeError: Network Error']
        })
      });
    });
  }

  function addIntercom () {
    window.intercomSettings = {
      app_id: "hzt4o9u6"
    };
    (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/hzt4o9u6';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
  }

  function addGTM () {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-52D86Z5');
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

  function addAnalytics () {
    addGA();
    addGTM();
    addIntercom();
    addSentry();
    addFullStory();
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
