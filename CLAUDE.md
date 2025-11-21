# Project Context: Reference Formatter SaaS

## Tech Stack
- **Runtime:** Bun
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **AI API:** Google Gemini API (`@google/generative-ai`)

## Commands
- Dev Server: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`
- Install: `bun add [package]`

## Coding Guidelines
- **Component Structure:** Use Functional Components with Hooks.
- **Styling:** Use Tailwind CSS utility classes. Avoid external CSS files unless necessary.
- **Typing:** Strict TypeScript typing. Avoid `any`. Define interfaces for props and API responses.
- **Icons:** Use `lucide-react` for icons if needed.
- **State Management:** Use `useState` for local state. Keep it simple.
- **API Fetching:** Use `fetch` inside `useEffect` or event handlers.
- **Directory:** Follow Next.js App Router conventions (`app/`, `components/`, `lib/`).

## Project Goal
Create a simple, fast, and helpful tool for university students to format their thesis references automatically using AI.
Focus on "Speed", "Simplicity", and "Mobile Responsiveness".