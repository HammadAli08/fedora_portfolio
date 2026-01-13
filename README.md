# Fedora Workstation Portfolio 🖥️

A highly interactive developer portfolio that simulates the **Fedora Workstation (GNOME) desktop environment** in the browser. Built with modern web technologies, it offers a unique, immersive way to explore my work, skills, and experience.

## 🚀 Features

- **Desktop Experience**: Fully functional window manager with dragging, resizing, minimizing, and maximizing capabilities.
- **GNOME Shell**: Authentic top bar with quick settings, calendar integration, and an "Activities" overlay (Exposé style) for window management.
- **Interactive Terminal**: A ZSH-like terminal emulator with custom commands (`ls`, `cd`, `cat`, `neofetch`, `matrix`, etc.) for power users.
- **AI Assistant 🤖**: Integrated RAG-powered chatbot that can answer questions about my background and projects, with streaming responses and bold text formatting.
- **System Apps**:
  - 📄 **Resume**: Integrated PDF viewer.
  - 📂 **Projects**: Interactive grid view of my work with GitHub links.
  - ⚙️ **Settings**: System customization (wallpapers, gradients).
  - ℹ️ **About**: Personal bio and tech stack overview.
  - 🌐 **Browser**: In-app web browser simulation.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)
- **Window Management**: `react-rnd`
- **Markdown**: Custom lightweight renderer for safe Chatbot output.

## ⚙️ Environment Configuration

The application requires a connection to the backend for the AI Assistant. Create a `.env` file in the root directory:

```env
# Works with or without the /api suffix
VITE_API_URL=https://portfolio-backend-1lt5.onrender.com
# OR
VITE_API_URL=https://portfolio-backend-1lt5.onrender.com/api
```

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/HammadAli08/fedora_portfolio.git
   cd fedora_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and bug fixes are welcome!

---

*Designed & Developed by Hammad Ali*
