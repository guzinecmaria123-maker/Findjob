"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.job-search');
    if (!form)
        return; // если форму почему-то не нашли — просто ничего не делаем дальше
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // не даём странице перезагрузиться
        const jobInput = document.getElementById('job-query');
        const locationInput = document.getElementById('location-query');
        const job = jobInput.value.trim();
        const location = locationInput.value.trim();
        if (!job) {
            alert('Введите должность или компанию');
            return;
        }
        const query = encodeURIComponent(job);
        const place = encodeURIComponent(location);
        const sites = [
            `https://www.linkedin.com/jobs/search/?keywords=${query}&location=${place}`,
            `https://www.indeed.com/jobs?q=${query}&l=${place}`
        ];
        sites.forEach(url => window.open(url, '_blank'));
    });
});
//# sourceMappingURL=findjob.js.map