// ==========================
// EPPO Academy v1
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    initializeDarkMode();
    initializeSimulator();
    initializeDashboard();

});

// ==========================
// Dark Mode
// ==========================

function initializeDarkMode() {

    const button = document.getElementById("darkModeBtn");

    const savedMode = localStorage.getItem("theme");

    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
    }

    button.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const darkEnabled =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            darkEnabled ? "dark" : "light"
        );

    });

}

// ==========================
// Dashboard
// ==========================

function initializeDashboard() {

    const accuracy =
        localStorage.getItem("accuracy") || "0";

    const quizzes =
        localStorage.getItem("completedQuiz") || "0";

    const cases =
        localStorage.getItem("completedCases") || "0";

    document.getElementById("accuracy").textContent =
        accuracy + "%";

    document.getElementById("completedQuiz").textContent =
        quizzes;

    document.getElementById("completedCases").textContent =
        cases;

    let level = "Beginner";

    if (accuracy >= 50) {
        level = "Intermediate";
    }

    if (accuracy >= 80) {
        level = "Advanced";
    }

    document.getElementById("userLevel").textContent =
        level;

}

// ==========================
// EPPO Competence Simulator
// ==========================

function initializeSimulator() {

    const button =
        document.getElementById("checkJurisdiction");

    button.addEventListener(
        "click",
        evaluateJurisdiction
    );

}

function evaluateJurisdiction() {

    const offence =
        document.getElementById("offenceType").value;

    const damage =
        parseFloat(
            document.getElementById("damageAmount").value
        );

    const states =
        parseInt(
            document.getElementById("memberStates").value
        );

    const result =
        document.getElementById("simulatorResult");

    if (isNaN(damage)) {

        result.innerHTML =
            "Please enter a valid damage amount.";

        return;

    }

    if (offence === "euFunds") {

        result.innerHTML =
            "✅ EPPO Competence<br>Fraud affecting EU funds is generally within EPPO competence.";

        return;

    }

    if (offence === "corruption") {

        result.innerHTML =
            "✅ Potential EPPO Competence<br>Corruption may fall within EPPO competence when affecting EU financial interests.";

        return;

    }

    if (offence === "vat") {

        if (damage >= 10000000 && states >= 2) {

            result.innerHTML =
                "✅ EPPO Competence<br>Cross-border VAT fraud exceeds €10 million and involves multiple Member States.";

        } else {

            result.innerHTML =
                "❌ Not EPPO Competence<br>VAT fraud does not meet the special EPPO threshold.";

        }

        return;

    }

    if (offence === "excise") {

        result.innerHTML =
            "❌ Normally not EPPO Competence<br>Simple excise fraud is usually handled by national authorities.";

        return;

    }

}
