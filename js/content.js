// Применяем сохранённое состояние темы при загрузке страницы
chrome.storage.local.get("darkMode", (data) => {
    if (data.darkMode) {
        document.documentElement.classList.add("dark-theme");
    }
});


// смена логотипа
chrome.storage.local.get("newLogo", (logoData) =>{
    if (logoData.newLogo){
        window.addEventListener("DOMContentLoaded", () => {
            const logo = document.querySelector(".logo");
            if (logo) {
                logo.src = logoData.newLogo;
                logo.style.borderRadius = "3px";
            }
        });
    }
})
