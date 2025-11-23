const themes = {
            // Default Light Mode
            light: {
                background: "#f0f2f5",
                text:       "#333333",
                nav:        "#ffffff",
                hero:       "#e4e6eb",
                card:       "#ffffff",
                palette:    ["#007bff", "#6c757d", "#28a745"]
            },
            
            // TASK 1: DARK MODE
            dark: {
                background: "#181818",
                text:       "#ffffff",
                nav:        "#222222",
                hero:       "#333333",
                card:       "#2a2a2a",
                palette:    ["#555555", "#777777", "#999999"]
            },

            // TASK 2: TROPICAL MODE
            tropical: {
                background: "#fff4e0",
                text:       "#b35400",
                nav:        "#ffd8a8",
                hero:       "#ffe5c2",
                card:       "#fff0db",
                palette:    ["#ff8c42", "#ffa75e", "#ffc799"]
            }
        };

        // Function to apply the theme
        function setTheme(themeName) {
            const theme = themes[themeName];
            const root = document.documentElement;

            // Mapping the object keys to CSS variables
            root.style.setProperty('--bg-color', theme.background);
            root.style.setProperty('--text-color', theme.text);
            root.style.setProperty('--nav-bg', theme.nav);
            root.style.setProperty('--hero-bg', theme.hero);
            root.style.setProperty('--card-bg', theme.card);
            
            // Mapping the palette array
            root.style.setProperty('--p1', theme.palette[0]);
            root.style.setProperty('--p2', theme.palette[1]);
            root.style.setProperty('--p3', theme.palette[2]);

            console.log(`Switched to ${themeName} mode`);
        }