<template>
    <div id="page_container">
        <div id="qa_container">
            <div>
                <img src="https://facts-commando.com/assets/qa-chat-dbbb2c10.svg" alt="QA-Image" width="130px"
                    draggable="false">
                <img src="https://facts-commando.com/assets/qa-chat-dbbb2c10.svg" alt="QA-Image" width="100px"
                    draggable="false">
            </div>

            <div id="qa_header_container">
                <h2> Question And Answer </h2>
            </div>
        </div>

        <div id="qa_list_container">
            <h3 @click="previewParagraph(0)" class="question_header">- Who is the targeted audience of Beneficial AGI ACTION
                Group?</h3>
            <p v-if="showParagraph[0]" class="paragraph_styles">
                1. AI Enthusiasts and Professionals: Individuals passionate about Artificial General Intelligence (AGI) and
                its positive impact on humanity. These participants are crucial as they bring expertise, insights, and
                enthusiasm to the group.

                2. Curious Learners: Those new to AGI or who find the topic intriguing but aren't sure where they stand. The
                group is an excellent opportunity for them to learn, engage, and form informed opinions on AGI's future role

                3. Skeptics and Critics: While the group primarily addresses AGI supporters and learners, it's also prepared
                for critical viewpoints, as they enrich the discussion and broaden perspectives.
            </p>

            <h3 @click="previewParagraph(1)" class="question_header">- Do we need to join the groups?</h3>
            <p v-if="showParagraph[1]" class="paragraph_styles">
                Yes, certainly. This is necessary to increase the chance that the post will be approved by the group
                administrators.
            </p>

            <h3 @click="previewParagraph(2)" class="question_header">- Is it normal that the post is delayed until an admin
                approves it?</h3>
            <p v-if="showParagraph[2]" class="paragraph_styles">
                Yes, this is a common procedure in most Facebook groups.
            </p>

            <h3 @click="previewParagraph(3)" class="question_header">- What do we do if the post is not approved?</h3>
            <p v-if="showParagraph[3]" class="paragraph_styles">
                If you received a message that the post has been declined, then take a screenshot with the name of the group
                and the reason for the post being declined and send it to us. The content team will coordinate the updates
                and if necessary, the group will be removed from the database.

            </p>

            <h3 @click="previewParagraph(4)" class="question_header">- Why Facebook? What about Instagram, TikTok, LinkedIn,
                etc.?</h3>
            <p v-if="showParagraph[4]" class="paragraph_styles">
                Facebook is (still) the largest social network in the world, with over 9 billion
                users. The groups on Facebook are an excellent platform for exposure to audiences who are not your
                direct followers, which enhances the effectiveness of the outreach activity. In the other networks, the
                distribution process is different, and we are looking at different options to integrate them into the
                propaganda commando activity, later on.
            </p>

            <h3 @click="previewParagraph(6)" class="question_header">- Why does the system limit each user to sharing only a
                few posts in each round?</h3>
            <p v-if="showParagraph[6]" class="paragraph_styles">
                We protect the members of the information commando. In order for Facebook not to
                block you, you must advertise in moderation. Three - five posts per round is a limit that should protect
                you from being blocked. New commando members are limited to 3 posts, veterans to 10, depending on how
                Facebook responds to each and every one's posts.
            </p>
            <h3 @click="previewParagraph(7)" class="question_header">- I have a good video that I really want to share, what
                do I need to do?</h3>
            <p v-if="showParagraph[7]" class="paragraph_styles">
                The program is built to allow only videos from Facebook, it does not support videos from other platforms. If
                you saw a video from Facebook that has at least 1000 likes, and it’s a good video in your opinion then add
                the link to the video via this Form Our content creators will then look at the video and see if it’s
                relevant for posting.

                <a href="https://docs.google.com/forms/d/e/1FAIpQLScbZV8qhDm7CsyePVqMdDeAwfVotxeNxWK7GZJQQNFWNcpYoQ/viewform"
                    style="color:#00459e">Click Here</a>

            </p>
            <h3 @click="previewParagraph(8)" class="question_header">- Why only Facebook? What about
                Instagram/Twitter/TikTok?....</h3>
            <p v-if="showParagraph[8]" class="paragraph_styles">
                Facebook is still the largest social media platform in the world, with more than 9 Billion users. The groups
                on Facebook are a great platform for exposure to people that are not only your followers, which increases
                the effect of the advocacy activity.
            </p>

            <h3 @click="previewParagraph(9)" class="question_header">- Why does the program stop me from posting more than
                3-4 posts each round?</h3>
            <p v-if="showParagraph[9]" class="paragraph_styles">
                We care about the community accounts from "BGI Action", so in order that Facebook won't block you from
                posting, you need to post gradually, 3 posts each round should guard your account from being blocked.
            </p>

            <h3 @click="previewParagraph(10)" class="question_header">- How can I do more after the program has “stopped” me
                from posting?</h3>
            <p v-if="showParagraph[10]" class="paragraph_styles">
                Once we have limited you from posting more, we suggest you enter the link which leads you to a wide range of
                posts from the community members on Facebook. We would appreciate it if you liked and commented on their
                posts in order to increase their exposure. Which will create a double strength for your posts that you share
                in an "organic" way.

                Add link to #BeneficialAGI
            </p>
            <h3 @click="previewParagraph(11)" class="question_header">- How do you create the content and the comments?</h3>
            <p v-if="showParagraph[11]" class="paragraph_styles">
                We take the content from great network influencer, the responses are formulated by teams of copywriters who
                work completely voluntarily.
            </p>

            <h3 @click="previewParagraph(12)" class="question_header">- Do you suggest that I post under my own name or
                anonymously?</h3>
            <p v-if="showParagraph[12]" class="paragraph_styles">
                We suggest you post under your own name, in order for the posts to be effective. If there is a fear of
                trolling by other users, it is possible to block an account of anyone who doesn't follow you from
                commenting. This will reduce the exposure of the post but will protect you to the extent of real exposure to
                trolls.
            </p>
            <h3 @click="previewParagraph(13)" class="question_header">- Can I add friends/family to the group?</h3>
            <p v-if="showParagraph[13]" class="paragraph_styles">
                Of course! In the description of the whatsapp group is a link to the group, you can share it to whoever you
                think can help us with advocacy.
            </p>

            <h3 @click="previewParagraph(14)" class="question_header">- Why does the group only allow admins to send
                messages to the group?</h3>
            <p v-if="showParagraph[14]" class="paragraph_styles">
                The group has a very definite goal, and to meet the goal it needs to be quiet.
                The alternative is a group that has an overflow of content that makes it impossible to distinguish between
                designated content and other content.
                It also protects you from too much content that will interfere with your concentration on your other tasks.
                Our Facebook group is open for discussions and we invite you to Join.

                <a href="https://www.facebook.com/groups/1881325275514150 " style="color:#00459e;">#Facebook </a>
            </p>
            <h3 @click="previewParagraph(15)" class="question_header">- How do you create the content and the comments?</h3>
            <p v-if="showParagraph[15]" class="paragraph_styles">
                We take the content from good influencers. The comments before each post are written by a group of volunteer
                copywriters.
            </p>
            <hr>
            <p style="color:#00459e; font-weight: 500;">
                Want to explore these fascinating topics and more? Join us at BGI 24 and be a part of shaping the future of
                AGI
                <a href="https://bgi24.ai/" style="text-decoration: underline; font-weight: normal;">Event</a> 🌟
            </p>
            <div id="prev_pate_btn_container">
                <action-button @click="prevPage" id="prev_page_button"> &larr; Back to homepage </action-button>
            </div>
        </div>
    </div>
