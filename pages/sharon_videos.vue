<template>
  <Page title="Sharon's Videos" name="sharon_videos">
    <p class="videos__intro">
    <h2>Watch Sharon's latest Youtube videos at his Chanel: Galorian Creations</h2>
    <p>
      Can we change our habits of thinking, consumption and action as individuals and as a society? Can we lead a valuable
      and sustainable lifestyle and even influence others to do like us?
      The answer to all these questions is absolutely yes!
      It is possible to change the world, it is possible to change our habits, it is possible to have a better life - for
      everyone!
    </p>
    <h3>1. Plesase select a comment bellow to copy.
      2. Please choose a video. That will open on Youtube.
      3. Please paste your comment under the video to make a difference!</h3>
    <v-app>
      <v-container>
        <v-row>
          <v-col>
            <v-select :items="comments" label="Choose a comment to copy" @change="toClipboard" v-model="selectedValue">
              <!-- <template v-slot:append>
           
          </template> -->
            </v-select>
          </v-col>
          <v-col class="copy_icon">
            <v-tooltip right>Copy
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text @click="toClipboard">
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
    </p>
    <section class="videos__grid">
      <div v-for="videoId in getRandomIds(videos, 3)" :key="videoId" class="videos__item">
        <a :href="videoLink(videoId)" target="_blank"><img :src="videoThSrc(videoId)"></a>
      </div>
    </section>
  </Page>
</template>

<script>
export default {
  head: {
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Watch Sharon's latest Youtube videos, and plesase leave a comment."
      }
    ]
  },
  data() {
    return {
      selectedValue: "",
      videos: [
        "mCOHZQfuiLs",
        "GdKqtVmZMks",
        "ILVVth98M94",
        "efz7H7XrHmE",
        "X1Xph6KUKyM",
        "WjAYs_vdt5c",
        "ef-I7LY9BPc",
        "BWdu3efupZc",
        "TDCX7KyAARg",
        "ycUdp-9PSUw",
        "45baO3ku9R0",
        "OwGylYAWcQM",
        "sPHKNO05rcg",
        "llhQ5HDsXzY",
        "b0d6fX-ziSs",
        "ph6HeBhAwEc",
        "AX2T6XTGl3w",
        "0-lA3nxJdL8"
      ],
      comments: [
        "Your positivity is contagious. Keep doing what you do",
        "I truly love your channel. Keep doing the best work.",
        "Such creative videos you have on this channel. Just subscribed!",
        "Officially the first viewer of any video on this channel.",
        "Following your channel as it always give me interesting content!",
        "Your content always brightens my day. Keep shining!",
        "You’ve got a unique perspective, and I appreciate it.",
        "Your hard work and dedication really show in your videos.",
        "I’m so glad I stumbled upon your channel. Subscribed!",
        "Remember, every view represents someone who enjoys your content.",
        "Your authenticity is refreshing. Keep being you!",
        "I look forward to your uploads; they make my week better.",
        "Your insights on AGI are enlightening! Keep sharing your knowledge.",
        "Decentralized AI has the potential to revolutionize education. Thanks for shedding light on this!",
        "Your video about AGI’s impact on education is thought-provoking. Let’s shape the future together!",
        "I appreciate your focus on ethical considerations in AGI development. It’s crucial for a better world.",
        "As an educator, I’m excited about AGI’s role in personalized learning. Great content!",
        "Your video on decentralized AI resonates with my passion for democratizing knowledge.",
        "AGI can empower learners globally. Thanks for advocating for inclusive education!",
        "Your optimism about AGI’s positive impact inspires me. Let’s create a brighter future!",
        "Education + AGI = Transformative possibilities. Keep up the fantastic work!",
        "Your commitment to responsible AGI aligns with the values we need. Kudos!",
      ]
    };
  },
  methods: {
    videoThSrc(id) {
      return `http://img.youtube.com/vi/${id}/0.jpg`
    },
    videoLink(id) {
      return `https://www.youtube.com/watch?v=${id}`
    },
    getRandomIds(arr, num) {
      const randomIds = [...arr].sort(() => 0.5 - Math.random());

      return randomIds.slice(0, num);
    },
    toClipboard() {
      navigator.clipboard.writeText(this.selectedValue);
    }
  }
};
</script>
  
<style lang="scss">
.copy_icon {
  max-width: 60px;
  padding-top: 28px;
}

h2,
p {
  margin-bottom: 15px;
  text-align: center;
}

.v-label--active {
  display: none;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

.videos {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5rem;

    @include respond(tablet) {
      grid-template-columns: 1fr 1fr;
    }

    @include respond(mobile-land) {
      gap: 1.5rem;
    }

    @include respond(mobile) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  &__item {
    img {
      object-fit: cover;
      max-width: 100%;
      height: auto;
      // display: block;

      @include respond(tablet) {
        height: 25vw;
      }

      @include respond(mobile) {
        height: 60vw;
      }
    }
  }
}
</style>
  