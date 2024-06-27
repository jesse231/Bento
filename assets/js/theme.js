//  ┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  │ ├─┤├┤ │││├┤
//  ┴ ┴ ┴└─┘┴ ┴└─┘
// Set theme based on Configurations and Preferences

let darkTheme = localStorage.getItem('darkTheme');
const themeToggle = document.querySelector('#themeButton');
const bodyBackground = document.getElementById('#body');


const enableDark = () => {
	document.body.classList.add('darktheme');
	localStorage.setItem('darkTheme', 'enabled');
	themeToggle.innerHTML = `<i id="themeButton__icon" icon-name="sun"></i>`;
	lucide.createIcons();
};

const disableDark = () => {
	document.body.classList.remove('darktheme');
	localStorage.setItem('darkTheme', null);
	themeToggle.innerHTML = `<i id="themeButton__icon" icon-name="moon"></i>`;
	lucide.createIcons();
};

if (darkTheme === 'enabled') {
	document.body.classList.add('notransition');
	enableDark();
	document.body.classList.remove('notransition');
} else {
	disableDark();
}

themeToggle.addEventListener('click', () => {
	darkTheme = localStorage.getItem('darkTheme');
	if (darkTheme !== 'enabled') {
		enableDark();
	} else {
		disableDark();
	}
});

if (CONFIG.imageBackground) {
	document.body.classList.add('withImageBackground');
	
	const imageBackgroundsLight = [
		'background0.png',
		'background1.png',
		'background2.jpg',
		'background3.jpg',
		'background4.jpg',
		'background5.jpg',
		'background6.jpg',
		'background7.jpg',
	];

	const imageBackgroundsDark = [
		'background0.jpg',
		'background1.webp',
		'background2.webp',
		'background3.png',
	];

	const imageBackgrounds = darkTheme === 'enabled' ? imageBackgroundsDark : imageBackgroundsLight;
	const randomIndex = Math.floor(Math.random() * imageBackgrounds.length);
	const randomImage = imageBackgrounds[randomIndex];
	if (darkTheme === 'enabled') {
		document.body.style.backgroundImage = `var(--imgcol), url(assets/backgrounds/summer/dark/${randomImage})`;
	} else {
		document.body.style.backgroundImage = `var(--imgcol), url(assets/backgrounds/summer/light/${randomImage})`;
	}
	// document.body.style.backgroundImage = `url(assets/backgrounds/light/${randomImage})`;
}

if (CONFIG.changeThemeByOS && CONFIG.autoChangeTheme) {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		enableDark();
	} else {
		disableDark();
	}
}

if (CONFIG.changeThemeByHour && CONFIG.autoChangeTheme && !CONFIG.changeThemeByOS) {
	const date = new Date();
	const hours = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
	const currentTime = hours + ':' + minutes;
	if (currentTime >= CONFIG.hourDarkThemeActive) {
		enableDark();
	} else if (currentTime >= CONFIG.hourDarkThemeInactive) {
		disableDark();
	}
}
