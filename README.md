# GoFolio — Pro · Max · Level

> A premium portfolio mobile app built with React Native (Expo). Holographic UI, animated gradients, splash, dark theme, and a complete 5-tab experience.

## ✨ Features

- **5 polished screens**: Home (animated hero + stats), Projects, Skills (animated bars + tools + process), About (timeline + testimonial), Contact (form + channels).
- **Holographic G-mark logo** rendered live with `react-native-svg` inside the app, plus 5 standalone logo variants in `/logos`.
- Custom gradient bottom-tab bar, animated cards, glowing hero with rotating dashed orbit.
- Fully self-contained — no auth or backend required.

## 📦 Download APK

A signed release APK (`GoFolio-v1.0.0-pro-max.apk`, ≈60 MB) is built from this source.
Direct download: **https://app.devin.ai/attachments/68223c8d-339e-4816-87b5-9e61bf1b1228/GoFolio-v1.0.0-pro-max.apk**

To rebuild from source see [Build APK](#-build-apk) below.

## 🎨 Logo Variants

All variants live in `logos/` (SVG + PNG @ 432/512/1024):

1. **Neon Cyberpunk** (`01_neon_cyberpunk`)
2. **Gold Luxury** (`02_gold_luxury`)
3. **Apple Minimal Gradient** (`03_apple_minimal`)
4. **Holographic Iridescent** (`04_holographic`) — used as the in-app brand
5. **Animated SVG** (`05_animated`) — live SMIL animation

Plus app icon (`icon_app.svg`), adaptive icon foreground (`icon_mark.svg`), and splash (`splash.svg`).

## 🚀 Run locally

```bash
npm install
npx expo start
```

## 🏗️ Build APK

```bash
npx expo prebuild --platform android --clean
cd android
./gradlew assembleRelease
# → android/app/build/outputs/apk/release/app-release.apk
```

Requires JDK 17 and Android SDK (platforms 34, build-tools 34, platform-tools).

## 🧱 Stack

- Expo SDK 54
- React Native 0.81
- expo-linear-gradient
- react-native-svg
- expo-system-ui

## 📱 Package

- App name: **GoFolio**
- Package id: `com.ganpati.gofolio`
- Version: 1.0.0
