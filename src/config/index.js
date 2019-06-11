import _ from 'lodash'

import defaultConfig from './default'
import buildtimeConfig from './config'
const runtimeConfig = window.config

const finalConfig = _.clone(defaultConfig)
_.merge(finalConfig, _.isEmpty(runtimeConfig) ? buildtimeConfig : runtimeConfig)
console.log(finalConfig)

export default finalConfig
