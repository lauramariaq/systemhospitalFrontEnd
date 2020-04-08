<template>
  <v-data-table
    :headers="headers"
    :items="dates"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Citas</v-toolbar-title>
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
              >Agregar Cita</v-btn
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
                      v-model="doctorId"
                      :items="doctors"
                      label="Selecione el doctor"
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                  <span>Slecione una fecha</span>
       <b-datetimepicker
                      rounded
                      placeholder="Seleccione una fecha"
                      v-model="dateOpend"
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
              <v-btn color="blue darken-1" text @click="createDate"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.opendDate="{ item }">
        {{item.opendDate | formatDate }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editDate(item)">
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
    dialog: false,
    valid: false,
    patients: [],
    doctors: [],
    dates: [],
    patientId: null,
    doctorId: null,
   dayNames: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    dateOpend: null,
    search: "",
    id: null,
    editedIndex: -1,
    headers: [
      { text: "Paciente", value: "patientName" },
      { text: "Doctor", value: "doctorName" },
      { text: "Fecha", value: "opendDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  
   
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Cita" : "Editar Cita";
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
    this.getDates();
    this.getPatients();
    this.getDoctors();
  },

  methods: {
      formatDateTime(date) {
    if (date) return moment(date).format("DD/MM/YYYY HH:mm");
  },

    getDoctors() {
      let array;
      axios.get("Doctors/GetAll").then((response) => {
        array = response.data;
        array.map((x) => {
          this.doctors.push({
            text: x.name,
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
    getDates() {
      axios.get("Dates/GetAll").then((response) => {
        this.dates = response.data;
      });
    },

    clear() {
      this.patientId = null;
      this.doctorId = null
      this.dateOpen = null;
      this.editedIndex = -1;
    },

    createDate() {
      if (this.editedIndex > -1) {
        axios
          .put("Dates/UpdateDate", {
            id: this.id,
            opendDate: this.dateOpend,
            patientId: this.patientId,
            doctorId: this.doctorId,
          })
          .then(() => {
            this.close();
            this.clear();
            this.getDates();
          });
      } else {
        axios
          .post("Dates/SaveDate", {
            patientId: this.patientId,
            doctorId: this.doctorId,
            opendDate: this.dateOpend,
          })
          .then(() => {
            this.close();
            this.getDates();
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
    editDate(dateObj) {
        debugger;
        this.id = dateObj.id;
     this.patientId = dateObj.patientId;
      this.doctorId = dateObj.doctorId;
      this.dateOpend = dateObj.opendDate;
      this.editedIndex = 1;
      this.dialog = true;
    },
  },
};
</script>
