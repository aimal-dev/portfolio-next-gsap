# Deploying to Hostinger

Since your application uses a **Custom CMS** (writing to `db.json` and `uploads/`), you need a hosting plan that supports **Node.js** and persistent file storage.

You have two main options on Hostinger:

---

## Option 1: VPS Hosting (Recommended for Full Control)

This gives you a full server (Ubuntu) where you can run the app exactly like on your local machine.

### Steps:

1.  **Get a VPS** from Hostinger (e.g., KVM 1 or KVM 2).
2.  **Login via SSH**:
    ```bash
    ssh root@your_vps_ip
    ```
3.  **Install Node.js & Git**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs git nginx
    ```
4.  **Clone Your Repo**:
    ```bash
    git clone https://github.com/aimal-dev/my-portfolio.git
    cd my-portfolio
    ```
5.  **Install & Build**:
    ```bash
    npm install
    npm run build
    ```
6.  **Start with PM2** (Process Manager):
    ```bash
    npm install -g pm2
    pm2 start npm --name "portfolio" -- start
    pm2 save
    pm2 startup
    ```
7.  **Setup Nginx (Reverse Proxy)**:

    - Map port 80 (HTTP) to port 3000 (Next.js).
    - Edit `/etc/nginx/sites-available/default`:

      ```nginx
      server {
          listen 80;
          server_name your_domain.com; # or your IP

          location / {
              proxy_pass http://localhost:3000;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_cache_bypass $http_upgrade;
          }
      }
      ```

    - Restart Nginx: `sudo systemctl restart nginx`

---

## Option 2: Shared Hosting (Cloud / Business Plans with Node.js)

If you have a **Business** or **Cloud** shared hosting plan, you can use the **Node.js Selector** in hPanel.

### Steps:

1.  **Prepare Your Code locally**:

    - In your `package.json`, ensure "start" script is `"next start"`.
    - _Note: Hostinger Shared Node.js can be tricky with Next.js App Router. VPS is often smoother._

2.  **In hPanel**:

    - Go to **Websites** -> **Manage** -> **Advanced** -> **Node.js**.
    - Create an application:
      - **Node.js Version**: 18 or 20 (match your local).
      - **Application Mode**: Production.
      - **Application Root**: `portfolio` (folder name).
      - **Application URL**: your domain.
      - **Application Startup File**: `node_modules/next/dist/bin/next` (This is tricky, often it's easier to create a customized `server.js`).

3.  **Upload Files**:

    - Use File Manager to upload your project files to the root folder you specified.
    - **Do NOT** upload `node_modules` or `.next` folder yet (or upload `.next` if you built locally).
    - _Recommendation_: Build locally (`npm run build`), then upload everything including `.next`, `public`, `package.json`, `next.config.ts`.

4.  **Install Dependencies**:

    - Click **"NPM Install"** in the hPanel Node.js dashboard.

5.  **Start Server**:
    - Use the button in hPanel.

### Important Note for Custom CMS (`db.json`)

On Shared Hosting, file permissions can sometimes reset or be read-only in certain directories.

- Ensure the `data/` and `public/uploads/` folders have **Write Permissions** (755 or 777).
- If your deployments overwrite the folder, you will lose your CMS data. **VPS is safer** because you strictly control the files.

---

## Which one to choose?

- **VPS**: Best for this specific project (CMS + Custom Server features).
- **Shared/Static**: Not recommended because your CMS needs to run server-side code to write files.
