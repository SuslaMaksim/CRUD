<template>
  

<div class="input-form">
  <h1 class="title"> Edit User</h1>

  <div class="wrapper-form">
  <form class="main-form" @submit.prevent='changeUser'>
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
      <button class="button is-primary add-user"> Edit User</button>
      
  </form>
</div>
</div>
</template>


<script >

export default{

  name: 'EditUser',
  props: {

    id:{
      type: String,
      required: true
    }
  },
  data(){

    return{

      filds:{
        name: '',
        surname: '',
        phone: '',
        mail:'',
        id: undefined   
      },
      fildsErrors:{
        name: undefined,
        surname: undefined,
        phone: undefined,
        mail:  undefined
      }
    }
  },
   created(){

    this.$store.dispatch('loadUsers')
      .then( ()=>{
        let{name,surname,phone,mail,id} = this.$store.getters.getUser(this.id);
        this.filds = {name,surname,phone,mail,id}
      })
    
   },
  methods:{

    changeUser(){

    this.fildsErrors = this.validateForm(this.filds);
    if(Object.keys(this.fildsErrors).length) return;

    let {name,surname,phone,mail,id} = this.filds;
    let usersFromStore = [...this.$store.state.users];

    let changeUsers = usersFromStore.map( user => {  
        return user.id == this.id ? {name,surname,phone,mail,id} : user;
    })
    this.$store.dispatch('addUser', changeUsers)
     .then(()=>{

          this.filds.name = '';
          this.filds.surname = '';
          this.filds.phone = '';
          this.filds.mail = '';


          this.$router.push('/main')
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
    }



  }


};
  


</script>

<style lang="css" scoped>
  
.input-form{
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 600px;
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

</style>