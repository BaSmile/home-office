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

export const KENITRA_SVG = `
<svg class="chibi s-kenitra" viewBox="0 0 240 240" aria-hidden="true">
  <g class="beans" fill="#8d6e63">
    <g><ellipse cx="26" cy="96" rx="7" ry="10" transform="rotate(-30 26 96)"/><path d="M22 90 q6 6 2 13" stroke="#f3e5d8" stroke-width="1.6" fill="none"/></g>
    <g class="b2"><ellipse cx="214" cy="112" rx="7" ry="10" transform="rotate(25 214 112)"/><path d="M211 105 q6 6 2 13" stroke="#f3e5d8" stroke-width="1.6" fill="none"/></g>
    <g class="b3"><ellipse cx="40" cy="150" rx="6" ry="8.5" transform="rotate(15 40 150)"/><path d="M37 145 q5 5 1 11" stroke="#f3e5d8" stroke-width="1.5" fill="none"/></g>
  </g>
  <rect x="117" y="20" width="6" height="160" fill="#6d4c41"/>
  <g class="parasol">
    <clipPath id="parasol-clip"><path d="M28 40 Q120 -14 212 40Z"/></clipPath>
    <g clip-path="url(#parasol-clip)"><rect x="0" y="0" width="240" height="44" fill="#fff3e0"/>
      <path d="M120 2 L4 44 H74Z M120 2 L120 44 H166Z M120 2 L212 44 H260Z" fill="#6d4c41"/></g>
    <path d="M28 40 q11.5 10 23 0 q11.5 10 23 0 q11.5 10 23 0 q11.5 10 23 0 q11.5 10 23 0 q11.5 10 23 0 q11.5 10 23 0 q11.5 10 23 0" fill="#6d4c41"/>
  </g>
  <g class="bob">
    <path d="M66 236 Q66 162 120 162 Q174 162 174 236Z" fill="#d7a86e"/>
    <path d="M100 163 Q120 180 140 163" fill="none" stroke="#b9874d" stroke-width="3"/>
    ${head(SMILE)}
  </g>
  <ellipse cx="120" cy="206" rx="86" ry="11" fill="#5d4037"/><rect x="34" y="206" width="172" height="8" fill="#4e342e"/>
  <rect x="112" y="214" width="16" height="26" fill="#3e2723"/>
  <g>
    <ellipse cx="66" cy="200" rx="22" ry="5" fill="#fff"/>
    <path d="M48 196 q4 -16 18 -16 q14 0 18 16 q-18 6 -36 0z" fill="#f0a94b"/>
    <path d="M56 186 l3 10 M66 182 v13 M76 186 l-3 10" stroke="#c97d22" stroke-width="2" stroke-linecap="round"/>
    <circle cx="94" cy="202" r="10" fill="${FACE.skin}"/>
  </g>
  <g class="sip">
    ${steam(164, 168)}
    <ellipse cx="170" cy="203" rx="18" ry="4.5" fill="#fff"/>
    <path d="M156 178 h28 v14 q0 10 -14 10 q-14 0 -14 -10z" fill="#fff"/>
    <path d="M184 183 q9 0 9 6 q0 6 -9 6" fill="none" stroke="#fff" stroke-width="4"/>
    <ellipse cx="170" cy="178.5" rx="13" ry="2.8" fill="#6d4c41"/>
    <path d="M166 178.5 q4 -2.5 8 0 q-4 2 -8 0z" fill="#f3e5d8"/>
    <circle cx="186" cy="196" r="10" fill="${FACE.skin}"/>
  </g>
</svg>`;

