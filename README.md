aws s3 sync ./build s3://bounswap --profile=Bounswap
```
BounSwap
├─ .env
├─ README.md
├─ index.md
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ images
│  │  ├─ BounsIo_LOGO.png
│  │  ├─ LPToken_Steake2 2.png
│  │  ├─ LPToken_Steake2.png
│  │  ├─ backArrow.png
│  │  ├─ downArrow.png
│  │  ├─ moon_toggle.png
│  │  ├─ search.png
│  │  ├─ search.svg
│  │  └─ sun_toggle.png
│  └─ index.html
├─ src
│  ├─ App.css
│  ├─ App.style.tsx
│  ├─ App.tsx
│  ├─ Interface
│  │  ├─ Color.interface.tsx
│  │  ├─ ReactNode.interface.tsx
│  │  ├─ SNSLoginProps.tsx
│  │  └─ Token.interface.tsx
│  ├─ Service
│  │  └─ authService.ts
│  ├─ _App.tsx
│  ├─ components
│  │  ├─ Card
│  │  │  ├─ Card.style.tsx
│  │  │  ├─ CardTitle
│  │  │  │  ├─ CardTitle.style.tsx
│  │  │  │  └─ index.tsx
│  │  │  ├─ Chart
│  │  │  │  ├─ Chart.style.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ index.tsx
│  │  ├─ LoadingIndicator
│  │  │  └─ index.tsx
│  │  ├─ Pairname
│  │  │  ├─ Pairname.style.tsx
│  │  │  └─ index.tsx
│  │  ├─ Sidebar
│  │  ├─ SwapComponent
│  │  │  └─ index.tsx
│  │  ├─ TokenName
│  │  │  ├─ TokenName.style 2.tsx
│  │  │  ├─ TokenName.style.tsx
│  │  │  ├─ index 2.tsx
│  │  │  └─ index.tsx
│  │  ├─ container
│  │  │  ├─ container.styled.tsx
│  │  │  └─ index.tsx
│  │  ├─ layout
│  │  │  └─ HeaderBox
│  │  │     └─ WalletInfo.tsx
│  │  ├─ swap
│  │  │  └─ Swap.tsx
│  │  └─ toggleBtn
│  │     └─ index.tsx
│  ├─ contents
│  │  ├─ SNSLogin
│  │  │  └─ index.tsx
│  │  ├─ Stake
│  │  │  └─ Dashboard
│  │  │     └─ index.tsx
│  │  ├─ StakeDetail
│  │  │  └─ VolumeCard
│  │  │     ├─ VolumeCard
│  │  │     │  └─ index.tsx
│  │  │     ├─ VolumeCard.style.tsx
│  │  │     └─ index.tsx
│  │  ├─ poolpair
│  │  │  ├─ Liquidity
│  │  │  │  ├─ AddLiquidity
│  │  │  │  │  ├─ AddLiquidity.style.tsx
│  │  │  │  │  ├─ InputToken
│  │  │  │  │  │  ├─ InputToken.style.tsx
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ LiquidiityBtn
│  │  │  │  │  ├─ LiquidityBtn.style.tsx
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ RemoveLiquidity
│  │  │  │  │  ├─ PercentBtnWarp
│  │  │  │  │  │  ├─ MyLiquidity.tsx
│  │  │  │  │  │  ├─ PercentBtnWarp.style.tsx
│  │  │  │  │  │  ├─ Price.tsx
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  ├─ RemoveLiquidity.styled.tsx
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ Tap
│  │  │  │  │  ├─ Tap.style.tsx
│  │  │  │  │  └─ index.tsx
│  │  │  │  └─ index.tsx
│  │  │  ├─ PoolDetail
│  │  │  │  ├─ Deposite.style.tsx
│  │  │  │  ├─ PoolBox
│  │  │  │  │  └─ index.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ depositBalance
│  │  │     └─ index.tsx
│  │  └─ tokenDetail
│  │     └─ information
│  │        ├─ index.tsx
│  │        └─ information.style.tsx
│  ├─ features
│  │  └─ sample.md
│  ├─ hooks
│  │  └─ test.md
│  ├─ index.css
│  ├─ index.tsx
│  ├─ layout
│  │  ├─ FooterBox
│  │  │  └─ index.tsx
│  │  └─ HeaderBox
│  │     ├─ LogoArea.tsx
│  │     ├─ Navigation.tsx
│  │     ├─ SearchBox.tsx
│  │     ├─ Sidebar.tsx
│  │     ├─ WalletInfo.tsx
│  │     └─ index.tsx
│  ├─ pages
│  │  ├─ StakeDetail
│  │  │  ├─ StakeDetail.style.tsx
│  │  │  └─ index.tsx
│  │  ├─ poolpair
│  │  │  ├─ index.tsx
│  │  │  └─ poolpair.styled.tsx
│  │  ├─ stake
│  │  │  └─ index.tsx
│  │  └─ tokenDetail
│  │     ├─ index.tsx
│  │     └─ tokenDetail.style.tsx
│  ├─ react-app-env.d.ts
│  ├─ reportWebVitals.ts
│  ├─ setupTests.ts
│  ├─ style
│  │  ├─ index.css
│  │  └─ style.tsx
│  ├─ utils
│  │  └─ axiosConfig.ts
│  ├─ wallet 2.js
│  └─ wallet.js
├─ tailwind.config.js
├─ test 2.js
├─ test.js
├─ tsconfig.json
├─ webpack.config 2.js
└─ webpack.config.js

```