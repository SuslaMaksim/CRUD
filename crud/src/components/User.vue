<template>
	            <tr >                                        
                    <td > {{user.name }}</td>
                    <td > {{user.surname}}</td>
                    <td > {{user.phone}}</td>
                    <td > {{user.mail}}</td>
                    <td @click='deleteHendler(user.id)'class="has-text-centered pointer"><span class="delet"><font-awesome-icon icon="trash-alt" /></span> </td>
                    <td class="has-text-centered pointer ">
                     <router-link class='link':to="`/editUser/${user.id}`" >
                       <span class="edit"><font-awesome-icon icon="edit" /></span>
                       
                     </router-link>
                     </td>


                </tr> 

</template>


<script>

import {mapGetters} from 'vuex';

	export default {
		name: 'User',
		props: ['user'],



		methods:{
			deleteHendler(id){
        const getUserFromStore = [...this.$store.getters.getUsers];
        const users = getUserFromStore.filter(user => user.id !== id);       
        this.$store.dispatch('addUser',users)	
      }
		}
 
	};

</script>

<style scoped>

.delet{
  color: tomato;

}

.pointer{
  cursor: pointer;
}
.link{
 
 color: black;
 display: inline-block;
 width:100%;
  

  
}
</style>