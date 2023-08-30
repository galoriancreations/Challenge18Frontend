<template>
    <div>
     <v-radar :stats="stats" :polycolor="polycolor" :radar="radar" :scale="scale">
     </v-radar>
     <radarInstruction/>
    </div>
     <!-- test -->
 
 </template>
 
 
 <script>
 import Radar from 'vue-radar'
 import radarInstruction from './radarInstruction.vue';
 export default {
     data() {
         return {
             radar: {
                 size: '500', // pixel unit
                 viewbox: '1100', // unit used inside the svg (here 400px = 1000 unités)
                 radius: '300', // same unit than above (diamètre = 900), keep the radius < (viewbox / 2)
                 structure: {
                     external: { // external stroke of the structure's polygon
                         strokeColor: 'black', // color (any css format is usable (hexa, rgb, rgba...))
                         strokeWidth: '9' // pixel unit
                     },
                     internals: { // internals stroke of the structure's polygon (one every 10%)
                         strokeColor: 'gray', // color (any css format is usable (hexa, rgb, rgba...))
                         strokeWidth: '5' // pixel unit
                     },
                     average: { // average polygon (placed at 50%)
                         strokeColor: 'brown', // stroke color (any css format is usable (hexa, rgb, rgba...))
                         strokeWidth: '2', // pixel unit
                         fillColor: 'black' // polygon color (any css format is usable (hexa, rgb, rgba...))
                     }
                 },
                 lines: {  // lines from center to summits
                     strokeColor: 'black', // color (any css format is usable (hexa, rgb, rgba...))
                     strokeWidth: '6' // pixel unit
                 }
             },
             scale: { // scales of corresponding statistic
                 expression: 200, // key must be equal to the corresponding statistic, lowercased and without accents
                 courage: 200,
                 knowledge: 200,
                 understanding: 200,
                 dilegence: 200
             },
             stats: this.item.item.stats.map(stat => ({
                 name: stat.type,
                 value: stat.score,
                 level: stat.level,
                 
             })),
 
             polycolor: 'rgba(255, 0, 0, 0.2)' // color (any css format is usable (hexa, rgb, rgba...))
         }
     },
     components: {
         'v-radar': Radar,
         radarInstruction
     },
     props: ['item'],
     created() {
         console.log(
             this.item['item'].stats[0].level
         );
     }
 }
 
 </script>
 
 <style></style>