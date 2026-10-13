
"use strict";

/* =========================================
   QUERYLAB — SQL PRACTICE CHALLENGES
   Database: SalesPracticeDB
========================================= */

const challenges = [
    // LEVEL 1 — BASIC QUERIES
    { id: 1, level: 1, question: "Display all customers from Multan.", tags: ["SELECT", "WHERE"] },
    { id: 2, level: 1, question: "Show all VIP customers.", tags: ["WHERE", "Filtering"] },
    { id: 3, level: 1, question: "Find products with a price greater than 50,000.", tags: ["WHERE", "Comparison"] },
    { id: 4, level: 1, question: "Display all orders made using Card payment.", tags: ["WHERE", "PaymentMethod"] },
    { id: 5, level: 1, question: "Show orders placed between January and March 2026.", tags: ["BETWEEN", "Dates"] },
    { id: 6, level: 1, question: "List all unique cities where customers live.", tags: ["DISTINCT"] },
    { id: 7, level: 1, question: "Display the 5 most expensive products.", tags: ["TOP", "ORDER BY"] },
    { id: 8, level: 1, question: "Find products with ratings above 4.5.", tags: ["WHERE", "Rating"] },

    // LEVEL 2 — AGGREGATIONS
    { id: 9, level: 2, question: "Count the total number of customers, products, and orders.", tags: ["COUNT"] },
    { id: 10, level: 2, question: "Calculate the average product price.", tags: ["AVG"] },
    { id: 11, level: 2, question: "Find the cheapest and most expensive product.", tags: ["MIN", "MAX"] },
    { id: 12, level: 2, question: "Count customers in each city.", tags: ["GROUP BY", "COUNT"] },
    { id: 13, level: 2, question: "Count orders for each OrderStatus.", tags: ["GROUP BY", "COUNT"] },
    { id: 14, level: 2, question: "Calculate total quantity sold for each product.", tags: ["SUM", "GROUP BY"] },
    { id: 15, level: 2, question: "Find cities having more than 2 customers.", tags: ["HAVING", "GROUP BY"] },
    { id: 16, level: 2, question: "Find payment methods used in more than 5 orders.", tags: ["GROUP BY", "HAVING"] },

    // LEVEL 3 — JOIN QUERIES
    { id: 17, level: 3, question: "Display each order with the customer's full name.", tags: ["INNER JOIN"] },
    { id: 18, level: 3, question: "Show each order with product name, brand, and category.", tags: ["INNER JOIN"] },
    { id: 19, level: 3, question: "Display OrderID, FullName, ProductName, Quantity, and OrderDate.", tags: ["3-table JOIN"] },
    { id: 20, level: 3, question: "Show orders placed by VIP customers only.", tags: ["JOIN", "WHERE"] },
    { id: 21, level: 3, question: "Find products that have never been ordered.", tags: ["LEFT JOIN", "IS NULL"] },
    { id: 22, level: 3, question: "Show every customer and their orders, including customers without orders.", tags: ["LEFT JOIN"] },
    { id: 23, level: 3, question: "Display each order with customer city and payment method.", tags: ["JOIN", "SELECT"] },
    { id: 24, level: 3, question: "List all orders for Samsung products.", tags: ["JOIN", "WHERE"] },

    // LEVEL 4 — SALES & PROFIT
    { id: 25, level: 4, question: "Calculate gross sales for each order before discount.", tags: ["Arithmetic", "Quantity × UnitPrice"] },
    { id: 26, level: 4, question: "Calculate the discount amount for each order.", tags: ["Arithmetic", "DiscountPercent"] },
    { id: 27, level: 4, question: "Calculate the net order amount after discount.", tags: ["Arithmetic", "Discount"] },
    { id: 28, level: 4, question: "Calculate total delivered revenue, excluding Pending and Cancelled orders.", tags: ["WHERE", "SUM"] },
    { id: 29, level: 4, question: "Calculate profit for each order using Products.CostPrice.", tags: ["JOIN", "Profit"] },
    { id: 30, level: 4, question: "Find total revenue by product category.", tags: ["JOIN", "GROUP BY"] },
    { id: 31, level: 4, question: "Calculate total revenue by payment method.", tags: ["GROUP BY", "SUM"] },
    { id: 32, level: 4, question: "Find the 3 products generating the highest net revenue.", tags: ["TOP", "ORDER BY"] },

    // LEVEL 5 — ADVANCED SQL
    { id: 33, level: 5, question: "Find customers whose total delivered spending exceeds 100,000.", tags: ["GROUP BY", "HAVING"] },
    { id: 34, level: 5, question: "Find products priced above the average product price.", tags: ["Subquery", "AVG"] },
    { id: 35, level: 5, question: "Classify products as High, Medium, or Low price using CASE.", tags: ["CASE"] },
    { id: 36, level: 5, question: "Calculate monthly delivered revenue.", tags: ["YEAR", "MONTH", "GROUP BY"] },
    { id: 37, level: 5, question: "Rank customers by total delivered spending.", tags: ["RANK", "CTE"] },
    { id: 38, level: 5, question: "Find the most frequently ordered product.", tags: ["GROUP BY", "TOP"] },
    { id: 39, level: 5, question: "Compare each product's selling price with its cost price.", tags: ["JOIN", "Profit Margin"] },
    { id: 40, level: 5, question: "Calculate the percentage of orders that were cancelled.", tags: ["CASE", "Aggregation"] },
    { id: 41, level: 5, question: "Find VIP customers who have placed no delivered orders.", tags: ["NOT EXISTS", "Subquery"] },
    { id: 42, level: 5, question: "Calculate delivered revenue by customer city and customer type.", tags: ["JOIN", "GROUP BY"] }
];

