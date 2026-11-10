// Animated chibi scenes (inline SVG + CSS). Face features are in FACE so they can be tuned to Bassim's photo.

export const FACE = {
  skin: '#eec3a0',
  shade: '#dca784',
  hair: '#1f1611',
  curl: '#3a2a20',
  beard: '#3b2a1f',
  glasses: '#6b6e73',
  cheeks: '#ff8f8f',
  line: '#4a2616',
};

// Curly volume on top, shorter sides (from Bassim's photo).
const CURLS = [
  [74, 82, 11], [80, 68, 13], [92, 56, 14], [108, 50, 15], [124, 47, 15], [140, 49, 15], [154, 56, 14],
  [164, 68, 12], [168, 82, 10], [100, 44, 10], [118, 40, 11], [136, 41, 11], [150, 46, 9],
];
const CURL_LINES = [[90, 56], [108, 46], [126, 42], [144, 46], [158, 60], [82, 70], [116, 58], [136, 58], [100, 62], [164, 76]];

function head(mouth) {
  const F = FACE;
  return `
  <g class="head">
    <circle cx="62" cy="110" r="10" fill="${F.skin}"/><circle cx="178" cy="110" r="10" fill="${F.skin}"/>
    <circle cx="62" cy="110" r="5" fill="${F.shade}"/><circle cx="178" cy="110" r="5" fill="${F.shade}"/>
    <ellipse cx="120" cy="106" rx="58" ry="56" fill="${F.skin}"/>
    <path d="M62 112 Q58 58 120 54 Q182 58 178 112 Q174 88 160 80 Q140 74 120 76 Q98 74 80 80 Q66 88 62 112Z" fill="${F.hair}"/>
    <g fill="${F.hair}">${CURLS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
    <g fill="none" stroke="${F.curl}" stroke-width="2.4" stroke-linecap="round">${CURL_LINES.map(([x, y]) => `<path d="M${x - 5} ${y + 2} q5 -7 9 0 q-2 5 -5 3"/>`).join('')}</g>
    <path d="M67 116 Q72 154 120 164 Q168 154 173 116 L169 118 Q164 148 134 154 Q127 150 120 151 Q113 150 106 154 Q76 148 71 118Z" fill="${F.beard}" opacity=".55"/>
    <path d="M108 150 Q120 147 132 150 Q130 162 120 164 Q110 162 108 150Z" fill="${F.beard}" opacity=".6"/>
    <path d="M104 131 Q112 125 120 128 Q128 125 136 131" fill="none" stroke="${F.beard}" stroke-width="3" stroke-linecap="round" opacity=".4"/>
    <path d="M85 96 Q96 92 109 95 M131 95 Q144 92 155 96" stroke="${F.hair}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
    <g class="eyes">
      <ellipse cx="99" cy="112" rx="6" ry="7.5" fill="#2b1a12"/><ellipse cx="141" cy="112" rx="6" ry="7.5" fill="#2b1a12"/>
      <circle cx="101" cy="109.5" r="2.2" fill="#fff"/><circle cx="143" cy="109.5" r="2.2" fill="#fff"/>
    </g>
    <ellipse cx="82" cy="133" rx="8" ry="4.5" fill="${F.cheeks}" opacity=".35"/><ellipse cx="158" cy="133" rx="8" ry="4.5" fill="${F.cheeks}" opacity=".35"/>
    <g fill="#fff" fill-opacity=".14" stroke="${F.glasses}" stroke-width="2.6">
      <circle cx="99" cy="113" r="17"/><circle cx="141" cy="113" r="17"/>
    </g>
    <path d="M116 109 Q120 105 124 109 M82 110 L65 106 M158 110 L175 106" fill="none" stroke="${F.glasses}" stroke-width="2.6" stroke-linecap="round"/>
    ${mouth}
  </g>`;
}

const steam = (x, y) => `<g class="steam">
  <path d="M${x} ${y} q-5 -8 0 -16 q5 -8 0 -16" /><path class="d2" d="M${x + 9} ${y} q-5 -8 0 -16 q5 -8 0 -16" /></g>`;

const SMILE = `<path d="M108 136 Q120 147 132 136 Q120 140 108 136Z" fill="#b8564c" stroke="${FACE.line}" stroke-width="2.6" stroke-linejoin="round"/>`;
const FOCUS = `<path d="M111 137 Q120 142 129 137" fill="none" stroke="${FACE.line}" stroke-width="2.8" stroke-linecap="round"/>`;
const HMM = `<path d="M113 139 h14" stroke="${FACE.line}" stroke-width="2.8" stroke-linecap="round"/>`;

export const HOME_SVG = `
<svg class="chibi s-home" viewBox="0 0 240 240" aria-hidden="true">
  <path d="M34 128 L120 52 L206 128 V232 H34Z" fill="#fff" opacity=".5"/>
  <rect x="160" y="66" width="18" height="40" fill="#fff" opacity=".5"/>
  <g class="smoke"><circle cx="169" cy="58" r="6"/><circle class="d2" cx="169" cy="58" r="5"/></g>
  <ellipse cx="120" cy="232" rx="72" ry="7" fill="#000" opacity=".07"/>
  <g class="bob">
    <path d="M66 236 Q66 162 120 162 Q174 162 174 236Z" fill="#fdfdfd" stroke="#d7dcd6" stroke-width="2"/>
    <path d="M84 196 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 M82 214 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6 l8 -6 l8 6" fill="none" stroke="#e6e9e5" stroke-width="2"/>
    <path d="M100 163 Q120 180 140 163" fill="none" stroke="#d7dcd6" stroke-width="3"/>
    <g class="wave"><path d="M164 188 Q186 172 192 150" stroke="#fdfdfd" stroke-width="17" stroke-linecap="round" fill="none"/>
      <path d="M192 150 L194 140" stroke="${FACE.skin}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="195" cy="132" r="11" fill="${FACE.skin}"/></g>
    <g><rect x="52" y="182" width="30" height="32" rx="6" fill="#e07a5f"/><path d="M82 190 q10 0 10 9 q0 9 -10 9" fill="none" stroke="#e07a5f" stroke-width="5"/>
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
    <path d="M66 236 Q66 162 120 162 Q174 162 174 236Z" fill="#5b8def"/>
    <path d="M104 162 L120 182 L136 162" fill="#fff"/>
    ${head(FOCUS)}
  </g>
  <rect x="50" y="198" width="140" height="6" rx="3" fill="#90a4ae"/>
  <path d="M62 200 L72 158 H168 L178 200Z" fill="#cfd8dc"/><circle cx="120" cy="180" r="7" fill="#fff" opacity=".8"/>
  <circle class="t1" cx="70" cy="198" r="10" fill="${FACE.skin}"/><circle class="t2" cx="170" cy="198" r="10" fill="${FACE.skin}"/>
  <g><rect x="196" y="172" width="22" height="26" rx="5" fill="#fff"/><path d="M218 178 q8 0 8 7 q0 7 -8 7" fill="none" stroke="#fff" stroke-width="4"/>${steam(201, 166)}</g>
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

// App icon: chibi head on a soft green square (safe-zone friendly for Android "maskable" icons).
export const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="512" height="512">
  <rect width="240" height="240" fill="#a5d6a7"/>
  <g transform="translate(-18 -6) scale(1.15)">${head(SMILE)}</g>
</svg>`;
