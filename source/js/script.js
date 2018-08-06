(() => {
	const ENTER = 13;

	const isActivationEvent = (evt) => evt.keyCode && evt.keyCode === ENTER;

	const addHandler = (element, action) => {
    element.addEventListener(`click`, action);

    element.addEventListener(`keydown`, (evt) => {
      if (isActivationEvent(evt)) {
        action;
      }
    });
  };

	const enableSwitch = (element) => {
		const disableBtns = (currentPosition, itemsCount) => {
			element.prevBtn.disabled = currentPosition === 0 ? true : false;

			if (window.innerWidth < 768) {
				element.nextBtn.disabled = currentPosition === - (itemsCount - 1) * 100 ? true : false;
			} else {
				element.nextBtn.disabled = currentPosition === - (itemsCount - 1) * 100 / 2 + 50 ? true : false;
			}
		};

		const itemsCount = element.content.children.length;

		let currentPosition = 0;

		disableBtns(currentPosition, itemsCount);

		const switchItems = (evt) => {
			if (!evt.target.disabled && evt.target === element.prevBtn) {
				if (window.innerWidth < 768) {
					currentPosition += 100;
				} else {
					currentPosition += 50;
				}
			} else if (!evt.target.disabled && evt.target === element.nextBtn) {
				if (window.innerWidth < 768) {
					currentPosition -= 100;
				} else {
					currentPosition -= 50;
				}
			}

			element.content.style.left = `${currentPosition}%`;
			disableBtns(currentPosition, itemsCount);
	  }

		addHandler(element.frame, switchItems);
	}

	const speakers = {
		frame: document.querySelector(`.speakers__frame`),
		prevBtn: document.querySelector(`.speakers__btn--prev`),
		nextBtn: document.querySelector(`.speakers__btn--next`),
		content: document.querySelector(`.speakers__list`)
	};

	enableSwitch(speakers);

	const rooms = document.querySelectorAll(`.schedule__container`);

	rooms.forEach((it) => {
		const room = {
			frame: it.querySelector(`.schedule__frame`),
			prevBtn: it.querySelector(`.schedule__btn--prev`),
			nextBtn: it.querySelector(`.schedule__btn--next`),
			content: it.querySelector(`.schedule__list`)
		}

		enableSwitch(room);
	});
})();