/* Note: The original 5 levels contain 42 listed challenges.
   IDs 41 and 42 are additional advanced challenges. */

const STORAGE_KEY = "querylab-sales-practice-progress-v1";

const levelInfo = {
    1: {
        title: "Basic Queries",
        subtitle: "Build your foundation with filtering and sorting.",
        concepts: "SELECT, WHERE, ORDER BY, DISTINCT"
    },
    2: {
        title: "Aggregate Functions",
        subtitle: "Summarize data and discover useful patterns.",
        concepts: "COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING"
    },
    3: {
        title: "JOIN Queries",
        subtitle: "Connect customers, products, and orders.",
        concepts: "INNER JOIN, LEFT JOIN, multi-table JOINs"
    },
    4: {
        title: "Sales & Profit Analysis",
        subtitle: "Calculate revenue, discounts, and profit.",
        concepts: "Calculated columns, discounts, business KPIs"
    },
    5: {
        title: "Advanced SQL",
        subtitle: "Solve business problems with advanced SQL.",
        concepts: "Subqueries, CASE, dates, ranking"
    }
};

/* =========================================
   DOM ELEMENTS
========================================= */

const elements = {
    levelNav: document.getElementById("levelNav"),
    searchInput: document.getElementById("searchInput"),
    statusFilter: document.getElementById("statusFilter"),
    sortFilter: document.getElementById("sortFilter"),
    challengeList: document.getElementById("challengeList"),
    levelSummary: document.getElementById("levelSummary"),
    emptyState: document.getElementById("emptyState"),
    sectionTitle: document.getElementById("sectionTitle"),
    sectionDescription: document.getElementById("sectionDescription"),
    resultsCount: document.getElementById("resultsCount"),
    footerCount: document.getElementById("footerCount"),
    totalChallenges: document.getElementById("totalChallenges"),
    completedChallenges: document.getElementById("completedChallenges"),
    remainingChallenges: document.getElementById("remainingChallenges"),
    overallPercent: document.getElementById("overallPercent"),
    overallBar: document.getElementById("overallBar"),
    sidebarPercent: document.getElementById("sidebarPercent"),
    sidebarProgress: document.getElementById("sidebarProgress"),
    sidebarCompleted: document.getElementById("sidebarCompleted"),
    allCount: document.getElementById("allCount"),
    resetButton: document.getElementById("resetButton"),
    resetModal: document.getElementById("resetModal"),
    cancelReset: document.getElementById("cancelReset"),
    confirmReset: document.getElementById("confirmReset"),
    clearFilters: document.getElementById("clearFilters"),
    menuToggle: document.getElementById("menuToggle"),
    sidebar: document.getElementById("sidebar"),
    toast: document.getElementById("toast")
};

/* =========================================
   STATE AND LOCAL STORAGE
========================================= */

let activeLevel = "all";
let completedIds = loadProgress();
let toastTimer;

function loadProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (!Array.isArray(saved)) {
            return [];
        }

        const validIds = new Set(challenges.map(challenge => challenge.id));

        return [...new Set(saved)].filter(
            id => Number.isInteger(id) && validIds.has(id)
        );
    } catch (error) {
        console.warn("Could not load saved progress.", error);
        return [];
    }
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch (error) {
        showToast("Progress could not be saved in this browser.");
        console.warn("Could not save progress.", error);
    }
}

function isCompleted(id) {
    return completedIds.includes(id);
}

/* =========================================
   PROGRESS DASHBOARD
========================================= */

