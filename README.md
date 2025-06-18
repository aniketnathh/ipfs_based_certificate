# 🎓 Decentralized Certificate Generator & Verifier using IPFS

This is a simple Web3-inspired project that allows users (like colleges or organizers) to generate certificates, store them on IPFS using Pinata, and share them with students or recruiters using a CID (Content Identifier). The certificate can later be verified using a public verifier page.

## 🚀 Features

- Generate certificate images from form inputs
- Upload certificate files to IPFS using Pinata API
- Get a unique CID for each certificate
- Verifier page to check authenticity using the CID
- Tamper-proof: even minor edits generate a new CID


## 🛠️ Technologies Used

- HTML, CSS, JavaScript (Vanilla)
- [IPFS](https://ipfs.tech/) – InterPlanetary File System for decentralized storage
- [Pinata](https://www.pinata.cloud/) – API to upload and manage files on IPFS
- JWT Authentication (for secure API access)


## 📸 How It Works

1. User fills in certificate details (name, event, date, etc.)
2. Certificate is dynamically generated as an image
3. Image is uploaded to IPFS through Pinata API
4. A unique **CID** is returned
5. CID can be used to verify the certificate publicly using a separate verifier page


