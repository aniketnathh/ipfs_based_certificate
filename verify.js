window.addEventListener('DOMContentLoaded', () => {
  const verifyBtn = document.getElementById("verifyBtn");

  verifyBtn.addEventListener("click", () => {
    const cid = document.getElementById("cidInput").value.trim();
    const gatewayURL = `https://gateway.pinata.cloud/ipfs/${cid}`;

    if (!cid) {
      alert("Please enter a valid CID");
      return;
    }
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("cidDisplay").textContent = cid;
    document.getElementById("certificateImage").src = gatewayURL;
    document.getElementById("ipfsLink").href = gatewayURL;
  });
});
