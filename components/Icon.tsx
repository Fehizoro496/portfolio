import * as React from "react";

export type IconName =
  | "arrow-right"
  | "arrow-down"
  | "arrow-up-right"
  | "external"
  | "github"
  | "linkedin"
  | "mail"
  | "phone"
  | "map"
  | "sun"
  | "moon"
  | "globe"
  | "download"
  | "copy"
  | "check"
  | "browser"
  | "phone-icon"
  | "server"
  | "bolt"
  | "cap"
  | "spark";

interface Props extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 18, ...rest }: Props) {
  const stroke: React.SVGAttributes<SVGSVGElement> = {
    strokeWidth: 1.6,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const props = { width: size, height: size, viewBox: "0 0 24 24", ...stroke, ...rest };
  switch (name) {
    case "arrow-right":
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "arrow-down":
      return <svg {...props}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
    case "arrow-up-right":
      return <svg {...props}><path d="M7 17L17 7M9 7h8v8" /></svg>;
    case "external":
      return <svg {...props}><path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /></svg>;
    case "github":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-.99-.02-1.94-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.06.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "mail":
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
    case "phone":
      return <svg {...props}><path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1 4a1 1 0 0 1-.27 1L7 10.5a16 16 0 0 0 6.5 6.5l1.75-1.83a1 1 0 0 1 1-.27l4 1a1 1 0 0 1 .75 1z" /></svg>;
    case "map":
      return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "sun":
      return <svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>;
    case "moon":
      return <svg {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>;
    case "globe":
      return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
    case "download":
      return <svg {...props}><path d="M12 3v12M6 11l6 6 6-6M5 21h14" /></svg>;
    case "copy":
      return <svg {...props}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>;
    case "check":
      return <svg {...props}><path d="M5 12l4 4L19 6" /></svg>;
    case "browser":
      return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></svg>;
    case "phone-icon":
      return <svg {...props}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>;
    case "server":
      return <svg {...props}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></svg>;
    case "bolt":
      return <svg {...props}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>;
    case "cap":
      return <svg {...props}><path d="M22 9L12 4 2 9l10 5 10-5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></svg>;
    case "spark":
      return <svg {...props}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" /></svg>;
    default:
      return null;
  }
}
