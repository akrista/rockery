# 🪨 Akrista's Rockery

[![Website](https://img.shields.io/website?url=https%3A%2F%2Frockery.notakrista.com)](https://rockery.notakrista.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content%20License-CC%20BY--SA%204.0-blue.svg)](https://creativecommons.org/licenses/by-sa/4.0/)

A digital garden built on solid foundations - exploring ideas through Obsidian and Quartz.

🌐 **[Visit website](https://rockery.notakrista.com)** | 📚 **[Browse content](content/)**

## 🔮 What is a Rockery?

A **rockery** is a garden built on stones that thrives in challenging conditions. Like a traditional rock garden, this digital space is built on solid foundations using:

- **🔹 Obsidian** - For creating interconnected notes
- **💎 Quartz 5** - For transforming notes into this beautiful website
- **🏗️ Solid principles** - Durable, interconnected, and resilient ideas

## 🛠️ Tech Stack

This project is built with:

- **[Quartz 5](https://quartz.jzhao.xyz/)** - Static site generator for digital gardens
- **[Obsidian](https://obsidian.md/)** - Knowledge management and writing tool
- **TypeScript** - Type checking for Quartz plugins and core scripts
- **SCSS** - For custom styling

## 🚀 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- npm v10.9.2+

### Installation

```bash
# Clone the repository
git clone https://github.com/akrista/rockery.git
cd rockery

# Install dependencies
npm ci

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`

### Available Commands

```bash
# Development
npm run dev          # Development server with hot reload

# Build
npm run build        # Build site for production
npm run serve        # Serve built site locally

# Utilities
npm run clean        # Clean build files
```

## 📁 Project Structure

```
rockery/
├── content/           # Site content (articles, notes)
│   ├── index.md      # Main page
│   ├── LICENSE.md    # Content license
│   └── ...           # Other articles and notes
├── quartz/             # Quartz source and components
├── quartz.config.yaml  # Main configuration (YAML)
├── quartz.ts           # TypeScript config override (analytics)
├── quartz.lock.json    # Plugin lock file
└── package.json      # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! You can help in several ways:

### 📝 Content

- Fix typos or grammatical errors
- Suggest improvements to existing articles
- Propose new topics

### 🔧 Code

- UI/UX improvements
- Performance optimizations
- New features

### 🐛 Report Issues

- Website bugs
- Accessibility problems
- UX/UI suggestions

### How to Contribute

1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/awesome-feature`)
3. **Commit** your changes (`git commit -m 'Add awesome feature'`)
4. **Push** to the branch (`git push origin feature/awesome-feature`)
5. **Open** a Pull Request

## 📄 Licenses

### Source Code

The source code of this project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

### Content

All content (articles, notes, images) is licensed under **[Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)**. This means you can:

- ✅ Share and adapt the content
- ✅ Use commercially
- ⚠️ Must provide appropriate attribution
- ⚠️ Share derivatives under the same license

## 🌟 Inspiration

This project is inspired by the concept of **digital gardens** and the philosophy of **learning in public**:

- [Digital Gardens - Maggie Appleton](https://maggieappleton.com/garden-history)
- [Learning in Public - Swyx](https://www.swyx.io/learn-in-public)
- [Rock Gardens - Wikipedia](https://en.wikipedia.org/wiki/Rock_garden)

## 📞 Contact

- **GitHub**: [@akrista](https://github.com/akrista)
- **Issues**: [Report an issue](https://github.com/akrista/rockery/issues)
- **Mail**: [info@notakrista.com](mailto:info@notakrista.com)

---

_Built with ❤️ using Quartz and Obsidian_
