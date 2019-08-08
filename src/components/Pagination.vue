<template>
  <div class="text-center">
    <v-pagination
      v-if="length > 1"
      v-model="page"
      :length="length"
      @input="step"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    perPage: {
      type: Number,
      default: 12,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    length() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    step() {
      this.$router.replace({ query: { ...this.$route.query, page: this.page } });
    },
  },
  created() {
    this.page = parseInt(this.$route.query.page, 10) || 1;
    this.$router.replace({ query: { page: this.page, ...this.$route.query } });
  },
  beforeUpdate() {
    this.page = parseInt(this.$route.query.page, 10);
  },
};
</script>
