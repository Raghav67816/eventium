# Eventium  
## A full-suite event management platform, built from real event experience

**Eventium** is an event management software that helps your team manage **on-ground event operations** seamlessly—so you can focus on what matters most: **the experience**.

This project was built from firsthand experience organizing events at **Daydream Delhi**, serving as a practical Proof of Concept (PoC) for real-world event workflows.

---

## Screenshots

<img src="image.png" width="300" height="600" />
<img src="image-1.png" width="300" height="600" />
<img src="image-2.png" width="300" height="600" />
<img src="image-3.png" width="300" height="600" />

---

## Features

- Highly collaborative event operations  
- QR code scanning for **participant check-in** and **item issuance**  
- Centralized participant data management  
- Designed for real-time, on-site usage  

---

## Installation

## 1️⃣ Server Setup (Docker – Recommended)

The Eventium API server is distributed as a **pre-built Docker image** named:

eventium-api

### Prerequisites
- Docker (v20+)
- Docker Compose (optional)

### Option A: Load Image from GitHub Release (.tar)

1. Download `eventium-api.tar` from **GitHub Releases**
2. Load the Docker image:
   docker load -i eventium-api.tar

3. Verify the image:
   docker images

4. Run the server:
   docker run -d \
     --name eventium-api \
     -p 8000:8000 \
     --env-file ./config.env \
     eventium-api

The server will be available at:
http://localhost:8000

4. The server will start locally on:
   ```
   http://localhost:8000
   ```

#### Expose Server to the Internet (Required for App)

Use **ngrok** (or a similar tunneling service):

```bash
ngrok http 8000
```

Copy the generated HTTPS URL:
```
https://xxxx.ngrok-free.app
```

This URL will be required inside the mobile application.

---

### 2️⃣ Application Installation

- Go to **Releases**
- Download the latest **Eventium APK**
- Install it on your Android device
- On first launch, you will see **“Notice For Developers”**
- Paste the **server URL** (ngrok link) into the input box

Once logged in:
- A test event (**Daydream Delhi**) is automatically added to your account

---

## Notes

- This setup is intended for **development and testing**
- Production deployment will require:
  - Secure API hosting
  - Proper secrets management
  - Environment hardening

---

Built with real-world event experience.  
Designed for reliability on the ground.