</template>

<script>
import Page from '../layout/Page.vue'
import ActionButton from '../UI/ActionButton.vue'
export default {
    components: { Page, ActionButton },

    data() {
        return {
            showParagraph: [],
        }
    },

    methods: {
        prevPage() {
            this.$emit('prev-page');
        },

        previewParagraph(index) {
            this.$set(this.showParagraph, index, !this.showParagraph[index])
        },
    }

}
</script>

<style>
#page_container {
    display: flex;
    flex-direction: column;
    gap: 100px;
}

#qa_container {
    width: 100%;
    display: flex;
    border-radius: 50px;
    background-image: url('https://facts-commando.com/assets/curvy-background-qa-e011b929.svg');
    background-size: cover;
    gap: 28%;
}

#qa_header_container {
    display: flex;
    align-items: center;
    color: white;
}


#qa_list_container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.question_header {
    color: #00459e;
    font-weight: 600;
    border-bottom: 1px solid lightgray;
    text-decoration: none;
    width: 100%;
    display: inline-block;
}

.paragraph_styles {
    color: #323233;
    font-weight: .9375rem;
}

#prev_pate_btn_container {
    display: flex;
}

#prev_page_button {
    width: 400px;
    display: inline-flex;
    text-transform: none;
    color: #00459E;
    font-size: 25px;
}</style>