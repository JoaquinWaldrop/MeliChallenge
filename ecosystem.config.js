module.exports = {
  apps : [{
    name: "meli-challenge",
    script: "./bin/www",
    env: {
      DEBUG: "mercadolibre-challenge:*",
    }
  }]
}