(() => {
	try {
		const stored = localStorage.getItem('theme');
		const parsed = JSON.parse(stored);
		const theme = parsed.state.theme;

		document.documentElement.classList.toggle('dark', theme === 'dark');
	} catch {
		// do nothing
	}
})();
