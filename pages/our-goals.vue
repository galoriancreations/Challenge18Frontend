<template>
    <Page title="Our Goals" name="what-we-do">
        <section class="our-goals">
            <SectionHeading small>Our Goals</SectionHeading>
            <p>
                On August 2, 2015, the UN created <strong>17 GOALS</strong> for the
                sustainable development of humanity, achieved by 2030. Goals that we, as
                human beings, must achieve together, if we want to improve the condition
                of the planet and of all life on it. We have about a decade, until 2030,
                to completely change the way we consume energy, maintain agriculture,
                manage water, talk to our neighbors, and more. This is not a passing
                trend, but a global change in our habits, eating habits, consumption
                habits, the way we do business, social responsibility, and long-term
                thinking.
            </p>
        </section>
        <section class="days-18">
            <SectionHeading small>
                18 Days of Sustainability & Leadership
            </SectionHeading>
            <section class="days-18__subsection">
                <p>
                    18-day challenge that is designed to allow players from one or two
                    clubs from various countries to collaborate taking a social group
                    process inspired by the UN SDG’s Sustainable Development Goals. The
                    various friendly training games include fascinating tasks such as
                    listening to relevant TED talks and thinking exercises that connect
                    you to ‘The right place’ and to each other.
                </p>
                <p>
                    Every day the group manager posts on WhatsApp the daily challenges.
                    The challenge allows you to choose at least one short daily task from
                    three tasks, and it opens you up to a magical process of growth and
                    new awareness, which will disconnect you from the immediate comfort
                    zone and develop global awareness in you. The professional games allow
                    players to create their own tasks and collaborate in a unique and
                    fascinating way never seen before.
                </p>
                <p>
                    Many who have completed all 18 days report positive changes in their
                    personal lives and in general.
                </p>
            </section>
            <div class="days-18__images">
                <img class="days-18__img" :src="this.s3AssetsGenerator('images/18-days-2.jpeg')"
                    alt="Challenge 18 Expected benefit & purpose" />
                <img class="days-18__img" :src="this.s3AssetsGenerator('images/18-days-1.jpeg')"
                    alt="Challenge 18 Expected benefit & purpose" />
            </div>
            <section class="days-18__subsection">
                <p>
                    The 18 Days of Sustainability and Leadership Challenge is a social
                    group process inspired by the sustainable development goals set by the
                    United Nations, aimed at evolving and changing the reality in which we
                    live. This is not a passing trend, but a global change in our habits,
                    eating habits, consumption habits, the way we do business, social
                    responsibility, and long-term thinking.
                </p>
                <p>
                    We invite you change angels, teachers and students to enter the global
                    game and influence the future of the entire human race. Join me for an
                    18-day challenge, where each day we will focus on one of the goals in
                    order, and end with another ‘H+’ goal for the future of humanity.
                </p>
            </section>
            <section class="days-18__subsection">
                <ul class="days-18__list diamond-bullet-list">
                    <li>
                        A unique challenge activity through the WhatsApp app to build a
                        sense of belonging and sustainability among the players in clubs.
                    </li>
                    <li>
                        Each challenge 18 group includes one or two clubs. The activity is
                        in the format of a cooperative competition (not a winner-loser).
                    </li>
                    <li>
                        The challenge is emphasizing and matching values and skills in the
                        spirit of the club.
                    </li>
                    <li>
                        Participation in the challenge solidifies students and raises
                        awareness of the hot topics on the global agenda and helps them form
                        a solid opinion in complex dilemmas.
                    </li>
                    <li>
                        The products of the program include physical challenge game at the
                        club initiated by the players, interviews with change agents in the
                        community, formation of thinking and action groups, certificates of
                        appreciation, an invitation to join the professional Mondial
                        CHALLENGE 18 Games and more.
                    </li>
                    <li>
                        The program was developed with the assistance of the R&amp;D
                        department of the Ministry of Education &#8211; Israel.
                    </li>
                </ul>
            </section>
            <BaseButton link="/join" variant="gold">Join Us</BaseButton>
        </section>
    </Page>
</template>

<script>
import s3AssetsMixin from '~/mixins/s3AssetsMixin';

export default {
    mixins: [ s3AssetsMixin ],
    head: {
        meta: [
            {
                hid: "description",
                name: "description",
                content:
                    "18-day challenge that is designed to allow players from one or two clubs from various countries to collaborate taking a social group process inspired by the UN SDG’s Sustainable Development Goals."
            }
        ]
    }
};
</script>

<style lang="scss">
.what-we-do {
    text-align: center;

    .section-heading-wrapper {
        margin-bottom: 4rem;

        @include respond(mobile) {
            margin-bottom: 3rem;
        }
    }

    .button {
        font-weight: 600;
    }
}

.our-goals {
    margin-bottom: 9rem;

    @include respond(mobile) {
        margin-bottom: 7rem;
    }

    p {
        &:not(:last-child) {
            margin-bottom: 2rem;
        }
    }

    strong {
        font-weight: 600;
    }
}

.days-18 {
    &__subsection {
        p {
            &:not(:last-child) {
                margin-bottom: 2rem;
            }
        }
    }

    &__images {
        margin: 6rem 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;

        @include respond(tablet-sm) {
            gap: 1.5rem;
        }

        @include respond(mobile) {
            grid-template-columns: 1fr;
            margin: 4rem 0;
            gap: 2rem;
        }
    }

    &__img {
        width: 100%;
        border-radius: 1rem;
    }

    &__list {
        text-align: left;
        line-height: 1.6;
        font-weight: 700;
        margin: 6rem auto;
        max-width: 95rem;

        @include respond(mobile) {
            margin: 4.5rem auto;
        }

        li {
            &:not(:last-child) {
                margin-bottom: 1rem;
            }
        }
    }
}
</style>
