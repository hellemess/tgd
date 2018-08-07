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

	const enableSwitch = (element, condensed) => {
		const disableBtns = (itemsCount, clickCount) => {
			element.prevBtn.disabled = clickCount === 0 ? true : false;

			console.log(itemsCount, clickCount);

			if (window.innerWidth < 768) {
				element.nextBtn.disabled = itemsCount - 1 > clickCount ? false : true;
			} else if (window.innerWidth < 1024) {
				element.nextBtn.disabled = itemsCount - 2 > clickCount ? false : true;
			} else if (condensed && window.innerWidth < 1200) {
				element.nextBtn.disabled = itemsCount - 3 > clickCount ? false : true;
			} else if (condensed) {
				element.nextBtn.disabled = itemsCount - 4 > clickCount ? false : true;
			} else {
				element.nextBtn.disabled = itemsCount - 2 > clickCount ? false : true;
			}
		};

		let itemsCount = element.content.children.length;

		if (element.content.children[0].classList.contains(`schedule__item--common`)) {
			if (window.innerWidth < 768) {
			} else if (window.innerWidth < 1024) {
				itemsCount += 1;
			} else if (window.innerWidth < 1200) {
				itemsCount += 2;
			} else {
				itemsCount += 3;
			}
		}

		let currentPosition = 0;
		let clickCount = 0;

		disableBtns(itemsCount, clickCount);

		const switchItems = (evt) => {
			if (!evt.target.disabled && evt.target === element.prevBtn) {
				clickCount -= 1;

				if (window.innerWidth < 768) {
					currentPosition += 100;
				} else if (window.innerWidth < 1024) {
					currentPosition += 50;
				} else if (condensed && window.innerWidth < 1200) {
					currentPosition += 33.3333333;
				} else if (condensed) {
					currentPosition += 25;
				} else {
					currentPosition += 50;
				}
			} else if (!evt.target.disabled && evt.target === element.nextBtn) {
				clickCount += 1;

				if (window.innerWidth < 768) {
					currentPosition -= 100;
				} else if (window.innerWidth < 1024) {
					currentPosition -= 50;
				} else if (condensed && window.innerWidth < 1200) {
					currentPosition -= 33.3333333;
				} else if (condensed) {
					currentPosition -= 25;
				} else {
					currentPosition -= 50;
				}
			}

			element.content.style.left = `${currentPosition}%`;
			disableBtns(itemsCount, clickCount);
	  }

		addHandler(element.frame, switchItems);
	}

	const speakers = {
		frame: document.querySelector(`.speakers__frame`),
		prevBtn: document.querySelector(`.speakers__btn--prev`),
		nextBtn: document.querySelector(`.speakers__btn--next`),
		content: document.querySelector(`.speakers__list`)
	};

	const removeNoticeBtn = () => {
		speakers.nextBtn.classList.remove(`speakers__btn--notice`);
	}

	addHandler(speakers.nextBtn, removeNoticeBtn);
	enableSwitch(speakers);

	const rooms = document.querySelectorAll(`.schedule__frame`);
	const btns = document.querySelectorAll(`.schedule__btn`);
	const noticeSwitchBtn = btns[1];

	const removeNoticeSwitch = () => {
		noticeSwitchBtn.classList.remove(`schedule__btn--notice`);
	}

	Array.from(btns).forEach((it) => {
		addHandler(it, removeNoticeSwitch);
	});

	Array.from(rooms).forEach((it) => {
		const room = {
			frame: it,
			prevBtn: it.querySelector(`.schedule__btn--prev`),
			nextBtn: it.querySelector(`.schedule__btn--next`),
			content: it.querySelector(`.schedule__list`)
		};

		enableSwitch(room, true);
	});
})();
