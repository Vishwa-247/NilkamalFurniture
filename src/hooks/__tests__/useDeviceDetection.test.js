import { renderHook, act } from "@testing-library/react";
import useDeviceDetection from "../useDeviceDetection";

// Mock window.matchMedia
const mockMatchMedia = (matches) => {
  return {
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

describe("useDeviceDetection", () => {
  beforeEach(() => {
    // Reset window properties
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(true)),
    });

    Object.defineProperty(window, "ontouchstart", {
      writable: true,
      configurable: true,
      value: undefined,
    });

    Object.defineProperty(navigator, "maxTouchPoints", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  test("should detect desktop device with hover capability", () => {
    window.innerWidth = 1200;
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => mockMatchMedia(true));

    const { result } = renderHook(() => useDeviceDetection());

    expect(result.current.screenSize).toBe("desktop");
    expect(result.current.isHoverCapable).toBe(true);
    expect(result.current.isTouchDevice).toBe(false);
    expect(result.current.prefersTouchInteraction).toBe(false);
  });

  test("should detect mobile device", () => {
    window.innerWidth = 600;
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => mockMatchMedia(false));
    Object.defineProperty(navigator, "maxTouchPoints", {
      writable: true,
      configurable: true,
      value: 1,
    });

    const { result } = renderHook(() => useDeviceDetection());

    expect(result.current.screenSize).toBe("mobile");
    expect(result.current.isHoverCapable).toBe(false);
    expect(result.current.isTouchDevice).toBe(true);
    expect(result.current.prefersTouchInteraction).toBe(true);
  });

  test("should detect tablet device", () => {
    window.innerWidth = 800;
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => mockMatchMedia(true));

    const { result } = renderHook(() => useDeviceDetection());

    expect(result.current.screenSize).toBe("tablet");
    expect(result.current.isHoverCapable).toBe(true);
  });

  test("should update on window resize", () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useDeviceDetection());

    expect(result.current.screenSize).toBe("desktop");

    // Simulate window resize
    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.screenSize).toBe("mobile");
  });
});
