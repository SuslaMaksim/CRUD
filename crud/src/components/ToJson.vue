<template>
	        
  <div class="field JSONaria">
    <p class="label" v-if="!sucsess">Введите JSON массив</p>
    <p class="label " v-if='sucsess'>JSON массив сохранился в LocalStorage!
    <p v-if='errorTextFirst' class="label " style='color: tomato'>Вы ничего не ввели, введите JSON массив</p>
    <p v-if='errorTextSecond' class="label " style='color: tomato'>Вы неккоректно ввели JSON массив, пожалуйста исправте ошибку</p>
     <div class="control">
        <textarea v-model='json' class="textarea is-primary " placeholder="Введите JSON массив"></textarea>
      </div>

      <button class="button is-primary" @click='addJson'> Add JSON</button>

  </div>

</template>


<script>



	export default {
		name: 'ToJson',

    data(){
      return{
        json: '',
        errorTextFirst: false,
        errorTextSecond: false,
        sucsess: false

      }
    },
  created(){
   this.$store.dispatch('loadJson')
   
 },

		methods:{

      addJson(){
      this.errorTextSecond = false;
      this.errorTextFirst= false;
      if(this.json === '') return this.errorTextFirst = true;


      try{
         const arrey = JSON.parse(this.json);   

           let fromStorage = this.$store.getters.getJSON;
           fromStorage.push(arrey);
            
          this.$store.dispatch('saveJson',fromStorage )
            .then(()=>  {
            this.json='';
            this.sucsess = true;
            this.turnSucsess()
           })

      }catch(error){
          console.log(error)
          this.errorTextFirst = false;
          this.errorTextSecond = true;
      }
    
			
		},

    turnSucsess(){
        setTimeout(()=>{
            this.sucsess = false
        },2000)
    }

 },


	};

</script>

<style scoped>

.JSONaria{
  margin-top: 50px;
}
.textarea {
  min-width: 600px;
}  
.button{
  margin-top: 20px;
}


</style>