function updateProgress() {
    const total = challenges.length;
    const completed = completedIds.length;
    const remaining = total - completed;
    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    elements.totalChallenges.textContent = total;
    elements.completedChallenges.innerHTML =
        `${completed}<span class="stat-unit"> / ${total}</span>`;

    elements.remainingChallenges.textContent = remaining;
    elements.overallPercent.textContent = `${percentage}%`;
    elements.overallBar.style.width = `${percentage}%`;

    elements.sidebarPercent.textContent = `${percentage}%`;
    elements.sidebarProgress.style.width = `${percentage}%`;
    elements.sidebarCompleted.textContent =
        `${completed} of ${total} completed`;

    elements.allCount.textContent = total;
}

/* =========================================
   FILTERING AND SEARCH
========================================= */

function getFilteredChallenges() {
    const searchTerm = elements.searchInput.value
        .trim()
        .toLowerCase();

    const status = elements.statusFilter.value;
    const sort = elements.sortFilter.value;

    let filtered = challenges.filter(challenge => {
        const matchesLevel =
            activeLevel === "all" ||
            challenge.level === Number(activeLevel);

        const searchableText = [
            challenge.question,
            ...challenge.tags,
            levelInfo[challenge.level].title
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);
        const matchesStatus =
            status === "all" ||
            (status === "completed" && isCompleted(challenge.id)) ||
            (status === "pending" && !isCompleted(challenge.id));

        return matchesLevel && matchesSearch && matchesStatus;
    });

    if (sort === "az") {
        filtered.sort((a, b) =>
            a.question.localeCompare(b.question)
        );
    } else if (sort === "incomplete") {
        filtered.sort((a, b) =>
            Number(isCompleted(a.id)) - Number(isCompleted(b.id)) ||
            a.id - b.id
        );
    } else {
        filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
}

/* =========================================
   RENDER LEVEL SUMMARY
========================================= */

function renderLevelSummary() {
    elements.levelSummary.replaceChildren();

    const allChip = document.createElement("button");
    allChip.className =
        `summary-chip ${activeLevel === "all" ? "active" : ""}`;
    allChip.textContent = `All (${challenges.length})`;
    allChip.addEventListener("click", () => setActiveLevel("all"));
    elements.levelSummary.appendChild(allChip);

    for (let level = 1; level <= 5; level++) {
        const levelChallenges = challenges.filter(
            challenge => challenge.level === level
        );

        const completed = levelChallenges.filter(
            challenge => isCompleted(challenge.id)
        ).length;

        const chip = document.createElement("button");
        chip.className =
            `summary-chip ${activeLevel === String(level) ? "active" : ""}`;

        chip.textContent =
            `L${level} ${completed}/${levelChallenges.length}`;

        chip.addEventListener("click", () => setActiveLevel(String(level)));
        elements.levelSummary.appendChild(chip);
    }
}

/* =========================================
   RENDER CHALLENGES
========================================= */

function createChallengeCard(challenge) {
    const card = document.createElement("article");
    card.className = `challenge-card ${
        isCompleted(challenge.id) ? "is-complete" : ""
    }`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "challenge-check";
    checkbox.checked = isCompleted(challenge.id);
    checkbox.setAttribute(
        "aria-label",
        `Mark challenge ${challenge.id} as completed`
    );

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            if (!isCompleted(challenge.id)) {
                completedIds.push(challenge.id);
            }
        } else {
            completedIds = completedIds.filter(
                id => id !== challenge.id
            );
        }

        saveProgress();
        updateProgress();
        renderChallenges();

        showToast(
            checkbox.checked
                ? "Challenge marked as completed."
                : "Challenge marked as incomplete."
        );
    });

    const body = document.createElement("div");
    body.className = "challenge-body";

    const titleRow = document.createElement("div");
    titleRow.className = "challenge-title-row";

    const number = document.createElement("span");
    number.className = "challenge-number";
    number.textContent = `#${String(challenge.id).padStart(2, "0")}`;

    const question = document.createElement("p");
    question.className = "challenge-question";
    question.textContent = challenge.question;

    titleRow.append(number, question);

    const meta = document.createElement("div");
    meta.className = "challenge-meta";

    challenge.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.className = "concept-tag";
        tagElement.textContent = tag;
        meta.appendChild(tagElement);
    });

    if (isCompleted(challenge.id)) {
        const completedLabel = document.createElement("span");
        completedLabel.className = "complete-label";
        completedLabel.textContent = "✓ Completed";
        meta.appendChild(completedLabel);
    }

    body.append(titleRow, meta);
    card.append(checkbox, body);

    return card;
}

