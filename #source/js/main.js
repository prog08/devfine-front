// Accordion
const accordionInit = () => {
	let accordions = document.querySelectorAll('.accordionCustom')

	function closeAll() {
		accordions.forEach((el) => {
			let accordionBody = el.querySelector('.accordionBody')
			el.classList.add('collapsed')
			accordionBody.style.height = `0px`
		})
	}

	function accordionPreload() {
		accordions.forEach((el) => {
			let accordionBody = el.querySelector('.accordionBody')
			if (el.classList.contains('collapsed')) {
				closeAccordion(el)
			} else {
				openAccordion(el, accordionBody)
			}
		})
	}

	function openAccordion(el, accordionBody) {
		const bodyHeight = accordionBody.querySelector('.bodyContent')
		let elStyle =
			accordionBody.currentStyle || window.getComputedStyle(accordionBody)

		accordionBody.style.height = `${
			bodyHeight.offsetHeight + parseInt(elStyle.paddingTop) * 2
		}px`
		el.classList.remove('collapsed')
	}

	function closeAccordion(parent) {
		parent.querySelector('.accordionBody').style.height = `0px`
		parent.classList.add('collapsed')
	}

	function toggleAccordion() {
		let parent = this.parentElement
		let parentList = parent.classList
		let accordionBody = parent.querySelector('.accordionBody')

		if (parentList.contains('collapsed')) {
			closeAll()
			openAccordion(parent, accordionBody)
		} else {
			closeAccordion(parent)
		}
	}

	window.addEventListener('resize', () => {
		accordionPreload()
	})

	accordions.forEach((el) => {
		if (el.querySelector('.accordionHeader')) {
			el.querySelector('.accordionHeader').addEventListener(
				'click',
				toggleAccordion
			)
		}
	})
	accordionPreload()
}

// Burger
const burgerInit = () => {
	const header = document.querySelector('.header')
	const burgerBtn = header.querySelector('.burger-toggle')
	const nav = header.querySelector('.navbar-collapse')
	const body = document.body

	const toggleBurger = () => {
		if (!header.classList.contains('open')) {
			header.classList.add('open')
			body.style.overflowY = 'hidden'
			body.style.overflowY = 'hidden'
		} else {
			header.classList.remove('open')
			body.style.overflowY = 'scroll'
			body.style.overflowY = 'scroll'
		}
	}

	const closeBurger = (e) => {
		if (!header.contains(e.target)) {
			header.classList.remove('open')
			body.style.overflowY = 'scroll'
			body.style.overflowY = 'scroll'
		}
	}

	burgerBtn.addEventListener('click', toggleBurger)
	document.addEventListener('click', closeBurger)

	const widthCheck = (width) => {
		if (width < 992) {
			nav.classList.add('trans')
		} else {
			nav.classList.remove('trans')
		}
	}

	widthCheck(window.innerWidth)
	window.addEventListener('resize', (e) => {
		widthCheck(e.target.innerWidth)
	})
}

// BurgerAccordion
const burgerAccordionInit = () => {
	const nav = document.querySelector('.navbar-collapse')
	const dropdown = nav.querySelector('.nav-item.dropdown')
	const dropdownLink = dropdown.querySelector('.nav-link')
	const dropdownItems = dropdown.querySelectorAll('.dropdown-item')
	let dropdownItemsHeight = 0

	dropdownItems.forEach((item) => (dropdownItemsHeight += item.offsetHeight))

	const toggleAccordion = () => {
		if (!dropdown.classList.contains('open')) {
			dropdown.classList.add('open')
			dropdown.style.height = `${
				(dropdownItemsHeight + dropdownLink.offsetHeight + 20 + 8 * 4) / 10
			}rem`
		} else {
			dropdown.classList.remove('open')
			dropdown.style.height = `${dropdownLink.offsetHeight / 10}rem`
		}
	}

	const removeDropdownAnimation = () => {
		const dropdownWrapper = dropdown.querySelector('.dropdown-wrapper')

		dropdownWrapper.style.transition = 'unset'
		setTimeout(() => dropdownWrapper.removeAttribute('style'), 0)
	}

	let isDesc = false
	const widthCheck = (width) => {
		const isOpen = dropdown.classList.contains('open')
		if (width > 992) {
			if (isDesc == false) {
				dropdown.classList.remove('open')
				dropdown.style.height = 'auto'
				dropdownLink.removeEventListener('click', toggleAccordion)

				removeDropdownAnimation()
				isDesc = true
			}
		} else if (!isOpen) {
			if (isDesc) {
				dropdown.style.height = `${dropdownLink.offsetHeight / 10}rem`
				dropdownLink.addEventListener('click', toggleAccordion)
				isDesc = false
			}
		}
	}

	widthCheck(window.innerWidth)
	window.addEventListener('resize', (e) => {
		widthCheck(e.target.innerWidth)
	})
}

