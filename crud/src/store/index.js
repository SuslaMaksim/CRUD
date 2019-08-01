import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

	users: [],
	json: []
	
};


const mutations = {
  
  UPDATE_USERS(state,payload){
  	state.users = payload;
  },
  UPDATE_JSON(state,payload){
  	state.json = payload;
  }
  
};

const actions = {

   loadUsers(context){
		return storage.loadUsers()
			.then( users => context.commit("UPDATE_USERS", users))
   },
   addUser(context,users){
		let payload = users;
		return storage.saveUsers(users)
			.then( ()=> {
				context.commit("UPDATE_USERS", payload)
			})

   },

   saveJson(context,json){
   	    let payload = json;
		return storage.saveJson(json)
		.then( json => context.commit("UPDATE_JSON", payload))
   },

   loadJson(context){
		return storage.loadJson()
			.then( json => context.commit("UPDATE_JSON", json))
   }


  
};

const getters = {
	getUsers: state => state.users,
	getUser: state => id => state.users.find( user => user.id == id),
	getJSON: state => state.json
   
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});


const storage = {		

		loadUsers: function(){
			return new Promise((resolve,reject)=>{
				setTimeout( ()=>{			
					resolve(JSON.parse(localStorage.users || '[]'))
				},1000)
			})
		},

		saveUsers: function(users) {
			
			return new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve(localStorage.users = JSON.stringify(users))

				},1000)
					
		     })
			
		},
		saveJson: function(json){

			return new Promise((resolve,reject)=>{

				setTimeout(()=>{
					resolve( localStorage.jsonArrey = JSON.stringify(json))

				},1000)
			})
		},

		loadJson: function(){
			return new Promise((resolve,reject)=>{
				setTimeout( ()=>{			
					resolve(JSON.parse(localStorage.jsonArrey || '[]'))
				},1000)
			})
		},

		
}
