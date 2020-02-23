<template>
  <div
    id="nba"
  >
    <Top
      id="top"
      class="flex-col"
    />
    <Middle
      id="middle"
      class="flex-col"
    />
    <Bottom
      id="bottom"
      class="flex-col"
    />
  </div>
</template>

<script>
import Top from '@/components/Top.vue';
import Middle from '@/components/Middle.vue';
import Bottom from '@/components/Bottom.vue';

export default {
  name: 'Nba',
  components: {
    Top,
    Middle,
    Bottom,
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      const { inputHasFocus } = this.$store.state;

      // console.log(`code: ${e.code}`);
      switch (e.code) {
        case 'Space':
        case 'Enter':
          if (!inputHasFocus) {
            this.$store.dispatch('getRandom');
          }
          break;

        case 'Escape':
          if (!inputHasFocus) {
            this.$store.commit('showNewestRandom');
          }
          break;
        default:
      }
    });
  },
};
</script>

<style lang="scss">
@import "./styles/_ui.scss";

#nba {
  $topHeight: 4.2em;
  $bottomHeight: 9.7em;
  $bottomPaddingTop: .3em;

  width: 100%;
  height: 100%;
  padding: 0 5px;

  #top, #middle, #bottom {
    flex: 1 1 auto;
    align-self: auto;
    width: 100%;
  }

  #top {
    height: $topHeight;
  }

  #middle {
    $margin: 10px;
    width: calc(100% - #{$margin * 2});
    height: calc(100% - #{$topHeight + $bottomHeight + $bottomPaddingTop});
    margin: $margin $margin;
    min-height: 250px;
    border-radius: 10px;


    &.show-input {
      cursor: pointer;
      transition: .1s;

      &:hover {
        background: #111;
      }

      &:active {
        transform: scale(0.9);
      }
    }

    &.show-history {
      background: #333;

      &:hover {
        background: #222;
      }
    }
  }

  #bottom {
    height: $bottomHeight;
    justify-content: flex-start;
    border-top: 1px solid #333;
    padding-top: $bottomPaddingTop;
  }
}
</style>