function renderChallenges() {
    const filtered = getFilteredChallenges();

    elements.challengeList.replaceChildren();

    const groups = new Map();

    filtered.forEach(challenge => {
        if (!groups.has(challenge.level)) {
            groups.set(challenge.level, []);
        }

        groups.get(challenge.level).push(challenge);
    });

    groups.forEach((items, level) => {
        const info = levelInfo[level];

        const group = document.createElement("details");
        group.className = "level-group";
        group.open = activeLevel !== "all" ||
            elements.searchInput.value.trim() !== "" ||
            elements.statusFilter.value !== "all";

        const header = document.createElement("summary");
        header.className = "level-group-header";

        const titleWrap = document.createElement("div");
        titleWrap.className = "group-title";

        const number = document.createElement("span");
        number.className = "group-number";
        number.textContent = String(level).padStart(2, "0");

        const titleInfo = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = info.title;

        const subtitle = document.createElement("p");
        subtitle.textContent = info.concepts;

        titleInfo.append(title, subtitle);
        titleWrap.append(number, titleInfo);

        const meta = document.createElement("div");
        meta.className = "group-meta";

        const count = document.createElement("span");
        const groupCompleted = items.filter(
            item => isCompleted(item.id)
        ).length;

        count.textContent = `${groupCompleted}/${items.length} done`;

        const chevron = document.createElement("span");
        chevron.className = "group-chevron";
        chevron.textContent = "⌄";

        meta.append(count, chevron);
        header.append(titleWrap, meta);

        const itemContainer = document.createElement("div");
        itemContainer.className = "challenge-items";

        items.forEach(challenge => {
            itemContainer.appendChild(createChallengeCard(challenge));
        });

        group.append(header, itemContainer);
        elements.challengeList.appendChild(group);
    });

    const hasResults = filtered.length > 0;

    elements.emptyState.classList.toggle("hidden", hasResults);
    elements.challengeList.classList.toggle("hidden", !hasResults);

    elements.resultsCount.textContent =
        `${filtered.length} challenge${filtered.length === 1 ? "" : "s"}`;

    elements.footerCount.textContent =
        `Showing ${filtered.length} of ${challenges.length} challenges`;

    renderLevelSummary();
    updateSectionHeading();
}

/* =========================================
   NAVIGATION
========================================= */

function setActiveLevel(level) {
    activeLevel = level;

    document.querySelectorAll(".level-link").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.level === level
        );
    });

    renderChallenges();
    elements.sidebar.classList.remove("open");
}

function updateSectionHeading() {
    if (activeLevel === "all") {
        elements.sectionTitle.textContent = "All Challenges";
        elements.sectionDescription.textContent =
            "Work through every level, one query at a time.";
    } else {
        const info = levelInfo[Number(activeLevel)];
        elements.sectionTitle.textContent = info.title;
        elements.sectionDescription.textContent = info.subtitle;
    }
}

/* =========================================
   NOTIFICATIONS
========================================= */

function showToast(message) {
    clearTimeout(toastTimer);

    elements.toast.textContent = message;
    elements.toast.classList.add("show");

    toastTimer = setTimeout(() => {
        elements.toast.classList.remove("show");
    }, 2500);
}

/* =========================================
   RESET PROGRESS
========================================= */

function openResetModal() {
    elements.resetModal.classList.remove("hidden");
    elements.confirmReset.focus();
}

function closeResetModal() {
    elements.resetModal.classList.add("hidden");
    elements.resetButton.focus();
}

function resetProgress() {
    completedIds = [];
    saveProgress();
    updateProgress();
    renderChallenges();
    closeResetModal();
    showToast("All challenge progress has been reset.");
}

/* =========================================
   EVENT LISTENERS
========================================= */

elements.levelNav.addEventListener("click", event => {
    const button = event.target.closest(".level-link");

    if (button) {
        setActiveLevel(button.dataset.level);
    }
});

elements.searchInput.addEventListener("input", renderChallenges);
elements.statusFilter.addEventListener("change", renderChallenges);
elements.sortFilter.addEventListener("change", renderChallenges);

elements.clearFilters.addEventListener("click", () => {
    elements.searchInput.value = "";
    elements.statusFilter.value = "all";
    elements.sortFilter.value = "default";

    setActiveLevel("all");
    showToast("Filters cleared.");
});

elements.resetButton.addEventListener("click", openResetModal);
elements.cancelReset.addEventListener("click", closeResetModal);
elements.confirmReset.addEventListener("click", resetProgress);

elements.resetModal.addEventListener("click", event => {
    if (event.target === elements.resetModal) {
        closeResetModal();
    }
});

elements.menuToggle.addEventListener("click", () => {
    elements.sidebar.classList.toggle("open");
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeResetModal();
        elements.sidebar.classList.remove("open");
    }

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {
        event.preventDefault();
        elements.searchInput.focus();
    }
});

/* =========================================
   INITIALIZE APPLICATION
========================================= */

function initializeApp() {
    updateProgress();
    renderChallenges();
}

initializeApp();
