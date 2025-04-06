
import './assets/style.css'


import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex/store";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import Card from 'primevue/card';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faDrum } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faCriticalRole } from '@fortawesome/free-brands-svg-icons';
import ProgressSpinner from 'primevue/progressspinner';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import MultiSelect from 'primevue/multiselect';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Button from 'primevue/button';
import  "primeicons/primeicons.css";
import Chip from 'primevue/chip';
import DashboardLayout from "../src/components/DashboardLayout.vue";
import EmptyLayout from "../src/components/EmptyLayout.vue";
import OrderList from 'primevue/orderlist';
import Textarea from 'primevue/textarea';

const app = createApp(App)


library.add(faUserSecret,faCriticalRole,faUsers, faTableColumns,faDrum,faPenToSquare,faEye );

const myPresets = definePreset(Aura, {
    semantic:{
      myButton:{
        warn:{
          background:'white',
          paddigX:'0.75rem',
          paddigY:'0.75rem',
          borderColor:'#673EE6',
          color:'black'
  
        }
      
      }
  
    },
    components: {
      inputtext:{
        focusBorderColor:'#673EE6',
        disabledBackground:'white',
        // paddingY:"0.25rem",
  
        
      },
      multiselect:{
        disabledBackground:'white',
  
      },
      select:{
        disabledBackground:'white',
  
      },
      textarea:{
        disabledBackground:'white',
  
      },
      button:{
       warnBackground:'{my.button.warn.background}',
        paddigX:'{my.button.padding.x}',
        paddigY:'{my.button.padding.y}',
        borderColor:'{my.button.border.color}',
        color:'{my.button.color}'
            
  
        
      
      },
      menubar:{
        background:'transparent',
        border:{
          color:"transparent"
  
        },
        // base:{
          item:{
           
            focus:{
  
              background:'transparent'
  
            }
  
          }
  
        // },
        
        
      }
  
    },
  });

app.use(router)
.use(store)
.use(PrimeVue, {
    theme: {
      preset: myPresets,
    },
  })
.use(ToastService)
.use(ConfirmationService)
.component("Card",Card)
.component("ConfirmDialog",ConfirmDialog)
.component("Paginator",Paginator)
.component("DataTable",DataTable)
.component("MultiSelect",MultiSelect)
.component("Button",Button)
.component("Chip",Chip)
.component("Toast",Toast)
.component("InputText",InputText)
.component("Column",Column)
.component("ProgressSpinner",ProgressSpinner)
.component('font-awesome-icon', FontAwesomeIcon)
.component('DefaultLayout', DashboardLayout)
.component('EmptyLayout', EmptyLayout)
.component("OrderList",OrderList)
.component("Textarea",Textarea)

app.mount('#app')
