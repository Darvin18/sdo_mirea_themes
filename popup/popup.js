document.addEventListener("DOMContentLoaded", () => {

    // Тёмная тема
    const toggle = document.getElementById("toggleTheme");

    // Получаем сохранённое состояние
    chrome.storage.local.get("darkMode", (data) => {
        toggle.checked = data.darkMode || false;
    });

    // Обрабатываем переключение чекбокса
    toggle.addEventListener("change", () => {
        const isDark = toggle.checked;
        chrome.storage.local.set({ darkMode: isDark });

        // Отправляем сообщение в content.js
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setDarkTheme,
                args: [isDark]
            });
        });
    });


    // Добавление логотипа
    const logoInput = document.getElementById("addLogo");

    chrome.storage.local.get("newLogo", (logoData) =>{
        if (logoInput != ""){
            logoInput.value = logoData.newLogo;
        };
    });

    logoInput.addEventListener("change", (logoText) =>{
        const logoValue = logoText.target.value;
        
        chrome.storage.local.set({newLogo: logoValue});

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>{
            
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: setLogo,
                args: [logoValue]
            });
        });
    });


    const DarkThemeBtn = document.querySelector(".dropdown-item-listener");
    const root = document.documentElement;

    // Загружаем состояние темы при открытии popup
    chrome.storage.local.get("darkThemeEnabled", (data) => {
        if (data.darkThemeEnabled) {
            root.classList.add("dark-theme");
        }
    });

    // Переключаем тему и сохраняем её в chrome.storage
    DarkThemeBtn.addEventListener("click", () => {
        root.classList.toggle("dark-theme");

        // Сохраняем текущее состояние темы
        const isDarkPopup = root.classList.contains("dark-theme");
        chrome.storage.local.set({ darkThemeEnabled: isDarkPopup });
    });
    
});

// Функция для включения/выключения тёмной темы
function setDarkTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add("dark-theme");
    } else {
        document.documentElement.classList.remove("dark-theme");
    }
}


// фукция для смены логотипа на сайте
function setLogo(logoValue){
    if (logoValue){
        document.querySelector(".logo").src = logoValue;
    }
}
