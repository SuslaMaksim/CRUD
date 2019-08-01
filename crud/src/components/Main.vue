<template>
  
<div class="main">

  <div class="has-text-centered pointer">
    <h1 class="title is-size-1"> CRUD</h1>
  </div>

    <div class="first_page">
     <div class="container">

    <router-link to ="/addUser"><span class="button is-primary"> Add User</span></router-link>
    

    <div >

      <p v-if='!getUsers.length' style="color: tomato ;margin-bottom: 20px">В приложениии еще нет контактов</p>
      <p v-else style="margin-bottom: 20px">Все работает</p>
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th class="has-text-centered pointer">Name</th>
              <th class="has-text-centered pointer">Surname</th>
              <th class="has-text-centered pointer">Phone</th>
              <th class="has-text-centered pointer">Email</th>
              <th class="has-text-centered pointer">Delete</th>
              <th class="has-text-centered pointer">Edit</th>
            </tr>
          </thead>
          <tbody>


                  <tr v-if="!getUsers.length" >                                        
                    <td > Maksim</td>
                    <td > Susla</td>
                    <td > 066-021-66-72</td>
                    <td > susla.maksim@gmail.com</td>
                    <td class="has-text-centered pointer"><span style="color:tomato"><font-awesome-icon icon="trash-alt" /></span> </td>
                    <td class="has-text-centered pointer link edit">
                       <span class="edit"><font-awesome-icon icon="edit" /></span>                    
                    </td>
                  </tr> 

                  <User v-for="user in getUsers"
                       :user='user'                
                       :key='user.id'
                       />
              
                
          </tbody>
           <tfoot>
            <tr>
              <th class="has-text-centered pointer">Name</th>
              <th class="has-text-centered pointer">Surname</th>
              <th class="has-text-centered pointer">Phone</th>
              <th class="has-text-centered pointer">Email</th>
              <th class="has-text-centered pointer">Delete</th>
              <th class="has-text-centered pointer">Edit</th>
            </tr>
          </tfoot>
        </table>
    </div>
  </div>

 </div>
  <div class="modal ">
  
  <div class="modal-content">
    <div class="modal-warning">
      вы действительгл
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>
</div>

</template>

<script>

import User from './User.vue'
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  components:{
    'User': User
  },
   created(){

    this.$store.dispatch('loadUsers');
  },

  computed:{
    ...mapGetters(['getUsers'])
  }, 

};
</script>

<style lang="css" scoped>


.first_page{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
 
}
.container {
 width: 100%;

  
}
.title{
  margin-top: 50px;
}

.button{

  margin-bottom: 20px;
}
.modal-warning{
  background-color: red;
}

</style>
