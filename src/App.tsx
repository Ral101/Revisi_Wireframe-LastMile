import { useState, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "back"
  | "bike"
  | "car"
  | "check"
  | "clock"
  | "close"
  | "edit"
  | "home"
  | "location"
  | "map"
  | "message"
  | "more"
  | "phone"
  | "plus"
  | "search"
  | "send"
  | "user"
  | "warning";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    back: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    bike: (
      <>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="m6 17 4-8h4l4 8M8 13h8M9 6h3" />
      </>
    ),
    car: (
      <>
        <path d="M5 17h14v-5l-2-5H7l-2 5v5Z" />
        <path d="M5 12h14M8 17v2m8-2v2" />
        <circle cx="8" cy="15" r="1" />
        <circle cx="16" cy="15" r="1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: (
      <>
        <path d="m7 7 10 10M17 7 7 17" />
      </>
    ),
    edit: (
      <>
        <path d="M5 19h4L19 9l-4-4L5 15v4Z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    home: (
      <>
        <path d="m4 11 8-7 8 7" />
        <path d="M6 10v10h12V10M10 20v-6h4v6" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15m6-12v15" />
      </>
    ),
    message: <path d="M4 5h16v12H8l-4 4V5Z" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    phone: <path d="M7 3h3l1 5-2 1c1 3 3 5 6 6l1-2 5 1v3c0 2-2 4-4 4C9 20 4 15 3 7c0-2 2-4 4-4Z" />,
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 5 5" />
      </>
    ),
    send: (
      <>
        <path d="m3 3 18 9-18 9 4-9-4-9Z" />
        <path d="M7 12h14" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
      </>
    ),
    warning: (
      <>
        <path d="M12 3 2 21h20L12 3Z" />
        <path d="M12 9v5m0 3v1" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <b>9:41</b>
      <div className="status-icons">
        <span>●●●</span>
        <span>⌁</span>
        <span className="battery" />
      </div>
    </div>
  );
}

function Phone({
  title,
  eyebrow,
  children,
  back = true,
  action,
  nav,
  onBack,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  back?: boolean;
  action?: ReactNode;
  nav?: "rute" | "laporan" | "kiriman";
  onBack?: () => void;
}) {
  return (
    <div className="phone">
      <StatusBar />
      <header className="app-header">
        <div className="header-side">
          {back && (
            <button className="icon-button" aria-label="Kembali" onClick={onBack}>
              <Icon name="back" />
            </button>
          )}
        </div>
        <div className="header-copy">
          {eyebrow && <span>{eyebrow}</span>}
          <h3>{title}</h3>
        </div>
        <div className="header-side end">{action}</div>
      </header>
      <main className="phone-content" style={{ overflowY: "auto", minHeight: 0, flex: "1 1 auto", paddingBottom: 24, WebkitOverflowScrolling: "touch" }}>{children}</main>
      {nav && <BottomNav active={nav} />}
      <div className="home-indicator" />
    </div>
  );
}

