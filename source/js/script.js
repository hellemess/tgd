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
		const disableBtns = (itemsCount, clickCount) => {
			element.prevBtn.disabled = clickCount === 0 ? true : false;

			if (window.innerWidth < 768 || element.oneItem) {
				element.nextBtn.disabled = itemsCount - 1 > clickCount ? false : true;
			} else if (window.innerWidth < 1024) {
				element.nextBtn.disabled = itemsCount - 2 > clickCount ? false : true;
			} else if (element.condensed && window.innerWidth < 1200) {
				element.nextBtn.disabled = itemsCount - 3 > clickCount ? false : true;
			} else if (element.condensed) {
				element.nextBtn.disabled = itemsCount - 4 > clickCount ? false : true;
			} else {
				element.nextBtn.disabled = itemsCount - 2 > clickCount ? false : true;
			}
		};

		let itemsCount = element.content.children.length;

		if (element.content.children[0].classList.contains(`schedule__item--common`)) {
			if (window.innerWidth < 768) {
				itemsCount += 0;
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

				if (window.innerWidth < 768 || element.oneItem) {
					currentPosition += 100;
				} else if (window.innerWidth < 1024) {
					currentPosition += 50;
				} else if (element.condensed && window.innerWidth < 1200) {
					currentPosition += 33.3333333;
				} else if (element.condensed) {
					currentPosition += 25;
				} else {
					currentPosition += 50;
				}
			} else if (!evt.target.disabled && evt.target === element.nextBtn) {
				clickCount += 1;

				if (window.innerWidth < 768 || element.oneItem) {
					currentPosition -= 100;
				} else if (window.innerWidth < 1024) {
					currentPosition -= 50;
				} else if (element.condensed && window.innerWidth < 1200) {
					currentPosition -= 33.3333333;
				} else if (element.condensed) {
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
			content: it.querySelector(`.schedule__list`),
			condensed: true
		};

		enableSwitch(room);
	});

	const gallery = {
		frame: document.querySelector(`.gallery__frame`),
		prevBtn: document.querySelector(`.gallery__btn--prev`),
		nextBtn: document.querySelector(`.gallery__btn--next`),
		content: document.querySelector(`.gallery__list`),
		oneItem: true
	};

	if (window.innerWidth < 1200) {
		const removeNoticeGallery = () => {
			gallery.nextBtn.classList.remove(`gallery__btn--notice`);
		}

		addHandler(gallery.nextBtn, removeNoticeGallery);

		enableSwitch(gallery);
	} else {
		const pictures = Array.from(gallery.content.querySelectorAll(`.gallery__item`));


		Array.from(pictures).forEach((it) => {
			const element = gallery.content.removeChild(it);
		});

		const moreBtn = document.querySelector(`.gallery__more`);

		const addPictures = () => {
			for (let i = 0; i < 3; i++) {
				if (pictures.length > 1) {
					gallery.content.appendChild(pictures[i]);
					pictures.shift();
				} else {
					moreBtn.style.display = `none`;
				}
			}
		}

		addPictures();

		addHandler(moreBtn, addPictures);
	}
})();
