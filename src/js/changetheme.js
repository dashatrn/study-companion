document.addEventListener('DOMContentLoaded', () => {
    const changeTheme = (themeName) => {
        // Theme defined
        const themeProperties = {
            normalmode: {
                '--heading-color': '#969fcd',
                '--tasklist-color': '#292d4a',
                '--background-color': '#625187',
                '--dropdown-color': '#d5ccef',
                '--dropdown': '#342c54',
                '--themetext': '#dbdfe4'
            },
            darkmode: {
                '--heading-color': '#56688f',
                '--tasklist-color': '#0c0c0e',
                '--background-color': '#3a4358',
                '--dropdown-color': '#9fabc0',
                '--dropdown': '#18212e',
                '--themetext': '#dbdfe4'
            },
            lightmode: {
                '--heading-color': '#edf1fa',
                '--tasklist-color': '#70708f',
                '--background-color': '#8591ad',
                '--dropdown-color': '#c1bfd0',
                '--dropdown': '#9995b8',
                '--themetext': '#2b293a'

            },
            industrialmode: {
                '--heading-color': '#bebeab',
                '--tasklist-color': '#423f3c',
                '--background-color': '#6a685e',
                '--dropdown-color': '#959d94',
                '--dropdown': '#343a33',
                '--themetext': '#d4dcd3'

            },
        };

        // apply user's theme
        const rootStyle = document.documentElement.style;
        const properties = themeProperties[themeName];
        for (const property in properties) {
            rootStyle.setProperty(property, properties[property]);
        }

        // use local storage to save theme
        localStorage.setItem('theme', themeName);
    };

    // event listeneres with buttons
    document.getElementById('normal-mode').addEventListener('click', () => changeTheme('normalmode'));
    document.getElementById('dark-mode').addEventListener('click', () => changeTheme('darkmode'));
    document.getElementById('light-mode').addEventListener('click', () => changeTheme('lightmode'));
    document.getElementById('industrial-mode').addEventListener('click', () => changeTheme('industrialmode'));

    // if there's already a theme in storage display it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
});
