<template>
  <svg width="27px" height="27px" viewBox="0 0 27 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>{{ title }}</title>
    <path class="icon-circle" d="M13.5,27 C6.04415588,27 0,20.9558441 0,13.5 C0,6.04415588 6.04415588,0 13.5,0 C20.9558441,0 27,6.04415588 27,13.5 C27,20.9558441 20.9558441,27 13.5,27 Z M13.5,25 C19.8512746,25 25,19.8512746 25,13.5 C25,7.14872538 19.8512746,2 13.5,2 C7.14872538,2 2,7.14872538 2,13.5 C2,19.8512746 7.14872538,25 13.5,25 Z" fill="#1F1F1F"></path>
    <path class="icon-check" d="M13.5,27 C6.04415588,27 0,20.9558441 0,13.5 C0,6.04415588 6.04415588,0 13.5,0 C20.9558441,0 27,6.04415588 27,13.5 C27,20.9558441 20.9558441,27 13.5,27 Z M20.9357839,6.58724514 L10.4671287,18.0529151 L4.5,12.0857864 L3.08578644,13.5 L10.5328713,20.9470849 L22.4127549,7.93578387 L20.9357839,6.58724514 Z" fill="#417505"></path>
  </svg>
</template>

<script>
import { TweenLite } from 'gsap/TweenMax';

export default {
  name: 'IconIndicator',
  props: ['completed'],
  computed: {
    title: function () {
      if (this.completed === true) {
        return 'Check mark in green circle';
      } else {
        return 'Empty circle';
      }
    }
  },
  created () {
    if (this.completed === true) {
      TweenLite.to('.icon-circle', 1, { morphSVG: '.icon-check' });
    } else {
      TweenLite.to('.icon-check', 1, { morphSVG: '.icon-circle' });
    }
  }
};
</script>
