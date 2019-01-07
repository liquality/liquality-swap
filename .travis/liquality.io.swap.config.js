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
  injectScript: `
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
