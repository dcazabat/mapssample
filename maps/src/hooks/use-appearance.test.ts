import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useAppearance } from "./use-appearance";
import { mockMatchMedia } from "../test/setup";

describe("useAppearance", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("usa light por defecto sin storage ni preferencia del sistema", () => {
    const { result } = renderHook(() => useAppearance());
    expect(result.current.appearance).toBe("light");
  });

  it("lee el tema guardado en localStorage", () => {
    window.localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useAppearance());
    expect(result.current.appearance).toBe("dark");
  });

  it("respeta prefers-color-scheme: dark cuando no hay storage", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useAppearance());
    expect(result.current.appearance).toBe("dark");
  });

  it("ignora valores inválidos en localStorage", () => {
    window.localStorage.setItem("theme", "blue");
    const { result } = renderHook(() => useAppearance());
    expect(result.current.appearance).toBe("light");
  });

  it("updateAppearance cambia el tema, aplica la clase oscura y persiste", () => {
    const { result } = renderHook(() => useAppearance());

    act(() => {
      result.current.updateAppearance("dark");
    });

    expect(result.current.appearance).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("dark");

    act(() => {
      result.current.updateAppearance("light");
    });

    expect(result.current.appearance).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBe("light");
  });
});
