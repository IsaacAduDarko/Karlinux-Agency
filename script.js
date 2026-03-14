(() => {
	const menuToggle = document.getElementById('menuToggle');
	const navLinks = document.getElementById('navLinks');

	if (menuToggle && navLinks) {
		menuToggle.addEventListener('click', () => {
			navLinks.classList.toggle('open');
		});

		navLinks.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => navLinks.classList.remove('open'));
		});
	}

	const yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear().toString();
	}

	const revealElements = document.querySelectorAll('.reveal');
	if (revealElements.length > 0) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('show');
					}
				});
			},
			{ threshold: 0.12 }
		);

		revealElements.forEach((element) => observer.observe(element));
	}

	const contactForm = document.querySelector('.contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', (event) => {
			event.preventDefault();
			alert('Thanks for contacting KARLINUX AGENCY. We will reach out shortly.');
			contactForm.reset();
		});
	}

	const shareButtons = document.querySelectorAll('.share-btn');
	shareButtons.forEach((button) => {
		button.addEventListener('click', async () => {
			const title = button.dataset.shareTitle || 'KARLINUX AGENCY Update';
			const text = button.dataset.shareText || 'Check out this update from KARLINUX AGENCY.';
			const urlPath = button.dataset.shareUrl || 'index.html';
			const url = new URL(urlPath, window.location.href).toString();

			if (navigator.share) {
				try {
					await navigator.share({ title, text, url });
					return;
				} catch (error) {
					if (error && error.name === 'AbortError') {
						return;
					}
				}
			}

			try {
				await navigator.clipboard.writeText(url);
				alert('Link copied. You can now share it.');
			} catch {
				alert('Share this link: ' + url);
			}
		});
	});
})();
