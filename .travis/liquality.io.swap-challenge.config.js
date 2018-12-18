export default {
  eth: {
    rpc: {
      url: 'https://rinkeby.infura.io/pjvC14Kn4cv47X3U8qLq'
    },
    network: 4
  },
  btc: {
    rpc: {
      username: 'liquality',
      password: 'liquality123',
      url: 'https://liquality.io/bitcoinrpc/'
    },
    feeNumberOfBlocks: 2,
    network: 'bitcoin'
  },
  debug: true,
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

  // CRISP
  window.$crisp=[];
  window.CRISP_WEBSITE_ID="aebdc8b6-79e1-4afd-83d8-70a9143bd88b";
  (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();

  // TWITTER
  window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
  `,
  injectFooter: `<p style="text-align: center;">
  <a href="https://liquality.io/terms-of-use" target="_blank">Terms of Use</a>
  &nbsp;|&nbsp;
  <a href="https://liquality.io/privacy-policy" target="_blank">Privacy Policy</a>
  </p>`,
  twitterButton: `?text=${encodeURIComponent('I just swapped mainnet $BTC and testnet $ETH without middlemen, fees, or counterparty risk. Thank you!')}&url=${encodeURIComponent('https://liquality.io/')}&hashtags=bitcoin,atomicswap,liquality,ethereum,atomiccrosschainswap&via=liquality_io`
}
