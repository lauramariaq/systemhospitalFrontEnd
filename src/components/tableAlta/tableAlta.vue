<template>
  <v-data-table
    :headers="headers"
    :items="altas"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ingresos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          max-width="500px"
          :fullscreen="true"
          :dark="true"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >Agregar ingreso</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span
                class="headline"
                style="
    margin-left: 680px;
    margin-top: 55px;"
                >{{ formTitle }}</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="incomeId"
                      :items="incomeArr"
                      label="Selecione el paciente"
                    ></v-select>
                  </v-col>
                 <v-col cols="6">
                    <v-text-field disabled v-model="typeRoom" label="Tipo de habitacion"></v-text-field>
                  </v-col>
                
                    <v-col cols="6">
                        <p>Fecha de ingreso</p>
                        {{incomeDate | Date}}
                  </v-col>
                  <v-col cols="6">
                  <span>Slecione una fecha final</span>
         <b-datepicker
            placeholder="Click to select..."
            v-model="dateEnd"
            >
        </b-datepicker>
 
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createAlta"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.dateEnd="{ item }">
        {{item.dateEnd | Date }}
    </template>

  </v-data-table>
</template>
<script>
import axios from "axios";
import moment from 'moment'

export default {
  data: () => ({
      rooms:[],
        monthName: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
    dateEnd:null,
    dialog: false,
    incomeDate:null,
    incomes: {},
    incomeArr:[],
    incomeId:null,
    altas:[],
    totalPrice:null,
    patientName: '',
    typeRoom:'',
   dayNames: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    dateOpend: null,
    search: "",
    id: null,
    editedIndex: -1,
    headers: [
      { text: "Paciente", value: "patientName" },
      { text: "Habitacion", value: "typeRoom" },
      { text: "Fecha", value: "dateEnd" },
      { text: "Precio Total", value: "totalPrice" },

      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  
   
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo ingreso" : "Editar ingreso";
    },
    // nameRoom(){
    //   if(this.nameRoom == 'Doble'){
    //     this.priceRoom = 2500;
    //     return this.priceRoom;
    //   }
    //   else if(this.nameRoom == 'Regular'){
    //     this.priceRoom = 4000;
    //     return this.priceRoom;
    //   }
    //   else{
    //       this.priceRoom = 6000;
    //       return this.priceRoom;
    //   }
    // }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    incomeId(id){
        console.log(id);
        if(id){
    axios.get("Incomes/GetIncomeById/"+id).then((response) => {
        this.incomes = response.data;
      });
        }
    },
    incomes(){
        this.typeRoom = this.incomes.typeRoom;
            this.incomeDate = this.incomes.incomeDate;
            this.patientName = this.incomes.patientName;
    },
    dateEnd(){
            var start = moment(this.incomeDate, "YYYY-MM-DD");
            var end = moment(this.dateEnd, "YYYY-MM-DD");

       var value = moment.duration(start.diff(end)).asDays();
      let number =  Math.abs(value);
      this.totalPrice = number;
    }
  },

  created() {
    this.getAltas();
    this.getIncomes();
  },

  methods: {
      formatDateTime(date) {
    if (date) return moment(date).format("DD/MM/YYYY HH:mm");
  },
   getAltas(){
       axios.get('Altas/GetAll').then(response =>{
           this.altas = response.data;
       })
   },

    getRooms() {
      let array;
      axios.get("Rooms/GetAll").then((response) => {
        array = response.data;
        array.map((x) => {
          this.rooms.push({
            text: x.type,
            value: x.id,
          });
        });
      });
    },
    getIncomes() {
      let array;
      axios.get("Incomes/GetAll").then((response) => {
        array = response.data;
        array.map((x) => {
          this.incomeArr.push({
            text: x.patientName,
            value: x.id,
          });
        });
      });
    },
 
    clear() {
      this.incomeId = null;
      this.dateEnd = null;
      this.typeRoom = '';
      this.patientName = '';
      this.totalPrice = null;
      this.editedIndex = -1;
    },

    createAlta() {
      if (this.editedIndex > -1) {
        axios
          .put("Altas/SaveAlta", {
            id: this.id,
            patientName: this.patientName,
            typeRoom: this.typeRoom,
            totalPrice: this.totalPrice,
          })
          .then(() => {
            this.close();
            this.clear();
            this.getIncomes();
          });
      } else {
        axios
          .post("Altas/SaveAlta", {
            incomeId: this.incomeId,
            patientName: this.patientName,
            typeRoom: this.typeRoom,
            dateEnd: this.dateEnd,
            totalPrice: this.totalPrice,
          })
          .then(() => {
            this.close();
            this.getAltas();
            this.clear();
          });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.clear();
    },
    editIncome(Obj) {
        debugger;
        this.id = Obj.id;
     this.patientId = Obj.patientId;
      this.roomId = Obj.roomId;
      this.incomeDate = Obj.incomeDate;
      this.editedIndex = 1;
      this.dialog = true;
    },
  },
};
</script>
