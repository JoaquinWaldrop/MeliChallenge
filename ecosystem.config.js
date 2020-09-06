module.exports = {
  apps : [{
    name: "meli-challenge",
    script: "./bin/www",
    env: {
      PORT: 80,
      DEBUG: "mercadolibre-challenge:*",
    }
  }]
}