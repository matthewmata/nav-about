'use strict'

exports.config = {
  app_name: ['nav-about'],
  license_key: 'INSERT KEY HERE',
  logging: {
    level: 'trace',
    filepath: './newrelic_agent.log'
  },
  utilization: {
    detect_aws: false,
    detect_pcf: false,
    detect_azure: false,
    detect_gcp: false,
    detect_docker: false
  },
  transaction_tracer: {
    enabled: true
  }
}
