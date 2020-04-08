<template>
  <v-data-table
    :headers="headers"
    :items="doctors"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Doctores</v-toolbar-title>
              <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
    
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Agregar Doctor</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>

              <v-container>
         <v-form 
         
          ref="form"
    lazy-validation
         v-model="valid">

                <v-row>
                  <v-col cols="12">
                    <v-text-field :rules="nameRules" :counter="3" required v-model="name" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field type="number" v-model="exequator" label="Exequator"></v-text-field>
                  </v-col>
                  <v-col cols="12" >
                    <v-text-field v-model="specialty" label="Especialidad"></v-text-field>
                  </v-col>
                </v-row>
         </v-form>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createDoctor">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editDoctor(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteDoctor(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getDoctors">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      valid: false,
      doctors:[],
      search:'',
      id:null,
      editedIndex: -1,
      headers: [
       
        { text: 'Nombre', value: 'name' },
        { text: 'Exequator', value: 'exequator' },
        { text: 'Especialidad', value: 'specialty' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
     name:'',
     nameRules: [
        v => !!v || 'El campo nombre es obligatorio',
        v => v.length <= 10 || 'ingresar al menos 3 caracteres',
      ],
     exequator:null,
    specialty:'',
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Doctor' : 'Editar Doctor'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.getDoctors();
    },

    methods: {
     
     getDoctors(){
      
        axios.get('Doctors/GetAll').then(response =>{
          this.doctors = response.data;
        })
     },

     deleteDoctor(item){
       this.$confirm("Estas seguro que deseas eliminar este registro?").then(() => {
   axios.put('Doctors/DeleteDoctor/'+item.id).then(() =>{
          this.getDoctors();        
         })

});
      
       },
       clear(){
          this.name = '';
          this.specialty = '';
          this.exequator = '';
                this.editedIndex = -1;

         },

     createDoctor(){

       if(!this.name || this.name.length < 3){
         this.$refs.form.validate()
         return;
         }
        if(this.editedIndex > -1){
          axios.put('Doctors/EditDoctor',{
                id: this.id,
                name: this.name,
                exequator: this.exequator,
                specialty: this.specialty
              }).then(() =>{
            this.close();
                this.clear();
                this.getDoctors();
            
                })
          }
          else{

          axios.post('Doctors/SaveDoctor',{
            name: this.name,
            exequator: this.exequator,
            specialty: this.specialty
          }).then(() =>{
            this.close();
            this.getDoctors()
                this.clear();
          })
          }
       },

     

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    editDoctor(doctoObj){
      this.id = doctoObj.id;
      this.name =doctoObj.name;
      this.exequator = doctoObj.exequator;
      this.specialty = doctoObj.specialty;
      this.editedIndex = 1;
      this.dialog = true;
      }
   
    },
  }
</script>