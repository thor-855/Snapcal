// ===== SnapCal — Frontend Logic =====

// ===== STATE =====
let calorieGoal = parseInt(localStorage.getItem("calorieGoal")) || 2000;
let foodLog = JSON.parse(localStorage.getItem("foodLog") || "{}");
let selectedFood = null;
let selectedMealFilter = "all";
let debounceTimer = null;
let currentHistoryRange = "week";

// Ensure today's log exists
const today = new Date().toISOString().split("T")[0];
if (!foodLog[today]) foodLog[today] = [];

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const ringProgress = $(".ring-progress");
const ringCalories = $("#ringCalories");
const ringGoal = $("#ringGoal");
const headerDate = $("#headerDate");

const totalProtein = $("#totalProtein");
const totalCarbs = $("#totalCarbs");
const totalFat = $("#totalFat");
const totalFiber = $("#totalFiber");
const proteinBar = $("#proteinBar");
const carbsBar = $("#carbsBar");
const fatBar = $("#fatBar");
const fiberBar = $("#fiberBar");

const foodSearch = $("#foodSearch");
const clearSearch = $("#clearSearch");
const searchResults = $("#searchResults");
const categoryPills = $("#categoryPills");
const categoryFoods = $("#categoryFoods");

const foodModal = $("#foodModal");
const goalModal = $("#goalModal");
const logList = $("#logList");
const logActions = $("#logActions");
const emptyState = $("#emptyState");
const toast = $("#toast");
const toastMsg = $("#toastMsg");

// ===== INIT =====
function init() {
    setDate();
    updateDashboard();
    renderLog();
    loadCategories();
    setupEventListeners();
    renderHistoryChart("week");
    renderAchievements();
    renderLeaderboard();
}

function setDate() {
    const options = { weekday: "long", month: "short", day: "numeric" };
    headerDate.textContent = new Date().toLocaleDateString("en-US", options);
}

// ===== DASHBOARD UPDATE =====
function updateDashboard() {
    const entries = foodLog[today] || [];
    const totals = entries.reduce(
        (acc, e) => ({
            calories: acc.calories + e.calories,
            protein: acc.protein + e.protein,
            carbs: acc.carbs + e.carbs,
            fat: acc.fat + e.fat,
            fiber: acc.fiber + e.fiber,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );

    // Progress Ring
    const circumference = 2 * Math.PI * 85; // 534.07
    const pct = Math.min(totals.calories / calorieGoal, 1);
    const offset = circumference - pct * circumference;
    ringProgress.style.strokeDashoffset = offset;

    // Animate calorie count
    animateNumber(ringCalories, totals.calories);
    ringGoal.textContent = calorieGoal;

    // Over goal warning
    if (totals.calories > calorieGoal) {
        ringProgress.classList.add("over-goal");
        ringCalories.classList.add("over-goal");
    } else {
        ringProgress.classList.remove("over-goal");
        ringCalories.classList.remove("over-goal");
    }

    // Macro values
    totalProtein.textContent = Math.round(totals.protein) + "g";
    totalCarbs.textContent = Math.round(totals.carbs) + "g";
    totalFat.textContent = Math.round(totals.fat) + "g";
    totalFiber.textContent = Math.round(totals.fiber) + "g";

    // Macro bars (targets: protein 50g, carbs 300g, fat 65g, fiber 25g)
    proteinBar.style.width = Math.min((totals.protein / 50) * 100, 100) + "%";
    carbsBar.style.width = Math.min((totals.carbs / 300) * 100, 100) + "%";
    fatBar.style.width = Math.min((totals.fat / 65) * 100, 100) + "%";
    fiberBar.style.width = Math.min((totals.fiber / 25) * 100, 100) + "%";
}

function animateNumber(el, target) {
    const start = parseInt(el.textContent) || 0;
    const diff = target - start;
    const duration = 600;
    const startTime = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(start + diff * eased);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// ===== SEARCH =====
function setupSearch() {
    foodSearch.addEventListener("input", () => {
        const q = foodSearch.value.trim();
        clearSearch.classList.toggle("show", q.length > 0);

        if (q.length === 0) {
            searchResults.classList.remove("show");
            return;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetch(`/api/search?q=${encodeURIComponent(q)}`)
                .then((r) => r.json())
                .then((foods) => {
                    if (foods.length === 0) {
                        searchResults.innerHTML = `<div class="no-results">No foods found for "${q}"</div>`;
                    } else {
                        searchResults.innerHTML = foods
                            .map(
                                (f) => `
                            <div class="search-item" data-food='${JSON.stringify(f).replace(/'/g, "&#39;")}'>
                                <span class="search-item-emoji">${f.emoji}</span>
                                <div class="search-item-info">
                                    <div class="search-item-name">${highlightMatch(f.name, q)}</div>
                                    <div class="search-item-serving">${f.serving}</div>
                                </div>
                                <span class="search-item-cal">${f.calories} kcal</span>
                            </div>`
                            )
                            .join("");

                        // Click handlers
                        searchResults.querySelectorAll(".search-item").forEach((item) => {
                            item.addEventListener("click", () => {
                                const food = JSON.parse(item.dataset.food);
                                openFoodModal(food);
                            });
                        });
                    }
                    searchResults.classList.add("show");
                });
        }, 200);
    });

    clearSearch.addEventListener("click", () => {
        foodSearch.value = "";
        clearSearch.classList.remove("show");
        searchResults.classList.remove("show");
    });

    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-container")) {
            searchResults.classList.remove("show");
        }
    });
}

