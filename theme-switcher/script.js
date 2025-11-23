const themes = {
            light: {
                background: '#f0f8ff',
                text: '#333333',
                nav: '#add8e6',
                hero: '#e0f4ff',
                card: '#ffffff',
                palette: ['#87ceeb', '#b0e0e6', '#afeeee']
            },
            
            dark: {
                background: '#181818',
                text: '#ffffff',
                nav: '#222222',
                hero: '#333333',
                card: '#2a2a2a',
                palette: ['#555555', '#777777', '#999999']
            },
            
            tropical: {
                background: '#fff4e0',
                text: '#b35400',
                nav: '#ffd8a8',
                hero: '#ffe5c2',
                card: '#fff0db',
                palette: ['#ff8c42', '#ffa75e', '#ffc799']
            }
        };


        function applyTheme(themeName) {
            const theme = themes[themeName];
            
            document.body.style.backgroundColor = theme.background;
            document.body.style.color = theme.text;
            
            document.getElementById('navbar').style.backgroundColor = theme.nav;
            
            document.getElementById('hero').style.backgroundColor = theme.hero;
            
            document.getElementById('card1').style.backgroundColor = theme.card;
            document.getElementById('card2').style.backgroundColor = theme.card;
            document.getElementById('card3').style.backgroundColor = theme.card;
            
            document.getElementById('palette1').style.backgroundColor = theme.palette[0];
            document.getElementById('palette2').style.backgroundColor = theme.palette[1];
            document.getElementById('palette3').style.backgroundColor = theme.palette[2];
            
            document.getElementById('palette1').textContent = theme.palette[0];
            document.getElementById('palette2').textContent = theme.palette[1];
            document.getElementById('palette3').textContent = theme.palette[2];
        }

        window.onload = function() {
            applyTheme('light');
        };