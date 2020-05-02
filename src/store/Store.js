import Vue from 'vue';
import Vuex from "vuex";
import { studentsModule } from './modules/modules';

Vue.use(Vuex);

export default new Vuex.Store({    
    modules: {
        studentStore: studentsModule,
    }
});
