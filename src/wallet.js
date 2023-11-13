<script>
function windowPopUp() {
	const host = "https://bouns.io"; // MrLogin Endpoint. (* required)
	// 아래에 사용된 clientId 는 예시 이며, bouns wallet의 project id 입니다.
	const clientId = "6e9c40d1-1236-42c4-8a13-586e7df92327"; // projectId (* required)
	const viewProjectId = undefined; 

	const network = "ether" // bnc: bounce aliance , ether: ethereum mainnet, solana: solana mainnet  

	// 로그인 또는 auto 로그인 이후 redirect 할 화면
	const dest = "sign"; // 기본 화면: null or undefined, 서명 화면: sign
	// 언어 설정 ( ko: 한국, en: 미국, ja: 일본)
	const locale = "ko";

	// popup window style setting 
	const style = "left=10,top=10,width=375,height=520,scrollbars=auto";
	
	const url =`${host}/walletv2/${this.clientId}/?${
          !!viewProjectId ? `viewProjectId=${viewProjectId}` : ''
        }&network=bnc&dest=${dest}&locale=${locale}`;
	const web3 = bncWeb3;
	
	const wallet = window.open(url, "popup", style); // MrLogin Wallet popup 실행
}
</script>