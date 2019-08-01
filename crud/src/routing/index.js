import Vue from 'vue';
import VueRouter from 'vue-router';


import NotFound from '../components/NotFound.vue';
import Main from '../components/Main.vue';
import Form from '../components/Form.vue';
import EditUser from '../components/EditUser.vue'



Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',

	routes: [
	
		{
		path: '/',
		redirect: '/main'

		},
		{
		path: '/main',
		component: Main

		},
		
		{
		path: '/noteFaund',
		component: NotFound


		},
		{
		path: '/addUser',
		component: Form

		},
		{
		path: '/editUser/:id',
		component: EditUser,
		props: true
		},

		{
		path: '*',
		component: NotFound


		}

	

	]
})