export const GYM_SVG = `
<svg class="chibi s-gym" viewBox="0 0 240 240" aria-hidden="true">
  <g opacity=".85"><rect x="176" y="34" width="56" height="62" rx="5" fill="#fff"/>
    <text x="204" y="54" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="13" fill="#b71c1c">WOD</text>
    <text x="204" y="70" text-anchor="middle" font-family="monospace" font-weight="700" font-size="10" fill="#37474f">21-15-9</text>
    <path d="M186 80 h36 M190 88 h28" stroke="#b0bec5" stroke-width="3" stroke-linecap="round"/></g>
  <g opacity=".85"><circle cx="24" cy="200" r="20" fill="#37474f"/><circle cx="24" cy="200" r="6" fill="#ffe3d8"/>
    <circle cx="36" cy="208" r="16" fill="#e53935"/><circle cx="36" cy="208" r="5" fill="#ffe3d8"/></g>
  <g><path d="M200 210 q0 -14 10 -14 q10 0 10 14" fill="none" stroke="#263238" stroke-width="5"/><circle cx="210" cy="222" r="15" fill="#263238"/>
    <text x="210" y="227" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#fff">16</text></g>
  <g class="bob">
    <path d="M66 236 Q66 162 120 162 Q174 162 174 236Z" fill="${FACE.skin}"/>
    <path d="M86 236 Q86 186 98 166 Q120 184 142 166 Q154 186 154 236Z" fill="#212121"/>
    <text x="120" y="214" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="11" fill="#e53935">LOF</text>
    <g class="lift1"><path d="M78 182 L62 216" stroke="${FACE.skin}" stroke-width="14" stroke-linecap="round"/>
      <rect x="46" y="218" width="30" height="6" rx="2" fill="#607d8b"/><rect x="42" y="211" width="9" height="20" rx="2" fill="#263238"/><rect x="71" y="211" width="9" height="20" rx="2" fill="#263238"/></g>
    <g class="lift2"><path d="M162 182 L178 216" stroke="${FACE.skin}" stroke-width="14" stroke-linecap="round"/>
      <rect x="164" y="218" width="30" height="6" rx="2" fill="#607d8b"/><rect x="160" y="211" width="9" height="20" rx="2" fill="#263238"/><rect x="189" y="211" width="9" height="20" rx="2" fill="#263238"/></g>
    ${head(SMILE)}
    <path d="M63 90 Q120 70 177 90 L178 100 Q120 80 62 100Z" fill="#e53935"/>
    <path d="M176 92 l14 -6 l-2 10z M176 96 l12 6 l-10 4z" fill="#e53935"/>
  </g>
  <path class="sweat" d="M58 86 q4 7 0 10 q-4 -3 0 -10z" fill="#4fc3f7"/>
  <path class="sweat s2" d="M184 112 q4 7 0 10 q-4 -3 0 -10z" fill="#4fc3f7"/>
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
body.home .s-home,body.gym .s-gym,body.kenitra .s-kenitra,body.office .s-office,body.unknown .s-unknown{display:block}
.parasol{transform-box:view-box;transform-origin:120px 40px;animation:parasol 4s ease-in-out infinite}@keyframes parasol{50%{transform:rotate(2deg)}}
.beans g{animation:bean 3.6s ease-in-out infinite}.beans .b2{animation-delay:1.2s}.beans .b3{animation-delay:2.4s}@keyframes bean{50%{transform:translateY(-8px) rotate(12deg)}}
.sip{animation:sip 4.5s ease-in-out infinite}@keyframes sip{0%,60%,100%{transform:translate(0,0)}72%,85%{transform:translate(-14px,-30px)}}
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
.lift1{transform-box:view-box;transform-origin:78px 182px;animation:lift1 1.6s ease-in-out infinite}
.lift2{transform-box:view-box;transform-origin:162px 182px;animation:lift2 1.6s ease-in-out infinite .8s}
@keyframes lift1{0%,100%{transform:rotate(0)}40%,55%{transform:rotate(95deg)}}@keyframes lift2{0%,100%{transform:rotate(0)}40%,55%{transform:rotate(-95deg)}}
.sweat{animation:sweat 1.8s ease-in infinite}.s2{animation-delay:.9s}@keyframes sweat{0%{opacity:0;transform:translateY(-4px)}20%{opacity:1}100%{opacity:0;transform:translateY(22px)}}
.days{display:none;margin-top:18px;font-size:16px;padding:10px 14px;border-radius:12px;background:rgba(255,255,255,.65)}body.office .days{display:inline-block}
@media (prefers-reduced-motion:reduce){.chibi *{animation:none!important}}
`;

// App icon: chibi head on a soft green square (safe-zone friendly for Android "maskable" icons).
export const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="512" height="512">
  <rect width="240" height="240" fill="#a5d6a7"/>
  <g transform="translate(-18 -6) scale(1.15)">${head(SMILE)}</g>
</svg>`;
