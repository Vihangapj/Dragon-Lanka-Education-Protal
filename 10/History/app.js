// Grade 10 History Short Notes Web App Controller
(function () {
  const lessons = window.ALL_LESSONS || [];
  const flashcards = window.FLASHCARDS || [];

  let activeLessonId = 1;
  let currentMode = "notes"; // 'notes' | 'flashcards' | 'gallery' | 'quiz'
  let searchQuery = "";
  let completedLessons = JSON.parse(localStorage.getItem("g10_hist_completed") || "[]");

  const navListEl = document.getElementById("lessonNavList");
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
    localStorage.setItem("g10_hist_completed", JSON.stringify(completedLessons));
    updateProgressBar();
  }

  function updateProgressBar() {
    const count = completedLessons.length;
    const total = lessons.length || 10;
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
    if (currentMode === "flashcards") {
      mobilePillLessonNameEl.textContent = "මතක කාඩ්පත්";
    } else if (currentMode === "gallery") {
      mobilePillLessonNameEl.textContent = "සිතියම් හා රූප";
    } else if (currentMode === "quiz") {
      mobilePillLessonNameEl.textContent = "ප්‍රශ්නාවලිය";
    } else if (current) {
      mobilePillLessonNameEl.textContent = `පාඩම ${current.number}`;
    }
  }

  function renderSidebar() {
    navListEl.innerHTML = lessons
      .map((l) => {
        const isActive = currentMode === "notes" && l.id === activeLessonId && !searchQuery;
        const isDone = completedLessons.includes(l.id);
        return `
          <button class="lesson-nav-item ${isActive ? "active" : ""}" data-id="${l.id}">
            <span class="lesson-num" style="background:${l.color}">${l.number}</span>
            <span class="lesson-nav-text">
              <span class="lesson-nav-title">${l.title}</span>
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

    const imagesHtml =
      st.images && st.images.length
        ? `
        <div class="images-grid">
          ${st.images
            .map(
              (im) => `
              <figure class="figure-card" data-src="${im.src}" data-cap="${im.caption.replace(/"/g, "&quot;")}">
                <img src="${im.src}" alt="${im.caption.replace(/"/g, "&quot;")}" loading="lazy" />
                <figcaption class="figure-caption">🖼️ ${im.caption}</figcaption>
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
        ${imagesHtml}
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

    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <div class="lesson-hero-top">
          <div>
            <span class="lesson-tag" style="background:${lesson.color}">
              ${lesson.icon} පාඩම ${lesson.number}
            </span>
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
      </div>

      ${lesson.subtopics.map((st) => renderSubtopic(st)).join("")}

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
          <p class="lesson-subtitle">වෙනත් සිංහල වචනයක් (උදා: මහාවංසය, පරුමක, බිසෝකොටුව, දන්තුරේ, පුනරුදය) ටයිප් කර බලන්න.</p>
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
            ${item.lesson.icon} පාඩම ${item.lesson.number}: ${item.lesson.title}
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
        <h2>🗂️ විභාග මතක කාඩ්පත් (Flashcards - ${flashcards.length})</h2>
        <p class="lesson-subtitle">සියලුම පාඩම් 10 ආවරණය වන ප්‍රධාන සංකල්ප, සෙල්ලිපි නාම සහ ඓතිහාසික සිදුවීම් ඉක්මනින් මතක තබා ගැනීමට භාවිත කරන්න.</p>
      </div>
      <div class="flashcards-container">
        ${flashcards
          .map(
            (fc) => `
            <div class="flashcard">
              <div>
                <span class="subtopic-badge" style="display:inline-block;margin-bottom:0.5rem">පාඩම 0${fc.lesson}</span>
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
        <h2>🗺️ පෙළපොතේ සිතියම්, රූප සටහන් සහ ඡායාරූප එකතුව (${allImgs.length})</h2>
        <p class="lesson-subtitle">ඕනෑම රූපයක් හෝ සිතියමක් විශාල කර බැලීමට එය මත ක්ලික් කරන්න.</p>
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
        combined.push({ ...q, q: `[පාඩම ${l.number}] ${q.q}` });
      });
    });

    mainContentEl.innerHTML = `
      <div class="lesson-hero">
        <h2>🏆 සමස්ත විභාග පෙරහුරු ප්‍රශ්නාවලිය (ප්‍රශ්න ${combined.length})</h2>
        <p class="lesson-subtitle">10 ශ්‍රේණිය ඉතිහාසය පාඩම් 10 ම ආවරණය වන බහුවරණ ප්‍රශ්නවලට පිළිතුරු සපයා ඔබේ දැනුම පරීක්ෂා කරගන්න.</p>
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
