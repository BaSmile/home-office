// Animated chibi scenes (inline SVG + CSS). Face features are in FACE so they can be tuned to Bassim's photo.

export const FACE = {
  skin: '#e2ae86',
  hair: '#2a1c15',
  cheeks: '#ff8f8f',
  line: '#4a2616',
};

function head(mouth) {
  const F = FACE;
  return `
  <g class="head">
    <circle cx="62" cy="108" r="10" fill="${F.skin}"/><circle cx="178" cy="108" r="10" fill="${F.skin}"/>
    <ellipse cx="120" cy="104" rx="58" ry="55" fill="${F.skin}"/>
    <path d="M60 106 Q56 44 120 44 Q186 44 180 106 Q176 80 156 70 Q138 84 112 72 Q96 82 78 74 Q66 84 60 106Z" fill="${F.hair}"/>
    <path d="M90 94 l14 -3 M136 91 l14 3" stroke="${F.hair}" stroke-width="4" stroke-linecap="round"/>
    <g class="eyes">
      <ellipse cx="99" cy="112" rx="7" ry="9" fill="#1d1d1d"/><ellipse cx="141" cy="112" rx="7" ry="9" fill="#1d1d1d"/>
      <circle cx="101.5" cy="108.5" r="2.6" fill="#fff"/><circle cx="143.5" cy="108.5" r="2.6" fill="#fff"/>
    </g>
    <ellipse cx="85" cy="128" rx="9" ry="5" fill="${F.cheeks}" opacity=".45"/><ellipse cx="155" cy="128" rx="9" ry="5" fill="${F.cheeks}" opacity=".45"/>
    ${mouth}
  </g>`;
}

const steam = (x, y) => `<g class="steam">
  <path d="M${x} ${y} q-5 -8 0 -16 q5 -8 0 -16" /><path class="d2" d="M${x + 9} ${y} q-5 -8 0 -16 q5 -8 0 -16" /></g>`;

const SMILE = `<path d="M108 131 Q120 145 132 131" fill="#c0392b" stroke="${FACE.line}" stroke-width="3" stroke-linejoin="round"/>`;
const FOCUS = `<path d="M112 135 Q120 139 128 135" fill="none" stroke="${FACE.line}" stroke-width="3" stroke-linecap="round"/>`;
const HMM = `<path d="M113 136 h14" stroke="${FACE.line}" stroke-width="3" stroke-linecap="round"/>`;

export const HOME_SVG = `
<svg class="chibi s-home" viewBox="0 0 240 240" aria-hidden="true">
  <path d="M34 128 L120 52 L206 128 V232 H34Z" fill="#fff" opacity=".5"/>
  <rect x="160" y="66" width="18" height="40" fill="#fff" opacity=".5"/>
  <g class="smoke"><circle cx="169" cy="58" r="6"/><circle class="d2" cx="169" cy="58" r="5"/></g>
  <ellipse cx="120" cy="232" rx="72" ry="7" fill="#000" opacity=".07"/>
  <g class="bob">
    <path d="M66 236 Q66 160 120 160 Q174 160 174 236Z" fill="#f4a259"/>
    <path d="M104 162 L120 182 L136 162" fill="none" stroke="#e08a3c" stroke-width="4" stroke-linecap="round"/>
    <g class="wave"><path d="M164 186 Q190 168 194 138" stroke="#f4a259" stroke-width="17" stroke-linecap="round" fill="none"/>
      <circle cx="195" cy="132" r="11" fill="${FACE.skin}"/></g>
    <g><rect x="52" y="182" width="30" height="32" rx="6" fill="#fff"/><path d="M82 190 q10 0 10 9 q0 9 -10 9" fill="none" stroke="#fff" stroke-width="5"/>
      <rect x="52" y="182" width="30" height="7" rx="3" fill="#8d5a3b"/><circle cx="80" cy="206" r="10" fill="${FACE.skin}"/>${steam(62, 176)}</g>
    ${head(SMILE)}
  </g>
  <path class="heart" d="M196 92 c-6 -10 -20 -4 -12 8 l12 10 l12 -10 c8 -12 -6 -18 -12 -8z" fill="#ff6b81"/>
  <path class="heart h2" d="M40 110 c-4 -7 -14 -3 -8 6 l8 7 l8 -7 c6 -9 -4 -13 -8 -6z" fill="#ff6b81"/>
</svg>`;

