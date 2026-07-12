# Ahnara Dispatch

Welcome to the **Ahnara Dispatch** repository. This is a multi-platform workspace comprising both web and mobile applications designed to power dispatch, family connection, and support services.

## Repository Structure

The workspace is organized as follows:

*   **[web-app](file:///Volumes/ReedBreedCC/ahnara/ahnara_dispatch/web-app)**: A modern web application built using **Next.js**, **React**, and **TypeScript**.
*   **[mobile-app](file:///Volumes/ReedBreedCC/ahnara/ahnara_dispatch/mobile-app)**: A cross-platform mobile application built with **Flutter** (Dart), supporting iOS, Android, and other desktop/web targets.

---

## Getting Started

### Web Application (`web-app`)

The web app is a Next.js project.

#### Prerequisites
*   Node.js (v18+ recommended)
*   npm, yarn, or pnpm

#### Run Development Server
1. Navigate to the web-app directory:
   ```bash
   cd web-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Mobile Application (`mobile-app`)

The mobile app is a Flutter application.

#### Prerequisites
*   Flutter SDK (configured on path)
*   Dart SDK (comes with Flutter)
*   Xcode (for iOS development, macOS only)
*   Android Studio / SDK (for Android development)

#### Run Application
1. Navigate to the mobile-app directory:
   ```bash
   cd mobile-app
   ```
2. Fetch package dependencies:
   ```bash
   flutter pub get
   ```
3. Run the application:
   ```bash
   flutter run
   ```

---

## Deployment and Build

*   **Web App**: Deployable on **Vercel**, Netlify, or self-hosted platforms. Build using `npm run build`.
*   **Mobile App**: Package versions using standard Flutter build tools (e.g., `flutter build apk` or `flutter build ipa`).
