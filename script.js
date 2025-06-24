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
    

    /*-------------JWT-HERE------------------------*/
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
  
