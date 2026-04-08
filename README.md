# 🛡️ SafeBite

> **⚠️ BETA VERSION - Currently in Development**
>
> This project is in active development. Features may change, and some functionality might be incomplete or experimental. Use with caution in production environments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

**SafeBite** is an AI-powered food safety scanner designed specifically for Indian snacks and packaged foods. It analyzes nutritional information, identifies potential health risks, and provides personalized safety recommendations based on your age group.

## ✨ Features

### 🔍 Multiple Scanning Methods
- **Barcode Scanner**: Enter product barcodes manually or scan with your camera
- **Camera Integration**: Point-and-scan barcode detection using your device camera
- **Image Upload**: Upload product photos for AI-powered analysis

### 🧠 AI-Powered Analysis
- Powered by NVIDIA NIM (Gemma 4 31B model)
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

## 📁 Project Structure

```
SafeBite/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── analyze/        # AI analysis endpoint
│   │   │   ├── barcode/        # Barcode lookup endpoint
│   │   │   └── image/          # Image analysis endpoint
│   │   ├── about/              # About page
│   │   ├── privacy/            # Privacy policy
│   │   ├── terms/              # Terms of service
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── safebite/           # SafeBite components
│   │   │   ├── Hero.tsx
│   │   │   ├── ScannerSection.tsx
│   │   │   ├── ResultsSection.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── CookieBanner.tsx
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── services/           # Service modules
│   │   │   ├── nvidiaAI.ts     # NVIDIA NIM integration
│   │   │   └── openFoodFacts.ts # OFF API integration
│   │   ├── prompts/            # AI prompts
│   │   └── db.ts               # Database client
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma           # Database schema
└── public/                     # Static assets
```

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

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
  <p>Made with ❤️ for safer food choices</p>
  <p>
    <a href="#-safebite">Back to Top</a>
  </p>
</div>