function BottomNav({ active }: { active: "rute" | "laporan" | "kiriman" }) {
  return (
    <nav className="bottom-nav">
      {[
        ["rute", "map", "Rute"],
        ["laporan", "warning", "Laporan"],
        ["kiriman", "home", "Kiriman"],
      ].map(([id, icon, label]) => (
        <div className={active === id ? "active" : ""} key={id}>
          <Icon name={icon as IconName} size={19} />
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

function Button({
  children,
  secondary = false,
  icon,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  secondary?: boolean;
  icon?: IconName;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`primary-button ${secondary ? "secondary" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  multiline = false,
  placeholder,
}: {
  label?: string;
  value?: string;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      <div className={multiline ? "field-box multiline" : "field-box"}>{value || placeholder}</div>
    </label>
  );
}

function Search({ text = "Cari alamat pengantaran" }: { text?: string }) {
  return (
    <div className="search">
      <Icon name="search" size={18} />
      <span>{text}</span>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  action,
}: {
  icon: IconName;
  label: string;
  value: string;
  action?: string;
}) {
  return (
    <div className="info-row">
      <div className="info-icon">
        <Icon name={icon} size={18} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      {action && <button className="text-action">{action}</button>}
    </div>
  );
}

function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`tag ${dark ? "dark" : ""}`}>{children}</span>;
}

function MapPlaceholder({
  variant = "route",
  label,
  onReportPinClick,
}: {
  variant?: "route" | "reports" | "location" | "alternatives";
  label?: string;
  onReportPinClick?: (category: string) => void;
}) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const openReport = (category: string) => {
    if (onReportPinClick) onReportPinClick(category);
    else setSelectedReport(category);
  };
  return (
    <div className={`map-placeholder ${variant}`}>
      <div className="road r1" />
      <div className="road r2" />
      <div className="road r3" />
      <div className="road r4" />
      <span className="block b1" />
      <span className="block b2" />
      <span className="block b3" />
      <span className="block b4" />
      {(variant === "route" || variant === "location") && <div className="route-line route-a" />}
      {variant === "alternatives" && (
        <>
          <div className="route-line route-a" />
          <div className="route-line route-b" />
        </>
      )}
      {variant === "reports" && (
        <>
          <button type="button" title="Banjir" aria-label="Lihat laporan banjir" className="report-pin p1 flood-pin" style={{ position: "absolute", border: "0", borderRadius: "999px", width: 32, height: 32, display: "grid", placeItems: "center", cursor: "pointer", background: "#ffffff", color: "#222222", boxShadow: "0 2px 8px rgba(0,0,0,.18)", fontWeight: 700 }} onClick={() => openReport("Banjir")}>🌊</button>
          <button type="button" title="Jalan Rusak" aria-label="Lihat laporan jalan rusak" className="report-pin p2 damage-pin" style={{ position: "absolute", border: "0", borderRadius: "999px", width: 32, height: 32, display: "grid", placeItems: "center", cursor: "pointer", background: "#ffffff", color: "#222222", boxShadow: "0 2px 8px rgba(0,0,0,.18)", fontWeight: 700 }} onClick={() => openReport("Jalan Rusak")}>⚠</button>
          <button type="button" title="Jalan Sempit" aria-label="Lihat laporan jalan sempit" className="report-pin p3 narrow-pin" style={{ position: "absolute", border: "0", borderRadius: "999px", width: 32, height: 32, display: "grid", placeItems: "center", cursor: "pointer", background: "#ffffff", color: "#222222", boxShadow: "0 2px 8px rgba(0,0,0,.18)", fontWeight: 700 }} onClick={() => openReport("Jalan Sempit")}>↔</button>
          <button type="button" title="Akses Terhalang" aria-label="Lihat laporan akses terhalang" className="report-pin p4 blocked-pin" style={{ position: "absolute", top: "68%", left: "76%", zIndex: 4 }} onClick={() => openReport("Akses Terhalang")}>⛔</button>
        </>
      )}
      <span className="map-pin">
        <Icon name="location" size={25} />
      </span>
      {label && <span className="map-label">{label}</span>}
      {selectedReport && <div className="map-label report-selected-label"><strong>{selectedReport}</strong><span>Ketuk pin lain untuk melihat laporan</span></div>}
      <button className="map-control">◎</button>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function RouteCard({
  name,
  time,
  distance,
  condition,
  recommended,
}: {
  name: string;
  time: string;
  distance: string;
  condition: string;
  recommended?: boolean;
}) {
  return (
    <div className={`route-card ${recommended ? "selected" : ""}`}>
      <div className="route-title">
        <strong>{name}</strong>
        {recommended && <Tag dark>Disarankan</Tag>}
      </div>
      <div className="metrics">
        <Metric value={time} label="Waktu" />
        <Metric value={distance} label="Jarak" />
      </div>
      <div className="condition">
        <span className="line-key" />
        {condition}
      </div>
    </div>
  );
}

function PhotoBox({ filled = false }: { filled?: boolean }) {
  return (
    <div className={`photo-box ${filled ? "filled" : ""}`}>
      {filled ? (
        <>
          <div className="photo-road" />
          <span>Foto kondisi jalan</span>
        </>
      ) : (
        <>
          <Icon name="plus" size={30} />
          <strong>Tambah Foto</strong>
          <span>JPG atau PNG, maks. 10 MB</span>
        </>
      )}
    </div>
  );
}

function Progress({ active = 1 }: { active?: number }) {
  return (
    <div className="progress">
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= active ? "filled" : ""} />
      ))}
    </div>
  );
}

function ScreenFlow({
  index,
  name,
  children,
  last = false,
}: {
  index: number;
  name: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <>
      <article className="screen-wrap">
        <div className="screen-label">
          <span>{String(index).padStart(2, "0")}</span>
          {name}
        </div>
        {children}
      </article>
      {!last && (
        <div className="connector" aria-hidden="true">
          <span />
          <Icon name="arrow" size={25} />
        </div>
      )}
    </>
  );
}

function Section({
  id,
  code,
  title,
  description,
  count,
  children,
}: {
  id: string;
  code: string;
  title: string;
  description: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className="board-section" id={id}>
      <div className="section-heading">
        <div className="section-code">{code}</div>
        <div>
          <p>ALUR PROTOTIPE · {count} LAYAR</p>
          <h2>{title}</h2>
          <span>{description}</span>
        </div>
      </div>
      <div className="flow">{children}</div>
    </section>
  );
}

function C2Screens() {
  return (
    <Section
      id="c2"
      code="C2"
      count={9}
      title="Rekomendasi Rute Berdasarkan Kendaraan"
      description="Pemilihan kendaraan, perbandingan akses jalan, dan navigasi rute."
    >
      <ScreenFlow index={1} name="Pilih Kendaraan">
        <Phone title="Pilih Kendaraan" eyebrow="PENGATURAN RUTE" back={false}>
          <div className="intro-copy">
            <h4>Kendaraan apa yang Anda gunakan?</h4>
            <p>Rute akan disesuaikan dengan ukuran dan akses kendaraan.</p>
          </div>
          <div className="vehicle-grid">
            <button className="vehicle-option selected">
              <Icon name="bike" size={42} />
              <strong>Sepeda Motor</strong>
              <span>Cocok untuk jalan sempit</span>
              <i>
                <Icon name="check" size={14} />
              </i>
            </button>
            <button className="vehicle-option">
              <Icon name="car" size={42} />
              <strong>Mobil/Van</strong>
              <span>Perlu akses jalan lebih lebar</span>
            </button>
          </div>
          <div className="spacer" />
          <div className="note">
            <Icon name="map" />
            <p>
              <strong>Rute yang lebih sesuai</strong>
              <span>Kami mempertimbangkan lebar dan kondisi jalan.</span>
            </p>
          </div>
          <Button>
            Lanjutkan <Icon name="arrow" size={18} />
          </Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={2} name="Tujuan & Lokasi">
        <Phone title="Tujuan Pengantaran" eyebrow="LANGKAH 2 DARI 3">
          <Search text="Jl. Melati No. 18, Bandung" />
          <MapPlaceholder label="Titik tujuan akurat" />
          <div className="card compact">
            <div className="row-between">
              <Tag>Tujuan</Tag>
              <button className="text-action">Ubah titik</button>
            </div>
            <h4>Jl. Melati No. 18</h4>
            <p>Sukajadi, Bandung 40162</p>
          </div>
          <InfoRow icon="location" label="Patokan" value="Gerbang hijau, samping Apotek Sehat" />
          <InfoRow icon="user" label="Penerima" value="Rina Pratama" action="Hubungi" />
          <div className="spacer" />
          <Button>Lihat Rekomendasi Rute</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={3} name="Rekomendasi Rute">
        <Phone
          title="Rekomendasi Rute"
          action={
            <button className="icon-button">
              <Icon name="more" />
            </button>
          }
        >
          <MapPlaceholder variant="alternatives" />
          <div className="floating-summary">
            <div>
              <strong>18 menit</strong>
              <span>4,2 km</span>
            </div>
            <Tag dark>Terbaik</Tag>
          </div>
          <div className="content-title">
            <div>
              <h4>Rute A · Jl. Anggrek</h4>
              <p>Direkomendasikan untuk Sepeda Motor</p>
            </div>
            <Icon name="bike" />
          </div>
          <div className="tag-row">
            <Tag>Jalan Lebar</Tag>
            <Tag>Jalan Sempit</Tag>
            <Tag>Akses Terbatas</Tag>
          </div>
          <div className="note small">
            <Icon name="warning" />
            <p>
              <strong>200 m jalan sempit · lalu lintas lancar</strong>
              <span>Masih dapat dilalui sepeda motor. Untuk mobil/van, gunakan Rute B yang memiliki akses lebih lebar.</span>
            </p>
          </div>
          <div className="button-row">
            <Button secondary>Bandingkan</Button>
            <Button>Gunakan Rute</Button>
          </div>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={4} name="Rekomendasi Mobil/Van">
        <Phone title="Rekomendasi Rute" eyebrow="UNTUK MOBIL/VAN">
          <MapPlaceholder variant="alternatives" label="Rute B menghindari gang sempit" />
          <div className="content-title"><div><h4>Rute B · Jl. Mawar</h4><p>Direkomendasikan untuk Mobil/Van</p></div><Icon name="car" /></div>
          <div className="summary-band boxed"><Metric value="23 menit" label="Estimasi" /><Metric value="5,1 km" label="Jarak" /></div>
          <div className="tag-row"><Tag dark>Disarankan</Tag><Tag>Jalan lebih lebar</Tag><Tag>Lalu lintas ramai</Tag></div>
          <div className="note"><Icon name="check" /><p><strong>Akses lebih sesuai</strong><span>Rute B memiliki jalan lebih lebar dan ruang manuver lebih baik untuk mobil/van.</span></p></div>
          <div className="card"><strong>Alternatif Rute A</strong><p>Rute A lebih singkat, tetapi memiliki bagian jalan selebar 2 meter. Jika tetap dipilih, sistem akan menampilkan peringatan akses kendaraan.</p></div>
          <InfoRow icon="location" label="Titik parkir / putar balik" value="Area parkir dekat gerbang utama" />
          <div className="spacer" /><Button>Gunakan Rute B</Button><Button secondary>Lihat Detail Rute A</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={5} name="Perbandingan Rute">
        <Phone title="Bandingkan Rute" eyebrow="2 ALTERNATIF">
          <div className="mini-map">
            <MapPlaceholder variant="alternatives" />
          </div>
          <RouteCard
            name="Rute A · Jl. Anggrek"
            time="18 mnt"
            distance="4,2 km"
            condition="Lebar, 200 m jalan sempit"
            recommended
          />
          <RouteCard
            name="Rute B · Jl. Mawar"
            time="23 mnt"
            distance="5,1 km"
            condition="Jalan lebar · lalu lintas ramai · area manuver lebih tersedia"
            recommended
          />
          <div className="comparison-head">
            <span>Perbandingan kondisi</span>
            <strong>A</strong>
            <strong>B</strong>
          </div>
          <div className="compare-row">
            <span>Kesesuaian kendaraan</span>
            <b>Motor</b>
            <b>Mobil/Van</b>
          </div>
          <div className="compare-row">
            <span>Kondisi lalu lintas</span>
            <b>Lancar</b>
            <b>Ramai</b>
          </div>
          <div className="compare-row">
            <span>Akses jalan</span>
            <b>200 m sempit</b>
            <b>Lebih lebar</b>
          </div>
          <div className="spacer" />
          <Button>Pilih Rute A</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={6} name="Detail Rute">
        <Phone title="Detail Rute" action={<Icon name="bike" />}>
          <div className="summary-band">
            <Metric value="18 menit" label="Estimasi" />
            <Metric value="4,2 km" label="Jarak" />
            <Metric value="08.57" label="Tiba" />
          </div>
          <h4 className="section-label">Rincian perjalanan</h4>
          <div className="timeline">
            <div>
              <i>1</i>
              <p>
                <strong>Jl. Merdeka</strong>
                <span>1,8 km · Jalan lebar</span>
              </p>
            </div>
            <div>
              <i>2</i>
              <p>
                <strong>Belok kiri ke Jl. Anggrek</strong>
                <span>1,5 km · Jalan sempit</span>
              </p>
            </div>
            <div>
              <i>3</i>
              <p>
                <strong>Masuk gang setelah minimarket</strong>
                <span>900 m · Akses terbatas</span>
              </p>
            </div>
          </div>
          <div className="note warning">
            <Icon name="warning" />
            <p>
              <strong>Perhatian akses</strong>
              <span>Gang menyempit setelah 300 m. Kurangi kecepatan.</span>
            </p>
          </div>
          <h4 className="section-label">Petunjuk tujuan</h4>
          <InfoRow icon="location" label="Patokan" value="Minimarket, lalu gerbang hijau" />
          <InfoRow icon="message" label="Instruksi" value="Masuk melalui gerbang samping" />
          <div className="spacer" />
          <Button>Mulai Navigasi</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={7} name="Peringatan Akses">
        <Phone title="Akses Kendaraan" eyebrow="PERINGATAN RUTE">
          <div className="warning-hero">
            <div>
              <Icon name="warning" size={42} />
            </div>
            <h4>Jalan terlalu sempit untuk mobil/van</h4>
            <p>Lebar jalan di Gang Melati hanya sekitar 2 meter.</p>
          </div>
          <div className="blocked-diagram">
            <Icon name="car" size={46} />
            <span />
            <div>2 m</div>
            <span />
          </div>
          <div className="card">
            <div className="row-between">
              <strong>Bagian tidak sesuai</strong>
              <Tag>350 m</Tag>
            </div>
            <p>Gang Melati, setelah bengkel motor</p>
            <div className="divider" />
            <div className="row-between">
              <span>Kendaraan dipilih</span>
              <strong>Mobil/Van</strong>
            </div>
          </div>
          <div className="spacer" />
          <Button icon="map">Cari Rute Alternatif</Button>
          <Button secondary>Ganti Kendaraan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={8} name="Rute Alternatif">
        <Phone title="Rute Alternatif" eyebrow="AKSES MOBIL/VAN">
          <MapPlaceholder variant="route" label="Menghindari Gang Melati" />
          <div className="change-banner">
            <Icon name="check" />
            <div>
              <strong>Rute aman ditemukan</strong>
              <span>Menghindari jalan sempit sejauh 350 m</span>
            </div>
          </div>
          <div className="summary-band boxed">
            <Metric value="24 menit" label="Estimasi baru" />
            <Metric value="5,4 km" label="Jarak baru" />
          </div>
          <div className="update-row">
            <span>Perubahan</span>
            <strong>+6 menit · +1,2 km</strong>
          </div>
          <InfoRow icon="map" label="Akses jalan" value="Jalan lebar untuk mobil/van" />
          <InfoRow icon="location" label="Titik parkir / putar balik" value="Area parkir dekat gerbang utama" />
          <InfoRow icon="clock" label="Kondisi diperbarui" value="2 menit yang lalu" />
          <div className="spacer" />
          <Button>Gunakan Rute Ini</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={9} name="Navigasi" last>
        <Phone
          title="Navigasi Aktif"
          back={false}
          action={
            <button className="icon-button">
              <Icon name="more" />
            </button>
          }
        >
          <div className="navigation-map">
            <MapPlaceholder variant="route" />
            <div className="direction-card">
              <div className="turn-arrow">↰</div>
              <div>
                <strong>Belok kiri</strong>
                <span>Dalam 200 m ke Jl. Anggrek</span>
              </div>
            </div>
          </div>
          <div className="nav-stats">
            <div>
              <strong>17 mnt</strong>
              <span>Estimasi tiba 08.56</span>
            </div>
            <div>
              <strong>4,0 km</strong>
              <span>Tersisa</span>
            </div>
          </div>
          <div className="card recipient-card">
            <div>
              <span>Tujuan</span>
              <strong>Rina Pratama</strong>
              <p>Jl. Melati No. 18 · Gerbang hijau</p>
            </div>
            <button className="round-button">
              <Icon name="phone" />
            </button>
          </div>
          <div className="road-update">
            <span className="pulse" />
            <div>
              <strong>Kondisi jalan diperbarui</strong>
              <p>Jalan lancar · 1 menit lalu</p>
            </div>
          </div>
          <Button secondary>Akhiri Navigasi</Button>
        </Phone>
      </ScreenFlow>
    </Section>
  );
}

function C3Screens() {
  const categories = ["Jalan Ditutup", "Banjir", "Jalan Sempit", "Jalan Rusak", "Akses Terhalang"];
  return (
    <Section
      id="c3"
      code="C3"
      count={12}
      title="Laporan Kondisi Jalan dari Kurir"
      description="Pelaporan berbasis lokasi, konfirmasi komunitas, dan riwayat kondisi jalan."
    >
      <ScreenFlow index={1} name="Peta Kondisi Jalan">
        <Phone
          title="Kondisi Jalan"
          back={false}
          action={
            <button className="icon-button">
              <Icon name="search" />
            </button>
          }
          nav="laporan"
        >
          <div className="filter-row">
            <Tag dark>Semua</Tag>
            <Tag>Banjir</Tag>
            <Tag>Ditutup</Tag>
            <Tag>Rusak</Tag>
          </div>
          <div className="large-map">
            <MapPlaceholder variant="reports" />
            <div className="map-legend">
              <span><i />Pin berbeda untuk tiap kategori laporan</span>
              <button>Daftar</button>
            </div>
            <div className="tag-row"><Tag>🌊 Banjir</Tag><Tag>⚠ Jalan Rusak</Tag><Tag>↔ Jalan Sempit</Tag><Tag>⛔ Akses Terhalang</Tag></div>
          </div>
          <div className="map-sheet">
            <div className="sheet-handle" />
            <div className="row-between">
              <div>
                <strong>Laporan terdekat</strong>
                <p>Diperbarui langsung oleh kurir</p>
              </div>
              <Tag>1,2 km</Tag>
            </div>
            <InfoRow
              icon="warning"
              label="Banjir · 5 menit lalu"
              value="Jl. Sukajadi, depan pasar"
            />
            <Button icon="plus">Buat Laporan</Button>
          </div>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={2} name="Pilih Kategori">
        <Phone title="Laporkan Kondisi Jalan" eyebrow="LANGKAH 1 DARI 4">
          <Progress active={1} />
          <div className="intro-copy compact-top">
            <h4>Apa yang Anda temukan?</h4>
            <p>Pilih satu kategori yang paling sesuai.</p>
          </div>
          <div className="category-list">
            {categories.map((item, i) => (
              <button className={i === 1 ? "selected" : ""} key={item}>
                <span className="category-symbol">{i === 0 ? "🚧" : i === 1 ? "🌊" : i === 2 ? "↔" : i === 3 ? "⚠" : "⛔"}</span>
                <span className="category-copy"><strong>{item}</strong><small>{i === 0 || i === 4 ? "Jalan tertutup atau tidak dapat dilalui" : i === 1 ? "Jalan tergenang air" : i === 2 ? "Masih dapat dilewati, tetapi ruang terbatas" : "Permukaan jalan berlubang atau rusak"}</small></span>
                {i === 1 && <Icon name="check" />}
              </button>
            ))}
          </div>
          <div className="spacer" />
          <Button>Lanjutkan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={3} name="Tambah Foto">
        <Phone title="Tambahkan Foto" eyebrow="LANGKAH 2 DARI 4">
          <Progress active={1} />
          <div className="intro-copy compact-top">
            <h4>Foto kondisi jalan</h4>
            <p>Bantu kurir lain memahami situasi terkini.</p>
          </div>
          <PhotoBox />
          <div className="note">
            <Icon name="warning" />
            <p>
              <strong>Utamakan keselamatan</strong>
              <span>Ambil foto hanya saat kendaraan berhenti.</span>
            </p>
          </div>
          <div className="card tips">
            <strong>Foto yang baik</strong>
            <ul>
              <li>Menampilkan kondisi jalan dengan jelas</li>
              <li>Tidak menampilkan data pribadi</li>
              <li>Diambil dari posisi yang aman</li>
            </ul>
          </div>
          <div className="spacer" />
          <Button icon="plus">Tambah Foto</Button>
          <Button secondary>Lewati</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={4} name="Lokasi Laporan">
        <Phone title="Lokasi Laporan" eyebrow="LANGKAH 3 DARI 4">
          <Progress active={2} />
          <div className="location-map">
            <MapPlaceholder variant="location" label="Lokasi laporan" />
          </div>
          <div className="location-pin-caption">
            <span>PIN OTOMATIS</span>
            <strong>Jl. Sukajadi No. 42, Bandung</strong>
            <p>Akurasi lokasi ±8 meter</p>
          </div>
          <div className="note small">
            <Icon name="location" />
            <p>
              <strong>Lokasi Anda terdeteksi</strong>
              <span>Geser peta untuk menyesuaikan titik.</span>
            </p>
          </div>
          <Button secondary icon="edit">
            Sesuaikan Lokasi
          </Button>
          <div className="spacer" />
          <Button>Gunakan Lokasi Ini</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={5} name="Deskripsi Tambahan">
        <Phone title="Detail Tambahan" eyebrow="LANGKAH 4 DARI 4">
          <Progress active={3} />
          <div className="intro-copy compact-top">
            <h4>Tambahkan keterangan</h4>
            <p>Berikan informasi singkat untuk kurir lain.</p>
          </div>
          <Field label="Deskripsi" multiline placeholder="Jelaskan kondisi jalan yang ditemukan" />
          <div className="character-count">0 / 250</div>
          <div className="card"><strong>Tingkat keparahan</strong><div className="tag-row"><Tag>Ringan</Tag><Tag dark>Sedang</Tag><Tag>Berat</Tag></div><Field label="Perkiraan durasi gangguan" placeholder="Contoh: Sekitar 2 jam" /></div>
          <div className="card">
            <InfoRow icon="clock" label="Waktu laporan" value="Hari ini, 08.42 WIB" />
            <InfoRow icon="location" label="Lokasi" value="Jl. Sukajadi No. 42" />
          </div>
          <div className="suggestions">
            <span>Saran cepat</span>
            <button>“Air setinggi mata kaki”</button>
            <button>“Hanya motor yang bisa lewat”</button>
          </div>
          <div className="spacer" />
          <Button>Lihat Ringkasan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={6} name="Pratinjau Laporan">
        <Phone title="Pratinjau Laporan" eyebrow="PERIKSA KEMBALI">
          <PhotoBox filled />
          <div className="preview-title">
            <div>
              <Tag dark>Banjir</Tag>
              <h4>Jl. Sukajadi No. 42</h4>
              <p>Hari ini, 08.42 WIB</p>
            </div>
            <button className="icon-button">
              <Icon name="edit" />
            </button>
          </div>
          <div className="mini-location">
            <MapPlaceholder variant="location" />
          </div>
          <div className="description-box">
            <span>Deskripsi</span>
            <p>Air setinggi mata kaki. Sepeda motor masih dapat melintas pelan dari sisi kanan.</p>
            <div className="divider" />
            <p><strong>Tingkat keparahan:</strong> Sedang</p>
            <p><strong>Perkiraan durasi:</strong> Sekitar 2 jam</p>
            <p><strong>Waktu laporan:</strong> Hari ini, 08.42 WIB</p>
          </div>
          <div className="note small">
            <Icon name="user" />
            <p>
              <strong>Dibagikan sebagai Kurir #1842</strong>
              <span>Nomor pribadi Anda tidak ditampilkan.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button icon="send">Kirim Laporan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={7} name="Laporan Terkirim">
        <Phone title="Laporan Terkirim" back={false}>
          <div className="success-state">
            <div>
              <Icon name="check" size={46} />
            </div>
            <h4>Laporan berhasil dikirim</h4>
            <p>Terima kasih telah membantu perjalanan kurir lain menjadi lebih aman.</p>
          </div>
          <div className="receipt">
            <div className="row-between">
              <Tag dark>Banjir</Tag>
              <span>Baru saja</span>
            </div>
            <h4>Jl. Sukajadi No. 42</h4>
            <p>Air setinggi mata kaki. Sepeda motor masih dapat melintas pelan.</p>
            <div className="divider" />
            <span>ID Laporan · #LPR-2048</span>
          </div>
          <div className="note">
            <Icon name="clock" />
            <p>
              <strong>Status akan diperbarui</strong>
              <span>Kurir lain dapat mengonfirmasi kondisi ini.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button>Lihat Laporan</Button>
          <Button secondary>Kembali ke Peta</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={8} name="Detail Laporan">
        <Phone
          title="Detail Laporan"
          action={
            <button className="icon-button">
              <Icon name="more" />
            </button>
          }
        >
          <PhotoBox filled />
          <div className="preview-title">
            <div>
              <Tag dark>Banjir</Tag>
              <h4>Jl. Sukajadi No. 42</h4>
              <p>Dilaporkan 8 menit lalu</p>
            </div>
          </div>
          <div className="status-card">
            <span>Status laporan</span>
            <div>
              <i className="status-dot" />
              <strong>Masih Terjadi</strong>
            </div>
            <p>Dikonfirmasi 4 kurir · 2 menit lalu</p>
          </div>
          <div className="description-box">
            <span>Keterangan</span>
            <p>Air setinggi mata kaki. Sepeda motor masih dapat melintas pelan dari sisi kanan.</p>
          </div>
          <div className="status-options">
            <span>Status lain</span>
            <Tag>Sedang Ditangani</Tag>
            <Tag>Sudah Normal</Tag>
          </div>
          <InfoRow
            icon="location"
            label="Lokasi"
            value="Jl. Sukajadi No. 42, Bandung"
            action="Peta"
          />
          <div className="spacer" />
          <Button>Konfirmasi Kondisi</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={9} name="Konfirmasi Laporan">
        <Phone title="Konfirmasi Kondisi" eyebrow="LAPORAN #LPR-2048">
          <div className="confirm-visual">
            <Icon name="warning" size={36} />
            <Tag dark>Banjir</Tag>
            <h4>Apakah kondisi ini masih terjadi?</h4>
            <p>Jl. Sukajadi No. 42 · dilaporkan 18 menit lalu</p>
          </div>
          <div className="mini-location larger">
            <MapPlaceholder variant="reports" />
          </div>
          <div className="note small">
            <Icon name="user" />
            <p>
              <strong>Konfirmasi Anda membantu</strong>
              <span>Informasi terbaru akan dilihat kurir lain.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button icon="warning">Masih Terjadi</Button>
          <Button secondary icon="check">
            Sudah Normal
          </Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={10} name="Perbarui Laporan">
        <Phone title="Perbarui Laporan" eyebrow="LAPORAN ANDA">
          <div className="card report-identity">
            <Tag>Banjir</Tag>
            <div>
              <strong>Jl. Sukajadi No. 42</strong>
              <p>Dibuat hari ini, 08.42 WIB</p>
            </div>
          </div>
          <h4 className="section-label">Ubah status laporan</h4>
          <div className="radio-list">
            <button className="selected">
              <i />
              <div>
                <strong>Masih Terjadi</strong>
                <span>Kondisi belum berubah</span>
              </div>
            </button>
            <button>
              <i />
              <div>
                <strong>Sedang Ditangani</strong>
                <span>Ada petugas atau penanganan</span>
              </div>
            </button>
            <button>
              <i />
              <div>
                <strong>Sudah Normal</strong>
                <span>Jalan sudah dapat dilalui</span>
              </div>
            </button>
          </div>
          <Field
            label="Catatan pembaruan (opsional)"
            multiline
            placeholder="Tambahkan informasi terbaru"
          />
          <div className="note small">
            <Icon name="clock" />
            <p>
              <strong>Pembaruan terakhir</strong>
              <span>8 menit lalu oleh Anda.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button>Simpan Pembaruan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={11} name="Notifikasi Terdekat">
        <Phone
          title="Peringatan Rute"
          back={false}
          action={
            <button className="icon-button">
              <Icon name="close" />
            </button>
          }
        >
          <div className="notification-hero">
            <span>PERINGATAN DI SEKITAR</span>
            <div>
              <Icon name="warning" size={40} />
            </div>
            <h4>Terdapat laporan banjir di sekitar rute Anda</h4>
            <p>Lokasi laporan berjarak 450 m dari jalur perjalanan.</p>
          </div>
          <div className="mini-location larger">
            <MapPlaceholder variant="reports" />
          </div>
          <div className="card">
            <div className="row-between">
              <Tag dark>Banjir</Tag>
              <span>6 menit lalu</span>
            </div>
            <h4>Jl. Sukajadi, depan pasar</h4>
            <p>Dikonfirmasi masih terjadi oleh 4 kurir.</p>
          </div>
          <div className="impact-row">
            <div>
              <span>Dampak rute</span>
              <strong>+7 menit</strong>
            </div>
            <div>
              <span>Jarak dari Anda</span>
              <strong>450 m</strong>
            </div>
          </div>
          <div className="spacer" />
          <Button>Lihat Rute Alternatif</Button>
          <Button secondary>Lanjutkan Rute</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={12} name="Riwayat Laporan" last>
        <Phone
          title="Riwayat Laporan"
          back={false}
          action={
            <button className="icon-button">
              <Icon name="more" />
            </button>
          }
          nav="laporan"
        >
          <div className="summary-band boxed">
            <Metric value="12" label="Total laporan" />
            <Metric value="3" label="Masih aktif" />
            <Metric value="9" label="Selesai" />
          </div>
          <div className="filter-row history">
            <Tag dark>Semua</Tag>
            <Tag>Aktif</Tag>
            <Tag>Selesai</Tag>
          </div>
          <div className="history-list">
            {[
              ["Banjir", "Jl. Sukajadi No. 42", "Hari ini · 08.42", "Masih Terjadi"],
              ["Jalan Rusak", "Jl. Pasteur, dekat SPBU", "Kemarin · 16.20", "Sedang Ditangani"],
              ["Jalan Ditutup", "Jl. Cendana Raya", "12 Jun · 10.15", "Sudah Normal"],
              ["Akses Terhalang", "Gang Karya No. 7", "8 Jun · 14.03", "Sudah Normal"],
            ].map(([cat, loc, date, status]) => (
              <button key={loc}>
                <span className="history-icon">!</span>
                <div>
                  <strong>{cat}</strong>
                  <p>{loc}</p>
                  <small>{date}</small>
                </div>
                <Tag dark={status === "Masih Terjadi"}>{status}</Tag>
              </button>
            ))}
          </div>
        </Phone>
      </ScreenFlow>
    </Section>
  );
}

function DeliveryProgress({ active }: { active: number }) {
  const steps = ["Dalam Perjalanan", "Mendekati Lokasi", "Tiba di Tujuan"];
  return (
    <div className="delivery-progress">
      {steps.map((step, i) => (
        <div className={i <= active ? "active" : ""} key={step}>
          <i>{i < active ? <Icon name="check" size={13} /> : i + 1}</i>
          <p>
            <strong>{step}</strong>
            <span>{i === 0 ? "09.05" : i === 1 ? "Perkiraan 09.18" : "Perkiraan 09.25"}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function C6Screens() {
  return (
    <Section
      id="c6"
      code="C6"
      count={11}
      title="Notifikasi Perkiraan Kedatangan"
      description="Koordinasi kurir dan penerima dari estimasi tiba hingga serah terima paket."
    >
      <ScreenFlow index={1} name="Pengantaran Kurir">
        <Phone title="Pengantaran Aktif" back={false} action={<Tag>Kurir</Tag>} nav="kiriman">
          <div className="delivery-map">
            <MapPlaceholder variant="route" />
            <div className="eta-float">
              <span>Tiba dalam</span>
              <strong>20 menit</strong>
            </div>
          </div>
          <div className="package-head">
            <div>
              <span>PAKET #PKT-72841</span>
              <h4>Rina Pratama</h4>
              <p>Jl. Melati No. 18, Sukajadi</p>
            </div>
            <button className="round-button">
              <Icon name="phone" />
            </button>
          </div>
          <div className="summary-band boxed">
            <Metric value="09.25" label="Estimasi tiba" />
            <Metric value="4,2 km" label="Jarak tersisa" />
          </div>
          <InfoRow icon="clock" label="Pembaruan estimasi" value="Diperbarui mengikuti kondisi perjalanan" />
          <div className="current-status">
            <span>Status pengantaran</span>
            <div>
              <i />
              <strong>Dalam Perjalanan</strong>
            </div>
          </div>
          <InfoRow icon="message" label="Catatan penerima" value="Hubungi ketika sudah sampai" />
          <div className="spacer" />
          <Button>Kirim Notifikasi Kedatangan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={2} name="Notifikasi Penerima">
        <Phone title="Kiriman Anda" back={false} action={<Tag>Penerima</Tag>}>
          <div className="arrival-hero">
            <span>PERKIRAAN KEDATANGAN</span>
            <strong>15</strong>
            <p>menit lagi</p>
            <small>Kurir diperkirakan tiba pukul 09.25</small>
          </div>
          <div className="courier-card">
            <div className="avatar">
              <Icon name="user" size={26} />
            </div>
            <div>
              <span>Kurir Anda</span>
              <strong>Adi Saputra</strong>
              <p>ID Kurir K-1842 · Sepeda Motor</p>
            </div>
            <button className="round-button">
              <Icon name="phone" />
            </button>
          </div>
          <div className="notification-box">
            <Icon name="clock" />
            <p>
              <strong>Kurir diperkirakan tiba dalam 15 menit</strong>
              <span>Estimasi dapat diperbarui mengikuti kondisi perjalanan.</span>
            </p>
          </div>
          <div className="card">
            <span>Detail paket #PKT-72841</span>
            <h4>Rina Pratama</h4>
            <p>Jl. Melati No. 18, Sukajadi, Bandung 40162</p>
          </div>
          <div className="spacer" />
          <Button>Konfirmasi Kesiapan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={3} name="Status Pengantaran">
        <Phone title="Status Pengantaran" action={<Tag>Penerima</Tag>}>
          <div className="package-code">
            <span>PAKET #PKT-72841</span>
            <strong>Estimasi tiba 09.25</strong>
          </div>
          <div className="mini-location larger">
            <MapPlaceholder variant="route" label="Posisi kurir menuju tujuan" />
          </div>
          <InfoRow icon="location" label="Posisi kurir" value="Jl. Sukajadi · 1,2 km dari tujuan" />
          <DeliveryProgress active={1} />
          <div className="note small">
            <Icon name="clock" />
            <p>
              <strong>Kurir mendekati lokasi</strong>
              <span>Jarak tersisa sekitar 1,2 km.</span>
            </p>
          </div>
          <div className="card recipient-card">
            <div>
              <span>Kurir</span>
              <strong>Adi Saputra</strong>
              <p>Sepeda Motor · K-1842</p>
            </div>
            <button className="round-button">
              <Icon name="phone" />
            </button>
          </div>
          <div className="spacer" />
          <Button secondary>Lihat Detail Kiriman</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={4} name="Konfirmasi Kesiapan">
        <Phone title="Konfirmasi Kesiapan" action={<Tag>Penerima</Tag>}>
          <div className="readiness-hero">
            <div>
              <Icon name="home" size={40} />
            </div>
            <h4>Apakah Anda siap menerima paket?</h4>
            <p>Kurir diperkirakan tiba dalam 12 menit.</p>
          </div>
          <div className="card">
            <InfoRow icon="clock" label="Perkiraan tiba" value="09.25 WIB" />
            <InfoRow icon="location" label="Alamat" value="Jl. Melati No. 18" />
          </div>
          <div className="choice-stack">
            <button className="selected">
              <div>
                <Icon name="check" />
                <span>
                  <strong>Siap</strong>
                  <small>Saya dapat menerima paket</small>
                </span>
              </div>
              <i />
            </button>
            <button>
              <div>
                <Icon name="clock" />
                <span>
                  <strong>Belum Siap</strong>
                  <small>Saya perlu waktu atau tidak tersedia</small>
                </span>
              </div>
              <i />
            </button>
          </div>
          <div className="card"><strong>Waktu tambahan jika belum siap</strong><div className="tag-row"><Tag>5 menit</Tag><Tag>10 menit</Tag></div></div>
          <div className="spacer" />
          <Button>Kirim Jawaban</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={5} name="Koordinasi Kurir">
        <Phone title="Respons Penerima" action={<Tag>Kurir</Tag>}>
          <div className="response-banner">
            <Icon name="check" size={32} />
            <div>
              <span>PENERIMA MERESPONS</span>
              <strong>Siap menerima paket</strong>
              <p>Baru saja</p>
            </div>
          </div>
          <div className="card recipient-card">
            <div>
              <span>Penerima</span>
              <strong>Rina Pratama</strong>
              <p>Jl. Melati No. 18, Sukajadi</p>
            </div>
            <button className="round-button">
              <Icon name="phone" />
            </button>
          </div>
          <div className="coordination-status">
            <span>Status koordinasi</span>
            <div>
              <i>
                <Icon name="check" size={13} />
              </i>
              <p>
                <strong>Notifikasi kedatangan terkirim</strong>
                <span>09.10 WIB</span>
              </p>
            </div>
            <div>
              <i>
                <Icon name="check" size={13} />
              </i>
              <p>
                <strong>Penerima menyatakan siap</strong>
                <span>09.13 WIB</span>
              </p>
            </div>
            <div>
              <i>3</i>
              <p>
                <strong>Serah terima paket</strong>
                <span>Menunggu kedatangan</span>
              </p>
            </div>
          </div>
          <div className="note small">
            <Icon name="message" />
            <p>
              <strong>Pesan penerima</strong>
              <span>“Silakan hubungi saya ketika sudah sampai.”</span>
            </p>
          </div>
          <div className="spacer" />
          <Button>Lanjutkan Navigasi</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={6} name="Estimasi Diperbarui">
        <Phone title="Pembaruan Kedatangan" back={false} action={<Tag>Penerima</Tag>}>
          <div className="delay-hero">
            <Icon name="clock" size={35} />
            <span>ESTIMASI DIPERBARUI</span>
            <h4>Kurir mengalami keterlambatan</h4>
            <p>Kondisi lalu lintas memperlambat perjalanan.</p>
          </div>
          <div className="eta-change">
            <div>
              <span>Estimasi sebelumnya</span>
              <strong className="struck">09.25</strong>
            </div>
            <Icon name="arrow" />
            <div>
              <span>Estimasi terbaru</span>
              <strong>09.35</strong>
            </div>
          </div>
          <div className="card">
            <div className="row-between">
              <span>Tambahan waktu</span>
              <strong>+10 menit</strong>
            </div>
            <div className="divider" />
            <div className="row-between">
              <span>Jarak tersisa</span>
              <strong>2,1 km</strong>
            </div>
          </div>
          <div className="notification-box">
            <Icon name="warning" />
            <p>
              <strong>Mohon maaf atas keterlambatan</strong>
              <span>Anda akan menerima pengingat saat kurir mendekat.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button secondary>Hubungi Kurir</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={7} name="Pengingat Kedatangan">
        <Phone title="Kurir Hampir Tiba" back={false} action={<Tag>Penerima</Tag>}>
          <div className="reminder-hero">
            <div className="radar">
              <Icon name="bike" size={42} />
            </div>
            <span>PENGINGAT KEDATANGAN</span>
            <h4>Kurir sudah dekat</h4>
            <p>Kurir berjarak sekitar 300 meter dari lokasi Anda.</p>
          </div>
          <div className="arrival-count">
            <span>Diperkirakan tiba dalam</span>
            <strong>3 menit</strong>
          </div>
          <div className="card recipient-card">
            <div>
              <span>Kurir</span>
              <strong>Adi Saputra</strong>
              <p>Sepeda Motor · K-1842</p>
            </div>
            <button className="round-button">
              <Icon name="phone" />
            </button>
          </div>
          <div className="checklist">
            <strong>Persiapkan serah terima</strong>
            <p>
              <Icon name="check" size={16} />
              Pastikan Anda berada di lokasi
            </p>
            <p>
              <Icon name="check" size={16} />
              Siapkan kode penerimaan 4821
            </p>
          </div>
          <div className="spacer" />
          <Button>Saya Siap</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={8} name="Konfirmasi Alamat">
        <Phone title="Konfirmasi Lokasi" action={<Tag>Penerima</Tag>}>
          <div className="location-map">
            <MapPlaceholder variant="location" label="Titik pengantaran" />
          </div>
          <div className="location-pin-caption">
            <span>ALAMAT PENGANTARAN</span>
            <strong>Jl. Melati No. 18</strong>
            <p>Sukajadi, Bandung 40162</p>
          </div>
          <div className="accuracy">
            <Icon name="location" />
            <div>
              <strong>Apakah titik ini sudah tepat?</strong>
              <span>Kurir akan menuju titik yang ditandai.</span>
            </div>
          </div>
          <Field label="Patokan lokasi" value="Gerbang hijau, samping Apotek Sehat" />
          <div className="button-row">
            <Button secondary>Ubah Titik</Button>
            <Button>Lokasi Tepat</Button>
          </div>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={9} name="Pesan Tambahan">
        <Phone title="Pesan untuk Kurir" action={<Tag>Penerima</Tag>}>
          <div className="intro-copy compact-top">
            <h4>Tambahkan instruksi</h4>
            <p>Pesan akan langsung terlihat oleh kurir.</p>
          </div>
          <Field
            label="Pesan tambahan"
            multiline
            value="Silakan hubungi saya ketika sudah sampai"
          />
          <div className="character-count">47 / 200</div>
          <div className="suggestions wide">
            <span>Pesan cepat</span>
            <button>“Titipkan ke satpam”</button>
            <button>“Tunggu di gerbang utama”</button>
            <button>“Jangan tekan bel”</button>
          </div>
          <div className="card">
            <InfoRow icon="user" label="Dikirim kepada" value="Adi Saputra · Kurir K-1842" />
          </div>
          <div className="note small">
            <Icon name="message" />
            <p>
              <strong>Pesan terkait pengantaran saja</strong>
              <span>Jangan bagikan informasi sensitif.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button icon="send">Kirim Pesan</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={10} name="Kendala Penerimaan">
        <Phone title="Kendala Penerimaan" action={<Tag>Penerima</Tag>}>
          <div className="problem-hero">
            <Icon name="warning" size={36} />
            <h4>Tidak dapat menerima paket?</h4>
            <p>Beri tahu kurir agar pengantaran dapat dikoordinasikan.</p>
          </div>
          <h4 className="section-label">Pilih alasan</h4>
          <div className="radio-list compact-list">
            {[
              "Tidak berada di lokasi",
              "Perlu waktu tambahan",
              "Alamat perlu diperbaiki",
              "Alasan lainnya",
            ].map((x, i) => (
              <button className={i === 0 ? "selected" : ""} key={x}>
                <i />
                <div>
                  <strong>{x}</strong>
                </div>
              </button>
            ))}
          </div>
          <Field label="Penjelasan singkat" multiline placeholder="Berikan informasi untuk kurir" />
          <div className="note small">
            <Icon name="clock" />
            <p>
              <strong>Kurir tiba sekitar 8 menit lagi</strong>
              <span>Respons Anda akan dikirim segera.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button>Kirim Informasi</Button>
          <Button secondary>Batal</Button>
        </Phone>
      </ScreenFlow>
      <ScreenFlow index={11} name="Konfirmasi Serah Terima" last>
        <Phone title="Serah Terima Paket" action={<Tag>Kurir</Tag>}>
          <div className="handoff-hero">
            <div>
              <Icon name="home" size={37} />
            </div>
            <span>KURIR TIBA DI TUJUAN</span>
            <h4>Konfirmasi serah terima</h4>
            <p>Pastikan paket telah diterima oleh penerima yang benar.</p>
          </div>
          <div className="card handoff-card">
            <span>PAKET #PKT-72841</span>
            <h4>Rina Pratama</h4>
            <p>Jl. Melati No. 18, Sukajadi</p>
            <div className="divider" />
            <div className="row-between">
              <span>Waktu tiba</span>
              <strong>09.34 WIB</strong>
            </div>
          </div>
          <Field label="Nama penerima paket" value="Rina Pratama" />
          <div className="card"><strong>Alternatif serah terima</strong><div className="tag-row"><Tag>Diterima langsung</Tag><Tag>Satpam</Tag><Tag>Orang tepercaya</Tag></div><small>Alternatif dilakukan setelah persetujuan penerima.</small></div>
          <div className="proof-box">
            <Icon name="plus" />
            <div>
              <strong>Tambah bukti serah terima</strong>
              <span>Foto atau tanda tangan penerima</span>
            </div>
          </div>
          <div className="check-confirm">
            <span>
              <Icon name="check" />
            </span>
            <p>Saya memastikan paket telah diserahkan kepada penerima.</p>
          </div>
          <div className="spacer" />
          <Button icon="check">Paket Telah Diserahkan</Button>
        </Phone>
      </ScreenFlow>
    </Section>
  );
}

type TestFlow = "c2" | "c3" | "c6";

const flowMeta = {
  c2: { code: "C2", title: "Rekomendasi Rute", total: 8 },
  c3: { code: "C3", title: "Laporan Kondisi Jalan", total: 12 },
  c6: { code: "C6", title: "Notifikasi Kedatangan", total: 3 },
};

function TestInput({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <label className="field test-field">
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function TestOverlay({
  title,
  text,
  action = "Lanjutkan",
  onClose,
  icon = "check",
}: {
  title: string;
  text: string;
  action?: string;
  onClose: () => void;
  icon?: IconName;
}) {
  return (
    <div className="test-overlay" role="dialog" aria-modal="true">
      <div className="test-dialog">
        <div className="dialog-icon">
          <Icon name={icon} size={28} />
        </div>
        <h4>{title}</h4>
        <p>{text}</p>
        <Button onClick={onClose}>{action}</Button>
      </div>
    </div>
  );
}

function TestHint({ children }: { children: ReactNode }) {
  return (
    <div className="test-hint">
      <span>Petunjuk uji</span>
      <p>{children}</p>
    </div>
  );
}

function PrototypeTester({ onClose }: { onClose: () => void }) {
  const [flow, setFlow] = useState<TestFlow | null>(null);
  const [step, setStep] = useState(0);
  const [c6Role, setC6Role] = useState<"kurir" | "penerima" | null>(null);
  const [overlay, setOverlay] = useState<{
    title: string;
    text: string;
    next?: number;
    icon?: IconName;
  } | null>(null);
  const [vehicle, setVehicle] = useState<"motor" | "mobil">("motor");
  const [destination, setDestination] = useState("Jl. Melati No. 18, Bandung");
  const [route, setRoute] = useState<"A" | "B">("A");
  const [severity, setSeverity] = useState("Sedang");
  const [duration, setDuration] = useState("Sekitar 2 jam");
  const [extraTime, setExtraTime] = useState<"5" | "10" | "none">("none");
  const [handoffOption, setHandoffOption] = useState("Diterima langsung oleh penerima");
  const [category, setCategory] = useState("Banjir");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [description, setDescription] = useState("");
  const [reportStatus, setReportStatus] = useState("Masih Terjadi");
  const [ready, setReady] = useState<"Siap" | "Belum Siap">("Siap");
  const [message, setMessage] = useState("Silakan hubungi saya ketika sudah sampai");
  const [problem, setProblem] = useState("Tidak berada di lokasi");

  const chooseFlow = (value: TestFlow) => {
    setFlow(value);
    setStep(0);
    setC6Role(null);
    setOverlay(null);
  };
  const next = (target = step + 1) => setStep(target);
  const back = () => (step > 0 ? setStep(step - 1) : setFlow(null));
  const finish = (title: string, text: string, nextStep?: number) =>
    setOverlay({ title, text, next: nextStep });
  const closeOverlay = () => {
    const target = overlay?.next;
    setOverlay(null);
    if (target !== undefined) setStep(target);
  };

  const renderC2 = () => {
    if (step === 0)
      return (
        <Phone title="Pilih Kendaraan" eyebrow="UJI PROTOTIPE · C2" back onBack={back}>
          <TestHint>Pilih kendaraan yang sedang Anda gunakan untuk mengantar paket.</TestHint>
          <div className="intro-copy">
            <h4>Kendaraan apa yang Anda gunakan?</h4>
            <p>Rute akan disesuaikan dengan ukuran dan akses kendaraan.</p>
          </div>
          <div className="vehicle-grid">
            <button
              className={`vehicle-option ${vehicle === "motor" ? "selected" : ""}`}
              onClick={() => { setVehicle("motor"); setRoute("A"); }}
            >
              <Icon name="bike" size={42} />
              <strong>Sepeda Motor</strong>
              <span>Cocok untuk jalan sempit</span>
              {vehicle === "motor" && (
                <i>
                  <Icon name="check" size={14} />
                </i>
              )}
            </button>
            <button
              className={`vehicle-option ${vehicle === "mobil" ? "selected" : ""}`}
              onClick={() => { setVehicle("mobil"); setRoute("B"); }}
            >
              <Icon name="car" size={42} />
              <strong>Mobil/Van</strong>
              <span>Perlu akses jalan lebih lebar</span>
              {vehicle === "mobil" && (
                <i>
                  <Icon name="check" size={14} />
                </i>
              )}
            </button>
          </div>
          <div className="spacer" />
          <Button onClick={() => next()}>Lanjutkan</Button>
        </Phone>
      );
    if (step === 1)
      return (
        <Phone title="Tujuan Pengantaran" eyebrow="LANGKAH 2 DARI 3" onBack={back}>
          <TestHint>Ketik atau pilih alamat contoh, lalu lihat rekomendasi rute.</TestHint>
          <TestInput
            label="Cari alamat"
            value={destination}
            onChange={setDestination}
            placeholder="Masukkan alamat tujuan"
          />
          <button
            className="map-clickable"
            onClick={() =>
              finish("Titik dipilih", "Lokasi tujuan telah disesuaikan dengan pin pada peta.")
            }
          >
            <MapPlaceholder label="Ketuk untuk atur titik" />
          </button>
          <button
            className="card compact interactive-card"
            onClick={() => setDestination("Jl. Melati No. 18, Sukajadi, Bandung")}
          >
            <Tag>Alamat contoh</Tag>
            <h4>Jl. Melati No. 18</h4>
            <p>Gerbang hijau, samping Apotek Sehat</p>
          </button>
          <InfoRow icon="user" label="Penerima" value="Rina Pratama · 0812 3456 7890" />
          <div className="spacer" />
          <Button onClick={() => next()} disabled={!destination.trim()}>
            Lihat Rekomendasi Rute
          </Button>
        </Phone>
      );
    if (step === 2)
      return (
        <Phone
          title="Rekomendasi Rute"
          eyebrow={vehicle === "mobil" ? "UNTUK MOBIL/VAN" : "UNTUK SEPEDA MOTOR"}
          onBack={back}
        >
          <MapPlaceholder variant="alternatives" />
          <div className="content-title">
            <div>
              <h4>Rute untuk {vehicle === "motor" ? "sepeda motor" : "mobil/van"}</h4>
              <p>{vehicle === "motor" ? "Rute A direkomendasikan karena lebih cepat dan dapat dilalui motor." : "Rute B direkomendasikan karena memiliki akses jalan lebih lebar untuk mobil/van."}</p>
            </div>
          </div>
          <button
            className={`route-card interactive-card ${route === "A" ? "selected" : ""}`}
            onClick={() => setRoute("A")}
          >
            <RouteCard
              name="Rute A · Jl. Anggrek"
              time="18 mnt"
              distance="4,2 km"
              condition="Lebar jalan 2 m di 200 m terakhir · lalu lintas lancar"
              recommended={vehicle === "motor"}
            />
          </button>
          <button
            className={`route-card interactive-card ${route === "B" ? "selected" : ""}`}
            onClick={() => setRoute("B")}
          >
            <RouteCard
              name="Rute B · Jl. Mawar"
              time="23 mnt"
              distance="5,1 km"
              condition="Jalan lebar · lalu lintas ramai · tersedia ruang manuver"
              recommended={vehicle === "mobil"}
            />
          </button>
          <div className="spacer" />
          <div className="button-row">
            <Button secondary onClick={() => next(3)}>
              Bandingkan
            </Button>
            <Button onClick={() => next(4)}>Lihat Detail</Button>
          </div>
        </Phone>
      );
    if (step === 3)
      return (
        <Phone title="Bandingkan Rute" eyebrow={`RUTE ${route} DIPILIH`} onBack={back}>
          <div className="mini-map">
            <MapPlaceholder variant="alternatives" />
          </div>
          <button
            className={`interactive-card ${route === "A" ? "active-choice" : ""}`}
            onClick={() => setRoute("A")}
          >
            <RouteCard
              name="Rute A · Jl. Anggrek"
              time="18 mnt"
              distance="4,2 km"
              condition="Lebar, lalu 200 m sempit · lancar"
              recommended={vehicle === "motor"}
            />
          </button>
          <button
            className={`interactive-card ${route === "B" ? "active-choice" : ""}`}
            onClick={() => setRoute("B")}
          >
            <RouteCard
              name="Rute B · Jl. Mawar"
              time="23 mnt"
              distance="5,1 km"
              condition="Jalan lebar · lalu lintas ramai"
              recommended={vehicle === "mobil"}
            />
          </button>
          <div className="comparison-head">
            <span>Kondisi</span>
            <strong>A</strong>
            <strong>B</strong>
          </div>
          <div className="compare-row">
            <span>Akses kendaraan</span>
            <b>{vehicle === "mobil" ? "Tidak disarankan" : "Sesuai"}</b>
            <b>Sesuai</b>
          </div>
          <div className="compare-row">
            <span>Lalu lintas</span>
            <b>Lancar</b>
            <b>Ramai</b>
          </div>
          <div className="spacer" />
          <Button onClick={() => next(4)}>Pilih Rute {route}</Button>
        </Phone>
      );
    if (step === 4)
      return (
        <Phone title={`Detail Rute ${route}`} eyebrow="RINCIAN PERJALANAN" onBack={back}>
          <div className="summary-band boxed">
            <Metric value={route === "A" ? "18 menit" : "23 menit"} label="Estimasi" />
            <Metric value={route === "A" ? "4,2 km" : "5,1 km"} label="Jarak" />
          </div>
          <div className="timeline">
            <div>
              <i>1</i>
              <p>
                <strong>Jl. Merdeka</strong>
                <span>1,8 km · Jalan lebar</span>
              </p>
            </div>
            <div>
              <i>2</i>
              <p>
                <strong>
                  {route === "A" ? "Belok kiri ke Jl. Anggrek" : "Lurus ke Jl. Mawar"}
                </strong>
                <span>
                  {route === "A"
                    ? "Jalan menyempit setelah 1,5 km"
                    : "Jalan lebar, lalu lintas padat"}
                </span>
              </p>
            </div>
            <div>
              <i>3</i>
              <p>
                <strong>Tujuan di gerbang hijau</strong>
                <span>Hubungi Rina saat tiba</span>
              </p>
            </div>
          </div>
          {route === "A" && (
            <div className="note warning">
              <Icon name="warning" />
              <p>
                <strong>Peringatan akses</strong>
                <span>Bagian jalan hanya selebar 2 meter.</span>
              </p>
            </div>
          )}
          <InfoRow icon="message" label="Instruksi akses" value="Masuk melalui gerbang samping" />
          <InfoRow icon="map" label="Kondisi lalu lintas" value={route === "A" ? "Lancar" : "Ramai"} />
          <InfoRow icon="location" label="Titik berhenti" value={route === "B" ? "Area parkir dekat gerbang utama" : "Ruang putar terbatas di gang"} />
          <div className="spacer" />
          <Button onClick={() => (vehicle === "mobil" && route === "A" ? next(5) : next(7))}>
            Gunakan Rute Ini
          </Button>
        </Phone>
      );
    if (step === 5)
      return (
        <Phone title="Akses Kendaraan" eyebrow="PERINGATAN RUTE" onBack={back}>
          <div className="warning-hero">
            <div>
              <Icon name="warning" size={42} />
            </div>
            <h4>Jalan terlalu sempit untuk mobil/van</h4>
            <p>Gang Melati hanya selebar 2 meter dan tidak aman untuk kendaraan Anda.</p>
          </div>
          <div className="blocked-diagram">
            <Icon name="car" size={46} />
            <span />
            <div>2 m</div>
            <span />
          </div>
          <div className="card">
            <div className="row-between">
              <strong>Bagian tidak sesuai</strong>
              <Tag>350 m</Tag>
            </div>
            <p>Gang Melati, setelah bengkel motor</p>
          </div>
          <div className="spacer" />
          <Button icon="map" onClick={() => next(6)}>
            Cari Rute Alternatif
          </Button>
          <Button
            secondary
            onClick={() => {
              setVehicle("motor");
              next(0);
            }}
          >
            Ganti Kendaraan
          </Button>
        </Phone>
      );
    if (step === 6)
      return (
        <Phone title="Rute Alternatif" eyebrow="AMAN UNTUK MOBIL/VAN" onBack={back}>
          <MapPlaceholder variant="route" label="Menghindari Gang Melati" />
          <div className="change-banner">
            <Icon name="check" />
            <div>
              <strong>Rute aman ditemukan</strong>
              <span>Menghindari jalan sempit sejauh 350 m</span>
            </div>
          </div>
          <div className="summary-band boxed">
            <Metric value="24 menit" label="Estimasi baru" />
            <Metric value="5,4 km" label="Jarak baru" />
          </div>
          <InfoRow icon="map" label="Akses" value="Jalan lebar untuk mobil/van" />
          <InfoRow icon="clock" label="Diperbarui" value="2 menit yang lalu" />
          <div className="spacer" />
          <Button
            onClick={() => {
              setRoute("B");
              next(7);
            }}
          >
            Gunakan Rute Alternatif
          </Button>
        </Phone>
      );
    return (
      <Phone
        title="Navigasi Aktif"
        eyebrow={`RUTE ${route} · ${vehicle === "mobil" ? "MOBIL/VAN" : "MOTOR"}`}
        onBack={back}
      >
        <div className="navigation-map">
          <MapPlaceholder variant="route" />
          <div className="direction-card">
            <div className="turn-arrow">↰</div>
            <div>
              <strong>Belok kiri</strong>
              <span>Dalam 200 m ke Jl. Anggrek</span>
            </div>
          </div>
        </div>
        <div className="nav-stats">
          <div>
            <strong>17 mnt</strong>
            <span>Estimasi tiba 08.56</span>
          </div>
          <div>
            <strong>4,0 km</strong>
            <span>Tersisa</span>
          </div>
        </div>
        <div className="card recipient-card">
          <div>
            <span>Tujuan</span>
            <strong>Rina Pratama</strong>
            <p>{destination}</p>
          </div>
          <button
            className="round-button"
            onClick={() =>
              finish("Menghubungi penerima", "Simulasi panggilan kepada Rina Pratama.")
            }
          >
            <Icon name="phone" />
          </button>
        </div>
        <div className="spacer" />
        <Button
          onClick={() =>
            finish(
              "Skenario C2 selesai",
              "Anda berhasil memilih kendaraan, tujuan, dan rute yang sesuai.",
              0,
            )
          }
        >
          Selesaikan Navigasi
        </Button>
      </Phone>
    );
  };

  const renderC3 = () => {
    if (step === 0)
      return (
        <Phone title="Kondisi Jalan" eyebrow="UJI PROTOTIPE · C3" back onBack={back}>
          <TestHint>Buat laporan baru, kemudian periksa hasilnya pada peta.</TestHint>
          <div className="large-map test-map">
            <MapPlaceholder variant="reports" onReportPinClick={(item) => { setCategory(item); finish(`Laporan ${item}`, `Detail laporan ${item} di sekitar Jl. Sukajadi.`, 7); }} />
          </div>
          <button className="card interactive-card report-map-card" onClick={() => next(7)}>
            <Tag dark>Banjir</Tag>
            <strong>Jl. Sukajadi · 1,2 km</strong>
            <span>Ketuk untuk membuka laporan</span>
          </button>
          <div className="spacer" />
          <Button icon="plus" onClick={() => next(1)}>
            Buat Laporan
          </Button>
          <Button secondary onClick={() => next(11)}>
            Riwayat Laporan
          </Button>
        </Phone>
      );
    if (step === 1)
      return (
        <Phone title="Laporkan Kondisi Jalan" eyebrow="LANGKAH 1 DARI 4" onBack={back}>
          <Progress active={1} />
          <div className="intro-copy compact-top">
            <h4>Apa yang Anda temukan?</h4>
            <p>Pilih satu kategori yang paling sesuai.</p>
          </div>
          <div className="category-list">
            {["Jalan Ditutup", "Banjir", "Jalan Sempit", "Jalan Rusak", "Akses Terhalang"].map(
              (item) => (
                <button
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                  key={item}
                >
                  <span className="category-symbol">{item === "Jalan Ditutup" ? "🚧" : item === "Banjir" ? "🌊" : item === "Jalan Rusak" ? "⚠" : item === "Jalan Sempit" ? "↔" : item === "Akses Terhalang" ? "⛔" : "!"}</span>
                  <span className="category-copy"><strong>{item}</strong><small>{item === "Jalan Sempit" ? "Masih dapat dilewati, tetapi ruang terbatas" : item === "Akses Terhalang" || item === "Jalan Ditutup" ? "Jalan tertutup atau tidak dapat dilalui" : item === "Banjir" ? "Jalan tergenang air" : "Permukaan jalan berlubang atau rusak"}</small></span>
                  {category === item && <Icon name="check" />}
                </button>
              ),
            )}
          </div>
          <div className="spacer" />
          <Button onClick={() => next()}>Lanjutkan</Button>
        </Phone>
      );
    if (step === 2)
      return (
        <Phone title="Tambahkan Foto" eyebrow="LANGKAH 2 DARI 4" onBack={back}>
          <Progress active={1} />
          <TestHint>Simulasikan unggah foto. Tidak ada berkas yang benar-benar dikirim.</TestHint>
          <button className="photo-upload-button" onClick={() => setPhotoAdded(!photoAdded)}>
            <PhotoBox filled={photoAdded} />
          </button>
          {photoAdded && (
            <div className="change-banner inline-banner">
              <Icon name="check" />
              <div>
                <strong>Foto ditambahkan</strong>
                <span>foto-banjir-jalan.jpg</span>
              </div>
            </div>
          )}
          <div className="note">
            <Icon name="warning" />
            <p>
              <strong>Utamakan keselamatan</strong>
              <span>Ambil foto hanya saat kendaraan berhenti.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button icon="plus" onClick={() => setPhotoAdded(true)}>
            {photoAdded ? "Ganti Foto" : "Tambah Foto"}
          </Button>
          <Button secondary onClick={() => next()}>
            Lanjutkan
          </Button>
        </Phone>
      );
    if (step === 3)
      return (
        <Phone title="Lokasi Laporan" eyebrow="LANGKAH 3 DARI 4" onBack={back}>
          <Progress active={2} />
          <button
            className="map-clickable location-map"
            onClick={() =>
              finish("Lokasi disesuaikan", "Pin laporan dipindahkan ke Jl. Sukajadi No. 42.")
            }
          >
            <MapPlaceholder variant="location" label="Ketuk untuk sesuaikan" />
          </button>
          <div className="location-pin-caption">
            <span>PIN OTOMATIS</span>
            <strong>Jl. Sukajadi No. 42, Bandung</strong>
            <p>Akurasi lokasi ±8 meter</p>
          </div>
          <div className="note small">
            <Icon name="location" />
            <p>
              <strong>Lokasi Anda terdeteksi</strong>
              <span>Ketuk peta untuk menyesuaikan titik.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button onClick={() => next()}>Gunakan Lokasi Ini</Button>
        </Phone>
      );
    if (step === 4)
      return (
        <Phone title="Detail Tambahan" eyebrow="LANGKAH 4 DARI 4" onBack={back}>
          <Progress active={3} />
          <div className="intro-copy compact-top">
            <h4>Tambahkan keterangan</h4>
            <p>Berikan informasi singkat untuk kurir lain.</p>
          </div>
          <TestInput
            label="Deskripsi"
            value={description}
            onChange={setDescription}
            placeholder="Jelaskan kondisi jalan yang ditemukan"
            multiline
          />
          <div className="character-count">{description.length} / 250</div>
          <div className="card report-extra-fields">
            <strong>Tingkat keparahan</strong>
            <div className="choice-stack compact-choice">{["Ringan", "Sedang", "Berat"].map((item) => <button type="button" key={item} className={severity === item ? "selected" : ""} onClick={() => setSeverity(item)}><div><span><strong>{item}</strong><small>{item === "Ringan" ? "Masih dapat dilalui" : item === "Sedang" ? "Perjalanan mulai terganggu" : "Akses sangat terganggu"}</small></span></div><i /></button>)}</div>
            <TestInput label="Perkiraan durasi gangguan" value={duration} onChange={setDuration} placeholder="Contoh: Sekitar 2 jam" />
            <small className="field-help">Isi jika durasi gangguan diketahui. Jika belum diketahui, tulis "Belum diketahui".</small>
          </div>
          <div className="suggestions">
            <span>Saran cepat</span>
            <button
              onClick={() =>
                setDescription(
                  "Air setinggi mata kaki. Motor masih dapat lewat perlahan dari sisi kanan.",
                )
              }
            >
              Air setinggi mata kaki
            </button>
            <button onClick={() => setDescription("Hanya sepeda motor yang dapat melintas.")}>
              Hanya motor yang bisa lewat
            </button>
          </div>
          <div className="card">
            <InfoRow icon="clock" label="Waktu laporan" value="Hari ini, 08.42 WIB" />
            <InfoRow icon="location" label="Lokasi" value="Jl. Sukajadi No. 42" />
          </div>
          <div className="spacer" />
          <Button onClick={() => next()} disabled={!description.trim()}>
            Lihat Ringkasan
          </Button>
        </Phone>
      );
    if (step === 5)
      return (
        <Phone title="Pratinjau Laporan" eyebrow="PERIKSA KEMBALI" onBack={back}>
          <PhotoBox filled={photoAdded} />
          <div className="preview-title">
            <div>
              <Tag dark>{category}</Tag>
              <h4>Jl. Sukajadi No. 42</h4>
              <p>Hari ini, 08.42 WIB</p><small>Keparahan: {severity} · Durasi: {duration || "Belum diketahui"}</small>
            </div>
            <button className="icon-button" onClick={() => next(4)}>
              <Icon name="edit" />
            </button>
          </div>
          <div className="description-box">
            <span>Deskripsi</span>
            <p>{description}</p>
          </div>
          <div className="note small">
            <Icon name="user" />
            <p>
              <strong>Dibagikan sebagai Kurir #1842</strong>
              <span>Nomor pribadi tidak ditampilkan.</span>
            </p>
          </div>
          <div className="spacer" />
          <Button
            icon="send"
            onClick={() =>
              finish(
                "Laporan berhasil dikirim",
                "Laporan kini tampil pada peta dan dapat dikonfirmasi kurir lain.",
                6,
              )
            }
          >
            Kirim Laporan
          </Button>
        </Phone>
      );
    if (step === 6)
      return (
        <Phone title="Laporan Terkirim" back={false}>
          <div className="success-state">
            <div>
              <Icon name="check" size={46} />
            </div>
            <h4>Laporan berhasil dikirim</h4>
            <p>Terima kasih telah membantu perjalanan kurir lain menjadi lebih aman.</p>
          </div>
          <div className="receipt">
            <div className="row-between">
              <Tag dark>{category}</Tag>
              <span>Baru saja</span>
            </div>
            <h4>Jl. Sukajadi No. 42</h4>
            <p>{description}</p>
            <div className="divider" />
            <span>ID Laporan · #LPR-2048</span>
          </div>
          <div className="spacer" />
          <Button onClick={() => next(0)}>Lihat Laporan di Peta</Button>
          <Button secondary onClick={() => next(0)}>
            Kembali ke Peta
          </Button>
        </Phone>
      );
    if (step === 7)
      return (
        <Phone title="Detail Laporan" eyebrow="LAPORAN #LPR-2048" onBack={back}>
          <PhotoBox filled />
          <div className="preview-title">
            <div>
              <Tag dark>{category}</Tag>
              <h4>Jl. Sukajadi No. 42</h4>
              <p>Dilaporkan 8 menit lalu</p>
            </div>
          </div>
          <div className="status-card">
            <span>Status laporan</span>
            <div>
              <i className="status-dot" />
              <strong>{reportStatus}</strong>
            </div>
            <p>Dikonfirmasi 4 kurir</p>
          </div>
          <div className="description-box">
            <span>Keterangan</span>
            <p>{description || "Air setinggi mata kaki. Motor masih dapat melintas perlahan."}</p>
            <div className="divider" />
            <p><strong>Tingkat keparahan:</strong> {severity}</p>
            <p><strong>Perkiraan durasi:</strong> {duration || "Belum diketahui"}</p>
            <p><strong>Waktu laporan:</strong> Hari ini, 08.42 WIB</p>
          </div>
          <div className="spacer" />
          <Button onClick={() => next(8)}>Konfirmasi Kondisi</Button>
          <Button secondary onClick={() => next(9)}>
            Perbarui Laporan
          </Button>
          <Button secondary onClick={() => next(10)}>
            Lihat Peringatan Rute
          </Button>
        </Phone>
      );
    if (step === 8)
      return (
        <Phone title="Konfirmasi Kondisi" eyebrow="LAPORAN KURIR LAIN" onBack={back}>
          <div className="confirm-visual">
            <Icon name="warning" size={36} />
            <Tag dark>{category}</Tag>
            <h4>Apakah kondisi ini masih terjadi?</h4>
            <p>Jl. Sukajadi No. 42 · dilaporkan 18 menit lalu</p>
          </div>
          <div className="mini-location larger">
            <MapPlaceholder variant="reports" />
          </div>
          <div className="spacer" />
          <Button
            icon="warning"
            onClick={() => {
              setReportStatus("Masih Terjadi");
              finish("Konfirmasi terkirim", "Status laporan diperbarui menjadi Masih Terjadi.", 7);
            }}
          >
            Masih Terjadi
          </Button>
          <Button
            secondary
            icon="check"
            onClick={() => {
              setReportStatus("Sudah Normal");
              finish("Konfirmasi terkirim", "Status laporan diperbarui menjadi Sudah Normal.", 7);
            }}
          >
            Sudah Normal
          </Button>
        </Phone>
      );
    if (step === 9)
      return (
        <Phone title="Perbarui Laporan" eyebrow="LAPORAN ANDA" onBack={back}>
          <h4 className="section-label">Ubah status laporan</h4>
          <div className="radio-list">
            {["Masih Terjadi", "Sedang Ditangani", "Sudah Normal"].map((item) => (
              <button
                className={reportStatus === item ? "selected" : ""}
                onClick={() => setReportStatus(item)}
                key={item}
              >
                <i />
                <div>
                  <strong>{item}</strong>
                  <span>
                    {item === "Masih Terjadi"
                      ? "Kondisi belum berubah"
                      : item === "Sedang Ditangani"
                        ? "Ada petugas di lokasi"
                        : "Jalan sudah dapat dilalui"}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <TestInput
            label="Catatan pembaruan"
            value={description}
            onChange={setDescription}
            placeholder="Tambahkan informasi terbaru"
            multiline
          />
          <div className="spacer" />
          <Button
            onClick={() => finish("Laporan diperbarui", `Status sekarang: ${reportStatus}.`, 7)}
          >
            Simpan Pembaruan
          </Button>
        </Phone>
      );
    if (step === 10)
      return (
        <Phone
          title="Peringatan Rute"
          back={false}
          action={
            <button className="icon-button" onClick={() => next(7)}>
              <Icon name="close" />
            </button>
          }
        >
          <div className="notification-hero">
            <span>PERINGATAN DI SEKITAR</span>
            <div>
              <Icon name="warning" size={40} />
            </div>
            <h4>Terdapat laporan banjir di sekitar rute Anda</h4>
            <p>Lokasi laporan berjarak 450 m dari jalur perjalanan.</p>
          </div>
          <div className="mini-location larger">
            <MapPlaceholder variant="reports" />
          </div>
          <div className="card">
            <div className="row-between">
              <Tag dark>{category}</Tag>
              <span>6 menit lalu</span>
            </div>
            <h4>Jl. Sukajadi, depan pasar</h4>
            <p>Status: {reportStatus}</p>
          </div>
          <div className="spacer" />
          <Button
            onClick={() =>
              finish("Rute alternatif dipilih", "Navigasi akan menghindari area laporan.", 11)
            }
          >
            Lihat Rute Alternatif
          </Button>
          <Button secondary onClick={() => next(11)}>
            Lanjutkan Rute
          </Button>
        </Phone>
      );
    return (
      <Phone title="Riwayat Laporan" eyebrow="AKTIVITAS ANDA" onBack={back}>
        <div className="summary-band boxed">
          <Metric value="12" label="Total laporan" />
          <Metric value="3" label="Masih aktif" />
          <Metric value="9" label="Selesai" />
        </div>
        <div className="history-list test-history">
          {[
            [category, "Jl. Sukajadi No. 42", reportStatus],
            ["Jalan Rusak", "Jl. Pasteur, dekat SPBU", "Sedang Ditangani"],
            ["Jalan Ditutup", "Jl. Cendana Raya", "Sudah Normal"],
          ].map(([cat, loc, status], index) => (
            <button
              key={loc}
              onClick={() =>
                index === 0
                  ? next(7)
                  : finish("Detail laporan", `${cat} di ${loc}. Status: ${status}.`)
              }
            >
              <span className="history-icon">!</span>
              <div>
                <strong>{cat}</strong>
                <p>{loc}</p>
                <small>Hari ini · 08.42</small>
              </div>
              <Tag dark={status === "Masih Terjadi"}>{status}</Tag>
            </button>
          ))}
        </div>
        <div className="spacer" />
        <Button
          onClick={() =>
            finish(
              "Skenario C3 selesai",
              "Anda berhasil membuat, mengirim, dan memperbarui laporan kondisi jalan.",
              0,
            )
          }
        >
          Selesaikan Skenario
        </Button>
      </Phone>
    );
  };

  const renderC6 = () => {
    const c6Back = () => {
      if (step > 0) setStep(step - 1);
      else setC6Role(null);
    };
    const callPerson = (person: string) =>
      finish(`Menghubungi ${person}`, `Simulasi panggilan kepada ${person}. Tidak ada panggilan telepon sungguhan yang dilakukan.`);

    if (!c6Role)
      return (
        <Phone title="Pilih Peran C6" eyebrow="NOTIFIKASI KEDATANGAN" back onBack={back}>
          <TestHint>Pilih peran yang ingin diuji. Seluruh fitur dan alur C6 lama tetap dipertahankan, hanya dipisahkan berdasarkan peran.</TestHint>
          <div className="intro-copy">
            <h4>Anda menggunakan aplikasi sebagai siapa?</h4>
            <p>Pilih tampilan Kurir atau Penerima untuk memulai skenario.</p>
          </div>
          <div className="scenario-list">
            <button onClick={() => { setC6Role("kurir"); setStep(0); }}>
              <b><Icon name="bike" /></b>
              <div><strong>C6 Kurir</strong><span>Pengantaran aktif, koordinasi dengan penerima, dan serah terima paket.</span></div>
              <Icon name="arrow" />
            </button>
            <button onClick={() => { setC6Role("penerima"); setStep(0); }}>
              <b><Icon name="user" /></b>
              <div><strong>C6 Penerima</strong><span>Notifikasi, pelacakan, kesiapan, lokasi, pesan, dan kendala penerimaan.</span></div>
              <Icon name="arrow" />
            </button>
          </div>
        </Phone>
      );

    if (c6Role === "kurir") {
      if (step === 0)
        return (
          <Phone title="Pengantaran Aktif" eyebrow="C6 · TAMPILAN KURIR" back onBack={c6Back}>
            <TestHint>Periksa rute dan estimasi tiba, hubungi penerima bila diperlukan, lalu kirim notifikasi kedatangan.</TestHint>
            <div className="delivery-map">
              <MapPlaceholder variant="route" />
              <div className="eta-float"><span>Tiba dalam</span><strong>20 menit</strong></div>
            </div>
            <div className="package-head">
              <div><span>PAKET #PKT-72841</span><h4>Rina Pratama</h4><p>Jl. Melati No. 18, Sukajadi</p></div>
              <button className="round-button" onClick={() => callPerson("Rina Pratama · Penerima")}><Icon name="phone" /></button>
            </div>
            <div className="summary-band boxed"><Metric value="09.25" label="Estimasi tiba" /><Metric value="4,2 km" label="Jarak tersisa" /></div>
            <div className="current-status"><span>Status pengantaran</span><div><i /><strong>Dalam Perjalanan</strong></div></div>
            <InfoRow icon="message" label="Catatan penerima" value={message || "Hubungi ketika sudah sampai"} />
            <div className="spacer" />
            <Button onClick={() => finish("Notifikasi terkirim", "Penerima menerima notifikasi perkiraan kedatangan kurir.", 1)}>Kirim Notifikasi Kedatangan</Button>
          </Phone>
        );
      if (step === 1)
        return (
          <Phone title="Respons Penerima" eyebrow="C6 · TAMPILAN KURIR" back onBack={c6Back}>
            <TestHint>Periksa respons kesiapan penerima dan instruksi yang dikirimkan.</TestHint>
            <div className="response-banner"><Icon name={ready === "Siap" ? "check" : "clock"} size={32} /><div><span>PENERIMA MERESPONS</span><strong>{ready === "Siap" ? "Siap menerima paket" : "Belum siap menerima paket"}</strong><p>Respons diterima</p></div></div>
            <div className="card recipient-card"><div><span>Penerima</span><strong>Rina Pratama</strong><p>Jl. Melati No. 18, Sukajadi</p></div><button className="round-button" onClick={() => callPerson("Rina Pratama · Penerima")}><Icon name="phone" /></button></div>
            <div className="coordination-status">
              <span>Status koordinasi</span>
              <div><i><Icon name="check" size={13} /></i><p><strong>Notifikasi kedatangan terkirim</strong><span>09.10 WIB</span></p></div>
              <div><i><Icon name="check" size={13} /></i><p><strong>{ready === "Siap" ? "Penerima menyatakan siap" : "Penerima belum siap"}</strong><span>09.13 WIB</span></p></div>
              <div><i>3</i><p><strong>Serah terima paket</strong><span>Menunggu kedatangan</span></p></div>
            </div>
            <div className="note small"><Icon name="message" /><p><strong>Pesan penerima</strong><span>“{message || "Tidak ada pesan tambahan"}”</span></p></div>
            <div className="spacer" />
            <Button onClick={() => next(2)}>Lanjutkan Navigasi</Button>
          </Phone>
        );
      return (
        <Phone title="Serah Terima Paket" eyebrow="C6 · TAMPILAN KURIR" back onBack={c6Back}>
          <div className="handoff-hero"><div><Icon name="home" size={37} /></div><span>KURIR TIBA DI TUJUAN</span><h4>Konfirmasi serah terima</h4><p>Pastikan paket telah diterima oleh penerima yang benar.</p></div>
          <div className="card handoff-card"><span>PAKET #PKT-72841</span><h4>Rina Pratama</h4><p>Jl. Melati No. 18, Sukajadi</p><div className="divider" /><div className="row-between"><span>Waktu tiba</span><strong>09.34 WIB</strong></div></div>
          <Field label="Nama penerima paket" value="Rina Pratama" />
          <button type="button" className="proof-box" style={{ width: "100%", textAlign: "left", border: "1px dashed #777", background: "#f8f8f8", color: "inherit", cursor: "pointer", padding: 14, display: "flex", alignItems: "center", gap: 12 }} onClick={() => finish("Bukti ditambahkan", "Foto serah terima berhasil disimulasikan.")}><Icon name="plus" /><div><strong>Tambah bukti serah terima</strong><span>Foto atau tanda tangan penerima</span></div></button>
          <div className="check-confirm"><span><Icon name="check" /></span><p>Saya memastikan paket telah diserahkan kepada penerima.</p></div>
          <div className="spacer" />
          <Button icon="check" onClick={() => finish("Skenario C6 Kurir selesai", "Alur pengantaran, koordinasi, dan konfirmasi serah terima telah disimulasikan.", 0)}>Paket Telah Diserahkan</Button>
        </Phone>
      );
    }

    // C6 Penerima: delapan layar asli dipisahkan dari alur Kurir.
    if (step === 0)
      return (
        <Phone title="Kiriman Anda" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <TestHint>Periksa notifikasi perkiraan kedatangan dan informasi kurir.</TestHint>
          <div className="arrival-hero"><span>PERKIRAAN KEDATANGAN</span><strong>15</strong><p>menit lagi</p><small>Kurir diperkirakan tiba pukul 09.25</small></div>
          <div className="courier-card"><div className="avatar"><Icon name="user" size={26} /></div><div><span>Kurir Anda</span><strong>Adi Saputra</strong><p>ID Kurir K-1842 · Sepeda Motor</p></div><button className="round-button" onClick={() => callPerson("Adi Saputra · Kurir")}><Icon name="phone" /></button></div>
          <div className="notification-box"><Icon name="clock" /><p><strong>Kurir diperkirakan tiba dalam 15 menit</strong><span>Siapkan diri untuk menerima paket.</span></p></div>
          <div className="card"><span>Detail paket #PKT-72841</span><h4>Rina Pratama</h4><p>Jl. Melati No. 18, Sukajadi, Bandung 40162</p><div className="divider" /><div className="row-between"><span>Status</span><strong>Dalam perjalanan</strong></div></div>
          <div className="spacer" /><Button onClick={() => next(1)}>Lihat Status Pengantaran</Button>
        </Phone>
      );
    if (step === 1)
      return (
        <Phone title="Status Pengantaran" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <div className="package-code"><span>PAKET #PKT-72841</span><strong>Estimasi tiba 09.25</strong></div>
          <div className="mini-location larger"><MapPlaceholder variant="route" label="Posisi kurir menuju lokasi Anda" /></div>
          <div className="card"><InfoRow icon="location" label="Posisi kurir" value="Jl. Sukajadi · 1,2 km dari tujuan" /><InfoRow icon="clock" label="Estimasi terbaru" value="09.25 WIB" /></div>
          <DeliveryProgress active={1} />
          <div className="note small"><Icon name="clock" /><p><strong>Kurir mendekati lokasi</strong><span>Jarak tersisa sekitar 1,2 km.</span></p></div>
          <div className="card recipient-card"><div><span>Kurir</span><strong>Adi Saputra</strong><p>Sepeda Motor · K-1842</p></div><button className="round-button" onClick={() => callPerson("Adi Saputra · Kurir")}><Icon name="phone" /></button></div>
          <div className="spacer" /><Button secondary onClick={() => next(2)}>Konfirmasi Kesiapan</Button>
        </Phone>
      );
    if (step === 2)
      return (
        <Phone title="Konfirmasi Kesiapan" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <div className="readiness-hero"><div><Icon name="home" size={40} /></div><h4>Apakah Anda siap menerima paket?</h4><p>Kurir diperkirakan tiba dalam 12 menit.</p></div>
          <div className="card"><InfoRow icon="clock" label="Perkiraan tiba" value="09.25 WIB" /><InfoRow icon="location" label="Alamat" value="Jl. Melati No. 18" /></div>
          <div className="choice-stack">{(["Siap", "Belum Siap"] as const).map((item) => <button key={item} className={ready === item ? "selected" : ""} onClick={() => setReady(item)}><div><Icon name={item === "Siap" ? "check" : "clock"} /><span><strong>{item}</strong><small>{item === "Siap" ? "Saya dapat menerima paket" : "Saya perlu waktu tambahan"}</small></span></div><i /></button>)}</div>
          {ready === "Belum Siap" && <div className="card"><strong>Berapa waktu tambahan yang dibutuhkan?</strong><div className="button-row"><Button secondary onClick={() => setExtraTime("5")}>5 menit</Button><Button secondary onClick={() => setExtraTime("10")}>10 menit</Button></div><small>{extraTime === "none" ? "Pilih waktu tambahan atau lanjutkan ke koordinasi." : `Permintaan tambahan ${extraTime} menit dipilih.`}</small></div>}
          <div className="spacer" /><Button onClick={() => next(3)}>Kirim Jawaban</Button>
        </Phone>
      );
    if (step === 3)
      return (
        <Phone title="Pembaruan Kedatangan" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <div className="delay-hero"><Icon name="clock" size={35} /><span>ESTIMASI DIPERBARUI</span><h4>Kurir mengalami keterlambatan</h4><p>Kondisi lalu lintas memperlambat perjalanan.</p></div>
          <div className="eta-change"><div><span>Estimasi sebelumnya</span><strong className="struck">09.25</strong></div><Icon name="arrow" /><div><span>Estimasi terbaru</span><strong>{extraTime === "5" ? "09.30" : "09.35"}</strong></div></div>
          <div className="card"><div className="row-between"><span>Tambahan waktu</span><strong>+{extraTime === "none" ? "10" : extraTime} menit</strong></div><div className="divider" /><div className="row-between"><span>Jarak tersisa</span><strong>2,1 km</strong></div></div>
          <div className="notification-box"><Icon name="warning" /><p><strong>Mohon maaf atas keterlambatan</strong><span>Anda akan menerima pengingat saat kurir mendekat.</span></p></div>
          <div className="spacer" /><Button secondary onClick={() => callPerson("Adi Saputra · Kurir")}>Hubungi Kurir</Button><Button onClick={() => next(4)}>Lanjutkan</Button>
        </Phone>
      );
    if (step === 4)
      return (
        <Phone title="Kurir Hampir Tiba" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <div className="reminder-hero"><div className="radar"><Icon name="bike" size={42} /></div><span>PENGINGAT KEDATANGAN</span><h4>Kurir sudah dekat</h4><p>Kurir berjarak sekitar 300 meter dari lokasi Anda.</p></div>
          <div className="arrival-count"><span>Diperkirakan tiba dalam</span><strong>3 menit</strong></div>
          <div className="card recipient-card"><div><span>Kurir</span><strong>Adi Saputra</strong><p>Sepeda Motor · K-1842</p></div><button className="round-button" onClick={() => callPerson("Adi Saputra · Kurir")}><Icon name="phone" /></button></div>
          <div className="checklist"><strong>Persiapkan serah terima</strong><p><Icon name="check" size={16} />Pastikan Anda berada di lokasi</p><p><Icon name="check" size={16} />Siapkan kode penerimaan 4821</p></div>
          <div className="spacer" /><Button onClick={() => next(5)}>Saya Siap</Button>
        </Phone>
      );
    if (step === 5)
      return (
        <Phone title="Konfirmasi Lokasi" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <div className="location-map"><MapPlaceholder variant="location" label="Titik pengantaran" /></div>
          <div className="location-pin-caption"><span>ALAMAT PENGANTARAN</span><strong>Jl. Melati No. 18</strong><p>Sukajadi, Bandung 40162</p></div>
          <div className="accuracy"><Icon name="location" /><div><strong>Apakah titik ini sudah tepat?</strong><span>Kurir akan menuju titik yang ditandai.</span></div></div>
          <Field label="Patokan lokasi" value="Gerbang hijau, samping Apotek Sehat" />
          <div className="button-row"><Button secondary onClick={() => finish("Ubah titik lokasi", "Simulasi pengubahan titik lokasi pengantaran.")}>Ubah Titik</Button><Button onClick={() => next(6)}>Lokasi Tepat</Button></div>
        </Phone>
      );
    if (step === 6)
      return (
        <Phone title="Pesan untuk Kurir" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
          <div className="intro-copy compact-top"><h4>Tambahkan instruksi</h4><p>Pesan akan langsung terlihat oleh kurir.</p></div>
          <TestInput label="Pesan tambahan" value={message} onChange={setMessage} placeholder="Silakan hubungi saya ketika sudah sampai" multiline />
          <div className="suggestions wide"><span>Pesan cepat</span><button onClick={() => setMessage("Titipkan ke satpam")}>“Titipkan ke satpam”</button><button onClick={() => setMessage("Tunggu di gerbang utama")}>“Tunggu di gerbang utama”</button><button onClick={() => setMessage("Jangan tekan bel")}>“Jangan tekan bel”</button></div>
          <div className="card"><InfoRow icon="user" label="Dikirim kepada" value="Adi Saputra · Kurir K-1842" /></div>
          <div className="note small"><Icon name="message" /><p><strong>Pesan terkait pengantaran saja</strong><span>Jangan bagikan informasi sensitif.</span></p></div>
          <div className="spacer" /><Button icon="send" onClick={() => next(7)}>Kirim Pesan</Button>
        </Phone>
      );
    return (
      <Phone title="Kendala Penerimaan" eyebrow="C6 · TAMPILAN PENERIMA" back onBack={c6Back}>
        <div className="problem-hero"><Icon name="warning" size={36} /><h4>Tidak dapat menerima paket?</h4><p>Beri tahu kurir agar pengantaran dapat dikoordinasikan.</p></div>
        <h4 className="section-label">Pilih alasan</h4>
        <div className="radio-list compact-list">{["Tidak berada di lokasi", "Perlu waktu tambahan", "Alamat perlu diperbaiki", "Alasan lainnya"].map((item) => <button key={item} className={problem === item ? "selected" : ""} onClick={() => setProblem(item)}><i /><div><strong>{item}</strong></div></button>)}</div>
        <TestInput label="Penjelasan singkat" value={message} onChange={setMessage} placeholder="Berikan informasi untuk kurir" multiline />
        <div className="card"><strong>Alternatif serah terima</strong><div className="radio-list compact-list">{["Diterima langsung oleh penerima", "Dititipkan kepada satpam", "Dititipkan kepada orang tepercaya", "Jadwalkan ulang kedatangan"].map((item) => <button type="button" key={item} className={handoffOption === item ? "selected" : ""} onClick={() => setHandoffOption(item)}><i /><div><strong>{item}</strong></div></button>)}</div><small>Penitipan hanya dilakukan setelah persetujuan penerima dan sesuai ketentuan pengiriman.</small></div>
        <div className="note small"><Icon name="clock" /><p><strong>Kurir tiba sekitar 8 menit lagi</strong><span>Respons Anda akan dikirim segera.</span></p></div>
        <div className="spacer" /><Button onClick={() => finish("Informasi terkirim", `Kendala: ${problem}. Pilihan serah terima: ${handoffOption}.`, 0)}>Kirim Informasi</Button><Button secondary onClick={() => finish("Skenario C6 Penerima selesai", "Alur penerima selesai tanpa mengirim kendala.", 0)}>Selesai</Button>
      </Phone>
    );
  };

  return (
    <div className="prototype-test-stage">
      <div className="test-toolbar">
        <div>
          <strong>Mode Uji Prototipe</strong>
          <span>
            {flow === "c6" && !c6Role
              ? "C6 · Pilih peran pengguna"
              : flow === "c6"
                ? `C6 ${c6Role === "kurir" ? "Kurir" : "Penerima"} · Langkah ${step + 1} dari ${c6Role === "kurir" ? 3 : 8}`
                : flow
                  ? `${flowMeta[flow].code} · Langkah ${step + 1} dari ${flowMeta[flow].total}`
                  : "Pilih skenario tugas"}
          </span>
        </div>
        <div className="toolbar-actions">
          {flow && (
            <button
              onClick={() => {
                setOverlay(null);
                setFlow(null);
                setC6Role(null);
              }}
            >
              Ganti skenario
            </button>
          )}
          <button onClick={onClose}>Tutup uji</button>
        </div>
      </div>
      <div className="test-canvas">
        {!flow ? (
          <Phone title="Pilih Skenario Uji" back={false}>
            <div className="test-welcome">
              <span>PROTOTIPE INTERAKTIF</span>
              <h4>Mulai tugas usability testing</h4>
              <p>
                Pilih satu alur. Semua data bersifat simulasi dan tidak memerlukan layanan
                eksternal.
              </p>
            </div>
            <div className="scenario-list">
              {(["c2", "c3", "c6"] as TestFlow[]).map((item) => (
                <button onClick={() => chooseFlow(item)} key={item}>
                  <b>{flowMeta[item].code}</b>
                  <div>
                    <strong>{flowMeta[item].title}</strong>
                    <span>{flowMeta[item].total} layar terhubung</span>
                  </div>
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
            <div className="note">
              <Icon name="user" />
              <p>
                <strong>Untuk moderator</strong>
                <span>Minta peserta menyelesaikan satu skenario tanpa arahan tambahan.</span>
              </p>
            </div>
          </Phone>
        ) : flow === "c2" ? (
          renderC2()
        ) : flow === "c3" ? (
          renderC3()
        ) : (
          renderC6()
        )}
        {overlay && (
          <TestOverlay
            title={overlay.title}
            text={overlay.text}
            icon={overlay.icon}
            onClose={closeOverlay}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [testing, setTesting] = useState(false);
  return (
    <div className="prototype-board">
      {testing && <PrototypeTester onClose={() => setTesting(false)} />}
      <header className="board-header">
        <div>
          <p>LOW-FIDELITY MOBILE WIREFRAME · IPHONE 16 · 393 × 852 PX</p>
          <h1>Last-Mile Delivery</h1>
          <span>
            Prototipe alur untuk rekomendasi rute, laporan jalan, dan koordinasi kedatangan.
          </span>
          <button className="launch-test" onClick={() => setTesting(true)}>
            <Icon name="arrow" />
            Mulai Uji Prototipe
          </button>
        </div>
        <nav>
          <a href="#c2">
            <b>C2</b> Rekomendasi Rute
          </a>
          <a href="#c3">
            <b>C3</b> Laporan Jalan
          </a>
          <a href="#c6">
            <b>C6</b> Notifikasi Tiba
          </a>
        </nav>
      </header>
      <div className="board-key">
        <span>
          <i className="key-dark" />
          Tindakan utama
        </span>
        <span>
          <i />
          Komponen aktif
        </span>
        <span>
          <i className="key-line" />
          Konektor alur
        </span>
        <b>32 layar mobile</b>
      </div>
      <C2Screens />
      <C3Screens />
      <C6Screens />
      <footer className="board-footer">
        Akhir prototipe · Seluruh antarmuka menggunakan Bahasa Indonesia
      </footer>
    </div>
  );
}
