import _ from 'lodash'

import defaultConfig from './default'
import config from './config'

const finalConfig = _.clone(defaultConfig)

_.merge(finalConfig, config)

console.log(finalConfig)

export default finalConfig