// Modal
const modalInit = () => {
	const modalOpenBtns = document.querySelectorAll('.modalOpen')
	const modalBodyContainer = document.querySelector('.modalBg.over')
	const modal = document.querySelector('.modal')
	const modalCloseBtns = modalBodyContainer.querySelectorAll('.close')

	if (!modalOpenBtns) return

	const closeModal = (e) => {
		if (!modal.contains(e.target)) {
			modalBodyContainer.classList.remove('show')
			document.body.classList.remove('fixed')
		}
	}

	modalOpenBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			document.body.classList.add('fixed')

			modalBodyContainer.classList.add('fade')
			modalBodyContainer.classList.add('show')
		})
	})

	modalCloseBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			modalBodyContainer.classList.remove('show')
			document.body.classList.remove('fixed')
		})
	})

	modalBodyContainer.addEventListener('click', closeModal)
	window.addEventListener('load', () => {
		modalBodyContainer.style.display = ''
	})
}

// Scroll
const scrollInit = () => {
	const scrollLinks = document.querySelectorAll('[data-href]')
	const localAnchor = localStorage.getItem('anchor')

	if (localAnchor) {
		const anchor = document.querySelector(`#${localAnchor}`)
		if (anchor) anchor.scrollIntoView({ behavior: 'smooth' })
		localStorage.removeItem('anchor')
	}

	scrollLinks.forEach((link) => {
		const href = link.getAttribute('data-href')
		const anchor = document.querySelector(`#${href}`)

		if (anchor) {
			link.addEventListener('click', (e) => {
				e.preventDefault()
				anchor.scrollIntoView({ behavior: 'smooth' })
			})
		} else {
			link.addEventListener('click', () => {
				localStorage.setItem('anchor', href)
			})
		}
	})
}

//inputValueValidator
const inputValidator = () => {
	const inputs = document.querySelectorAll('input')
	const validKeys = ['Backspace', 'Tab', 'Enter', 'Delete']

	const validation = (input, regX) => {
		const regex = new RegExp(regX)

		input.addEventListener('keydown', (e) => {
			if (!regex.test(e.key) && !validKeys.includes(e.key)) {
				e.preventDefault()
			}
		})

		input.addEventListener('paste', (e) => {
			e.preventDefault()

			const pasteData = String(e.clipboardData.getData('text'))
			input.value = pasteData
				.split('')
				.filter((el) => regex.test(el))
				.join('')
		})
	}

	if (inputs.length > 1) {
		inputs.forEach((input) => {
			const validationType = input.getAttribute('data-type')
			switch (validationType) {
				case 'text':
					validation(input, '[a-zA-Zа-яА-Я]')
					break
				case 'number':
					validation(input, '[0-9]')
					break
				case 'email':
					validation(input, '[a-zA-Z0-9@._-]')
					break
				case 'textNumber':
					validation(input, '[a-zA-Zа-яА-Я0-9 -_]')
					break
			}
		})
	}
}

const formValidatorAction = () => {
	const form = document.querySelector('form')
	const submit = form.querySelector('button[type="submit"]')
	submit.addEventListener('click', (e) => e.preventDefault())

	const groups = form.querySelectorAll('.group.required')
	groups.forEach((group) => {
		const errorOut = group.querySelector('span[asp-validation-for]')
		const input = group.querySelector('.input')

		input.addEventListener('keyup', (e) => {
			console.log(e.target.value, e.target.value.length)

			if (e.target.value.length === 0) {
				group.classList.add('error')
				errorOut.textContent = 'This field is required'
			} else if (e.target.value.length <= 3) {
				if (!group.classList.contains('error')) group.classList.add('error')
				errorOut.textContent = 'Length more than 3 digits'
			} else {
				group.classList.remove('error')
				errorOut.textContent = ''
			}
		})

		input.addEventListener('blur', (e) => {
			if (e.target.value.length === 0 && !group.classList.contains('error')) {
				group.classList.add('error')
				errorOut.textContent = 'This field is required'
			}
		})
	})
}

const animatedParts = () => {
	const params = {
		root: null,
		rootMargin: '0px 0px 0px 0px',
		threshold: 0.01,
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			console.log(entry.isIntersecting, entry.intersectionRatio)

			if (entry.isIntersecting && entry.intersectionRatio > 0) {
				const el = entry.target
				const delay = Number(el.getAttribute('data-delay')) || 0
				el.classList.add('animated')

				setTimeout(() => {
					el.classList.remove('animate')
					observer.unobserve(entry.target)
				}, delay * 2)
			}
		})
	}, params)

	const animatedEls = document.querySelectorAll('.animate')
	animatedEls.forEach((el) => {
		const delay = Number(el.getAttribute('data-delay')) || 0

		el.style.transitionDelay = `${delay}ms`

		observer.observe(el)
	})
}

document.addEventListener('DOMContentLoaded', () => {
	accordionInit()
	burgerInit()
	burgerAccordionInit()
	modalInit()
	scrollInit()
	inputValidator()

	animatedParts()
	// formValidatorAction()
})
