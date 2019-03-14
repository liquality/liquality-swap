export default {
  eth: {
    rpc: {
      url: 'https://rinkeby.infura.io/pjvC14Kn4cv47X3U8qLq'
    },
    network: 'rinkeby'
  },
  btc: {
    rpc: {
      username: 'bitcoin',
      password: 'local321',
      url: 'https://liquality.io/bitcointestnetrpc/'
    },
    feeNumberOfBlocks: 2,
    network: 'bitcoin_testnet'
  },
  minConfirmations: 0,
  injectScript: `
  // Sentry
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

  loadScript('https://browser.sentry-cdn.com/4.6.4/bundle.min.js', function () {
    console.log('Sentry is ready')
    Sentry.init({ dsn: 'https://12ddc74cff10472ebb8a940da86e12d9@sentry.io/1415462' })
  })

  // GA
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

  // HOTJAR
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1102216,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `,
  injectFooter: `<p style="text-align: center;">
  <a href="https://liquality.io/terms-of-use" target="_blank">Terms of Use</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/privacy-policy" target="_blank">Privacy Policy</a>
  </p>`
}
