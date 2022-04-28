import React, { Component } from "react";
import _ from "lodash";
import BrandCard from "../../components/BrandCard/BrandCard";
import Logo from "../../icons/liqualityLogo.svg";

class SwapInitiation extends Component {
  render() {
    return (
      <div className="DownloadWallet">
        <BrandCard
          className="SwapInitiation_card"
          title="liquality CROSSCHAIN SWAP"
        >
          <div class="text-center p-4 mb-4">
            <img src={Logo} alt="liquality-logo" />
            <p class="text-danger pt-4">
              The Liquality Swap app is deprecated.
            </p>
            <p>
              Download the wallet for the best cross chain experience including
              atomic swaps.
            </p>

            <p>
              <a
                href="https://chrome.google.com/webstore/detail/liquality-wallet/kpfopkelmapcoipemfendmdcghnegimn"
                class="btn btn-primary"
              >
                Download Liquality Wallet
              </a>
            </p>
          </div>
        </BrandCard>
      </div>
    );
  }
}

export default SwapInitiation;
