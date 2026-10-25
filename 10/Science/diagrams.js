// Grade 10 Science - Textbook Diagrams & Visual Figures (Sinhala Medium)
// High-resolution vector diagrams for all 20 lessons (Part I & Part II)
(function () {
  function toSvgUrl(inner, w = 680, h = 380) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="font-family:'Noto Sans Sinhala','Iskoola Pota',sans-serif;background:#ffffff;">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a"/>
        </marker>
        <marker id="arrRed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
        </marker>
        <marker id="arrTeal" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488"/>
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc" rx="12"/>
      ${inner}
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  window.SCI_DIAGRAMS = {
    // Lesson 01
    L1_BODY_ELEMENTS: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">මානව දේහයේ අඩංගු මූලද්‍රව්‍ය සංයුතිය (ස්කන්ධය අනුව %)</text>
      <!-- Bars & Pie representation -->
      <g transform="translate(55, 65)">
        <rect x="0" y="0" width="570" height="275" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <!-- O 65% -->
        <text x="20" y="45" font-size="15" font-weight="700" fill="#0f172a">ඔක්සිජන් (O)</text>
        <rect x="165" y="26" width="325" height="26" rx="6" fill="#0284c7"/>
        <text x="500" y="45" font-size="15" font-weight="800" fill="#0284c7">65%</text>
        <!-- C 18% -->
        <text x="20" y="95" font-size="15" font-weight="700" fill="#0f172a">කාබන් (C)</text>
        <rect x="165" y="76" width="110" height="26" rx="6" fill="#dc2626"/>
        <text x="285" y="95" font-size="15" font-weight="800" fill="#dc2626">18%</text>
        <!-- H 10% -->
        <text x="20" y="145" font-size="15" font-weight="700" fill="#0f172a">හයිඩ්‍රජන් (H)</text>
        <rect x="165" y="126" width="65" height="26" rx="6" fill="#16a34a"/>
        <text x="240" y="145" font-size="15" font-weight="800" fill="#16a34a">10%</text>
        <!-- N 3% -->
        <text x="20" y="195" font-size="15" font-weight="700" fill="#0f172a">නයිට්‍රජන් (N)</text>
        <rect x="165" y="176" width="28" height="26" rx="6" fill="#7c3aed"/>
        <text x="203" y="195" font-size="15" font-weight="800" fill="#7c3aed">3%</text>
        <!-- Other 4% -->
        <text x="20" y="245" font-size="15" font-weight="700" fill="#0f172a">වෙනත් (Ca, P, K...)</text>
        <rect x="165" y="226" width="35" height="26" rx="6" fill="#d97706"/>
        <text x="210" y="245" font-size="15" font-weight="800" fill="#d97706">4%</text>
      </g>
    `),

    L1_FOOD_TESTS: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ආහාර සංඝටක හඳුනා ගැනීමේ රසායනාගාර පරීක්ෂා</text>
      <g transform="translate(30, 60)">
        <!-- Test 1: Starch -->
        <rect x="0" y="0" width="142" height="285" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="71" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#1e3a8a">පිෂ්ට පරීක්ෂාව</text>
        <rect x="53" y="55" width="36" height="125" rx="18" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <rect x="55" y="110" width="32" height="68" rx="15" fill="#1e1b4b"/>
        <text x="71" y="208" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">+ අයඩින් ද්‍රාවණය</text>
        <text x="71" y="235" text-anchor="middle" font-size="13" font-weight="800" fill="#312e81">දම් පාටට හුරු</text>
        <text x="71" y="255" text-anchor="middle" font-size="13" font-weight="800" fill="#312e81">තද නිල් පාට</text>

        <!-- Test 2: Glucose -->
        <g transform="translate(156, 0)">
          <rect x="0" y="0" width="142" height="285" rx="10" fill="#fff" stroke="#cbd5e1"/>
          <text x="71" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#9a3412">ග්ලූකෝස් පරීක්ෂාව</text>
          <rect x="53" y="55" width="36" height="125" rx="18" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
          <rect x="55" y="110" width="32" height="68" rx="15" fill="#c2410c"/>
          <text x="71" y="205" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">+ බෙනඩික්ට් (රත් කිරීම)</text>
          <text x="71" y="232" text-anchor="middle" font-size="11" font-weight="700" fill="#0369a1">නිල්→කොළ→කහ</text>
          <text x="71" y="255" text-anchor="middle" font-size="13" font-weight="800" fill="#b91c1c">ගඩොල් රතු අවක්ෂේපය</text>
        </g>

        <!-- Test 3: Protein -->
        <g transform="translate(312, 0)">
          <rect x="0" y="0" width="142" height="285" rx="10" fill="#fff" stroke="#cbd5e1"/>
          <text x="71" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#6b21a8">බයියුරේට් පරීක්ෂාව</text>
          <rect x="53" y="55" width="36" height="125" rx="18" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
          <rect x="55" y="110" width="32" height="68" rx="15" fill="#7e22ce"/>
          <text x="71" y="205" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">ප්‍රෝටීන් + NaOH + CuSO₄</text>
          <text x="71" y="242" text-anchor="middle" font-size="13" font-weight="800" fill="#6b21a8">තද දම් පැහැය</text>
        </g>

        <!-- Test 4: Lipids -->
        <g transform="translate(468, 0)">
          <rect x="0" y="0" width="152" height="285" rx="10" fill="#fff" stroke="#cbd5e1"/>
          <text x="76" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#be123c">සුඩාන් III පරීක්ෂාව</text>
          <rect x="58" y="55" width="36" height="125" rx="18" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
          <rect x="60" y="130" width="32" height="48" rx="14" fill="#fef08a"/>
          <rect x="60" y="102" width="32" height="28" fill="#e11d48"/>
          <text x="76" y="205" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">තෙල් + සුඩාන් III</text>
          <text x="76" y="238" text-anchor="middle" font-size="13" font-weight="800" fill="#be123c">රතු පැහැති තෙල්</text>
          <text x="76" y="256" text-anchor="middle" font-size="13" font-weight="800" fill="#be123c">ස්තරයක් වෙන්වේ</text>
        </g>
      </g>
    `),

    L1_NUCLEOTIDE_DNA: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">නියුක්ලියෝටයිඩයක ව්‍යුහය (1.3 රූපය) සහ DNA ද්විත්ව හෙලික්සය</text>
      <g transform="translate(40, 75)">
        <rect x="0" y="0" width="340" height="250" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="170" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#0d9488">දර්ශීය නියුක්ලියෝටයිඩය</text>
        <!-- Phosphate circle -->
        <circle cx="65" cy="110" r="32" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/>
        <text x="65" y="115" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">පොස්ෆේට්</text>
        <!-- Pentose sugar pentagon -->
        <polygon points="170,95 215,125 198,178 142,178 125,125" fill="#7dd3fc" stroke="#0284c7" stroke-width="2.5"/>
        <text x="170" y="148" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">පෙන්ටෝස්</text>
        <text x="170" y="164" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">සීනි</text>
        <!-- Base rectangle -->
        <rect x="245" y="95" width="78" height="55" rx="6" fill="#fca5a5" stroke="#dc2626" stroke-width="2.5"/>
        <text x="284" y="118" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">නයිට්‍රජනීය</text>
        <text x="284" y="136" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">භෂ්මය</text>
        <!-- Connectors -->
        <line x1="97" y1="115" x2="125" y2="125" stroke="#0f172a" stroke-width="3"/>
        <line x1="215" y1="125" x2="245" y2="122" stroke="#0f172a" stroke-width="3"/>
        <text x="170" y="220" text-anchor="middle" font-size="13" font-weight="700" fill="#475569">සංඝටක 3: පොස්ෆේට් + පෙන්ටෝස් සීනි + N-භෂ්මය</text>
      </g>
      <g transform="translate(405, 75)">
        <rect x="0" y="0" width="235" height="250" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="117" y="30" text-anchor="middle" font-size="15" font-weight="800" fill="#2563eb">DNA ද්විත්ව හෙලික්සය</text>
        <path d="M 65 55 C 165 95, 65 145, 165 185 C 115 210, 65 225, 65 225" fill="none" stroke="#2563eb" stroke-width="6"/>
        <path d="M 165 55 C 65 95, 165 145, 65 185 C 115 210, 165 225, 165 225" fill="none" stroke="#0d9488" stroke-width="6"/>
        <line x1="85" y1="72" x2="145" y2="72" stroke="#dc2626" stroke-width="4"/>
        <line x1="85" y1="120" x2="145" y2="120" stroke="#eab308" stroke-width="4"/>
        <line x1="85" y1="165" x2="145" y2="165" stroke="#16a34a" stroke-width="4"/>
        <text x="195" y="76" font-size="12" font-weight="800" fill="#dc2626">A = T</text>
        <text x="195" y="168" font-size="12" font-weight="800" fill="#16a34a">C ≡ G</text>
      </g>
    `),

    // Lesson 02
    L2_DIST_DISP: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">දුර සහ විස්ථාපනය සංසන්දනය (2.1 සහ 2.8 රූප ඇසුරින්)</text>
      <g transform="translate(35, 60)">
        <rect x="0" y="0" width="295" height="280" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="147" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">A සිට B දක්වා ගමන් මාර්ග (2.1 රූපය)</text>
        <circle cx="40" cy="155" r="7" fill="#dc2626"/>
        <text x="22" y="160" font-size="16" font-weight="800">A</text>
        <circle cx="255" cy="155" r="7" fill="#0284c7"/>
        <text x="265" y="160" font-size="16" font-weight="800">B</text>
        <path d="M 40 155 Q 147 35 255 155" fill="none" stroke="#dc2626" stroke-width="2.5"/>
        <text x="147" y="82" text-anchor="middle" font-size="12" font-weight="700" fill="#dc2626">P මාර්ගය (දුර 320 m)</text>
        <path d="M 40 155 Q 147 95 255 155" fill="none" stroke="#2563eb" stroke-width="2.5"/>
        <text x="147" y="118" text-anchor="middle" font-size="12" font-weight="700" fill="#2563eb">Q මාර්ගය (දුර 200 m)</text>
        <line x1="40" y1="155" x2="246" y2="155" stroke="#0f172a" stroke-width="3" stroke-dasharray="6,4" marker-end="url(#arr)"/>
        <text x="147" y="175" text-anchor="middle" font-size="12" font-weight="800" fill="#0d9488">විස්ථාපනය: නැගෙනහිරට 160 m</text>
        <path d="M 40 155 Q 147 245 255 155" fill="none" stroke="#16a34a" stroke-width="2.5"/>
        <text x="147" y="225" text-anchor="middle" font-size="12" font-weight="700" fill="#16a34a">R මාර්ගය (දුර 240 m)</text>
      </g>
      <g transform="translate(350, 60)">
        <rect x="0" y="0" width="295" height="280" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="147" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">සෘජුකෝණී ගමන් මාර්ගය (2.8 රූපය)</text>
        <line x1="45" y1="215" x2="225" y2="215" stroke="#0f172a" stroke-width="3" marker-end="url(#arr)"/>
        <line x1="225" y1="215" x2="225" y2="85" stroke="#0f172a" stroke-width="3" marker-end="url(#arr)"/>
        <line x1="45" y1="215" x2="220" y2="88" stroke="#e11d48" stroke-width="3.5" marker-end="url(#arrRed)"/>
        <text x="30" y="225" font-size="15" font-weight="800">A</text>
        <text x="235" y="225" font-size="15" font-weight="800">B</text>
        <text x="235" y="85" font-size="15" font-weight="800">C</text>
        <text x="135" y="238" text-anchor="middle" font-size="13" font-weight="700">40 m (නැගෙනහිරට)</text>
        <text x="258" y="155" text-anchor="middle" font-size="13" font-weight="700">30 m</text>
        <text x="115" y="138" text-anchor="middle" font-size="13" font-weight="800" fill="#e11d48">විස්ථාපනය = 50 m</text>
        <text x="147" y="264" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">මුළු දුර = 40 + 30 = 70 m | විස්ථාපනය = AC දිශාවට 50 m</text>
      </g>
    `),

    L2_MOTION_GRAPHS: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">විස්ථාපන-කාල (s-t) සහ ප්‍රවේග-කාල (v-t) ප්‍රස්තාර</text>
      <!-- s-t graph -->
      <g transform="translate(35, 60)">
        <rect x="0" y="0" width="290" height="285" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="145" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">විස්ථාපන - කාල ප්‍රස්තාරය</text>
        <line x1="50" y1="225" x2="260" y2="225" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="50" y1="225" x2="50" y2="45" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <text x="25" y="65" font-size="12" font-weight="700">s (m)</text>
        <text x="245" y="245" font-size="12" font-weight="700">t (s)</text>
        <line x1="50" y1="225" x2="230" y2="65" stroke="#0d9488" stroke-width="3.5"/>
        <line x1="110" y1="172" x2="200" y2="172" stroke="#64748b" stroke-dasharray="4,4"/>
        <line x1="200" y1="172" x2="200" y2="92" stroke="#64748b" stroke-dasharray="4,4"/>
        <text x="155" y="190" text-anchor="middle" font-size="12" font-weight="700">Δt (කාලය)</text>
        <text x="225" y="138" font-size="12" font-weight="700">Δs</text>
        <text x="145" y="268" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">අනුක්‍රමණය = විස්ථාපනය / කාලය = ප්‍රවේගය</text>
      </g>
      <!-- v-t graph -->
      <g transform="translate(350, 60)">
        <rect x="0" y="0" width="295" height="285" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="147" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">ප්‍රවේග - කාල ප්‍රස්තාරය (ත්‍රපීසියම)</text>
        <polygon points="50,225 110,95 200,95 245,225" fill="rgba(37,99,235,0.16)" stroke="#2563eb" stroke-width="3"/>
        <line x1="50" y1="225" x2="270" y2="225" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="50" y1="225" x2="50" y2="45" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <text x="20" y="65" font-size="11" font-weight="700">v (m s⁻¹)</text>
        <text x="255" y="245" font-size="12" font-weight="700">t (s)</text>
        <text x="110" y="85" text-anchor="middle" font-size="13" font-weight="800">A</text>
        <text x="200" y="85" text-anchor="middle" font-size="13" font-weight="800">B</text>
        <text x="252" y="218" text-anchor="middle" font-size="13" font-weight="800">C</text>
        <text x="155" y="168" text-anchor="middle" font-size="12" font-weight="800" fill="#1d4ed8">වර්ගඵලය = මුළු විස්ථාපනය</text>
        <text x="147" y="268" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">අනුක්‍රමණය = ත්වරණය | යට වර්ගඵලය = විස්ථාපනය</text>
      </g>
    `),

    // Lesson 03
    L3_ATOM_ISOTOPES: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">බෝර් පරමාණුක ආකෘතිය (ශක්ති මට්ටම්) සහ හයිඩ්‍රජන් සමස්ථානික</text>
      <g transform="translate(30, 55)">
        <rect x="0" y="0" width="285" height="295" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="142" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">ශක්ති මට්ටම් (K, L, M, N)</text>
        <circle cx="142" cy="155" r="18" fill="#dc2626"/>
        <text x="142" y="160" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">+Ze</text>
        <circle cx="142" cy="155" r="42" fill="none" stroke="#64748b" stroke-width="1.8"/>
        <circle cx="142" cy="155" r="66" fill="none" stroke="#64748b" stroke-width="1.8"/>
        <circle cx="142" cy="155" r="90" fill="none" stroke="#64748b" stroke-width="1.8"/>
        <circle cx="142" cy="155" r="112" fill="none" stroke="#64748b" stroke-width="1.8"/>
        <text x="142" y="110" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">K (n=1, උපරිම 2)</text>
        <text x="142" y="86" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">L (n=2, උපරිම 8)</text>
        <text x="142" y="62" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">M (n=3, උපරිම 18)</text>
        <text x="142" y="40" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">N (n=4, උපරිම 32)</text>
      </g>
      <g transform="translate(330, 55)">
        <rect x="0" y="0" width="320" height="295" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="160" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">හයිඩ්‍රජන්වල සමස්ථානික 3 (වගුව 3.4)</text>
        <!-- Protium -->
        <circle cx="60" cy="115" r="38" fill="none" stroke="#0284c7" stroke-width="2"/>
        <circle cx="60" cy="77" r="5" fill="#2563eb"/>
        <circle cx="60" cy="115" r="10" fill="#dc2626"/>
        <text x="60" y="178" text-anchor="middle" font-size="13" font-weight="800">ප්‍රෝටියම් (¹₁H)</text>
        <text x="60" y="198" text-anchor="middle" font-size="11">p = 1, e = 1</text>
        <text x="60" y="215" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">n = 0</text>
        <!-- Deuterium -->
        <circle cx="160" cy="115" r="38" fill="none" stroke="#0284c7" stroke-width="2"/>
        <circle cx="160" cy="77" r="5" fill="#2563eb"/>
        <circle cx="154" cy="115" r="9" fill="#dc2626"/>
        <circle cx="167" cy="115" r="9" fill="#64748b"/>
        <text x="160" y="178" text-anchor="middle" font-size="13" font-weight="800">ඩියුටීරියම් (²₁H)</text>
        <text x="160" y="198" text-anchor="middle" font-size="11">p = 1, e = 1</text>
        <text x="160" y="215" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">n = 1</text>
        <!-- Tritium -->
        <circle cx="260" cy="115" r="38" fill="none" stroke="#0284c7" stroke-width="2"/>
        <circle cx="260" cy="77" r="5" fill="#2563eb"/>
        <circle cx="253" cy="110" r="8" fill="#dc2626"/>
        <circle cx="267" cy="110" r="8" fill="#64748b"/>
        <circle cx="260" cy="122" r="8" fill="#64748b"/>
        <text x="260" y="178" text-anchor="middle" font-size="13" font-weight="800">ට්‍රිටියම් (³₁H)</text>
        <text x="260" y="198" text-anchor="middle" font-size="11">p = 1, e = 1</text>
        <text x="260" y="215" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">n = 2</text>
        <text x="160" y="265" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">එකම Z (ප්‍රෝටෝන ගණන) සහ වෙනස් A (නියුට්‍රෝන ගණන)</text>
      </g>
    `),

    // Lesson 04
    L4_NEWTON_LAWS: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">නිව්ටන්ගේ චලිත නියම 3 සහ ප්‍රායෝගික නිදසුන්</text>
      <g transform="translate(25, 55)">
        <rect x="0" y="0" width="200" height="290" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="100" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">1 වන නියමය (අවස්ථිතිය)</text>
        <rect x="30" y="95" width="140" height="55" rx="8" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <circle cx="55" cy="155" r="12" fill="#334155"/>
        <circle cx="145" cy="155" r="12" fill="#334155"/>
        <text x="100" y="125" text-anchor="middle" font-size="12" font-weight="800">බස් රථය හදිසියේ</text>
        <text x="100" y="142" text-anchor="middle" font-size="12" font-weight="800">තිරිංග යෙදීම</text>
        <text x="100" y="205" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">මගියා ඉදිරියට විසිවේ.</text>
        <text x="100" y="230" text-anchor="middle" font-size="12" font-weight="700" fill="#dc2626">ආසන පටි පැලඳීමෙන්</text>
        <text x="100" y="248" text-anchor="middle" font-size="12" font-weight="700" fill="#dc2626">අනතුරු වළකී.</text>
      </g>
      <g transform="translate(240, 55)">
        <rect x="0" y="0" width="200" height="290" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="100" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">2 වන නියමය (F = ma)</text>
        <rect x="35" y="100" width="90" height="45" rx="6" fill="#7dd3fc" stroke="#0284c7" stroke-width="2"/>
        <text x="80" y="128" text-anchor="middle" font-size="14" font-weight="800">m</text>
        <circle cx="52" cy="152" r="9" fill="#334155"/>
        <circle cx="108" cy="152" r="9" fill="#334155"/>
        <line x1="125" y1="122" x2="178" y2="122" stroke="#dc2626" stroke-width="4" marker-end="url(#arrRed)"/>
        <text x="155" y="110" text-anchor="middle" font-size="14" font-weight="800" fill="#dc2626">F</text>
        <text x="100" y="198" text-anchor="middle" font-size="13" font-weight="800" fill="#1e3a8a">a ∝ F  සහ  a ∝ 1/m</text>
        <text x="100" y="228" text-anchor="middle" font-size="16" font-weight="800" fill="#dc2626">F = m a</text>
        <text x="100" y="255" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">1 N = 1 kg m s⁻²</text>
      </g>
      <g transform="translate(455, 55)">
        <rect x="0" y="0" width="200" height="290" rx="10" fill="#fff" stroke="#cbd5e1"/>
        <text x="100" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#e11d48">3 වන නියමය (ක්‍රියා-ප්‍රතික්‍රියා)</text>
        <ellipse cx="115" cy="122" rx="45" ry="26" fill="#f43f5e"/>
        <text x="115" y="127" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">බැලූනය</text>
        <line x1="70" y1="122" x2="25" y2="122" stroke="#0f172a" stroke-width="3.5" marker-end="url(#arr)"/>
        <text x="48" y="108" text-anchor="middle" font-size="11" font-weight="700">වාතය (ක්‍රියාව)</text>
        <line x1="160" y1="122" x2="190" y2="122" stroke="#0d9488" stroke-width="3.5" marker-end="url(#arrTeal)"/>
        <text x="100" y="195" text-anchor="middle" font-size="12" font-weight="700" fill="#0d9488">ප්‍රතික්‍රියාව නිසා බැලූනය</text>
        <text x="100" y="213" text-anchor="middle" font-size="12" font-weight="700" fill="#0d9488">ඉදිරියට ගමන් කරයි.</text>
        <text x="100" y="248" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">ගම්‍යතාව P = m v</text>
      </g>
    `),

    // Lesson 05
    L5_FRICTION: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ඝර්ෂණ බලය සහ සීමාකාරී ඝර්ෂණය කෙරෙහි බලපාන සාධක (5.2–5.5 රූප)</text>
      <g transform="translate(40, 60)">
        <rect x="0" y="0" width="600" height="280" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <!-- Table surface -->
        <line x1="40" y1="190" x2="560" y2="190" stroke="#475569" stroke-width="4"/>
        <!-- Normal reaction R and Weight W -->
        <rect x="160" y="110" width="150" height="80" rx="6" fill="#fcd34d" stroke="#b45309" stroke-width="2.5"/>
        <text x="235" y="155" text-anchor="middle" font-size="15" font-weight="800" fill="#0f172a">ලී කුට්ටිය</text>
        <!-- Pulling Force -->
        <line x1="310" y1="150" x2="450" y2="150" stroke="#0284c7" stroke-width="4" marker-end="url(#arr)"/>
        <rect x="355" y="136" width="65" height="28" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <text x="387" y="155" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">නිව්ටන් තුලාව</text>
        <text x="495" y="155" font-size="13" font-weight="800" fill="#0284c7">අදින බලය (F)</text>
        <!-- Friction Force -->
        <line x1="160" y1="182" x2="65" y2="182" stroke="#dc2626" stroke-width="4" marker-end="url(#arrRed)"/>
        <text x="105" y="170" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">ඝර්ෂණ බලය (f)</text>
        <!-- R and W -->
        <line x1="235" y1="110" x2="235" y2="35" stroke="#0d9488" stroke-width="3.5" marker-end="url(#arrTeal)"/>
        <text x="235" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#0d9488">අභිලම්බ ප්‍රතික්‍රියාව (R)</text>
        <line x1="235" y1="190" x2="235" y2="250" stroke="#0f172a" stroke-width="3.5" marker-end="url(#arr)"/>
        <text x="295" y="242" font-size="13" font-weight="800" fill="#0f172a">බර (W = mg)</text>
        <text x="300" y="268" text-anchor="middle" font-size="13" font-weight="700" fill="#334155">බලපාන සාධක: (1) ස්පර්ශ පෘෂ්ඨවල රළු ස්වභාවය  (2) අභිලම්බ ප්‍රතික්‍රියාව (R) | වර්ගඵලය බල නොපායි</text>
      </g>
    `),

    // Lesson 06
    L6_CELLS_COMPARE: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">දර්ශීය ශාක සෛලය (6.6 රූපය) සහ සත්ත්ව සෛලය (6.7 රූපය)</text>
      <!-- Plant Cell -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="305" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="152" y="25" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">දර්ශීය ශාක සෛලය</text>
        <polygon points="65,45 240,45 270,150 240,255 65,255 35,150" fill="#dcfce7" stroke="#15803d" stroke-width="5"/>
        <polygon points="73,53 232,53 260,150 232,247 73,247 45,150" fill="#f0fdf4" stroke="#16a34a" stroke-width="2" stroke-dasharray="4,2"/>
        <!-- Large central vacuole -->
        <ellipse cx="170" cy="155" rx="60" ry="68" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <text x="170" y="158" text-anchor="middle" font-size="12" font-weight="800" fill="#0369a1">විශාල මධ්‍ය රික්තකය</text>
        <!-- Nucleus -->
        <circle cx="85" cy="115" r="24" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>
        <circle cx="85" cy="115" r="8" fill="#7e22ce"/>
        <text x="85" y="152" text-anchor="middle" font-size="11" font-weight="800" fill="#6b21a8">න්‍යෂ්ටිය</text>
        <!-- Chloroplasts -->
        <ellipse cx="95" cy="205" rx="16" ry="9" fill="#16a34a"/>
        <ellipse cx="140" cy="70" rx="16" ry="9" fill="#16a34a"/>
        <text x="95" y="228" text-anchor="middle" font-size="11" font-weight="800" fill="#15803d">හරිතලව</text>
        <text x="152" y="282" text-anchor="middle" font-size="11" font-weight="700" fill="#15803d">සෛල බිත්තිය, හරිතලව හා විශාල රික්තකය ඇත</text>
      </g>
      <!-- Animal Cell -->
      <g transform="translate(350, 52)">
        <rect x="0" y="0" width="305" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="152" y="25" text-anchor="middle" font-size="15" font-weight="800" fill="#be123c">දර්ශීය සත්ත්ව සෛලය</text>
        <ellipse cx="152" cy="150" rx="105" ry="92" fill="#ffe4e6" stroke="#e11d48" stroke-width="3"/>
        <circle cx="152" cy="150" r="32" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>
        <circle cx="152" cy="150" r="10" fill="#7e22ce"/>
        <text x="152" y="196" text-anchor="middle" font-size="12" font-weight="800" fill="#6b21a8">න්‍යෂ්ටිය (මධ්‍යගත)</text>
        <!-- Mitochondria -->
        <ellipse cx="90" cy="115" rx="18" ry="9" fill="#f97316"/>
        <ellipse cx="215" cy="125" rx="18" ry="9" fill="#f97316"/>
        <text x="90" y="98" text-anchor="middle" font-size="11" font-weight="800" fill="#c2410c">මයිටොකොන්ඩ්‍රියම</text>
        <text x="210" y="95" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">ප්ලාස්ම පටලය</text>
        <text x="152" y="282" text-anchor="middle" font-size="11" font-weight="700" fill="#be123c">සෛල බිත්තියක් හා හරිතලව නැත</text>
      </g>
    `),

    L6_MITOSIS_MEIOSIS: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">අනූනන විභාජනය (6.18 රූපය) සහ ඌනන විභාජනය (6.19 රූපය)</text>
      <!-- Mitosis -->
      <g transform="translate(30, 58)">
        <rect x="0" y="0" width="290" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="145" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#0d9488">අනූනන විභාජනය (Mitosis)</text>
        <circle cx="145" cy="75" r="26" fill="#ccfbf1" stroke="#0d9488" stroke-width="2.5"/>
        <text x="145" y="81" text-anchor="middle" font-size="15" font-weight="800">2n</text>
        <line x1="130" y1="100" x2="85" y2="165" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr)"/>
        <line x1="160" y1="100" x2="205" y2="165" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr)"/>
        <circle cx="80" cy="195" r="26" fill="#ccfbf1" stroke="#0d9488" stroke-width="2.5"/>
        <text x="80" y="201" text-anchor="middle" font-size="15" font-weight="800">2n</text>
        <circle cx="210" cy="195" r="26" fill="#ccfbf1" stroke="#0d9488" stroke-width="2.5"/>
        <text x="210" y="201" text-anchor="middle" font-size="15" font-weight="800">2n</text>
        <text x="145" y="250" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">සර්වසම දුහිතෘ සෛල 2ක් සෑදේ</text>
        <text x="145" y="270" text-anchor="middle" font-size="12" font-weight="700" fill="#0d9488">දේහ වර්ධනය හා අලිංගික ප්‍රජනනය</text>
      </g>
      <!-- Meiosis -->
      <g transform="translate(345, 58)">
        <rect x="0" y="0" width="305" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="152" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#7c3aed">ඌනන විභාජනය (Meiosis)</text>
        <circle cx="152" cy="65" r="22" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2.5"/>
        <text x="152" y="71" text-anchor="middle" font-size="14" font-weight="800">2n</text>
        <line x1="138" y1="86" x2="95" y2="122" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="166" y1="86" x2="210" y2="122" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <circle cx="90" cy="142" r="20" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
        <text x="90" y="147" text-anchor="middle" font-size="13" font-weight="800">n</text>
        <circle cx="215" cy="142" r="20" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
        <text x="215" y="147" text-anchor="middle" font-size="13" font-weight="800">n</text>
        <!-- 4 cells -->
        <circle cx="48" cy="212" r="18" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="48" y="217" text-anchor="middle" font-size="12" font-weight="800">n</text>
        <circle cx="115" cy="212" r="18" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="115" y="217" text-anchor="middle" font-size="12" font-weight="800">n</text>
        <circle cx="188" cy="212" r="18" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="188" y="217" text-anchor="middle" font-size="12" font-weight="800">n</text>
        <circle cx="255" cy="212" r="18" fill="#ddd6fe" stroke="#6d28d9" stroke-width="2"/>
        <text x="255" y="217" text-anchor="middle" font-size="12" font-weight="800">n</text>
        <text x="152" y="250" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">ඒකගුණ (n) දුහිතෘ සෛල 4ක් සෑදේ</text>
        <text x="152" y="270" text-anchor="middle" font-size="12" font-weight="700" fill="#7c3aed">ජන්මාණු සෑදීම හා ප්‍රභේදන ඇතිවීම</text>
      </g>
    `),

    // Lesson 07
    L7_MOLE_AVOGADRO: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ඇවගාඩ්රෝ නියතය (L = 6.022 × 10²³) සහ මවුලය (1 mol)</text>
      <g transform="translate(40, 60)">
        <rect x="0" y="0" width="600" height="280" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <rect x="195" y="100" width="210" height="75" rx="12" fill="#0d9488"/>
        <text x="300" y="132" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">1 mol (මවුල 1ක්)</text>
        <text x="300" y="156" text-anchor="middle" font-size="14" font-weight="800" fill="#ccfbf1">6.022 × 10²³ අංශු</text>
        <!-- Surrounding examples -->
        <circle cx="80" cy="65" r="42" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="80" y="62" text-anchor="middle" font-size="13" font-weight="800">¹²C</text>
        <text x="80" y="80" text-anchor="middle" font-size="12" font-weight="700">12 g</text>

        <circle cx="80" cy="210" r="42" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <text x="80" y="207" text-anchor="middle" font-size="13" font-weight="800">H₂O</text>
        <text x="80" y="225" text-anchor="middle" font-size="12" font-weight="700">18 g</text>

        <circle cx="520" cy="65" r="42" fill="#f3e8ff" stroke="#7c3aed" stroke-width="2"/>
        <text x="520" y="62" text-anchor="middle" font-size="13" font-weight="800">CO₂</text>
        <text x="520" y="80" text-anchor="middle" font-size="12" font-weight="700">44 g</text>

        <circle cx="520" cy="210" r="42" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
        <text x="520" y="207" text-anchor="middle" font-size="13" font-weight="800">NaCl</text>
        <text x="520" y="225" text-anchor="middle" font-size="12" font-weight="700">58.5 g</text>

        <line x1="122" y1="78" x2="195" y2="118" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="122" y1="195" x2="195" y2="155" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="478" y1="78" x2="405" y2="118" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="478" y1="195" x2="405" y2="155" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>

        <text x="300" y="255" text-anchor="middle" font-size="15" font-weight="800" fill="#0f172a">ද්‍රව්‍ය ප්‍රමාණය (මවුල ගණන) n = m (ස්කන්ධය) / M (මවුලික ස්කන්ධය)</text>
      </g>
    `),

    // Lesson 08
    L8_RESPIRATION_AUXANO: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ශ්වසනයේ දී O₂ අවශෝෂණය (8.9 රූපය) සහ වෘද්ධිමානය (8.12 රූපය)</text>
      <g transform="translate(30, 58)">
        <rect x="0" y="0" width="300" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="150" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">ප්‍රරෝහණය වන බීජ ශ්වසන ඇටවුම</text>
        <!-- Flask -->
        <polygon points="85,75 115,75 135,195 55,195" fill="#f1f5f9" stroke="#334155" stroke-width="2.5"/>
        <!-- Seeds at bottom -->
        <circle cx="75" cy="185" r="6" fill="#ca8a04"/>
        <circle cx="95" cy="185" r="6" fill="#ca8a04"/>
        <circle cx="115" cy="185" r="6" fill="#ca8a04"/>
        <!-- KOH tube inside -->
        <rect x="88" y="125" width="18" height="45" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>
        <text x="50" y="145" font-size="11" font-weight="800" fill="#0284c7">KOH</text>
        <!-- U tube to beaker -->
        <polyline points="100,75 100,48 220,48 220,185" fill="none" stroke="#0f172a" stroke-width="3"/>
        <rect x="190" y="145" width="60" height="55" fill="#fecdd3" stroke="#e11d48" stroke-width="2"/>
        <line x1="220" y1="185" x2="220" y2="105" stroke="#e11d48" stroke-width="5"/>
        <text x="150" y="230" text-anchor="middle" font-size="11" font-weight="700">KOH මගින් CO₂ අවශෝෂණය කරයි.</text>
        <text x="150" y="250" text-anchor="middle" font-size="11" font-weight="800" fill="#be123c">බීජ O₂ උරාගන්නා විට ජල මට්ටම ඉහළ යයි.</text>
      </g>
      <g transform="translate(345, 58)">
        <rect x="0" y="0" width="305" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="152" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#16a34a">චාප වෘද්ධිමානය (Auxanometer)</text>
        <!-- Arc scale -->
        <path d="M 75 55 A 85 85 0 0 0 75 175" fill="none" stroke="#0f172a" stroke-width="3"/>
        <!-- Pulley -->
        <circle cx="165" cy="115" r="18" fill="#fde047" stroke="#ca8a04" stroke-width="2.5"/>
        <!-- Pointer -->
        <line x1="165" y1="115" x2="68" y2="115" stroke="#dc2626" stroke-width="3" marker-end="url(#arrRed)"/>
        <!-- Plant pot -->
        <rect x="135" y="205" width="45" height="40" fill="#d97706"/>
        <line x1="157" y1="205" x2="157" y2="150" stroke="#16a34a" stroke-width="4"/>
        <!-- Thread over pulley to weight -->
        <line x1="157" y1="150" x2="157" y2="115" stroke="#334155" stroke-width="1.5"/>
        <line x1="183" y1="115" x2="183" y2="175" stroke="#334155" stroke-width="1.5"/>
        <rect x="175" y="175" width="16" height="18" fill="#475569"/>
        <text x="220" y="188" font-size="11" font-weight="700">බර</text>
        <text x="65" y="100" font-size="11" font-weight="700">පරිමාණය</text>
        <text x="152" y="268" text-anchor="middle" font-size="12" font-weight="700" fill="#15803d">ශාකයේ සියුම් වර්ධනය විශාලනය කර පෙන්වයි</text>
      </g>
    `),

    // Lesson 09
    L9_RESULTANT_FORCES: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ඒක රේඛීය, සමාන්තර සහ ආනත බලවල සම්ප්‍රයුක්තය (9.5–9.11 රූප)</text>
      <g transform="translate(30, 58)">
        <rect x="0" y="0" width="620" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <!-- Case 1 -->
        <text x="35" y="42" font-size="14" font-weight="800" fill="#0d9488">1. එකම දිශාවට ඒක රේඛීය බල:</text>
        <rect x="260" y="22" width="65" height="32" rx="5" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>
        <line x1="325" y1="32" x2="395" y2="32" stroke="#0d9488" stroke-width="3" marker-end="url(#arrTeal)"/>
        <line x1="325" y1="44" x2="415" y2="44" stroke="#2563eb" stroke-width="3" marker-end="url(#arr)"/>
        <text x="515" y="42" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">R = F₁ + F₂</text>
        <!-- Case 2 -->
        <text x="35" y="112" font-size="14" font-weight="800" fill="#dc2626">2. ප්‍රතිවිරුද්ධ ඒක රේඛීය බල:</text>
        <rect x="285" y="92" width="65" height="32" rx="5" fill="#fecdd3" stroke="#e11d48" stroke-width="2"/>
        <line x1="285" y1="108" x2="225" y2="108" stroke="#dc2626" stroke-width="3" marker-end="url(#arrRed)"/>
        <line x1="350" y1="108" x2="425" y2="108" stroke="#2563eb" stroke-width="3" marker-end="url(#arr)"/>
        <text x="515" y="112" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">R = F₁ - F₂ (වැඩි දිශාවට)</text>
        <!-- Case 3 -->
        <text x="35" y="185" font-size="14" font-weight="800" fill="#2563eb">3. එකම දිශාවට සමාන්තර බල:</text>
        <rect x="285" y="158" width="65" height="45" rx="5" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <line x1="350" y1="168" x2="420" y2="168" stroke="#0f172a" stroke-width="3" marker-end="url(#arr)"/>
        <line x1="350" y1="192" x2="420" y2="192" stroke="#0f172a" stroke-width="3" marker-end="url(#arr)"/>
        <text x="515" y="185" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">R = F₁ + F₂</text>
        <!-- Case 4 -->
        <text x="35" y="252" font-size="14" font-weight="800" fill="#7c3aed">4. ආනත බල දෙකක් (P හා Q):</text>
        <circle cx="300" cy="248" r="14" fill="#ddd6fe" stroke="#7c3aed" stroke-width="2"/>
        <line x1="312" y1="242" x2="375" y2="218" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr)"/>
        <line x1="312" y1="254" x2="375" y2="275" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr)"/>
        <line x1="314" y1="248" x2="405" y2="248" stroke="#dc2626" stroke-width="3" stroke-dasharray="5,3" marker-end="url(#arrRed)"/>
        <text x="515" y="252" text-anchor="middle" font-size="13" font-weight="800" fill="#7c3aed">බල දෙක අතර දිශාවකට</text>
      </g>
    `),

    // Lesson 10
    L10_BONDING_LEWIS: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">අයනික බන්ධන (NaCl) සහ සහසංයුජ ලුවිස් ව්‍යුහ (H₂O, CO₂, N₂)</text>
      <g transform="translate(28, 55)">
        <rect x="0" y="0" width="295" height="290" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="147" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">අයනික බන්ධනය: Na⁺ Cl⁻</text>
        <circle cx="85" cy="115" r="38" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
        <text x="85" y="120" text-anchor="middle" font-size="16" font-weight="800" fill="#0369a1">[Na]⁺</text>
        <text x="85" y="172" text-anchor="middle" font-size="12" font-weight="700">(2, 8)</text>
        <circle cx="205" cy="115" r="44" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
        <text x="205" y="120" text-anchor="middle" font-size="16" font-weight="800" fill="#15803d">[Cl]⁻</text>
        <text x="205" y="172" text-anchor="middle" font-size="12" font-weight="700">(2, 8, 8)</text>
        <text x="147" y="218" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">ස්ථිති විද්‍යුත් ආකර්ෂණයෙන්</text>
        <text x="147" y="238" text-anchor="middle" font-size="12" font-weight="800" fill="#0d9488">ත්‍රිමාන අයනික දැලිසක් සාදයි.</text>
        <text x="147" y="268" text-anchor="middle" font-size="11" font-weight="700" fill="#dc2626">ජලීය හා විලීන අවස්ථාවේ විද්‍යුතය සන්නයනය කරයි</text>
      </g>
      <g transform="translate(340, 55)">
        <rect x="0" y="0" width="310" height="290" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="155" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">සහසංයුජ ලුවිස් ව්‍යුහ හා ධ්‍රැවීයතාව</text>
        <!-- H2O -->
        <text x="80" y="75" text-anchor="middle" font-size="15" font-weight="800" fill="#0284c7">ජල අණුව (H₂O)</text>
        <text x="80" y="112" text-anchor="middle" font-size="18" font-weight="800">H — O — H</text>
        <text x="80" y="95" text-anchor="middle" font-size="16" font-weight="800" fill="#dc2626">••</text>
        <text x="80" y="128" text-anchor="middle" font-size="16" font-weight="800" fill="#dc2626">••</text>
        <text x="80" y="148" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">බන්ධන යුගල 2, එකසර යුගල 2</text>
        <!-- CO2 -->
        <text x="235" y="75" text-anchor="middle" font-size="15" font-weight="800" fill="#16a34a">CO₂ (ද්විත්ව)</text>
        <text x="235" y="112" text-anchor="middle" font-size="17" font-weight="800">:Ö = C = Ö:</text>
        <!-- N2 -->
        <text x="155" y="198" text-anchor="middle" font-size="15" font-weight="800" fill="#7c3aed">නයිට්‍රජන් N₂ (ත්‍රිත්ව බන්ධනය):   :N ≡ N:</text>
        <text x="155" y="238" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">ජල අණු අතර හයිඩ්‍රජන් බන්ධන (අන්තර් අණුක</text>
        <text x="155" y="258" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">බල) නිසා ජලයේ තාපාංකය (100°C) ඉහළ වේ.</text>
      </g>
    `),

    // Lesson 11
    L11_MOMENT_COUPLE: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">බල ඝූර්ණය (11.6 රූපය) සහ බල යුග්මය (11.7 රූපය)</text>
      <g transform="translate(30, 58)">
        <rect x="0" y="0" width="380" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="190" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">ඝූර්ණ යටතේ දණ්ඩක සමතුලිතතාව</text>
        <!-- Beam -->
        <rect x="40" y="120" width="300" height="14" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <!-- Pivot O -->
        <polygon points="190,134 175,165 205,165" fill="#334155"/>
        <text x="190" y="182" text-anchor="middle" font-size="14" font-weight="800">O (විවර්තන ලක්ෂ්‍යය)</text>
        <!-- F2 Left -->
        <line x1="65" y1="134" x2="65" y2="210" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrRed)"/>
        <text x="65" y="230" text-anchor="middle" font-size="14" font-weight="800" fill="#dc2626">F₂ (වාමාවර්ත)</text>
        <text x="127" y="110" text-anchor="middle" font-size="13" font-weight="800">← d₂ →</text>
        <!-- F1 Right -->
        <line x1="315" y1="134" x2="315" y2="210" stroke="#2563eb" stroke-width="3.5" marker-end="url(#arr)"/>
        <text x="315" y="230" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">F₁ (දක්ෂිණාවර්ත)</text>
        <text x="252" y="110" text-anchor="middle" font-size="13" font-weight="800">← d₁ →</text>
        <text x="190" y="266" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a">සමතුලිතතාවේ දී:  F₁ × d₁ = F₂ × d₂</text>
      </g>
      <g transform="translate(425, 58)">
        <rect x="0" y="0" width="225" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="112" y="28" text-anchor="middle" font-size="14" font-weight="800" fill="#7c3aed">බල යුග්මය (Couple)</text>
        <rect x="35" y="125" width="155" height="14" rx="4" fill="#a78bfa" stroke="#6d28d9" stroke-width="2"/>
        <circle cx="112" cy="132" r="5" fill="#0f172a"/>
        <line x1="45" y1="125" x2="45" y2="65" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrRed)"/>
        <text x="45" y="55" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">F</text>
        <line x1="180" y1="139" x2="180" y2="199" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrRed)"/>
        <text x="180" y="218" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">F</text>
        <text x="112" y="115" text-anchor="middle" font-size="12" font-weight="800">← d →</text>
        <text x="112" y="255" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">ඝූර්ණය = F × d (N m)</text>
      </g>
    `),

    // Lesson 12
    L12_EQUILIBRIUM: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">බල 2ක් සහ බල 3ක් යටතේ වස්තුවක සමතුලිතතාව (12.4–12.12 රූප)</text>
      <!-- 2 Forces -->
      <g transform="translate(25, 58)">
        <rect x="0" y="0" width="200" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="100" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#0d9488">1. බල 2ක් යටතේ</text>
        <circle cx="100" cy="125" r="24" fill="none" stroke="#0f172a" stroke-width="5"/>
        <line x1="76" y1="125" x2="22" y2="125" stroke="#dc2626" stroke-width="3.5" marker-end="url(#arrRed)"/>
        <line x1="124" y1="125" x2="178" y2="125" stroke="#0284c7" stroke-width="3.5" marker-end="url(#arr)"/>
        <text x="45" y="112" font-size="13" font-weight="800" fill="#dc2626">F₁</text>
        <text x="155" y="112" font-size="13" font-weight="800" fill="#0284c7">F₂</text>
        <text x="100" y="195" text-anchor="middle" font-size="11" font-weight="700">• F₁ = F₂ (සමාන විශාලත්ව)</text>
        <text x="100" y="218" text-anchor="middle" font-size="11" font-weight="700">• ප්‍රතිවිරුද්ධ දිශා</text>
        <text x="100" y="241" text-anchor="middle" font-size="11" font-weight="700">• ඒක රේඛීය වීම</text>
      </g>
      <!-- 3 Parallel Forces -->
      <g transform="translate(240, 58)">
        <rect x="0" y="0" width="200" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="100" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#2563eb">2. සමාන්තර බල 3ක්</text>
        <rect x="30" y="120" width="140" height="10" fill="#f59e0b" stroke="#b45309"/>
        <line x1="45" y1="120" x2="45" y2="65" stroke="#0d9488" stroke-width="3" marker-end="url(#arrTeal)"/>
        <line x1="155" y1="120" x2="155" y2="65" stroke="#0d9488" stroke-width="3" marker-end="url(#arrTeal)"/>
        <line x1="100" y1="130" x2="100" y2="185" stroke="#dc2626" stroke-width="3" marker-end="url(#arrRed)"/>
        <text x="45" y="55" text-anchor="middle" font-size="12" font-weight="800">F₁</text>
        <text x="155" y="55" text-anchor="middle" font-size="12" font-weight="800">F₂</text>
        <text x="100" y="202" text-anchor="middle" font-size="12" font-weight="800" fill="#dc2626">W</text>
        <text x="100" y="232" text-anchor="middle" font-size="12" font-weight="800" fill="#1e3a8a">F₁ + F₂ = W</text>
        <text x="100" y="255" text-anchor="middle" font-size="11" font-weight="700">බල 3 ඒකතල විය යුතුය</text>
      </g>
      <!-- 3 Non-Parallel Forces -->
      <g transform="translate(455, 58)">
        <rect x="0" y="0" width="200" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="100" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#7c3aed">3. ආනත බල 3ක්</text>
        <circle cx="100" cy="115" r="5" fill="#dc2626"/>
        <line x1="100" y1="115" x2="45" y2="65" stroke="#0284c7" stroke-width="3" marker-end="url(#arr)"/>
        <line x1="100" y1="115" x2="155" y2="65" stroke="#0284c7" stroke-width="3" marker-end="url(#arr)"/>
        <line x1="100" y1="115" x2="100" y2="185" stroke="#dc2626" stroke-width="3" marker-end="url(#arrRed)"/>
        <text x="42" y="55" font-size="12" font-weight="800">F₁</text>
        <text x="155" y="55" font-size="12" font-weight="800">F₂</text>
        <text x="100" y="202" text-anchor="middle" font-size="12" font-weight="800" fill="#dc2626">W</text>
        <text x="100" y="228" text-anchor="middle" font-size="11" font-weight="700">• බල 3 ඒකතල වීම</text>
        <text x="100" y="248" text-anchor="middle" font-size="11" font-weight="700">• ක්‍රියා රේඛා එකම</text>
        <text x="100" y="265" text-anchor="middle" font-size="11" font-weight="700">  ලක්ෂ්‍යයකදී හමුවීම</text>
      </g>
    `),

    // Lesson 13
    L13_THREE_DOMAINS: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">කාල් වූස්ගේ අධිරාජධානි තුනේ වර්ගීකරණය (13.3 රූපය) සහ රාජධානි</text>
      <g transform="translate(30, 52)">
        <rect x="0" y="0" width="620" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <!-- Root -->
        <rect x="235" y="245" width="150" height="36" rx="8" fill="#334155"/>
        <text x="310" y="268" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">පොදු පූර්වජයින්</text>
        <!-- Branches -->
        <line x1="310" y1="245" x2="115" y2="115" stroke="#0f172a" stroke-width="4"/>
        <line x1="310" y1="245" x2="435" y2="115" stroke="#0f172a" stroke-width="4"/>
        <line x1="355" y1="195" x2="275" y2="115" stroke="#0f172a" stroke-width="4"/>
        <!-- Domain 1: Bacteria -->
        <rect x="35" y="45" width="160" height="65" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
        <text x="115" y="72" text-anchor="middle" font-size="13" font-weight="800">බැක්ටීරියා අධිරාජධානිය</text>
        <text x="115" y="95" text-anchor="middle" font-size="11" font-weight="700" fill="#854d0e">බැක්ටීරියා, සයනොබැක්ටීරියා</text>
        <!-- Domain 2: Archaea -->
        <rect x="205" y="45" width="150" height="65" rx="10" fill="#fed7aa" stroke="#ea580c" stroke-width="2.5"/>
        <text x="280" y="72" text-anchor="middle" font-size="13" font-weight="800">ආකියා අධිරාජධානිය</text>
        <text x="280" y="95" text-anchor="middle" font-size="11" font-weight="700" fill="#9a3412">Methanogens, Halophiles</text>
        <!-- Domain 3: Eukarya -->
        <rect x="370" y="25" width="225" height="135" rx="10" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2.5"/>
        <text x="482" y="50" text-anchor="middle" font-size="14" font-weight="800" fill="#312e81">ඉයුකැරියා අධිරාජධානිය</text>
        <text x="482" y="74" text-anchor="middle" font-size="12" font-weight="700" fill="#1e1b4b">1. ප්‍රොටිස්ටා රාජධානිය</text>
        <text x="482" y="95" text-anchor="middle" font-size="12" font-weight="700" fill="#1e1b4b">2. ෆන්ගයි රාජධානිය</text>
        <text x="482" y="116" text-anchor="middle" font-size="12" font-weight="700" fill="#15803d">3. ප්ලාන්ටේ රාජධානිය</text>
        <text x="482" y="137" text-anchor="middle" font-size="12" font-weight="700" fill="#be123c">4. ඇනිමාලියා රාජධානිය</text>
      </g>
    `),

    // Lesson 14
    L14_FLOWER_MENSTRUAL: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">දර්ශීය පුෂ්පයක දික්කඩ (14.6 රූපය) සහ මානව ආර්තව චක්‍රය (14.25–14.26 රූප)</text>
      <!-- Flower -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="295" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="147" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#e11d48">දර්ශීය පුෂ්පයක ව්‍යුහය</text>
        <!-- Petals -->
        <ellipse cx="95" cy="140" rx="48" ry="65" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
        <ellipse cx="200" cy="140" rx="48" ry="65" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
        <!-- Carpel -->
        <ellipse cx="147" cy="185" rx="24" ry="30" fill="#dcfce7" stroke="#15803d" stroke-width="2.5"/>
        <rect x="141" y="85" width="12" height="75" fill="#86efac" stroke="#15803d" stroke-width="2"/>
        <ellipse cx="147" cy="82" rx="16" ry="8" fill="#16a34a"/>
        <!-- Stamens -->
        <line x1="120" y1="190" x2="105" y2="95" stroke="#ca8a04" stroke-width="2.5"/>
        <ellipse cx="105" cy="92" rx="10" ry="6" fill="#eab308"/>
        <line x1="174" y1="190" x2="190" y2="95" stroke="#ca8a04" stroke-width="2.5"/>
        <ellipse cx="190" cy="92" rx="10" ry="6" fill="#eab308"/>
        <text x="147" y="65" text-anchor="middle" font-size="11" font-weight="800" fill="#15803d">කලංකය (ජායාංගය)</text>
        <text x="62" y="88" font-size="11" font-weight="800" fill="#b45309">පරාගධානිය</text>
        <text x="245" y="135" font-size="11" font-weight="800" fill="#be123c">දල පත්‍ර</text>
        <text x="147" y="238" text-anchor="middle" font-size="11" font-weight="800" fill="#15803d">ඩිම්බකෝෂය → ඵලය | ඩිම්බ → බීජ</text>
        <text x="147" y="268" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">පූමංගය = පරාගධානිය + සූත්‍රිකාව</text>
      </g>
      <!-- Menstrual Cycle -->
      <g transform="translate(335, 52)">
        <rect x="0" y="0" width="320" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="160" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#7c3aed">ආර්තව චක්‍රය (දින 28)</text>
        <!-- Timeline -->
        <rect x="20" y="52" width="140" height="28" rx="4" fill="#dbeafe" stroke="#2563eb"/>
        <text x="90" y="70" text-anchor="middle" font-size="11" font-weight="800" fill="#1e40af">ස්‍යුනිකා අවධිය (දින 1-14)</text>
        <rect x="160" y="52" width="140" height="28" rx="4" fill="#f3e8ff" stroke="#7c3aed"/>
        <text x="230" y="70" text-anchor="middle" font-size="11" font-weight="800" fill="#6b21a8">ලුයුටියල් අවධිය (දින 14-28)</text>
        <!-- Ovulation spike -->
        <line x1="160" y1="80" x2="160" y2="235" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="160" y="102" text-anchor="middle" font-size="11" font-weight="800" fill="#dc2626">14 වන දිනය: ඩිම්බ මෝචනය (LH උපරිමය)</text>
        <!-- Uterine lining -->
        <path d="M 20 215 L 55 225 L 160 175 L 265 155 L 300 205 L 300 235 L 20 235 Z" fill="#fda4af" stroke="#e11d48" stroke-width="2"/>
        <text x="45" y="252" text-anchor="middle" font-size="10" font-weight="800">ආර්තව (1-4)</text>
        <text x="115" y="252" text-anchor="middle" font-size="10" font-weight="800">ප්‍රගුණන (5-14)</text>
        <text x="230" y="252" text-anchor="middle" font-size="10" font-weight="800">ස්‍රාවී අවධිය (15-28)</text>
        <text x="160" y="280" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">හෝර්මෝන: FSH, LH, ඊස්ට්‍රජන්, ප්‍රොජෙස්ටෙරෝන්</text>
      </g>
    `),

    // Lesson 15
    L15_PRESSURE_ARCHIMEDES: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ද්‍රව පීඩනය (P = hρg), රසදිය පීඩනමානය (76 cm Hg) හා ආකිමිඩීස් මූලධර්මය</text>
      <!-- P=hpg & Hydraulic -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="205" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="102" y="25" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">ද්‍රව පීඩනය P = hρg</text>
        <rect x="55" y="55" width="95" height="150" fill="#bae6fd" stroke="#0284c7" stroke-width="2.5"/>
        <line x1="102" y1="55" x2="102" y2="185" stroke="#dc2626" stroke-width="2.5" marker-end="url(#arrRed)"/>
        <text x="118" y="125" font-size="14" font-weight="800" fill="#dc2626">h</text>
        <text x="102" y="232" text-anchor="middle" font-size="12" font-weight="800">P = h ρ g (Pa හෙවත් N m⁻²)</text>
        <text x="102" y="258" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">ගැඹුර (h) හා ඝනත්වය (ρ)</text>
        <text x="102" y="275" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">මත පමණක් රඳා පවතී.</text>
      </g>
      <!-- Barometer -->
      <g transform="translate(242, 52)">
        <rect x="0" y="0" width="195" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="97" y="25" text-anchor="middle" font-size="13" font-weight="800" fill="#475569">රසදිය පීඩනමානය</text>
        <rect x="45" y="175" width="105" height="40" fill="#94a3b8" stroke="#334155" stroke-width="2"/>
        <rect x="85" y="50" width="24" height="150" rx="10" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
        <rect x="87" y="80" width="20" height="120" fill="#64748b"/>
        <text x="97" y="70" text-anchor="middle" font-size="10" font-weight="800" fill="#dc2626">රික්තය</text>
        <text x="142" y="135" font-size="12" font-weight="800" fill="#0f172a">76 cm Hg</text>
        <text x="97" y="242" text-anchor="middle" font-size="11" font-weight="800" fill="#0d9488">මුහුදු මට්ටමේ වායුගෝලීය</text>
        <text x="97" y="260" text-anchor="middle" font-size="11" font-weight="800" fill="#0d9488">පීඩනය = 76 cm Hg</text>
        <text x="97" y="278" text-anchor="middle" font-size="11" font-weight="700">(≈ 103 360 Pa)</text>
      </g>
      <!-- Archimedes -->
      <g transform="translate(450, 52)">
        <rect x="0" y="0" width="205" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="102" y="25" text-anchor="middle" font-size="13" font-weight="800" fill="#0d9488">ආකිමිඩීස් මූලධර්මය</text>
        <rect x="45" y="95" width="115" height="110" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
        <rect x="78" y="125" width="48" height="48" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
        <line x1="102" y1="125" x2="102" y2="75" stroke="#0d9488" stroke-width="3.5" marker-end="url(#arrTeal)"/>
        <text x="102" y="68" text-anchor="middle" font-size="11" font-weight="800" fill="#0d9488">උඩුකුරු තෙරපුම (U)</text>
        <text x="102" y="232" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">උඩුකුරු තෙරපුම =</text>
        <text x="102" y="250" text-anchor="middle" font-size="11" font-weight="800" fill="#0d9488">විස්ථාපිත තරලයේ බර</text>
        <text x="102" y="275" text-anchor="middle" font-size="11" font-weight="700">පාවෙන විට: U = වස්තුවේ බර (W)</text>
      </g>
    `),

    // Lesson 16
    L16_BLAST_FURNACE_GASES: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">යකඩ නිස්සාරණ ධාරා ඌෂ්මකය (16.1 රූපය) සහ සක්‍රියතා ශ්‍රේණිය</text>
      <g transform="translate(28, 52)">
        <rect x="0" y="0" width="350" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="175" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#c2410c">ධාරා ඌෂ්මකය (Blast Furnace)</text>
        <polygon points="135,55 215,55 245,215 225,255 125,255 105,215" fill="#fed7aa" stroke="#9a3412" stroke-width="4"/>
        <rect x="125" y="230" width="100" height="25" fill="#dc2626"/>
        <rect x="125" y="212" width="100" height="18" fill="#78716c"/>
        <text x="175" y="46" text-anchor="middle" font-size="11" font-weight="800">හීමටයිට් (Fe₂O₃) + හුණුගල් (CaCO₃) + කෝක් (C)</text>
        <text x="175" y="105" text-anchor="middle" font-size="11" font-weight="700">C + O₂ → CO₂  |  CO₂ + C → 2CO</text>
        <text x="175" y="135" text-anchor="middle" font-size="12" font-weight="800" fill="#9a3412">Fe₂O₃ + 3CO → 2Fe + 3CO₂</text>
        <text x="175" y="165" text-anchor="middle" font-size="11" font-weight="700">CaCO₃ → CaO + CO₂</text>
        <text x="175" y="188" text-anchor="middle" font-size="11" font-weight="700">CaO + SiO₂ → CaSiO₃ (ලෝබොර)</text>
        <text x="175" y="225" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">ලෝබොර ස්තරය</text>
        <text x="175" y="247" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">ද්‍රව යකඩ (Fe)</text>
        <text x="175" y="280" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">උෂ්ණත්ව පරාසය: 1000°C – 1900°C</text>
      </g>
      <g transform="translate(392, 52)">
        <rect x="0" y="0" width="260" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="130" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">සක්‍රියතා ශ්‍රේණිය</text>
        <text x="130" y="52" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">K, Na, Ca, Mg, Al</text>
        <text x="130" y="72" text-anchor="middle" font-size="11" fill="#475569">(ඉහළ සක්‍රියතාව - විද්‍යුත් විච්ඡේදනය)</text>
        <text x="130" y="105" text-anchor="middle" font-size="13" font-weight="800" fill="#d97706">Zn, Fe, Sn, Pb, (H)</text>
        <text x="130" y="125" text-anchor="middle" font-size="11" fill="#475569">(මධ්‍යස්ථ - ඔක්සිහරණයෙන් නිස්සාරණය)</text>
        <text x="130" y="158" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">Cu, Hg, Ag, Pt, Au</text>
        <text x="130" y="178" text-anchor="middle" font-size="11" fill="#475569">(අඩු සක්‍රියතාව - නිදහස් ලෝහ ලෙස)</text>
        <rect x="18" y="200" width="224" height="82" rx="8" fill="#f0fdfa" stroke="#0d9488"/>
        <text x="130" y="220" text-anchor="middle" font-size="11" font-weight="800" fill="#0f172a">වායු හඳුනාගැනීම:</text>
        <text x="130" y="238" text-anchor="middle" font-size="11">• H₂ : දැල්වෙන ඉරටුව → "පොප්" හඬ</text>
        <text x="130" y="255" text-anchor="middle" font-size="11">• O₂ : පුලිඟු කූර → දීප්තිමත්ව දැල්වේ</text>
        <text x="130" y="272" text-anchor="middle" font-size="11">• CO₂ : හුණු දියර → කිරි පැහැ වේ</text>
      </g>
    `),

    // Lesson 17
    L17_REACTION_RATE: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ප්‍රතික්‍රියා ශීඝ්‍රතාව කෙරෙහි බලපාන සාධක 4 සහ කැට/කුඩු ප්‍රස්තාරය</text>
      <g transform="translate(30, 58)">
        <rect x="0" y="0" width="315" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="157" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">බලපාන ප්‍රධාන සාධක 4</text>
        <rect x="20" y="45" width="275" height="46" rx="8" fill="#ccfbf1"/>
        <text x="157" y="66" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">1. පෘෂ්ඨ වර්ගඵලය වැඩි කිරීම (කැට → කුඩු)</text>
        <text x="157" y="83" text-anchor="middle" font-size="11" fill="#0f766e">ගැටෙන පෘෂ්ඨ වර්ගඵලය වැඩි වී ශීඝ්‍රතාව වැඩිවේ</text>

        <rect x="20" y="102" width="275" height="46" rx="8" fill="#fef3c7"/>
        <text x="157" y="123" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">2. උෂ්ණත්වය ඉහළ නැංවීම</text>
        <text x="157" y="140" text-anchor="middle" font-size="11" fill="#92400e">අංශුවල චාලක ශක්තිය හා ගැටුම් සංඛ්‍යාව වැඩිවේ</text>

        <rect x="20" y="159" width="275" height="46" rx="8" fill="#e0f2fe"/>
        <text x="157" y="180" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">3. සාන්ද්‍රණය / වායු පීඩනය වැඩි කිරීම</text>
        <text x="157" y="197" text-anchor="middle" font-size="11" fill="#0369a1">ඒකක පරිමාවක අංශු සංඛ්‍යාව හා ගැටුම් වැඩිවේ</text>

        <rect x="20" y="216" width="275" height="48" rx="8" fill="#f3e8ff"/>
        <text x="157" y="237" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">4. උත්ප්‍රේරක (Catalysts) යෙදීම</text>
        <text x="157" y="254" text-anchor="middle" font-size="11" fill="#6b21a8">වැය නොවී ප්‍රතික්‍රියා ශීඝ්‍රතාව වැඩි කරයි (උදා: MnO₂)</text>
      </g>
      <g transform="translate(360, 58)">
        <rect x="0" y="0" width="290" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="145" y="26" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">CaCO₃ කුඩු හා කැට ප්‍රස්තාරය</text>
        <line x1="45" y1="225" x2="265" y2="225" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <line x1="45" y1="225" x2="45" y2="50" stroke="#0f172a" stroke-width="2" marker-end="url(#arr)"/>
        <!-- Powder curve -->
        <path d="M 45 225 Q 75 75 155 75 L 255 75" fill="none" stroke="#dc2626" stroke-width="3.5"/>
        <text x="115" y="68" font-size="12" font-weight="800" fill="#dc2626">CaCO₃ කුඩු (වැඩි ශීඝ්‍රතාව)</text>
        <!-- Chips curve -->
        <path d="M 45 225 Q 125 85 225 75 L 255 75" fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="6,3"/>
        <text x="185" y="135" font-size="12" font-weight="800" fill="#0284c7">CaCO₃ කැට</text>
        <text x="155" y="248" text-anchor="middle" font-size="12" font-weight="700">කාලය (මිනිත්තු)</text>
        <text x="145" y="270" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">සමාන ස්කන්ධ නිසා අවසාන ඵල ප්‍රමාණය සමාන වේ</text>
      </g>
    `),

    // Lesson 18
    L18_WORK_ENERGY_POWER: toSvgUrl(`
      <text x="340" y="34" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">කාර්යය (W = Fs), යාන්ත්‍රික ශක්තිය (Eₖ, Eₚ) සහ ජවය (P = W/t)</text>
      <g transform="translate(30, 58)">
        <rect x="0" y="0" width="620" height="285" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <!-- Box 1: Work -->
        <rect x="20" y="25" width="180" height="115" rx="10" fill="#f0fdfa" stroke="#0d9488" stroke-width="2"/>
        <text x="110" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">කාර්යය (Work)</text>
        <text x="110" y="82" text-anchor="middle" font-size="16" font-weight="800">W = F × s</text>
        <text x="110" y="108" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">ඒකකය: ජූල් (J = N m)</text>
        <!-- Box 2: Kinetic Energy -->
        <rect x="220" y="25" width="180" height="115" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
        <text x="310" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">චාලක ශක්තිය (Eₖ)</text>
        <text x="310" y="82" text-anchor="middle" font-size="16" font-weight="800">Eₖ = ½ m v²</text>
        <text x="310" y="108" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">චලනය නිසා ඇති ශක්තිය (J)</text>
        <!-- Box 3: Potential Energy -->
        <rect x="420" y="25" width="180" height="115" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
        <text x="510" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#b45309">විභව ශක්තිය (Eₚ)</text>
        <text x="510" y="82" text-anchor="middle" font-size="16" font-weight="800">Eₚ = m g h</text>
        <text x="510" y="108" text-anchor="middle" font-size="12" font-weight="700" fill="#475569">පිහිටීම/හැඩය නිසා ශක්තිය (J)</text>
        <!-- Bottom: Power & Energy Conservation -->
        <rect x="20" y="160" width="580" height="100" rx="10" fill="#f8fafc" stroke="#94a3b8"/>
        <text x="310" y="190" text-anchor="middle" font-size="15" font-weight="800" fill="#7c3aed">ජවය හෙවත් ක්ෂමතාව (Power):   P = කෙරුණු කාර්යය (W) / ගත වූ කාලය (t)</text>
        <text x="310" y="218" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">ජවයේ ඒකකය: වොට් (W) හෙවත් තත්පරයට ජූල් (J s⁻¹)  |  1 W = 1 J s⁻¹</text>
        <text x="310" y="244" text-anchor="middle" font-size="12" font-weight="700" fill="#0d9488">ඔන්චිල්ලාවක හෝ ඉහළ සිට වැටෙන වස්තුවක: විභව ශක්තිය (mgh) ⇄ චාලක ශක්තිය (½mv²)</text>
      </g>
    `),

    // Lesson 19
    L19_CIRCUITS_OHM: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">ඕම් නියමය (V = IR), ශ්‍රේණිගත සහ සමාන්තරගත ප්‍රතිරෝධක පද්ධති</text>
      <!-- Ohm's Law Circuit -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="300" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="150" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#0d9488">ඕම් නියම පරිපථය (19.16 රූපය)</text>
        <rect x="55" y="85" width="190" height="115" fill="none" stroke="#0f172a" stroke-width="2.5"/>
        <!-- Resistor R -->
        <rect x="110" y="75" width="80" height="20" fill="#fde047" stroke="#b45309" stroke-width="2"/>
        <text x="150" y="90" text-anchor="middle" font-size="12" font-weight="800">R (නික්‍රෝම්)</text>
        <!-- Voltmeter in parallel -->
        <polyline points="95,85 95,45 205,45 205,85" fill="none" stroke="#dc2626" stroke-width="2"/>
        <circle cx="150" cy="45" r="14" fill="#fff" stroke="#dc2626" stroke-width="2"/>
        <text x="150" y="50" text-anchor="middle" font-size="13" font-weight="800" fill="#dc2626">V</text>
        <!-- Ammeter in series -->
        <circle cx="150" cy="200" r="15" fill="#fff" stroke="#0284c7" stroke-width="2.5"/>
        <text x="150" y="205" text-anchor="middle" font-size="13" font-weight="800" fill="#0284c7">A</text>
        <text x="150" y="242" text-anchor="middle" font-size="16" font-weight="800" fill="#0f172a">V = I R</text>
        <text x="150" y="266" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">ඇමීටරය ශ්‍රේණිගතව ද, වෝල්ට්මීටරය</text>
        <text x="150" y="282" text-anchor="middle" font-size="11" font-weight="700" fill="#475569">සමාන්තරගතව ද සම්බන්ධ කෙරේ.</text>
      </g>
      <!-- Series vs Parallel -->
      <g transform="translate(340, 52)">
        <rect x="0" y="0" width="310" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="155" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#2563eb">සමක ප්‍රතිරෝධය (R)</text>
        <!-- Series -->
        <rect x="20" y="42" width="270" height="105" rx="8" fill="#eff6ff" stroke="#93c5fd"/>
        <text x="155" y="65" text-anchor="middle" font-size="13" font-weight="800" fill="#1e40af">1. ශ්‍රේණිගත සැකසුම (Series)</text>
        <text x="155" y="95" text-anchor="middle" font-size="14" font-weight="800">──[ R₁ ]──[ R₂ ]──[ R₃ ]──</text>
        <text x="155" y="128" text-anchor="middle" font-size="15" font-weight="800" fill="#dc2626">R = R₁ + R₂ + R₃</text>
        <!-- Parallel -->
        <rect x="20" y="162" width="270" height="120" rx="8" fill="#f0fdf4" stroke="#86efac"/>
        <text x="155" y="185" text-anchor="middle" font-size="13" font-weight="800" fill="#15803d">2. සමාන්තරගත සැකසුම (Parallel)</text>
        <text x="155" y="215" text-anchor="middle" font-size="12" font-weight="700">එකම විභව අන්තරය (V), ධාරාව බෙදී යයි</text>
        <text x="155" y="255" text-anchor="middle" font-size="16" font-weight="800" fill="#15803d">1/R = 1/R₁ + 1/R₂ + 1/R₃</text>
      </g>
    `),

    // Lesson 20
    L20_MENDEL_SEX: toSvgUrl(`
      <text x="340" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="#0f172a">මෙන්ඩල්ගේ ඒකාංග මුහුම (පනට් කොටුව) සහ මිනිසාගේ ලිංග නිර්ණය</text>
      <!-- Punnett Square -->
      <g transform="translate(25, 52)">
        <rect x="0" y="0" width="300" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="150" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#15803d">මෙන්ඩල්ගේ ඒකාංග මුහුම (Tt × Tt)</text>
        <!-- Grid -->
        <rect x="65" y="55" width="180" height="135" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
        <line x1="125" y1="55" x2="125" y2="190" stroke="#334155" stroke-width="2"/>
        <line x1="185" y1="55" x2="185" y2="190" stroke="#334155" stroke-width="2"/>
        <line x1="65" y1="100" x2="245" y2="100" stroke="#334155" stroke-width="2"/>
        <line x1="65" y1="145" x2="245" y2="145" stroke="#334155" stroke-width="2"/>
        <text x="95" y="83" text-anchor="middle" font-size="13" font-weight="800">ජන්මාණු</text>
        <text x="155" y="83" text-anchor="middle" font-size="15" font-weight="800" fill="#0284c7">T</text>
        <text x="215" y="83" text-anchor="middle" font-size="15" font-weight="800" fill="#dc2626">t</text>
        <text x="95" y="128" text-anchor="middle" font-size="15" font-weight="800" fill="#0284c7">T</text>
        <text x="155" y="128" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">TT (උස)</text>
        <text x="215" y="128" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">Tt (උස)</text>
        <text x="95" y="173" text-anchor="middle" font-size="15" font-weight="800" fill="#dc2626">t</text>
        <text x="155" y="173" text-anchor="middle" font-size="15" font-weight="800" fill="#15803d">Tt (උස)</text>
        <text x="215" y="173" text-anchor="middle" font-size="15" font-weight="800" fill="#b45309">tt (මිටි)</text>
        <text x="150" y="225" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">රූපානුදර්ශ අනුපාතය (උස : මිටි) = 3 : 1</text>
        <text x="150" y="250" text-anchor="middle" font-size="12" font-weight="800" fill="#0d9488">ප්‍රවේණිදර්ශ අනුපාතය (TT : Tt : tt) = 1 : 2 : 1</text>
      </g>
      <!-- Sex Determination -->
      <g transform="translate(340, 52)">
        <rect x="0" y="0" width="310" height="300" rx="12" fill="#fff" stroke="#cbd5e1"/>
        <text x="155" y="25" text-anchor="middle" font-size="14" font-weight="800" fill="#7c3aed">මිනිසාගේ ලිංග නිර්ණය (20.23 රූපය)</text>
        <circle cx="85" cy="72" r="24" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
        <text x="85" y="77" text-anchor="middle" font-size="13" font-weight="800">මව (XX)</text>
        <circle cx="225" cy="72" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
        <text x="225" y="77" text-anchor="middle" font-size="13" font-weight="800">පියා (XY)</text>
        <text x="85" y="128" text-anchor="middle" font-size="12" font-weight="700">ඩිම්බ:  (X)   (X)</text>
        <text x="225" y="128" text-anchor="middle" font-size="12" font-weight="700">ශුක්‍රාණු:  (X)   (Y)</text>
        <rect x="30" y="155" width="115" height="55" rx="8" fill="#fce7f3" stroke="#db2777"/>
        <text x="87" y="178" text-anchor="middle" font-size="14" font-weight="800" fill="#be185d">XX (ගැහැනු)</text>
        <text x="87" y="198" text-anchor="middle" font-size="12" font-weight="800">50%</text>
        <rect x="165" y="155" width="115" height="55" rx="8" fill="#dbeafe" stroke="#2563eb"/>
        <text x="222" y="178" text-anchor="middle" font-size="14" font-weight="800" fill="#1d4ed8">XY (පිරිමි)</text>
        <text x="222" y="198" text-anchor="middle" font-size="12" font-weight="800">50%</text>
        <text x="155" y="242" text-anchor="middle" font-size="11" font-weight="700" fill="#0f172a">දේහ සෛලයක වර්ණදේහ 46 = යුගල 23</text>
        <text x="155" y="262" text-anchor="middle" font-size="11" font-weight="700" fill="#6b21a8">(අලිංග වර්ණදේහ යුගල 22 + ලිංග වර්ණදේහ යුගල 1)</text>
      </g>
    `)
  };
})();
