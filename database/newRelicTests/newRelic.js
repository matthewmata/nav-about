'use strict'

exports.config = {
  app_name: ['nav-about'],
  license_key: '61249e61fff8e1bf595d2afee2e3b9ca750c6d84',
  logging: {
    level: 'trace',
    filepath: '../../../newrelic_agent.log'
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
