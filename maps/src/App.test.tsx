import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PropsWithChildren } from "react";
import App from "./App";

/** Leaflet necesita un DOM real (medidas, ResizeObserver); en jsdom lo mockeamos. */
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: PropsWithChildren) => (
    <div data-testid="osm-map">{children}</div>
  ),
  TileLayer: () => null,
  Marker: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Popup: ({ children }: PropsWithChildren) => <div>{children}</div>,
  Polygon: () => null,
  Circle: () => null,
}));

describe("App", () => {
  it("renderiza el layout principal con ambos mapas", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "OpenStreetMap y Google Maps en paralelo",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "OpenStreetMap" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Google Maps" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("osm-map")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Documentación React Leaflet" }),
    ).toHaveAttribute("href", "https://react-leaflet.js.org/");
  });

  it("muestra el aviso de clave faltante cuando no hay API key", () => {
    vi.stubEnv("VITE_GOOGLE_MAPS_EMBED_API_KEY", "");
    render(<App />);

    expect(
      screen.getByText("Falta la clave de Google Maps Embed API"),
    ).toBeInTheDocument();
    expect(
      screen.queryByTitle("Google Maps del mismo sector"),
    ).not.toBeInTheDocument();
    vi.unstubAllEnvs();
  });

  it("incrusta Google Maps cuando hay API key", () => {
    vi.stubEnv("VITE_GOOGLE_MAPS_EMBED_API_KEY", "test-key-123");
    render(<App />);

    const iframe = screen.getByTitle("Google Maps del mismo sector");
    expect(iframe).toBeInTheDocument();
    const src = new URL(iframe.getAttribute("src") ?? "");
    expect(src.origin + src.pathname).toBe(
      "https://www.google.com/maps/embed/v1/view",
    );
    expect(src.searchParams.get("key")).toBe("test-key-123");
    expect(src.searchParams.get("center")).toBe("-36.21768,-61.11467");
    vi.unstubAllEnvs();
  });
});