function highlightMatch(name, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
    return name.replace(regex, '<span style="color: var(--accent-green); font-weight: 700;">$1</span>');
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ===== CATEGORIES =====
function loadCategories() {
    fetch("/api/categories")
        .then((r) => r.json())
        .then((categories) => {
            const emojis = {
                Beverage: "🥤",
                Dairy: "🥛",
                Extra: "🧂",
                "Fast Food": "🍔",
                Fruit: "🍎",
                Grain: "🌾",
                Protein: "🥩",
                Snack: "🍿",
                Vegetable: "🥦",
            };

            categoryPills.innerHTML = categories
                .map(
                    (c, i) =>
                        `<button class="category-pill${i === 0 ? " active" : ""}" data-category="${c}">${emojis[c] || "📦"} ${c}</button>`
                )
                .join("");

            // Load first category
            if (categories.length > 0) {
                loadCategoryFoods(categories[0]);
            }

            // Click handlers
            categoryPills.querySelectorAll(".category-pill").forEach((pill) => {
                pill.addEventListener("click", () => {
                    categoryPills.querySelectorAll(".category-pill").forEach((p) => p.classList.remove("active"));
                    pill.classList.add("active");
                    loadCategoryFoods(pill.dataset.category);
                });
            });
        });
}

function loadCategoryFoods(category) {
    fetch(`/api/foods/${encodeURIComponent(category)}`)
        .then((r) => r.json())
        .then((foods) => {
            categoryFoods.innerHTML = foods
                .map(
                    (f) => `
                <div class="category-food-item search-item" data-food='${JSON.stringify(f).replace(/'/g, "&#39;")}'>
                    <span class="search-item-emoji">${f.emoji}</span>
                    <div class="search-item-info">
                        <div class="search-item-name">${f.name}</div>
                        <div class="search-item-serving">${f.serving}</div>
                    </div>
                    <span class="search-item-cal">${f.calories} kcal</span>
                </div>`
                )
                .join("");

            categoryFoods.querySelectorAll(".category-food-item").forEach((item) => {
                item.addEventListener("click", () => {
                    const food = JSON.parse(item.dataset.food);
                    openFoodModal(food);
                });
            });
        });
}

// ===== FOOD MODAL =====
function openFoodModal(food) {
    selectedFood = { ...food };
    $("#modalEmoji").textContent = food.emoji;
    $("#modalFoodName").textContent = food.name;
    $("#modalServing").textContent = food.serving;
    $("#servingCount").value = 1;

    updateModalNutrition(1);

    // Reset meal pill selection
    $$(".modal-card .meal-pill").forEach((p) => p.classList.remove("active"));
    $(".modal-card .meal-pill[data-meal='breakfast']").classList.add("active");

    foodModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function updateModalNutrition(servings) {
    if (!selectedFood) return;
    const cal = Math.round(selectedFood.calories * servings);
    const protein = (selectedFood.protein * servings).toFixed(1);
    const carbs = (selectedFood.carbs * servings).toFixed(1);
    const fat = (selectedFood.fat * servings).toFixed(1);

    $("#modalCalories").textContent = cal;
    $("#modalProtein").textContent = protein + "g";
    $("#modalCarbs").textContent = carbs + "g";
    $("#modalFat").textContent = fat + "g";
    $("#btnCalories").textContent = `+${cal} kcal`;
}

function closeFoodModal() {
    foodModal.classList.remove("show");
    document.body.style.overflow = "";
    selectedFood = null;
}

// ===== GOAL MODAL =====
function openGoalModal() {
    $("#goalInput").value = calorieGoal;

    // Highlight active preset
    $$(".goal-preset").forEach((p) => {
        p.classList.toggle("active", parseInt(p.dataset.goal) === calorieGoal);
    });

    goalModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeGoalModal() {
    goalModal.classList.remove("show");
    document.body.style.overflow = "";
}

function saveGoal() {
    const val = parseInt($("#goalInput").value);
    if (val >= 500 && val <= 10000) {
        calorieGoal = val;
        localStorage.setItem("calorieGoal", calorieGoal);
        updateDashboard();
        closeGoalModal();
        showToast("🎯 Goal updated to " + calorieGoal + " kcal!");
    }
}

// ===== ADD FOOD TO LOG =====
function addFoodToLog() {
    if (!selectedFood) return;

    const servings = parseFloat($("#servingCount").value) || 1;
    const activeMealPill = $(".modal-card .meal-pill.active");
    const meal = activeMealPill ? activeMealPill.dataset.meal : "snack";

    const entry = {
        id: Date.now(),
        name: selectedFood.name,
        emoji: selectedFood.emoji,
        serving: selectedFood.serving,
        servings: servings,
        meal: meal,
        calories: Math.round(selectedFood.calories * servings),
        protein: parseFloat((selectedFood.protein * servings).toFixed(1)),
        carbs: parseFloat((selectedFood.carbs * servings).toFixed(1)),
        fat: parseFloat((selectedFood.fat * servings).toFixed(1)),
        fiber: parseFloat((selectedFood.fiber * servings).toFixed(1)),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    foodLog[today].push(entry);
    saveLog();
    updateDashboard();
    renderLog();
    renderHistoryChart(currentHistoryRange);
    renderAchievements();
    renderLeaderboard();
    closeFoodModal();

    // Clear search
    foodSearch.value = "";
    clearSearch.classList.remove("show");
    searchResults.classList.remove("show");

    showToast(`✅ ${entry.emoji} ${entry.name} added — ${entry.calories} kcal`);
}

// ===== DELETE FOOD =====
function deleteFood(id) {
    foodLog[today] = foodLog[today].filter((e) => e.id !== id);
    saveLog();
    updateDashboard();
    renderLog();
    renderHistoryChart(currentHistoryRange);
    showToast("🗑️ Removed from log");
}

// ===== RENDER LOG =====
function renderLog() {
    const entries = foodLog[today] || [];
    const filtered =
        selectedMealFilter === "all"
            ? entries
            : entries.filter((e) => e.meal === selectedMealFilter);

    if (filtered.length === 0) {
        logList.innerHTML = `
            <div class="empty-state" id="emptyState">
                <div class="empty-icon">🥗</div>
                <p>${selectedMealFilter === "all" ? "No foods logged yet today" : "No " + selectedMealFilter + " items"}</p>
                <p class="empty-hint">Search for a food above to get started!</p>
            </div>`;
        logActions.style.display = "none";
    } else {
        const mealEmojis = { breakfast: "🌅", lunch: "☀️", dinner: "🌙", snack: "🍿" };
        logList.innerHTML = filtered
            .map(
                (e) => `
            <div class="log-item" data-id="${e.id}">
                <span class="log-item-emoji">${e.emoji}</span>
                <div class="log-item-info">
                    <div class="log-item-name">${e.name}${e.servings > 1 ? ` × ${e.servings}` : ""}</div>
                    <div class="log-item-meta">${mealEmojis[e.meal] || ""} ${capitalize(e.meal)} · ${e.time}</div>
                </div>
                <span class="log-item-cal">${e.calories}</span>
                <button class="log-item-delete" title="Remove" onclick="deleteFood(${e.id})">✕</button>
            </div>`
            )
            .join("");
        logActions.style.display = "block";
    }

    // Meal tab counts
    $$(".meal-tab").forEach((tab) => {
        const meal = tab.dataset.meal;
        const count =
            meal === "all"
                ? entries.length
                : entries.filter((e) => e.meal === meal).length;
        // Don't show count with just text
    });
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

// ===== STORAGE =====
function saveLog() {
    localStorage.setItem("foodLog", JSON.stringify(foodLog));
}

// ===== TOAST =====
function showToast(msg) {
    toastMsg.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Search
    setupSearch();

    // Goal
    $("#editGoalBtn").addEventListener("click", openGoalModal);
    $("#goalModalClose").addEventListener("click", closeGoalModal);
    $("#saveGoalBtn").addEventListener("click", saveGoal);

    $$(".goal-preset").forEach((p) => {
        p.addEventListener("click", () => {
            $$(".goal-preset").forEach((x) => x.classList.remove("active"));
            p.classList.add("active");
            $("#goalInput").value = p.dataset.goal;
        });
    });

    // Food Modal
    $("#modalClose").addEventListener("click", closeFoodModal);
    $("#addFoodBtn").addEventListener("click", addFoodToLog);

    // Servings controls
    $("#servingPlus").addEventListener("click", () => {
        const input = $("#servingCount");
        input.value = (parseFloat(input.value) + 0.5).toFixed(1);
        updateModalNutrition(parseFloat(input.value));
    });

    $("#servingMinus").addEventListener("click", () => {
        const input = $("#servingCount");
        const val = parseFloat(input.value) - 0.5;
        if (val >= 0.5) {
            input.value = val.toFixed(1);
            updateModalNutrition(val);
        }
    });

    $("#servingCount").addEventListener("input", () => {
        const val = parseFloat($("#servingCount").value) || 1;
        updateModalNutrition(val);
    });

    // Meal pills in modal
    $$(".modal-card .meal-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
            $$(".modal-card .meal-pill").forEach((p) => p.classList.remove("active"));
            pill.classList.add("active");
        });
    });

    // Meal filter tabs
    $$(".meal-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            $$(".meal-tab").forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            selectedMealFilter = tab.dataset.meal;
            renderLog();
        });
    });

    // Clear log
    $("#clearLogBtn").addEventListener("click", () => {
        if (confirm("Clear all foods from today's log?")) {
            foodLog[today] = [];
            saveLog();
            updateDashboard();
            renderLog();
            renderHistoryChart(currentHistoryRange);
            showToast("🗑️ Today's log cleared");
        }
    });

    // History tabs
    $$("#historyTabs .history-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            $$("#historyTabs .history-tab").forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            currentHistoryRange = tab.dataset.range;
            renderHistoryChart(currentHistoryRange);
        });
    });

    // Close modals on overlay click
    foodModal.addEventListener("click", (e) => {
        if (e.target === foodModal) closeFoodModal();
    });
    goalModal.addEventListener("click", (e) => {
        if (e.target === goalModal) closeGoalModal();
    });

    // ESC key closes modals
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeFoodModal();
            closeGoalModal();
        }
    });
}

