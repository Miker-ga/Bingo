<template>
  <div id="main-game" class="tile is-ancestor">
    <div id="numbers-column" class="tile is-8">
      <ul class="numbers-container">
        <li v-for="n in numbers" :id="[n.number]" :key="n.number">
          <transition name="picked-number">
            <div v-if="n.isPicked" :class="['bingo-number', { picked: n.isPicked }]">
              {{ n.number }}
            </div>
          </transition>
          <div v-if="!n.isPicked" class="bingo-number">
            {{ n.number }}
          </div>
        </li>
      </ul>
    </div>
    <div id="draw-column" class="tile is-4 is-vertical is-parent">
      <div class="tile is-child">
        <last-three-numbers :numbers="lastThree" />
        <div class="bingo-roulette">
          <p :class="[{ 'reveal-number reveal-number-animation': animateTagetNum }, 'number-draw']">
            {{ targetNum }}
          </p>
        </div>
      </div>
      <div id="controls" class="tile is-child">
        <div>
          <b-tooltip label="Click para obtener un nuevo número" position="is-bottom" type="is-light" size="is-small"
            delay="1000">
            <b-button type="is-primary new-number" size="is-medium" :disabled="drawingInProcess" rounded outlined
              icon-left="reload" @click="spin" @keyup.enter="spin">
              Nuevo número!
            </b-button>
          </b-tooltip>
          <b-button type="is-text" rounded @click="reset">
            Reiniciar
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LastThreeNumbers from './LastThreeNumbers.vue'
export default {
  components: {
    LastThreeNumbers
    },
  data() {
    return {
      drawingInProcess: false,
      target: null,
      targetNum: null,
      animateTagetNum: false,
      maxNumber: 75,
      numbers: [],
      pickedNumbers: []
    };
  },
  computed: {
    lastThree: function() {
      return this.pickedNumbers.slice().reverse().slice(0, 3);
    }
  },
  watch: {
    numbers: {
      handler: function(val, oldVal) {
      localStorage.numbers = JSON.stringify(val);
      },
      deep: true
    },
    pickedNumbers: {
      handler: function(val, oldVal) {
      localStorage.pickedNumbers = JSON.stringify(val);
      },
      deep: true
    }
  },
  mounted() {
      if(localStorage.numbers) {
        this.numbers = JSON.parse(localStorage.numbers);
      }
      if(localStorage.pickedNumbers) {
        this.pickedNumbers = JSON.parse(localStorage.pickedNumbers);
        this.targetNum = this.pickedNumbers[this.pickedNumbers.length - 1];
      }
  },
  created() {
    this.init();
    var vm = this
    window.addEventListener('keyup', function(event) {
        if (event.keyCode == 13) { 
          vm.spin();
        }
      });
  },
  methods: {
    init: function() {
      if(this.numbers.length === 0) {
        this.numbers = [...Array(this.maxNumber).keys()].map(i => ({number: ++i, isPicked: false}));
      }
      if(this.pickedNumbers.length === 0) {
      this.pickedNumbers = [];
      }
      this.target = null;
      this.targetNum = null;
    },
    spin: function() {
      this.drawingInProcess = true;
      this.startDrawing();
      setTimeout(() => {
        this.stopDrawing();
        this.drawingInProcess = false;
      }, 3000);
    },
    reset: function() {
      if (confirm("Está seguro que desea reiniciar el bingo?")) {
        this.target = null;
        this.targetNum = null;
        localStorage.removeItem("numbers");
        localStorage.removeItem("pickedNumbers");
        this.target = null;
        this.pickedNumbers = [];
        this.numbers = [...Array(this.maxNumber).keys()].map(i => ({number: ++i, isPicked: false}));
      }
    },
    startDrawing: function() {
      this.target = setInterval(() => {
        const availableNumbers = this.numbers.filter(n => !n.isPicked); 
        const rndDrawIdx =  Math.floor(Math.random() * availableNumbers.length);
        const draw = availableNumbers[rndDrawIdx];
        this.targetNum = draw.number;
      }, 100);
    },
    stopDrawing: function() {
      clearInterval(this.target);
      this.animateTagetNum = true;
      setTimeout(() => {
        this.animateTagetNum = false;
      }, 1000)
      this.numbers[this.targetNum-1].isPicked = true;
      this.pickedNumbers = [...this.pickedNumbers, this.targetNum]
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
$border: #0000;
$primary: #167503;
$secondary: #750303;

.new-number {
  color: $secondary !important;
  border-color: $secondary !important;
}

.is-outlined:hover {
  background-color: $secondary !important;
  color: white !important;
}

#controls {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

#controls>div {
  display: flex;
  align-items: center;
}

.bingo-roulette {
  margin-top: 50px;
}

ul {
  list-style: none;
  padding: 0;
}

.number-draw {
  width: 200px;
  height: 200px;
  margin: 0 auto 50px;
  border-radius: 100px;
  color: white;
  padding-top: 10px;
  background-color: rgba($primary, 0.9);
  font-size: 120pt;
  display: flex;
  align-items: center;
  justify-content: center;
}

.numbers-container {
  margin: 0 auto;
  border-radius: 30px;
  padding: 5px;
  box-shadow: 5px 5px 20px rgba($dark, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.numbers-container>li {
  font-size: 20pt;
  width: 10%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bingo-number {
  font-size: 20pt;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  padding-top: 2px;
  border: 1px solid rgba($border, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.picked {
  background: $primary;
  color: white;
  font-weight: bold;
  -webkit-box-shadow: 2px 2px 5px rgba($primary, 0.5);
  -moz-box-shadow: 2px 2px 5px rgba($primary, 0.5);
  box-shadow: 2px 2px 5px rgba($primary, 0.5);
}

.picked-number-enter-active {
  animation: bounce-in 1.0s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
    background-color: $dark;
    border: 10px rgba($dark, 0.5) solid;
  }

  50% {
    transform: scale(1.4);
    border: 10px rgba($dark, 0.5) solid;
  }

  100% {
    transform: scale(1);
  }
}

.reveal-number-animation {
  animation: reveal-number 1.0s;
}

@keyframes reveal-number {
  0% {
    opacity: 0;
    transform: scale(0.8);
    background-color: rgba($primary, 1);
  }

  50% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}
</style>
