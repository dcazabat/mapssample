import { Circle, MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import type { LatLngExpression, PathOptions } from 'leaflet';
import { Moon, Sun } from 'lucide-react';
import { useAppearance } from './hooks/use-appearance';

const position: LatLngExpression = [-36.21768, -61.11467];
const mapsPosition: LatLngExpression = [-36.2205, -61.1075];

const campo1: LatLngExpression[] = [
  [-36.2023, -61.1042],
  [-36.2086, -61.1112],
  [-36.2115, -61.1078],
  [-36.2054, -61.1002],
  [-36.2023, -61.1042],
];

const campo2: LatLngExpression[] = [
  [-36.2115, -61.1078],
  [-36.2054, -61.1002],
  [-36.2083, -61.0966],
  [-36.2143, -61.1038],
  [-36.2115, -61.1078],
];

const blueOptions: PathOptions = { color: '#ef4444' };
const redOptions: PathOptions = { color: '#3b82f6' };
const fillBlueOptions: PathOptions = { fillColor: 'rgb(168,85,247)', fillOpacity: 0.45, color: '#a855f7' };

const App = () => {
  const googleMapsEmbedKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY as string | undefined;
  const { appearance, updateAppearance } = useAppearance();
  const isDarkMode = appearance === 'dark';

  let googleMapsSrc = '';

  if (googleMapsEmbedKey) {
    const [latitude, longitude] = position as [number, number];
    const url = new URL('https://www.google.com/maps/embed/v1/view');
    url.searchParams.set('key', googleMapsEmbedKey);
    url.searchParams.set('center', `${latitude},${longitude}`);
    url.searchParams.set('zoom', '18');
    url.searchParams.set('maptype', 'roadmap');
    googleMapsSrc = url.toString();
  }

  return (
    <div className="h-dvh overflow-hidden bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-slate-100">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:shadow-black/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-300">Maps sample</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">OpenStreetMap y Google Maps en paralelo</h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Mismo sector, misma fila y un estilo más branding con TailwindCSS, tonos nocturnos más profundos y un embed oficial de Google Maps.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-300"
                href="https://react-leaflet.js.org/"
                target="_blank"
                rel="noreferrer"
              >
                Documentación React Leaflet
              </a>

              <button
                type="button"
                aria-label={isDarkMode ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
                onClick={() => updateAppearance(isDarkMode ? 'light' : 'dark')}
                style={{ borderRadius: '9999px' }}
                className="inline-flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-slate-300/80 bg-slate-900/10 text-slate-700 transition-colors hover:bg-slate-900/20 focus:outline-none focus:ring-2 focus:ring-[#e68a39]/50 backdrop-blur-sm dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-slate-700 dark:text-white" />
                ) : (
                  <Sun className="h-5 w-5 text-amber-500 dark:text-amber-300" />
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
          <section className="flex min-h-0 flex-col rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-black/25">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50">OpenStreetMap</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Vista con Leaflet sobre el mismo sector.</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                Leaflet
              </span>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={position}
                  eventHandlers={{
                    click: () => {
                      console.log('marker clicked');
                    },
                  }}
                >
                  <Popup>
                    Ciba. <br /> Circulo Bolivarense de Arqueria.
                  </Popup>
                </Marker>
                <Polygon pathOptions={blueOptions} positions={campo1} />
                <Polygon pathOptions={redOptions} positions={campo2} />
                <Circle center={mapsPosition} pathOptions={fillBlueOptions} radius={200} />
              </MapContainer>
            </div>
          </section>

          <section className="flex min-h-0 flex-col rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/75 dark:shadow-black/25">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Google Maps</h4>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Embed oficial, centrado y con zoom más preciso.</p>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                Embed API
              </span>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              {googleMapsSrc ? (
                <iframe
                  title="Google Maps del mismo sector"
                  src={googleMapsSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full min-h-[18rem] flex-col items-center justify-center gap-3 bg-slate-950 px-6 text-center text-slate-100">
                  <p className="text-lg font-semibold">Falta la clave de Google Maps Embed API</p>
                  <p className="max-w-md text-sm text-slate-300">
                    Define <span className="font-mono text-cyan-300">VITE_GOOGLE_MAPS_EMBED_API_KEY</span> en tu archivo <span className="font-mono text-cyan-300">.env</span> para ver el mapa oficial.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;