// ===== HISTORY CHART =====
function getDateRange(range) {
    const dates = [];
    const now = new Date();
    const days = range === "week" ? 7 : 30;

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
}

function renderHistoryChart(range) {
    const canvas = $("#historyChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // High-DPI support
    const container = $("#chartContainer");
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = "250px";
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = 250;
    const padding = { top: 20, right: 12, bottom: 40, left: 40 };
    const chartW = W - padding.left - padding.right;
    const chartH = H - padding.top - padding.bottom;

    // Get data
    const dates = getDateRange(range);
    const data = dates.map((d) => {
        const entries = foodLog[d] || [];
        return entries.reduce((sum, e) => sum + e.calories, 0);
    });

    // Max value for scale (at least the goal)
    const maxVal = Math.max(calorieGoal * 1.3, ...data, 100);

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Draw horizontal grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (chartH / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(W - padding.right, y);
        ctx.stroke();

        // Y-axis labels
        const val = Math.round(maxVal - (maxVal / gridLines) * i);
        ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
        ctx.font = "500 10px Inter, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(val, padding.left - 6, y + 4);
    }

    // Draw goal dashed line
    const goalY = padding.top + chartH * (1 - calorieGoal / maxVal);
    ctx.strokeStyle = "rgba(0, 245, 160, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, goalY);
    ctx.lineTo(W - padding.right, goalY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Goal label
    ctx.fillStyle = "rgba(0, 245, 160, 0.6)";
    ctx.font = "600 9px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Goal", W - padding.right - 24, goalY - 5);

    // Draw bars
    const barCount = dates.length;
    const gap = range === "week" ? 12 : 3;
    const barWidth = Math.max(4, (chartW - gap * (barCount + 1)) / barCount);

    dates.forEach((dateStr, i) => {
        const x = padding.left + gap + i * (barWidth + gap);
        const val = data[i];
        const barH = (val / maxVal) * chartH;
        const y = padding.top + chartH - barH;

        // Bar gradient
        const isOverGoal = val > calorieGoal;
        const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartH);
        if (val === 0) {
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.03)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.01)");
        } else if (isOverGoal) {
            gradient.addColorStop(0, "rgba(249, 115, 22, 0.8)");
            gradient.addColorStop(1, "rgba(236, 72, 153, 0.4)");
        } else {
            gradient.addColorStop(0, "rgba(0, 245, 160, 0.7)");
            gradient.addColorStop(1, "rgba(0, 217, 245, 0.3)");
        }

        // Draw rounded bar
        const radius = Math.min(barWidth / 2, 4);
        const drawH = Math.max(val === 0 ? 2 : 4, barH);
        const drawY = padding.top + chartH - drawH;

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x + radius, drawY);
        ctx.lineTo(x + barWidth - radius, drawY);
        ctx.quadraticCurveTo(x + barWidth, drawY, x + barWidth, drawY + radius);
        ctx.lineTo(x + barWidth, padding.top + chartH);
        ctx.lineTo(x, padding.top + chartH);
        ctx.lineTo(x, drawY + radius);
        ctx.quadraticCurveTo(x, drawY, x + radius, drawY);
        ctx.closePath();
        ctx.fill();

        // X-axis labels
        const date = new Date(dateStr + "T00:00:00");
        let label;
        if (range === "week") {
            label = date.toLocaleDateString("en-US", { weekday: "short" });
        } else {
            label = date.getDate().toString();
        }

        ctx.fillStyle = dateStr === today ? "rgba(0, 245, 160, 0.9)" : "rgba(148, 163, 184, 0.5)";
        ctx.font = dateStr === today ? "700 10px Inter, sans-serif" : "500 9px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(label, x + barWidth / 2, H - padding.bottom + 16);

        // Show calorie value on top of bar (only for week view or if today)
        if ((range === "week" || dateStr === today) && val > 0) {
            ctx.fillStyle = "rgba(241, 245, 249, 0.7)";
            ctx.font = "700 10px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(val, x + barWidth / 2, drawY - 6);
        }
    });

    // Update stats
    updateHistoryStats(data);
}

