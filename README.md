# Equilife - Health & Wellness App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## How to Run the App

1. Install dependencies

    ```bash
    npm install
    ```

2. Start the app with tunnel for remote access

    ```bash
    npx expo start --tunnel
    ```

3. Download and install **Expo Go** app on your mobile device:
    - [Expo Go for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
    - [Expo Go for iOS](https://apps.apple.com/app/expo-go/id982107779)

4. Scan the QR code displayed in your terminal with:
    - **Android**: Use the Expo Go app to scan the QR code
    - **iOS**: Use your device's camera to scan the QR code, then open with Expo Go

## Alternative Running Methods

You can also run the app locally without tunnel:

```bash
npx expo start
```

Or for specific platforms:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

## Project Structure

This project uses [file-based routing](https://docs.expo.dev/router/introduction) with Expo Router. The main app files are located in the **app** directory.

## Features

- Health tracking dashboard
- Sleep monitoring
- Nutrition tracking with camera scanning
- Exercise tracking
- User authentication and onboarding
- Questionnaire system

## Technologies Used

- React Native with Expo
- Expo Router for navigation
- NativeWind for styling
- React Native SVG for charts
- Expo Image Picker for camera functionality
