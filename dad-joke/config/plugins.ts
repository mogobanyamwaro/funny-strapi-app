export default () => ({
  prometheus: {
    enabled: true,
    config: {
      // see collectDefaultMetricsOption of prom-client
      collectDefaultMetrics: false || { prefix: "" },
      labels: { name: "strapi-prometheus" },
      server: false || { port: 9000, host: "0.0.0.0", path: "/metrics" },
    },
  },
});
