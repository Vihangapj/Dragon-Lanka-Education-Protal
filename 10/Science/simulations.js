// Grade 10 Science - Realistic Animated Virtual Lab & 3D/2D Interactive Simulations (All 20 Lessons)
(function () {
  // Helper: 3D point projection with rotation around X and Y axes
  function project3D(x, y, z, rx, ry, cx, cy, fov = 320) {
    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;
    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;
    const scale = fov / (fov + z2 + 260);
    return { x: cx + x1 * scale, y: cy + y2 * scale, z: z2, scale: scale };
  }

  function drawSphere3D(ctx, px, py, radius, color, label) {
    const r = Math.max(2, radius);
    const grad = ctx.createRadialGradient(
      px - r * 0.35,
      py - r * 0.35,
      r * 0.1,
      px,
      py,
      r
    );
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.35, color);
    grad.addColorStop(1, "#090d16");
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    if (label && r > 7) {
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.max(9, Math.round(r * 0.72))}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, px, py);
    }
  }

  function drawCylinder3D(ctx, p1, p2, width, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.5, width);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  window.SIMULATIONS = {
    // =========================================================================
    // LESSON 01: අතත්‍ය ආහාර පරීක්ෂණාගාරය, එන්සයිම ක්‍රියාකාරකම සහ 3D DNA ආකෘතිය
    // =========================================================================
    sim_l1_food_tests: {
      lessonId: 1,
      title: "ක්‍රියාකාරකම් 1.1–1.4 අතත්‍ය විද්‍යාගාරය: ආහාර පරීක්ෂා, එන්සයිම හා 3D DNA ආකෘතිය",
      badge: "පාඩම 01 • Virtual Lab + 3D DNA",
      desc: "පිෂ්ටය, ග්ලූකෝස්, සුක්‍රෝස්, ප්‍රෝටීන් හා ලිපිඩ සාම්පල තෝරා ප්‍රතිකාරක දමා රත් කරමින් වර්ණ විපර්යාස සජීවීව අත්හදා බලන්න. ඇමයිලේස් එන්සයිම ක්‍රියාකාරකම සහ 3D DNA ආකෘතිය ද මෙහිදී ක්‍රියාත්මක කළ හැක.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-tab="tube-lab" data-preset-btn="starch">🧪 ක්‍රියාකාරකම 1.1: පිෂ්ටය පරීක්ෂාව</button>
              <button class="vlab-tab-btn" data-tab="tube-lab" data-preset-btn="glucose">🍯 ක්‍රියාකාරකම 1.1: ග්ලූකෝස් (බෙනඩික්ට්)</button>
              <button class="vlab-tab-btn" data-tab="tube-lab" data-preset-btn="sucrose">🍬 ක්‍රියාකාරකම 1.1: සුක්‍රෝස් පරීක්ෂාව</button>
              <button class="vlab-tab-btn" data-tab="tube-lab" data-preset-btn="protein">🥚 ක්‍රියාකාරකම 1.2: ප්‍රෝටීන් (බයියුරෙට්)</button>
              <button class="vlab-tab-btn" data-tab=" tube-lab" data-preset-btn="lipid">🥥 ක්‍රියාකාරකම 1.4: ලිපිඩ (සුඩාන් III)</button>
              <button class="vlab-tab-btn" data-tab="amylase-lab">⏱️ ක්‍රියාකාරකම 1.3: ඇමයිලේස් එන්සයිමය</button>
              <button class="vlab-tab-btn" data-tab="dna-3d">🧬 3D DNA ද්විත්ව හෙලික්සය</button>
            </div>

            <!-- TAB 1: REALISTIC TEST TUBE VIRTUAL LAB -->
            <div data-pane="tube-lab" class="vlab-grid">
              <div class="vlab-panel">
                <div>
                  <div class="vlab-step-title">
                    <span class="vlab-step-num">1</span> ආහාර සාම්පලය තෝරන්න (Select Sample)
                  </div>
                  <div class="vlab-btn-grid">
                    <button class="vlab-choice-btn" data-sample="starch">🍞 පිෂ්ටය (පාන් පිටි)</button>
                    <button class="vlab-choice-btn" data-sample="glucose">🍯 ග්ලූකෝස් ද්‍රාවණය</button>
                    <button class="vlab-choice-btn" data-sample="sucrose">🍬 සුක්‍රෝස් (උක් සීනි)</button>
                    <button class="vlab-choice-btn" data-sample="protein">🥚 ප්‍රෝටීන් (බිත්තර සුදුමද)</button>
                    <button class="vlab-choice-btn" data-sample="lipid">🥥 ලිපිඩ (පොල් තෙල්)</button>
                  </div>

                  <div class="vlab-step-title">
                    <span class="vlab-step-num">2</span> ප්‍රතිකාරකය එක් කරන්න (Add Reagent)
                  </div>
                  <div class="vlab-btn-grid">
                    <button class="vlab-choice-btn" data-reagent="iodine" disabled>💧 අයඩින් ද්‍රාවණය</button>
                    <button class="vlab-choice-btn" data-reagent="benedict" disabled>🧪 බෙනඩික්ට් ද්‍රාවණය</button>
                    <button class="vlab-choice-btn" data-reagent="hcl_benedict" disabled>🍋 තනුක HCl + NaHCO₃ + බෙනඩික්ට්</button>
                    <button class="vlab-choice-btn" data-reagent="biuret" disabled>⚗️ බයියුරේට් (NaOH+CuSO₄)</button>
                    <button class="vlab-choice-btn" data-reagent="sudan" disabled>🩸 සුඩාන් III ප්‍රතිකාරකය</button>
                  </div>
                </div>

                <div>
                  <div class="vlab-action-row">
                    <button class="vlab-heat-btn" data-role="heat-btn" disabled>🔥 රත් කරන්න (Heat)</button>
                    <button class="vlab-reset-btn" data-role="reset-btn" title="නැවත මුල සිට">🔄 Reset</button>
                  </div>
                  <div class="vlab-status-banner" data-role="instruction">
                    👆 පළමුව ආහාර සාම්පලයක් තෝරා පරීක්ෂණ නළයට එක් කරන්න...
                  </div>
                </div>
              </div>

              <div class="vlab-bench">
                <div class="vlab-apparatus-wrap" data-role="tube-wrap">
                  <div class="vlab-dropper" data-role="dropper"></div>
                  <div class="vlab-drop" data-role="drop"></div>
                  <div class="glass-tube">
                    <div class="liquid-level" data-role="liquid">
                      <div class="oil-layer" data-role="oil-layer"></div>
                      <div class="bubbles-container" data-role="bubbles">
                        <div class="bubble" style="left:16%;width:7px;height:7px;animation-duration:1.1s;"></div>
                        <div class="bubble" style="left:38%;width:10px;height:10px;animation-duration:1.5s;animation-delay:0.15s;"></div>
                        <div class="bubble" style="left:64%;width:6px;height:6px;animation-duration:1.25s;animation-delay:0.35s;"></div>
                        <div class="bubble" style="left:82%;width:9px;height:9px;animation-duration:1.65s;animation-delay:0.2s;"></div>
                      </div>
                    </div>
                  </div>
                  <div class="burner">
                    <div class="burner-flame" data-role="flame"></div>
                  </div>
                </div>

                <div class="vlab-result-card" data-role="result-card" style="opacity:0;transform:translateY(15px);">
                  ප්‍රතිඵලය මෙහි දිස්වේ...
                </div>
              </div>
            </div>

            <!-- TAB 2: AMYLASE ENZYME ACTIVITY -->
            <div data-pane="amylase-lab" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ප්‍රතික්‍රියා කාලය: <span data-role="amy-time-val">0</span> min</label>
                  <input type="range" min="0" max="20" step="2" value="0" data-role="amy-slider" />
                </div>
                <button class="sim-btn" data-role="amy-play">▶ එන්සයිම ප්‍රතික්‍රියාව සජීවීව ක්‍රියාත්මක කරන්න</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="560" height="235" data-role="amy-canvas"></canvas>
                <div class="sim-readout" data-role="amy-readout"></div>
              </div>
            </div>

            <!-- TAB 3: 3D DNA HELIX -->
            <div data-pane="dna-3d" style="display:none;">
              <div class="sim-stage">
                <canvas class="sim-canvas" width="560" height="260" data-role="dna-canvas"></canvas>
                <div class="sim-readout">
                  <strong>🧬 3D DNA ද්විත්ව හෙලික්සීය ආකෘතිය (මවුසයෙන් හෝ ඇඟිල්ලෙන් ඇද කරකවන්න):</strong> DNA අණුවක තැනුම් ඒකකය <strong>ඩිඔක්සිරයිබෝ නියුක්ලියෝටයිඩය</strong> වේ (ඩිඔක්සිරයිබෝස් සීනි + පොස්ෆේට් කාණ්ඩය + නයිට්‍රජනීය භෂ්මය: <strong>A = T</strong> සහ <strong>G ≡ C</strong>).
                </div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabBtns = root.querySelectorAll(".vlab-tab-btn");
        const panes = {
          "tube-lab": root.querySelector('[data-pane="tube-lab"]'),
          "amylase-lab": root.querySelector('[data-pane="amylase-lab"]'),
          "dna-3d": root.querySelector('[data-pane="dna-3d"]')
        };
        function switchSubTab(tabName, activeBtn) {
          const cleanTab = (tabName || "").trim();
          tabBtns.forEach((b) => {
            if (activeBtn) b.classList.toggle("active", b === activeBtn);
            else b.classList.toggle("active", b.getAttribute("data-tab").trim() === cleanTab);
          });
          Object.keys(panes).forEach((k) => {
            panes[k].style.display = k === cleanTab ? (k === "tube-lab" ? "grid" : "block") : "none";
          });
        }

        // --- TAB 1: REALISTIC TUBE LAB ---
        const sampleBtns = root.querySelectorAll("[data-sample]");
        const reagentBtns = root.querySelectorAll("[data-reagent]");
        const heatBtn = root.querySelector('[data-role="heat-btn"]');
        const resetBtn = root.querySelector('[data-role="reset-btn"]');
        const instructionEl = root.querySelector('[data-role="instruction"]');
        const liquidEl = root.querySelector('[data-role="liquid"]');
        const oilLayerEl = root.querySelector('[data-role="oil-layer"]');
        const bubblesEl = root.querySelector('[data-role="bubbles"]');
        const flameEl = root.querySelector('[data-role="flame"]');
        const dropperEl = root.querySelector('[data-role="dropper"]');
        const dropEl = root.querySelector('[data-role="drop"]');
        const tubeWrap = root.querySelector('[data-role="tube-wrap"]');
        const resultCard = root.querySelector('[data-role="result-card"]');

        let state = { sample: null, reagent: null, heated: false };

        function selectSample(type) {
          state = { sample: type, reagent: null, heated: false };
          sampleBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-sample") === type));
          reagentBtns.forEach((b) => {
            b.disabled = false;
            b.classList.remove("active");
          });
          heatBtn.disabled = true;
          oilLayerEl.style.height = "0%";
          oilLayerEl.style.backgroundColor = "transparent";

          liquidEl.classList.add("filled");
          liquidEl.style.height = "38%";
          const sampleColors = {
            starch: "rgba(241, 245, 249, 0.92)",
            glucose: "rgba(224, 242, 254, 0.72)",
            sucrose: "rgba(254, 243, 199, 0.78)",
            protein: "rgba(254, 249, 195, 0.85)",
            lipid: "rgba(253, 224, 71, 0.9)"
          };
          liquidEl.style.backgroundColor = sampleColors[type] || "rgba(224, 242, 254, 0.72)";
          resultCard.style.opacity = "0";
          resultCard.style.transform = "translateY(15px)";
          instructionEl.innerHTML = "🧪 දැන් 2 වන පියවරෙන් සුදුසු ප්‍රතිකාරකය (Reagent) තෝරන්න...";
        }

        function triggerDropper(dropColor, callback) {
          dropperEl.classList.add("dropping");
          dropEl.style.backgroundColor = dropColor;
          dropEl.classList.remove("animate-drop");
          void dropEl.offsetWidth;
          dropEl.classList.add("animate-drop");
          setTimeout(() => {
            dropperEl.classList.remove("dropping");
            if (callback) callback();
          }, 680);
        }

        function showResult() {
          const { sample, reagent, heated } = state;
          let color = liquidEl.style.backgroundColor;
          let text = "";
          let ok = false;

          if (sample === "starch" && reagent === "iodine") {
            color = "rgba(30, 27, 75, 0.98)";
            text = "✅ <strong>තද නිල් / දම් පැහැයක්</strong> ලැබේ!<br><span style='font-size:0.82rem;color:#059669;'>නිගමනය: ආහාරයේ <strong>පිෂ්ටය</strong> අඩංගු වේ.</span>";
            ok = true;
          } else if (sample === "glucose" && (reagent === "benedict" || reagent === "hcl_benedict")) {
            if (heated) {
              color = "rgba(194, 65, 12, 0.96)";
              text = "✅ <strong>ගඩොල් රතු අවක්ෂේපයක්</strong> ලැබේ!<br><span style='font-size:0.82rem;color:#059669;'>(නිල් → කොළ → කහ → තැඹිලි → ගඩොල් රතු)<br>නිගමනය: <strong>ග්ලූකෝස්</strong> (ඔක්සිහාරක සීනි) අඩංගු වේ.</span>";
              ok = true;
            } else {
              color = "rgba(37, 99, 235, 0.9)";
              text = "🔥 නිල් පැහැය පවතී. ප්‍රතික්‍රියාව සිදුවීමට <strong>'🔥 රත් කරන්න (Heat)'</strong> බොත්තම ඔබන්න!";
            }
          } else if (sample === "sucrose" && reagent === "benedict") {
            color = "rgba(37, 99, 235, 0.9)";
            text = "ℹ️ සුක්‍රෝස් නිර්-ඔක්සිහාරක සීනි වර්ගයක් බැවින් කෙළින්ම බෙනඩික්ට් සමඟ ප්‍රතික්‍රියා නොකරයි. <strong>'🍋 තනුක HCl + NaHCO₃ + බෙනඩික්ට්'</strong> තෝරා රත් කරන්න!";
          } else if (sample === "sucrose" && reagent === "hcl_benedict") {
            if (heated) {
              color = "rgba(194, 65, 12, 0.96)";
              text = "✅ <strong>ගඩොල් රතු අවක්ෂේපයක්</strong> ලැබේ!<br><span style='font-size:0.82rem;color:#059669;'>තනුක HCl සමඟ රත් කළ විට සුක්‍රෝස් ජලවිච්ඡේදනය වී ග්ලූකෝස් හා ෆ්‍රක්ටෝස් සෑදෙන නිසා බෙනඩික්ට් සමඟ ගඩොල් රතු අවක්ෂේපය ලබා දෙයි.</span>";
              ok = true;
            } else {
              color = "rgba(37, 99, 235, 0.9)";
              text = "🔥 තනුක HCl මගින් සුක්‍රෝස් ජලවිච්ඡේදනය කර බෙනඩික්ට් ප්‍රතික්‍රියාව සිදු කිරීමට <strong>'🔥 රත් කරන්න (Heat)'</strong> බොත්තම ඔබන්න!";
            }
          } else if (sample === "protein" && reagent === "biuret") {
            color = "rgba(126, 34, 206, 0.95)";
            text = "✅ <strong>තද දම් පැහැයක්</strong> ලැබේ!<br><span style='font-size:0.82rem;color:#059669;'>නිගමනය: ආහාරයේ <strong>ප්‍රෝටීන්</strong> අඩංගු වේ.</span>";
            ok = true;
          } else if (sample === "lipid" && reagent === "sudan") {
            color = "rgba(253, 224, 71, 0.85)";
            oilLayerEl.style.height = "34%";
            oilLayerEl.style.backgroundColor = "rgba(220, 38, 38, 0.94)";
            text = "✅ <strong>රතු පැහැති තෙල් ස්තරයක් / ගෝලිකා</strong> මතුපිට වෙන් වේ!<br><span style='font-size:0.82rem;color:#059669;'>නිගමනය: ආහාරයේ <strong>ලිපිඩ</strong> අඩංගු වේ.</span>";
            ok = true;
          } else {
            text = "❌ ධනාත්මක වර්ණ විපර්යාසයක් නොමැත.<br><span style='font-size:0.8rem;color:var(--text-secondary);'>මෙම සාම්පලය සඳහා ගැළපෙන ප්‍රතිකාරකය තෝරා බලන්න.</span>";
          }

          liquidEl.style.backgroundColor = color;
          resultCard.className = `vlab-result-card ${ok ? "success" : ""}`;
          resultCard.innerHTML = text;
          resultCard.style.opacity = "1";
          resultCard.style.transform = "translateY(0)";
          instructionEl.innerHTML = ok ? "🎉 පරීක්ෂාව සාර්ථකයි! වෙනත් සාම්පලයක් තෝරා අත්හදා බලන්න." : "💡 වෙනත් ප්‍රතිකාරකයක් හෝ රත් කිරීම අත්හදා බලන්න.";
        }

        function selectReagent(type) {
          if (!state.sample) return;
          state.reagent = type;
          state.heated = false;
          reagentBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-reagent") === type));
          oilLayerEl.style.height = "0%";

          const dropColors = {
            iodine: "#b45309",
            benedict: "#2563eb",
            hcl_benedict: "#0284c7",
            biuret: "#38bdf8",
            sudan: "#dc2626"
          };
          instructionEl.innerHTML = "💧 ප්‍රතිකාරක බිංදු එක් කරමින් පවතී...";
          triggerDropper(dropColors[type] || "#2563eb", () => {
            liquidEl.style.height = "68%";
            if ((type === "benedict" && state.sample === "glucose") || (type === "hcl_benedict" && (state.sample === "sucrose" || state.sample === "glucose"))) {
              liquidEl.style.backgroundColor = "rgba(37, 99, 235, 0.9)";
              heatBtn.disabled = false;
              showResult();
            } else {
              heatBtn.disabled = true;
              showResult();
            }
          });
        }

        tabBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            const tab = btn.getAttribute("data-tab").trim();
            const preset = btn.getAttribute("data-preset-btn");
            switchSubTab(tab, btn);
            if (preset) {
              selectSample(preset);
              const mapR = { starch: "iodine", glucose: "benedict", sucrose: "hcl_benedict", protein: "biuret", lipid: "sudan" };
              setTimeout(() => selectReagent(mapR[preset]), 300);
            }
          });
        });

        heatBtn.addEventListener("click", () => {
          if (!state.sample || !state.reagent) return;
          heatBtn.disabled = true;
          flameEl.style.display = "block";
          bubblesEl.style.display = "block";
          tubeWrap.classList.add("vlab-shake");
          instructionEl.innerHTML = "🔥 බන්සන් දාහකයෙන් රත් වෙමින් පවතී (නිල් → කොළ → කහ → තැඹිලි → ගඩොල් රතු)...";

          // Intermediate color transitions during heating
          setTimeout(() => { liquidEl.style.backgroundColor = "rgba(22, 163, 74, 0.9)"; }, 700);
          setTimeout(() => { liquidEl.style.backgroundColor = "rgba(234, 179, 8, 0.92)"; }, 1450);
          setTimeout(() => {
            flameEl.style.display = "none";
            bubblesEl.style.display = "none";
            tubeWrap.classList.remove("vlab-shake");
            state.heated = true;
            showResult();
          }, 2400);
        });

        resetBtn.addEventListener("click", () => {
          state = { sample: null, reagent: null, heated: false };
          sampleBtns.forEach((b) => b.classList.remove("active"));
          reagentBtns.forEach((b) => { b.disabled = true; b.classList.remove("active"); });
          heatBtn.disabled = true;
          liquidEl.style.height = "5%";
          liquidEl.style.backgroundColor = "transparent";
          liquidEl.classList.remove("filled");
          oilLayerEl.style.height = "0%";
          flameEl.style.display = "none";
          bubblesEl.style.display = "none";
          tubeWrap.classList.remove("vlab-shake");
          resultCard.style.opacity = "0";
          resultCard.style.transform = "translateY(15px)";
          instructionEl.innerHTML = "👆 පළමුව ආහාර සාම්පලයක් තෝරා පරීක්ෂණ නළයට එක් කරන්න...";
        });

        sampleBtns.forEach((b) => b.addEventListener("click", () => selectSample(b.getAttribute("data-sample"))));
        reagentBtns.forEach((b) => b.addEventListener("click", () => selectReagent(b.getAttribute("data-reagent"))));

        // --- TAB 2: AMYLASE ENZYME ANIMATED TILE & GRAPH ---
        const amySlider = root.querySelector('[data-role="amy-slider"]');
        const amyTimeVal = root.querySelector('[data-role="amy-time-val"]');
        const amyPlayBtn = root.querySelector('[data-role="amy-play"]');
        const amyCanvas = root.querySelector('[data-role="amy-canvas"]');
        const amyCtx = amyCanvas.getContext("2d");
        const amyReadout = root.querySelector('[data-role="amy-readout"]');
        let amyTimer = null;

        function drawAmylase() {
          const t = Number(amySlider.value);
          amyTimeVal.textContent = t;
          amyCtx.clearRect(0, 0, amyCanvas.width, amyCanvas.height);

          // Porcelain white tile
          amyCtx.fillStyle = "#f8fafc";
          amyCtx.fillRect(16, 18, 290, 198);
          amyCtx.strokeStyle = "#94a3b8";
          amyCtx.lineWidth = 2;
          amyCtx.strokeRect(16, 18, 290, 198);
          amyCtx.fillStyle = "#0f172a";
          amyCtx.font = "bold 12px sans-serif";
          amyCtx.textAlign = "left";
          amyCtx.fillText("සුදු පිඟන් ගඩොල (මිනිත්තු 0 – 20 අයඩින් බිංදු)", 26, 38);

          const spotColors = [
            "#1e1b4b", "#1e3a8a", "#312e81", "#4c1d95", "#581c87",
            "#78350f", "#92400e", "#b45309", "#d97706", "#eab308", "#facc15"
          ];
          for (let i = 0; i <= 10; i++) {
            const min = i * 2;
            const col = i % 4;
            const row = Math.floor(i / 4);
            const sx = 52 + col * 66;
            const sy = 70 + row * 49;
            amyCtx.beginPath();
            amyCtx.arc(sx, sy, 15, 0, Math.PI * 2);
            amyCtx.fillStyle = min <= t ? spotColors[i] : "#e2e8f0";
            amyCtx.fill();
            amyCtx.lineWidth = min === t ? 3 : 1;
            amyCtx.strokeStyle = min === t ? "#0d9488" : "#64748b";
            amyCtx.stroke();
            amyCtx.fillStyle = "#334155";
            amyCtx.font = "bold 10px sans-serif";
            amyCtx.textAlign = "center";
            amyCtx.fillText(`${min}m`, sx, sy + 26);
          }

          // Graph on right
          const gx = 335, gy = 190, gw = 195, gh = 140;
          amyCtx.strokeStyle = "#94a3b8";
          amyCtx.lineWidth = 1.5;
          amyCtx.beginPath();
          amyCtx.moveTo(gx, gy - gh);
          amyCtx.lineTo(gx, gy);
          amyCtx.lineTo(gx + gw, gy);
          amyCtx.stroke();

          // Starch falling curve up to current time t
          amyCtx.strokeStyle = "#38bdf8";
          amyCtx.lineWidth = 3;
          amyCtx.beginPath();
          for (let m = 0; m <= t; m += 0.5) {
            const x = gx + (m / 20) * gw;
            const y = gy - Math.exp(-m / 6.5) * gh;
            if (m === 0) amyCtx.moveTo(x, y);
            else amyCtx.lineTo(x, y);
          }
          amyCtx.stroke();

          // Maltose rising curve up to current time t
          amyCtx.strokeStyle = "#f59e0b";
          amyCtx.beginPath();
          for (let m = 0; m <= t; m += 0.5) {
            const x = gx + (m / 20) * gw;
            const y = gy - (1 - Math.exp(-m / 6.5)) * gh;
            if (m === 0) amyCtx.moveTo(x, y);
            else amyCtx.lineTo(x, y);
          }
          amyCtx.stroke();

          amyCtx.fillStyle = "#38bdf8";
          amyCtx.font = "bold 11px sans-serif";
          amyCtx.textAlign = "left";
          amyCtx.fillText("— පිෂ්ටය අඩුවීම", gx + 8, 34);
          amyCtx.fillStyle = "#f59e0b";
          amyCtx.fillText("— මෝල්ටෝස් සෑදීම", gx + 102, 34);
          amyCtx.fillStyle = "#cbd5e1";
          amyCtx.fillText("කාලය (මිනිත්තු 0 → 20)", gx + 40, 212);

          amyReadout.innerHTML =
            t < 18
              ? `<strong>මිනිත්තු ${t}:</strong> ඇමයිලේස් එන්සයිමය මගින් පිෂ්ටය ක්‍රමයෙන් මෝල්ටෝස් බවට ජීර්ණය කරයි. අයඩින් බිංදුවේ වර්ණය <strong>තද නිල් පැහැයේ සිට දුඹුරු පැහැයට</strong> වෙනස් වේ.`
              : `<strong>මිනිත්තු ${t} (ප්‍රතික්‍රියාව සම්පූර්ණයි):</strong> සියලුම පිෂ්ටය මෝල්ටෝස් බවට පත්වී ඇති නිසා අයඩින් ද්‍රාවණයේ <strong>කහ/දුඹුරු වර්ණය වෙනස් නොවේ</strong>.`;
        }

        amySlider.addEventListener("input", drawAmylase);
        amyPlayBtn.addEventListener("click", () => {
          if (amyTimer) clearInterval(amyTimer);
          amySlider.value = 0;
          drawAmylase();
          amyTimer = setInterval(() => {
            const cur = Number(amySlider.value);
            if (cur >= 20) {
              clearInterval(amyTimer);
              return;
            }
            amySlider.value = cur + 2;
            drawAmylase();
          }, 550);
        });
        drawAmylase();

        // --- TAB 3: 3D INTERACTIVE DNA HELIX ---
        const dnaCanvas = root.querySelector('[data-role="dna-canvas"]');
        const dnaCtx = dnaCanvas.getContext("2d");
        let dnaRotY = 0, dnaRotX = 0.25;
        let draggingDNA = false, lx = 0, ly = 0;

        dnaCanvas.addEventListener("mousedown", (e) => { draggingDNA = true; lx = e.clientX; ly = e.clientY; });
        window.addEventListener("mouseup", () => { draggingDNA = false; });
        dnaCanvas.addEventListener("mousemove", (e) => {
          if (!draggingDNA) return;
          dnaRotY += (e.clientX - lx) * 0.012;
          dnaRotX = Math.max(-0.8, Math.min(0.8, dnaRotX + (e.clientY - ly) * 0.01));
          lx = e.clientX; ly = e.clientY;
        });

        dnaCanvas.addEventListener("touchstart", (e) => {
          if (e.touches && e.touches.length === 1) {
            draggingDNA = true;
            lx = e.touches[0].clientX;
            ly = e.touches[0].clientY;
          }
        }, { passive: true });
        window.addEventListener("touchend", () => { draggingDNA = false; });
        dnaCanvas.addEventListener("touchmove", (e) => {
          if (!draggingDNA || !e.touches || e.touches.length !== 1) return;
          const cx = e.touches[0].clientX;
          const cy = e.touches[0].clientY;
          dnaRotY += (cx - lx) * 0.012;
          dnaRotX = Math.max(-0.8, Math.min(0.8, dnaRotX + (cy - ly) * 0.01));
          lx = cx; ly = cy;
          if (e.cancelable) e.preventDefault();
        }, { passive: false });

        function animateDNA3D() {
          if (!document.body.contains(dnaCanvas)) return;
          if (!draggingDNA) dnaRotY += 0.022;
          dnaCtx.clearRect(0, 0, dnaCanvas.width, dnaCanvas.height);

          const cx = dnaCanvas.width / 2;
          const cy = dnaCanvas.height / 2;
          const pairs = 16;
          const items = [];
          const basePairs = [["A", "T", "#10b981", "#f59e0b"], ["T", "A", "#f59e0b", "#10b981"], ["C", "G", "#f43f5e", "#0ea5e9"], ["G", "C", "#0ea5e9", "#f43f5e"]];

          for (let i = 0; i < pairs; i++) {
            const y = (i - (pairs - 1) / 2) * 13.5;
            const angle = i * 0.48 + dnaRotY;
            const r = 68;
            const p1 = project3D(Math.cos(angle) * r, y, Math.sin(angle) * r, dnaRotX, 0, cx, cy);
            const p2 = project3D(Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r, dnaRotX, 0, cx, cy);
            const bp = basePairs[i % 4];
            items.push({ type: "rung", p1, p2, c1: bp[2], c2: bp[3], z: (p1.z + p2.z) / 2 });
            items.push({ type: "node", p: p1, color: "#3b82f6", label: bp[0], z: p1.z });
            items.push({ type: "node", p: p2, color: "#8b5cf6", label: bp[1], z: p2.z });
          }

          items.sort((a, b) => b.z - a.z).forEach((it) => {
            if (it.type === "rung") {
              const mid = { x: (it.p1.x + it.p2.x) / 2, y: (it.p1.y + it.p2.y) / 2 };
              drawCylinder3D(dnaCtx, it.p1, mid, 4.5, it.c1);
              drawCylinder3D(dnaCtx, mid, it.p2, 4.5, it.c2);
            } else {
              drawSphere3D(dnaCtx, it.p.x, it.p.y, 8.5 * it.p.scale, it.color, it.label);
            }
          });

          dnaCtx.fillStyle = "#94a3b8";
          dnaCtx.font = "bold 11px sans-serif";
          dnaCtx.textAlign = "left";
          dnaCtx.fillText("🖱️ 3D DNA ආකෘතිය මවුසයෙන් ඇද කරකවන්න | A=T, G≡C", 16, 246);
          requestAnimationFrame(animateDNA3D);
        }
        animateDNA3D();

        // Preset handler from Activity button
        root.addEventListener("sim-preset", (e) => {
          const p = e.detail;
          if (p === "enzyme") {
            switchSubTab("amylase-lab");
            amyPlayBtn.click();
          } else if (p === "dna") {
            switchSubTab("dna-3d");
          } else if (["starch", "protein", "lipid", "glucose", "sucrose"].includes(p)) {
            const btn = root.querySelector(`[data-preset-btn="${p}"]`);
            switchSubTab("tube-lab", btn);
            selectSample(p);
            const mapR = { starch: "iodine", protein: "biuret", lipid: "sudan", glucose: "benedict", sucrose: "hcl_benedict" };
            setTimeout(() => selectReagent(mapR[p]), 350);
          }
        });

        // Default initial state: show starch sample ready
        selectSample("starch");
      }
    },

    // =========================================================================
    // LESSON 02: සජීවී රථ චලිතය, දුර/විස්ථාපනය, ගුරුත්වජ චලිතය සහ s-t / v-t ප්‍රස්තාර
    // =========================================================================
    sim_l2_motion_graph: {
      lessonId: 2,
      title: "ක්‍රියාකාරකම් 2.1–2.4 අතත්‍ය විද්‍යාගාරය: දුර හා විස්ථාපනය, s-t / v-t ප්‍රස්තාර සහ ගුරුත්වජ චලිතය",
      badge: "පාඩම 02 • Virtual Physics Lab",
      desc: "පෙළපොතේ සියලුම චලිත ක්‍රියාකාරකම් (දුර හා විස්ථාපනය, s-t හා v-t ප්‍රස්තාර, ගුරුත්වය යටතේ සිරස් චලිතය) ටැබ් මගින් තෝරා සජීවීව අත්හදා බලන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-mode-tab="car">🚗 ක්‍රියාකාරකම් 2.2–2.3: v-t හා s-t චලිත ප්‍රස්තාර</button>
              <button class="vlab-tab-btn" data-mode-tab="dist">📐 ක්‍රියාකාරකම 2.1: දුර සහ විස්ථාපනය (A→B→C)</button>
              <button class="vlab-tab-btn" data-mode-tab="gravity">🍎 ක්‍රියාකාරකම 2.4: ගුරුත්වය යටතේ සිරස් චලිතය (g=10)</button>
            </div>
            <div class="sim-controls" data-role="car-controls">
              <div class="sim-control-group">
                <label>උපරිම ප්‍රවේගය (v): <span data-role="v-val">20</span> m s⁻¹</label>
                <input type="range" min="5" max="30" step="5" value="20" data-role="v-in" />
              </div>
              <div class="sim-control-group">
                <label>ත්වරණ කාලය (t₁): <span data-role="t1-val">4</span> s</label>
                <input type="range" min="2" max="8" step="1" value="4" data-role="t1-in" />
              </div>
              <div class="sim-control-group">
                <label>නියත ප්‍රවේග කාලය (t₂): <span data-role="t2-val">4</span> s</label>
                <input type="range" min="0" max="8" step="1" value="4" data-role="t2-in" />
              </div>
              <div class="sim-control-group">
                <label>මන්දන කාලය (t₃): <span data-role="t3-val">2</span> s</label>
                <input type="range" min="2" max="8" step="1" value="2" data-role="t3-in" />
              </div>
              <button class="sim-btn" data-role="play-btn">▶ නැවත අරඹන්න</button>
            </div>
            <div class="sim-stage">
              <canvas class="sim-canvas" width="560" height="245" data-role="canvas"></canvas>
              <div class="sim-metrics-grid" data-role="metrics"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const vIn = root.querySelector('[data-role="v-in"]');
        const t1In = root.querySelector('[data-role="t1-in"]');
        const t2In = root.querySelector('[data-role="t2-in"]');
        const t3In = root.querySelector('[data-role="t3-in"]');
        const playBtn = root.querySelector('[data-role="play-btn"]');
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const metricsEl = root.querySelector('[data-role="metrics"]');
        const tabBtns = root.querySelectorAll("[data-mode-tab]");

        let mode = "car";
        let prog = 0;
        let wheelRot = 0;

        function setMode(m) {
          mode = m;
          prog = 0;
          tabBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-mode-tab") === m));
        }

        tabBtns.forEach((b) => b.addEventListener("click", () => setMode(b.getAttribute("data-mode-tab"))));

        function loop() {
          if (!document.body.contains(canvas)) return;
          const vMax = Number(vIn.value);
          const t1 = Number(t1In.value);
          const t2 = Number(t2In.value);
          const t3 = Number(t3In.value);
          root.querySelector('[data-role="v-val"]').textContent = vMax;
          root.querySelector('[data-role="t1-val"]').textContent = t1;
          root.querySelector('[data-role="t2-val"]').textContent = t2;
          root.querySelector('[data-role="t3-val"]').textContent = t3;

          prog += 0.004;
          if (prog > 1) prog = 0;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (mode === "dist") {
            // Activity 2.1: Distance (400m + 300m = 700m) vs Displacement (500m Pythagoras)
            const ax = 75, ay = 195, bx = 295, by = 195, cx = 295, cy = 45;
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.lineTo(cx, cy);
            ctx.stroke();

            // Direct displacement vector A -> C
            ctx.strokeStyle = "#2dd4bf";
            ctx.setLineDash([7, 5]);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(cx, cy);
            ctx.stroke();
            ctx.setLineDash([]);

            drawSphere3D(ctx, ax, ay, 9, "#f43f5e", "A");
            drawSphere3D(ctx, bx, by, 9, "#f59e0b", "B");
            drawSphere3D(ctx, cx, cy, 9, "#10b981", "C");

            // Animated traveler along A -> B -> C
            let px = ax, py = ay, curDist = prog * 700;
            if (curDist <= 400) {
              px = ax + (curDist / 400) * (bx - ax);
              py = ay;
            } else {
              px = bx;
              py = by - ((curDist - 400) / 300) * (by - cy);
            }
            drawSphere3D(ctx, px, py, 8, "#fde047", "");

            ctx.fillStyle = "#38bdf8";
            ctx.font = "bold 12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("දුර AB = 400 m (නැගෙනහිරට)", (ax + bx) / 2, ay + 22);
            ctx.fillText("දුර BC = 300 m (උතුරට)", bx + 85, (by + cy) / 2);
            ctx.fillStyle = "#2dd4bf";
            ctx.fillText("විස්ථාපනය AC = √(400²+300²) = 500 m ↗", 160, 105);

            metricsEl.innerHTML = `
              <div class="sim-metric-box"><span class="sim-metric-label">මුළු දුර (අදිශ)</span><span class="sim-metric-val">700 m</span></div>
              <div class="sim-metric-box"><span class="sim-metric-label">විස්ථාපනය (දෛශික)</span><span class="sim-metric-val">500 m (උතුරු-නැගෙනහිර)</span></div>
              <div class="sim-metric-box"><span class="sim-metric-label">දැනට ගිය දුර</span><span class="sim-metric-val">${curDist.toFixed(0)} m</span></div>
              <div class="sim-metric-box"><span class="sim-metric-label">සාමාන්‍ය වේගය (t=100s)</span><span class="sim-metric-val">7.0 m s⁻¹</span></div>
            `;
            requestAnimationFrame(loop);
            return;
          }

          if (mode === "gravity") {
            // Activity 2.4: Vertical projection & Free fall under gravity g = 10 m s^-2
            const u = vMax; // initial upward velocity
            const tPeak = u / 10;
            const totalFlight = 2 * tPeak;
            const curT = prog * totalFlight;
            const hMax = (u * u) / 20;
            const curH = Math.max(0, u * curT - 0.5 * 10 * curT * curT);
            const curVel = u - 10 * curT;

            // Tower & ground
            ctx.fillStyle = "#334155";
            ctx.fillRect(45, 200, 160, 14);
            const ballY = 190 - (curH / 45) * 150;
            drawSphere3D(ctx, 125, ballY, 11, "#f43f5e", "");

            ctx.fillStyle = "#fde047";
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`h = ${curH.toFixed(1)} m | v = ${curVel.toFixed(1)} m/s`, 125, Math.max(18, ballY - 16));
            ctx.fillStyle = "#cbd5e1";
            ctx.fillText(`උපරිම උස H = ${hMax.toFixed(1)} m (g = 10 m s⁻²)`, 125, 230);

            // Right: v-t graph of vertical projection (goes from +u to 0 to -u)
            const gx = 265, gy = 120, gw = 250, gh = 80;
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(gx, gy - gh);
            ctx.lineTo(gx, gy + gh);
            ctx.moveTo(gx, gy);
            ctx.lineTo(gx + gw, gy);
            ctx.stroke();

            ctx.strokeStyle = "#2dd4bf";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(gx, gy - (u / 30) * gh);
            ctx.lineTo(gx + gw, gy + (u / 30) * gh);
            ctx.stroke();

            const dotX = gx + prog * gw;
            const dotY = gy - (curVel / 30) * gh;
            drawSphere3D(ctx, dotX, dotY, 6, "#fde047", "");
            ctx.fillStyle = "#f8fafc";
            ctx.fillText("සිරස්ව ඉහළට ප්‍රක්ෂේපිත වස්තුවක v-t ප්‍රස්තාරය", gx + gw / 2, 24);

            metricsEl.innerHTML = `
              <div class="sim-metric-box"><span class="sim-metric-label">ආරම්භක ප්‍රවේගය (u)</span><span class="sim-metric-val">${u} m s⁻¹ (↑)</span></div>
              <div class="sim-metric-box"><span class="sim-metric-label">උපරිම උසට කාලය</span><span class="sim-metric-val">${tPeak.toFixed(1)} s</span></div>
              <div class="sim-metric-box"><span class="sim-metric-label">උපරිම උස (h = u²/2g)</span><span class="sim-metric-val">${hMax.toFixed(1)} m</span></div>
              <div class="sim-metric-box"><span class="sim-metric-label">ගුරුත්වජ ත්වරණය (g)</span><span class="sim-metric-val">10 m s⁻² (↓)</span></div>
            `;
            requestAnimationFrame(loop);
            return;
          }

          const totalT = t1 + t2 + t3;
          const curT = prog * totalT;
          let curV = 0;
          let curS = 0;
          const s1 = 0.5 * vMax * t1;
          const s2 = vMax * t2;
          const s3 = 0.5 * vMax * t3;
          const totalS = s1 + s2 + s3;

          if (curT <= t1) {
            curV = (vMax / t1) * curT;
            curS = 0.5 * curV * curT;
          } else if (curT <= t1 + t2) {
            curV = vMax;
            curS = s1 + vMax * (curT - t1);
          } else {
            const dt = curT - (t1 + t2);
            curV = Math.max(0, vMax - (vMax / t3) * dt);
            curS = s1 + s2 + (vMax + curV) * 0.5 * dt;
          }

          wheelRot += curV * 0.03;

          // Sky & Highway track
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(18, 14, 524, 56);
          ctx.strokeStyle = "#facc15";
          ctx.lineWidth = 2;
          ctx.setLineDash([14, 10]);
          ctx.beginPath();
          ctx.moveTo(24, 46);
          ctx.lineTo(536, 46);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated Car
          const carX = 28 + (curS / (totalS || 1)) * 455;
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.roundRect(carX, 24, 46, 20, 6);
          ctx.fill();
          ctx.fillStyle = "#0284c7";
          ctx.beginPath();
          ctx.roundRect(carX + 8, 16, 26, 12, 4);
          ctx.fill();

          // Wheels
          [carX + 11, carX + 35].forEach((wx) => {
            ctx.fillStyle = "#0f172a";
            ctx.beginPath();
            ctx.arc(wx, 45, 6.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#f8fafc";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(wx, 45);
            ctx.lineTo(wx + Math.cos(wheelRot) * 5, 45 + Math.sin(wheelRot) * 5);
            ctx.stroke();
          });

          ctx.fillStyle = "#fde047";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`${curV.toFixed(1)} m/s`, carX + 23, 12);

          // Bottom Left: v-t Graph
          const gx = 52, gy = 212, gw = 215, gh = 115;
          const x1 = gx + (t1 / totalT) * gw;
          const x2 = gx + ((t1 + t2) / totalT) * gw;
          const x3 = gx + gw;
          const yTop = gy - (vMax / 30) * gh;

          ctx.fillStyle = "rgba(45, 212, 191, 0.2)";
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(x1, yTop);
          ctx.lineTo(x2, yTop);
          ctx.lineTo(x3, gy);
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = "#2dd4bf";
          ctx.lineWidth = 2.8;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(x1, yTop);
          ctx.lineTo(x2, yTop);
          ctx.lineTo(x3, gy);
          ctx.stroke();

          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(gx, gy - gh - 8);
          ctx.lineTo(gx, gy);
          ctx.lineTo(gx + gw + 10, gy);
          ctx.stroke();

          const curVx = gx + prog * gw;
          const curVy = gy - (curV / 30) * gh;
          drawSphere3D(ctx, curVx, curVy, 6, "#f43f5e", "");
          ctx.fillStyle = "#f8fafc";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText("ප්‍රවේග-කාල (v-t) ප්‍රස්තාරය", gx + gw / 2, 86);
          ctx.fillText(`වර්ගඵලය = ${totalS} m`, gx + gw / 2, gy + 18);

          // Bottom Right: s-t Graph
          const sx0 = 325, sy0 = 212, sw = 205, sh = 115;
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sx0, sy0 - sh - 8);
          ctx.lineTo(sx0, sy0);
          ctx.lineTo(sx0 + sw + 10, sy0);
          ctx.stroke();

          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 2.8;
          ctx.beginPath();
          for (let i = 0; i <= 50; i++) {
            const p = i / 50;
            const tt = p * totalT;
            let ss = 0;
            if (tt <= t1) ss = 0.5 * (vMax / t1) * tt * tt;
            else if (tt <= t1 + t2) ss = s1 + vMax * (tt - t1);
            else {
              const dt = tt - (t1 + t2);
              const vv = Math.max(0, vMax - (vMax / t3) * dt);
              ss = s1 + s2 + (vMax + vv) * 0.5 * dt;
            }
            const px = sx0 + p * sw;
            const py = sy0 - (ss / (totalS || 1)) * sh;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          const curSx = sx0 + prog * sw;
          const curSy = sy0 - (curS / (totalS || 1)) * sh;
          drawSphere3D(ctx, curSx, curSy, 6, "#38bdf8", "");
          ctx.fillStyle = "#f8fafc";
          ctx.fillText("විස්ථාපන-කාල (s-t) ප්‍රස්තාරය", sx0 + sw / 2, 86);
          ctx.fillText(`s = ${curS.toFixed(0)} / ${totalS} m`, sx0 + sw / 2, sy0 + 18);

          metricsEl.innerHTML = `
            <div class="sim-metric-box">
              <span class="sim-metric-label">මුල් ත්වරණය (a)</span>
              <span class="sim-metric-val">${(vMax / t1).toFixed(2)} m s⁻²</span>
            </div>
            <div class="sim-metric-box">
              <span class="sim-metric-label">අවසාන මන්දනය</span>
              <span class="sim-metric-val">${(vMax / t3).toFixed(2)} m s⁻²</span>
            </div>
            <div class="sim-metric-box">
              <span class="sim-metric-label">දැනට ප්‍රවේගය (v)</span>
              <span class="sim-metric-val">${curV.toFixed(1)} m s⁻¹</span>
            </div>
            <div class="sim-metric-box">
              <span class="sim-metric-label">මුළු විස්ථාපනය (s)</span>
              <span class="sim-metric-val">${totalS} m</span>
            </div>
          `;

          requestAnimationFrame(loop);
        }

        playBtn.addEventListener("click", () => { prog = 0; });
        root.addEventListener("sim-preset", (e) => {
          const d = e.detail;
          if (d === "dist" || d === "gravity" || d === "car") setMode(d);
          else prog = 0;
        });
        loop();
      }
    },

    // =========================================================================
    // LESSON 03: 3D බෝර් පරමාණුක ආකෘතිය, සමස්ථානික සහ ආවර්තිතා රටා ප්‍රස්තාරය
    // =========================================================================
    sim_l3_atom_builder: {
      lessonId: 3,
      title: "ක්‍රියාකාරකම් 3.1–3.7 අතත්‍ය විද්‍යාගාරය: 3D බෝර් පරමාණුක ආකෘතිය, සමස්ථානික සහ ආවර්තිතා ප්‍රස්තාර",
      badge: "පාඩම 03 • 3D Atom Virtual Lab",
      desc: "පරමාණුක ක්‍රමාංකය (Z = 1–20), සමස්ථානික සහ ආවර්තිතා ප්‍රස්තාර ටැබ් මගින් තෝරා 3D පරමාණුව (මවුසයෙන් හෝ ඇඟිල්ලෙන් කරකැවිය හැක) පරීක්ෂා කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-atom-tab="ie">⚛️ ක්‍රියාකාරකම 3.1–3.3: 3D බෝර් ආකෘතිය සහ අයනීකරණ ශක්තිය</button>
              <button class="vlab-tab-btn" data-atom-tab="en">📉 ක්‍රියාකාරකම 3.4: විද්‍යුත් ඍණතා ප්‍රස්තාරය (පෝලිං පරිමාණය)</button>
              <button class="vlab-tab-btn" data-atom-tab="na">🧪 Na (2, 8, 1) — I කාණ්ඩය</button>
              <button class="vlab-tab-btn" data-atom-tab="cl">🧪 Cl (2, 8, 7) — VII කාණ්ඩය</button>
              <button class="vlab-tab-btn" data-atom-tab="ca">🧪 Ca (2, 8, 8, 2) — Z=20</button>
            </div>
            <div class="sim-controls">
              <div class="sim-control-group">
                <label>මූලද්‍රව්‍යය (පරමාණුක ක්‍රමාංකය Z): <span data-role="z-val">11</span></label>
                <input type="range" min="1" max="20" step="1" value="11" data-role="z-in" />
              </div>
              <div class="sim-control-group">
                <label>ප්‍රස්තාර වර්ගය:</label>
                <select class="sim-select" data-role="graph-type">
                  <option value="ie">පළමුවන අයනීකරණ ශක්තිය (kJ mol⁻¹) — 3.8 රූපය</option>
                  <option value="en">විද්‍යුත් ඍණතාව (පෝලිං පරිමාණය) — 3.10 රූපය</option>
                </select>
              </div>
            </div>
            <div class="sim-stage">
              <canvas class="sim-canvas" width="560" height="245" data-role="canvas"></canvas>
              <div class="sim-readout" data-role="readout"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const zIn = root.querySelector('[data-role="z-in"]');
        const zVal = root.querySelector('[data-role="z-val"]');
        const gTypeEl = root.querySelector('[data-role="graph-type"]');
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const readoutEl = root.querySelector('[data-role="readout"]');
        const tabBtns = root.querySelectorAll("[data-atom-tab]");

        tabBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
            const t = btn.getAttribute("data-atom-tab");
            if (t === "ie") gTypeEl.value = "ie";
            else if (t === "en") gTypeEl.value = "en";
            else if (t === "na") zIn.value = 11;
            else if (t === "cl") zIn.value = 17;
            else if (t === "ca") zIn.value = 20;
          });
        });

        const ELEMENTS = [
          null,
          { s: "H", n: "හයිඩ්‍රජන්", a: 1, c: [1], g: "I", v: 1, ie: 1310, en: 2.1 },
          { s: "He", n: "හීලියම්", a: 4, c: [2], g: "VIII/0", v: 0, ie: 2372, en: 0 },
          { s: "Li", n: "ලිතියම්", a: 7, c: [2, 1], g: "I", v: 1, ie: 519, en: 1.0 },
          { s: "Be", n: "බෙරිලියම්", a: 9, c: [2, 2], g: "II", v: 2, ie: 897, en: 1.5 },
          { s: "B", n: "බෝරෝන්", a: 11, c: [2, 3], g: "III", v: 3, ie: 799, en: 2.0 },
          { s: "C", n: "කාබන්", a: 12, c: [2, 4], g: "IV", v: 4, ie: 1085, en: 2.5 },
          { s: "N", n: "නයිට්‍රජන්", a: 14, c: [2, 5], g: "V", v: 3, ie: 1406, en: 3.0 },
          { s: "O", n: "ඔක්සිජන්", a: 16, c: [2, 6], g: "VI", v: 2, ie: 1314, en: 3.5 },
          { s: "F", n: "ෆ්ලුවොරීන්", a: 19, c: [2, 7], g: "VII", v: 1, ie: 1682, en: 4.0 },
          { s: "Ne", n: "නියෝන්", a: 20, c: [2, 8], g: "VIII/0", v: 0, ie: 2080, en: 0 },
          { s: "Na", n: "සෝඩියම්", a: 23, c: [2, 8, 1], g: "I", v: 1, ie: 495, en: 0.9 },
          { s: "Mg", n: "මැග්නීසියම්", a: 24, c: [2, 8, 2], g: "II", v: 2, ie: 738, en: 1.2 },
          { s: "Al", n: "ඇලුමිනියම්", a: 27, c: [2, 8, 3], g: "III", v: 3, ie: 577, en: 1.5 },
          { s: "Si", n: "සිලිකන්", a: 28, c: [2, 8, 4], g: "IV", v: 4, ie: 786, en: 1.8 },
          { s: "P", n: "පොස්පරස්", a: 31, c: [2, 8, 5], g: "V", v: "3,5", ie: 1018, en: 2.1 },
          { s: "S", n: "සල්ෆර්", a: 32, c: [2, 8, 6], g: "VI", v: "2,6", ie: 1000, en: 2.5 },
          { s: "Cl", n: "ක්ලෝරීන්", a: 35, c: [2, 8, 7], g: "VII", v: "1,7", ie: 1255, en: 3.0 },
          { s: "Ar", n: "ආගන්", a: 40, c: [2, 8, 8], g: "VIII/0", v: 0, ie: 1521, en: 0 },
          { s: "K", n: "පොටෑසියම්", a: 39, c: [2, 8, 8, 1], g: "I", v: 1, ie: 418, en: 0.8 },
          { s: "Ca", n: "කැල්සියම්", a: 40, c: [2, 8, 8, 2], g: "II", v: 2, ie: 590, en: 1.0 }
        ];

        let angle = 0;
        let tiltX = 0.45, tiltY = 0.35;
        let dragging = false, lx = 0, ly = 0;

        canvas.addEventListener("mousedown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; });
        window.addEventListener("mouseup", () => { dragging = false; });
        canvas.addEventListener("mousemove", (e) => {
          if (!dragging) return;
          tiltY += (e.clientX - lx) * 0.01;
          tiltX += (e.clientY - ly) * 0.01;
          lx = e.clientX; ly = e.clientY;
        });

        canvas.addEventListener("touchstart", (e) => {
          if (e.touches && e.touches.length === 1) {
            dragging = true;
            lx = e.touches[0].clientX;
            ly = e.touches[0].clientY;
          }
        }, { passive: true });
        window.addEventListener("touchend", () => { dragging = false; });
        canvas.addEventListener("touchmove", (e) => {
          if (!dragging || !e.touches || e.touches.length !== 1) return;
          const cx = e.touches[0].clientX;
          const cy = e.touches[0].clientY;
          tiltY += (cx - lx) * 0.01;
          tiltX += (cy - ly) * 0.01;
          lx = cx; ly = cy;
          if (e.cancelable) e.preventDefault();
        }, { passive: false });

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "en") gTypeEl.value = "en";
          else if (e.detail === "ie") gTypeEl.value = "ie";
          else if (e.detail && !isNaN(Number(e.detail))) zIn.value = Number(e.detail);
        });

        function renderLoop() {
          if (!document.body.contains(canvas)) return;
          angle += 0.028;
          const z = Number(zIn.value);
          zVal.textContent = z;
          const el = ELEMENTS[z];
          const gMode = gTypeEl.value;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const cx = 135, cy = 122;
          const radii = [26, 46, 68, 90];

          el.c.forEach((count, sIdx) => {
            const r = radii[sIdx];
            const ringTilt = tiltX + sIdx * 0.28;
            ctx.strokeStyle = "rgba(148, 163, 184, 0.38)";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.15) {
              const p = project3D(r * Math.cos(a), r * Math.sin(a) * Math.sin(ringTilt), r * Math.sin(a) * Math.cos(ringTilt), 0, tiltY, cx, cy);
              if (a === 0) ctx.moveTo(p.x, p.y);
              else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();

            for (let i = 0; i < count; i++) {
              const theta = angle * (1.4 - sIdx * 0.2) + (2 * Math.PI * i) / count;
              const p = project3D(r * Math.cos(theta), r * Math.sin(theta) * Math.sin(ringTilt), r * Math.sin(theta) * Math.cos(ringTilt), 0, tiltY, cx, cy);
              drawSphere3D(ctx, p.x, p.y, 5.5 * p.scale, "#38bdf8", "");
            }
          });

          drawSphere3D(ctx, cx, cy, 17, "#f43f5e", el.s);
          ctx.fillStyle = "#e2e8f0";
          ctx.font = "bold 12px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`3D ${el.n} (${el.c.join(", ")})`, cx, 232);

          const gx = 285, gy = 205, gw = 250, gh = 160;
          ctx.strokeStyle = "#64748b";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(gx, gy - gh);
          ctx.lineTo(gx, gy);
          ctx.lineTo(gx + gw, gy);
          ctx.stroke();

          ctx.strokeStyle = gMode === "ie" ? "#2dd4bf" : "#f59e0b";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          let first = true;
          for (let i = 1; i <= 20; i++) {
            const val = gMode === "ie" ? ELEMENTS[i].ie : ELEMENTS[i].en;
            if (gMode === "en" && val === 0) continue;
            const maxVal = gMode === "ie" ? 2500 : 4.2;
            const px = gx + ((i - 1) / 19) * gw;
            const py = gy - (val / maxVal) * gh;
            if (first) { ctx.moveTo(px, py); first = false; }
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          for (let i = 1; i <= 20; i++) {
            const val = gMode === "ie" ? ELEMENTS[i].ie : ELEMENTS[i].en;
            if (gMode === "en" && val === 0) continue;
            const maxVal = gMode === "ie" ? 2500 : 4.2;
            const px = gx + ((i - 1) / 19) * gw;
            const py = gy - (val / maxVal) * gh;
            ctx.beginPath();
            ctx.arc(px, py, i === z ? 6 : 3, 0, Math.PI * 2);
            ctx.fillStyle = i === z ? "#f43f5e" : "#ffffff";
            ctx.fill();
            if (i === z) {
              ctx.fillStyle = "#fde047";
              ctx.font = "bold 11px sans-serif";
              ctx.fillText(`${ELEMENTS[i].s} (${val})`, px, py - 10);
            }
          }

          ctx.fillStyle = "#cbd5e1";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(gMode === "ie" ? "පළමු අයනීකරණ ශක්තිය (kJ mol⁻¹)" : "විද්‍යුත් ඍණතාව (පෝලිං පරිමාණය)", gx + gw / 2, 26);
          ctx.fillText("පරමාණුක ක්‍රමාංකය (Z = 1 සිට 20) →", gx + gw / 2, 232);

          readoutEl.innerHTML = `<strong>${el.n} (<sup>${el.a}</sup><sub>${z}</sub>${el.s}):</strong> ඉලෙක්ට්‍රෝන වින්‍යාසය = <strong>${el.c.join(", ")}</strong> | ආවර්තය = <strong>${el.c.length}</strong> | කාණ්ඩය = <strong>${el.g}</strong> | සංයුජතාව = <strong>${el.v}</strong> | පළමු අයනීකරණ ශක්තිය = <strong>${el.ie} kJ mol⁻¹</strong> | විද්‍යුත් ඍණතාව = <strong>${el.en || "නැත (උච්ච වායු)"}</strong>.`;

          requestAnimationFrame(renderLoop);
        }
        renderLoop();
      }
    },

    // =========================================================================
    // LESSON 04: නිව්ටන්ගේ නියම (අවස්ථිතිය, F=ma ට්‍රොලිය සහ බැලූන රොකට්ටුව)
    // =========================================================================
    sim_l4_newton_fma: {
      lessonId: 4,
      title: "ක්‍රියාකාරකම් 4.1–4.3 අතත්‍ය විද්‍යාගාරය: අවස්ථිතිය, F = ma ට්‍රොලිය සහ බැලූන රොකට්ටුව",
      badge: "පාඩම 04 • Newton's Laws Virtual Lab",
      desc: "නිව්ටන්ගේ නියම තුනට අදාළ සියලුම පෙළපොත් ක්‍රියාකාරකම් (4.1 අවස්ථිතිය, 4.2 F=ma රබර් පටි හා ට්‍රොලි පරීක්ෂණය, 4.3 බැලූන රොකට්ටුව) ටැබ් මගින් තෝරා සජීවීව අත්හදා බලන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-newton-tab="trolley">🛒 ක්‍රියාකාරකම 4.1–4.2(අ): F = ma (රබර් පටි ගණන a ∝ F)</button>
              <button class="vlab-tab-btn" data-newton-tab="stacked">⚖️ ක්‍රියාකාරකම 4.2(ආ): ට්‍රොලි ස්කන්ධය (a ∝ 1/m)</button>
              <button class="vlab-tab-btn" data-newton-tab="inertia">🪙 නිව්ටන්ගේ 1 වන නියමය: කාසිය හා කාඩ්පත (අවස්ථිතිය)</button>
              <button class="vlab-tab-btn" data-newton-tab="rocket">🎈 ක්‍රියාකාරකම 4.3: බැලූන රොකට්ටුව (3 වන නියමය)</button>
            </div>
            <div class="sim-controls">
              <div class="sim-control-group">
                <label>පරීක්ෂණ මාදිලිය:</label>
                <select class="sim-select" data-role="mode">
                  <option value="trolley">ක්‍රියාකාරකම 4.1–4.2: F = ma ට්‍රොලිය හා රබර් පටි පරීක්ෂණය</option>
                  <option value="inertia">නිව්ටන්ගේ 1 වන නියමය: වීදුරුව මත කාඩ්පත හා කාසියේ අවස්ථිතිය</option>
                  <option value="rocket">ක්‍රියාකාරකම 4.3: බැලූන රොකට්ටුව (නිව්ටන්ගේ 3 වන නියමය)</option>
                </select>
              </div>
              <div class="sim-control-group">
                <label>යොදන බලය (F): <span data-role="f-val">15</span> N</label>
                <input type="range" min="5" max="30" step="5" value="15" data-role="f-in" />
              </div>
              <div class="sim-control-group">
                <label>ස්කන්ධය (m): <span data-role="m-val">3</span> kg</label>
                <input type="range" min="1" max="10" step="1" value="3" data-role="m-in" />
              </div>
              <button class="sim-btn" data-role="launch-btn">▶ ක්‍රියාත්මක කරන්න</button>
            </div>
            <div class="sim-stage">
              <canvas class="sim-canvas" width="560" height="215" data-role="canvas"></canvas>
              <div class="sim-metrics-grid" data-role="metrics"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const modeEl = root.querySelector('[data-role="mode"]');
        const fIn = root.querySelector('[data-role="f-in"]');
        const mIn = root.querySelector('[data-role="m-in"]');
        const launchBtn = root.querySelector('[data-role="launch-btn"]');
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const metricsEl = root.querySelector('[data-role="metrics"]');
        const tabBtns = root.querySelectorAll("[data-newton-tab]");

        let pos = 0, vel = 0;

        function resetMotion() {
          pos = 0;
          vel = 0;
        }

        tabBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
            const t = btn.getAttribute("data-newton-tab");
            if (t === "trolley") { modeEl.value = "trolley"; fIn.value = 20; mIn.value = 2; }
            else if (t === "stacked") { modeEl.value = "trolley"; fIn.value = 15; mIn.value = 6; }
            else if (t === "inertia") { modeEl.value = "inertia"; }
            else if (t === "rocket") { modeEl.value = "rocket"; }
            resetMotion();
          });
        });

        launchBtn.addEventListener("click", resetMotion);
        modeEl.addEventListener("change", resetMotion);
        root.addEventListener("sim-preset", (e) => {
          const d = e.detail;
          if (d === "rocket" || d === "inertia" || d === "trolley") modeEl.value = d;
          const matchBtn = root.querySelector(`[data-newton-tab="${d}"]`);
          if (matchBtn) tabBtns.forEach((b) => b.classList.toggle("active", b === matchBtn));
          resetMotion();
        });

        function loop() {
          if (!document.body.contains(canvas)) return;
          const mode = modeEl.value;
          const F = Number(fIn.value);
          const m = Number(mIn.value);
          root.querySelector('[data-role="f-val"]').textContent = F;
          root.querySelector('[data-role="m-val"]').textContent = m;

          const a = F / m;
          vel += a * 0.018;
          pos += vel * 0.45;
          if (pos > 220) {
            pos = 0;
            vel = 0;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (mode === "inertia") {
            // Glass tumbler + Card flying right + Coin dropping into glass due to inertia
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 3;
            ctx.strokeRect(115, 95, 76, 92);
            ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
            ctx.fillRect(117, 135, 72, 50);

            const cardX = 95 + pos * 1.1;
            const coinY = pos > 35 ? Math.min(168, 82 + (pos - 35) * 1.6) : 82;

            // Cardboard sheet flicked away
            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(cardX, 88, 116, 7);

            // Coin stays at x=153 and drops straight down into the glass
            drawSphere3D(ctx, 153, coinY, 11, "#fde047", "Rs");

            ctx.fillStyle = "#f8fafc";
            ctx.font = "bold 12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("කාඩ්පතට ක්ෂණික බලයක් යෙදූ විට කාසිය අවස්ථිතිය නිසා වීදුරුව තුළට වැටේ", 175, 36);
          } else if (mode === "trolley") {
            ctx.strokeStyle = "#94a3b8";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(20, 152);
            ctx.lineTo(310, 152);
            ctx.stroke();

            const tx = 30 + pos * 0.85;
            ctx.fillStyle = "#38bdf8";
            for (let d = 30; d < tx; d += Math.max(6, (d - 22) * 0.22)) {
              ctx.beginPath();
              ctx.arc(d, 165, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.fillStyle = "#0ea5e9";
            ctx.beginPath();
            ctx.roundRect(tx, 102, 76, 38, 8);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`m = ${m} kg`, tx + 38, 125);

            drawSphere3D(ctx, tx + 16, 144, 7.5, "#f43f5e", "");
            drawSphere3D(ctx, tx + 60, 144, 7.5, "#f43f5e", "");

            ctx.strokeStyle = "#fde047";
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(tx + 76, 120);
            ctx.lineTo(tx + 76 + Math.min(55, 18 + F * 1.3), 120);
            ctx.stroke();
            ctx.fillStyle = "#fde047";
            ctx.fillText(`F = ${F} N ➔`, tx + 38, 90);
            ctx.fillStyle = "#2dd4bf";
            ctx.fillText(`ත්වරණය a = ${a.toFixed(2)} m s⁻²`, 165, 42);
          } else {
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(20, 95);
            ctx.lineTo(310, 95);
            ctx.stroke();

            const bx = 55 + pos * 0.85;
            for (let i = 0; i < 6; i++) {
              const ex = bx - 35 - ((pos * 2 + i * 14) % 55);
              const ey = 115 + Math.sin(pos + i) * 10;
              drawSphere3D(ctx, ex, ey, 4, "#38bdf8", "");
            }

            ctx.fillStyle = "#facc15";
            ctx.fillRect(bx - 22, 91, 44, 8);

            drawSphere3D(ctx, bx, 118, 24, "#f43f5e", "බැලූනය");
            ctx.fillStyle = "#38bdf8";
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("⬅ ක්‍රියාව (වාතය පිටවීම)", bx - 55, 162);
            ctx.fillStyle = "#fde047";
            ctx.fillText("ප්‍රතික්‍රියාව (ඉදිරියට තල්ලුව) ➔", bx + 45, 72);
          }

          // Right side: Live F vs a Graph
          const gx = 345, gy = 178, gw = 185, gh = 135;
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(gx, gy - gh);
          ctx.lineTo(gx, gy);
          ctx.lineTo(gx + gw, gy);
          ctx.stroke();

          ctx.strokeStyle = "#2dd4bf";
          ctx.lineWidth = 2.8;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + gw, gy - Math.min(gh, (30 / m / 15) * gh));
          ctx.stroke();

          const px = gx + (F / 30) * gw;
          const py = gy - Math.min(gh, (a / 15) * gh);
          drawSphere3D(ctx, px, py, 6.5, "#f43f5e", "");

          ctx.fillStyle = "#cbd5e1";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("a ∝ F ප්‍රස්තාරය (F = ma)", gx + gw / 2, 26);
          ctx.fillText("යොදන බලය F (N) →", gx + gw / 2, gy + 20);

          metricsEl.innerHTML = `
            <div class="sim-metric-box">
              <span class="sim-metric-label">ත්වරණය (a = F/m)</span>
              <span class="sim-metric-val">${a.toFixed(2)} m s⁻²</span>
            </div>
            <div class="sim-metric-box">
              <span class="sim-metric-label">ක්ෂණික ප්‍රවේගය (v)</span>
              <span class="sim-metric-val">${vel.toFixed(1)} m s⁻¹</span>
            </div>
            <div class="sim-metric-box">
              <span class="sim-metric-label">ගම්‍යතාව (p = mv)</span>
              <span class="sim-metric-val">${(m * vel).toFixed(1)} kg m s⁻¹</span>
            </div>
            <div class="sim-metric-box">
              <span class="sim-metric-label">පෘථිවිය මත බර (mg)</span>
              <span class="sim-metric-val">${m * 10} N</span>
            </div>
          `;

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 05: සජීවී ඝර්ෂණ බල පරීක්ෂණාගාරය (දුනු තරාදිය හා ප්‍රස්තාරය)
    // =========================================================================
    sim_l5_friction: {
      lessonId: 5,
      title: "ක්‍රියාකාරකම් 5.1–5.3 අතත්‍ය විද්‍යාගාරය: ඝර්ෂණ බල පරීක්ෂණාගාරය සහ දුනු තරාදිය",
      badge: "පාඩම 05 • Friction Virtual Lab",
      desc: "ක්‍රියාකාරකම 5.1 (ස්ථිතික/සීමාකාරී/ගතික ඝර්ෂණය), 5.2 (පෘෂ්ඨවල රළු බව), 5.3 (අභිලම්බ ප්‍රතික්‍රියාව R) සහ ස්පර්ශ වර්ගඵල පරීක්ෂාව ටැබ් මගින් තෝරා සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-fric-tab="act51">⚖️ ක්‍රියාකාරකම 5.1: ස්ථිතික, සීමාකාරී හා ගතික ඝර්ෂණය</button>
              <button class="vlab-tab-btn" data-fric-tab="act52">🪵 ක්‍රියාකාරකම 5.2: පෘෂ්ඨවල ස්වභාවය (රළු බව)</button>
              <button class="vlab-tab-btn" data-fric-tab="act53">🧱 ක්‍රියාකාරකම 5.3: අභිලම්බ ප්‍රතික්‍රියාව (R)</button>
              <button class="vlab-tab-btn" data-fric-tab="act54">📐 ස්පර්ශ පෘෂ්ඨ වර්ගඵලය පරීක්ෂා කිරීම</button>
            </div>
            <div class="sim-controls">
              <div class="sim-control-group">
                <label>පෘෂ්ඨයේ ස්වභාවය (ක්‍රියාකාරකම 5.2):</label>
                <select class="sim-select" data-role="surface">
                  <option value="0.25">සුමට මේස පෘෂ්ඨය (μ = 0.25)</option>
                  <option value="0.45" selected>මධ්‍යම ලී පෘෂ්ඨය (μ = 0.45)</option>
                  <option value="0.70">රළු වැලි කඩදාසිය (μ = 0.70)</option>
                </select>
              </div>
              <div class="sim-control-group">
                <label>ලී කුට්ටි ගණන (R): <span data-role="blocks-val">1 (20 N)</span></label>
                <input type="range" min="1" max="3" step="1" value="1" data-role="blocks" />
              </div>
              <div class="sim-control-group">
                <label>අදින බලය (F): <span data-role="pull-val">0</span> N</label>
                <input type="range" min="0" max="50" step="1" value="0" data-role="pull" />
              </div>
              <button class="sim-btn" data-role="auto-pull">▶ ක්‍රමයෙන් බලය වැඩි කරන්න</button>
            </div>
            <div class="sim-stage">
              <canvas class="sim-canvas" width="560" height="220" data-role="canvas"></canvas>
              <div class="sim-readout" data-role="readout"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const surfEl = root.querySelector('[data-role="surface"]');
        const blocksEl = root.querySelector('[data-role="blocks"]');
        const pullEl = root.querySelector('[data-role="pull"]');
        const autoBtn = root.querySelector('[data-role="auto-pull"]');
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const readoutEl = root.querySelector('[data-role="readout"]');
        const tabBtns = root.querySelectorAll("[data-fric-tab]");

        let blockX = 55;
        let autoPulling = false;
        let edgeMode = false;

        tabBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
            const t = btn.getAttribute("data-fric-tab");
            edgeMode = t === "act54";
            if (t === "act52") { surfEl.value = "0.70"; blocksEl.value = 1; }
            else if (t === "act53") { surfEl.value = "0.45"; blocksEl.value = 3; }
            else { surfEl.value = "0.45"; blocksEl.value = 1; }
            pullEl.value = 0;
            blockX = 55;
            autoPulling = true;
          });
        });

        autoBtn.addEventListener("click", () => {
          pullEl.value = 0;
          blockX = 55;
          autoPulling = true;
        });

        pullEl.addEventListener("input", () => { autoPulling = false; });
        root.addEventListener("sim-preset", (e) => {
          const d = e.detail;
          const matchBtn = root.querySelector(`[data-fric-tab="${d}"]`);
          if (matchBtn) {
            matchBtn.click();
          } else {
            pullEl.value = 0;
            blockX = 55;
            autoPulling = true;
          }
        });

        function loop() {
          if (!document.body.contains(canvas)) return;
          if (autoPulling) {
            const cur = Number(pullEl.value);
            if (cur < 48) pullEl.value = (cur + 0.25).toFixed(2);
            else autoPulling = false;
          }

          const mu = Number(surfEl.value);
          const nBlocks = Number(blocksEl.value);
          const R = nBlocks * 20;
          const F = Math.round(Number(pullEl.value));
          const fLim = Math.round(mu * R);
          const fDyn = Math.round(fLim * 0.82);

          root.querySelector('[data-role="blocks-val"]').textContent = `${nBlocks} (${R} N)`;
          root.querySelector('[data-role="pull-val"]').textContent = F;

          let curF = F;
          let state = "ස්ථිතික ඝර්ෂණය (නිශ්චලයි)";
          if (F === fLim) {
            curF = fLim;
            state = "සීමාකාරී ඝර්ෂණය (චලනය වීමට ඔන්න මෙන්න)";
          } else if (F > fLim) {
            curF = fDyn;
            state = "ගතික ඝර්ෂණය (ලී කුට්ටිය චලනය වේ!)";
            blockX += (F - fDyn) * 0.06;
            if (blockX > 145) blockX = 55;
          } else {
            blockX = 55;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Rough surface table
          ctx.fillStyle = mu > 0.6 ? "#78350f" : mu > 0.35 ? "#475569" : "#cbd5e1";
          ctx.fillRect(18, 162, 265, 12);

          // Stacked wooden blocks (narrow upright if edgeMode to demonstrate surface area independence)
          const bw = edgeMode ? 44 : 82;
          const bh = edgeMode ? 52 : 30;
          for (let i = 0; i < nBlocks; i++) {
            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(blockX, 160 - (i + 1) * bh, bw, bh - 2);
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 2;
            ctx.strokeRect(blockX, 160 - (i + 1) * bh, bw, bh - 2);
          }

          // Spring Balance connected to block
          const spStart = blockX + bw;
          const spEnd = spStart + 25 + (F / 50) * 30;
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(spStart, 143);
          for (let i = 1; i <= 6; i++) {
            ctx.lineTo(spStart + ((spEnd - spStart) * i) / 7, 143 + (i % 2 === 0 ? -5 : 5));
          }
          ctx.lineTo(spEnd, 143);
          ctx.stroke();

          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`අදින බලය F = ${F} N ➔`, blockX + 95, 190);
          ctx.fillStyle = "#f43f5e";
          ctx.fillText(`⬅ ඝර්ෂණය f = ${curF} N`, blockX + 35, 208);

          // Right: Friction Graph
          const gx = 320, gy = 182, gw = 210, gh = 140;
          ctx.strokeStyle = "#64748b";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(gx, gy - gh);
          ctx.lineTo(gx, gy);
          ctx.lineTo(gx + gw, gy);
          ctx.stroke();

          const xLim = gx + (fLim / 50) * gw;
          const yLim = gy - (fLim / 45) * gh;
          const yDyn = gy - (fDyn / 45) * gh;

          ctx.strokeStyle = "#2dd4bf";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(xLim, yLim);
          ctx.lineTo(xLim + 7, yDyn);
          ctx.lineTo(gx + gw, yDyn);
          ctx.stroke();

          const px = gx + (F / 50) * gw;
          const py = gy - (curF / 45) * gh;
          drawSphere3D(ctx, px, py, 6.5, "#f43f5e", "");

          ctx.fillStyle = "#fde047";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(`සීමාකාරී ඝර්ෂණය (${fLim}N)`, xLim, yLim - 10);
          ctx.fillStyle = "#cbd5e1";
          ctx.fillText("යොදන බලය F (N) →", gx + gw / 2, gy + 22);

          readoutEl.innerHTML = `<strong>${state}:</strong> අභිලම්බ ප්‍රතික්‍රියාව (R) = <strong>${R} N</strong> | සීමාකාරී ඝර්ෂණ බලය = <strong>${fLim} N</strong> | ගතික ඝර්ෂණ බලය = <strong>${fDyn} N</strong> | දැනට ක්‍රියාත්මක ඝර්ෂණ බලය = <strong>${curF} N</strong> ${edgeMode ? "(පටු පැත්ත තැබුවද සීමාකාරී ඝර්ෂණ බලය වෙනස් නොවේ!)" : ""}.`;

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 06: සෛල අන්වීක්ෂ ගවේෂකය සහ සජීවී අනූනන/ඌනන විභාජන සජීවීකරණය
    // =========================================================================
    sim_l6_cell_explorer: {
      lessonId: 6,
      title: "ක්‍රියාකාරකම් 6.1–6.4 සිමියුලේෂන්: සෛල අන්වීක්ෂ ගවේෂකය හා අනූනන/ඌනන සෛල විභාජන Virtual Lab",
      badge: "පාඩම 06 • සෛල හා සෛල විභාජනය",
      desc: "ලූනු සිවිය, කොපුල් සෛල අන්වීක්ෂයෙන් නිරීක්ෂණය සහ අනූනන හා ඌනන සෛල විභාජන අදියර සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="onion">🔬 ක්‍රියාකාරකම 6.1: ලූනු සිවියේ සෛල</button>
              <button class="vlab-tab-btn" data-subtab="cheek">🔬 ක්‍රියාකාරකම 6.2: මිනිස් කොපුල් සෛල</button>
              <button class="vlab-tab-btn" data-subtab="mitosis">🧬 ක්‍රියාකාරකම 6.3: අනූනන විභාජනය (Mitosis)</button>
              <button class="vlab-tab-btn" data-subtab="meiosis">🧬 ක්‍රියාකාරකම 6.4: ඌනන විභාජනය (Meiosis)</button>
            </div>

            <!-- TAB 1: ONION CELLS -->
            <div class="vlab-panel active" data-panel="onion">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>විශාලනය (Magnification):</label>
                  <select class="sim-select" data-role="onion-mag">
                    <option value="100">100× (අඩු විශාලනය)</option>
                    <option value="400" selected>400× (වැඩි විශාලනය)</option>
                  </select>
                </div>
                <div class="sim-control-group">
                  <label>වර්ණකය (Stain):</label>
                  <select class="sim-select" data-role="onion-stain">
                    <option value="iodine">අයඩීන් ද්‍රාවණය (ලා දුඹුරු/කහ)</option>
                    <option value="methylene">මෙතිලීන් බ්ලූ (ලා නිල්)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="230" data-role="canvas-onion"></canvas>
                <div class="sim-readout" data-role="readout-onion"></div>
              </div>
            </div>

            <!-- TAB 2: CHEEK CELLS -->
            <div class="vlab-panel" data-panel="cheek" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>අන්වීක්ෂ නාභිගත කිරීම (Focus):</label>
                  <input type="range" min="1" max="10" step="1" value="8" data-role="cheek-focus" />
                </div>
                <div class="sim-control-group">
                  <label>නිරීක්ෂණ කොටස් ඉස්මතු කිරීම:</label>
                  <select class="sim-select" data-role="cheek-highlight">
                    <option value="all">සියල්ල පෙන්වන්න (All Organelles)</option>
                    <option value="nucleus">න්‍යෂ්ටිය පමණක් (Nucleus)</option>
                    <option value="membrane">ප්ලාස්ම පටලය (Cell Membrane)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="230" data-role="canvas-cheek"></canvas>
                <div class="sim-readout" data-role="readout-cheek"></div>
              </div>
            </div>

            <!-- TAB 3: MITOSIS -->
            <div class="vlab-panel" data-panel="mitosis" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>විභාජන අදියර:</label>
                  <select class="sim-select" data-role="mit-phase">
                    <option value="auto">සජීවී සජීවීකරණය (Auto Play)</option>
                    <option value="pro">පූර්ව අවස්ථාව (Prophase)</option>
                    <option value="meta">මධ්‍ය අවස්ථාව (Metaphase)</option>
                    <option value="ana">අනා අවස්ථාව (Anaphase)</option>
                    <option value="telo">අන්ත අවස්ථාව (Telophase)</option>
                  </select>
                </div>
                <button class="sim-btn" data-role="mit-replay">🔄 නැවත මුල සිට</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="230" data-role="canvas-mitosis"></canvas>
                <div class="sim-readout" data-role="readout-mitosis"></div>
              </div>
            </div>

            <!-- TAB 4: MEIOSIS -->
            <div class="vlab-panel" data-panel="meiosis" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ඌනන අදියර:</label>
                  <select class="sim-select" data-role="mei-stage">
                    <option value="1">ඌනනය I (2n → n සෛල 2ක්)</option>
                    <option value="2">ඌනනය II (n සෛල 2ක් → n සෛල 4ක්)</option>
                  </select>
                </div>
                <button class="sim-btn" data-role="mei-replay">🔄 නැවත මුල සිට</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="230" data-role="canvas-meiosis"></canvas>
                <div class="sim-readout" data-role="readout-meiosis"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "onion";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "plant" || e.detail === "onion") switchTab("onion");
          else if (e.detail === "cheek") switchTab("cheek");
          else if (e.detail === "mitosis") switchTab("mitosis");
          else if (e.detail === "meiosis") switchTab("meiosis");
        });

        // 1. Onion Canvas
        const cvOnion = root.querySelector('[data-role="canvas-onion"]');
        const ctxOnion = cvOnion.getContext("2d");
        const magOnion = root.querySelector('[data-role="onion-mag"]');
        const stainOnion = root.querySelector('[data-role="onion-stain"]');
        const readOnion = root.querySelector('[data-role="readout-onion"]');

        // 2. Cheek Canvas
        const cvCheek = root.querySelector('[data-role="canvas-cheek"]');
        const ctxCheek = cvCheek.getContext("2d");
        const focusCheek = root.querySelector('[data-role="cheek-focus"]');
        const hlCheek = root.querySelector('[data-role="cheek-highlight"]');
        const readCheek = root.querySelector('[data-role="readout-cheek"]');

        // 3. Mitosis Canvas
        const cvMit = root.querySelector('[data-role="canvas-mitosis"]');
        const ctxMit = cvMit.getContext("2d");
        const phaseMit = root.querySelector('[data-role="mit-phase"]');
        const repMit = root.querySelector('[data-role="mit-replay"]');
        const readMit = root.querySelector('[data-role="readout-mitosis"]');
        let mitT = 0;
        repMit.addEventListener("click", () => { mitT = 0; });

        // 4. Meiosis Canvas
        const cvMei = root.querySelector('[data-role="canvas-meiosis"]');
        const ctxMei = cvMei.getContext("2d");
        const stMei = root.querySelector('[data-role="mei-stage"]');
        const repMei = root.querySelector('[data-role="mei-replay"]');
        const readMei = root.querySelector('[data-role="readout-meiosis"]');
        let meiT = 0;
        repMei.addEventListener("click", () => { meiT = 0; });

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "onion") {
            ctxOnion.clearRect(0, 0, cvOnion.width, cvOnion.height);
            const mag = Number(magOnion.value);
            const stain = stainOnion.value;
            const bgFill = stain === "iodine" ? "#fef3c7" : "#dbeafe";
            const borderCol = stain === "iodine" ? "#b45309" : "#1d4ed8";
            const nucCol = stain === "iodine" ? "#92400e" : "#1e40af";

            // Microscope Field of View
            ctxOnion.save();
            ctxOnion.beginPath();
            ctxOnion.arc(270, 115, 105, 0, Math.PI * 2);
            ctxOnion.clip();
            ctxOnion.fillStyle = "#0f172a";
            ctxOnion.fillRect(0, 0, cvOnion.width, cvOnion.height);

            const cols = mag === 100 ? 5 : 3;
            const rows = mag === 100 ? 4 : 2;
            const w = 210 / cols;
            const h = 210 / rows;

            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const ox = 165 + c * w;
                const oy = 10 + r * h;
                ctxOnion.fillStyle = bgFill;
                ctxOnion.fillRect(ox + 2, oy + 2, w - 4, h - 4);
                ctxOnion.strokeStyle = borderCol;
                ctxOnion.lineWidth = mag === 400 ? 3.5 : 2;
                ctxOnion.strokeRect(ox + 2, oy + 2, w - 4, h - 4);

                // Central vacuole
                ctxOnion.fillStyle = stain === "iodine" ? "rgba(254, 240, 138, 0.45)" : "rgba(191, 219, 254, 0.45)";
                ctxOnion.fillRect(ox + w * 0.25, oy + h * 0.2, w * 0.5, h * 0.6);

                // Peripheral Nucleus
                drawSphere3D(ctxOnion, ox + w * 0.18, oy + h * 0.5, mag === 400 ? 8 : 4.5, nucCol, "");
              }
            }
            ctxOnion.restore();

            // Circular lens ring
            ctxOnion.strokeStyle = "#475569";
            ctxOnion.lineWidth = 14;
            ctxOnion.beginPath();
            ctxOnion.arc(270, 115, 112, 0, Math.PI * 2);
            ctxOnion.stroke();

            ctxOnion.fillStyle = "#f8fafc";
            ctxOnion.font = "bold 11px sans-serif";
            ctxOnion.fillText(`අන්වීක්ෂ දර්ශන පථය (${mag}×)`, 20, 25);

            readOnion.innerHTML = `<strong>ක්‍රියාකාරකම 6.1 — ලූනු සිවියේ සෛල නිරීක්ෂණය (${mag}×):</strong> සෙලියුලෝස් <strong>සෛල බිත්තිය</strong> නිසා සෛල ඍජුකෝණාස්‍රාකාරව පිහිටයි. විශාල මධ්‍ය රික්තකය නිසා <strong>න්‍යෂ්ටිය පර්යන්තයට තල්ලු වී</strong> ඇත. හරිතලව අඩංගු නොවේ (භූගත ආචිත පත්‍ර බැවින්).`;
          } else if (activeTab === "cheek") {
            ctxCheek.clearRect(0, 0, cvCheek.width, cvCheek.height);
            const fVal = Number(focusCheek.value);
            const blur = Math.abs(8 - fVal) * 1.5;
            const hl = hlCheek.value;

            ctxCheek.save();
            ctxCheek.beginPath();
            ctxCheek.arc(270, 115, 105, 0, Math.PI * 2);
            ctxCheek.clip();
            ctxCheek.fillStyle = "#0f172a";
            ctxCheek.fillRect(0, 0, cvCheek.width, cvCheek.height);

            const pts = [[235, 80], [315, 100], [255, 150]];
            pts.forEach(([cx, cy], idx) => {
              // Cell membrane
              ctxCheek.fillStyle = hl === "nucleus" ? "#fce7f3" : "#fbcfe8";
              ctxCheek.beginPath();
              ctxCheek.ellipse(cx, cy, 38, 26, idx * 0.4, 0, Math.PI * 2);
              ctxCheek.fill();
              ctxCheek.strokeStyle = hl === "membrane" ? "#f43f5e" : "#be185d";
              ctxCheek.lineWidth = hl === "membrane" ? 4 : 2;
              ctxCheek.stroke();

              // Cytoplasm granules
              if (blur < 2) {
                for (let k = 0; k < 6; k++) {
                  ctxCheek.fillStyle = "#ec4899";
                  ctxCheek.fillRect(cx - 20 + k * 7, cy - 8 + (k % 3) * 6, 2, 2);
                }
              }

              // Central Nucleus
              drawSphere3D(ctxCheek, cx, cy, hl === "nucleus" ? 10 : 7.5, "#831843", "");
            });

            ctxCheek.restore();

            // Circular lens ring
            ctxCheek.strokeStyle = "#475569";
            ctxCheek.lineWidth = 14;
            ctxCheek.beginPath();
            ctxCheek.arc(270, 115, 112, 0, Math.PI * 2);
            ctxCheek.stroke();

            ctxCheek.fillStyle = "#f8fafc";
            ctxCheek.font = "bold 11px sans-serif";
            ctxCheek.fillText(`මිනිස් කොපුල් සෛල (නාභිගතය: ${blur < 1 ? "පැහැදිලියි ✓" : "අපැහැදිලියි"})`, 20, 25);

            readCheek.innerHTML = `<strong>ක්‍රියාකාරකම 6.2 — මිනිස් කොපුල් සෛල:</strong> සත්ත්ව සෛල වන බැවින් <strong>සෛල බිත්තියක් නොමැත</strong>. සෛලය වටා ප්ලාස්ම පටලය, සෛල ප්ලාස්මය සහ මධ්‍යයේ තද පැහැ <strong>මධ්‍යගත න්‍යෂ්ටිය</strong> පැහැදිලිව පෙනේ.`;
          } else if (activeTab === "mitosis") {
            ctxMit.clearRect(0, 0, cvMit.width, cvMit.height);
            const ph = phaseMit.value;
            if (ph === "auto") {
              mitT = (mitT + 0.005) % 1;
            } else if (ph === "pro") mitT = 0.15;
            else if (ph === "meta") mitT = 0.4;
            else if (ph === "ana") mitT = 0.65;
            else if (ph === "telo") mitT = 0.9;

            let stageName = "", desc = "";
            let sep = 0;
            if (mitT < 0.3) {
              stageName = "1. පූර්ව අවස්ථාව (Prophase): වර්ණදේහ ඝන වීම & න්‍යෂ්ටි පටලය බිඳවැටීම";
              desc = "මාතෘ සෛලයේ (2n = 46) DNA ද්විගුණ වී වර්ණදේහ ඝන වී පෙනේ.";
            } else if (mitT < 0.55) {
              stageName = "2. මධ්‍ය අවස්ථාව (Metaphase): වර්ණදේහ සමකාක්ෂ තලයේ පෙළගැසීම";
              desc = "තර්කු තන්තු සෑදී වර්ණදේහ සෛලයේ සමකාක්ෂ තලයේ පිළිවෙළට සකස් වේ.";
            } else if (mitT < 0.8) {
              stageName = "3. අනා අවස්ථාව (Anaphase): වර්ණදේහාංශ ප්‍රතිවිරුද්ධ ධ්‍රැව වෙත ඇදීම";
              sep = ((mitT - 0.55) / 0.25) * 65;
              desc = "කේන්ද්‍ර ඛණ්ඩය බෙදී වර්ණදේහාංශ ධ්‍රැව දෙසට ගමන් කරයි.";
            } else {
              stageName = "4. අන්ත අවස්ථාව (Telophase): සර්වසම දුහිතෘ සෛල 2ක් සෑදීම (2n = 46)";
              sep = 65 + ((mitT - 0.8) / 0.2) * 20;
              desc = "සෛල ප්ලාස්මය බෙදී (සෛලප්ලාස්ම විභාජනය) ජානමය වශයෙන් සර්වසම <strong>2n සෛල 2ක්</strong> ඇතිවේ.";
            }

            ctxMit.fillStyle = "#2dd4bf";
            ctxMit.font = "bold 13px sans-serif";
            ctxMit.textAlign = "center";
            ctxMit.fillText(stageName, 270, 26);

            // Cells
            drawSphere3D(ctxMit, 270 - sep, 120, 48, "#0d9488", sep > 50 ? "2n (46)" : "");
            drawSphere3D(ctxMit, 270 + sep, 120, 48, "#0d9488", sep > 50 ? "2n (46)" : "");

            // Chromosomes
            if (sep <= 50) {
              for (let i = -1; i <= 1; i++) {
                drawSphere3D(ctxMit, 270 - sep * 0.7, 120 + i * 16, 7, "#fde047", "");
                drawSphere3D(ctxMit, 270 + sep * 0.7, 120 + i * 16, 7, "#38bdf8", "");
              }
            }

            readMit.innerHTML = `<strong>අනූනන විභාජනය (Mitosis):</strong> දෛහික සෛලවල සිදුවේ. මාතෘ සෛලයට සර්වසම <strong>වර්ණදේහ සංඛ්‍යාව 2n = 46 වූ සෛල 2ක්</strong> ලැබේ. ${desc}`;
          } else if (activeTab === "meiosis") {
            ctxMei.clearRect(0, 0, cvMei.width, cvMei.height);
            const st = Number(stMei.value);
            meiT = (meiT + 0.005) % 1;

            ctxMei.fillStyle = "#c084fc";
            ctxMei.font = "bold 13px sans-serif";
            ctxMei.textAlign = "center";

            if (st === 1) {
              ctxMei.fillText("ඌනනය I: සමජාත වර්ණදේහ වෙන්වීම (2n → n සෛල 2ක්)", 270, 26);
              const sep = Math.min(80, meiT * 95);
              drawSphere3D(ctxMei, 270 - sep, 120, 42, "#7c3aed", sep > 40 ? "n (23)" : "2n (46)");
              drawSphere3D(ctxMei, 270 + sep, 120, 42, "#7c3aed", sep > 40 ? "n (23)" : "");
              readMei.innerHTML = "<strong>ඌනනය I:</strong> සමජාත වර්ණදේහ යුගලනය වී හරස්මාරුවීමෙන් (Crossing over) පසු වෙන් වේ. මෙහිදී වර්ණදේහ සංඛ්‍යාව අඩක් වී (2n → n) සෛල 2ක් ලැබේ.";
            } else {
              ctxMei.fillText("ඌනනය II: අනූනනයක් බඳු විභාජනයක් (ඒකගුණ n ජන්මාණු 4ක්)", 270, 26);
              const sep = Math.min(48, meiT * 55);
              drawSphere3D(ctxMei, 175 - sep, 120, 32, "#6d28d9", "n (23)");
              drawSphere3D(ctxMei, 175 + sep, 120, 32, "#6d28d9", "n (23)");
              drawSphere3D(ctxMei, 365 - sep, 120, 32, "#6d28d9", "n (23)");
              drawSphere3D(ctxMei, 365 + sep, 120, 32, "#6d28d9", "n (23)");
              readMei.innerHTML = "<strong>ඌනනය II:</strong> වර්ණදේහාංශ වෙන්වීමෙන් අවසානයේ <strong>ජානමය වශයෙන් විවිධ වූ ඒකගුණ (n = 23) දුහිතෘ සෛල/ජන්මාණු 4ක්</strong> බිහිවේ.";
            }
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 07: මවුලය (n = m / M) ඉලෙක්ට්‍රොනික තරාදිය සහ 3D අංශු බීකරය
    // =========================================================================
    sim_l7_mole_calc: {
      lessonId: 7,
      title: "ක්‍රියාකාරකම් 7.1–7.4 සිමියුලේෂන්: මවුලය (n = m/M), ඇවගාඩ්රෝ නියතය හා අංශු කවුන්ටරය",
      badge: "පාඩම 07 • මවුල හා ඇවගාඩ්රෝ",
      desc: "ඉලෙක්ට්‍රොනික තරාදියෙන් ස්කන්ධය මැනීම, සංයෝගවල මවුල ගණන (n = m/M), අණු හා මුළු පරමාණු ගණන සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="mole-calc">⚖️ ක්‍රියාකාරකම 7.4: n = m/M ඉලෙක්ට්‍රොනික තරාදිය</button>
              <button class="vlab-tab-btn" data-subtab="avogadro">🔢 ක්‍රියාකාරකම 7.3: ඇවගාඩ්රෝ නියතය (L = 6.022×10²³)</button>
              <button class="vlab-tab-btn" data-subtab="rel-mass">⚛️ ක්‍රියාකාරකම් 7.1–7.2: Ar හා Mr සංසන්දක තරාදිය</button>
            </div>

            <!-- TAB 1: MOLE CALC & SCALE -->
            <div class="vlab-panel active" data-panel="mole-calc">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ද්‍රව්‍යය / සංයෝගය:</label>
                  <select class="sim-select" data-role="sub-select">
                    <option value="18|3|ජලය (H₂O)|#38bdf8">ජලය (H₂O) — M = 18 g mol⁻¹</option>
                    <option value="44|3|කාබන් ඩයොක්සයිඩ් (CO₂)|#a855f7" selected>කාබන් ඩයොක්සයිඩ් (CO₂) — M = 44 g mol⁻¹</option>
                    <option value="12|1|කාබන් (C)|#64748b">කාබන් (C) — M = 12 g mol⁻¹</option>
                    <option value="58.5|2|සෝඩියම් ක්ලෝරයිඩ් (NaCl)|#10b981">සෝඩියම් ක්ලෝරයිඩ් (NaCl) — M = 58.5 g mol⁻¹</option>
                    <option value="100|5|කැල්සියම් කාබනේට් (CaCO₃)|#f59e0b">කැල්සියම් කාබනේට් (CaCO₃) — M = 100 g mol⁻¹</option>
                    <option value="180|24|ග්ලූකෝස් (C₆H₁₂O₆)|#f43f5e">ග්ලූකෝස් (C₆H₁₂O₆) — M = 180 g mol⁻¹</option>
                  </select>
                </div>
                <div class="sim-control-group">
                  <label>ස්කන්ධය (m): <span data-role="m-val">44</span> g</label>
                  <input type="range" min="6" max="180" step="2" value="44" data-role="m-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-calc"></canvas>
                <div class="sim-metrics-grid" data-role="metrics-calc"></div>
              </div>
            </div>

            <!-- TAB 2: AVOGADRO COUNTER -->
            <div class="vlab-panel" data-panel="avogadro" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>මවුල සංඛ්‍යාව (n): <span data-role="n-val">1.0</span> mol</label>
                  <input type="range" min="0.25" max="3.0" step="0.25" value="1.0" data-role="n-in" />
                </div>
                <div class="sim-control-group">
                  <label>අංශු වර්ගය:</label>
                  <select class="sim-select" data-role="particle-type">
                    <option value="he">හීලියම් පරමාණු (He)</option>
                    <option value="h2o">ජල අණු (H₂O)</option>
                    <option value="nacl">NaCl සූත්‍ර ඒකක</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-avo"></canvas>
                <div class="sim-readout" data-role="readout-avo"></div>
              </div>
            </div>

            <!-- TAB 3: RELATIVE ATOMIC / MOLECULAR MASS -->
            <div class="vlab-panel" data-panel="rel-mass" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>සංසන්දනය කළ යුතු පරමාණුව/අණුව:</label>
                  <select class="sim-select" data-role="rel-select">
                    <option value="H|1|C-12 න් 1/12 පංගුවට සමානයි">හයිඩ්‍රජන් (H) — Ar = 1</option>
                    <option value="C|12|C-12 පරමාණුවේ ස්කන්ධයට සමානයි" selected>කාබන් (C) — Ar = 12</option>
                    <option value="O|16|C-12 න් 1/12 පංගුව මෙන් 16 ගුණයක්">ඔක්සිජන් (O) — Ar = 16</option>
                    <option value="H2O|18|H(1×2) + O(16) = 18">ජලය (H₂O) — Mr = 18</option>
                    <option value="CO2|44|C(12) + O(16×2) = 44">කාබන් ඩයොක්සයිඩ් (CO₂) — Mr = 44</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-rel"></canvas>
                <div class="sim-readout" data-role="readout-rel"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "mole-calc";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "avogadro") switchTab("avogadro");
          else if (e.detail === "rel-mass") switchTab("rel-mass");
          else switchTab("mole-calc");
        });

        // Tab 1 logic
        const subEl = root.querySelector('[data-role="sub-select"]');
        const mIn = root.querySelector('[data-role="m-in"]');
        const mVal = root.querySelector('[data-role="m-val"]');
        const cvCalc = root.querySelector('[data-role="canvas-calc"]');
        const ctxCalc = cvCalc.getContext("2d");
        const metricsEl = root.querySelector('[data-role="metrics-calc"]');

        const pts = Array.from({ length: 45 }, () => ({
          x: 75 + Math.random() * 110,
          y: 45 + Math.random() * 95,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8
        }));

        // Tab 2 logic
        const nIn = root.querySelector('[data-role="n-in"]');
        const nVal = root.querySelector('[data-role="n-val"]');
        const partType = root.querySelector('[data-role="particle-type"]');
        const cvAvo = root.querySelector('[data-role="canvas-avo"]');
        const ctxAvo = cvAvo.getContext("2d");
        const readAvo = root.querySelector('[data-role="readout-avo"]');

        // Tab 3 logic
        const relSel = root.querySelector('[data-role="rel-select"]');
        const cvRel = root.querySelector('[data-role="canvas-rel"]');
        const ctxRel = cvRel.getContext("2d");
        const readRel = root.querySelector('[data-role="readout-rel"]');

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "mole-calc") {
            const [Mstr, atomsStr, name, col] = subEl.value.split("|");
            const M = Number(Mstr);
            const atomsPer = Number(atomsStr);
            const m = Number(mIn.value);
            mVal.textContent = m;

            const n = m / M;
            const molecules = (n * 6.022).toFixed(2);
            const totalAtoms = (n * atomsPer * 6.022).toFixed(2);

            ctxCalc.clearRect(0, 0, cvCalc.width, cvCalc.height);

            // Beaker
            ctxCalc.strokeStyle = "#cbd5e1";
            ctxCalc.lineWidth = 3;
            ctxCalc.strokeRect(65, 25, 130, 125);

            const activeCount = Math.min(45, Math.max(4, Math.round(n * 10)));
            for (let i = 0; i < activeCount; i++) {
              const p = pts[i];
              p.x += p.vx;
              p.y += p.vy;
              if (p.x < 74 || p.x > 186) p.vx *= -1;
              if (p.y < 35 || p.y > 142) p.vy *= -1;
              drawSphere3D(ctxCalc, p.x, p.y, 6, col, "");
            }

            // Digital Scale Base
            ctxCalc.fillStyle = "#334155";
            ctxCalc.beginPath();
            ctxCalc.roundRect(45, 152, 170, 42, 8);
            ctxCalc.fill();
            ctxCalc.fillStyle = "#0f172a";
            ctxCalc.fillRect(65, 160, 130, 26);
            ctxCalc.fillStyle = "#2dd4bf";
            ctxCalc.font = "bold 13px monospace";
            ctxCalc.textAlign = "center";
            ctxCalc.fillText(`${m}.0 g  (${n.toFixed(2)} mol)`, 130, 177);

            // Graph on Right
            const gx = 285, gy = 180, gw = 220, gh = 140;
            ctxCalc.strokeStyle = "#64748b";
            ctxCalc.lineWidth = 1.5;
            ctxCalc.beginPath();
            ctxCalc.moveTo(gx, gy - gh);
            ctxCalc.lineTo(gx, gy);
            ctxCalc.lineTo(gx + gw, gy);
            ctxCalc.stroke();

            ctxCalc.strokeStyle = col;
            ctxCalc.lineWidth = 3;
            ctxCalc.beginPath();
            ctxCalc.moveTo(gx, gy);
            const maxN = 180 / M;
            ctxCalc.lineTo(gx + gw, gy - Math.min(gh, (maxN / 10) * gh));
            ctxCalc.stroke();

            const px = gx + (m / 180) * gw;
            const py = gy - Math.min(gh, (n / 10) * gh);
            drawSphere3D(ctxCalc, px, py, 6.5, "#fde047", "");

            ctxCalc.fillStyle = "#f8fafc";
            ctxCalc.font = "bold 11px sans-serif";
            ctxCalc.fillText(`n = m / M ප්‍රස්තාරය (${name})`, gx + gw / 2, 26);
            ctxCalc.fillText("ස්කන්ධය m (g) →", gx + gw / 2, gy + 22);

            metricsEl.innerHTML = `
              <div class="sim-metric-box">
                <span class="sim-metric-label">මවුලික ස්කන්ධය (M)</span>
                <span class="sim-metric-val">${M} g mol⁻¹</span>
              </div>
              <div class="sim-metric-box">
                <span class="sim-metric-label">මවුල ගණන (n = m/M)</span>
                <span class="sim-metric-val">${n.toFixed(2)} mol</span>
              </div>
              <div class="sim-metric-box">
                <span class="sim-metric-label">අණු/ඒකක ගණන (n×L)</span>
                <span class="sim-metric-val">${molecules} × 10²³</span>
              </div>
              <div class="sim-metric-box">
                <span class="sim-metric-label">මුළු පරමාණු ගණන</span>
                <span class="sim-metric-val">${totalAtoms} × 10²³</span>
              </div>
            `;
          } else if (activeTab === "avogadro") {
            ctxAvo.clearRect(0, 0, cvAvo.width, cvAvo.height);
            const nValNum = Number(nIn.value);
            nVal.textContent = nValNum.toFixed(2);
            const pType = partType.value;
            const countStr = (nValNum * 6.022).toFixed(3);

            // Container Box
            ctxAvo.strokeStyle = "#38bdf8";
            ctxAvo.lineWidth = 3;
            ctxAvo.strokeRect(40, 30, 220, 150);

            // Moving dots representing density of L particles
            const countDots = Math.min(80, Math.round(nValNum * 25));
            for (let i = 0; i < countDots; i++) {
              const dx = 50 + (i * 37) % 200;
              const dy = 40 + (i * 23) % 130;
              drawSphere3D(ctxAvo, dx, dy, 5, pType === "he" ? "#facc15" : pType === "h2o" ? "#38bdf8" : "#4ade80", "");
            }

            // Right side stats box
            ctxAvo.fillStyle = "#1e293b";
            ctxAvo.roundRect(280, 30, 230, 150, 10);
            ctxAvo.fill();
            ctxAvo.strokeStyle = "#475569";
            ctxAvo.stroke();

            ctxAvo.fillStyle = "#38bdf8";
            ctxAvo.font = "bold 13px sans-serif";
            ctxAvo.textAlign = "center";
            ctxAvo.fillText("ඇවගාඩ්රෝ නියතය (L)", 395, 60);

            ctxAvo.fillStyle = "#fde047";
            ctxAvo.font = "bold 15px monospace";
            ctxAvo.fillText(`${countStr} × 10²³`, 395, 100);

            ctxAvo.fillStyle = "#cbd5e1";
            ctxAvo.font = "12px sans-serif";
            ctxAvo.fillText(`මවුල 1 ක අංශු = 6.022 × 10²³`, 395, 130);
            ctxAvo.fillText(`මවුල ${nValNum} ක අංශු = ${nValNum} × L`, 395, 152);

            readAvo.innerHTML = `<strong>ක්‍රියාකාරකම 7.3:</strong> ඕනෑම ද්‍රව්‍යයක <strong>මවුල 1 ක අඩංගු අංශු (පරමාණු, අණු හෝ සූත්‍ර ඒකක) සංඛ්‍යාව 6.022 × 10²³ (ඇවගාඩ්රෝ නියතය - L)</strong> වේ. මවුල ${nValNum} ක් තුළ අංශු <strong>${countStr} × 10²³</strong> ක් අඩංගුය.`;
          } else if (activeTab === "rel-mass") {
            ctxRel.clearRect(0, 0, cvRel.width, cvRel.height);
            const [sym, mass, note] = relSel.value.split("|");
            const mNum = Number(mass);

            // Balance beam
            ctxRel.strokeStyle = "#94a3b8";
            ctxRel.lineWidth = 4;
            ctxRel.beginPath();
            ctxRel.moveTo(80, 120);
            ctxRel.lineTo(460, 120);
            ctxRel.stroke();

            // Fulcrum
            ctxRel.fillStyle = "#f59e0b";
            ctxRel.beginPath();
            ctxRel.moveTo(270, 120);
            ctxRel.lineTo(255, 160);
            ctxRel.lineTo(285, 160);
            ctxRel.closePath();
            ctxRel.fill();

            // Left pan: Selected atom/molecule
            ctxRel.fillStyle = "#38bdf8";
            ctxRel.fillRect(80, 95, 70, 25);
            ctxRel.fillStyle = "#0f172a";
            ctxRel.font = "bold 12px sans-serif";
            ctxRel.textAlign = "center";
            ctxRel.fillText(`${sym} (${mNum} u)`, 115, 112);

            // Right pan: C-12 standard units
            ctxRel.fillStyle = "#10b981";
            ctxRel.fillRect(390, 95, 70, 25);
            ctxRel.fillStyle = "#0f172a";
            ctxRel.fillText(`${mNum} × (1/12 C-12)`, 425, 112);

            ctxRel.fillStyle = "#f8fafc";
            ctxRel.font = "bold 13px sans-serif";
            ctxRel.fillText(`සාපේක්ෂ ස්කන්ධ සංසන්දනය: ${sym}`, 270, 35);

            readRel.innerHTML = `<strong>ක්‍රියාකාරකම් 7.1–7.2:</strong> සාපේක්ෂ පරමාණුක/අණුක ස්කන්ධය මනිනු ලබන්නේ <strong>කාබන්-12 සමස්ථානික පරමාණුවක ස්කන්ධයෙන් 1/12 පංගුවට (1 u)</strong> සාපේක්ෂවයි. <strong>${sym}</strong> හි සාපේක්ෂ ස්කන්ධය <strong>${mNum}</strong> කි (${note}). ඒකක රහිත අනුපාතයකි.`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 08: සජීවී ශ්වසන ඇටවුම (O₂ අවශෝෂණය) සහ චාප වෘද්ධිමානය
    // =========================================================================
    sim_l8_respiration_growth: {
      lessonId: 8,
      title: "ක්‍රියාකාරකම් 8.1–8.4 සිමියුලේෂන්: ශ්වසන ඇටවුම (O₂), චාප වෘද්ධිමානය, CO₂ හුණු දියර & තාප පරීක්ෂාව",
      badge: "පාඩම 08 • ශ්වසනය හා වර්ධනය",
      desc: "ප්‍රරෝහණය වන බීජ මගින් O₂ අවශෝෂණය, චාප වෘද්ධිමානයෙන් ශාක වර්ධනය, ප්‍රශ්වාස CO₂ සහ ශ්වසනයේදී තාපය පිටවීම සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="respiration-o2">🌱 ක්‍රියාකාරකම 8.1: බීජ ශ්වසනයේදී O₂ අවශෝෂණය</button>
              <button class="vlab-tab-btn" data-subtab="auxanometer">📈 ක්‍රියාකාරකම 8.2: චාප වෘද්ධිමානය (Time-Lapse)</button>
              <button class="vlab-tab-btn" data-subtab="limewater-co2">🥛 ක්‍රියාකාරකම 8.3: ප්‍රශ්වාස CO₂ (හුණු දියර කිරි පාට වීම)</button>
              <button class="vlab-tab-btn" data-subtab="thermo-seeds">🌡️ ක්‍රියාකාරකම 8.4: ශ්වසනයේදී තාපය පිටවීම</button>
            </div>

            <!-- TAB 1: SEED RESPIRATION O2 -->
            <div class="vlab-panel active" data-panel="respiration-o2">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ගතවූ කාලය: <span data-role="hr-val">0.0</span> පැය</label>
                  <input type="range" min="0" max="10" step="0.2" value="3" data-role="hr-in" />
                </div>
                <button class="sim-btn" data-role="play-btn-o2">▶ Time-Lapse ක්‍රියාත්මක කරන්න</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-o2"></canvas>
                <div class="sim-readout" data-role="readout-o2"></div>
              </div>
            </div>

            <!-- TAB 2: AUXANOMETER -->
            <div class="vlab-panel" data-panel="auxanometer" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>දින ගණන: <span data-role="day-val">2.0</span> දින</label>
                  <input type="range" min="0" max="7" step="0.2" value="2.0" data-role="day-in" />
                </div>
                <button class="sim-btn" data-role="play-btn-aux">▶ වර්ධන සජීවීකරණය</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-aux"></canvas>
                <div class="sim-readout" data-role="readout-aux"></div>
              </div>
            </div>

            <!-- TAB 3: LIMEWATER CO2 -->
            <div class="vlab-panel" data-panel="limewater-co2" style="display:none;">
              <div class="sim-controls">
                <button class="sim-btn" data-role="blow-btn">💨 බටයෙන් හුස්ම පිඹින්න (Exhale CO₂)</button>
                <button class="sim-btn" data-role="reset-lime">🔄 නැවුම් හුණු දියර</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-lime"></canvas>
                <div class="sim-readout" data-role="readout-lime"></div>
              </div>
            </div>

            <!-- TAB 4: THERMAL FLASK SEEDS -->
            <div class="vlab-panel" data-panel="thermo-seeds" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ප්ලාස්කුව තෝරන්න:</label>
                  <select class="sim-select" data-role="flask-sel">
                    <option value="germinating">A ප්ලාස්කුව: ප්‍රරෝහණය වන බීජ (සජීවී ශ්වසනය)</option>
                    <option value="boiled">B ප්ලාස්කුව: තැම්බූ බීජ (පාලක ඇටවුම - මියගිය බීජ)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-thermo"></canvas>
                <div class="sim-readout" data-role="readout-thermo"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "respiration-o2";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "auxanometer") switchTab("auxanometer");
          else if (e.detail === "limewater") switchTab("limewater-co2");
          else if (e.detail === "thermo") switchTab("thermo-seeds");
          else switchTab("respiration-o2");
        });

        // Tab 1 logic
        const hrIn = root.querySelector('[data-role="hr-in"]');
        const hrVal = root.querySelector('[data-role="hr-val"]');
        const playBtnO2 = root.querySelector('[data-role="play-btn-o2"]');
        const cvO2 = root.querySelector('[data-role="canvas-o2"]');
        const ctxO2 = cvO2.getContext("2d");
        const readO2 = root.querySelector('[data-role="readout-o2"]');
        let playO2 = false;
        playBtnO2.addEventListener("click", () => { hrIn.value = 0; playO2 = true; });
        hrIn.addEventListener("input", () => { playO2 = false; });

        // Tab 2 logic
        const dayIn = root.querySelector('[data-role="day-in"]');
        const dayVal = root.querySelector('[data-role="day-val"]');
        const playAux = root.querySelector('[data-role="play-btn-aux"]');
        const cvAux = root.querySelector('[data-role="canvas-aux"]');
        const ctxAux = cvAux.getContext("2d");
        const readAux = root.querySelector('[data-role="readout-aux"]');
        let playAx = false;
        playAux.addEventListener("click", () => { dayIn.value = 0; playAx = true; });
        dayIn.addEventListener("input", () => { playAx = false; });

        // Tab 3 logic
        const blowBtn = root.querySelector('[data-role="blow-btn"]');
        const resetLime = root.querySelector('[data-role="reset-lime"]');
        const cvLime = root.querySelector('[data-role="canvas-lime"]');
        const ctxLime = cvLime.getContext("2d");
        const readLime = root.querySelector('[data-role="readout-lime"]');
        let milkyT = 0, blowing = false;
        blowBtn.addEventListener("click", () => { blowing = true; });
        resetLime.addEventListener("click", () => { milkyT = 0; blowing = false; });

        // Tab 4 logic
        const flaskSel = root.querySelector('[data-role="flask-sel"]');
        const cvThermo = root.querySelector('[data-role="canvas-thermo"]');
        const ctxThermo = cvThermo.getContext("2d");
        const readThermo = root.querySelector('[data-role="readout-thermo"]');

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "respiration-o2") {
            let h = Number(hrIn.value);
            if (playO2) {
              h += 0.03;
              if (h > 10) { h = 10; playO2 = false; }
              hrIn.value = h;
            }
            hrVal.textContent = h.toFixed(1);
            const rise = h * 8;

            ctxO2.clearRect(0, 0, cvO2.width, cvO2.height);

            // Respiration Conical Flask
            ctxO2.fillStyle = "#f8fafc";
            ctxO2.font = "bold 12px sans-serif";
            ctxO2.textAlign = "center";
            ctxO2.fillText("ප්‍රරෝහණය වන බීජ සහිත සංවෘත ප්ලාස්කුව", 140, 25);

            ctxO2.strokeStyle = "#cbd5e1";
            ctxO2.lineWidth = 3;
            ctxO2.beginPath();
            ctxO2.moveTo(90, 50);
            ctxO2.lineTo(60, 175);
            ctxO2.lineTo(210, 175);
            ctxO2.lineTo(180, 50);
            ctxO2.closePath();
            ctxO2.stroke();

            // Germinating seeds
            for (let i = 0; i < 7; i++) {
              drawSphere3D(ctxO2, 85 + i * 16, 160, 7, "#f59e0b", "");
            }

            // Suspended KOH tube
            ctxO2.fillStyle = "rgba(56, 189, 248, 0.75)";
            ctxO2.fillRect(125, 90, 22, 45);
            ctxO2.fillStyle = "#fde047";
            ctxO2.font = "bold 10px sans-serif";
            ctxO2.fillText("KOH", 136, 82);

            // Delivery Tube
            ctxO2.strokeStyle = "#94a3b8";
            ctxO2.lineWidth = 3;
            ctxO2.beginPath();
            ctxO2.moveTo(135, 50);
            ctxO2.lineTo(135, 35);
            ctxO2.lineTo(340, 35);
            ctxO2.lineTo(340, 175);
            ctxO2.stroke();

            // Beaker with colored water
            ctxO2.strokeStyle = "#cbd5e1";
            ctxO2.strokeRect(310, 115, 60, 65);
            ctxO2.fillStyle = "rgba(244, 63, 94, 0.35)";
            ctxO2.fillRect(312, 130, 56, 50);

            // Water rising in the tube
            ctxO2.fillStyle = "#f43f5e";
            ctxO2.fillRect(337, 130 - rise, 6, rise + 45);

            ctxO2.fillStyle = "#2dd4bf";
            ctxO2.font = "bold 13px sans-serif";
            ctxO2.fillText(`↑ ${rise.toFixed(0)} mm ඉහළ යාම`, 425, 120);

            readO2.innerHTML = `<strong>ක්‍රියාකාරකම 8.1 නිරීක්ෂණය:</strong> බීජ ශ්වසනයේදී O₂ අවශෝෂණය කරයි. පිටවන CO₂ කුඩා නළයේ ඇති <strong>KOH ද්‍රාවණයට උරාගන්නා</strong> බැවින් ප්ලාස්කුව තුළ පීඩනය අඩුවේ. මේ නිසා බාහිර වායුගෝල පීඩනයෙන් වර්ණවත් ද්‍රවය නළය ඔස්සේ <strong>${rise.toFixed(0)} mm ඉහළ නගී</strong>.`;
          } else if (activeTab === "auxanometer") {
            let d = Number(dayIn.value);
            if (playAx) {
              d += 0.04;
              if (d > 7) { d = 7; playAx = false; }
              dayIn.value = d;
            }
            dayVal.textContent = d.toFixed(1);

            ctxAux.clearRect(0, 0, cvAux.width, cvAux.height);

            // Arc Auxanometer
            ctxAux.fillStyle = "#f8fafc";
            ctxAux.font = "bold 12px sans-serif";
            ctxAux.textAlign = "center";
            ctxAux.fillText("චාප වෘද්ධිමානය (Arc Auxanometer)", 380, 25);

            // Arc scale
            ctxAux.strokeStyle = "#cbd5e1";
            ctxAux.lineWidth = 3;
            ctxAux.beginPath();
            ctxAux.arc(380, 105, 75, Math.PI * 0.72, Math.PI * 1.28);
            ctxAux.stroke();

            // Pulley & Pointer
            drawSphere3D(ctxAux, 380, 105, 14, "#facc15", "");
            const ang = Math.PI - 0.35 + (d / 7) * 0.7;
            ctxAux.strokeStyle = "#2dd4bf";
            ctxAux.lineWidth = 3.5;
            ctxAux.beginPath();
            ctxAux.moveTo(380, 105);
            ctxAux.lineTo(380 + 72 * Math.cos(ang), 105 + 72 * Math.sin(ang));
            ctxAux.stroke();

            // Thread to plant tip
            const plantGrowth = d * 4.5;
            ctxAux.strokeStyle = "#e2e8f0";
            ctxAux.lineWidth = 1.5;
            ctxAux.beginPath();
            ctxAux.moveTo(370, 105);
            ctxAux.lineTo(190, 140 - plantGrowth);
            ctxAux.stroke();

            // Potted Plant
            ctxAux.fillStyle = "#b45309";
            ctxAux.fillRect(165, 160, 50, 35);
            ctxAux.strokeStyle = "#22c55e";
            ctxAux.lineWidth = 5;
            ctxAux.beginPath();
            ctxAux.moveTo(190, 160);
            ctxAux.lineTo(190, 140 - plantGrowth);
            ctxAux.stroke();
            drawSphere3D(ctxAux, 190, 140 - plantGrowth, 6, "#4ade80", "🌱");

            readAux.innerHTML = `<strong>ක්‍රියාකාරකම 8.2:</strong> දින <strong>${d.toFixed(1)}</strong> ක් තුළ ශාක අග්‍රස්ථය <strong>${plantGrowth.toFixed(1)} mm</strong> කින් වර්ධනය වී ඇත. කප්පියට සවි කළ දිගු දර්ශකය මගින් චාපය මත එම වර්ධනය විශාලනය කර <strong>${(d * 3.8).toFixed(1)} mm</strong> ක කියවීමක් පෙන්වයි.`;
          } else if (activeTab === "limewater-co2") {
            ctxLime.clearRect(0, 0, cvLime.width, cvLime.height);
            if (blowing && milkyT < 1) milkyT += 0.015;

            // Boiling tube
            ctxLime.strokeStyle = "#94a3b8";
            ctxLime.lineWidth = 3;
            ctxLime.beginPath();
            ctxLime.roundRect(220, 45, 100, 140, 20);
            ctxLime.stroke();

            // Limewater color (transparent -> milky white)
            const alpha = 0.2 + milkyT * 0.75;
            ctxLime.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctxLime.fillRect(222, 95, 96, 85);

            // Straw
            ctxLime.strokeStyle = "#f59e0b";
            ctxLime.lineWidth = 4;
            ctxLime.beginPath();
            ctxLime.moveTo(270, 20);
            ctxLime.lineTo(270, 160);
            ctxLime.stroke();

            if (blowing && milkyT < 1) {
              // Bubbles
              for (let i = 0; i < 5; i++) {
                drawSphere3D(ctxLime, 255 + Math.random() * 30, 110 + Math.random() * 40, 4, "#ffffff", "");
              }
            }

            ctxLime.fillStyle = "#f8fafc";
            ctxLime.font = "bold 13px sans-serif";
            ctxLime.textAlign = "center";
            ctxLime.fillText(milkyT > 0.6 ? "හුණු දියර කිරි පැහැ වී ඇත (CaCO₃ අවක්ෂේපය)" : "පැහැදිලි හුණු දියර (Ca(OH)₂)", 270, 210);

            readLime.innerHTML = `<strong>ක්‍රියාකාරකම 8.3:</strong> ප්‍රශ්වාස වාතයේ අඩංගු CO₂ හුණු දියර (Ca(OH)₂) තුළින් බුබුලනය කළ විට <strong>Ca(OH)₂ + CO₂ → CaCO₃ ↓ + H₂O</strong> ප්‍රතික්‍රියාවෙන් දිය නොවන සුදු පැහැති කැල්සියම් කාබනේට් සෑදී <strong>හුණු දියර කිරි පැහැ වේ</strong>.`;
          } else if (activeTab === "thermo-seeds") {
            ctxThermo.clearRect(0, 0, cvThermo.width, cvThermo.height);
            const isGerm = flaskSel.value === "germinating";
            const temp = isGerm ? 36.5 : 28.0;

            // Vacuum Flask
            ctxThermo.strokeStyle = "#38bdf8";
            ctxThermo.lineWidth = 4;
            ctxThermo.strokeRect(210, 60, 120, 120);

            // Seeds
            for (let i = 0; i < 6; i++) {
              drawSphere3D(ctxThermo, 230 + i * 14, 155, 7, isGerm ? "#f59e0b" : "#64748b", "");
            }

            // Thermometer
            ctxThermo.fillStyle = "#e2e8f0";
            ctxThermo.fillRect(265, 30, 10, 110);
            const mercH = isGerm ? 70 : 35;
            ctxThermo.fillStyle = "#ef4444";
            ctxThermo.fillRect(266, 140 - mercH, 8, mercH);
            drawSphere3D(ctxThermo, 270, 145, 7, "#ef4444", "");

            ctxThermo.fillStyle = "#2dd4bf";
            ctxThermo.font = "bold 13px sans-serif";
            ctxThermo.textAlign = "center";
            ctxThermo.fillText(`උෂ්ණත්වය: ${temp} °C`, 270, 205);

            readThermo.innerHTML = `<strong>ක්‍රියාකාරකම 8.4:</strong> ${isGerm ? "<strong>ප්‍රරෝහණය වන බීජ (A ප්ලාස්කුව):</strong> සක්‍රීය සෛලීය ශ්වසනය නිසා තාප ශක්තිය පිටවීමෙන් උෂ්ණත්වමාන පාඨාංකය <strong>36.5 °C දක්වා ඉහළ නගී</strong>." : "<strong>තැම්බූ බීජ (B පාලක ප්ලාස්කුව):</strong> සෛල මියගොස් ඇති බැවින් ශ්වසනය සිදුනොවේ. උෂ්ණත්වය කාමර උෂ්ණත්වයේ (28.0 °C) වෙනස් නොවී පවතී."}`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 09: සම්ප්‍රයුක්ත බල දෛශික සහ සජීවී ට්‍රොලි චලිතය
    // =========================================================================
    sim_l9_resultant_force: {
      lessonId: 9,
      title: "ක්‍රියාකාරකම් 9.1–9.4 සිමියුලේෂන්: ඒකරේඛීය, සමාන්තර හා ආනත බලවල සම්ප්‍රයුක්තය",
      badge: "පාඩම 09 • සම්ප්‍රයුක්ත බලය",
      desc: "එකම දිශාවට, ප්‍රතිවිරුද්ධ දිශාවට, සමාන්තරව සහ ලම්බකව යොදන බල පද්ධතිවල සම්ප්‍රයුක්තය (R) සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="collinear-same">➡️ ක්‍රියාකාරකම 9.1: එකම දිශාවට ඒකරේඛීය බල</button>
              <button class="vlab-tab-btn" data-subtab="collinear-opp">↔️ ක්‍රියාකාරකම 9.2: ප්‍රතිවිරුද්ධ ඒකරේඛීය බල</button>
              <button class="vlab-tab-btn" data-subtab="parallel">⏸️ ක්‍රියාකාරකම 9.3: සමාන්තර බල පද්ධතිය</button>
              <button class="vlab-tab-btn" data-subtab="inclined">📐 ක්‍රියාකාරකම 9.4: ආනත බල හා සමාන්තරාස්‍ර නියමය</button>
            </div>

            <div class="sim-controls">
              <div class="sim-control-group">
                <label>F₁ බලය: <span data-role="f1-val">20</span> N</label>
                <input type="range" min="0" max="40" step="2" value="20" data-role="f1-in" />
              </div>
              <div class="sim-control-group">
                <label>F₂ බලය: <span data-role="f2-val">12</span> N</label>
                <input type="range" min="0" max="40" step="2" value="12" data-role="f2-in" />
              </div>
            </div>
            <div class="sim-stage">
              <canvas class="sim-canvas" width="540" height="215" data-role="canvas"></canvas>
              <div class="sim-readout" data-role="readout"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        let activeTab = "collinear-same";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          offset = 0;
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "collinear-opp" || e.detail === "opposite") switchTab("collinear-opp");
          else if (e.detail === "parallel") switchTab("parallel");
          else if (e.detail === "inclined") switchTab("inclined");
          else switchTab("collinear-same");
        });

        const f1In = root.querySelector('[data-role="f1-in"]');
        const f2In = root.querySelector('[data-role="f2-in"]');
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const readout = root.querySelector('[data-role="readout"]');

        let offset = 0;

        function loop() {
          if (!document.body.contains(canvas)) return;
          const f1 = Number(f1In.value);
          const f2 = Number(f2In.value);
          root.querySelector('[data-role="f1-val"]').textContent = f1;
          root.querySelector('[data-role="f2-val"]').textContent = f2;

          let R = 0, vx = 0, vy = 0, desc = "";
          if (activeTab === "collinear-same") {
            R = f1 + f2;
            vx = R * 0.04;
            desc = `<strong>ක්‍රියාකාරකම 9.1 (එකම දිශාවට ඒකරේඛීය බල):</strong> සම්ප්‍රයුක්තය <strong>R = F₁ + F₂ = ${f1} + ${f2} = ${R} N (දකුණට →)</strong> වේ.`;
          } else if (activeTab === "collinear-opp") {
            R = Math.abs(f1 - f2);
            vx = (f1 - f2) * 0.05;
            const dStr = f1 > f2 ? "දකුණට (F₁ දිශාවට →)" : f2 > f1 ? "වමට (F₂ දිශාවට ←)" : "නිශ්චලයි (සමතුලිතයි)";
            desc = `<strong>ක්‍රියාකාරකම 9.2 (ප්‍රතිවිරුද්ධ ඒකරේඛීය බල):</strong> සම්ප්‍රයුක්තය <strong>R = |F₁ - F₂| = |${f1} - ${f2}| = ${R} N (${dStr})</strong> වේ. බල දෙක සමාන වූ විට (R = 0) වස්තුව සමතුලිත වේ.`;
          } else if (activeTab === "parallel") {
            R = f1 + f2;
            vx = R * 0.04;
            desc = `<strong>ක්‍රියාකාරකම 9.3 (සමාන්තර බල පද්ධතිය):</strong> එකම දිශාවට සමාන්තරව යෙදෙන විට සම්ප්‍රයුක්තය <strong>R = F₁ + F₂ = ${f1} + ${f2} = ${R} N</strong> වන අතර ක්‍රියාකාරී ලක්ෂ්‍යය බල දෙක අතර පිහිටයි.`;
          } else {
            R = Number(Math.sqrt(f1 * f1 + f2 * f2).toFixed(1));
            vx = f1 * 0.035;
            vy = -f2 * 0.035;
            desc = `<strong>ක්‍රියාකාරකම 9.4 (ආනත බල හා සමාන්තරාස්‍ර නියමය):</strong> ලම්බක ආනත බල දෙකේ සම්ප්‍රයුක්තය: <strong>R = √(${f1}² + ${f2}²) = √(${f1 * f1} + ${f2 * f2}) = ${R} N (↗)</strong>.`;
          }

          offset = (offset + 1) % 90;
          const cx = 250 + vx * (offset * 0.6);
          const cy = 115 + vy * (offset * 0.6);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Object Block
          ctx.fillStyle = "#0ea5e9";
          ctx.beginPath();
          ctx.roundRect(cx - 35, cy - 25, 70, 50, 10);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "bold 12px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`R = ${R} N`, cx, cy + 4);

          // Arrows
          ctx.strokeStyle = "#fde047";
          ctx.lineWidth = 4;
          if (activeTab === "collinear-same") {
            ctx.beginPath();
            ctx.moveTo(cx + 35, cy - 8);
            ctx.lineTo(cx + 35 + f1 * 2, cy - 8);
            ctx.moveTo(cx + 35, cy + 8);
            ctx.lineTo(cx + 35 + f2 * 2, cy + 8);
            ctx.stroke();
          } else if (activeTab === "collinear-opp") {
            ctx.beginPath();
            ctx.moveTo(cx + 35, cy);
            ctx.lineTo(cx + 35 + f1 * 2, cy);
            ctx.stroke();
            ctx.strokeStyle = "#f43f5e";
            ctx.beginPath();
            ctx.moveTo(cx - 35, cy);
            ctx.lineTo(cx - 35 - f2 * 2, cy);
            ctx.stroke();
          } else if (activeTab === "parallel") {
            ctx.beginPath();
            ctx.moveTo(cx + 35, cy - 16);
            ctx.lineTo(cx + 35 + f1 * 2, cy - 16);
            ctx.moveTo(cx + 35, cy + 16);
            ctx.lineTo(cx + 35 + f2 * 2, cy + 16);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + f1 * 2.2, cy);
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx, cy - f2 * 2.2);
            ctx.stroke();
            ctx.strokeStyle = "#2dd4bf";
            ctx.setLineDash([4, 3]);
            ctx.strokeRect(cx, cy - f2 * 2.2, f1 * 2.2, f2 * 2.2);
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + f1 * 2.2, cy - f2 * 2.2);
            ctx.stroke();
          }

          readout.innerHTML = desc;
          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 10: 3D රසායනික බන්ධන, දැලිස් සහ විද්‍යුත් සන්නායකතා පරීක්ෂණාගාරය
    // =========================================================================
    sim_l10_chemical_bonds: {
      lessonId: 10,
      title: "ක්‍රියාකාරකම් 10.1–10.4 සිමියුලේෂන්: 3D අයනික/පරමාණුක දැලිස්, සහසංයුජ අණු හා සන්නායකතා විද්‍යාගාරය",
      badge: "පාඩම 10 • 3D දැලිස් හා සන්නායකතාව",
      desc: "NaCl ත්‍රිමාන අයනික දැලිස, විද්‍යුත් සන්නායකතා Virtual Lab, දියමන්ති/මිනිරන් දැලිස් සහ සහසංයුජ ධ්‍රැවීය අණු සජීවීව පරීක්ෂා කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="nacl-lattice">🧊 ක්‍රියාකාරකම 10.1: NaCl ත්‍රිමාන අයනික දැලිස (3D)</button>
              <button class="vlab-tab-btn" data-subtab="conductivity-lab">💡 ක්‍රියාකාරකම 10.3: විද්‍යුත් සන්නායකතා Virtual Lab</button>
              <button class="vlab-tab-btn" data-subtab="allotropes-3d">💎 ක්‍රියාකාරකම 10.4: දියමන්ති හා මිනිරන් දැලිස්</button>
              <button class="vlab-tab-btn" data-subtab="covalent-polar">💧 ක්‍රියාකාරකම 10.2: H₂O හා CH₄ සහසංයුජ අණු</button>
            </div>

            <div class="sim-stage">
              <canvas class="sim-canvas" width="540" height="245" data-role="canvas"></canvas>
              <div class="sim-readout" data-role="readout"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const readout = root.querySelector('[data-role="readout"]');

        let activeTab = "nacl-lattice";
        let rx = 0.4, ry = 0.6, tick = 0;
        let dragging = false, lx = 0, ly = 0;

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          curStruct = buildStructure(activeTab);
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "conductivity") switchTab("conductivity-lab");
          else if (e.detail === "allotropes" || e.detail === "diamond") switchTab("allotropes-3d");
          else if (e.detail === "covalent" || e.detail === "h2o") switchTab("covalent-polar");
          else switchTab("nacl-lattice");
        });

        canvas.addEventListener("mousedown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; });
        window.addEventListener("mouseup", () => { dragging = false; });
        canvas.addEventListener("mousemove", (e) => {
          if (!dragging) return;
          ry += (e.clientX - lx) * 0.012;
          rx += (e.clientY - ly) * 0.012;
          lx = e.clientX; ly = e.clientY;
        });

        canvas.addEventListener("touchstart", (e) => {
          if (e.touches && e.touches.length === 1) {
            dragging = true;
            lx = e.touches[0].clientX;
            ly = e.touches[0].clientY;
          }
        }, { passive: true });
        window.addEventListener("touchend", () => { dragging = false; });
        canvas.addEventListener("touchmove", (e) => {
          if (!dragging || !e.touches || e.touches.length !== 1) return;
          const cx = e.touches[0].clientX;
          const cy = e.touches[0].clientY;
          ry += (cx - lx) * 0.012;
          rx += (cy - ly) * 0.012;
          lx = cx; ly = cy;
          if (e.cancelable) e.preventDefault();
        }, { passive: false });

        function buildStructure(type) {
          const atoms = [], bonds = [];
          if (type === "nacl-lattice") {
            const step = 42, idxMap = {};
            let k = 0;
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                  const isNa = Math.abs(x + y + z) % 2 === 0;
                  idxMap[`${x},${y},${z}`] = k++;
                  atoms.push({ x: x * step, y: y * step, z: z * step, r: isNa ? 11 : 15, color: isNa ? "#38bdf8" : "#22c55e", label: isNa ? "Na⁺" : "Cl⁻" });
                }
              }
            }
            for (let x = -1; x <= 1; x++) {
              for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                  const i1 = idxMap[`${x},${y},${z}`];
                  if (x < 1) bonds.push([i1, idxMap[`${x + 1},${y},${z}`]]);
                  if (y < 1) bonds.push([i1, idxMap[`${x},${y + 1},${z}`]]);
                  if (z < 1) bonds.push([i1, idxMap[`${x},${y},${z + 1}`]]);
                }
              }
            }
          } else if (type === "allotropes-3d") {
            const pts = [[0, 0, 0], [45, 45, 45], [45, -45, -45], [-45, 45, -45], [-45, -45, 45], [80, 0, 80], [0, 80, 80], [-80, 0, -80], [0, -80, -80]];
            pts.forEach((p) => atoms.push({ x: p[0], y: p[1], z: p[2], r: 14, color: "#38bdf8", label: "C" }));
            bonds.push([0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [2, 8], [3, 7]);
          } else if (type === "covalent-polar") {
            atoms.push({ x: 0, y: -15, z: 0, r: 24, color: "#f43f5e", label: "Oδ⁻" });
            atoms.push({ x: -65, y: 38, z: 15, r: 15, color: "#38bdf8", label: "Hδ⁺" });
            atoms.push({ x: 65, y: 38, z: -15, r: 15, color: "#38bdf8", label: "Hδ⁺" });
            bonds.push([0, 1], [0, 2]);
          }
          return { atoms, bonds };
        }

        let curStruct = buildStructure(activeTab);

        function animate() {
          if (!document.body.contains(canvas)) return;
          tick += 0.05;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (activeTab === "conductivity-lab") {
            // Left Beaker: NaCl aqueous solution (Bulb ON)
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 3;
            ctx.strokeRect(65, 95, 145, 115);
            ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
            ctx.fillRect(67, 120, 141, 88);

            // Electrodes
            ctx.fillStyle = "#475569";
            ctx.fillRect(95, 75, 12, 110);
            ctx.fillRect(168, 75, 12, 110);

            // Glowing Bulb (ON)
            const glow = ctx.createRadialGradient(138, 42, 4, 138, 42, 34);
            glow.addColorStop(0, "#fef08a");
            glow.addColorStop(0.5, "rgba(250, 204, 21, 0.55)");
            glow.addColorStop(1, "transparent");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(138, 42, 34, 0, Math.PI * 2);
            ctx.fill();
            drawSphere3D(ctx, 138, 42, 13, "#facc15", "💡");

            // Moving ions
            for (let i = 0; i < 4; i++) {
              const shift = Math.sin(tick + i) * 22;
              drawSphere3D(ctx, 138 + shift, 140 + i * 15, 7, i % 2 === 0 ? "#38bdf8" : "#22c55e", i % 2 === 0 ? "+" : "-");
            }
            ctx.fillStyle = "#2dd4bf";
            ctx.font = "bold 12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("NaCl ජලීය ද්‍රාවණය (බල්බය දැල්වේ)", 138, 232);

            // Right Beaker: Sugar covalent solution (Bulb OFF)
            ctx.strokeStyle = "#cbd5e1";
            ctx.strokeRect(330, 95, 145, 115);
            ctx.fillStyle = "rgba(148, 163, 184, 0.2)";
            ctx.fillRect(332, 120, 141, 88);
            ctx.fillStyle = "#475569";
            ctx.fillRect(360, 75, 12, 110);
            ctx.fillRect(433, 75, 12, 110);
            drawSphere3D(ctx, 402, 42, 13, "#64748b", "");
            ctx.fillStyle = "#f43f5e";
            ctx.fillText("සීනි ජලීය ද්‍රාවණය (බල්බය නොදැල්වේ)", 402, 232);

            readout.innerHTML = "<strong>ක්‍රියාකාරකම 10.3 — විද්‍යුත් සන්නායකතා පරීක්ෂාව:</strong> අයනික සංයෝග (NaCl) ජලයේ දියවූ විට නිදහස් Na⁺ හා Cl⁻ අයන චලනය වන නිසා <strong>විද්‍යුතය සන්නයනය කර බල්බය දල්වයි</strong>. සහසංයුජ සංයෝග (සීනි) ජලයේ දියවූ විට අයන නොසාදන බැවින් <strong>විද්‍යුතය සන්නයනය නොකරයි</strong>.";
            requestAnimationFrame(animate);
            return;
          }

          if (!dragging) ry += 0.015;
          const projected = curStruct.atoms.map((a) => ({
            ...a,
            ...project3D(a.x, a.y, a.z, rx, ry, canvas.width / 2, canvas.height / 2)
          }));

          ctx.strokeStyle = "rgba(203, 213, 225, 0.65)";
          ctx.lineWidth = 3.5;
          curStruct.bonds.forEach(([i, j]) => {
            const p1 = projected[i], p2 = projected[j];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          });

          projected.slice().sort((a, b) => b.z - a.z).forEach((p) => {
            drawSphere3D(ctx, p.x, p.y, p.r * p.scale, p.color, p.label);
          });

          ctx.fillStyle = "#94a3b8";
          ctx.font = "11px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText("🖱️ මවුසයෙන් ඇද ත්‍රිමානව කරකවන්න", 14, 234);

          if (activeTab === "nacl-lattice") {
            readout.innerHTML = "<strong>ක්‍රියාකාරකම 10.1 — NaCl ත්‍රිමාන අයනික දැලිස:</strong> එක් Na⁺ අයනයක් වටා Cl⁻ අයන 6ක් ද, එක් Cl⁻ අයනයක් වටා Na⁺ අයන 6ක් ද පිහිටමින් දැලිසක් සාදයි. ප්‍රබල ස්ථිති විද්‍යුත් ආකර්ෂණ බල නිසා ඉහළ ද්‍රවාංකයක් (801 °C) පවතී.";
          } else if (activeTab === "allotropes-3d") {
            readout.innerHTML = "<strong>ක්‍රියාකාරකම 10.4 — දියමන්ති දැලිස:</strong> සෑම කාබන් පරමාණුවක්ම තවත් C පරමාණු 4ක් සමග සහසංයුජ බන්ධන සාදයි. නිදහස් ඉලෙක්ට්‍රෝන නොමැති නිසා විද්‍යුතය සන්නයනය නොකරයි (මිනිරන්වල නිදහස් ඉලෙක්ට්‍රෝන ඇති බැවින් සන්නයනය කරයි).";
          } else if (activeTab === "covalent-polar") {
            readout.innerHTML = "<strong>ක්‍රියාකාරකම 10.2 — H₂O ධ්‍රැවීය සහසංයුජ අණුව:</strong> ඔක්සිජන්හි ඉහළ විද්‍යුත් ඍණතාව නිසා ඉලෙක්ට්‍රෝන යුගල O දෙසට ඇදී Oδ⁻ හා Hδ⁺ ලෙස ධ්‍රැවීකරණය වේ. මේ නිසා අණු අතර හයිඩ්‍රජන් බන්ධන හටගනී.";
          }

          requestAnimationFrame(animate);
        }
        animate();
      }
    },

    // =========================================================================
    // LESSON 11: සජීවීව පැද්දෙන බල ඝූර්ණ සමතුලිත දණ්ඩ (F₁d₁ = F₂d₂)
    // =========================================================================
    sim_l11_moments: {
      lessonId: 11,
      title: "ක්‍රියාකාරකම් 11.1–11.3 සිමියුලේෂන්: බල ඝූර්ණය, සමතුලිත දණ්ඩ (F₁d₁ = F₂d₂) සහ ලීවර Virtual Lab",
      badge: "පාඩම 11 • බල ඝූර්ණය හා ලීවර",
      desc: "බල ඝූර්ණ මූලධර්මය, විවර්තනය වටා සමතුලිතතාව සහ පළමු, දෙවන, තෙවන පෙළ ලීවර සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="moment-balance">⚖️ ක්‍රියාකාරකම 11.2: බල ඝූර්ණ මූලධර්මය (F₁d₁ = F₂d₂)</button>
              <button class="vlab-tab-btn" data-subtab="moment-def">📐 ක්‍රියාකාරකම 11.1: බල ඝූර්ණය (T = F × d)</button>
              <button class="vlab-tab-btn" data-subtab="lever-classes">🔧 ක්‍රියාකාරකම 11.3: ලීවර වර්ග (1, 2, 3 වන පෙළ)</button>
            </div>

            <!-- TAB 1: MOMENT BALANCE BEAM -->
            <div class="vlab-panel active" data-panel="moment-balance">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>වම් බලය (F₁): <span data-role="f1-val">10</span> N</label>
                  <input type="range" min="2" max="20" step="2" value="10" data-role="f1-in" />
                </div>
                <div class="sim-control-group">
                  <label>වම් දුර (d₁): <span data-role="d1-val">0.4</span> m</label>
                  <input type="range" min="0.1" max="0.5" step="0.1" value="0.4" data-role="d1-in" />
                </div>
                <div class="sim-control-group">
                  <label>දකුණු බලය (F₂): <span data-role="f2-val">8</span> N</label>
                  <input type="range" min="2" max="20" step="2" value="8" data-role="f2-in" />
                </div>
                <div class="sim-control-group">
                  <label>දකුණු දුර (d₂): <span data-role="d2-val">0.5</span> m</label>
                  <input type="range" min="0.1" max="0.5" step="0.1" value="0.5" data-role="d2-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="520" height="195" data-role="canvas-beam"></canvas>
                <div class="sim-readout" data-role="readout-beam"></div>
              </div>
            </div>

            <!-- TAB 2: MOMENT DEFINITION -->
            <div class="vlab-panel" data-panel="moment-def" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>යොදන බලය (F): <span data-role="f-def-val">15</span> N</label>
                  <input type="range" min="5" max="30" step="5" value="15" data-role="f-def-in" />
                </div>
                <div class="sim-control-group">
                  <label>විවර්තනයේ සිට ලම්බ දුර (d): <span data-role="d-def-val">0.3</span> m</label>
                  <input type="range" min="0.1" max="0.6" step="0.1" value="0.3" data-role="d-def-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="520" height="195" data-role="canvas-def"></canvas>
                <div class="sim-readout" data-role="readout-def"></div>
              </div>
            </div>

            <!-- TAB 3: LEVER CLASSES -->
            <div class="vlab-panel" data-panel="lever-classes" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ලීවර වර්ගය තෝරන්න:</label>
                  <select class="sim-select" data-role="lever-sel">
                    <option value="1">පළමු පෙළ ලීවරය (ආධාරකය මැද - කතුර, අඬුව, තුලා දණ්ඩ)</option>
                    <option value="2">දෙවන පෙළ ලීවරය (භාරය මැද - අත් කරත්තය, බෝතල් ඇබ මුද්‍රණය)</option>
                    <option value="3">තෙවන පෙළ ලීවරය (ආයාසය මැද - මිනිස් අත, අඟුරු අඬුව, කොස්ස)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="520" height="195" data-role="canvas-lever"></canvas>
                <div class="sim-readout" data-role="readout-lever"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "moment-balance";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "moment-def") switchTab("moment-def");
          else if (e.detail === "lever-classes" || e.detail === "levers") switchTab("lever-classes");
          else switchTab("moment-balance");
        });

        // Tab 1: Beam
        const f1In = root.querySelector('[data-role="f1-in"]');
        const d1In = root.querySelector('[data-role="d1-in"]');
        const f2In = root.querySelector('[data-role="f2-in"]');
        const d2In = root.querySelector('[data-role="d2-in"]');
        const cvBeam = root.querySelector('[data-role="canvas-beam"]');
        const ctxBeam = cvBeam.getContext("2d");
        const readBeam = root.querySelector('[data-role="readout-beam"]');

        let curAngle = 0.15, angVel = 0;
        [f1In, d1In, f2In, d2In].forEach((el) => el.addEventListener("input", () => { angVel += 0.015; }));

        // Tab 2: Moment Def
        const fDefIn = root.querySelector('[data-role="f-def-in"]');
        const dDefIn = root.querySelector('[data-role="d-def-in"]');
        const cvDef = root.querySelector('[data-role="canvas-def"]');
        const ctxDef = cvDef.getContext("2d");
        const readDef = root.querySelector('[data-role="readout-def"]');

        // Tab 3: Levers
        const leverSel = root.querySelector('[data-role="lever-sel"]');
        const cvLever = root.querySelector('[data-role="canvas-lever"]');
        const ctxLever = cvLever.getContext("2d");
        const readLever = root.querySelector('[data-role="readout-lever"]');

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "moment-balance") {
            const f1 = Number(f1In.value);
            const d1 = Number(d1In.value);
            const f2 = Number(f2In.value);
            const d2 = Number(d2In.value);
            root.querySelector('[data-role="f1-val"]').textContent = f1;
            root.querySelector('[data-role="d1-val"]').textContent = d1.toFixed(1);
            root.querySelector('[data-role="f2-val"]').textContent = f2;
            root.querySelector('[data-role="d2-val"]').textContent = d2.toFixed(1);

            const mAnti = Number((f1 * d1).toFixed(2));
            const mClock = Number((f2 * d2).toFixed(2));
            const net = mClock - mAnti;
            const targetAngle = Math.max(-0.32, Math.min(0.32, net * 0.065));

            const acc = (targetAngle - curAngle) * 0.08;
            angVel = (angVel + acc) * 0.88;
            curAngle += angVel;

            ctxBeam.clearRect(0, 0, cvBeam.width, cvBeam.height);
            ctxBeam.save();
            ctxBeam.translate(260, 95);
            ctxBeam.rotate(curAngle);

            ctxBeam.fillStyle = "#f59e0b";
            ctxBeam.fillRect(-200, -7, 400, 14);

            const xL = -(d1 / 0.5) * 185;
            ctxBeam.fillStyle = "#f43f5e";
            ctxBeam.fillRect(xL - 18, 7, 36, 34);
            ctxBeam.fillStyle = "#fff";
            ctxBeam.font = "bold 11px sans-serif";
            ctxBeam.textAlign = "center";
            ctxBeam.fillText(`${f1}N`, xL, 28);

            const xR = (d2 / 0.5) * 185;
            ctxBeam.fillStyle = "#38bdf8";
            ctxBeam.fillRect(xR - 18, 7, 36, 34);
            ctxBeam.fillStyle = "#0f172a";
            ctxBeam.fillText(`${f2}N`, xR, 28);
            ctxBeam.restore();

            // Fulcrum
            ctxBeam.fillStyle = "#94a3b8";
            ctxBeam.beginPath();
            ctxBeam.moveTo(260, 102);
            ctxBeam.lineTo(240, 152);
            ctxBeam.lineTo(280, 152);
            ctxBeam.closePath();
            ctxBeam.fill();

            const status = Math.abs(net) < 0.01 ? "✅ දණ්ඩ තිරස්ව සමතුලිතයි (F₁d₁ = F₂d₂)" : net > 0 ? "↻ දක්ෂිණාවර්තව ඇලවේ" : "↺ වාමාවර්තව ඇලවේ";
            readBeam.innerHTML = `<strong>වාමාවර්ත ඝූර්ණය (F₁d₁):</strong> ${f1} × ${d1} = <strong>${mAnti} N m</strong> | <strong>දක්ෂිණාවර්ත ඝූර්ණය (F₂d₂):</strong> ${f2} × ${d2} = <strong>${mClock} N m</strong> → <strong>${status}</strong>`;
          } else if (activeTab === "moment-def") {
            ctxDef.clearRect(0, 0, cvDef.width, cvDef.height);
            const F = Number(fDefIn.value);
            const d = Number(dDefIn.value);
            root.querySelector('[data-role="f-def-val"]').textContent = F;
            root.querySelector('[data-role="d-def-val"]').textContent = d.toFixed(1);

            const torque = (F * d).toFixed(1);

            // Spanner rotating a nut
            drawSphere3D(ctxDef, 120, 100, 22, "#64748b", "විවර්තනය");

            // Spanner handle
            const handleLen = (d / 0.6) * 260;
            ctxDef.fillStyle = "#94a3b8";
            ctxDef.fillRect(135, 92, handleLen, 16);

            // Applied force arrow at end
            ctxDef.strokeStyle = "#f43f5e";
            ctxDef.lineWidth = 4;
            ctxDef.beginPath();
            ctxDef.moveTo(135 + handleLen, 92);
            ctxDef.lineTo(135 + handleLen, 35);
            ctxDef.stroke();

            // Arrow head
            ctxDef.fillStyle = "#f43f5e";
            ctxDef.beginPath();
            ctxDef.moveTo(135 + handleLen, 35);
            ctxDef.lineTo(130 + handleLen, 45);
            ctxDef.lineTo(140 + handleLen, 45);
            ctxDef.closePath();
            ctxDef.fill();

            ctxDef.fillStyle = "#fde047";
            ctxDef.font = "bold 13px sans-serif";
            ctxDef.fillText(`F = ${F} N (↑)`, 135 + handleLen, 25);

            ctxDef.fillStyle = "#38bdf8";
            ctxDef.fillText(`ලම්බ දුර d = ${d.toFixed(1)} m`, 135 + handleLen / 2, 125);

            readDef.innerHTML = `<strong>ක්‍රියාකාරකම 11.1 — බල ඝූර්ණය (Torque):</strong> බලයක ඝූර්ණය යනු බලය සහ විවර්තනයේ සිට බලයේ ක්‍රියාකාරී රේඛාවට ඇති ලම්බ දුරේ ගුණිතයයි: <strong>T = F × d = ${F} N × ${d.toFixed(1)} m = ${torque} N m</strong>. දුර (d) වැඩිවත්ම කරකැවීමේ හැකියාව වැඩිවේ.`;
          } else if (activeTab === "lever-classes") {
            ctxLever.clearRect(0, 0, cvLever.width, cvLever.height);
            const lClass = leverSel.value;

            ctxLever.strokeStyle = "#e2e8f0";
            ctxLever.lineWidth = 4;
            ctxLever.beginPath();
            ctxLever.moveTo(80, 100);
            ctxLever.lineTo(440, 100);
            ctxLever.stroke();

            if (lClass === "1") {
              // 1st Class: Fulcrum in middle (e.g. Crowbar, Scissors)
              drawSphere3D(ctxLever, 260, 115, 14, "#f59e0b", "ආධාරකය (F)");
              drawSphere3D(ctxLever, 110, 80, 14, "#ef4444", "භාරය (L)");
              drawSphere3D(ctxLever, 410, 80, 14, "#38bdf8", "ආයාසය (E)");
              readLever.innerHTML = "<strong>පළමු පෙළ ලීවරය (1st Class):</strong> <strong>ආධාරකය (Fulcrum) මධ්‍යයේ</strong> පිහිටයි. භාරය හා ආයාසය දෙපස පිහිටයි. උදාහරණ: කතුර, අඬුව, තුලා දණ්ඩ, කීලපැල්ල.";
            } else if (lClass === "2") {
              // 2nd Class: Load in middle (e.g. Wheelbarrow, Nutcracker)
              drawSphere3D(ctxLever, 95, 115, 14, "#f59e0b", "ආධාරකය (F)");
              drawSphere3D(ctxLever, 260, 80, 14, "#ef4444", "භාරය (L)");
              drawSphere3D(ctxLever, 420, 80, 14, "#38bdf8", "ආයාසය (E)");
              readLever.innerHTML = "<strong>දෙවන පෙළ ලීවරය (2nd Class):</strong> <strong>භාරය (Load) මධ්‍යයේ</strong> පිහිටයි. යාන්ත්‍රික වාසිය සෑමවිටම 1 ට වඩා වැඩිය (MA > 1). උදාහරණ: අත් කරත්තය, පුවක් ගිරය, බෝතල් ඇබ මුද්‍රණය.";
            } else {
              // 3rd Class: Effort in middle (e.g. Tweezer, Broom, Forearm)
              drawSphere3D(ctxLever, 95, 115, 14, "#f59e0b", "ආධාරකය (F)");
              drawSphere3D(ctxLever, 260, 80, 14, "#38bdf8", "ආයාසය (E)");
              drawSphere3D(ctxLever, 420, 80, 14, "#ef4444", "භාරය (L)");
              readLever.innerHTML = "<strong>තෙවන පෙළ ලීවරය (3rd Class):</strong> <strong>ආයාසය (Effort) මධ්‍යයේ</strong> පිහිටයි. යාන්ත්‍රික වාසිය 1 ට වඩා අඩුය (MA < 1) නමුත් චලන වේගය වැඩි කරයි. උදාහරණ: මිනිස් පෙරබාහුව, අඟුරු අඬුව, කොස්ස.";
            }
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 12: ඒකතල සමාන්තර හා ආනත බල 3ක සමතුලිතතා පරීක්ෂණාගාරය
    // =========================================================================
    sim_l12_equilibrium: {
      lessonId: 12,
      title: "ක්‍රියාකාරකම් 12.1–12.3 සිමියුලේෂන්: ඒකතල බල තුනක සමතුලිතතා පරීක්ෂණාගාරය",
      badge: "පාඩම 12 • බල සමතුලිතතාව",
      desc: "ආනත ඒකලක්ෂ්‍යීය බල 3ක සමතුලිතතාව (කප්පි පුවරුව), සමාන්තර බල 3ක සමතුලිතතාව සහ බල ත්‍රිකෝණ නියමය සජීවීව පරීක්ෂා කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="inclined">🎯 ක්‍රියාකාරකම 12.2: ආනත ඒකලක්ෂ්‍යීය බල 3ක් (කප්පි පුවරුව)</button>
              <button class="vlab-tab-btn" data-subtab="parallel">⚖️ ක්‍රියාකාරකම 12.3: සමාන්තර බල 3ක සමතුලිතතාව (F₁ + F₂ = W)</button>
              <button class="vlab-tab-btn" data-subtab="triangle">📐 ක්‍රියාකාරකම 12.1: බල ත්‍රිකෝණ නියමය (Vector Triangle)</button>
            </div>

            <div class="sim-controls">
              <div class="sim-control-group">
                <label>මැද එල්ලූ බර (W): <span data-role="w-val">40</span> N</label>
                <input type="range" min="20" max="70" step="5" value="40" data-role="w-in" />
              </div>
              <div class="sim-control-group">
                <label>වම් ආතති බලය (F₁): <span data-role="f1-val">25</span> N</label>
                <input type="range" min="10" max="50" step="5" value="25" data-role="f1-in" />
              </div>
            </div>
            <div class="sim-stage">
              <canvas class="sim-canvas" width="540" height="210" data-role="canvas"></canvas>
              <div class="sim-readout" data-role="readout"></div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        let activeTab = "inclined";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "parallel") switchTab("parallel");
          else if (e.detail === "triangle") switchTab("triangle");
          else switchTab("inclined");
        });

        const wIn = root.querySelector('[data-role="w-in"]');
        const f1In = root.querySelector('[data-role="f1-in"]');
        const canvas = root.querySelector('[data-role="canvas"]');
        const ctx = canvas.getContext("2d");
        const readout = root.querySelector('[data-role="readout"]');

        let phase = 0;
        function loop() {
          if (!document.body.contains(canvas)) return;
          phase += 0.04;
          const W = Number(wIn.value);
          const F1 = Number(f1In.value);
          root.querySelector('[data-role="w-val"]').textContent = W;
          root.querySelector('[data-role="f1-val"]').textContent = F1;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (activeTab === "inclined") {
            const ringX = 270 + (25 - F1) * 1.4;
            const ringY = 95 + (W - 40) * 0.9 + Math.sin(phase) * 1.5;

            // Pulleys at top left & top right
            drawSphere3D(ctx, 110, 42, 14, "#f59e0b", "");
            drawSphere3D(ctx, 430, 42, 14, "#f59e0b", "");

            // Strings meeting at central ring
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            ctx.moveTo(110, 42);
            ctx.lineTo(ringX, ringY);
            ctx.lineTo(430, 42);
            ctx.moveTo(ringX, ringY);
            ctx.lineTo(ringX, 165);
            ctx.stroke();

            // Central ring
            drawSphere3D(ctx, ringX, ringY, 9, "#f43f5e", "O");

            // Hanging weights
            ctx.fillStyle = "#10b981";
            ctx.fillRect(ringX - 20, 165, 40, 30);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`W=${W}N`, ringX, 184);

            readout.innerHTML = `<strong>ක්‍රියාකාරකම 12.2 (ආනත බල 3ක සමතුලිතතාව):</strong> (1) බල තුන <strong>ඒකතල</strong> විය යුතුය. (2) ක්‍රියා රේඛා තුනම එකම <strong>O ලක්ෂ්‍යයේදී හමුවිය යුතුය (ඒකලක්ෂ්‍යීය)</strong>. (3) ඕනෑම බල දෙකක සම්ප්‍රයුක්තය තුන්වන බලයට සමාන හා ප්‍රතිවිරුද්ධ වේ.`;
          } else if (activeTab === "parallel") {
            const F2 = Math.max(5, W - F1);
            const bob = Math.sin(phase) * 1.5;

            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(160, 25);
            ctx.lineTo(160, 110 + bob);
            ctx.moveTo(380, 25);
            ctx.lineTo(380, 110 + bob);
            ctx.stroke();

            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(130, 110 + bob, 280, 16);

            ctx.fillStyle = "#f43f5e";
            ctx.fillRect(245, 126 + bob, 50, 36);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`W=${W}N`, 270, 148 + bob);
            ctx.fillStyle = "#fde047";
            ctx.fillText(`F₁ = ${F1} N (↑)`, 160, 70);
            ctx.fillText(`F₂ = ${F2} N (↑)`, 380, 70);

            readout.innerHTML = `<strong>ක්‍රියාකාරකම 12.3 (සමාන්තර බල 3ක සමතුලිතතාව):</strong> උඩුකුරු F₁ හා F₂ බල දෙකේ එකතුව (<strong>${F1} + ${F2} = ${F1 + F2} N</strong>) යටිකුරු බරට (<strong>W = ${W} N</strong>) විශාලත්වයෙන් සමාන වේ (F₁ + F₂ = W).`;
          } else {
            // Vector Triangle
            ctx.strokeStyle = "#2dd4bf";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(180, 160);
            ctx.lineTo(360, 160);
            ctx.lineTo(270, 45);
            ctx.closePath();
            ctx.stroke();

            drawSphere3D(ctx, 270, 160, 6, "#38bdf8", "F₁");
            drawSphere3D(ctx, 315, 102, 6, "#f43f5e", "F₂");
            drawSphere3D(ctx, 225, 102, 6, "#facc15", "W");

            readout.innerHTML = `<strong>බල ත්‍රිකෝණ නියමය:</strong> ඒකතල ආනත බල තුනක් යටතේ වස්තුවක් සමතුලිත වන්නේ නම්, එම බල තුන විශාලත්වයෙන් හා දිශාවෙන් <strong>අනුපිළිවෙළින් ගත් සංවෘත ත්‍රිකෝණයක පාද මගින් නිරූපණය කළ හැක</strong>.`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 13: සජීවී දෙබෙදුම් සුචිය (Dichotomous Key) හා ජීවී වර්ගීකරණය
    // =========================================================================
    sim_l13_taxonomy_key: {
      lessonId: 13,
      title: "ක්‍රියාකාරකම් 13.1–13.4 සිමියුලේෂන්: දෙබෙදුම් සුචිය, ශාක හා සත්ත්ව වර්ගීකරණය",
      badge: "පාඩම 13 • දෙබෙදුම් සුචිය හා වර්ගීකරණය",
      desc: "අන්තර්ක්‍රියාකාරී දෙබෙදුම් සුචිය, ඒකබීජපත්‍රී/ද්විබීජපත්‍රී ශාක ලක්ෂණ සහ පෘෂ්ඨවංශී සතුන් කාණ්ඩ 5 සජීවීව ගවේෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="dichot-key">🌿 ක්‍රියාකාරකම 13.2: සජීවී දෙබෙදුම් සුචිය (Key)</button>
              <button class="vlab-tab-btn" data-subtab="plant-types">🌾 ක්‍රියාකාරකම 13.3: ඒකබීජ vs ද්විබීජපත්‍රී ශාක</button>
              <button class="vlab-tab-btn" data-subtab="animal-types">🐾 ක්‍රියාකාරකම 13.4: පෘෂ්ඨවංශී සතුන් කාණ්ඩ 5</button>
            </div>

            <!-- TAB 1: DICHOTOMOUS KEY -->
            <div class="vlab-panel active" data-panel="dichot-key">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ජීවියා තෝරන්න:</label>
                  <select class="sim-select" data-role="org-sel">
                    <option value="dicot">අඹ ගස (Mangifera indica) — ද්විබීජපත්‍රී සපුෂ්ප ශාක</option>
                    <option value="monocot">පොල් ගස (Cocos nucifera) — ඒකබීජපත්‍රී සපුෂ්ප ශාක</option>
                    <option value="cycas">මඩු ශාකය (Cycas) — විවෘත බීජක අපුෂ්ප ශාක</option>
                    <option value="human">මිනිසා (Homo sapiens) — මැමේලියා වර්ගය</option>
                    <option value="arthropoda">සමනලයා — ආත්‍රොපෝඩා වංශය (අපෘෂ්ඨවංශී)</option>
                    <option value="cnidaria">හයිඩ්‍රා (Hydra) — නිඩාරියා වංශය</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="205" data-role="canvas-key"></canvas>
                <div class="sim-readout" data-role="readout-key"></div>
              </div>
            </div>

            <!-- TAB 2: PLANTS -->
            <div class="vlab-panel" data-panel="plant-types" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ශාක කාණ්ඩය සංසන්දනය:</label>
                  <select class="sim-select" data-role="plant-sel">
                    <option value="mono">ඒකබීජපත්‍රී (Monocotyledon) — උදා: වී, පොල්, තණකොළ</option>
                    <option value="di">ද්විබීජපත්‍රී (Dicotyledon) — උදා: අඹ, කොස්, බෝංචි</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="205" data-role="canvas-plant"></canvas>
                <div class="sim-readout" data-role="readout-plant"></div>
              </div>
            </div>

            <!-- TAB 3: ANIMALS -->
            <div class="vlab-panel" data-panel="animal-types" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>පෘෂ්ඨවංශී කාණ්ඩය:</label>
                  <select class="sim-select" data-role="vert-sel">
                    <option value="pisces">1. පිස්කේස් (මත්ස්‍යයින්) — කරමල්, කොරල, වරල්</option>
                    <option value="amphibia">2. ඇම්ෆිබියා (උභයජීවීන්) — තෙත් සම, ජලජ පිලා අවස්ථාව</option>
                    <option value="reptilia">3. රෙප්ටීලියා (උරගයින්) — වියළි කොරල සම, බිත්තර දැමීම</option>
                    <option value="aves">4. ඒවීස් (පක්ෂීන්) — පිහාටු, හොට, වාත කුටීර අස්ථි</option>
                    <option value="mammalia">5. මැමේලියා (ක්ෂීරපායීන්) — ක්ෂීර ග්‍රන්ථි, සමේ රෝම, බාහිර කන්පෙති</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="205" data-role="canvas-vert"></canvas>
                <div class="sim-readout" data-role="readout-vert"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "dichot-key";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "plant-types") switchTab("plant-types");
          else if (e.detail === "animal-types") switchTab("animal-types");
          else switchTab("dichot-key");
        });

        // Tab 1: Key
        const selKey = root.querySelector('[data-role="org-sel"]');
        const cvKey = root.querySelector('[data-role="canvas-key"]');
        const ctxKey = cvKey.getContext("2d");
        const readKey = root.querySelector('[data-role="readout-key"]');

        const PATHS = {
          dicot: {
            steps: ["ඉයුකැරියා අධිරාජධානිය", "ප්ලාන්ටේ (පුෂ්ප හටගනී)", "ද්විබීජපත්‍රී (බීජ පත්‍ර 2, ජාලාභ නාරටි)", "අඹ (Mangifera indica) 🥭"],
            info: "<strong>අඹ (<em>Mangifera indica</em>) — ද්විබීජපත්‍රී ශාක:</strong> බීජ පත්‍ර 2කි, මුදුන් මුල සහිත මූල පද්ධතිය, ජාලාභ නාරටි වින්‍යාසය, අතු බෙදුණු කඳ සහ චතුර්/පංචාංක පුෂ්ප දරයි."
          },
          monocot: {
            steps: ["ඉයුකැරියා අධිරාජධානිය", "ප්ලාන්ටේ (පුෂ්ප හටගනී)", "ඒකබීජපත්‍රී (බීජ පත්‍ර 1, සමාන්තර නාරටි)", "පොල් (Cocos nucifera) 🥥"],
            info: "<strong>පොල් (<em>Cocos nucifera</em>) — ඒකබීජපත්‍රී ශාක:</strong> බීජ පත්‍ර 1කි, තන්තු මූල පද්ධතිය, සමාන්තර නාරටි වින්‍යාසය, අතු නොබෙදුණු කඳ සහ ත්‍රී අංකී පුෂ්ප දරයි."
          },
          cycas: {
            steps: ["ඉයුකැරියා අධිරාජධානිය", "ප්ලාන්ටේ (අපුෂ්ප ශාක)", "බීජ හටගන්නා (විවෘත බීජක)", "මඩු ශාකය (Cycas) 🌿"],
            info: "<strong>මඩු (<em>Cycas</em>):</strong> පුෂ්ප හට නොගන්නා නමුත් <strong>නග්න බීජ (විවෘත බීජ)</strong> හටගන්නා සනාල අපුෂ්ප ශාකයකි."
          },
          human: {
            steps: ["ඉයුකැරියා අධිරාජධානිය", "ඇනිමේලියා (පෘෂ්ඨවංශීන්)", "මැමේලියා (ක්ෂීරපායී, අචලතාපී)", "මිනිසා (Homo sapiens) 🧑"],
            info: "<strong>මිනිසා (<em>Homo sapiens</em>):</strong> ස්තන ග්‍රන්ථි, සමේ රෝම, බාහිර කන්පෙති, කුටීර 4ක හෘදයක් සහ පෙනහැලි මගින් ශ්වසනය සිදු කරයි."
          },
          arthropoda: {
            steps: ["ඉයුකැරියා අධිරාජධානිය", "ඇනිමේලියා (අපෘෂ්ඨවංශීන්)", "සන්ධි සහිත උපාංග හා කයිටින් බහිඃසැකිල්ල", "සමනලයා (ආත්‍රොපෝඩා) 🦋"],
            info: "<strong>ආත්‍රොපෝඩා වංශය:</strong> සත්ත්ව ලෝකයේ විශාලතම වංශයයි. සන්ධි සහිත උපාංග සහ කයිටින්මය බහිඃසැකිල්ලක් දරයි."
          },
          cnidaria: {
            steps: ["ඉයුකැරියා අධිරාජධානිය", "ඇනිමේලියා (අපෘෂ්ඨවංශීන්)", "ද්විප්‍රස්තරී, අරීය සමමිතිය හා දංශක සෛල", "හයිඩ්‍රා (නිඩාරියා) 🌊"],
            info: "<strong>නිඩාරියා වංශය:</strong> ද්විප්‍රස්තරී, අරීය සමමිතික ජලජ සතුන් ය. ගොදුරු අල්ලා ගැනීමට <strong>දංශක කෝෂ්ඨ</strong> දරයි."
          }
        };

        // Tab 2: Plants
        const plantSel = root.querySelector('[data-role="plant-sel"]');
        const cvPlant = root.querySelector('[data-role="canvas-plant"]');
        const ctxPlant = cvPlant.getContext("2d");
        const readPlant = root.querySelector('[data-role="readout-plant"]');

        // Tab 3: Animals
        const vertSel = root.querySelector('[data-role="vert-sel"]');
        const cvVert = root.querySelector('[data-role="canvas-vert"]');
        const ctxVert = cvVert.getContext("2d");
        const readVert = root.querySelector('[data-role="readout-vert"]');

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "dichot-key") {
            const item = PATHS[selKey.value];
            readKey.innerHTML = item.info;

            ctxKey.clearRect(0, 0, cvKey.width, cvKey.height);
            item.steps.forEach((txt, idx) => {
              const y = 26 + idx * 45;
              const w = 360;
              const x = 90;
              ctxKey.fillStyle = idx === 3 ? "rgba(16, 185, 129, 0.25)" : "rgba(30, 41, 59, 0.9)";
              ctxKey.strokeStyle = idx === 3 ? "#10b981" : "#38bdf8";
              ctxKey.lineWidth = idx === 3 ? 2.5 : 1.5;
              ctxKey.beginPath();
              ctxKey.roundRect(x, y, w, 30, 8);
              ctxKey.fill();
              ctxKey.stroke();

              ctxKey.fillStyle = "#f8fafc";
              ctxKey.font = "bold 12px sans-serif";
              ctxKey.textAlign = "center";
              ctxKey.fillText(`${idx + 1}. ${txt}`, x + w / 2, y + 19);

              if (idx < 3) {
                ctxKey.strokeStyle = "#fde047";
                ctxKey.lineWidth = 2;
                ctxKey.beginPath();
                ctxKey.moveTo(270, y + 30);
                ctxKey.lineTo(270, y + 45);
                ctxKey.stroke();
              }
            });
          } else if (activeTab === "plant-types") {
            ctxPlant.clearRect(0, 0, cvPlant.width, cvPlant.height);
            const isMono = plantSel.value === "mono";

            ctxPlant.fillStyle = "#1e293b";
            ctxPlant.roundRect(40, 25, 460, 155, 12);
            ctxPlant.fill();
            ctxPlant.strokeStyle = isMono ? "#38bdf8" : "#4ade80";
            ctxPlant.lineWidth = 2;
            ctxPlant.stroke();

            ctxPlant.fillStyle = isMono ? "#38bdf8" : "#4ade80";
            ctxPlant.font = "bold 14px sans-serif";
            ctxPlant.textAlign = "center";
            ctxPlant.fillText(isMono ? "🌾 ඒකබීජපත්‍රී ශාක ලක්ෂණ" : "🌳 ද්විබීජපත්‍රී ශාක ලක්ෂණ", 270, 55);

            ctxPlant.fillStyle = "#f8fafc";
            ctxPlant.font = "12px sans-serif";
            ctxPlant.textAlign = "left";
            if (isMono) {
              ctxPlant.fillText("• බීජ පත්‍ර: 1කි (උදා: වී, බඩඉරිඟු)", 70, 90);
              ctxPlant.fillText("• පත්‍ර නාරටි: සමාන්තර නාරටි වින්‍යාසය", 70, 115);
              ctxPlant.fillText("• මූල පද්ධතිය: තන්තු මූල පද්ධතිය", 70, 140);
              ctxPlant.fillText("• පුෂ්ප කොටස්: ත්‍රී අංකී (3 හෝ 3 ගුණාකාර)", 70, 165);
              readPlant.innerHTML = "<strong>ක්‍රියාකාරකම 13.3 (ඒකබීජපත්‍රී ශාක):</strong> සමාන්තර නාරටි වින්‍යාසය, තන්තු මුල්, අතු නොබෙදුණු කඳ සහ බීජ පත්‍ර 1ක් සහිත සපුෂ්ප ශාක වේ.";
            } else {
              ctxPlant.fillText("• බීජ පත්‍ර: 2කි (උදා: අඹ, කොස්, බෝංචි)", 70, 90);
              ctxPlant.fillText("• පත්‍ර නාරටි: ජාලාභ නාරටි වින්‍යාසය", 70, 115);
              ctxPlant.fillText("• මූල පද්ධතිය: මුදුන් මුල් පද්ධතිය", 70, 140);
              ctxPlant.fillText("• පුෂ්ප කොටස්: චතුර් හෝ පංචාංක (4, 5 ගුණාකාර)", 70, 165);
              readPlant.innerHTML = "<strong>ක්‍රියාකාරකම 13.3 (ද්විබීජපත්‍රී ශාක):</strong> ජාලාභ නාරටි වින්‍යාසය, මුදුන් මුල් පද්ධතිය, අතු බෙදුණු ශක්තිමත් කඳ සහ බීජ පත්‍ර 2ක් දරයි.";
            }
          } else if (activeTab === "animal-types") {
            ctxVert.clearRect(0, 0, cvVert.width, cvVert.height);
            const v = vertSel.value;
            const DATA = {
              pisces: ["🐟 පිස්කේස් (Pisces - මත්ස්‍යයින්)", "කරමල් මගින් ශ්වසනය, කොරල සහිත සම, වරල් මගින් පිහිනීම, කුටීර 2ක හෘදය, විචල්‍යතාපී."],
              amphibia: ["🐸 ඇම්ෆිබියා (Amphibia - උභයජීවීන්)", "තෙත් සම, පිලා අවස්ථාවේ කරමල් & වැඩුණු පසු පෙනහැලි/සමෙන් ශ්වසනය, කුටීර 3ක හෘදය, විචල්‍යතාපී."],
              reptilia: ["🦎 රෙප්ටීලියා (Reptilia - උරගයින්)", "වියළි කොරල සහිත සම, පෙනහැලි මගින් ශ්වසනය, අසම්පූර්ණ කුටීර 4ක හෘදය, විචල්‍යතාපී, කවච සහිත බිත්තර."],
              aves: ["🦅 ඒවීස් (Aves - පක්ෂීන්)", "පිහාටු සහිත සම, ඉදිරි ගාත්‍රා පියාපත් වී ඇත, වායු කුටීර අස්ථි, කුටීර 4ක හෘදය, අචලතාපී."],
              mammalia: ["🐘 මැමේලියා (Mammalia - ක්ෂීරපායීන්)", "ක්ෂීර ග්‍රන්ථි, සමේ රෝම, බාහිර කන්පෙති, කුටීර 4ක හෘදය, අචලතාපී, සජීවීව පැටවුන් බිහිකිරීම."]
            };

            ctxVert.fillStyle = "#1e293b";
            ctxVert.roundRect(40, 30, 460, 145, 12);
            ctxVert.fill();
            ctxVert.strokeStyle = "#38bdf8";
            ctxVert.stroke();

            ctxVert.fillStyle = "#facc15";
            ctxVert.font = "bold 15px sans-serif";
            ctxVert.textAlign = "center";
            ctxVert.fillText(DATA[v][0], 270, 70);

            ctxVert.fillStyle = "#e2e8f0";
            ctxVert.font = "13px sans-serif";
            ctxVert.fillText(DATA[v][1], 270, 115);

            readVert.innerHTML = `<strong>ක්‍රියාකාරකම 13.4 — පෘෂ්ඨවංශී සතුන්:</strong> කොඳු ඇට පෙළක් සහිත කෝඩේටා වංශිකයන් කාණ්ඩ 5 කට බෙදේ. <strong>${DATA[v][0]}</strong>: ${DATA[v][1]}`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 14: පරාග නාල වර්ධනය සහ දින 28 ආර්තව චක්‍ර හෝර්මෝන සිමියුලේටරය
    // =========================================================================
    sim_l14_flower_repro: {
      lessonId: 14,
      title: "ක්‍රියාකාරකම් 14.1–14.4 සිමියුලේෂන්: පුෂ්ප විච්ඡේදනය, පරාග නාල වර්ධනය සහ ආර්තව චක්‍ර හෝර්මෝන",
      badge: "පාඩම 14 • ශාක හා මානව ප්‍රජනනය",
      desc: "පුෂ්පයක කොටස් විච්ඡේදනය, කලංකය මත පරාග නාලය වර්ධනය වීම සහ මානව ආර්තව චක්‍රයේ දින 28 හෝර්මෝන ප්‍රස්තාරය සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="pollen-tube">🌺 ක්‍රියාකාරකම් 14.2–14.3: පරාග නාල වර්ධනය හා සංසේචනය</button>
              <button class="vlab-tab-btn" data-subtab="flower-dissect">🔬 ක්‍රියාකාරකම 14.1: පුෂ්පයක කොටස් විච්ඡේදනය</button>
              <button class="vlab-tab-btn" data-subtab="menstrual">📈 ක්‍රියාකාරකම 14.4: මානව ආර්තව චක්‍ර හෝර්මෝන (දින 1–28)</button>
            </div>

            <!-- TAB 1: POLLEN TUBE -->
            <div class="vlab-panel active" data-panel="pollen-tube">
              <div class="sim-controls">
                <button class="sim-btn" data-role="pollinate-btn">🌱 නැවත පරාගණය කරන්න (Re-Pollinate)</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-pollen"></canvas>
                <div class="sim-readout" data-role="readout-pollen"></div>
              </div>
            </div>

            <!-- TAB 2: FLOWER DISSECTION -->
            <div class="vlab-panel" data-panel="flower-dissect" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>පුෂ්ප කොටස තෝරන්න:</label>
                  <select class="sim-select" data-role="part-sel">
                    <option value="calyx">1. මනි පත්‍ර (Sepals / Calyx) — පුෂ්ප මකුළ ආරක්ෂාව</option>
                    <option value="corolla">2. දල පත්‍ර (Petals / Corolla) — කෘමීන් ආකර්ෂණය</option>
                    <option value="androecium">3. කේසර (Stamens / Androecium) — පුමිතිරිය (පරාගධානිය + දණ්ඩ)</option>
                    <option value="gynoecium">4. ජායාංගය (Carpel / Gynoecium) — කලංකය, කීලය, ඩිම්බකෝෂය</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-flower"></canvas>
                <div class="sim-readout" data-role="readout-flower"></div>
              </div>
            </div>

            <!-- TAB 3: MENSTRUAL CYCLE -->
            <div class="vlab-panel" data-panel="menstrual" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>චක්‍රයේ දිනය: <span data-role="day-val">14</span></label>
                  <input type="range" min="1" max="28" step="1" value="14" data-role="day-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-menstrual"></canvas>
                <div class="sim-readout" data-role="readout-menstrual"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "pollen-tube";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "flower-dissect") switchTab("flower-dissect");
          else if (e.detail === "menstrual") switchTab("menstrual");
          else switchTab("pollen-tube");
        });

        // Tab 1: Pollen
        const polBtn = root.querySelector('[data-role="pollinate-btn"]');
        const cvPol = root.querySelector('[data-role="canvas-pollen"]');
        const ctxPol = cvPol.getContext("2d");
        const readPol = root.querySelector('[data-role="readout-pollen"]');
        let anim = 0;
        polBtn.addEventListener("click", () => { anim = 0; });

        // Tab 2: Flower parts
        const partSel = root.querySelector('[data-role="part-sel"]');
        const cvFlower = root.querySelector('[data-role="canvas-flower"]');
        const ctxFlower = cvFlower.getContext("2d");
        const readFlower = root.querySelector('[data-role="readout-flower"]');

        // Tab 3: Menstrual
        const dayIn = root.querySelector('[data-role="day-in"]');
        const dayVal = root.querySelector('[data-role="day-val"]');
        const cvMen = root.querySelector('[data-role="canvas-menstrual"]');
        const ctxMen = cvMen.getContext("2d");
        const readMen = root.querySelector('[data-role="readout-menstrual"]');

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "pollen-tube") {
            anim = (anim + 0.008) % 1;
            ctxPol.clearRect(0, 0, cvPol.width, cvPol.height);

            // Carpel (Stigma, Style, Ovary, Ovule)
            ctxPol.strokeStyle = "#22c55e";
            ctxPol.lineWidth = 3;
            ctxPol.beginPath();
            ctxPol.moveTo(245, 35);
            ctxPol.lineTo(258, 120);
            ctxPol.bezierCurveTo(215, 135, 215, 195, 270, 195);
            ctxPol.bezierCurveTo(325, 195, 325, 135, 282, 120);
            ctxPol.lineTo(295, 35);
            ctxPol.stroke();

            // Ovule inside ovary
            drawSphere3D(ctxPol, 270, 162, 22, "#15803d", "ඩිම්බය");

            // Pollen grain on stigma & animated pollen tube growing down to ovule
            drawSphere3D(ctxPol, 270, 32, 7, "#facc15", "");
            const tubeLen = anim * 128;
            ctxPol.strokeStyle = "#fde047";
            ctxPol.lineWidth = 3.5;
            ctxPol.beginPath();
            ctxPol.moveTo(270, 35);
            ctxPol.lineTo(270, 35 + tubeLen);
            ctxPol.stroke();

            // Male gamete moving down the pollen tube
            drawSphere3D(ctxPol, 270, 35 + tubeLen, 5, "#f43f5e", "");

            ctxPol.fillStyle = "#f8fafc";
            ctxPol.font = "bold 12px sans-serif";
            ctxPol.textAlign = "left";
            ctxPol.fillText("1. කලංකය මත පරාග කණිකාව පතිත වීම (පරාගණය)", 315, 48);
            ctxPol.fillText("2. කීලය ඔස්සේ පරාග නාලය වර්ධනය වීම", 315, 95);
            ctxPol.fillStyle = "#fde047";
            ctxPol.fillText("3. ඩිම්බය සංසේචනය → බීජය & ඩිම්බකෝෂය → ඵලය", 315, 165);

            readPol.innerHTML = "<strong>ක්‍රියාකාරකම් 14.2–14.3:</strong> පරාග කණිකාව කලංකය මතදී පැණි වැනි ස්‍රාවය උරාගෙන ප්‍රරෝහණය වේ. <strong>පරාග නාලය</strong> කීලය ඔස්සේ ඩිම්බකෝෂය තුළ ඇති ඩිම්බය වෙත වර්ධනය වී පුරුෂ ජන්මාණුව මගින් ඩිම්බ සෛලය සංසේචනය කරයි.";
          } else if (activeTab === "flower-dissect") {
            ctxFlower.clearRect(0, 0, cvFlower.width, cvFlower.height);
            const part = partSel.value;

            ctxFlower.fillStyle = "#1e293b";
            ctxFlower.roundRect(40, 25, 460, 155, 12);
            ctxFlower.fill();
            ctxFlower.strokeStyle = "#38bdf8";
            ctxFlower.stroke();

            if (part === "calyx") {
              ctxFlower.fillStyle = "#22c55e";
              ctxFlower.font = "bold 15px sans-serif";
              ctxFlower.textAlign = "center";
              ctxFlower.fillText("මනි පත්‍ර (Sepals / Calyx)", 270, 60);
              ctxFlower.fillStyle = "#e2e8f0";
              ctxFlower.font = "13px sans-serif";
              ctxFlower.fillText("• හරිත පැහැති පත්‍ර වැනි ව්‍යුහයන් වේ.", 270, 100);
              ctxFlower.fillText("• ප්‍රධාන කාර්යය: මල් පොහොට්ටුව (මකුළ) යාන්ත්‍රික හානිවලින් ආරක්ෂා කිරීම.", 270, 130);
              readFlower.innerHTML = "<strong>ක්‍රියාකාරකම 14.1 (මනි පත්‍ර):</strong> පුෂ්පයක පිටතින්ම ඇති වෘන්තයයි. පොහොට්ටු අවස්ථාවේදී අභ්‍යන්තර සියලු කොටස් ආරක්ෂා කරයි.";
            } else if (part === "corolla") {
              ctxFlower.fillStyle = "#f43f5e";
              ctxFlower.font = "bold 15px sans-serif";
              ctxFlower.textAlign = "center";
              ctxFlower.fillText("දල පත්‍ර (Petals / Corolla)", 270, 60);
              ctxFlower.fillStyle = "#e2e8f0";
              ctxFlower.font = "13px sans-serif";
              ctxFlower.fillText("• දීප්තිමත් විචිත්‍ර වර්ණවලින් යුක්ත වේ.", 270, 100);
              ctxFlower.fillText("• ප්‍රධාන කාර්යය: පරාගණය සඳහා කෘමීන් ආකර්ෂණය කර ගැනීම.", 270, 130);
              readFlower.innerHTML = "<strong>ක්‍රියාකාරකම 14.1 (දල පත්‍ර):</strong> සුවඳ හා පැණි (මකරන්ද) නිපදවමින් කෘමීන් ආකර්ෂණය කර පරාගණය පහසු කරයි.";
            } else if (part === "androecium") {
              ctxFlower.fillStyle = "#facc15";
              ctxFlower.font = "bold 15px sans-serif";
              ctxFlower.textAlign = "center";
              ctxFlower.fillText("කේසර (Stamens / Androecium)", 270, 60);
              ctxFlower.fillStyle = "#e2e8f0";
              ctxFlower.font = "13px sans-serif";
              ctxFlower.fillText("• පුෂ්පයේ පුරුෂ ප්‍රජනක අවයවය වේ.", 270, 100);
              ctxFlower.fillText("• පරාගධානිය (Anther) සහ කේසර දණ්ඩ (Filament) අඩංගුය.", 270, 130);
              readFlower.innerHTML = "<strong>ක්‍රියාකාරකම 14.1 (කේසර):</strong> පරාගධානිය තුළ ඌනන විභාජනයෙන් පුරුෂ ජන්මාණු අඩංගු <strong>පරාග කණිකා</strong> නිපදවේ.";
            } else {
              ctxFlower.fillStyle = "#4ade80";
              ctxFlower.font = "bold 15px sans-serif";
              ctxFlower.textAlign = "center";
              ctxFlower.fillText("ජායාංගය (Carpel / Gynoecium)", 270, 60);
              ctxFlower.fillStyle = "#e2e8f0";
              ctxFlower.font = "13px sans-serif";
              ctxFlower.fillText("• පුෂ්පයේ ස්ත්‍රී ප්‍රජනක අවයවය වේ.", 270, 100);
              ctxFlower.fillText("• කලංකය (Stigma), කීලය (Style) සහ ඩිම්බකෝෂය (Ovary) අඩංගුය.", 270, 130);
              readFlower.innerHTML = "<strong>ක්‍රියාකාරකම 14.1 (ජායාංගය):</strong> ඩිම්බකෝෂය තුළ ඩිම්බ පිහිටයි. සංසේචනයෙන් පසු ඩිම්බකෝෂය ඵලය බවටත්, ඩිම්බ බීජ බවටත් පත්වේ.";
            }
          } else if (activeTab === "menstrual") {
            const d = Number(dayIn.value);
            dayVal.textContent = d;
            ctxMen.clearRect(0, 0, cvMen.width, cvMen.height);

            const gx = 45, gw = 455;
            // Estrogen
            ctxMen.strokeStyle = "#38bdf8";
            ctxMen.lineWidth = 2.5;
            ctxMen.beginPath();
            for (let i = 1; i <= 28; i++) {
              const x = gx + ((i - 1) / 27) * gw;
              const y = 95 - 52 * Math.exp(-Math.pow((i - 12) / 3.2, 2)) - 20 * Math.exp(-Math.pow((i - 21) / 4, 2));
              if (i === 1) ctxMen.moveTo(x, y); else ctxMen.lineTo(x, y);
            }
            ctxMen.stroke();

            // LH surge at Day 14
            ctxMen.strokeStyle = "#f43f5e";
            ctxMen.beginPath();
            for (let i = 1; i <= 28; i++) {
              const x = gx + ((i - 1) / 27) * gw;
              const y = 95 - 70 * Math.exp(-Math.pow((i - 14) / 1.4, 2));
              if (i === 1) ctxMen.moveTo(x, y); else ctxMen.lineTo(x, y);
            }
            ctxMen.stroke();

            // Progesterone peak at Day 21
            ctxMen.strokeStyle = "#10b981";
            ctxMen.beginPath();
            for (let i = 1; i <= 28; i++) {
              const x = gx + ((i - 1) / 27) * gw;
              const y = 95 - (i > 14 ? 58 * Math.exp(-Math.pow((i - 21) / 4.2, 2)) : 4);
              if (i === 1) ctxMen.moveTo(x, y); else ctxMen.lineTo(x, y);
            }
            ctxMen.stroke();

            // Uterine lining thickness at bottom
            ctxMen.fillStyle = "rgba(244, 63, 94, 0.35)";
            ctxMen.beginPath();
            ctxMen.moveTo(gx, 185);
            for (let i = 1; i <= 28; i++) {
              const x = gx + ((i - 1) / 27) * gw;
              const thick = i < 5 ? 32 - i * 5 : 10 + Math.min(48, (i - 5) * 2.4);
              ctxMen.lineTo(x, 185 - thick);
            }
            ctxMen.lineTo(gx + gw, 185);
            ctxMen.closePath();
            ctxMen.fill();

            const curX = gx + ((d - 1) / 27) * gw;
            ctxMen.strokeStyle = "#fde047";
            ctxMen.lineWidth = 2;
            ctxMen.beginPath();
            ctxMen.moveTo(curX, 20);
            ctxMen.lineTo(curX, 185);
            ctxMen.stroke();

            const phaseName = d <= 4 ? "ඔසප් අවධිය (රුධිර වහනය)" : d < 14 ? "ප්‍රගුණන අවධිය (FSH හා ඊස්ට්‍රජන්)" : d === 14 ? "ඩිම්බ මෝචනය (LH උපරිමය)" : "ස්‍රාවී අවධිය (පීත දේහයෙන් ප්‍රොජෙස්ටෙරෝන්)";
            readMen.innerHTML = `<strong>දිනය ${d} — ${phaseName}:</strong> නිල්: ඊස්ට්‍රජන් | රතු: LH (14 වන දින උපරිමය) | කොළ: ප්‍රොජෙස්ටෙරෝන්.`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 15: ද්‍රවස්ථිති පීඩන ජල විදින සහ ආකිමිඩීස් පිටාර බඳුන් පරීක්ෂණය
    // =========================================================================
    sim_l15_hydro_archimedes: {
      lessonId: 15,
      title: "ක්‍රියාකාරකම් 15.1–15.3 සිමියුලේෂන්: ද්‍රව පීඩනය (P = hρg), ආකිමිඩීස් මූලධර්මය හා ප්ලවනය",
      badge: "පාඩම 15 • P = hρg හා ආකිමිඩීස්",
      desc: "ගැඹුර සමග ද්‍රව පීඩනය විචලනය වන ජල විදින ධාරා, ආකිමිඩීස් පිටාර බඳුන් පරීක්ෂණය සහ ප්ලවන මූලධර්මය සජීවීව පරීක්ෂා කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="fluid-jets">🌊 ක්‍රියාකාරකම 15.1: ද්‍රව පීඩනය හා ගැඹුර (P = hρg ජල විදින)</button>
              <button class="vlab-tab-btn" data-subtab="archimedes">⚖️ ක්‍රියාකාරකම 15.2: ආකිමිඩීස් පිටාර බඳුන් පරීක්ෂණය</button>
              <button class="vlab-tab-btn" data-subtab="flotation">🚢 ක්‍රියාකාරකම 15.3: ප්ලවන නියමය (ඉපිලීම, පාවීම, ගිලීම)</button>
            </div>

            <!-- TAB 1: FLUID JETS -->
            <div class="vlab-panel active" data-panel="fluid-jets">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ද්‍රවයේ ඝනත්වය (ρ):</label>
                  <select class="sim-select" data-role="liq-sel">
                    <option value="800">භූමිතෙල් (800 kg m⁻³)</option>
                    <option value="1000" selected>මිරිදිය ජලය (1000 kg m⁻³)</option>
                    <option value="1050">මුහුදු ජලය (1050 kg m⁻³)</option>
                    <option value="13600">රසදිය (13600 kg m⁻³)</option>
                  </select>
                </div>
                <div class="sim-control-group">
                  <label>ජල මට්ටමේ ගැඹුර (h): <span data-role="h-val">2.0</span> m</label>
                  <input type="range" min="0.5" max="5" step="0.5" value="2.0" data-role="h-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-jets"></canvas>
                <div class="sim-readout" data-role="readout-jets"></div>
              </div>
            </div>

            <!-- TAB 2: ARCHIMEDES OVERFLOW -->
            <div class="vlab-panel" data-panel="archimedes" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>වස්තුවේ වාතයේ බර: <span data-role="w-air-val">20</span> N</label>
                  <input type="range" min="8" max="40" step="4" value="20" data-role="w-air-in" />
                </div>
                <div class="sim-control-group">
                  <label>විස්ථාපිත ද්‍රව පරිමාව: <span data-role="v-disp-val">0.8</span> L</label>
                  <input type="range" min="0.2" max="1.5" step="0.1" value="0.8" data-role="v-disp-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-arch"></canvas>
                <div class="sim-readout" data-role="readout-arch"></div>
              </div>
            </div>

            <!-- TAB 3: FLOTATION LAW -->
            <div class="vlab-panel" data-panel="flotation" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>වස්තුවේ බර (W): <span data-role="w-flot-val">18</span> N</label>
                  <input type="range" min="6" max="36" step="2" value="18" data-role="w-flot-in" />
                </div>
                <div class="sim-control-group">
                  <label>උපරිම උඩුකුරු තෙරපුම (U): <span data-role="u-flot-val">24</span> N</label>
                  <input type="range" min="10" max="36" step="2" value="24" data-role="u-flot-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-flot"></canvas>
                <div class="sim-readout" data-role="readout-flot"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "fluid-jets";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "archimedes") switchTab("archimedes");
          else if (e.detail === "flotation") switchTab("flotation");
          else switchTab("fluid-jets");
        });

        // Tab 1: Jets
        const liqSel = root.querySelector('[data-role="liq-sel"]');
        const hIn = root.querySelector('[data-role="h-in"]');
        const cvJets = root.querySelector('[data-role="canvas-jets"]');
        const ctxJets = cvJets.getContext("2d");
        const readJets = root.querySelector('[data-role="readout-jets"]');

        // Tab 2: Archimedes
        const wAirIn = root.querySelector('[data-role="w-air-in"]');
        const vDispIn = root.querySelector('[data-role="v-disp-in"]');
        const cvArch = root.querySelector('[data-role="canvas-arch"]');
        const ctxArch = cvArch.getContext("2d");
        const readArch = root.querySelector('[data-role="readout-arch"]');

        // Tab 3: Flotation
        const wFlotIn = root.querySelector('[data-role="w-flot-in"]');
        const uFlotIn = root.querySelector('[data-role="u-flot-in"]');
        const cvFlot = root.querySelector('[data-role="canvas-flot"]');
        const ctxFlot = cvFlot.getContext("2d");
        const readFlot = root.querySelector('[data-role="readout-flot"]');

        let t = 0;
        function loop() {
          if (!document.body.contains(root)) return;
          t += 0.08;

          if (activeTab === "fluid-jets") {
            const rho = Number(liqSel.value);
            const h = Number(hIn.value);
            root.querySelector('[data-role="h-val"]').textContent = h.toFixed(1);
            const P = Math.round(h * rho * 10);

            ctxJets.clearRect(0, 0, cvJets.width, cvJets.height);

            // Water column cylinder
            ctxJets.fillStyle = "rgba(56, 189, 248, 0.35)";
            ctxJets.fillRect(70, 30, 80, 145);
            ctxJets.strokeStyle = "#cbd5e1";
            ctxJets.lineWidth = 2.5;
            ctxJets.strokeRect(70, 22, 80, 153);

            // 3 Holes at different depths
            [55, 95, 135].forEach((hy, idx) => {
              const reach = (25 + (idx + 1) * 35) * (h / 2);
              ctxJets.strokeStyle = "#38bdf8";
              ctxJets.lineWidth = 3;
              ctxJets.beginPath();
              ctxJets.moveTo(150, hy);
              ctxJets.quadraticCurveTo(150 + reach * 0.6, hy + 10, 150 + reach, 175);
              ctxJets.stroke();

              const dp = ((t * 0.25 + idx * 0.3) % 1);
              const dx = 150 + reach * dp;
              const dy = hy + (175 - hy) * dp * dp;
              drawSphere3D(ctxJets, dx, dy, 3.5, "#7dd3fc", "");
            });

            ctxJets.fillStyle = "#2dd4bf";
            ctxJets.font = "bold 13px sans-serif";
            ctxJets.textAlign = "left";
            ctxJets.fillText(`P = hρg = ${P.toLocaleString()} Pa`, 320, 90);
            ctxJets.fillStyle = "#cbd5e1";
            ctxJets.fillText("• පතුලට යත්ම ගැඹුර (h) වැඩිවේ.", 320, 120);
            ctxJets.fillText("• පීඩනය වැඩි නිසා ජල ධාරාව වැඩි ඈතකට විදේ.", 320, 145);

            readJets.innerHTML = `<strong>ක්‍රියාකාරකම 15.1 — ද්‍රව පීඩනය (P = hρg):</strong> ද්‍රවයක ගැඹුර වැඩිවත්ම පීඩනය වැඩි වේ. පතුල ආසන්නයේ ඇති සිදුරෙන් පිටවන ජල ධාරාව උපරිම වේගයකින් හා උපරිම දුරකට විදිනු ලබයි. පීඩනය = <strong>${P.toLocaleString()} Pa</strong>.`;
          } else if (activeTab === "archimedes") {
            const wAir = Number(wAirIn.value);
            const vDisp = Number(vDispIn.value);
            root.querySelector('[data-role="w-air-val"]').textContent = wAir;
            root.querySelector('[data-role="v-disp-val"]').textContent = vDisp.toFixed(1);

            const upthrust = vDisp * 10;
            const wWater = Math.max(0, wAir - upthrust);

            ctxArch.clearRect(0, 0, cvArch.width, cvArch.height);

            // Overflow can
            ctxArch.strokeStyle = "#cbd5e1";
            ctxArch.lineWidth = 3;
            ctxArch.strokeRect(100, 60, 110, 115);
            ctxArch.fillStyle = "rgba(56, 189, 248, 0.25)";
            ctxArch.fillRect(102, 90, 106, 83);

            // Spout
            ctxArch.beginPath();
            ctxArch.moveTo(210, 90);
            ctxArch.lineTo(240, 115);
            ctxArch.stroke();

            // Measuring cylinder collecting displaced water
            ctxArch.strokeStyle = "#94a3b8";
            ctxArch.strokeRect(250, 115, 45, 60);
            ctxArch.fillStyle = "rgba(56, 189, 248, 0.5)";
            ctxArch.fillRect(252, 175 - vDisp * 28, 41, vDisp * 28);

            // Submerged object on spring balance
            drawSphere3D(ctxArch, 155, 120, 18, "#f59e0b", `${wWater.toFixed(1)}N`);

            ctxArch.fillStyle = "#f8fafc";
            ctxArch.font = "bold 12px sans-serif";
            ctxArch.textAlign = "left";
            ctxArch.fillText(`වාතයේ බර = ${wAir} N`, 330, 75);
            ctxArch.fillText(`ජලයේ බර = ${wWater.toFixed(1)} N`, 330, 105);
            ctxArch.fillStyle = "#2dd4bf";
            ctxArch.fillText(`උඩුකුරු තෙරපුම (U) = ${upthrust.toFixed(1)} N`, 330, 135);
            ctxArch.fillText(`විස්ථාපිත ජලයේ බර = ${upthrust.toFixed(1)} N`, 330, 165);

            readArch.innerHTML = `<strong>ක්‍රියාකාරකම 15.2 (ආකිමිඩීස් මූලධර්මය):</strong> ද්‍රවයක ගිලී ඇති වස්තුවක් මත ක්‍රියා කරන <strong>උඩුකුරු තෙරපුම (${upthrust.toFixed(1)} N) = වස්තුව මගින් විස්ථාපනය කළ තරලයේ බර (${upthrust.toFixed(1)} N)</strong> වේ. දෘශ්‍ය බර අඩුවීම = ${upthrust.toFixed(1)} N.`;
          } else if (activeTab === "flotation") {
            const W = Number(wFlotIn.value);
            const Umax = Number(uFlotIn.value);
            root.querySelector('[data-role="w-flot-val"]').textContent = W;
            root.querySelector('[data-role="u-flot-val"]').textContent = Umax;

            ctxFlot.clearRect(0, 0, cvFlot.width, cvFlot.height);

            ctxFlot.fillStyle = "rgba(45, 212, 191, 0.25)";
            ctxFlot.fillRect(170, 58, 200, 118);
            ctxFlot.strokeStyle = "#94a3b8";
            ctxFlot.strokeRect(170, 38, 200, 138);

            const bob = Math.sin(t) * 3;
            let blockY = 58, stateStr = "";
            if (W < Umax) {
              blockY = 58 - 38 * (1 - W / Umax) + bob;
              stateStr = "අර්ධව ගිලී ඉපිලේ (U = W)";
            } else if (W === Umax) {
              blockY = 88 + bob;
              stateStr = "සම්පූර්ණයෙන් ගිලී පාවේ (U = W)";
            } else {
              blockY = 135;
              stateStr = "පතුලට ගිලේ (W > U)";
            }

            ctxFlot.fillStyle = "#f59e0b";
            ctxFlot.fillRect(245, blockY, 50, 40);
            ctxFlot.strokeStyle = "#78350f";
            ctxFlot.strokeRect(245, blockY, 50, 40);
            ctxFlot.fillStyle = "#0f172a";
            ctxFlot.fillText(`W=${W}N`, 270, blockY + 24);
            ctxFlot.fillStyle = "#2dd4bf";
            ctxFlot.font = "bold 13px sans-serif";
            ctxFlot.textAlign = "center";
            ctxFlot.fillText(stateStr, 270, 196);

            readFlot.innerHTML = `<strong>ක්‍රියාකාරකම 15.3 — ප්ලවන නියමය:</strong> වස්තුවක් ද්‍රවයක ඉපිලෙන විට <strong>වස්තුවේ මුළු බර (${W} N) = විස්ථාපිත ද්‍රවයේ බර / උඩුකුරු තෙරපුම (${Math.min(W, Umax)} N)</strong> වේ. W > U විට වස්තුව පතුලට ගිලී යයි.`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 16: ලෝහ සක්‍රියතාව, වායු නිපදවීම (H₂, O₂, CO₂) හා ධාරා ඌෂ්මකය
    // =========================================================================
    sim_l16_reactions_gases: {
      lessonId: 16,
      title: "ක්‍රියාකාරකම් 16.1–16.10 සිමියුලේෂන්: වායු නිපදවීම (H₂, O₂, CO₂), ලෝහ සක්‍රියතාව හා ධාරා ඌෂ්මකය",
      badge: "පාඩම 16 • රසායනික විපර්යාස",
      desc: "H₂, O₂, CO₂ වායු නිපදවීම හා හඳුනාගැනීම, Na + ජලය හා Zn + CuSO₄ විස්ථාපනය සහ යකඩ නිස්සාරණ ධාරා ඌෂ්මකය සජීවීව පරීක්ෂා කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="gas-prep">🧪 ක්‍රියාකාරකම් 16.8–16.10: වායු නිපදවීමේ විද්‍යාගාරය (H₂, O₂, CO₂)</button>
              <button class="vlab-tab-btn" data-subtab="metal-react">⚡ ක්‍රියාකාරකම් 16.4 & 16.7: ලෝහ ප්‍රතික්‍රියා හා විස්ථාපනය</button>
              <button class="vlab-tab-btn" data-subtab="blast-furnace">🏭 16.4 කොටස: යකඩ නිස්සාරණ ධාරා ඌෂ්මකය</button>
            </div>

            <!-- TAB 1: GAS PREP -->
            <div class="vlab-panel active" data-panel="gas-prep">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>නිපදවන වායුව තෝරන්න:</label>
                  <select class="sim-select" data-role="gas-sel">
                    <option value="h2" selected>1. ක්‍රියාකාරකම 16.8: Zn + HCl → හයිඩ්‍රජන් (H₂) ("පොප්" හඬින් දැවේ)</option>
                    <option value="o2">2. ක්‍රියාකාරකම 16.9: KMnO₄ රත් කිරීම → ඔක්සිජන් (O₂) (පුලිඟු කූර දැල්වේ)</option>
                    <option value="co2">3. ක්‍රියාකාරකම 16.10: CaCO₃ + HCl → කාබන් ඩයොක්සයිඩ් (CO₂) (හුණු දියර කිරි පාට වේ)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-gas"></canvas>
                <div class="sim-readout" data-role="readout-gas"></div>
              </div>
            </div>

            <!-- TAB 2: METAL REACTIONS -->
            <div class="vlab-panel" data-panel="metal-react" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ලෝහ ප්‍රතික්‍රියාව තෝරන්න:</label>
                  <select class="sim-select" data-role="metal-sel">
                    <option value="na_water">ක්‍රියාකාරකම 16.4: සෝඩියම් (Na) + සිසිල් ජලය (H₂ පිටවීම & NaOH)</option>
                    <option value="disp">ක්‍රියාකාරකම 16.7: සින්ක් (Zn) + කොපර් සල්ෆේට් (CuSO₄) ඒක විස්ථාපනය</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-metal"></canvas>
                <div class="sim-readout" data-role="readout-metal"></div>
              </div>
            </div>

            <!-- TAB 3: BLAST FURNACE -->
            <div class="vlab-panel" data-panel="blast-furnace" style="display:none;">
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-blast"></canvas>
                <div class="sim-readout" data-role="readout-blast"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "gas-prep";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "metal-react" || e.detail === "disp" || e.detail === "na_water") switchTab("metal-react");
          else if (e.detail === "blast" || e.detail === "blast-furnace") switchTab("blast-furnace");
          else switchTab("gas-prep");
        });

        // Tab 1: Gas Prep
        const gasSel = root.querySelector('[data-role="gas-sel"]');
        const cvGas = root.querySelector('[data-role="canvas-gas"]');
        const ctxGas = cvGas.getContext("2d");
        const readGas = root.querySelector('[data-role="readout-gas"]');

        const bubbles = Array.from({ length: 22 }, () => ({
          x: 75 + Math.random() * 65,
          y: 95 + Math.random() * 70,
          r: 2.5 + Math.random() * 3.5,
          v: 0.9 + Math.random() * 1.4
        }));

        // Tab 2: Metal React
        const metalSel = root.querySelector('[data-role="metal-sel"]');
        const cvMetal = root.querySelector('[data-role="canvas-metal"]');
        const ctxMetal = cvMetal.getContext("2d");
        const readMetal = root.querySelector('[data-role="readout-metal"]');

        // Tab 3: Blast Furnace
        const cvBlast = root.querySelector('[data-role="canvas-blast"]');
        const ctxBlast = cvBlast.getContext("2d");
        const readBlast = root.querySelector('[data-role="readout-blast"]');

        let tick = 0;
        function loop() {
          if (!document.body.contains(root)) return;
          tick += 0.08;

          if (activeTab === "gas-prep") {
            const g = gasSel.value;
            ctxGas.clearRect(0, 0, cvGas.width, cvGas.height);

            // Left: Boiling tube with reaction mixture
            ctxGas.strokeStyle = "#cbd5e1";
            ctxGas.lineWidth = 3;
            ctxGas.strokeRect(65, 45, 95, 130);
            ctxGas.fillStyle = g === "co2" ? "rgba(241, 245, 249, 0.85)" : g === "o2" ? "rgba(168, 85, 247, 0.45)" : "rgba(45, 212, 191, 0.28)";
            ctxGas.fillRect(67, 88, 91, 85);

            bubbles.forEach((b) => {
              b.y -= b.v;
              if (b.y < 90) b.y = 168;
              drawSphere3D(ctxGas, b.x, b.y, b.r, "#ffffff", "");
            });

            // Delivery tube
            ctxGas.strokeStyle = "#94a3b8";
            ctxGas.lineWidth = 3;
            ctxGas.beginPath();
            ctxGas.moveTo(112, 45);
            ctxGas.lineTo(112, 28);
            ctxGas.lineTo(240, 28);
            ctxGas.lineTo(240, 100);
            ctxGas.stroke();

            // Right test tube / collecting gas jar
            ctxGas.strokeStyle = "#cbd5e1";
            ctxGas.strokeRect(215, 100, 50, 75);

            const labels = {
              h2: ["🧪 වායුව: හයිඩ්‍රජන් (H₂)", "💥 දැල්වෙන ඉරටුව ඇල්ලූ විට 'පොප්' හඬින් දැවේ!", "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑"],
              o2: ["🧪 වායුව: ඔක්සිජන් (O₂)", "🔥 පුලිඟු කූරක් දීප්තිමත් දැල්ලක් සහිතව නැවත දැල්වේ!", "2KMnO₄(s) —(Δ)→ K₂MnO₄ + MnO₂ + O₂(g)↑"],
              co2: ["🧪 වායුව: කාබන් ඩයොක්සයිඩ් (CO₂)", "🥛 අවර්ණ හුණු දියර කිරි පැහැයට හැරේ (CaCO₃)!", "CaCO₃(s) + 2HCl(aq) → CaCl₂ + H₂O + CO₂(g)↑"]
            };

            ctxGas.fillStyle = "#f8fafc";
            ctxGas.font = "bold 13px sans-serif";
            ctxGas.textAlign = "left";
            ctxGas.fillText(labels[g][0], 290, 80);
            ctxGas.fillStyle = "#fde047";
            ctxGas.fillText(labels[g][1], 290, 115);
            ctxGas.fillStyle = "#38bdf8";
            ctxGas.font = "bold 11px monospace";
            ctxGas.fillText(labels[g][2], 290, 145);

            if (g === "h2") {
              readGas.innerHTML = "<strong>ක්‍රියාකාරකම 16.8 (හයිඩ්‍රජන් H₂):</strong> Zn කැට මතට තනුක HCl දැමූ විට H₂ වායු බුබුළු පිටවේ. වාතයට වඩා සැහැල්ලු නිසා උඩුකුරු විස්ථාපනයෙන් රැස් කරයි. දැල්වෙන ඉරටුවක් ඇල්ලූ විට <strong>'පොප්' හඬ නංවමින් නිල් දැල්ලෙන් දැවේ</strong>.";
            } else if (g === "o2") {
              readGas.innerHTML = "<strong>ක්‍රියාකාරකම 16.9 (ඔක්සිජන් O₂):</strong> වියළි KMnO₄ කුඩු රත් කළ විට O₂ වායුව පිටවේ. දහනයට ආධාර කරයි. <strong>රතු වූ පුලිඟු කූරක් ඇතුළු කළ විට දීප්තිමත් දැල්ලක් සහිතව</strong> නැවත දැල්වේ.";
            } else {
              readGas.innerHTML = "<strong>ක්‍රියාකාරකම 16.10 (කාබන් ඩයොක්සයිඩ් CO₂):</strong> CaCO₃ (හුණුගල්) මතට තනුක HCl දැමූ විට CO₂ පිටවේ. අවර්ණ හුණු දියර (Ca(OH)₂) තුළින් බුබුලනය කළ විට සුදු පැහැති CaCO₃ අවක්ෂේප වී <strong>කිරි පැහැ වේ</strong>.";
            }
          } else if (activeTab === "metal-react") {
            const m = metalSel.value;
            ctxMetal.clearRect(0, 0, cvMetal.width, cvMetal.height);

            // Beaker
            ctxMetal.strokeStyle = "#cbd5e1";
            ctxMetal.lineWidth = 3;
            ctxMetal.strokeRect(90, 45, 120, 130);

            if (m === "na_water") {
              ctxMetal.fillStyle = "rgba(56, 189, 248, 0.35)";
              ctxMetal.fillRect(92, 95, 116, 78);

              // Darting Na pellet on surface
              const nax = 150 + Math.sin(tick * 1.5) * 35;
              drawSphere3D(ctxMetal, nax, 95, 9, "#fde047", "Na");

              // Tiny flame / fizz
              for (let i = 0; i < 4; i++) {
                drawSphere3D(ctxMetal, nax + (Math.random() - 0.5) * 14, 85 - Math.random() * 15, 3.5, "#f43f5e", "");
              }

              ctxMetal.fillStyle = "#f8fafc";
              ctxMetal.font = "bold 13px sans-serif";
              ctxMetal.textAlign = "left";
              ctxMetal.fillText("2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑", 240, 80);
              ctxMetal.fillStyle = "#38bdf8";
              ctxMetal.fillText("• Na ජලය මත රිදී ගෝලයක් මෙන් චලනය වේ.", 240, 115);
              ctxMetal.fillStyle = "#fde047";
              ctxMetal.fillText("• NaOH සෑදෙන බැවින් රතු ලිට්මස් නිල් පැහැ වේ.", 240, 145);

              readMetal.innerHTML = "<strong>ක්‍රියාකාරකම 16.4 (සෝඩියම් + සිසිල් ජලය):</strong> සෝඩියම් ජලයට වඩා ඝනත්වයෙන් අඩු නිසා ජලය මත පාවෙමින් චලනය වේ. පිටවන H₂ වායුව දැල්විය හැක. ද්‍රාවණය ක්ෂාරීය (භාෂ්මික) NaOH බැවින් <strong>රතු ලිට්මස් නිල් පැහැයට</strong> හැරේ.";
            } else {
              ctxMetal.fillStyle = "rgba(2, 132, 199, 0.6)";
              ctxMetal.fillRect(92, 95, 116, 78);

              // Zinc strip in solution
              ctxMetal.fillStyle = "#94a3b8";
              ctxMetal.fillRect(140, 70, 20, 95);
              // Deposited reddish-brown copper
              ctxMetal.fillStyle = "#b45309";
              ctxMetal.fillRect(140, 120, 20, 45);

              ctxMetal.fillStyle = "#f8fafc";
              ctxMetal.font = "bold 13px sans-serif";
              ctxMetal.textAlign = "left";
              ctxMetal.fillText("Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)↓", 240, 80);
              ctxMetal.fillStyle = "#38bdf8";
              ctxMetal.fillText("• නිල් පැහැති CuSO₄ ද්‍රාවණය අවර්ණ වේ.", 240, 115);
              ctxMetal.fillStyle = "#f59e0b";
              ctxMetal.fillText("• සින්ක් තහඩුව මත රතු-දුඹුරු කොපර් (Cu) තැන්පත් වේ.", 240, 145);

              readMetal.innerHTML = "<strong>ක්‍රියාකාරකම 16.7 (ලෝහ විස්ථාපනය):</strong> සක්‍රියතා ශ්‍රේණියේ Zn ලෝහය Cu ට වඩා ඉහළින් පිහිටන බැවින්, CuSO₄ ද්‍රාවණයෙන් Cu විස්ථාපනය කර ZnSO₄ සාදයි. <strong>නිල් පැහැය ක්‍රමයෙන් මැකී ගොස් රතු-දුඹුරු තඹ (Cu) තැන්පත් වේ</strong>.";
            }
          } else if (activeTab === "blast-furnace") {
            ctxBlast.clearRect(0, 0, cvBlast.width, cvBlast.height);

            // Blast furnace silhouette
            ctxBlast.fillStyle = "#334155";
            ctxBlast.beginPath();
            ctxBlast.moveTo(110, 25);
            ctxBlast.lineTo(150, 25);
            ctxBlast.lineTo(175, 110);
            ctxBlast.lineTo(145, 185);
            ctxBlast.lineTo(115, 185);
            ctxBlast.lineTo(85, 110);
            ctxBlast.closePath();
            ctxBlast.fill();

            // Molten iron at bottom
            ctxBlast.fillStyle = "#f97316";
            ctxBlast.fillRect(115, 165, 30, 20);

            // Slag on top
            ctxBlast.fillStyle = "#94a3b8";
            ctxBlast.fillRect(115, 150, 30, 15);

            ctxBlast.fillStyle = "#f8fafc";
            ctxBlast.font = "bold 13px sans-serif";
            ctxBlast.textAlign = "left";
            ctxBlast.fillText("යකඩ නිස්සාරණ ධාරා ඌෂ්මකය (Blast Furnace)", 205, 45);

            ctxBlast.fillStyle = "#38bdf8";
            ctxBlast.font = "12px sans-serif";
            ctxBlast.fillText("1. අමුද්‍රව්‍ය: හීමටයිට් (Fe₂O₃) + හුණුගල් (CaCO₃) + කෝක් (C)", 205, 75);
            ctxBlast.fillText("2. ඔක්සිහරණය: Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)", 205, 105);
            ctxBlast.fillText("3. අපද්‍රව්‍ය ඉවත් කිරීම: CaO + SiO₂ → CaSiO₃ (ලෝබොර)", 205, 135);
            ctxBlast.fillStyle = "#f97316";
            ctxBlast.fillText("4. පතුලෙන් ද්‍රව වාත්තු යකඩ (Fe) ඉවතට ගැනේ.", 205, 165);

            readBlast.innerHTML = "<strong>ධාරා ඌෂ්මකය:</strong> හීමටයිට් (Fe₂O₃) කෝක් මගින් නිපදවන CO වායුව මගින් ඔක්සිහරණය කර ද්‍රව යකඩ නිස්සාරණය කෙරේ. ලෝබොර (CaSiO₃) ද්‍රව යකඩට වඩා ඝනත්වයෙන් අඩු නිසා උඩින් පාවී යකඩ ඔක්සිකරණය වීම වළක්වයි.";
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 17: ප්‍රතික්‍රියා ශීඝ්‍රතාව (අංශු ගැටුම්, වායු සිරින්ජය හා ප්‍රස්තාරය)
    // =========================================================================
    sim_l17_reaction_rate: {
      lessonId: 17,
      title: "ක්‍රියාකාරකම් 17.1–17.4 සිමියුලේෂන්: අංශු ගැටුම්, තයෝසල්ෆේට් 'X' සලකුණ හා උත්ප්‍රේරක",
      badge: "පාඩම 17 • ප්‍රතික්‍රියා ශීඝ්‍රතාව",
      desc: "පෘෂ්ඨ වර්ගඵලය, උෂ්ණත්වය, සෝඩියම් තයෝසල්ෆේට් 'X' සලකුණ නොපෙනී යාමේ පරීක්ෂාව සහ H₂O₂ වියෝජනයට MnO₂ උත්ප්‍රේරකය සජීවීව පරීක්ෂා කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="rate-factors">💥 ක්‍රියාකාරකම් 17.1 & 17.3: අංශු ගැටුම් කුටීරය & ප්‍රස්තාරය</button>
              <button class="vlab-tab-btn" data-subtab="thiosulphate-x">❌ ක්‍රියාකාරකම 17.2: තයෝසල්ෆේට් 'X' සලකුණු පරීක්ෂණය</button>
              <button class="vlab-tab-btn" data-subtab="catalyst-h2o2">⚡ ක්‍රියාකාරකම 17.4: MnO₂ උත්ප්‍රේරකය (H₂O₂ වියෝජනය)</button>
            </div>

            <!-- TAB 1: RATE FACTORS -->
            <div class="vlab-panel active" data-panel="rate-factors">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>1. CaCO₃ ස්වභාවය:</label>
                  <select class="sim-select" data-role="area-sel">
                    <option value="1">CaCO₃ කැට (අඩු පෘෂ්ඨ වර්ගඵලය)</option>
                    <option value="2.2" selected>CaCO₃ කුඩු (වැඩි පෘෂ්ඨ වර්ගඵලය)</option>
                  </select>
                </div>
                <div class="sim-control-group">
                  <label>2. උෂ්ණත්වය: <span data-role="t-val">50</span> °C</label>
                  <input type="range" min="20" max="80" step="10" value="50" data-role="t-in" />
                </div>
                <div class="sim-control-group">
                  <label>3. සාන්ද්‍රණය: <span data-role="c-val">20</span></label>
                  <input type="range" min="8" max="32" step="4" value="20" data-role="c-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-rate"></canvas>
                <div class="sim-readout" data-role="readout-rate"></div>
              </div>
            </div>

            <!-- TAB 2: THIOSULPHATE X -->
            <div class="vlab-panel" data-panel="thiosulphate-x" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ද්‍රාවණයේ උෂ්ණත්වය:</label>
                  <select class="sim-select" data-role="thio-temp">
                    <option value="30">30 °C (සාමාන්‍ය ශීඝ්‍රතාව)</option>
                    <option value="50" selected>50 °C (ඉහළ ශීඝ්‍රතාව - ඉක්මනින් 'X' නොපෙනී යයි)</option>
                  </select>
                </div>
                <button class="sim-btn" data-role="thio-start">▶ ප්‍රතික්‍රියාව අරඹන්න</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-thio"></canvas>
                <div class="sim-readout" data-role="readout-thio"></div>
              </div>
            </div>

            <!-- TAB 3: CATALYST -->
            <div class="vlab-panel" data-panel="catalyst-h2o2" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>පරීක්ෂණ නළය:</label>
                  <select class="sim-select" data-role="cat-sel">
                    <option value="without">A නළය: H₂O₂ පමණක් (උත්ප්‍රේරක රහිත - ඉතා මන්දගාමී)</option>
                    <option value="with" selected>B නළය: H₂O₂ + MnO₂ කුඩු ස්වල්පයක් (සීඝ්‍ර O₂ පිටවීම)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-cat"></canvas>
                <div class="sim-readout" data-role="readout-cat"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "rate-factors";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "thiosulphate" || e.detail === "thiosulphate-x") switchTab("thiosulphate-x");
          else if (e.detail === "catalyst" || e.detail === "catalyst-h2o2") switchTab("catalyst-h2o2");
          else switchTab("rate-factors");
        });

        // Tab 1: Rate
        const areaSel = root.querySelector('[data-role="area-sel"]');
        const tIn = root.querySelector('[data-role="t-in"]');
        const cIn = root.querySelector('[data-role="c-in"]');
        const cvRate = root.querySelector('[data-role="canvas-rate"]');
        const ctxRate = cvRate.getContext("2d");
        const readRate = root.querySelector('[data-role="readout-rate"]');

        const particles = Array.from({ length: 32 }, () => ({
          x: 30 + Math.random() * 190,
          y: 30 + Math.random() * 150,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5
        }));

        // Tab 2: Thiosulphate
        const thioTemp = root.querySelector('[data-role="thio-temp"]');
        const thioStart = root.querySelector('[data-role="thio-start"]');
        const cvThio = root.querySelector('[data-role="canvas-thio"]');
        const ctxThio = cvThio.getContext("2d");
        const readThio = root.querySelector('[data-role="readout-thio"]');
        let thioProgress = 0, thioRunning = false;
        thioStart.addEventListener("click", () => { thioProgress = 0; thioRunning = true; });

        // Tab 3: Catalyst
        const catSel = root.querySelector('[data-role="cat-sel"]');
        const cvCat = root.querySelector('[data-role="canvas-cat"]');
        const ctxCat = cvCat.getContext("2d");
        const readCat = root.querySelector('[data-role="readout-cat"]');

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "rate-factors") {
            const fArea = Number(areaSel.value);
            const T = Number(tIn.value);
            const count = Number(cIn.value);
            root.querySelector('[data-role="t-val"]').textContent = T;
            root.querySelector('[data-role="c-val"]').textContent = count;

            const speedMult = 0.6 + T / 32;
            ctxRate.clearRect(0, 0, cvRate.width, cvRate.height);

            ctxRate.strokeStyle = "#94a3b8";
            ctxRate.lineWidth = 2;
            ctxRate.strokeRect(20, 20, 215, 170);

            for (let i = 0; i < count; i++) {
              const p = particles[i];
              p.x += p.vx * speedMult;
              p.y += p.vy * speedMult;
              if (p.x < 28 || p.x > 227) p.vx *= -1;
              if (p.y < 28 || p.y > 182) p.vy *= -1;
              drawSphere3D(ctxRate, p.x, p.y, fArea > 1.5 ? 5.5 : 8.5, i % 2 === 0 ? "#38bdf8" : "#f43f5e", "");
            }
            ctxRate.fillStyle = "#cbd5e1";
            ctxRate.font = "11px sans-serif";
            ctxRate.textAlign = "center";
            ctxRate.fillText("ප්‍රතික්‍රියක අංශු ගැටුම් කුටීරය", 127, 205);

            // Graph on Right
            const gx = 280, gy = 185, gw = 230, gh = 145;
            ctxRate.strokeStyle = "#64748b";
            ctxRate.beginPath();
            ctxRate.moveTo(gx, gy - gh);
            ctxRate.lineTo(gx, gy);
            ctxRate.lineTo(gx + gw, gy);
            ctxRate.stroke();

            const rate = fArea * speedMult * (count / 12);
            ctxRate.strokeStyle = "#2dd4bf";
            ctxRate.lineWidth = 3;
            ctxRate.beginPath();
            for (let t = 0; t <= 12; t += 0.5) {
              const x = gx + (t / 12) * gw;
              const y = gy - (1 - Math.exp((-t * rate) / 8)) * (gh - 15);
              if (t === 0) ctxRate.moveTo(x, y); else ctxRate.lineTo(x, y);
            }
            ctxRate.stroke();

            ctxRate.fillStyle = "#2dd4bf";
            ctxRate.font = "bold 11px sans-serif";
            ctxRate.fillText("පිටවූ CO₂ පරිමාව (cm³) — කාලය ප්‍රස්තාරය", gx + gw / 2, 26);
            ctxRate.fillStyle = "#cbd5e1";
            ctxRate.fillText("කාලය (තත්පර) →", gx + gw / 2, 205);

            readRate.innerHTML = `<strong>සඵල ගැටුම් වාදය:</strong> උෂ්ණත්වය (<strong>${T} °C</strong>), සාන්ද්‍රණය (<strong>${count} අංශු</strong>) සහ පෘෂ්ඨ වර්ගඵලය වැඩි වන විට ඒකක කාලයක දී සිදුවන සඵල ගැටුම් සංඛ්‍යාව වැඩි වී ප්‍රතික්‍රියා ශීඝ්‍රතාව ඉහළ යයි.`;
          } else if (activeTab === "thiosulphate-x") {
            ctxThio.clearRect(0, 0, cvThio.width, cvThio.height);
            const tempVal = Number(thioTemp.value);
            const step = tempVal === 50 ? 0.025 : 0.01;
            if (thioRunning && thioProgress < 1) {
              thioProgress += step;
            }

            // Paper with 'X' underneath conical flask
            ctxThio.fillStyle = "#ffffff";
            ctxThio.fillRect(210, 50, 120, 120);
            ctxThio.strokeStyle = "#475569";
            ctxThio.strokeRect(210, 50, 120, 120);

            // Black 'X' mark
            ctxThio.strokeStyle = "#000000";
            ctxThio.lineWidth = 6;
            ctxThio.beginPath();
            ctxThio.moveTo(240, 80);
            ctxThio.lineTo(300, 140);
            ctxThio.moveTo(300, 80);
            ctxThio.lineTo(240, 140);
            ctxThio.stroke();

            // Turbid sulfur suspension covering the 'X'
            const yellowAlpha = thioProgress * 0.95;
            ctxThio.fillStyle = `rgba(250, 204, 21, ${yellowAlpha})`;
            ctxThio.fillRect(210, 50, 120, 120);

            ctxThio.fillStyle = "#f8fafc";
            ctxThio.font = "bold 13px sans-serif";
            ctxThio.textAlign = "center";
            ctxThio.fillText(thioProgress >= 0.8 ? "කහ පැහැති සල්ෆර් (S) අවක්ෂේපය නිසා 'X' නොපෙනී ගොස් ඇත!" : "ද්‍රාවණය තුළින් 'X' සලකුණ නිරීක්ෂණය කිරීම", 270, 195);

            readThio.innerHTML = `<strong>ක්‍රියාකාරකම 17.2:</strong> <code>Na₂S₂O₃(aq) + 2HCl(aq) → 2NaCl + SO₂ + H₂O + S(s)↓</code>. කහ පැහැති කොලොයිඩ සල්ෆර් සෑදීමෙන් ද්‍රාවණය බොර වී <strong>'X' සලකුණ නොපෙනී යයි</strong>. උෂ්ණත්වය වැඩි වන විට ප්‍රතික්‍රියාව සීඝ්‍ර වී අඩු කාලයකින් 'X' නොපෙනී යයි.`;
          } else if (activeTab === "catalyst-h2o2") {
            ctxCat.clearRect(0, 0, cvCat.width, cvCat.height);
            const isCat = catSel.value === "with";

            // Test tube
            ctxCat.strokeStyle = "#cbd5e1";
            ctxCat.lineWidth = 3;
            ctxCat.beginPath();
            ctxCat.roundRect(230, 40, 80, 135, 16);
            ctxCat.stroke();

            ctxCat.fillStyle = "rgba(56, 189, 248, 0.3)";
            ctxCat.fillRect(232, 90, 76, 80);

            if (isCat) {
              // Black MnO2 powder at bottom
              ctxCat.fillStyle = "#1e293b";
              ctxCat.fillRect(240, 160, 60, 10);

              // Vigorous O2 bubbles rising
              for (let i = 0; i < 12; i++) {
                drawSphere3D(ctxCat, 245 + Math.random() * 50, 100 + Math.random() * 60, 4, "#ffffff", "");
              }
            }

            ctxCat.fillStyle = "#2dd4bf";
            ctxCat.font = "bold 13px sans-serif";
            ctxCat.textAlign = "center";
            ctxCat.fillText(isCat ? "MnO₂ කුඩු සහිතයි: සීඝ්‍ර O₂ වායු පිටවීමක්! ⚡" : "උත්ප්‍රේරක රහිතයි: ඉතා මන්දගාමී වියෝජනයක් (බුබුළු නැත)", 270, 200);

            readCat.innerHTML = `<strong>ක්‍රියාකාරකම 17.4 (උත්ප්‍රේරක):</strong> <code>2H₂O₂(aq) —[MnO₂]→ 2H₂O(l) + O₂(g)↑</code>. මැංගනීස් ඩයොක්සයිඩ් (MnO₂) <strong>ධන උත්ප්‍රේරකයක්</strong> ලෙස ක්‍රියා කරමින් සක්‍රියන ශක්තිය අඩු කර ප්‍රතික්‍රියා ශීඝ්‍රතාව සීඝ්‍රයෙන් වැඩි කරයි (ප්‍රතික්‍රියාව අවසානයේ උත්ප්‍රේරකයේ ස්කන්ධය වෙනස් නොවේ).`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 18: කාර්යය, ශක්තිය (Eₚ ⇄ Eₖ) සහ සජීවී අවලම්බ/නිදහස් पतन සිමියුලේටරය
    // =========================================================================
    sim_l18_energy_power: {
      lessonId: 18,
      title: "ක්‍රියාකාරකම් 18.1–18.3 සිමියුලේෂන්: යාන්ත්‍රික ශක්ති සංස්ථිතිය (Eₚ ⇄ Eₖ) සහ ප්‍රත්‍යාස්ථ විභව ශක්තිය",
      badge: "පාඩම 18 • Eₚ ⇄ Eₖ ශක්ති සංස්ථිතිය",
      desc: "සරල අවලම්බය (ඔන්චිල්ලාව), නිදහසේ වැටෙන ගෝලය සහ දුන්නක ප්‍රත්‍යාස්ථ විභව ශක්තිය (Eₚ = ½ke²) සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="pendulum">🎡 ක්‍රියාකාරකම 18.1: පැද්දෙන ඔන්චිල්ලාව / සරල අවලම්බය</button>
              <button class="vlab-tab-btn" data-subtab="free-fall">🎯 ක්‍රියාකාරකම 18.2: නිදහස් පතනය හා ශක්ති සංස්ථිතිය</button>
              <button class="vlab-tab-btn" data-subtab="elastic-spring">🏹 ක්‍රියාකාරකම 18.3: දුන්නක ප්‍රත්‍යාස්ථ විභව ශක්තිය (½ke²)</button>
            </div>

            <!-- TAB 1: PENDULUM -->
            <div class="vlab-panel active" data-panel="pendulum">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ස්කන්ධය (m): <span data-role="m-val">4</span> kg</label>
                  <input type="range" min="1" max="10" step="1" value="4" data-role="m-in" />
                </div>
                <div class="sim-control-group">
                  <label>උස (h): <span data-role="h-val">10</span> m</label>
                  <input type="range" min="2" max="20" step="2" value="10" data-role="h-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-pend"></canvas>
                <div class="sim-readout" data-role="readout-pend"></div>
              </div>
            </div>

            <!-- TAB 2: FREE FALL -->
            <div class="vlab-panel" data-panel="free-fall" style="display:none;">
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-fall"></canvas>
                <div class="sim-readout" data-role="readout-fall"></div>
              </div>
            </div>

            <!-- TAB 3: ELASTIC SPRING -->
            <div class="vlab-panel" data-panel="elastic-spring" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>දුන්නේ විතතිය (e): <span data-role="e-val">0.3</span> m</label>
                  <input type="range" min="0.1" max="0.6" step="0.05" value="0.3" data-role="e-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-spring"></canvas>
                <div class="sim-readout" data-role="readout-spring"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "pendulum";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "free-fall") switchTab("free-fall");
          else if (e.detail === "elastic-spring" || e.detail === "spring") switchTab("elastic-spring");
          else switchTab("pendulum");
        });

        // Tab 1: Pendulum
        const mIn = root.querySelector('[data-role="m-in"]');
        const hIn = root.querySelector('[data-role="h-in"]');
        const cvPend = root.querySelector('[data-role="canvas-pend"]');
        const ctxPend = cvPend.getContext("2d");
        const readPend = root.querySelector('[data-role="readout-pend"]');

        // Tab 2: Free fall
        const cvFall = root.querySelector('[data-role="canvas-fall"]');
        const ctxFall = cvFall.getContext("2d");
        const readFall = root.querySelector('[data-role="readout-fall"]');

        // Tab 3: Spring
        const eIn = root.querySelector('[data-role="e-in"]');
        const eVal = root.querySelector('[data-role="e-val"]');
        const cvSpring = root.querySelector('[data-role="canvas-spring"]');
        const ctxSpring = cvSpring.getContext("2d");
        const readSpring = root.querySelector('[data-role="readout-spring"]');

        let phase = 0;
        function loop() {
          if (!document.body.contains(root)) return;
          phase += 0.04;

          if (activeTab === "pendulum") {
            const m = Number(mIn.value);
            const h0 = Number(hIn.value);
            root.querySelector('[data-role="m-val"]').textContent = m;
            root.querySelector('[data-role="h-val"]').textContent = h0;

            const totalE = m * 10 * h0;
            const theta = Math.sin(phase) * 0.65;
            const heightRatio = Math.sin(phase) * Math.sin(phase);
            const px = 125 + Math.sin(theta) * 115;
            const py = 28 + Math.cos(theta) * 115;

            ctxPend.clearRect(0, 0, cvPend.width, cvPend.height);

            ctxPend.strokeStyle = "#cbd5e1";
            ctxPend.lineWidth = 2.5;
            ctxPend.beginPath();
            ctxPend.moveTo(125, 28);
            ctxPend.lineTo(px, py);
            ctxPend.stroke();

            drawSphere3D(ctxPend, px, py, 12 + m * 0.7, "#38bdf8", `${m}kg`);

            const Ep = Math.round(totalE * heightRatio);
            const Ek = Math.round(totalE - Ep);

            // Energy Bars
            const bx = 270, by = 175, maxH = 130;
            const epH = (Ep / totalE) * maxH;
            const ekH = (Ek / totalE) * maxH;

            ctxPend.fillStyle = "#f59e0b";
            ctxPend.fillRect(bx, by - epH, 55, epH);
            ctxPend.fillStyle = "#38bdf8";
            ctxPend.fillRect(bx + 85, by - ekH, 55, ekH);
            ctxPend.fillStyle = "#10b981";
            ctxPend.fillRect(bx + 170, by - maxH, 55, maxH);

            ctxPend.fillStyle = "#f8fafc";
            ctxPend.font = "bold 11px sans-serif";
            ctxPend.textAlign = "center";
            ctxPend.fillText(`Eₚ = ${Ep} J`, bx + 27, by - epH - 8);
            ctxPend.fillText("විභව (mgh)", bx + 27, by + 16);

            ctxPend.fillText(`Eₖ = ${Ek} J`, bx + 112, by - ekH - 8);
            ctxPend.fillText("චාලක (½mv²)", bx + 112, by + 16);

            ctxPend.fillText(`${totalE} J`, bx + 197, by - maxH - 8);
            ctxPend.fillText("මුළු ශක්තිය", bx + 197, by + 16);

            readPend.innerHTML = `<strong>ක්‍රියාකාරකම 18.1:</strong> අන්ත පිහිටීම්වලදී විභව ශක්තිය උපරිම (<strong>Eₚ = ${totalE} J</strong>) වන අතර මධ්‍ය සමතුලිත පිහිටීමේදී චාලක ශක්තිය උපරිම (<strong>Eₖ = ${totalE} J</strong>) වේ. මුළු ශක්තිය නියතයි.`;
          } else if (activeTab === "free-fall") {
            ctxFall.clearRect(0, 0, cvFall.width, cvFall.height);
            const f = (phase * 0.45) % 1;
            const ballY = 30 + f * f * 135;
            const m = 4, h0 = 10;
            const totalE = m * 10 * h0;
            const curH = h0 * (1 - f * f);
            const Ep = Math.round(m * 10 * curH);
            const Ek = Math.round(totalE - Ep);

            ctxFall.fillStyle = "#b45309";
            ctxFall.fillRect(60, 172, 130, 18);
            drawSphere3D(ctxFall, 125, ballY, 15, "#38bdf8", "4kg");

            ctxFall.fillStyle = "#f8fafc";
            ctxFall.font = "bold 13px sans-serif";
            ctxFall.textAlign = "left";
            ctxFall.fillText(`උස h = ${curH.toFixed(1)} m`, 250, 70);
            ctxFall.fillStyle = "#f59e0b";
            ctxFall.fillText(`විභව ශක්තිය Eₚ = mgh = ${Ep} J`, 250, 105);
            ctxFall.fillStyle = "#38bdf8";
            ctxFall.fillText(`චාලක ශක්තිය Eₖ = ½mv² = ${Ek} J`, 250, 135);
            ctxFall.fillStyle = "#10b981";
            ctxFall.fillText(`මුළු ශක්තිය E = Eₚ + Eₖ = ${totalE} J (නියතයි)`, 250, 165);

            readFall.innerHTML = `<strong>ක්‍රියාකාරකම 18.2 (නිදහස් පතනය):</strong> වස්තුව පහළට වැටෙන විට උස අඩුවීමෙන් විභව ශක්තිය අඩුවන අතර, එම අඩුවන ප්‍රමාණයටම ප්‍රවේගය වැඩිවී <strong>චාලක ශක්තිය බවට පරිවර්තනය වේ</strong>.`;
          } else if (activeTab === "elastic-spring") {
            ctxSpring.clearRect(0, 0, cvSpring.width, cvSpring.height);
            const e = Number(eIn.value);
            eVal.textContent = e.toFixed(2);
            const k = 200; // N/m spring constant
            const elasticE = (0.5 * k * e * e).toFixed(1);

            // Wall on left
            ctxSpring.fillStyle = "#475569";
            ctxSpring.fillRect(50, 40, 16, 120);

            // Spring coils
            ctxSpring.strokeStyle = "#38bdf8";
            ctxSpring.lineWidth = 3;
            ctxSpring.beginPath();
            const sx = 66;
            const springLen = 140 + e * 180;
            const coils = 12;
            for (let i = 0; i <= coils; i++) {
              const cx = sx + (i / coils) * springLen;
              const cy = i % 2 === 0 ? 85 : 115;
              if (i === 0) ctxSpring.moveTo(cx, 100); else ctxSpring.lineTo(cx, cy);
            }
            ctxSpring.lineTo(sx + springLen, 100);
            ctxSpring.stroke();

            // Block attached to spring
            ctxSpring.fillStyle = "#f59e0b";
            ctxSpring.fillRect(sx + springLen, 80, 40, 40);

            ctxSpring.fillStyle = "#f8fafc";
            ctxSpring.font = "bold 13px sans-serif";
            ctxSpring.textAlign = "left";
            ctxSpring.fillText(`දුන්නේ දුනු නියතය (k) = ${k} N m⁻¹`, 310, 75);
            ctxSpring.fillText(`විතතිය (e) = ${e.toFixed(2)} m`, 310, 105);
            ctxSpring.fillStyle = "#2dd4bf";
            ctxSpring.fillText(`ප්‍රත්‍යාස්ථ විභව ශක්තිය:`, 310, 135);
            ctxSpring.fillText(`Eₚ = ½ke² = ${elasticE} J`, 310, 160);

            readSpring.innerHTML = `<strong>ක්‍රියාකාරකම 18.3:</strong> දුන්නක් ඇදීමේදී හෝ සම්පීඩනය කිරීමේදී කරන ලද කාර්යය එහි <strong>ප්‍රත්‍යාස්ථ විභව ශක්තිය (Eₚ = ½ke²)</strong> ලෙස ගබඩා වේ. විතතිය e = ${e.toFixed(2)} m විට ගබඩා වූ ශක්තිය = <strong>${elasticE} J</strong>.`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 19: ඕම් නියමය (V = IR) සහ සජීවී ශ්‍රේණිගත/සමාන්තරගත පරිපථ විද්‍යාගාරය
    // =========================================================================
    sim_l19_ohm_circuits: {
      lessonId: 19,
      title: "ක්‍රියාකාරකම් 19.1–19.3 සිමියුලේෂන්: ඕම්ගේ නියමය (V = IR) සහ පරිපථ විද්‍යාගාරය",
      badge: "පාඩම 19 • V = IR හා ප්‍රතිරෝධක",
      desc: "ඕම් නියමය තහවුරු කිරීම (V-I සරල රේඛීය ප්‍රස්තාරය) සහ ශ්‍රේණිගත/සමාන්තරගත පරිපථවල ධාරාව, විභවය හා බල්බ දීප්තිය සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="ohm-verify">📈 ක්‍රියාකාරකම 19.1: ඕම් නියමය තහවුරු කිරීම (V = IR ප්‍රස්තාරය)</button>
              <button class="vlab-tab-btn" data-subtab="circuit-lab">💡 ක්‍රියාකාරකම් 19.2–19.3: ශ්‍රේණිගත හා සමාන්තරගත පරිපථ</button>
            </div>

            <!-- TAB 1: OHM VERIFY -->
            <div class="vlab-panel active" data-panel="ohm-verify">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>විභව අන්තරය (V): <span data-role="v-ohm-val">6</span> V</label>
                  <input type="range" min="1" max="12" step="1" value="6" data-role="v-ohm-in" />
                </div>
                <div class="sim-control-group">
                  <label>නියත ප්‍රතිරෝධය (R): <span data-role="r-ohm-val">4</span> Ω</label>
                  <input type="range" min="2" max="10" step="1" value="4" data-role="r-ohm-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-ohm"></canvas>
                <div class="sim-readout" data-role="readout-ohm"></div>
              </div>
            </div>

            <!-- TAB 2: CIRCUIT LAB -->
            <div class="vlab-panel" data-panel="circuit-lab" style="display:none;">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>පරිපථ සැකසුම:</label>
                  <select class="sim-select" data-role="ctype">
                    <option value="series">ක්‍රියාකාරකම 19.2: ශ්‍රේණිගත ප්‍රතිරෝධක (R = R₁ + R₂)</option>
                    <option value="parallel" selected>ක්‍රියාකාරකම 19.3: සමාන්තරගත ප්‍රතිරෝධක (1/R = 1/R₁ + 1/R₂)</option>
                  </select>
                </div>
                <div class="sim-control-group">
                  <label>R₁: <span data-role="r1-val">12</span> Ω</label>
                  <input type="range" min="2" max="24" step="2" value="12" data-role="r1-in" />
                </div>
                <div class="sim-control-group">
                  <label>R₂: <span data-role="r2-val">6</span> Ω</label>
                  <input type="range" min="2" max="24" step="2" value="6" data-role="r2-in" />
                </div>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-circuit"></canvas>
                <div class="sim-readout" data-role="readout-circuit"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "ohm-verify";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "series" || e.detail === "parallel" || e.detail === "circuit-lab") switchTab("circuit-lab");
          else switchTab("ohm-verify");
        });

        // Tab 1: Ohm Verify
        const vOhmIn = root.querySelector('[data-role="v-ohm-in"]');
        const rOhmIn = root.querySelector('[data-role="r-ohm-in"]');
        const cvOhm = root.querySelector('[data-role="canvas-ohm"]');
        const ctxOhm = cvOhm.getContext("2d");
        const readOhm = root.querySelector('[data-role="readout-ohm"]');

        // Tab 2: Circuits
        const ctypeEl = root.querySelector('[data-role="ctype"]');
        const r1In = root.querySelector('[data-role="r1-in"]');
        const r2In = root.querySelector('[data-role="r2-in"]');
        const cvCirc = root.querySelector('[data-role="canvas-circuit"]');
        const ctxCirc = cvCirc.getContext("2d");
        const readCirc = root.querySelector('[data-role="readout-circuit"]');

        let offset = 0;
        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "ohm-verify") {
            const V = Number(vOhmIn.value);
            const R = Number(rOhmIn.value);
            root.querySelector('[data-role="v-ohm-val"]').textContent = V;
            root.querySelector('[data-role="r-ohm-val"]').textContent = R;

            const I = (V / R).toFixed(2);
            ctxOhm.clearRect(0, 0, cvOhm.width, cvOhm.height);

            // Left: Digital Meters
            ctxOhm.fillStyle = "#1e293b";
            ctxOhm.roundRect(40, 35, 180, 140, 10);
            ctxOhm.fill();
            ctxOhm.strokeStyle = "#475569";
            ctxOhm.stroke();

            ctxOhm.fillStyle = "#38bdf8";
            ctxOhm.font = "bold 13px sans-serif";
            ctxOhm.textAlign = "center";
            ctxOhm.fillText("වෝල්ට්මීටරය: V", 130, 65);
            ctxOhm.fillStyle = "#facc15";
            ctxOhm.font = "bold 20px monospace";
            ctxOhm.fillText(`${V}.0 V`, 130, 95);

            ctxOhm.fillStyle = "#38bdf8";
            ctxOhm.font = "bold 13px sans-serif";
            ctxOhm.fillText("ඇමීටරය: I = V/R", 130, 130);
            ctxOhm.fillStyle = "#2dd4bf";
            ctxOhm.font = "bold 20px monospace";
            ctxOhm.fillText(`${I} A`, 130, 158);

            // Right: V-I Graph
            const gx = 290, gy = 175, gw = 210, gh = 135;
            ctxOhm.strokeStyle = "#64748b";
            ctxOhm.lineWidth = 1.5;
            ctxOhm.beginPath();
            ctxOhm.moveTo(gx, gy - gh);
            ctxOhm.lineTo(gx, gy);
            ctxOhm.lineTo(gx + gw, gy);
            ctxOhm.stroke();

            // Straight line graph through origin
            ctxOhm.strokeStyle = "#2dd4bf";
            ctxOhm.lineWidth = 2.8;
            ctxOhm.beginPath();
            ctxOhm.moveTo(gx, gy);
            const maxI = 12 / R;
            ctxOhm.lineTo(gx + gw, gy - (12 / 12) * gh);
            ctxOhm.stroke();

            // Current Operating Point
            const px = gx + (Number(I) / maxI) * gw;
            const py = gy - (V / 12) * gh;
            drawSphere3D(ctxOhm, px, py, 6, "#f43f5e", "");

            ctxOhm.fillStyle = "#f8fafc";
            ctxOhm.font = "bold 11px sans-serif";
            ctxOhm.fillText("V-I ප්‍රස්තාරය (සරල රේඛීය)", gx + gw / 2, 26);
            ctxOhm.fillStyle = "#cbd5e1";
            ctxOhm.fillText("ධාරාව I (A) →", gx + gw / 2, 195);

            readOhm.innerHTML = `<strong>ක්‍රියාකාරකම 19.1 (ඕම් නියමය):</strong> උෂ්ණත්වය නියත විට සන්නායකයක් තුළින් ගලන ධාරාව (I) එහි දෙකෙළවර විභව අන්තරයට (V) අනුලෝමව සමානුපාතික වේ (<strong>V = IR</strong>). V-I ප්‍රස්තාරයේ බෑවුමෙන් <strong>ප්‍රතිරෝධය (R = ${R} Ω)</strong> ලැබේ.`;
          } else if (activeTab === "circuit-lab") {
            const mode = ctypeEl.value;
            const r1 = Number(r1In.value);
            const r2 = Number(r2In.value);
            const V = 12;
            root.querySelector('[data-role="r1-val"]').textContent = r1;
            root.querySelector('[data-role="r2-val"]').textContent = r2;

            const Req = mode === "series" ? r1 + r2 : (r1 * r2) / (r1 + r2);
            const I = V / Req;
            offset = (offset + Math.max(0.4, I * 0.7)) % 24;

            ctxCirc.clearRect(0, 0, cvCirc.width, cvCirc.height);

            // Circuit loop
            ctxCirc.strokeStyle = "#94a3b8";
            ctxCirc.lineWidth = 3;
            ctxCirc.strokeRect(42, 35, 220, 130);

            // Glowing bulb
            const haloR = Math.min(38, 12 + I * 6);
            const glow = ctxCirc.createRadialGradient(42, 100, 3, 42, 100, haloR);
            glow.addColorStop(0, "#fef08a");
            glow.addColorStop(0.6, "rgba(250, 204, 21, 0.45)");
            glow.addColorStop(1, "transparent");
            ctxCirc.fillStyle = glow;
            ctxCirc.beginPath();
            ctxCirc.arc(42, 100, haloR, 0, Math.PI * 2);
            ctxCirc.fill();
            drawSphere3D(ctxCirc, 42, 100, 11, "#facc15", "💡");

            // Moving charges
            ctxCirc.fillStyle = "#fde047";
            for (let d = offset; d < 220; d += 24) {
              ctxCirc.beginPath();
              ctxCirc.arc(42 + d, 35, 4, 0, Math.PI * 2);
              ctxCirc.arc(262 - d, 165, 4, 0, Math.PI * 2);
              ctxCirc.fill();
            }

            ctxCirc.fillStyle = "#f59e0b";
            ctxCirc.fillRect(88, 25, 52, 20);
            ctxCirc.fillStyle = "#38bdf8";
            ctxCirc.fillRect(165, 25, 52, 20);
            ctxCirc.fillStyle = "#0f172a";
            ctxCirc.font = "bold 11px sans-serif";
            ctxCirc.textAlign = "center";
            ctxCirc.fillText(`R₁=${r1}Ω`, 114, 39);
            ctxCirc.fillText(`R₂=${r2}Ω`, 191, 39);

            ctxCirc.fillStyle = "#2dd4bf";
            ctxCirc.font = "bold 13px sans-serif";
            ctxCirc.fillText(`සමක ප්‍රතිරෝධය R = ${Req.toFixed(2)} Ω`, 152, 92);
            ctxCirc.fillStyle = "#fde047";
            ctxCirc.fillText(`මුළු ධාරාව I = ${I.toFixed(2)} A`, 152, 116);

            // Right Box Info
            ctxCirc.fillStyle = "#1e293b";
            ctxCirc.roundRect(300, 35, 210, 130, 10);
            ctxCirc.fill();
            ctxCirc.strokeStyle = "#475569";
            ctxCirc.stroke();

            ctxCirc.fillStyle = "#38bdf8";
            ctxCirc.font = "bold 13px sans-serif";
            ctxCirc.fillText(mode === "series" ? "ශ්‍රේණිගත පරිපථය" : "සමාන්තරගත පරිපථය", 405, 65);
            ctxCirc.fillStyle = "#cbd5e1";
            ctxCirc.font = "12px sans-serif";
            if (mode === "series") {
              ctxCirc.fillText("• සෑම ප්‍රතිරෝධකයක් තුළින්ම", 405, 95);
              ctxCirc.fillText("  ගලන්නේ එකම ධාරාවකි.", 405, 115);
              ctxCirc.fillText("• R = R₁ + R₂ (ප්‍රතිරෝධය වැඩිවේ)", 405, 140);
            } else {
              ctxCirc.fillText("• සෑම ප්‍රතිරෝධකයකටම", 405, 95);
              ctxCirc.fillText("  ලැබෙන්නේ එකම විභවයකි (12V).", 405, 115);
              ctxCirc.fillText("• 1/R = 1/R₁ + 1/R₂ (සමකය අඩුවේ)", 405, 140);
            }

            readCirc.innerHTML = `<strong>${mode === "series" ? "ක්‍රියාකාරකම 19.2 (ශ්‍රේණිගත)" : "ක්‍රියාකාරකම 19.3 (සමාන්තරගත)"}:</strong> සමක ප්‍රතිරෝධය = <strong>${Req.toFixed(2)} Ω</strong> | ධාරාව = <strong>${I.toFixed(2)} A</strong>.`;
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    },

    // =========================================================================
    // LESSON 20: 3D DNA ද්විත්ව හෙලික්සය, පූනට් කොටුව හා පබළු සම්භාවිතා පරීක්ෂණය
    // =========================================================================
    sim_l20_genetics_punnett: {
      lessonId: 20,
      title: "ක්‍රියාකාරකම් 20.1–20.3 සිමියුලේෂන්: පූනට් කොටුව, මෙන්ඩල්ගේ පබළු පරීක්ෂණය සහ 3D DNA",
      badge: "පාඩම 20 • 3D DNA හා ප්‍රවේණිය",
      desc: "පූනට් කොටුවේ F₁/F₂ ප්‍රවේණිදර්ශ, මෙන්ඩල්ගේ පබළු සම්භාවිතා පරීක්ෂාව (3:1 හා 1:2:1) සහ 3D DNA ද්විත්ව හෙලික්සය සජීවීව නිරීක්ෂණය කරන්න.",
      render: function () {
        return `
          <div class="vlab-container">
            <div class="vlab-subtabs">
              <button class="vlab-tab-btn active" data-subtab="punnett-cross">🔲 ක්‍රියාකාරකම 20.2: පූනට් කොටුව හා ප්‍රවේණික මුහුම්</button>
              <button class="vlab-tab-btn" data-subtab="bead-prob">🔴 ක්‍රියාකාරකම 20.1: පබළු මගින් සම්භාවිතා පරීක්ෂාව</button>
              <button class="vlab-tab-btn" data-subtab="dna-3d-model">🧬 ක්‍රියාකාරකම 20.3: 3D DNA ද්විත්ව හෙලික්සය</button>
            </div>

            <!-- TAB 1: PUNNETT CROSS -->
            <div class="vlab-panel active" data-panel="punnett-cross">
              <div class="sim-controls">
                <div class="sim-control-group">
                  <label>ප්‍රවේණික මුහුම තෝරන්න:</label>
                  <select class="sim-select" data-role="cross-sel">
                    <option value="Tt_Tt" selected>1. මෙන්ඩල්ගේ ඒකාංග මුහුම (Tt × Tt) — (3:1 සහ 1:2:1)</option>
                    <option value="Tt_tt">2. පරීක්ෂණ මුහුම: විෂමයුග්මක උස (Tt) × සමයුග්මක මිටි (tt) — (1:1)</option>
                    <option value="sex">3. මිනිසාගේ ලිංග නිර්ණය: මව (XX) × පියා (XY) — (50% : 50%)</option>
                    <option value="haem">4. හිමොෆීලියාව: වාහක මව (XᴴXʰ) × නිරෝගී පියා (XᴴY)</option>
                    <option value="cb">5. රතු-කොළ වර්ණාන්ධතාව: වාහක මව (XᶜXᶜ) × වර්ණාන්ධ පියා (XᶜY)</option>
                  </select>
                </div>
              </div>
              <div class="sim-stage">
                <div data-role="punnett-table" style="width:100%;max-width:500px;margin:0 auto;"></div>
                <div class="sim-readout" data-role="readout-cross"></div>
              </div>
            </div>

            <!-- TAB 2: BEAD PROBABILITY -->
            <div class="vlab-panel" data-panel="bead-prob" style="display:none;">
              <div class="sim-controls">
                <button class="sim-btn" data-role="pick-beads">🎲 පබළු යුගල 50ක් අහඹු ලෙස තෝරන්න (Sample)</button>
              </div>
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="210" data-role="canvas-bead"></canvas>
                <div class="sim-readout" data-role="readout-bead"></div>
              </div>
            </div>

            <!-- TAB 3: 3D DNA HELIX -->
            <div class="vlab-panel" data-panel="dna-3d-model" style="display:none;">
              <div class="sim-stage">
                <canvas class="sim-canvas" width="540" height="215" data-role="canvas-dna"></canvas>
                <div class="sim-readout" data-role="readout-dna"></div>
              </div>
            </div>
          </div>
        `;
      },
      init: function (root) {
        const tabs = root.querySelectorAll(".vlab-tab-btn");
        const panels = root.querySelectorAll(".vlab-panel");
        let activeTab = "punnett-cross";

        function switchTab(name) {
          activeTab = name;
          tabs.forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
          panels.forEach(p => {
            const isMatch = p.dataset.panel === name;
            p.classList.toggle("active", isMatch);
            p.style.display = isMatch ? "block" : "none";
          });
        }
        tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.subtab)));

        root.addEventListener("sim-preset", (e) => {
          if (e.detail === "bead-prob" || e.detail === "beads") switchTab("bead-prob");
          else if (e.detail === "dna" || e.detail === "dna-3d-model") switchTab("dna-3d-model");
          else switchTab("punnett-cross");
        });

        // Tab 1: Punnett
        const selCross = root.querySelector('[data-role="cross-sel"]');
        const tableHolder = root.querySelector('[data-role="punnett-table"]');
        const readCross = root.querySelector('[data-role="readout-cross"]');

        const CROSSES = {
          Tt_Tt: {
            g1: ["T (උස)", "t (මිටි)"],
            g2: ["T (උස)", "t (මිටි)"],
            cells: [["TT (සමයුග්මක උස 25%)", "Tt (විෂමයුග්මක උස 25%)"], ["Tt (විෂමයුග්මක උස 25%)", "tt (සමයුග්මක මිටි 25%)"]],
            note: "<strong>මෙන්ඩල්ගේ ඒකාංග මුහුම (F₂ පරම්පරාව):</strong> ප්‍රවේණිදර්ශ අනුපාතය <strong>1 TT : 2 Tt : 1 tt</strong> වන අතර රූපානුදර්ශ අනුපාතය <strong>උස 3 : මිටි 1</strong> වේ."
          },
          Tt_tt: {
            g1: ["T", "t"],
            g2: ["t", "t"],
            cells: [["Tt (උස - 25%)", "Tt (උස - 25%)"], ["tt (මිටි - 25%)", "tt (මිටි - 25%)"]],
            note: "<strong>Tt × tt මුහුම:</strong> ජනිතයින්ගෙන් 50%ක් විෂමයුග්මක උස (Tt) ද, 50%ක් සමයුග්මක මිටි (tt) ද වේ (අනුපාතය <strong>1 : 1</strong>)."
          },
          sex: {
            g1: ["X (ඩිම්බ)", "X (ඩිම්බ)"],
            g2: ["X (ශුක්‍රාණු)", "Y (ශුක්‍රාණු)"],
            cells: [["XX (ගැහැනු දරුවා)", "XY (පිරිමි දරුවා)"], ["XX (ගැහැනු දරුවා)", "XY (පිරිමි දරුවා)"]],
            note: "<strong>මිනිසාගේ ලිංග නිර්ණය (20.23 රූපය):</strong> ගැහැනු දරුවෙකු (XX) හෝ පිරිමි දරුවෙකු (XY) ලැබීමේ සම්භාවිතාව <strong>50% : 50%</strong> වේ."
          },
          haem: {
            g1: ["Xᴴ", "Xʰ"],
            g2: ["Xᴴ", "Y"],
            cells: [["XᴴXᴴ (නිරෝගී දුව)", "XᴴY (නිරෝගී පුතා)"], ["XᴴXʰ (වාහක දුව)", "XʰY (රෝගී පුතා)"]],
            note: "<strong>හිමොෆීලියාව (20.24 රූපය):</strong> නිරෝගී දුව (25%), වාහක දුව (25%), නිරෝගී පුතා (25%) සහ හිමොෆීලියා රෝගී පුතා (25%)."
          },
          cb: {
            g1: ["Xᶜ", "Xᶜ (c=නිලීන)"],
            g2: ["Xᶜ (c=නිලීන)", "Y"],
            cells: [["XᶜXᶜ (වාහක දුව)", "XᶜY (නිරෝගී පුතා)"], ["XᶜXᶜ (වර්ණාන්ධ දුව)", "XᶜY (වර්ණාන්ධ පුතා)"]],
            note: "<strong>රතු-කොළ වර්ණාන්ධතාව (20.25 රූපය):</strong> වාහක දුව (25%), වර්ණාන්ධ දුව (25%), නිරෝගී පුතා (25%) සහ වර්ණාන්ධ පුතා (25%)."
          }
        };

        function updateTable() {
          const c = CROSSES[selCross.value];
          tableHolder.innerHTML = `
            <table class="note-table" style="background:var(--bg-card);border:2px solid var(--accent);border-radius:12px;overflow:hidden;width:100%;">
              <thead>
                <tr>
                  <th style="text-align:center;">ජන්මාණු</th>
                  <th style="text-align:center;">${c.g2[0]}</th>
                  <th style="text-align:center;">${c.g2[1]}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style="text-align:center;">${c.g1[0]}</th>
                  <td style="text-align:center;font-weight:700;">${c.cells[0][0]}</td>
                  <td style="text-align:center;font-weight:700;">${c.cells[0][1]}</td>
                </tr>
                <tr>
                  <th style="text-align:center;">${c.g1[1]}</th>
                  <td style="text-align:center;font-weight:700;">${c.cells[1][0]}</td>
                  <td style="text-align:center;font-weight:700;">${c.cells[1][1]}</td>
                </tr>
              </tbody>
            </table>
          `;
          readCross.innerHTML = c.note;
        }
        selCross.addEventListener("change", updateTable);
        updateTable();

        // Tab 2: Bead Probability
        const pickBtn = root.querySelector('[data-role="pick-beads"]');
        const cvBead = root.querySelector('[data-role="canvas-bead"]');
        const ctxBead = cvBead.getContext("2d");
        const readBead = root.querySelector('[data-role="readout-bead"]');

        let redRed = 12, redWhite = 26, whiteWhite = 12;
        pickBtn.addEventListener("click", () => {
          redRed = 0; redWhite = 0; whiteWhite = 0;
          for (let i = 0; i < 50; i++) {
            const b1 = Math.random() < 0.5 ? "R" : "r";
            const b2 = Math.random() < 0.5 ? "R" : "r";
            if (b1 === "R" && b2 === "R") redRed++;
            else if (b1 === "r" && b2 === "r") whiteWhite++;
            else redWhite++;
          }
        });

        // Tab 3: DNA Helix
        const cvDNA = root.querySelector('[data-role="canvas-dna"]');
        const ctxDNA = cvDNA.getContext("2d");
        const readDNA = root.querySelector('[data-role="readout-dna"]');
        let rotY = 0;

        function loop() {
          if (!document.body.contains(root)) return;

          if (activeTab === "bead-prob") {
            ctxBead.clearRect(0, 0, cvBead.width, cvBead.height);

            // 3 bar columns
            const total = redRed + redWhite + whiteWhite;
            const hRR = (redRed / total) * 110;
            const hRW = (redWhite / total) * 110;
            const hWW = (whiteWhite / total) * 110;

            ctxBead.fillStyle = "#ef4444";
            ctxBead.fillRect(90, 160 - hRR, 60, hRR);
            ctxBead.fillStyle = "#f59e0b";
            ctxBead.fillRect(240, 160 - hRW, 60, hRW);
            ctxBead.fillStyle = "#94a3b8";
            ctxBead.fillRect(390, 160 - hWW, 60, hWW);

            ctxBead.fillStyle = "#f8fafc";
            ctxBead.font = "bold 13px sans-serif";
            ctxBead.textAlign = "center";
            ctxBead.fillText(`RR (රතු): ${redRed}`, 120, 150 - hRR);
            ctxBead.fillText(`Rr (රතු): ${redWhite}`, 270, 150 - hRW);
            ctxBead.fillText(`rr (සුදු): ${whiteWhite}`, 420, 150 - hWW);

            ctxBead.fillStyle = "#cbd5e1";
            ctxBead.fillText("සමයුග්මක රතු", 120, 185);
            ctxBead.fillText("විෂමයුග්මක රතු", 270, 185);
            ctxBead.fillText("සමයුග්මක සුදු", 420, 185);

            readBead.innerHTML = `<strong>ක්‍රියාකාරකම 20.1 — පබළු සම්භාවිතා පරීක්ෂාව:</strong> පබළු 50 න් ලැබුණු ප්‍රතිඵල: RR = <strong>${redRed}</strong>, Rr = <strong>${redWhite}</strong>, rr = <strong>${whiteWhite}</strong>. ප්‍රවේණිදර්ශ අනුපාතය ආසන්න වශයෙන් <strong>1 : 2 : 1</strong> වන අතර රූපානුදර්ශ අනුපාතය (රතු : සුදු) <strong>3 : 1</strong> වේ.`;
          } else if (activeTab === "dna-3d-model") {
            rotY += 0.032;
            ctxDNA.clearRect(0, 0, cvDNA.width, cvDNA.height);
            ctxDNA.fillStyle = "#cbd5e1";
            ctxDNA.font = "bold 12px sans-serif";
            ctxDNA.textAlign = "center";
            ctxDNA.fillText("3D DNA ද්විත්ව හෙලික්සය — අනුපූරක භෂ්ම යුගලනය (A = T, G ≡ C)", 270, 22);

            const pairs = 12;
            for (let i = 0; i < pairs; i++) {
              const y = 38 + i * 14;
              const a = rotY + i * 0.55;
              const p1 = project3D(Math.cos(a) * 75, y - 115, Math.sin(a) * 75, 0.15, 0, 270, 115);
              const p2 = project3D(Math.cos(a + Math.PI) * 75, y - 115, Math.sin(a + Math.PI) * 75, 0.15, 0, 270, 115);

              drawCylinder3D(ctxDNA, p1, p2, 3.2, i % 2 === 0 ? "#10b981" : "#f43f5e");
              drawSphere3D(ctxDNA, p1.x, p1.y, 6.5 * p1.scale, "#38bdf8", "");
              drawSphere3D(ctxDNA, p2.x, p2.y, 6.5 * p2.scale, "#a855f7", "");
            }

            readDNA.innerHTML = "<strong>ක්‍රියාකාරකම 20.3 (DNA අණුව):</strong> වොට්සන් සහ ක්‍රික් ඉදිරිපත් කළ DNA ආකෘතිය <strong>ද්විත්ව හෙලික්සයකි</strong>. නියුක්ලියෝටයිඩ ඒකකවලින් සෑදී ඇත. ඇඩිනින් (A) තයිමින් (T) සමග හයිඩ්‍රජන් බන්ධන 2කින් ද, ගුවැනින් (G) සයිටොසින් (C) සමග හයිඩ්‍රජන් බන්ධන 3කින් ද බැඳේ.";
          }

          requestAnimationFrame(loop);
        }
        loop();
      }
    }
  };
})();
