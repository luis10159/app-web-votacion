import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
    state: () => {
        return {
            hola: false,
            
        };
    },
    getters: {},
    actions: {
        CaHola() {
            this.hola = true;
        },
        
    },
});
