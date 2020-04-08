<template>
  <v-data-table
    :headers="headers"
    :items="rooms"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Habitaciones</v-toolbar-title>
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

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              >Agregar Habitacion</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      type="number"
                      required
                      v-model="number"
                      label="Numero habitacion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="nameRoom"
                      :items="types"
                      label="Selecione el tipo de habitacion"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" v-if="priceRoom !== null">
                    <v-text-field
                      v-model="priceRoom"
                      disabled
                      label="Precio habitacion"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="createRoom"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editRoom(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteRoom(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getRoom">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    valid: false,
    rooms: [],
    price: null,
    number: null,
    search: "",
    id: null,
    editedIndex: -1,
    types: ["Suite", "Doble", "Privada"],
    priceRoom: null,
    nameRoom: "",
    headers: [
      { text: "Numero Habitacion", value: "number" },
      { text: "Tipo Habitacion", value: "type" },
      { text: "Precio", value: "price" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    name: "",
    nameRules: [
      (v) => !!v || "El campo numero es obligatorio",
      (v) => v.length <= 10 || "ingresar al menos 3 caracteres",
    ],
    exequator: null,
    specialty: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva habitacion" : "Editar habitacion";
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
    nameRoom() {
      
      if (this.nameRoom == "Doble") {
        this.priceRoom = 2500;
        return this.priceRoom;
      } else if (this.nameRoom == "Privada") {
        this.priceRoom = 4000;
        return this.priceRoom;
      } else if(this.nameRoom == 'Suite'){
        this.priceRoom = 6000;
        return this.priceRoom;
      }
    },
  },

  created() {
    this.getRoom();
  },

  methods: {
    getRoom() {
      axios.get("Rooms/GetAll").then((response) => {
        this.rooms = response.data;
      });
    },

    deleteRoom(item) {
      this.$confirm("Estas seguro que deseas eliminar este registro?").then(
        () => {
          axios.put("Rooms/DeleteRoom/" + item.id).then(() => {
            this.getRoom();
          });
        }
      );
    },
    clear() {
      this.number = "";
      this.nameRoom = "";
      this.priceRoom = null;
      this.editedIndex = -1;
    },

    createRoom() {
  
      if (this.editedIndex > -1) {
        axios
          .put("Rooms/EditRoom", {
            id: this.id,
            number: this.number,
            type: this.nameRoom,
            price: this.priceRoom,
          })
          .then(() => {
            this.close();
            this.clear();
            this.getRoom();
          });
      } else {
        axios
          .post("Rooms/SaveRoom", {
            number: this.number,
            type: this.nameRoom,
            price: this.priceRoom,
          })
          .then(() => {
            this.close();
            this.getRoom();
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
    editRoom(roomObj) {
      this.id = roomObj.id;
      this.number = roomObj.number;
      this.nameRoom = roomObj.type;
      this.priceRoom = roomObj.price;
      this.editedIndex = 1;
      this.dialog = true;
    },
  },
};
</script>
