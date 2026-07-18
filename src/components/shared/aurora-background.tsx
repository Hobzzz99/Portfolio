/**
 * Fixed, full-page decorative backdrop:
 *   - deep radial vignette
 *   - animated blue "aurora" blobs
 *   - subtle grid overlay
 * Pure CSS animation (GPU-friendly). Sits behind all content.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* base gradient wash (theme-aware; see .aurora-wash in globals.css) */}
      <div className="absolute inset-0 aurora-wash" />

      {/* aurora blobs */}
      <div className="aurora-blobs absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.30),transparent_60%)] blur-3xl animate-aurora" />
        <div className="absolute top-1/3 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_60%)] blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-[38rem] w-[38rem] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(29,78,216,0.22),transparent_60%)] blur-3xl animate-aurora" />
      </div>

      {/* grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* top + bottom fades to seat content */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
