import Vue from 'vue';
import Vuex from "vuex";
import { studentsModule } from './modules/studentModule';

Vue.use(Vuex);

export default new Vuex.Store({    
    modules: {
        studentStore: studentsModule,
    }
});
