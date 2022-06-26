<template lang="pug">
.list-wrapper
	.list
		div(
			v-for="(chunk, index) in chunks"
			v-observe-visibility="(e)=>changeObserve(e,index)"
			:style="{height :( chunk.height>0? chunk.height+'px' : 'auto')}"
			:class="{'last-chunk' : chunks.length-1===index}"
			class="chunk")
			div(v-if="show[index]")
				div(v-for="(item) in chunk.items" class="list-item")
					slot.item-inner(name="item" :id="item.id" :text="item.text")
		.lastBlock( ref="lastBlock")
</template>

<script>
export default {
	name: "TestScroll",
	directives: {
		focus: {
			endCallback(entry) {
				console.log(entry)
			},
			mounted(el) {

				const endCallback = (entry) => {
					console.log(entry)
				}
				let options = {
					root: null, // родитель целевого элемента - область просмотра, если null или не указано стандартная видимость монитора
					threshold: 0, // степень пересечения между целевым элементом и его корнем(процент видимого изображения, при котором начинается загрузка) (0 - 1)
					rootMargin: '100px'// Отступы вокруг root
				}
				const observerEnd = new IntersectionObserver(endCallback, options) // just two observers
				let endTarget = el
				observerEnd.observe(endTarget)
			},
			unmounted(el) {

			}
		}
	},
	props: {
		count_visibility: { // количество отображаемых элементов
			type: Number,
			default: 10,
		},
		list: {//	список
			type: Array,
			default() {
				return [];
			},
			required: true,
		},
		data_key: { // ключ для каждого элемента возможно нахуй не нужен
			type: String,
			default: 'index',
		},
		data_height: {// высота элемента, 0 или пустое занчение означают динамическую высоту
			type: Number,
			default: 0,
		},
		threshold: {//от 0 до 1
			type: Number,
			default: 0,
			validator(val) {
				return val >= 0 && val <= 1;
			}
		},
		margin: {
			type: Number,
			default: 50,
		},
		id_component: {
			type: String,
			required: true,
		},
	},
	emits: ['scrollBottom'],
	data() {
		return{
			show: [true,],
			observerStart: null,
			observerEnd: null,
			chunks: [],
			lastChunk: 0,
			startFlag: false,
			maxHeight: 0,
		}
	},
	computed: {},


	mounted() {

		let options = {
			root: null, // родитель целевого элемента - область просмотра, если null или не указано стандартная видимость монитора
			threshold: 0, // степень пересечения между целевым элементом и его корнем(процент видимого изображения, при котором начинается загрузка) (0 - 1)
			rootMargin: '100px'// Отступы вокруг root
		}
		// eslint-disable-next-line
		this.observerEnd = new IntersectionObserver(this.endCallback, options) // just two observers
		let endTarget = this.$refs.lastBlock
		this.observerEnd.observe(endTarget)
		//
		// // eslint-disable-next-line
		// this.observerStart = new IntersectionObserver(this.startCallback, options)
		// let startTarget = document.querySelector('.sentinel-start')
		// this.observerStart.observe(startTarget)
	},
	methods: {
		changeObserve(entry, index) {
			this.show[index] = entry
		},
		endCallback(entries) {
			if (entries[0].intersectionRatio > 0) {
				if(this.list.slice(this.lastChunk * 15, (this.lastChunk + 1) * 15).length) {
					let newChunks = {...this.chunks}
					newChunks = Object.keys(newChunks).map((key)=> { return newChunks[key] })
					newChunks.push({
						items: this.list.slice(this.lastChunk * 15, (this.lastChunk + 1) * 15),
						height: 0
					})
					this.show.push(true)
					this.chunks = newChunks
					this.lastChunk++
					this.$nextTick(()=> {
						const height =  document.querySelector('.last-chunk').clientHeight;
						this.chunks[this.chunks.length-1].height = height
					})
				}
			}
		},
		/*startCallback(entries) {
			if (entries[0].intersectionRatio > 0) {
				this.startFlag = true
				let newChunks = {...this.chunks}
				newChunks = Object.keys(newChunks).map(function (key) { return newChunks[key] })
				newChunks.unshift({
					items: this.list.slice((this.lastChunk - 2 - 1) * 15, (this.lastChunk - 2) * 15),
					height: this.height['' + (this.lastChunk - 2)]
				})
				if (newChunks.length >= 2) {
					newChunks.pop()
					this.lastChunk--
				}
				this.chunks = newChunks
				this.$nextTick(()=> {
					this.startFlag = false
					this.observerStart.observe(document.querySelector('.sentinel-start'))
					this.observerEnd.observe(document.querySelector('.sentinel'))
				})
			}
		},

		 */

	}

}
</script>

<style scoped>

.list-wrapper {
	margin: 0 auto;
	max-width: 800px;
	position: relative;
}
.list {
	width: 100%;
}

.chunk {
	width: 100%;
}

</style>
