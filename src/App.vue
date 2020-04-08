<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template>
          <v-list-item >Menu</v-list-item>

           <router-link to="/">
            <v-list-item>Inicio</v-list-item>
          </router-link>
          <router-link to="/doctor">
            <v-list-item>Doctores</v-list-item>
          </router-link>
         
          <router-link to="/patient">
            <v-list-item >Pacientes</v-list-item>
          </router-link>
          <router-link to="/room">
            <v-list-item >Habitaciones</v-list-item>
          </router-link>
          <router-link to="/date">
            <v-list-item >Citas</v-list-item>
          </router-link>
            <router-link to="/income">
            <v-list-item >Ingresos</v-list-item>
          </router-link>
           <router-link to="/alta">
            <v-list-item >Alta</v-list-item>
          </router-link>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="purple darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down"> Sistema Medico</span>
      </v-toolbar-title>
 
    </v-app-bar>

   
    <v-content fluid fill-height>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { icon: "mdi-content-copy", text: "Duplicates" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Labels",
        model: true,
        children: [{ icon: "mdi-plus", text: "Create label" }]
      },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "More",
        model: false,
        children: [
          { text: "Import" },
          { text: "Export" },
          { text: "Print" },
          { text: "Undo changes" },
          { text: "Other contacts" }
        ]
      },
      { icon: "mdi-settings", text: "Settings" },
      { icon: "mdi-message", text: "Send feedback" },
      { icon: "mdi-help-circle", text: "Help" },
      { icon: "mdi-cellphone-link", text: "App downloads" },
      { icon: "mdi-keyboard", text: "Go to the old version" }
    ]
  })
};
</script>