<template>
    <section class="championCard">
        <!-- Top Section with Name and Title -->
        
        <!-- Information Section -->
        <section>
            <!-- Champion Splash -->
            <div class="championSplash">
                <h2>{{ champion.championName }}</h2>
                <small>{{ champion.championTitle }}</small>
                <img :src="champion.championSplash" :alt="champion.championName">
            </div>
            <!-- Champion Skills -->
            <div class="championSkills">
                <h3>Champion Skills</h3>
                <!-- Champion Passive -->
                <div class="skill">
                    <img :src="'http://ddragon.leagueoflegends.com/cdn/' + champion.version + '/img/passive/' + champion.championPassive.image.full" :alt="champion.championPassive.name">
                    <div class="skillInfo">
                        <h5>{{ champion.championPassive.name }}</h5>
                        <p>{{ champion.championPassive.description | replaceTags }}</p>
                    </div>
                </div>
                <!-- Champion Main 4 Abilities -->
                <div 
                    class="skill"
                    v-for="spell in champion.championSpells"
                    :key="spell.name"
                >
                    <img :src="'https://ddragon.leagueoflegends.com/cdn/' + champion.version + '/img/spell/' + spell.image.full" :alt="spell.name">
                    <div class="skillInfo">
                        <div class="skillMainInfo">
                            <h5>{{spell.name | replaceTags}}</h5>
                            <small>Cooldown: {{ spell.cooldownBurn }}</small>
                            <small>Cost: {{ spell.costBurn }}</small>
                        </div>
                        <p>{{ exchangeValues(spell) }}</p>
                    </div>
                </div>
            </div>
            <!-- Champion Stats Section -->
            <div class="championStats">
                <ul class="statList">
                    <h3 class="stat">Champion Stats</h3>
                    <li class="stat">
                        <b>HP:</b><p>{{ champion.championStats.hp }}</p>
                    </li>
                    <li class="stat">
                        <b>HP/Lvl:</b><p>{{ champion.championStats.hpperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Health Regen:</b><p>{{ champion.championStats.hpregen }}</p>
                    </li>
                    <li class="stat">
                        <b>Health Regen/Lvl:</b><p>{{ champion.championStats.hpregenperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Mana:</b><p>{{ champion.championStats.mp }}</p>
                    </li>
                    <li class="stat">
                        <b>Mana/Lvl:</b><p>{{ champion.championStats.mpperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Mana Regen:</b><p>{{ champion.championStats.mpregen }}</p>
                    </li>
                    <li class="stat">
                        <b>Mana Regen/Lvl:</b><p>{{ champion.championStats.mpregenperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Attack Damage:</b><p>{{ champion.championStats.attackdamage }}</p>
                    </li>
                    <li class="stat">
                        <b>Attack Damage/Lvl:</b><p>{{ champion.championStats.attackdamageperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Armor:</b><p>{{ champion.championStats.armor }}</p>
                    </li>
                    <li class="stat">
                        <b>Armor/Lvl:</b><p>{{ champion.championStats.armorperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Magic Resist:</b><p>{{ champion.championStats.spellblock }}</p>
                    </li>
                    <li class="stat">
                        <b>Magic Resist/Lvl:</b><p>{{ champion.championStats.spellblockperlevel }}</p>
                    </li>
                    <li class="stat">
                        <b>Attack Range:</b><p>{{ champion.championStats.attackrange }}</p>
                    </li>
                    <li class="stat">
                        <b>Attack Speed:</b><p>{{ champion.championStats.attackspeed }}</p>
                    </li>
                    <li class="stat">
                        <b>Attack Speed/Lvl:</b><p>{{ champion.championStats.attackspeedperlevel }}</p>
                    </li>
                </ul>
            </div>
        </section>
        <span @click="switchView">Return to Champion List</span>
    </section>
</template>

<script>

export default {
    // Import Props
    props: ['champion', 'switchView'],
    filters: {
        // Filterse out html tags in the strings
        replaceTags(stringToChange) {
            return stringToChange.replace(/(<([^>]+)>)/ig,"");
        }
    },
    methods: {
        // Method that replaces all of the information in the Spell tooltips e.g. If it's abillity power or attack damage
        exchangeValues(spell) {
            let newDescription = spell.tooltip;
            spell.effectBurn.map((burn, index) => {
                // Replace {{ e1 }} with the ratio of e1 found in the JSON information.
                newDescription = newDescription.replace('{{ e' + index + ' }}', burn);
            });
            spell.vars.map((key, index) => {
                // Replaces the {{ a }} information with information found in the JSON.
                newDescription = newDescription.replace('{{ ' + key.key + ' }}', key.coeff + '%');
            });
            newDescription = newDescription
                // Replaces the {{ fX }} tags since they don't currently exist with a response variable.
                .replace(/{{([^;]*)}}/g,"")
                // Replaces any HTML tags such as <br> ( Same as the filter above, but cannot be used with a method )
                .replace(/(<([^>]+)>)/ig,"")
                // Replaces the {{ basedamage }} tab with Base AD
                .replace('{{ basedamage }}', 'Base AD')
                // Replaces the opening scaleAP tag because it doesn't actually do anything
                .replace('<scaleAP>', ' ')
                // Replaces the closing scaleAP tag with Scaling AP
                .replace('</scaleAP>', ' Scaling AP')
                // same as the AP tags but with Scaling AD
                .replace('<scaleAD>', ' ')
                .replace('</scaleAD>', ' Scaling AD');

            return newDescription;
        }
    }
}
</script>

<style lang="scss" scoped>
    .championCard {
        width: 80%;
        min-height: 80%;
        background-color: #fff;
        border: 2px solid black;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 1%;
        section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .championSplash {
                width: 20%;
                h2 {
                    padding: 0 0 1% 0;
                }
                small {
                    padding: 0 0 1% 0;
                }
                img{
                    width: 100%;
                }
            }
            .championSkills {
                width: 60%;
                padding: 0% 5% 5% 5%;
                h3 {
                    padding: 0 0 3% 0;
                }
                .skill {
                    width: 100%;
                    height: 20%;
                    display: flex;
                    align-items: center;
                    padding: 0 0 1%;
                    img {
                        width: 15%;
                    }
                    .skillInfo {
                        display: flex;
                        flex-direction: column;
                        width: 80%;
                        padding: 2.5%;
                        .skillMainInfo {
                            display: flex;
                            small {
                                margin-left: 15px;
                            }
                        }
                    }
                }
            }
            .championStats {
                width: 20%;
                .statList {
                    .stat {
                        display: flex;
                        padding: 0 0 5% 0;
                    }
                }
            }
        }
    }
    span {
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
    }
    span:hover {
        text-decoration: underline;
    }
</style>