function updateHistoryStats(data) {
    const nonZero = data.filter((v) => v > 0);
    const avg = nonZero.length > 0 ? Math.round(nonZero.reduce((a, b) => a + b, 0) / nonZero.length) : 0;
    const best = nonZero.length > 0 ? Math.min(...nonZero) : 0;
    const total = data.reduce((a, b) => a + b, 0);
    const days = nonZero.length;

    $("#statAvg").textContent = avg;
    $("#statBest").textContent = best;
    $("#statTotal").textContent = total > 9999 ? Math.round(total / 1000) + "k" : total;
    $("#statDays").textContent = days;
}

// ===== STREAK & ACHIEVEMENTS =====
function calculateStreak() {
    let streak = 0;
    const d = new Date();

    // Check if today has logged foods within goal
    const todayEntries = foodLog[today] || [];
    const todayCals = todayEntries.reduce((s, e) => s + e.calories, 0);

    // If today has entries and within goal, count today
    if (todayCals > 0 && todayCals <= calorieGoal * 1.1) {
        streak = 1;
        d.setDate(d.getDate() - 1);
    } else if (todayCals > 0) {
        // Over goal today, still count previous days
        d.setDate(d.getDate() - 1);
    } else {
        // No entries today, start from yesterday
        d.setDate(d.getDate() - 1);
    }

    // Go backwards counting consecutive days within goal
    for (let i = 0; i < 365; i++) {
        const dateStr = d.toISOString().split("T")[0];
        const entries = foodLog[dateStr] || [];
        const cals = entries.reduce((s, e) => s + e.calories, 0);

        if (cals > 0 && cals <= calorieGoal * 1.1) {
            streak++;
        } else {
            break;
        }
        d.setDate(d.getDate() - 1);
    }

    return streak;
}

