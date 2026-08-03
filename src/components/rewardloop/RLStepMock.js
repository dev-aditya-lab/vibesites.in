import { Infinity as InfinityIcon, QrCode, MapPin, CheckCircle2, Gift } from "lucide-react";

function AppHeader() {
  return (
    <div className="flex items-center justify-center gap-1.5 border-b border-black/5 px-4 pb-3 pt-8">
      <InfinityIcon className="size-4 text-brand-600" strokeWidth={2.5} />
      <span className="font-display text-sm font-extrabold text-[#1a1114]">
        Reward<span className="text-brand-600">Loop</span>
      </span>
    </div>
  );
}

function ScanMock() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-[#161016] px-6 pt-8 text-white">
      <p className="text-sm font-semibold text-white/70">Scan QR Code</p>
      <div className="relative flex size-40 items-center justify-center rounded-2xl border-2 border-dashed border-white/25">
        <span className="absolute -left-1 -top-1 size-6 rounded-tl-xl border-l-2 border-t-2 border-brand-500" />
        <span className="absolute -right-1 -top-1 size-6 rounded-tr-xl border-r-2 border-t-2 border-brand-500" />
        <span className="absolute -bottom-1 -left-1 size-6 rounded-bl-xl border-b-2 border-l-2 border-brand-500" />
        <span className="absolute -bottom-1 -right-1 size-6 rounded-br-xl border-b-2 border-r-2 border-brand-500" />
        <QrCode className="size-16 text-white/80" strokeWidth={1.25} />
      </div>
      <p className="max-w-[10rem] text-center text-xs text-white/45">Point your camera at the QR on your table</p>
    </div>
  );
}

function DetailsMock() {
  return (
    <div className="h-full bg-white px-5">
      <AppHeader />
      <div className="pt-6 text-center">
        <p className="font-display text-lg font-extrabold text-[#1a1114]">Welcome!</p>
        <p className="mt-1 text-xs text-[#1a1114]/55">Tell us about yourself</p>
      </div>
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[11px] font-semibold text-[#1a1114]/50">Full Name</p>
          <div className="mt-1.5 rounded-xl border border-black/10 px-3 py-2.5 text-sm text-[#1a1114]/80">Rahul Sharma</div>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#1a1114]/50">Phone Number</p>
          <div className="mt-1.5 rounded-xl border border-black/10 px-3 py-2.5 text-sm text-[#1a1114]/80">+91 98765 43210</div>
        </div>
        <div className="rounded-full bg-brand-600 py-3 text-center text-sm font-semibold text-white">Continue →</div>
      </div>
    </div>
  );
}

function ReceiptMock() {
  return (
    <div className="h-full bg-white px-5">
      <AppHeader />
      <div className="pt-8 text-center">
        <p className="font-display text-base font-extrabold text-[#1a1114]">Enter Receipt Number</p>
      </div>
      <div className="mt-6">
        <div className="rounded-xl border border-black/10 px-3 py-2.5 text-center text-sm font-semibold tracking-wide text-[#1a1114]/80">
          SPICE500
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-emerald-600">
          <CheckCircle2 className="size-4" strokeWidth={2.25} />
          <span className="text-xs font-semibold">Receipt confirmed!</span>
        </div>
      </div>
    </div>
  );
}

function LocationMock() {
  return (
    <div className="relative h-full overflow-hidden bg-blush-50">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute left-1/2 top-14 -translate-x-1/2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#1a1114] shadow-rl-sm">
        Spice House <span className="text-emerald-600">✓</span>
        <span className="block text-[10px] font-normal text-[#1a1114]/50">Within 20m</span>
      </div>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="absolute size-32 animate-ping rounded-full bg-brand-400/20" />
        <span className="absolute size-20 rounded-full bg-brand-400/25" />
        <span className="relative flex size-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-rl-md">
          <MapPin className="size-5" strokeWidth={2.25} fill="currentColor" />
        </span>
      </div>
    </div>
  );
}

function RewardMock() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-white px-6 text-center">
      {["#f13548", "#ffc7cb", "#e01930", "#ffe1e3"].map((color, i) => (
        <span
          key={i}
          aria-hidden
          className="rl-float absolute size-2 rounded-sm"
          style={{
            background: color,
            top: `${15 + i * 18}%`,
            left: i % 2 === 0 ? "18%" : "78%",
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-rl-md">
        <Gift className="size-8" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-display text-lg font-extrabold text-[#1a1114]">Visit Recorded!</p>
        <p className="mt-1 max-w-[11rem] text-xs text-[#1a1114]/55">Keep coming back for amazing rewards.</p>
      </div>
      <div className="w-full max-w-[10rem]">
        <div className="h-2 w-full overflow-hidden rounded-full bg-blush-100">
          <div className="h-full w-4/5 rounded-full bg-brand-600" />
        </div>
        <p className="mt-1.5 text-xs font-semibold text-[#1a1114]/60">4 / 5 visits</p>
      </div>
    </div>
  );
}

const mocks = {
  scan: ScanMock,
  details: DetailsMock,
  receipt: ReceiptMock,
  location: LocationMock,
  reward: RewardMock,
};

export default function RLStepMock({ type }) {
  const Mock = mocks[type] || DetailsMock;
  return <Mock />;
}
