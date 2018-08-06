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

	const disableBtns = (currentPosition, itemsCount) => {
		prevBtn.disabled = currentPosition === 0 ? true : false;

		if (window.innerWidth < 768) {
			nextBtn.disabled = currentPosition === - (itemsCount - 1) * 100 ? true : false;
		} else {
			nextBtn.disabled = currentPosition === - (itemsCount - 1) * 100 / 2 + 50 ? true : false;
		} 
	};

	const frame = document.querySelector(`.speakers__frame`);
	const prevBtn = frame.querySelector(`.speakers__btn--prev`);
	const nextBtn = frame.querySelector(`.speakers__btn--next`);
	const content = frame.querySelector(`.speakers__list`);
	const itemsCount = content.children.length;

	let currentPosition = 0;

	disableBtns(currentPosition, itemsCount);

	const switchItems = (evt) => {
		if (!evt.target.disabled && evt.target === prevBtn) {
			if (window.innerWidth < 768) {
				currentPosition += 100;
			} else {
				currentPosition += 50;
			}
		} else if (!evt.target.disabled && evt.target === nextBtn) {
			if (window.innerWidth < 768) {
				currentPosition -= 100;
			} else {
				currentPosition -= 50;
			}
		}

		content.style.left = `${currentPosition}%`;
		disableBtns(currentPosition, itemsCount);
	}

	addHandler(frame, switchItems);
})();
