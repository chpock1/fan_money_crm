<template lang="pug">
nav.header
	img.header__logo(src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
		alt="лого от гугла")
	.header__content
		.header__content__item
			p мой кабинет
		.header__content__item
			p мой кабинет
		.header__content__item
			p мой кабинет
		.header__content__item
			p мой кабинет
	.header__icons
		.header__icons__item
			img(src="https://img.icons8.com/color/2x/filled-trash.png")
		.header__icons__item
			img(src="https://svgsilh.com/svg/1312747.svg")
			.iconActive
		.header__icons__item
			.header__menu(tabindex="0")
				.menu__dropdown
					.dropdown__user
						span.dropdown__userName Маклюк Илья Алексеевич
						.dropdown__userInfo
							span Тривио
							span Баланс 10 000 р.
							span задолженность 0.00 р.
					ul.dropdown__link
						li
							a(href="/profile") Профиль
						li
							a(href="/profile") Управление
						li
							a(href="/company/id") Моя Компания
						li
							a(href="/exit") выйти
		.header__icons__item
			img(src="https://cdn-icons-png.flaticon.com/512/197/197408.png")
		.header__icons__item.header__showMore
			.header__menu(tabindex="0")
				.menu__dropdown
					ul
						li
							a(href="/profile") мой кабинет
						li
							a(href="/profile") мой кабинет
						li
							a(href="/company/id") мой кабинет
						li
							a(href="/exit") мой кабинет
.container
	.main
		.main__title
			span Здравствуйте admin, куда сегодня поедем?
			button.btn.floatBtn Новая поездка
		hr
		.main__content
			.content__block
				p Lorem ipsum dolor sit amet, consectetur
			.content__block
				p Lorem ipsum dolor sit amet, consectetur
			.content__block
				p Lorem ipsum dolor sit amet, consectetur
			.content__block.content__bigBlock
				p Баланс: 234234,00 p.
				p Задолженность: 234234,00 p.
				p Lorem ipsum dolor sit amet,
</template>
<style>
:root {
	--header-height: 50px;
	--dropdown-transition: all 200ms linear;
}
.btn{
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #FFFFFF;
	text-align: center;
	text-decoration: none;
	vertical-align: middle;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	background-color: blue;
	border: 1px solid transparent;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	border-radius: 0.25rem;
	transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.floatBtn{
	float: right;
}
.container{
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	max-width: 1140px;
	margin-top: calc(var(--header-height) + 50px);
}
.main {
	box-shadow: 0 4px 13px rgb(0 0 0 / 25%);
	border-radius: 12px;
	padding: 30px;
}
.main__title{
	display: inline-block;
	width: 100%;
}
.main__content{
	display: flex;
	justify-content: space-around;
	margin: 0 -5px;
	flex-wrap: wrap;
}
.content__block{
	margin: 0 5px 10px 0;
	flex: 1;
	background-color: aqua;
	border: 1px solid blue;
	border-radius: 12px;
	padding: 10px;
	box-shadow: 0 4px 13px rgb(0 0 0 / 25%);
}
.content__bigBlock{
	margin-left: 10px;
	flex: 3;
	background-color: darkgrey;
	border: none;
	white-space: nowrap;
}
/*шапка начало*/
.header{
	justify-content: space-between;
	width: 100%;
	position: fixed;
	height: var(--header-height);
	top: 0;
	left: 0;
	background-color: #fff;
	box-shadow: 0 4px 13px rgb(0 0 0 / 25%);
	padding: 0 25px;
	margin: 0;
	display: inline-flex;
	box-sizing: border-box;
}
.header__logo{
	height: calc(var(--header-height) - 10px);
	margin: auto 0;
}
.header__content{
	display: inline-flex;
}
.header__content__item {
	margin: auto;
	cursor: pointer;
	color: #000;
	background: #fff;
	padding: 0 10px;
}
.header__content__item:hover {
	background: rgb(210, 216, 252);
}
.header__icons{
	display: inline-flex;
	flex: 1;
	justify-content: flex-end;
}
.header__icons__item {
	height: 30px;
	width: 30px;
	margin: auto 5px;
	position: relative;
}
.header__icons__item img{
	height: 30px;
	width: 30px;
}
.iconActive{
	width: 5px;
	position: absolute;
	top: 0;
	right: 0;
	height: 5px;
	background: blue;
	border-radius: 100%;
}
/* начинается dropdown*/
.header__menu {
	width: 100%;
	position:relative;
	display:inline-block;
	z-index:2;
}
.header__menu:before {
	content: "aa";
	position: relative;
	height: 100%;
	line-height: 2;
	transition: var(--dropdown-transition);
	background-color: rgb(204, 194, 194);
	color: rgb(93, 134, 223);
	cursor: pointer;
	padding: 25%;
	border-radius: 10px;
}
.header__menu:focus { pointer-events:none; }
.header__menu:focus .menu__dropdown {
	opacity:1;
	visibility:visible;
	transform: translateY(0);
}
.menu__dropdown {
	pointer-events: auto;
	position: absolute;
	opacity: 0;
	visibility: hidden;
	background-color: #fff;
	box-shadow: 0 4px 13px rgb(0 0 0 / 25%);
	border: 0 solid rgba(0,0,0,.2);
	padding: 15px;
	top: var(--header-height);
	right: 0;
	width: 200px;
	border-radius: 4px;
	display: block;
	z-index: 2;
	transform: translateY(10px);
	transition: var(--dropdown-transition);
}
.menu__dropdown a {
	text-decoration: none;
	color: black;
	width: 100%;
	height: 100%;
	display: block;
	padding: 5px 0;
}
/*стили для выпадающего меню юзера*/
.dropdown__user {
	text-align: left;
}
.dropdown__userName{
	color: #000;
	line-height: 20px;
	height: 20px;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	margin-bottom: 5px;
}
.dropdown__userInfo {
	display: flex;
	flex-wrap: wrap;
}
.dropdown__userInfo span{
	font-weight: 200;
	color: grey;
	width: 100%;
}
.dropdown__link{
	list-style-type: none;
	padding: 0;
	text-align: left;
}
.dropdown__link > :last-child{
	margin-top: 10px;
}
.dropdown__link li{
	color: black;
	font-weight: 600;
}
.dropdown__link li:hover{
	background-color: rgb(203, 203, 238);
	color: #fff;
}
/*второе меню*/
.header__showMore{
	display: none;
	cursor: pointer;
}
.header__showMore .header__menu:before{
	content:
			url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/30px-Hamburger_icon.svg.png);
	background-color: transparent;
}
.header__showMore .header__menu:focus:before{
	content:
			url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B0_%28ei%29.svg/30px-%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BA%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B0_%28ei%29.svg.png);
	background-color: transparent;
}
.header__showMore .menu__dropdown{
	height: 100vh;
	top: calc(var(--header-height) - 10px);
	transform: translate(50px,0);
	border-radius: 0;
	box-shadow: 0 4px 13px rgb(0 0 0 / 25%);
}
.header__showMore .header__menu:focus .menu__dropdown {
	transform: translateX(15px);
}
@media (max-width: 992px) {
	.header{
		padding: 0 10px;
	}
	/*скрываю линки на маленьких экранах*/
	.header__content{
		display: none;
	}
	.header__showMore{
		display: block;
	}
	.content__bigBlock{
		width: 100%;
		margin-left: 5px;
	}
}
</style>
