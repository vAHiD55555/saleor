
function isPersianDate(dateStr) {
    return /^1[0-4]\d{2}\/\d{1,2}\/\d{1,2}$/.test(dateStr);
}

function toGregorian(jy, jm, jd) {
    let gy = jy + 621;
    let days = (jm < 7) ? ((jm - 1) * 31 + jd) : (6 * 31 + (jm - 7) * 30 + jd);
    let leap = (((jy + 1) % 4) === 0);
    let march = leap ? 20 : 21;
    let gd = march + days - 1;
    let date = new Date(gy, 2, gd);
    return date;
}

function calculate() {
    const input = document.getElementById("birthdate").value.trim();
    let bdate;
    if (isPersianDate(input)) {
        let [jy, jm, jd] = input.split("/").map(Number);
        bdate = toGregorian(jy, jm, jd);
    } else {
        bdate = new Date(input);
    }

    if (isNaN(bdate)) {
        document.getElementById("results").innerHTML = "<p>تاریخ نامعتبر است.</p>";
        return;
    }

    const today = new Date();
    const ageMs = today - bdate;
    const ageYears = Math.floor(ageMs / (365.25 * 24 * 60 * 60 * 1000));

    const fiftyDate = new Date(bdate);
    fiftyDate.setFullYear(fiftyDate.getFullYear() + 50);

    const bStr = bdate.toISOString().split("T")[0];
    const fStr = fiftyDate.toISOString().split("T")[0];

    let famous = famous_birthdays[bStr.slice(5)] || [];

    let html = `
        <p>سن شما: <strong>${ageYears}</strong> سال</p>
        <p>تاریخ دقیق تولد (میلادی): ${bStr}</p>
        <p>تاریخ ۵۰سالگی شما: ${fStr}</p>
        <h3>افراد مشهوری که در این روز به دنیا آمده‌اند:</h3>
        <ul>
    `;

    if (famous.length === 0) {
        html += "<li>یافت نشد.</li>";
    } else {
        for (let person of famous) {
            html += `<li><a href="${person.link}" target="_blank">${person.name}</a> (${person.nationality})</li>`;
        }
    }

    html += "</ul>";
    document.getElementById("results").innerHTML = html;
}

const famous_birthdays = {
    "02-04": [
        {"name": "Alice Cooper", "nationality": "USA", "link": "https://en.wikipedia.org/wiki/Alice_Cooper"},
        {"name": "Dan Quayle", "nationality": "USA", "link": "https://en.wikipedia.org/wiki/Dan_Quayle"},
        {"name": "فرهاد مجیدی", "nationality": "ایران", "link": "https://fa.wikipedia.org/wiki/فرهاد_مجیدی"}
    ]
};
