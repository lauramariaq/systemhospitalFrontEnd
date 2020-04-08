<template>
  <v-data-table
    :headers="headers"
    :items="incomes"
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
                      v-model="patientId"
                      :items="patients"
                      label="Selecione el paciente"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="roomId"
                      :items="rooms"
                      label="Selecione una habitacion"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                  <span>Slecione una fecha</span>
       <b-datetimepicker
                      rounded
                      placeholder="Seleccione una fecha"
                      v-model="incomeDate"
                      data-vv-as="fecha de inicio"
                      icon="calendar-today"
                      :datetime-formatter="formatDateTime"
                      :datepicker="{ monthName,dayNames }"
                      editable
                    ></b-datetimepicker>
 
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createIncome"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.incomeDate="{ item }">
        {{item.incomeDate | Date }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editIncome(item)">
        mdi-pencil
      </v-icon>
 
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
  incomeDate:null,
    dialog: false,
    valid: false,
    patients: [],
    incomes: [],
    patientId: null,
    roomId: null,
   dayNames: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    dateOpend: null,
    search: "",
    id: null,
    editedIndex: -1,
    headers: [
      { text: "Paciente", value: "patientName" },
      { text: "Habitacion", value: "typeRoom" },
      { text: "Fecha", value: "incomeDate" },
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
  },

  created() {
    this.getPatients();
    this.getRooms();
    this.getIncomes();
  },

  methods: {
      formatDateTime(date) {
    if (date) return moment(date).format("DD/MM/YYYY HH:mm");
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
    getPatients() {
      let array;
      axios.get("Patient/GetAll").then((response) => {
        array = response.data;
        array.map((x) => {
          this.patients.push({
            text: x.name,
            value: x.id,
          });
        });
      });
    },
    getIncomes() {
      axios.get("Incomes/GetAll").then((response) => {
        this.incomes = response.data;
      });
    },

    clear() {
      this.patientId = null;
      this.roomId = null
      this.incomeDate = null;
      this.editedIndex = -1;
    },

    createIncome() {
      if (this.editedIndex > -1) {
        axios
          .put("Incomes/UpdateIncome", {
            id: this.id,
            patientId: this.patientId,
            roomId: this.roomId,
            incomeDate: this.incomeDate,
          })
          .then(() => {
            this.close();
            this.clear();
            this.getIncomes();
          });
      } else {
        axios
          .post("Incomes/SaveIncome", {
            patientId: this.patientId,
            roomId: this.roomId,
            incomeDate: this.incomeDate,
          })
          .then(() => {
            this.close();
            this.getIncomes();
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
