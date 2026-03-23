# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust your instincts, and ship with confidence. Without them, vibe coding is just yolo coding.

## Framework

- `Vitest`
- `@testing-library/react`
- `jsdom`

## Commands

- Run all tests: `npm test`
- Watch mode: `npm run test:watch`
- Production verification: `npm run build`

## Layers

- Unit tests: component rendering and stateful UI behavior
- Integration tests: route-level composition and shared shell behavior
- Smoke tests: build succeeds and key student routes render

## Conventions

- Keep tests beside the component or route they verify when practical
- Prefer user-visible assertions over implementation details
- Test the behavior that matters: active nav state, route copy, key CTAs, and shell consistency
