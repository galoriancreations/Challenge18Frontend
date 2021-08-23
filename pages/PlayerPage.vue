<template>
  <Page title="Player" name="player-page">
    <div class="player">
      <div class="player__info">
        <figure class="player__image">
          <img
            data-v-518008fc=""
            src="https://i.imgur.com/MIwbEJr.jpg"
            alt="Nadia Hassona"
          />
          <figcaption class="player__title title">Nadia Hassona</figcaption>
        </figure>
        <div class="player__caption">
          <p><strong>State:</strong> Israel</p>
          <p><strong>Club:</strong> Eroni Yud-Bet</p>
          <p><strong>Score:</strong> 1239</p>
        </div>
      </div>
      <div class="player__skills">
        <div class="skills__title title">Tittle</div>
        <div class="skills__text">
          <div class="skill__container">
            <strong>Technologist: </strong><span class="skill"></span>
          </div>
          <div class="skill__container">
            <strong>Influencer: </strong><span class="skill"></span>
          </div>
          <div class="skill__container">
            <strong>Mentor: </strong><span class="skill"></span>
          </div>
          <div class="skill__container">
            <strong>Referee: </strong><span class="skill"></span>
          </div>
          <div class="skill__container">
            <strong>Ideator: </strong><span class="skill"></span>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<style lang="scss">
.player {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;

  .player__info {
    margin: 1rem;
  }

  .player__skills {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .title {
    // width: 100%;
    background-color: rgb(0, 12, 102);
    color: #fff;
    font-size: 2.3rem;
    font-family: "Spartan", sans-serif;
    font-weight: 600;
    padding: 1.3rem 1rem 0.9rem;
    text-align: center;
  }

  //  .skills__title {
  //    width: 100%;
  //    background-color: rgb(0, 12, 102);
  //    color: #fff;
  //    font-size: 2.3rem;
  //    font-family: "Spartan", sans-serif;
  //    font-weight: 600;
  //    padding: 1.3rem 1rem 0.9rem;
  //    text-align: center;
  // }

  .player__caption {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 2rem;
    padding-left: 1rem;
  }

  .player__caption p {
    margin-bottom: 1rem;
  }

  .skills__text {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    padding-top: 1rem;
  }

  .player__image img {
    display: block;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .skill__container {
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  .skill__container strong {
    padding-right: 1rem;
    color: rgb(0, 12, 102);
  }

  .skill {
    background-color: rgb(255, 204, 4);
    display: block;
    margin-left: auto;
    height: 1rem;
    width: 40rem;
    border-radius: 1rem;
  }
  .skill-bg {
    display: block;
    height: 1.5rem;
    width: 20rem;
    background-color: rgb(255, 204, 4);
    padding-left: auto;
  }
}
</style>
