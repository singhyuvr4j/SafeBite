# 🛡️ SafeBite

> **⚠️ BETA VERSION - Currently in Development**
>
> This project is in active development. Features may change, and some functionality might be incomplete or experimental. Use with caution in production environments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![NVIDIA NIM](https://img.shields.io/badge/NVIDIA_NIM-76B900?logo=nvidia)](https://build.nvidia.com/)
[![OpenAI Compatible](https://img.shields.io/badge/OpenAI-Compatible-412991?logo=openai)](https://openai.com/)
[![Open Food Facts](https://img.shields.io/badge/Open_Food_Facts-API-orange)](https://world.openfoodfacts.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Component-000000)](https://ui.shadcn.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State-443E38)](https://zustand-demo.pmnd.rs/)

**SafeBite** is an AI-powered food safety scanner designed specifically for Indian snacks and packaged foods. It analyzes nutritional information, identifies potential health risks, and provides personalized safety recommendations based on your age group.

## ✨ Features

### 🔍 Multiple Scanning Methods
- **Barcode Scanner**: Enter product barcodes manually or scan with your camera
- **Camera Integration**: Point-and-scan barcode detection using your device camera
- **Image Upload**: Upload product photos for AI-powered analysis

### 🧠 AI-Powered Analysis
- Powered by NVIDIA NIM (Gemma 4 31B model)
- OpenAI-compatible API integration
- Comprehensive ingredient analysis
- Allergen detection and warnings
- Nutritional breakdown with health insights

### 📊 Detailed Safety Reports
- Overall safety score (0-100)
- Traffic-light ingredient classification (Safe/Caution/Avoid)
- Additive analysis with risk levels
- Age-group specific recommendations
- Healthier alternatives suggestions

### 🌐 Multi-Language Support
Supports 20+ languages including:
- English, Hindi, Bengali, Tamil, Telugu
- Marathi, Gujarati, Kannada, Malayalam
- Punjabi, Urdu, Odia, Assamese
- Spanish, French, German, Arabic
- Chinese, Japanese, Portuguese, Russian

### 👥 Age-Group Personalization
Tailored analysis for:
- Toddlers (1-3 years)
- Children (4-12 years)
- Teens (13-17 years)
- Adults (18-59 years)
- Pregnant Women
- Elderly (60+ years)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or bun package manager
- NVIDIA NIM API key ([Get one here](https://build.nvidia.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/singhyuvr4j/SafeBite.git
   cd SafeBite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./db/custom.db"
   NVIDIA_API_KEY="your_nvidia_nim_api_key_here"
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | Full-stack React framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | UI components |
| [Prisma](https://www.prisma.io/) | Database ORM |
| [NVIDIA NIM](https://build.nvidia.com/) | AI inference |
| [Open Food Facts](https://world.openfoodfacts.org/) | Product database |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |

## 🔌 API Endpoints

### `GET /api/barcode/:code`
Look up product information by barcode.

**Response:**
```json
{
  "success": true,
  "barcode": "6111266962187",
  "product": {
    "name": "Product Name",
    "brand": "Brand Name",
    "image": "https://...",
    "nutriscore": "B",
    "ingredients": "...",
    "allergens": "milk, soy"
  }
}
```

### `POST /api/analyze`
Analyze product data with AI.

**Request:**
```json
{
  "barcode": "6111266962187",
  "language": "English",
  "ageGroup": "adult"
}
```

### `POST /api/image`
Analyze product image with AI vision.

**Request:**
```json
{
  "imageBase64": "base64_encoded_image",
  "language": "English",
  "ageGroup": "adult"
}
```

## 🎨 Customization

### Theme Colors

The app uses a custom color palette:

| Color | Usage |
|-------|-------|
| Primary (Orange-red) | Brand color |
| Safe (Green) | Safe ingredients |
| Caution (Yellow) | Caution ingredients |
| Avoid (Red) | Avoid ingredients |

### Adding New Languages

Languages are defined in `src/components/safebite/ScannerSection.tsx`:

```typescript
const languages = [
  'English', 'Hindi', 'Bengali', // Add more here
];
```

## 🤝 Contributing

We welcome contributions from the community! Whether you're a developer, designer, or just passionate about food safety, there are many ways to contribute:

### Ways to Contribute

- 🐛 **Report Bugs** - Found a bug? [Open an issue](https://github.com/singhyuvr4j/SafeBite/issues)
- 💡 **Suggest Features** - Have an idea? We'd love to hear it!
- 🔧 **Submit Pull Requests** - Fix bugs or add new features
- 📖 **Improve Documentation** - Help make our docs better
- 🌍 **Add Translations** - Help us support more languages
- ⭐ **Star the Repo** - Show your support!

### Getting Started with Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Check our [Issues](https://github.com/singhyuvr4j/SafeBite/issues) page for good first issues!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Food Facts](https://world.openfoodfacts.org/) for the comprehensive food product database
- [NVIDIA NIM](https://build.nvidia.com/) for AI inference capabilities
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- FSSAI, WHO, FDA, EU standards for nutritional guidelines

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/singhyuvr4j/SafeBite/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/singhyuvr4j/SafeBite/discussions)

---

<div align="center">
  
  ### 🌱 Stay Healthy, Keep Surrounding Healthy 🌱
  
  *Your food choices today shape your tomorrow. Make every bite count.*
  
  ---
  
  **Made with ❤️ for safer food choices**
  
  [⬆ Back to Top](#-safebite)
  
</div>
