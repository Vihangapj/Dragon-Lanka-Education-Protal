// Grade 10 Science Short Notes & Interactive Simulations Web App Controller
(function () {
  const lessons = (window.ALL_LESSONS || []).sort((a, b) => a.id - b.id);
  const flashcards = window.FLASHCARDS || [];
  const simulations = window.SIMULATIONS || {};

  let activeLessonId = 1;
  let currentMode = "notes"; // 'notes' | 'simulations' | 'flashcards' | 'gallery' | 'quiz'
  let sidebarFilter = "all"; // 'all' | 'part1' | 'part2' | 'bio' | 'chem' | 'phys'
  let searchQuery = "";
  let simSubjectFilter = "all"; // 'all' | 'bio' | 'chem' | 'phys'
  let simSearchFilter = "";
  let completedLessons = JSON.parse(localStorage.getItem("g10_sci_completed") || "[]");

  const navListEl = document.getElementById("lessonNavList");
  const sidebarFiltersEl = document.getElementById("sidebarFilters");
  const mainContentEl = document.getElementById("mainContent");
  const progressTextEl = document.getElementById("progressText");
  const progressFillEl = document.getElementById("progressFill");
  const searchInputEl = document.getElementById("searchInput");
  const mobileSearchInputEl = document.getElementById("mobileSearchInput");
  const clearSearchBtnEl = document.getElementById("clearSearchBtn");
  const clearMobileSearchBtnEl = document.getElementById("clearMobileSearchBtn");
  const themeBtnEl = document.getElementById("themeToggleBtn");
  const lightboxEl = document.getElementById("lightboxModal");
  const lightboxImgEl = document.getElementById("lightboxImg");
  const lightboxCapEl = document.getElementById("lightboxCaption");
  const appSidebarEl = document.getElementById("appSidebar");
  const sidebarOverlayEl = document.getElementById("sidebarOverlay");
  const mobileMenuBtnEl = document.getElementById("mobileMenuBtn");
  const closeSidebarBtnEl = document.getElementById("closeSidebarBtn");
  const mobileLessonPillBtnEl = document.getElementById("mobileLessonPillBtn");
  const mobilePillLessonNameEl = document.getElementById("mobilePillLessonName");
  const backToTopBtnEl = document.getElementById("backToTopBtn");

  function openSidebar() {
    if (appSidebarEl) appSidebarEl.classList.add("drawer-open");
    if (sidebarOverlayEl) sidebarOverlayEl.classList.add("open");
  }

  function closeSidebar() {
    if (appSidebarEl) appSidebarEl.classList.remove("drawer-open");
    if (sidebarOverlayEl) sidebarOverlayEl.classList.remove("open");
  }

  function saveProgress() {
    localStorage.setItem("g10_sci_completed", JSON.stringify(completedLessons));
    updateProgressBar();
  }

  function updateProgressBar() {
    const count = completedLessons.length;
    const total = lessons.length || 20;
    const pct = Math.round((count / total) * 100);
    progressTextEl.textContent = `${count} / ${total} පාඩම් (${pct}%)`;
    progressFillEl.style.width = `${pct}%`;
  }

  function updateSearchUI(value) {
    searchQuery = value;
    if (searchInputEl && searchInputEl.value !== value) searchInputEl.value = value;
    if (mobileSearchInputEl && mobileSearchInputEl.value !== value) mobileSearchInputEl.value = value;

    const desktopBox = searchInputEl ? searchInputEl.closest(".search-box") : null;
    const mobileBox = mobileSearchInputEl ? mobileSearchInputEl.closest(".search-box") : null;

    if (desktopBox) desktopBox.classList.toggle("has-text", Boolean(value && value.trim().length > 0));
    if (mobileBox) mobileBox.classList.toggle("has-text", Boolean(value && value.trim().length > 0));
  }

  function updateMobilePill() {
    if (!mobilePillLessonNameEl) return;
    const current = lessons.find((l) => l.id === activeLessonId);
    if (currentMode === "simulations") {
      mobilePillLessonNameEl.textContent = "සිමියුලේෂන්";
    } else if (currentMode === "flashcards") {
      mobilePillLessonNameEl.textContent = "මතක කාඩ්පත්";
    } else if (currentMode === "gallery") {
      mobilePillLessonNameEl.textContent = "රූප සටහන්";
    } else if (currentMode === "quiz") {
      mobilePillLessonNameEl.textContent = "ප්‍රශ්නාවලිය";
    } else if (current) {
      mobilePillLessonNameEl.textContent = `පාඩම ${current.number}`;
    }
  }

  function getFilteredLessons() {
    return lessons.filter((l) => {
      if (sidebarFilter === "all") return true;
      if (sidebarFilter === "part1" || sidebarFilter === "part2") return l.part === sidebarFilter;
      return l.subject === sidebarFilter;
    });
  }

  function renderSidebar() {
    const filtered = getFilteredLessons();
    navListEl.innerHTML = filtered
      .map((l) => {
        const isActive = currentMode === "notes" && l.id === activeLessonId && !searchQuery;
        const isDone = completedLessons.includes(l.id);
        const partLabel = l.part === "part1" ? "I කොටස" : "II කොටස";
        return `
          <button class="lesson-nav-item ${isActive ? "active" : ""}" data-id="${l.id}">
            <span class="lesson-num" style="background:${l.color}">${l.number}</span>
            <span class="lesson-nav-text">
              <span class="lesson-nav-title">${l.title}</span>
              <span class="lesson-nav-meta">${l.icon} ${l.subjectName} • ${partLabel}</span>
            </span>
            ${isDone ? '<span class="lesson-check" title="අවසන් කරන ලදී">✔</span>' : ""}
          </button>
        `;
      })
      .join("");

    navListEl.querySelectorAll(".lesson-nav-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeLessonId = Number(btn.getAttribute("data-id"));
        currentMode = "notes";
        updateSearchUI("");
        updateModeButtons();
        updateMobilePill();
        renderSidebar();
        renderMain();
        closeSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function updateModeButtons() {
    document.querySelectorAll(".mode-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-mode") === currentMode);
    });
  }

  function renderSubtopic(st) {
    const pointsHtml = (st.points || []).map((p) => `<li>${p}</li>`).join("");

    const subsectionsHtml = (st.subsections || [])
      .map(
        (sub) => `
        <div class="subsection-box">
          <h4>${sub.heading}</h4>
          <ul class="points-list">
            ${(sub.items || []).map((it) => `<li>${it}</li>`).join("")}
          </ul>
        </div>
      `
      )
      .join("");

    const tablesHtml = (st.tables || [])
      .map(
        (tb) => `
        <div class="table-wrapper">
          <div class="table-title">📋 ${tb.title}</div>
          <table class="note-table">
            <thead>
              <tr>${tb.headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${tb.rows
                .map(
                  (row) =>
                    `<tr>${row
                      .map((cell) => `<td>${String(cell).replace(/\n/g, "<br>")}</td>`)
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `
      )
      .join("");

    const activitiesHtml = (st.activities || [])
      .map(
        (act) => `
        <div class="activity-box">
          <div class="activity-box-header">
            <div class="activity-box-title">🔬 ${act.title}</div>
            ${
              act.simId
                ? `<button class="activity-sim-jump-btn" data-sim-jump="${act.simId}" data-sim-preset="${act.simPreset || ""}">
                    🧪 සිමියුලේෂන් එක ක්‍රියාත්මක කරන්න
                  </button>`
                : ""
            }
          </div>
          ${act.materials ? `<p style="font-size:0.88rem;margin-bottom:0.45rem;"><strong>අවශ්‍ය ද්‍රව්‍ය:</strong> ${act.materials}</p>` : ""}
          ${
            act.steps && act.steps.length
              ? `<ul class="points-list" style="margin-bottom:0.5rem;">${act.steps.map((s) => `<li>${s}</li>`).join("")}</ul>`
              : ""
          }
          ${act.observation ? `<p style="font-size:0.88rem;margin-bottom:0.25rem;"><strong>🔍 නිරීක්ෂණය:</strong> ${act.observation}</p>` : ""}
          ${act.conclusion ? `<p style="font-size:0.88rem;"><strong>✅ නිගමනය:</strong> ${act.conclusion}</p>` : ""}
        </div>
      `
      )
      .join("");

    const imagesHtml =
      st.images && st.images.length
        ? `
        <div class="images-grid">
          ${st.images
            .map(
              (im) => `
              <figure class="figure-card" data-src="${im.src}" data-cap="${im.caption.replace(/"/g, "&quot;")}">
                <img src="${im.src}" alt="${im.caption.replace(/"/g, "&quot;")}" loading="lazy" />
                <figcaption class="figure-caption">🖼️ ${im.caption} <span style="color:var(--accent);font-weight:700;">(විශාල කිරීමට ක්ලික් කරන්න)</span></figcaption>
              </figure>
            `
            )
            .join("")}
        </div>
      `
        : "";

    return `
      <section class="subtopic-card" id="sub-${st.id}">
        <div class="subtopic-header">
          <h3>${st.title}</h3>
          ${st.badge ? `<span class="subtopic-badge">${st.badge}</span>` : ""}
        </div>
        <ul class="points-list">${pointsHtml}</ul>
        ${subsectionsHtml}
        ${tablesHtml}
        ${activitiesHtml}
        ${imagesHtml}
      </section>
    `;
  }

  function renderSimulationCard(simKey) {
    const sim = simulations[simKey];
    if (!sim) return "";
    return `
      <section class="sim-card" id="sim-card-${simKey}" data-sim-key="${simKey}">
        <div class="sim-header">
          <h3>🧪 ${sim.title}</h3>
          <span class="sim-badge">${sim.badge}</span>
        </div>
        <p class="sim-desc">${sim.desc}</p>
        <div class="sim-body">${sim.render()}</div>
      </section>
    `;
  }

  function renderQuizBlock(quizList, prefix) {
    if (!quizList || !quizList.length) return "";
    return `
      <div class="quiz-section">
        <h3>🧠 පාඩමේ දැනුම පරීක්ෂාව (ක්ෂණික ප්‍රශ්නාවලිය)</h3>
        ${quizList
          .map(
            (qItem, idx) => `
            <div class="quiz-question-card" data-qidx="${prefix}-${idx}" data-ans="${qItem.answer}">
              <div class="quiz-q-text">${idx + 1}. ${qItem.q}</div>
              <div class="quiz-options">
                ${qItem.options
                  .map(
                    (opt, oIdx) => `
                    <button class="quiz-opt-btn" data-oidx="${oIdx}">${opt}</button>
                  `
                  )
                  .join("")}
              </div>
              <div class="quiz-explanation">💡 ${qItem.explanation}</div>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  function attachInteractiveHandlers() {
    // Lightbox for images
    mainContentEl.querySelectorAll(".figure-card").forEach((card) => {
      card.addEventListener("click", () => {
        lightboxImgEl.src = card.getAttribute("data-src");
        lightboxCapEl.textContent = card.getAttribute("data-cap");
        lightboxEl.classList.add("open");
      });
    });

    // Subtopic jump pills
    mainContentEl.querySelectorAll(".subtopic-jump-pill[data-target]").forEach((pill) => {
      pill.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = pill.getAttribute("data-target");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Interactive simulations initialization
    mainContentEl.querySelectorAll(".sim-card[data-sim-key]").forEach((simCard) => {
      const key = simCard.getAttribute("data-sim-key");
      const simObj = simulations[key];
      if (simObj && typeof simObj.init === "function") {
        simObj.init(simCard);
      }
    });

    // Activity simulation jump buttons
    mainContentEl.querySelectorAll(".activity-sim-jump-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const simKey = btn.getAttribute("data-sim-jump");
        const preset = btn.getAttribute("data-sim-preset");
        const targetSim =
          mainContentEl.querySelector(`.sim-card[data-sim-key="${simKey}"]`) ||
          mainContentEl.querySelector(".sim-card");
        if (targetSim) {
          if (preset && preset !== "default") {
            const subtabBtn = targetSim.querySelector(`.vlab-tab-btn[data-subtab="${preset}"]`);
            if (subtabBtn) {
              subtabBtn.click();
            }
            const selects = targetSim.querySelectorAll("select");
            selects.forEach((sel) => {
              const opt = Array.from(sel.options).find((o) => o.value === preset);
              if (opt) {
                sel.value = preset;
                sel.dispatchEvent(new Event("change", { bubbles: true }));
              }
            });
          }
          targetSim.dispatchEvent(new CustomEvent("sim-preset", { detail: preset }));
          targetSim.scrollIntoView({ behavior: "smooth", block: "center" });
          targetSim.classList.add("pulse-highlight");
          setTimeout(() => targetSim.classList.remove("pulse-highlight"), 2200);
        }
      });
    });

    // Quiz buttons
    mainContentEl.querySelectorAll(".quiz-question-card").forEach((qCard) => {
      const correctIdx = Number(qCard.getAttribute("data-ans"));
      const expEl = qCard.querySelector(".quiz-explanation");
      const buttons = qCard.querySelectorAll(".quiz-opt-btn");

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const picked = Number(btn.getAttribute("data-oidx"));
          buttons.forEach((b, i) => {
            b.disabled = true;
            if (i === correctIdx) b.classList.add("correct");
          });
          if (picked !== correctIdx) {
            btn.classList.add("wrong");
          }
          if (expEl) expEl.style.display = "block";
        });
      });
    });
  }

  function renderLessonView(lesson) {
    const isDone = completedLessons.includes(lesson.id);
    const prevLesson = lessons.find((l) => l.id === lesson.id - 1);
    const nextLesson = lessons.find((l) => l.id === lesson.id + 1);
    const partLabel = lesson.part === "part1" ? "I කොටස (පාඩම් 1-12)" : "II කොටස (පාඩම් 13-20)";

    const jumpBarHtml =
      lesson.subtopics && lesson.subtopics.length
        ? `
        <div class="subtopic-jump-bar">
          ${lesson.subtopics
            .map(
              (st) =>
                `<a href="#sub-${st.id}" class="subtopic-jump-pill" data-target="sub-${st.id}">${st.title.split("(")[0].trim()}</a>`
            )
            .join("")}
          ${
            lesson.simId
              ? `<a href="#sim-card-${lesson.simId}" class="subtopic-jump-pill" data-target="sim-card-${lesson.simId}" style="border-color:var(--accent);color:var(--accent);">🧪 සිමියුලේෂන් විද්‍යාගාරය</a>`
              : ""
          }
        </div>
      `
        : "";

    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <div class="lesson-hero-top">
          <div>
            <span class="lesson-tag" style="background:${lesson.color}">
              ${lesson.icon} පාඩම ${lesson.number} • ${lesson.subjectName}
            </span>
            <span class="lesson-part-badge">${partLabel}</span>
            <h2>${lesson.title}</h2>
            <div class="lesson-subtitle">${lesson.subtitle}</div>
          </div>
          <button id="toggleCompleteBtn" class="complete-toggle-btn ${isDone ? "done" : ""}">
            ${isDone ? "✔ පාඩම අවසන් කර ඇත" : "○ පාඩම අවසන් ලෙස ලකුණු කරන්න"}
          </button>
        </div>
        <div class="lesson-summary" style="border-left-color:${lesson.color}">
          <strong>📌 පාඩමේ සාරාංශය:</strong> ${lesson.summary}
        </div>
        ${jumpBarHtml}
      </div>

      ${lesson.subtopics.map((st) => renderSubtopic(st)).join("")}

      ${lesson.simId ? renderSimulationCard(lesson.simId) : ""}

      ${renderQuizBlock(lesson.quiz, `L${lesson.id}`)}

      <div class="lesson-footer-nav">
        <button class="nav-step-btn" id="prevLessonBtn" ${!prevLesson ? "disabled" : ""}>
          ← ${prevLesson ? `${prevLesson.number}. ${prevLesson.title}` : "පෙර පාඩම"}
        </button>
        <button class="nav-step-btn" id="nextLessonBtn" ${!nextLesson ? "disabled" : ""}>
          ${nextLesson ? `${nextLesson.number}. ${nextLesson.title}` : "මීළඟ පාඩම"} →
        </button>
      </div>
    `;

    const completeBtn = document.getElementById("toggleCompleteBtn");
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        if (completedLessons.includes(lesson.id)) {
          completedLessons = completedLessons.filter((id) => id !== lesson.id);
        } else {
          completedLessons.push(lesson.id);
        }
        saveProgress();
        renderSidebar();
        renderLessonView(lesson);
      });
    }

    const prevBtn = document.getElementById("prevLessonBtn");
    if (prevBtn && prevLesson) {
      prevBtn.addEventListener("click", () => {
        activeLessonId = prevLesson.id;
        updateMobilePill();
        renderSidebar();
        renderMain();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    const nextBtn = document.getElementById("nextLessonBtn");
    if (nextBtn && nextLesson) {
      nextBtn.addEventListener("click", () => {
        activeLessonId = nextLesson.id;
        updateMobilePill();
        renderSidebar();
        renderMain();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    attachInteractiveHandlers();
  }

  function renderSimulationsMode() {
    const simKeys = Object.keys(simulations);

    // Filter simulation keys by subject & search query
    const filteredKeys = simKeys.filter((key) => {
      const sim = simulations[key];
      const lesson = lessons.find((l) => l.id === sim.lessonId);
      const subject = lesson ? lesson.subject : "";

      if (simSubjectFilter !== "all" && subject !== simSubjectFilter) {
        return false;
      }

      if (simSearchFilter) {
        const q = simSearchFilter.toLowerCase();
        const searchable = (
          (lesson ? `පාඩම ${lesson.number} ${lesson.title}` : "") +
          " " +
          sim.title +
          " " +
          sim.badge +
          " " +
          sim.desc
        ).toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      return true;
    });

    const isFiltered = simSubjectFilter !== "all" || simSearchFilter.length > 0;

    mainContentEl.innerHTML = `
      <div class="lesson-hero sim-mode-hero">
        <div class="sim-hero-top">
          <span class="lesson-tag" style="background: linear-gradient(135deg, #0d9488, #2563eb);">
            🧪 අන්තර්ක්‍රියාකාරී විද්‍යාගාරය
          </span>
          <h2>විද්‍යාත්මක ක්‍රියාකාරකම් හා සිමියුලේෂන් (${simKeys.length})</h2>
          <p class="lesson-subtitle">10 ශ්‍රේණිය විද්‍යාව පෙළපොතේ සියලුම පාඩම් 20 සඳහා වන ප්‍රායෝගික පරීක්ෂණ, 3D ආකෘති හා ගණනය කිරීම් සජීවීව අත්හදා බලන්න.</p>
        </div>

        <!-- Mobile & Desktop Quick Lesson Jump Dropdown -->
        <div class="sim-jump-bar">
          <label for="simJumpSelect" class="sim-jump-label">
            <span>🚀</span> <span>පාඩමේ සිමියුලේෂනයට සෘජුවම පිවිසෙන්න:</span>
          </label>
          <div class="sim-select-wrap">
            <select id="simJumpSelect" class="sim-jump-select">
              <option value="">-- පාඩම තෝරන්න (පාඩම් 1 සිට 20 දක්වා) --</option>
              ${simKeys
                .map((key) => {
                  const sim = simulations[key];
                  const l = lessons.find((les) => les.id === sim.lessonId);
                  const cleanTitle = sim.title
                    .replace(/^ක්‍රියාකාරකම්?\s*[\d\.\–\-]+\s*(සිමියුලේෂන්:?)?\s*/i, "")
                    .replace(/^අතත්‍ය විද්‍යාගාරය:\s*/i, "")
                    .trim();
                  return `<option value="${key}">පාඩම ${l ? l.number : sim.lessonId}: ${cleanTitle}</option>`;
                })
                .join("")}
            </select>
          </div>
        </div>

        <!-- Subject Filter Chips and Search -->
        <div class="sim-toolbar">
          <div class="sim-filter-chips">
            <button class="filter-chip ${simSubjectFilter === "all" ? "active" : ""}" data-sim-filter="all">
              සියල්ල (${simKeys.length})
            </button>
            <button class="filter-chip ${simSubjectFilter === "bio" ? "active" : ""}" data-sim-filter="bio">
              🌿 ජීව විද්‍යාව
            </button>
            <button class="filter-chip ${simSubjectFilter === "chem" ? "active" : ""}" data-sim-filter="chem">
              ⚗️ රසායන විද්‍යාව
            </button>
            <button class="filter-chip ${simSubjectFilter === "phys" ? "active" : ""}" data-sim-filter="phys">
              ⚡ භෞතික විද්‍යාව
            </button>
          </div>

          <div class="sim-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="simSearchInput" placeholder="සිමියුලේෂන් සොයන්න (උදා: ආහාර, පරමාණු, කාච)..." value="${simSearchFilter}" autocomplete="off" />
            ${
              simSearchFilter
                ? `<button id="clearSimSearchBtn" class="search-clear-btn" style="display:block;">✕</button>`
                : ""
            }
          </div>
        </div>

        <div class="sim-count-badge">
          ${
            isFiltered
              ? `🔍 සෙවුම් ප්‍රතිඵල: සිමියුලේෂන් 20 න් <strong>${filteredKeys.length}</strong> ක් පෙන්වයි`
              : `📌 සියලුම සිමියුලේෂන් 20 පහත දැක්වේ`
          }
        </div>
      </div>

      <div id="simCardsContainer">
        ${
          filteredKeys.length
            ? filteredKeys.map((key) => renderSimulationCard(key)).join("")
            : `
            <div class="sim-empty-state">
              <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
              <h3>සෙවුමට ගැළපෙන සිමියුලේෂන් කිසිවක් හමු නොවීය</h3>
              <p style="margin-top: 0.4rem; font-size: 0.9rem;">වෙනත් වචනයක් යොදා සොයන්න හෝ පෙරහන 'සියල්ල' ලෙස වෙනස් කරන්න.</p>
              <button class="sim-btn secondary" id="resetSimFilterBtn" style="margin-top: 1rem;">සියලුම සිමියුලේෂන් පෙන්වන්න</button>
            </div>
          `
        }
      </div>
    `;

    // Bind Jump Select
    const jumpSelect = document.getElementById("simJumpSelect");
    if (jumpSelect) {
      jumpSelect.addEventListener("change", (e) => {
        const chosenKey = e.target.value;
        if (!chosenKey) return;

        // If target simulation is filtered out by subject or search, clear filters first
        const isCurrentlyVisible = filteredKeys.includes(chosenKey);
        if (!isCurrentlyVisible) {
          simSubjectFilter = "all";
          simSearchFilter = "";
          renderSimulationsMode();
        }

        setTimeout(() => {
          const targetCard = document.querySelector(`.sim-card[data-sim-key="${chosenKey}"]`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
            targetCard.classList.add("pulse-highlight");
            setTimeout(() => targetCard.classList.remove("pulse-highlight"), 2200);
          }
        }, isCurrentlyVisible ? 50 : 250);
      });
    }

    // Bind Filter Chips
    mainContentEl.querySelectorAll("[data-sim-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        simSubjectFilter = chip.getAttribute("data-sim-filter");
        renderSimulationsMode();
      });
    });

    // Bind Search Input
    const simSearchInput = document.getElementById("simSearchInput");
    if (simSearchInput) {
      simSearchInput.addEventListener("input", (e) => {
        simSearchFilter = e.target.value.trim();
        renderSimulationsMode();
        const newInp = document.getElementById("simSearchInput");
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      });
    }

    const clearSimSearchBtn = document.getElementById("clearSimSearchBtn");
    if (clearSimSearchBtn) {
      clearSimSearchBtn.addEventListener("click", () => {
        simSearchFilter = "";
        renderSimulationsMode();
      });
    }

    const resetSimFilterBtn = document.getElementById("resetSimFilterBtn");
    if (resetSimFilterBtn) {
      resetSimFilterBtn.addEventListener("click", () => {
        simSubjectFilter = "all";
        simSearchFilter = "";
        renderSimulationsMode();
      });
    }

    attachInteractiveHandlers();
  }

  function renderSearchResults(q) {
    const term = q.trim().toLowerCase();
    const matchedSubtopics = [];

    lessons.forEach((l) => {
      l.subtopics.forEach((st) => {
        const blob = JSON.stringify(st).toLowerCase() + " " + l.title.toLowerCase();
        if (blob.includes(term)) {
          matchedSubtopics.push({ lesson: l, subtopic: st });
        }
      });
    });

    if (!matchedSubtopics.length) {
      mainContentEl.innerHTML = `
        <div class="lesson-hero">
          <h2>🔍 "${q}" සඳහා ගැළපෙන සටහන් හමු නොවීය</h2>
          <p class="lesson-subtitle">වෙනත් විද්‍යාත්මක පදයක් (උදා: එන්සයිම, නිව්ටන්, ඝර්ෂණය, මවුලය, ඕම් නියමය, මෙන්ඩල්, ආකිමිඩීස්) ටයිප් කර බලන්න.</p>
        </div>
      `;
      return;
    }

    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <h2>🔍 "${q}" සඳහා සෙවුම් ප්‍රතිඵල (${matchedSubtopics.length})</h2>
        <p class="lesson-subtitle">අදාළ පාඩම් කොටස් පහතින් දැක්වේ.</p>
      </div>
      ${matchedSubtopics
        .map(
          (item) => `
          <div style="margin-bottom:0.4rem;font-weight:700;color:${item.lesson.color}">
            ${item.lesson.icon} පාඩම ${item.lesson.number}: ${item.lesson.title} (${item.lesson.subjectName})
          </div>
          ${renderSubtopic(item.subtopic)}
        `
        )
        .join("")}
    `;
    attachInteractiveHandlers();
  }

  function renderFlashcardsMode() {
    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <h2>🗂️ විභාග මතක කාඩ්පත් සහ සූත්‍ර එකතුව (Flashcards - ${flashcards.length})</h2>
        <p class="lesson-subtitle">සියලුම පාඩම් 20 ආවරණය වන ප්‍රධාන සමීකරණ, රසායනික පරීක්ෂා සහ විද්‍යාත්මක නියම ඉක්මනින් මතක තබා ගැනීමට භාවිත කරන්න.</p>
      </div>
      <div class="flashcards-container">
        ${flashcards
          .map(
            (fc) => `
            <div class="flashcard">
              <div>
                <span class="subtopic-badge" style="display:inline-block;margin-bottom:0.5rem">පාඩම ${String(fc.lesson).padStart(2, "0")}</span>
                <div class="flashcard-term">${fc.term}</div>
                <div class="flashcard-def">${fc.def}</div>
              </div>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }

  function renderGalleryMode() {
    const allImgs = [];
    lessons.forEach((l) => {
      l.subtopics.forEach((st) => {
        (st.images || []).forEach((im) => {
          allImgs.push({ lesson: l, ...im });
        });
      });
    });

    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <h2>🖼️ පෙළපොතේ රූප සටහන්, ප්‍රස්තාර සහ ඇටවුම් එකතුව (${allImgs.length})</h2>
        <p class="lesson-subtitle">ඕනෑම රූප සටහනක් විශාල කර බැලීමට එය මත ක්ලික් කරන්න.</p>
      </div>
      <div class="images-grid">
        ${allImgs
          .map(
            (im) => `
            <figure class="figure-card" data-src="${im.src}" data-cap="${im.caption.replace(/"/g, "&quot;")}">
              <img src="${im.src}" alt="${im.caption.replace(/"/g, "&quot;")}" loading="lazy" />
              <figcaption class="figure-caption">
                <strong style="color:${im.lesson.color}">[පාඩම ${im.lesson.number}]</strong> ${im.caption}
              </figcaption>
            </figure>
          `
          )
          .join("")}
      </div>
    `;
    attachInteractiveHandlers();
  }

  function renderAllQuizzesMode() {
    const combined = [];
    lessons.forEach((l) => {
      (l.quiz || []).forEach((q) => {
        combined.push({ ...q, q: `[පාඩම ${l.number} - ${l.title}] ${q.q}` });
      });
    });

    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <h2>🏆 සමස්ත විභාග පෙරහුරු ප්‍රශ්නාවලිය (ප්‍රශ්න ${combined.length})</h2>
        <p class="lesson-subtitle">10 ශ්‍රේණිය විද්‍යාව පාඩම් 20 ම ආවරණය වන බහුවරණ ප්‍රශ්නවලට පිළිතුරු සපයා ඔබේ දැනුම පරීක්ෂා කරගන්න.</p>
      </div>
      ${renderQuizBlock(combined, "ALL")}
    `;
    attachInteractiveHandlers();
  }

  function renderMain() {
    if (searchQuery.trim().length > 0) {
      renderSearchResults(searchQuery);
      return;
    }
    if (currentMode === "simulations") {
      renderSimulationsMode();
      return;
    }
    if (currentMode === "flashcards") {
      renderFlashcardsMode();
      return;
    }
    if (currentMode === "gallery") {
      renderGalleryMode();
      return;
    }
    if (currentMode === "quiz") {
      renderAllQuizzesMode();
      return;
    }
    const lesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
    if (lesson) renderLessonView(lesson);
  }

  // Event Listeners
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMode = btn.getAttribute("data-mode");
      updateSearchUI("");
      updateModeButtons();
      updateMobilePill();
      renderSidebar();
      renderMain();
      closeSidebar();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if (sidebarFiltersEl) {
    sidebarFiltersEl.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        sidebarFilter = chip.getAttribute("data-filter");
        sidebarFiltersEl.querySelectorAll(".filter-chip").forEach((c) => {
          c.classList.toggle("active", c === chip);
        });
        renderSidebar();
      });
    });
  }

  if (searchInputEl) {
    searchInputEl.addEventListener("input", (e) => {
      updateSearchUI(e.target.value);
      renderSidebar();
      renderMain();
    });
  }

  if (mobileSearchInputEl) {
    mobileSearchInputEl.addEventListener("input", (e) => {
      updateSearchUI(e.target.value);
      renderSidebar();
      renderMain();
    });
  }

  if (clearSearchBtnEl) {
    clearSearchBtnEl.addEventListener("click", () => {
      updateSearchUI("");
      if (searchInputEl) searchInputEl.focus();
      renderSidebar();
      renderMain();
    });
  }

  if (clearMobileSearchBtnEl) {
    clearMobileSearchBtnEl.addEventListener("click", () => {
      updateSearchUI("");
      if (mobileSearchInputEl) mobileSearchInputEl.focus();
      renderSidebar();
      renderMain();
    });
  }

  if (mobileMenuBtnEl) {
    mobileMenuBtnEl.addEventListener("click", () => {
      openSidebar();
    });
  }

  if (closeSidebarBtnEl) {
    closeSidebarBtnEl.addEventListener("click", () => {
      closeSidebar();
    });
  }

  if (sidebarOverlayEl) {
    sidebarOverlayEl.addEventListener("click", () => {
      closeSidebar();
    });
  }

  if (mobileLessonPillBtnEl) {
    mobileLessonPillBtnEl.addEventListener("click", () => {
      openSidebar();
    });
  }

  if (backToTopBtnEl) {
    backToTopBtnEl.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  themeBtnEl.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeBtnEl.textContent = isDark ? "🌙" : "☀️";
  });

  document.getElementById("closeLightboxBtn").addEventListener("click", () => {
    lightboxEl.classList.remove("open");
  });

  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) lightboxEl.classList.remove("open");
  });

  // Init
  updateProgressBar();
  updateMobilePill();
  renderSidebar();
  renderMain();
})();
