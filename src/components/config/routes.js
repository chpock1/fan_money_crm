import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../index.vue'),
		children: [
			{
				path: '/shops',
				name: 'shops',
				component: () => import('../shop.vue')
			}
		]
	}
]
const router = createRouter({
	history: createWebHashHistory(),
	routes
})
export default router
