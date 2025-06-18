 window.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("certForm");
    const preview = document.getElementById("preview");
    const downloadBtn = document.getElementById("downloadBtn");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const course = document.getElementById("course").value.trim();
      const duration = document.getElementById("duration").value.trim();
      const date = document.getElementById("date").value;

      if (name && course && duration && date) {
        document.getElementById("certName").innerText = name;
        document.getElementById("certCourse").innerText = course;
        document.getElementById("certDuration").innerText = duration;
        document.getElementById("certDate").innerText = date;

        preview.style.display = "block";
        downloadBtn.style.display = "inline-block";
      } else {
        alert("Please fill in all fields.");
      }
    });
    

    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkN2MzYzQyNC04YmM5LTRkMWUtODU4MS1iNjZhMGViMTExYTEiLCJlbWFpbCI6Im5hdGhhbmlrZXQ2NzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNmOTRmOWI3YTBjNGFiY2RkYTM1Iiwic2NvcGVkS2V5U2VjcmV0IjoiOGEyMGU1MjBkMWQxZmNmYzIwNjJhMzQ4MmQ2OTE4MGQ2MzU1YWVmNjNmNDdkYTA3NWJiYzRhNzlmN2RlNmY4MiIsImV4cCI6MTc4MTgxMDg1OX0.jPYYlL2A_VZ63fdtYTgitCgwx28cI6KU4KYA_6VBe7g";

    downloadBtn.addEventListener("click", async () => {
      const certificateElement = document.getElementById("certificate");

      const canvas = await html2canvas(certificateElement);
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      const formData = new FormData();
      formData.append("file", blob, "certificate.png");

      try {
        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.IpfsHash) {
          const ipfsURL = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
          alert("🎉 Uploaded to IPFS!\n\n" + ipfsURL);
          console.log("IPFS Link:", ipfsURL);
        } else {
          alert("Upload failed. Check console for details.");
          console.error(data);
        }
      } catch (err) {
        alert("Error uploading to IPFS.");
        console.error(err);
      }
    });
  });
  
