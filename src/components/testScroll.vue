<template lang="pug">
div(ref="listAreaVisibility")
	div(
			v-for="(chunk, index) in chunks"
			:key="index"
			v-observe-visibility="(e)=>changeObserve(e,index)"
			:style="{height :( (chunk.height>0 && !show[index]) ? chunk.height+'px' : 'auto')}"
			:class="'chunk_number' + index"
			class="chunk")
		div(v-if="show[index]")
			div(v-for="(item, i) in chunk.items" class="list-item" :key="i")
				slot.item-inner(name="item" :id="item.id" :text="item.text")
	.lastBlock(ref="lastBlock"  style="min-height: 1px")
		slot(name="lastBlock")
</template>

<script>
export default {
	name: "TestScroll",
	props: {
		count_visibility: { // количество элементов в чанке
			type: Number,
			default: 25,
		},
		list: {//	список
			type: Array,
			default() {
				return [];
			},
			required: true,
		},
		data_height: {// высота элемента, 0 или пустое занчение означают динамическую высоту
			type: Number,
			default: 0,
		},
		margin: {
			type: Number,
			default: 50,
		},
	},
	emits: ['scrollBottom'],
	data() {
		return{
			show: [],
			observerEnd: null,
			chunks: [],
			lastChunk: 0,
			endTarget: null,
		}
	},
	computed: {},


	mounted() {
		if(this.data_height === 0) { // если высота не задана делаем ленивую подгрузку и подсчет высоты каждого чанка
			let options = {
				root: null, // родитель целевого элемента - область просмотра, если null или не указано стандартная видимость монитора
				threshold: 0, // степень пересечения между целевым элементом и его корнем(процент видимого изображения, при котором начинается загрузка) (0 - 1)
				rootMargin: this.margin + 'px'// Отступы вокруг root
			}
			this.observerEnd = new IntersectionObserver(this.endCallback, options)
			this.endTarget = this.$refs.lastBlock
			this.observerEnd.observe(this.endTarget)
		}
		else {
			this.loadAllDataWithFixHeight()
		}
	},
	beforeUnmount() {
		this.observerEnd.unobserve(this.endTarget)
	},
	methods: {
		loadAllDataWithFixHeight() {
			const chungHeight = this.data_height * this.count_visibility;
			const arr = []
			for(let i = 0; i < (this.list.length / this.count_visibility); i++) {
		  	arr[i] = {
				  height: chungHeight,
				  items: this.list.slice(i * this.count_visibility, i * this.count_visibility + this.count_visibility)
			  }
			// Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
			}
			this.chunks = arr
		},
		changeObserve(entry, index) {
			if(!entry && this.show[index]) {
				this.chunks[index].height = document.querySelector('.chunk_number'+index).clientHeight;
			}
			this.show[index] = entry;
		},
		endCallback(entries) {
			if (entries[0].intersectionRatio > 0) {
				if(this.list.slice(this.lastChunk * this.count_visibility, (this.lastChunk + 1) * this.count_visibility).length) {
					let newChunks = {...this.chunks}
					newChunks = Object.keys(newChunks).map((key)=> { return newChunks[key] })
					newChunks.push({
						items: this.list.slice(this.lastChunk * this.count_visibility, (this.lastChunk + 1) * this.count_visibility),
						height: 0
					})
					this.show.push(true)
					this.chunks = newChunks
					this.$nextTick(()=> {
						console.log(this.lastChunk)
						const height =  document.querySelector('.chunk_number'+this.lastChunk).clientHeight;
						this.chunks[this.chunks.length-1].height = height
						this.lastChunk++
						setTimeout(()=> {
							this.observerEnd.unobserve(this.endTarget)
							this.observerEnd.observe(this.endTarget)
						},1000)
					})

				}
			}
		},
	}
}
</script>

<style scoped>
.chunk {
	width: 100%;
}

</style>
