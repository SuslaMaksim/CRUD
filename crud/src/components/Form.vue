<template>
  

<div class="input-form">
  <h1 class="title"> Create a New persen</h1>

  <div class="wrapper-form">
  <form class="main-form" @submit.prevent='submitForm'>
    <div class="field">
        <label class="label">Name</label>
        <div class="control has-icons-left">
          <input class="input" type="text" v-model='filds.name'  placeholder="Enter name">
          <span class="icon is-small is-left">
               <font-awesome-icon icon="user" />
          </span>
        </div>
        <p  style='color: tomato'  v-if='fildsErrors.name'>{{fildsErrors.name}}</p>
          
    </div>

      <div class="field">
        <label class="label">Surname</label>
        <div class="control has-icons-left">
          <input class="input" type="text" v-model='filds.surname' placeholder="Enter Surname">
          <span class="icon is-small is-left">
               <font-awesome-icon icon="user" />
          </span>
        </div>
        <p  style='color: tomato'  v-if='fildsErrors.surname'>{{fildsErrors.surname}}</p>
      </div>

       <div class="field">
        <label class="label">Phone</label>
        <div class="control has-icons-left">
          <input class="input" type="text" v-model='filds.phone' placeholder="Enter phone">
          <span class="icon is-small is-left">
               <font-awesome-icon icon="mobile-alt" />
          </span>
        </div>
        <p  style='color: tomato'  v-if='fildsErrors.phone'>{{fildsErrors.phone}}</p>
      </div> 

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input class="input" type="text" v-model='filds.mail' placeholder="Enter mail">
          <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope" />
          </span>
        </div>
        <p  style='color: tomato'  v-if='fildsErrors.mail'>{{fildsErrors.mail}}</p>
      </div>
      <div class="buttons">
        <button v-if='!addMoreUser' class="button is-primary add-user"> Add User</button>
        <button v-else class="button is-primary add-user"> Add more</button>
         <span title="Return to main page" @click='backToMain' class="arrow-left"><font-awesome-icon icon="arrow-left" /></span>
      </div>

  </form>
</div> 
    <ToJson/>
</div>


</template>


<script >

import ToJson from './ToJson.vue'

export default{
  components:{
    'ToJson': ToJson
  },
  name: 'Form',


  data(){

    return{

      filds:{
        name: '',
        surname: '',
        phone: '',
        mail:''
      },
      fildsErrors:{
        name: undefined,
        surname: undefined,
        phone: undefined,
        mail:  undefined
      },
      addMoreUser: false
    }
  },
   
  created(){
    this.$store.dispatch('loadUsers');
  },
  methods:{

    submitForm(){

    this.fildsErrors = this.validateForm(this.filds);

    if(Object.keys(this.fildsErrors).length) return;

    let {name,surname,phone,mail} = this.filds;

    const newUser = {          
          name,
          surname,
          phone,
          mail,
          id: this.getID()
    };

    const users = [...this.$store.state.users, newUser ];

    this.$store.dispatch('addUser', users)
      .then(()=>{

          this.filds.name = '',
          this.filds.surname = '',
          this.filds.phone = '',
          this.filds.mail = ''
      })
      
    },

    validateForm(filds){

        const errors = {};
        
        if(!filds.name) errors.name = 'Введите имя пользователя';
        if(!filds.surname) errors.surname = 'Введите фамилию пользователя';
        if(!filds.phone) errors.phone = 'Введите телефон пользователя';
        if(!filds.mail) errors.mail = 'Введите Email пользователя';

        if(filds.phone && this.checkNumber(filds.phone)) errors.phone ='Введите корректный номер телефона по примеру : +38021778341';
        if(filds.mail && !this.checkMail(filds.mail)) errors.mail = 'Введите корректный mail';


        return errors;

    },

     checkMail(email){
      const re = /\S+@\S+\.\S+/;

      return re.test(email)
    },

    checkNumber(phone){
      return Number(phone).toString() === 'NaN' ? true : false;
    },

    getID(){
      return Date.now()
    },
    backToMain(){
      this.$router.go(-1)
    }


  },

  computed:{
   
  } 



};
  


</script>

<style lang="css" scoped>
  
.input-form{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 800px;
  flex-direction: column
  

}
.title{
  margin-top: 40px;
}
.wrapper-form{
  padding: 30px;
  border: 1px solid #e0dcd7;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #e0dcd7;
}
.main-form{
 min-width: 400px;
 max-width: 400px;
}

.add-user{
  margin-top: 10px;
}

.buttons {
  justify-content: space-between;
}
.arrow-left{
  justify-content: center;
  align-items: center;
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #00d1b2;
  color: white;
  cursor: pointer;
}
.arrow-left:hover{
  background-color: #03ab92;
}



</style>