function getDaysTrackedTotal() {
    let count = 0;
    for (const date in foodLog) {
        if (foodLog[date] && foodLog[date].length > 0) count++;
    }
    return count;
}

function renderAchievements() {
    const streak = calculateStreak();
    const daysTracked = getDaysTrackedTotal();
    const todayEntries = foodLog[today] || [];
    const todayCals = todayEntries.reduce((s, e) => s + e.calories, 0);

    // Update streak banner
    $("#streakCount").textContent = streak;

    const msgs = [
        { min: 0, msg: "Start tracking to build your streak!" },
        { min: 1, msg: "Great start! Keep logging to build your streak 💪" },
        { min: 3, msg: "3 days strong! You're building a habit 🔥" },
        { min: 7, msg: "One full week! You're on fire! 🏆" },
        { min: 14, msg: "Two weeks! Incredible discipline! 💎" },
        { min: 30, msg: "30 DAYS! You're a legend! 👑" },
    ];
    const streakMsg = msgs.filter((m) => streak >= m.min).pop();
    $("#streakMsg").textContent = streakMsg.msg;

    // Badges
    const badges = [
        { icon: "⭐", name: "First Log", req: "Log 1 food", check: daysTracked >= 1 },
        { icon: "🔥", name: "3-Day", req: "3 day streak", check: streak >= 3 },
        { icon: "💪", name: "Week Hero", req: "7 day streak", check: streak >= 7 },
        { icon: "🏆", name: "Fortnight", req: "14 day streak", check: streak >= 14 },
        { icon: "👑", name: "30 Days", req: "30 day streak", check: streak >= 30 },
        { icon: "🎯", name: "On Target", req: "Hit goal today", check: todayCals > 0 && todayCals <= calorieGoal },
        { icon: "📊", name: "Tracker", req: "Track 7 days", check: daysTracked >= 7 },
        { icon: "💎", name: "Diamond", req: "Track 30 days", check: daysTracked >= 30 },
    ];

    $("#badgesGrid").innerHTML = badges
        .map(
            (b) => `
        <div class="badge-card ${b.check ? "unlocked" : "locked"}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-req">${b.check ? "✅ Earned!" : b.req}</div>
        </div>`
        )
        .join("");
}

