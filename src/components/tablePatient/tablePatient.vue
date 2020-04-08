<template>
  <v-data-table
    :headers="headers"
    :items="patients"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Pacientes</v-toolbar-title>
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
                       <v-btn @click="generatePdf">print</v-btn>
            <v-btn color="primary" dark class="mb-2" v-on="on">Agregar Paciente</v-btn>
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
                    <v-text-field v-model="cedula" label="Cedula"></v-text-field>
                  </v-col>
                  <p>El paciente tiene seugro medico?</p>
                   <v-radio-group v-model="insurance" row>
                 <v-radio label="Si"  :value="true"></v-radio>
                <v-radio label="No"  :value="false"></v-radio>
                 </v-radio-group>
                  <v-col cols="12" v-if="insurance">
                    <v-text-field v-model="insuranceName" label="Seguro Medico"></v-text-field>
                  </v-col>
                </v-row>
         </v-form>

              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createPatient">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editPatient(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deletePatient(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getPatients">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
  export default {
    data: () => ({
      dialog: false,
      valid: false,
      patients:[],
      search:'',
      id:null,
      editedIndex: -1,
      insurance:null,
      insuranceName:'',
      cedula:'',
      headers: [
       
        { text: 'Nombre', value: 'name' },
        { text: 'Cedula', value: 'cedula' },
        { text: 'Seguro Medico', value: 'insuranceName' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
     name:'',
     nameRules: [
        v => !!v || 'El campo nombre es obligatorio',
        v => v.length <= 10 || 'ingresar al menos 3 caracteres',
      ],
    
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Paciente' : 'Editar Paciente'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
        this.getPatients();
    },

    methods: {

       generatePdf(){
          var doc = new jsPDF()
 
                var body =[]
  var columns = [
    { header: 'Nombre', dataKey: 'name' },
    { header: 'Cedula', dataKey: 'cedula' },
    { header: 'Seguro Medico', dataKey: 'insurance' },

  ]
     
        this.doctors.map((x) =>{
          body.push({name:x.name,cedula:x.cedula,insurance:x.insurance})
        }),

     doc.autoTable({

 columns,
 body
})

doc.text('    listado de pacientes', 1, 1)
doc.save('patients')
 

      },
     getPatients(){
        axios.get('Patient/GetAll').then(response =>{
          this.patients = response.data;
        })
     },

     deletePatient(item){
       this.$confirm("Estas seguro que deseas eliminar este registro?").then(() => {
   axios.put('Patient/DeletePatient/'+item.id).then(() =>{
                  this.getPatients();
         })
});
      
       },
       clear(){
          this.name = '';
          this.cedula = '';
          this.insurance = null;
          this.insuranceName = '';
          this.editedIndex = -1;
         },

     createPatient(){

       if(!this.name || this.name.length < 3){
         this.$refs.form.validate()
         return;
         }
        if(this.editedIndex > -1){
          axios.put('Patient/EditPatient',{
                id: this.id,
                name: this.name,
                cedula: this.cedula,
                insurance: this.insurance,
                insuranceName:this.insuranceName
              }).then(() =>{
            this.close();
                this.clear();
                this.getPatients();
            
                })
          }
          else{
          axios.post('Patient/SavePatient',{
            name: this.name,
            cedula: this.cedula,
            insurance: this.insurance,
            insuranceName:this.insuranceName
          }).then(() =>{
            this.close();
            this.getPatients()
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
        this.clear();
      },
    editPatient(patObj){
      this.id = patObj.id;
      this.name =patObj.name;
      this.cedula = patObj.cedula;
      this.insurance = patObj.insurance;
      this.insuranceName =patObj.insuranceName;
      this.editedIndex = 1;
      this.dialog = true;
      }
   
    },
  }
</script>