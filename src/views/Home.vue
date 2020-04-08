<template>
  <div class="home">
                <v-row>
    
    <v-col cols="4" >
     <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/img/rc.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Nos preocupamos por la salud de nuestro pueblo
    </v-card-title>

    <v-card-subtitle>
    
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn
        color="purple"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
        tenemos mas  de 10 años y nuestro orgullo es ver un pueblo sano
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </v-col>
      <v-col cols="4" >
     <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/img/hpsa.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
    Disfrutamos ver nuestro publo feliz y sano
    </v-card-title>

    <v-card-subtitle>
    
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn
        color="purple"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
        nuestra vision es tener una reputacion a nivel mundial
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </v-col>
      <v-col cols="4" >
     <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/img/s.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
    Somos un equipo.. por que todos somos uno
    </v-card-title>

    <v-card-subtitle>
    
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn
        color="purple"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
        nuestra vision es tener una reputacion a nivel mundial
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </v-col>
                </v-row>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
   data: () => ({
      show: false,
    }),
}
</script>