// ===== LEADERBOARD =====
function renderLeaderboard() {
    const streak = calculateStreak();
    const daysTracked = getDaysTrackedTotal();
    const score = streak * 10 + daysTracked * 2;

    // Simulated community members (consistent, realistic data)
    const community = [
        { name: "FitGuru_Priya", avatar: "👩", streak: 28, days: 45, tagline: "Clean eating champion" },
        { name: "HealthyRaj", avatar: "👨", streak: 21, days: 38, tagline: "Consistency is key" },
        { name: "NutritionNinja", avatar: "🧑", streak: 18, days: 30, tagline: "Protein focused" },
        { name: "CalorieMaster", avatar: "👩‍🦰", streak: 14, days: 25, tagline: "Balanced diet always" },
        { name: "GymBro_Arjun", avatar: "💪", streak: 12, days: 22, tagline: "Gains and greens" },
        { name: "YogaVibes", avatar: "🧘", streak: 10, days: 20, tagline: "Mind & body balance" },
        { name: "RunnerAvi", avatar: "🏃", streak: 7, days: 15, tagline: "Marathon prep" },
        { name: "SmoothieQueen", avatar: "👸", streak: 5, days: 12, tagline: "Smoothie everything" },
        { name: "MealPrepKing", avatar: "👨‍🍳", streak: 3, days: 8, tagline: "Sunday prep, daily win" },
        { name: "FreshStart_22", avatar: "🌱", streak: 1, days: 3, tagline: "Just getting started" },
    ];

    // Create user entry
    const user = {
        name: "You",
        avatar: "🔥",
        streak: streak,
        days: daysTracked,
        tagline: streak > 7 ? "Crushing it!" : streak > 0 ? "Building momentum" : "Ready to start!",
        isUser: true,
    };

    // Combine and sort by score (streak * 10 + days * 2)
    const all = [...community, user].map((p) => ({
        ...p,
        score: p.streak * 10 + p.days * 2,
    }));
    all.sort((a, b) => b.score - a.score);

    // Render top 10
    const top10 = all.slice(0, 10);
    $("#leaderboardList").innerHTML = top10
        .map((p, i) => {
            const rank = i + 1;
            const rankClass =
                rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "normal";
            const isYou = p.isUser ? "is-you" : "";

            return `
            <div class="lb-row ${isYou}">
                <div class="lb-rank ${rankClass}">${rank}</div>
                <div class="lb-avatar">${p.avatar}</div>
                <div class="lb-info">
                    <div class="lb-name">${p.name}${p.isUser ? " (You)" : ""}</div>
                    <div class="lb-detail">${p.tagline}</div>
                </div>
                <div class="lb-streak">🔥 ${p.streak}</div>
                <div class="lb-score">${p.score} pts</div>
            </div>`;
        })
        .join("");
}

// ===== START =====
document.addEventListener("DOMContentLoaded", init);
