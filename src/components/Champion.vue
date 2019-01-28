<template>
    <div class="champion">
        <!-- The Individual Champion Image -->
        <img 
            :src='champion.championImage' 
            :alt='champion.championName'
            @click="fullView = !fullView"
        >
        <!-- The full view holder -->
        <div 
            class="fullView"
            v-if="fullView"
        >
            <app-champion-card 
                :champion="champion"
                :switchView="hideCard"
            />
        </div>
    </div>
</template>

<script>
import ChampionCard from './ChampionCard';

export default {
    data() {
        return {
            // Controls full view or not
            fullView: false
        }
    },
    components: {
        // Individual champion card
        appChampionCard: ChampionCard
    },
    methods: {
        hideCard() {
            // Allows for the child component to change view back.
            this.fullView = !this.fullView;
        }
    },
    props: ['champion']
}
</script>

<style lang="scss" scoped>
.champion {
    img {
        cursor: pointer;
    }
    .fullView {
        width: 100vw;
        height: 100vh;
        background-color: #10141955;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
    }
}
    
</style>
