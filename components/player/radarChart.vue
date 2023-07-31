<template>
    
  <v-radar
:stats="stats"
:polycolor="polycolor"
:radar="radar"
:scale="scale">
</v-radar>

</template>

<script>
import Radar from 'vue-radar'
export default {
    data () {
    return {
        radar: {
            size: '500', // pixel unit
            viewbox: '800', // unit used inside the svg (here 400px = 1000 unités)
            radius: '300', // same unit than above (diamètre = 900), keep the radius < (viewbox / 2)
            structure: {
                external: { // external stroke of the structure's polygon
                    strokeColor: 'rgba(0, 0, 0, 1)', // color (any css format is usable (hexa, rgb, rgba...))
                    strokeWidth: '9' // pixel unit
                },
                internals: { // internals stroke of the structure's polygon (one every 10%)
                    strokeColor: '#76B4FF', // color (any css format is usable (hexa, rgb, rgba...))
                    strokeWidth: '5' // pixel unit
                },
                average: { // average polygon (placed at 50%)
                    strokeColor: 'rgba(0, 0, 0, 1)', // stroke color (any css format is usable (hexa, rgb, rgba...))
                    strokeWidth: '2', // pixel unit
                    fillColor: 'rgba(0, 0, 0, .5)' // polygon color (any css format is usable (hexa, rgb, rgba...))
                }
            },
            lines: {  // lines from center to summits
                strokeColor: 'rgba(0, 0, 0, .3)', // color (any css format is usable (hexa, rgb, rgba...))
                strokeWidth: '1' // pixel unit
            }
        },
        scale: { // scales of corresponding statistic
            intelligence: 200, // key must be equal to the corresponding statistic, lowercased and without accents
            charisma: 200, 
            agilty: 200,
            dexterity: 200,
            stupidness: 200
        },
        stats: [
            {
                name: 'Intelligence', // string
                value: 37, // int
                shortName: 'Int' // The two first letters are used to be display next to their corresponding summits
            },
            {
                name: 'Charisma',
                value: 77,
                shortName: 'Ch'
            },
            {
                name: 'Agilty',
                value: 187,
                shortName: 'Ag'
            },
            {
                name: 'Dexterity',
                value: 99,
                shortName: 'De'
            },
            {
                name: 'Stupidness',
                value: 144,
                shortName: 'Stupid'
            }
        ],
        polycolor: '#7307D3' // color (any css format is usable (hexa, rgb, rgba...))
    }
},
components: {
    'v-radar': Radar
}
}
</script>

<style>

</style>