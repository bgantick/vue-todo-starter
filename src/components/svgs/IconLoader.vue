<template>
  <svg width="100px" height="119px" viewBox="0 0 100 119" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>{{ title }}</title>
    <g>
      <polygon v-for="(line, index) in lines" :id="`line-${index}`" :fill="line.fill" :points="line.start" :key="line.id"></polygon>
    </g>
  </svg>
</template>

<script>
import TweenMax from 'gsap';

export default {
  data () {
    return {
      title: 'Loading...',
      lines: [
        { fill: '#5C37CA', start: '0 76 4 76 4 6 0 6' },
        { fill: '#377EE7', start: '14 96 18 96 18 26 14 26' },
        { fill: '#AFFBFF', start: '28 57 32 57 32 17 28 17' },
        { fill: '#148655', start: '41 78 45 78 45 38 41 38' },
        { fill: '#FDF289', start: '55 119 59 119 59 49 55 49' },
        { fill: '#F9C32D', start: '68 84 72 84 72 14 68 14' },
        { fill: '#DF4036', start: '82 40 86 40 86 0 82 0' },
        { fill: '#F5C2E0', start: '96 92 100 92 100 22 96 22' }
      ]
    };
  },
  mounted () {
    TweenMax.to('#line-0', 0.6, { yPercent: 50, delay: 0, repeatDelay: 0.2, repeat: -1, yoyo: true });
    TweenMax.to('#line-1', 0.3, { yPercent: -10, delay: 1, repeatDelay: 0.7, repeat: -1, yoyo: true });
    TweenMax.to('#line-2', 0.6, { yPercent: 50, delay: 0, repeatDelay: 0.4, repeat: -1, yoyo: true });
    TweenMax.to('#line-3', 0.8, { yPercent: 80, delay: 0.4, repeatDelay: 0.8, repeat: -1, yoyo: true });
    TweenMax.to('#line-4', 0.9, { yPercent: -60, delay: 1, repeatDelay: 0.5, repeat: -1, yoyo: true });
    TweenMax.to('#line-5', 0.5, { yPercent: 22, delay: 0.3, repeatDelay: 0.1, repeat: -1, yoyo: true });
    TweenMax.to('#line-6', 0.7, { yPercent: 100, delay: 0.6, repeatDelay: 0.6, repeat: -1, yoyo: true });
    TweenMax.to('#line-7', 0.6, { yPercent: -26, delay: 0, repeatDelay: 0.3, repeat: -1, yoyo: true });
  }
};
</script>