export const OFFICE_SVG = `
<svg class="chibi s-office" viewBox="0 0 240 240" aria-hidden="true">
  <g fill="#fff" opacity=".45"><rect x="22" y="70" width="34" height="162"/><rect x="62" y="40" width="30" height="192"/>
    <rect x="150" y="56" width="34" height="176"/><rect x="190" y="88" width="30" height="144"/></g>
  <g fill="#ffe082" class="lights"><rect x="30" y="84" width="7" height="7"/><rect x="42" y="104" width="7" height="7"/>
    <rect x="70" y="58" width="7" height="7"/><rect x="158" y="76" width="7" height="7"/><rect x="198" y="104" width="7" height="7"/></g>
  <g class="bob">
    <path d="M66 236 Q66 160 120 160 Q174 160 174 236Z" fill="#5b8def"/>
    <path d="M106 160 L120 176 L134 160" fill="#fff"/><path d="M116 172 h8 l3 30 -7 8 -7 -8z" fill="#c0392b"/>
    ${head(FOCUS)}
  </g>
  <rect x="52" y="184" width="136" height="6" rx="3" fill="#90a4ae"/>
  <path d="M64 186 L76 128 H164 L176 186Z" fill="#cfd8dc"/><circle cx="120" cy="156" r="7" fill="#fff" opacity=".8"/>
  <circle class="t1" cx="70" cy="184" r="10" fill="${FACE.skin}"/><circle class="t2" cx="170" cy="184" r="10" fill="${FACE.skin}"/>
  <g><rect x="196" y="160" width="22" height="26" rx="5" fill="#fff"/><path d="M218 166 q8 0 8 7 q0 7 -8 7" fill="none" stroke="#fff" stroke-width="4"/>${steam(201, 154)}</g>
  <text class="code" x="186" y="120" font-family="monospace" font-weight="700" font-size="18" fill="#0d47a1">&lt;/&gt;</text>
  <text class="code c2" x="22" y="140" font-family="monospace" font-weight="700" font-size="16" fill="#0d47a1">{ }</text>
</svg>`;

export const UNKNOWN_SVG = `
<svg class="chibi s-unknown" viewBox="0 0 240 240" aria-hidden="true">
  <g class="bob tilt">
    <path d="M66 236 Q66 160 120 160 Q174 160 174 236Z" fill="#9e9e9e"/>
    ${head(HMM)}
  </g>
  <text class="code" x="180" y="80" font-size="44" font-weight="800" fill="#616161">?</text>
</svg>`;

export const CHIBI_CSS = `
.scene{width:min(300px,80vw);aspect-ratio:1;margin:0 auto}.chibi{width:100%;height:100%;display:none;overflow:visible}
body.home .s-home,body.office .s-office,body.unknown .s-unknown{display:block}
.pop{animation:pop .55s cubic-bezier(.3,1.6,.5,1)}@keyframes pop{0%{transform:scale(.6);opacity:0}100%{transform:scale(1);opacity:1}}
.bob{animation:bob 2.6s ease-in-out infinite}@keyframes bob{50%{transform:translateY(-4px)}}
.tilt{transform-box:view-box;transform-origin:120px 230px;animation:tilt 3s ease-in-out infinite}@keyframes tilt{50%{transform:rotate(-5deg)}}
.eyes{transform-box:fill-box;transform-origin:center;animation:blink 4.2s infinite}@keyframes blink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
.wave{transform-box:view-box;transform-origin:164px 186px;animation:wave 1.1s ease-in-out infinite}@keyframes wave{0%,100%{transform:rotate(8deg)}50%{transform:rotate(-14deg)}}
.steam path{fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;opacity:0;animation:steam 2.6s ease-out infinite}
.steam .d2,.smoke .d2{animation-delay:1.3s}@keyframes steam{0%{opacity:0;transform:translateY(4px)}40%{opacity:.85}100%{opacity:0;transform:translateY(-14px)}}
.smoke circle{fill:#fff;opacity:0;animation:smoke 3s ease-out infinite}@keyframes smoke{0%{opacity:.7;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(8px,-26px) scale(1.4)}}
.heart{transform-box:fill-box;transform-origin:center;animation:heart 3.2s ease-in-out infinite}.h2{animation-delay:1.6s}
@keyframes heart{0%{opacity:0;transform:translateY(10px) scale(.6)}30%{opacity:1}100%{opacity:0;transform:translateY(-30px) scale(1.1)}}
.t1,.t2{animation:type .28s ease-in-out infinite alternate}.t2{animation-delay:.14s}@keyframes type{to{transform:translateY(-6px)}}
.code{animation:float 3s ease-in-out infinite}.c2{animation-delay:1.5s}@keyframes float{0%{opacity:0;transform:translateY(8px)}40%{opacity:1}100%{opacity:0;transform:translateY(-18px)}}
.lights rect{animation:lights 2.4s steps(2) infinite}.lights rect:nth-child(2n){animation-delay:1.2s}@keyframes lights{50%{opacity:.25}}
@media (prefers-reduced-motion:reduce){.chibi *{animation:none!important}}
`;
