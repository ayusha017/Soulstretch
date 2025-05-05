document.addEventListener("DOMContentLoaded", function () {

    const streakKey = "yogaDailyStreak";
    const lastVisitKey = "lastVisitDate";
    
    let currentStreak = localStorage.getItem(streakKey) ? parseInt(localStorage.getItem(streakKey)) : 0;
    let lastVisit = localStorage.getItem(lastVisitKey) ? new Date(localStorage.getItem(lastVisitKey)) : null;
    let today = new Date();
    
    if (lastVisit) {
        let timeDiff = today - lastVisit;
        let dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        
        if (dayDiff >= 1 && dayDiff < 2) {
            currentStreak++;
        } else if (dayDiff >= 2) {
            currentStreak = 1;
        }
    } else {
        currentStreak = 1;
    }
    
    localStorage.setItem(streakKey, currentStreak);
    localStorage.setItem(lastVisitKey, today.toISOString());

    document.getElementById("streak-count").textContent = currentStreak;

});